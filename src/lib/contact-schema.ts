// Pure contact validation — no "use server"/next/headers/server-only, so it
// is unit-testable and reusable. The Server Action wraps this with the
// honeypot check, rate limit and mail send.
import { z } from "zod";

export type ContactField =
  | "name"
  | "company"
  | "email"
  | "phone"
  | "sector"
  | "sectorOther"
  | "serviceInterest"
  | "message"
  | "kvkkAccepted";

export interface ContactMessages {
  required: string;
  email: string;
  kvkk: string;
  sectorOther: string;
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

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(
  input: ContactInput,
  m: ContactMessages,
): Partial<Record<ContactField, string>> {
  const schema = z.object({
    name: z.string().min(2, m.required),
    company: z.string().min(1, m.required),
    email: z.string().refine((v) => emailRe.test(v), m.email),
    phone: z.string().min(3, m.required),
    sector: z.string().optional(),
    sectorOther: z.string().optional(),
    serviceInterest: z.string().optional(),
    message: z.string().min(1, m.required),
  });

  const fieldErrors: Partial<Record<ContactField, string>> = {};
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ContactField;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
  }
  if (input.sector === "other" && !input.sectorOther) {
    fieldErrors.sectorOther = m.sectorOther;
  }
  if (!input.kvkkAccepted) {
    fieldErrors.kvkkAccepted = m.kvkk;
  }
  return fieldErrors;
}
