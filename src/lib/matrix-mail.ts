import "server-only";
import nodemailer from "nodemailer";
import type { MatrixEvaluation } from "@/lib/water-efficiency-matrix";
import {
  buildMultiResultSummary,
  facilityTypeLabel,
  formatSummaryLine,
  statusLabel,
} from "@/lib/water-efficiency-matrix";

export interface MatrixLeadPayload {
  company: string;
  recipientName: string;
  email: string;
  phone: string;
  kvkkAccepted: boolean;
  locale: "tr" | "en";
  evaluation: MatrixEvaluation;
}

function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

function buildTransport() {
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

export async function sendMatrixLeadEmail(p: MatrixLeadPayload): Promise<void> {
  const transporter = buildTransport();
  const to = process.env.CONTACT_RECIPIENT ?? "info@nexovia.com.tr";
  const from = process.env.MAIL_FROM ?? to;
  const lang = p.locale === "tr" ? "TR" : "EN";
  const { evaluation } = p;

  const activityLines =
    evaluation.facilityType === "industrial"
      ? evaluation.rows
          .map(
            (row, i) =>
              `${i + 1}. ${row.inputNaceCode} — ${statusLabel(row.status, lang)}${
                row.naceEntry ? ` (${row.naceEntry.activityTr})` : ""
              }`,
          )
          .join("\n")
      : "—";

  const rows: [string, string][] = [
    [lang === "TR" ? "Şirket" : "Company", p.company],
    [lang === "TR" ? "Raporu alan" : "Recipient", p.recipientName],
    [lang === "TR" ? "E-posta" : "Email", p.email],
    [lang === "TR" ? "Telefon" : "Phone", p.phone],
    [
      lang === "TR" ? "Tesis türü" : "Facility type",
      facilityTypeLabel(evaluation.facilityType, lang),
    ],
    [
      lang === "TR" ? "Çalışan sayısı" : "Employees",
      evaluation.employeeCount != null ? String(evaluation.employeeCount) : "—",
    ],
    [
      lang === "TR" ? "Genel sonuç" : "Headline result",
      statusLabel(evaluation.headlineStatus, lang),
    ],
    [
      lang === "TR" ? "Faaliyet dağılımı" : "Activity breakdown",
      formatSummaryLine(evaluation.summary, lang),
    ],
    [lang === "TR" ? "Faaliyetler" : "Activities", activityLines],
    [lang === "TR" ? "Özet" : "Summary", buildMultiResultSummary(evaluation, lang)],
    [lang === "TR" ? "KVKK onayı" : "KVKK", p.kvkkAccepted ? "✓" : "✗"],
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
    replyTo: `${p.recipientName} <${p.email}>`,
    subject: `[Nexovia Matris] ${lang === "TR" ? "Yükümlülük raporu talebi" : "Obligation report request"} — ${p.company}`,
    text: `${text}\n\n— ${new Date().toISOString()}`,
    html,
  });
}
