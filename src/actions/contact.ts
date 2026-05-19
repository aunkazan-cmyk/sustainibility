"use server";
// Contact Server Action: validate (zod) → honeypot → captcha → rate-limit →
// email via Nodemailer. No DB; persistence to a lead store is optional future.
import { headers } from "next/headers";
import { sendContactEmail, type ContactPayload } from "@/lib/mail";
import { validateContact } from "@/lib/contact-schema";
import {
  createMathChallenge,
  verifyChallenge,
  type CaptchaVerifyResult,
} from "@/lib/contact-captcha";
import type { ContactState } from "./contact-state";

const tr = {
  required: "Bu alan zorunludur.",
  email: "Geçerli bir e-posta girin.",
  kvkk: "Devam etmek için KVKK metnini onaylayın.",
  sectorOther: "Lütfen sektörü belirtin.",
  phoneInvalid:
    "Geçerli bir Türkiye telefon numarası girin (10 veya 11 hane).",
  nameInvalid: "Ad soyad yalnızca harf ve boşluk içerebilir.",
  messageTooShort: "Mesaj en az 10 karakter olmalıdır.",
  captchaRequired: "Güvenlik doğrulamasını tamamlayın.",
  captchaInvalid: "Güvenlik doğrulaması hatalı. Lütfen tekrar deneyin.",
  captchaExpired: "Doğrulama süresi doldu. Lütfen yeni soruyu yanıtlayın.",
  fix: "Lütfen işaretli alanları kontrol edin.",
  ok: "Talebiniz alındı. En az 3 iş günü içinde dönüş yaparız.",
  fail: "Gönderim sırasında bir sorun oluştu. Lütfen tekrar deneyin veya talep@nexovia.com.tr adresine yazın.",
};
const en = {
  required: "This field is required.",
  email: "Enter a valid email.",
  kvkk: "Please accept the privacy notice to continue.",
  sectorOther: "Please specify the sector.",
  phoneInvalid: "Enter a valid Turkish phone number (10 or 11 digits).",
  nameInvalid: "Full name may only contain letters and spaces.",
  messageTooShort: "Message must be at least 10 characters.",
  captchaRequired: "Complete the security check.",
  captchaInvalid: "Security check failed. Please try again.",
  captchaExpired: "The check expired. Please answer the new question.",
  fix: "Please review the highlighted fields.",
  ok: "Your request has been received. We respond within at least 3 business days.",
  fail: "Something went wrong sending your request. Please try again or email talep@nexovia.com.tr.",
};

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

function captchaMessage(
  result: CaptchaVerifyResult,
  m: typeof tr,
): string {
  if (result === "missing") return m.captchaRequired;
  if (result === "expired") return m.captchaExpired;
  return m.captchaInvalid;
}

function errorState(
  partial: Omit<ContactState, "status" | "captcha"> & {
    captcha?: ContactState["captcha"];
  },
): ContactState {
  return {
    status: "error",
    captcha: partial.captcha ?? createMathChallenge(),
    ...partial,
  };
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const locale = get("locale") === "en" ? "en" : "tr";
  const m = locale === "tr" ? tr : en;

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
    captchaAnswer: get("captchaAnswer"),
  };
  const kvkkAccepted = formData.get("kvkkAccepted") != null;
  const marketingPermission = formData.get("marketingPermission") != null;
  const captchaToken = get("captchaToken");

  const captchaResult = verifyChallenge(captchaToken, values.captchaAnswer);
  if (captchaResult !== "ok") {
    return errorState({
      message: m.fix,
      fieldErrors: {
        captchaAnswer: captchaMessage(captchaResult, m),
      },
      values,
    });
  }

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
    {
      required: m.required,
      email: m.email,
      kvkk: m.kvkk,
      sectorOther: m.sectorOther,
      phoneInvalid: m.phoneInvalid,
      nameInvalid: m.nameInvalid,
      messageTooShort: m.messageTooShort,
    },
  );

  if (Object.keys(fieldErrors).length > 0) {
    return errorState({ message: m.fix, fieldErrors, values });
  }

  const h = await headers();
  const ip =
    (h.get("x-forwarded-for") ?? "").split(",")[0].trim() ||
    h.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return errorState({ message: m.fail, values });
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
    return errorState({ message: m.fail, values });
  }

  return { status: "success", message: m.ok };
}
