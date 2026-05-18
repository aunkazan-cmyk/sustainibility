// Nodemailer SMTP delivery for contact leads. Provider-agnostic: a Gmail App
// Password works today; switching to AWS SES SMTP / a real domain is an
// env-only change. No DB — the lead is the email (Reply-To = visitor).
import "server-only";
import nodemailer from "nodemailer";

export interface ContactPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  sector: string;
  serviceInterest: string;
  message: string;
  kvkkAccepted: boolean;
  marketingPermission: boolean;
  locale: "tr" | "en";
}

function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

function buildTransport() {
  // Throws if SMTP isn't configured — the action turns this into a graceful
  // "email us directly" message instead of losing the submission.
  const host = required("SMTP_HOST");
  const port = Number(process.env.SMTP_PORT ?? "465");
  const secure = (process.env.SMTP_SECURE ?? "true") !== "false";
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user: required("SMTP_USER"), pass: required("SMTP_PASS") },
  });
}

const FIELD_LABELS: Record<
  keyof Omit<ContactPayload, "locale">,
  [string, string]
> = {
  name: ["Ad Soyad", "Full name"],
  company: ["Şirket", "Company"],
  email: ["E-posta", "Email"],
  phone: ["Telefon", "Phone"],
  sector: ["Sektör", "Sector"],
  serviceInterest: ["İlgilenilen hizmet", "Service interest"],
  message: ["Mesaj", "Message"],
  kvkkAccepted: ["KVKK onayı", "KVKK accepted"],
  marketingPermission: ["Pazarlama izni", "Marketing opt-in"],
};

export async function sendContactEmail(p: ContactPayload): Promise<void> {
  const transporter = buildTransport();
  // Fail-safe default is the business inbox, not a personal address — a
  // forgotten CONTACT_RECIPIENT env var must never silently drop leads.
  const to = process.env.CONTACT_RECIPIENT ?? "info@nexovia.com.tr";
  const from = process.env.MAIL_FROM ?? to;
  const li = p.locale === "tr" ? 0 : 1;

  const rows: [string, string][] = [
    [FIELD_LABELS.name[li], p.name],
    [FIELD_LABELS.company[li], p.company],
    [FIELD_LABELS.email[li], p.email],
    [FIELD_LABELS.phone[li], p.phone],
    [FIELD_LABELS.sector[li], p.sector || "—"],
    [FIELD_LABELS.serviceInterest[li], p.serviceInterest || "—"],
    [FIELD_LABELS.message[li], p.message],
    [FIELD_LABELS.kvkkAccepted[li], p.kvkkAccepted ? "✓" : "✗"],
    [
      FIELD_LABELS.marketingPermission[li],
      p.marketingPermission ? "✓" : "✗",
    ],
  ];

  const esc = (s: string) =>
    s.replace(/[&<>"]/g, (c) =>
      c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&quot;",
    );

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="padding:6px 16px 6px 0;color:#64748B;vertical-align:top">${esc(
        k,
      )}</td><td style="padding:6px 0;color:#0F172A">${esc(v).replace(
        /\n/g,
        "<br>",
      )}</td></tr>`,
  )
  .join("\n")}
</table>`;

  await transporter.sendMail({
    from: `Nexovia Web <${from}>`,
    to,
    replyTo: `${p.name} <${p.email}>`,
    subject: `[Nexovia] ${p.locale === "tr" ? "İletişim talebi" : "Contact request"} — ${p.name}, ${p.company}`,
    text: `${text}\n\n— ${new Date().toISOString()}`,
    html,
  });
}
