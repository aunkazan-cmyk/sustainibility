// Pure contact validation — no "use server"/next/headers/server-only, so it
// is unit-testable and reusable. The Server Action wraps this with the
// honeypot check, rate limit and mail send.
import { z } from "zod";
// TR phone helpers (kept in-file so node unit tests resolve without extension hacks).
export function normalizePhoneTR(raw: string): string {
  let s = raw.replace(/[\s\-().]/g, "");
  if (s.startsWith("+90")) s = s.slice(3);
  else if (s.startsWith("0090")) s = s.slice(4);
  else if (s.startsWith("90") && s.length >= 12) s = s.slice(2);
  return s.replace(/\D/g, "");
}

export function isValidPhoneTR(raw: string): boolean {
  const d = normalizePhoneTR(raw);
  if (d.length === 10) return /^5\d{9}$/.test(d);
  if (d.length === 11) return /^05\d{9}$/.test(d);
  return false;
}

export type ContactField =
  | "name"
  | "company"
  | "email"
  | "phone"
  | "sector"
  | "sectorOther"
  | "serviceInterest"
  | "message"
  | "kvkkAccepted"
  | "captchaAnswer";

export interface ContactMessages {
  required: string;
  email: string;
  kvkk: string;
  sectorOther: string;
  phoneInvalid: string;
  nameInvalid: string;
  messageTooShort: string;
}

export interface ContactInput {
  name: string;
  company: string;
  email: string;
  phone: string;
  sector: string;
  sectorOther: string;
  serviceInterest: string;
  message: string;
  kvkkAccepted: boolean;
}

const nameRe = /^[\p{L}\s'\-]+$/u;

export function validateContact(
  input: ContactInput,
  m: ContactMessages,
): Partial<Record<ContactField, string>> {
  const schema = z.object({
    name: z
      .string()
      .min(2, m.required)
      .max(80, m.required)
      .refine((v) => nameRe.test(v.trim()), m.nameInvalid),
    company: z.string().min(2, m.required).max(120, m.required),
    email: z.string().email(m.email).max(254, m.email),
    phone: z
      .string()
      .min(1, m.required)
      .refine((v) => isValidPhoneTR(v), m.phoneInvalid),
    sector: z.string().optional(),
    sectorOther: z.string().optional(),
    serviceInterest: z.string().max(120, m.required),
    message: z.string().min(10, m.messageTooShort).max(3000, m.required),
  });

  const fieldErrors: Partial<Record<ContactField, string>> = {};
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ContactField;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
  }
  if (input.sector === "other") {
    const other = input.sectorOther.trim();
    if (other.length < 2 || other.length > 80) {
      fieldErrors.sectorOther = m.sectorOther;
    }
  }
  if (!input.kvkkAccepted) {
    fieldErrors.kvkkAccepted = m.kvkk;
  }
  return fieldErrors;
}
