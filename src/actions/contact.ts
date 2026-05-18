"use server";
// Contact Server Action: validate (zod) → honeypot → rate-limit → email via
// Nodemailer. No DB; persistence to a lead store is an optional future hook.
import { headers } from "next/headers";
import { sendContactEmail, type ContactPayload } from "@/lib/mail";
import { validateContact } from "@/lib/contact-schema";
import type { ContactState } from "./contact-state";

// Re-exported via ./contact-state — a "use server" module must export only
// async functions, so types/initial-state live in that plain sibling.

const tr = {
  required: "Bu alan zorunludur.",
  email: "Geçerli bir e-posta girin.",
  kvkk: "Devam etmek için KVKK metnini onaylayın.",
  sectorOther: "Lütfen sektörü belirtin.",
  fix: "Lütfen işaretli alanları kontrol edin.",
  ok: "Talebiniz alındı. En az 3 iş günü içinde dönüş yaparız.",
  fail: "Gönderim sırasında bir sorun oluştu. Lütfen tekrar deneyin veya talep@nexovia.com.tr adresine yazın.",
};
const en = {
  required: "This field is required.",
  email: "Enter a valid email.",
  kvkk: "Please accept the privacy notice to continue.",
  sectorOther: "Please specify the sector.",
  fix: "Please review the highlighted fields.",
  ok: "Your request has been received. We respond within at least 3 business days.",
  fail: "Something went wrong sending your request. Please try again or email talep@nexovia.com.tr.",
};

// Best-effort in-memory rate limit (per server instance): 5 / 10 min / IP.
const HITS = new Map<string, number[]>();
const LIMIT = 5;
const WINDOW = 10 * 60 * 1000;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (HITS.get(ip) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now);
  HITS.set(ip, recent);
  return recent.length > LIMIT;
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const locale = get("locale") === "en" ? "en" : "tr";
  const m = locale === "tr" ? tr : en;

  // Honeypot — bots fill hidden fields; humans never see it.
  if (get("company_url")) {
    return { status: "success", message: m.ok };
  }

  const values: Record<string, string> = {
    name: get("name"),
    company: get("company"),
    email: get("email"),
    phone: get("phone"),
    sector: get("sector"),
    sectorOther: get("sectorOther"),
    serviceInterest: get("serviceInterest"),
    message: get("message"),
  };
  const kvkkAccepted = formData.get("kvkkAccepted") != null;
  const marketingPermission = formData.get("marketingPermission") != null;

  const fieldErrors = validateContact(
    {
      name: values.name,
      company: values.company,
      email: values.email,
      phone: values.phone,
      sector: values.sector,
      sectorOther: values.sectorOther,
      serviceInterest: values.serviceInterest,
      message: values.message,
      kvkkAccepted,
    },
    { required: m.required, email: m.email, kvkk: m.kvkk, sectorOther: m.sectorOther },
  );

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: m.fix, fieldErrors, values };
  }

  // Rate limit (after validation so bots don't probe cheaply).
  const h = await headers();
  const ip =
    (h.get("x-forwarded-for") ?? "").split(",")[0].trim() ||
    h.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return { status: "error", message: m.fail, values };
  }

  const payload: ContactPayload = {
    name: values.name,
    company: values.company,
    email: values.email,
    phone: values.phone,
    sector:
      values.sector === "other"
        ? `${values.sector} — ${values.sectorOther}`
        : values.sector,
    serviceInterest: values.serviceInterest,
    message: values.message,
    kvkkAccepted,
    marketingPermission,
    locale,
  };

  try {
    await sendContactEmail(payload);
  } catch (err) {
    console.error("[contact] mail send failed:", err);
    // TODO(persistence): when a lead store exists, persist here as a
    // fallback so a transient SMTP failure never drops a lead.
    return { status: "error", message: m.fail, values };
  }

  // TODO(turnstile): verify a Cloudflare Turnstile token here when keys are
  // provisioned (project_docs lists it; no keys/backend yet).
  return { status: "success", message: m.ok };
}
