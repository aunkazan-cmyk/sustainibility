// Shared contact-action types + initial state. Deliberately NOT in the
// "use server" module: a Server Action file may only export async functions
// (Next 16). Re-exporting a type or const from there makes Turbopack emit a
// runtime reference to a type-erased binding → "ContactField is not defined"
// at module evaluation.
import type { ContactField } from "@/lib/contact-schema";

export type { ContactField };

export interface CaptchaChallenge {
  prompt: string;
  token: string;
}

export interface ContactState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
  values?: Record<string, string>;
  captcha?: CaptchaChallenge;
}

export const initialContactState: ContactState = { status: "idle" };
