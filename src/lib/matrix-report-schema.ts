import { z } from "zod";
import {
  isValidPhoneTR,
  normalizePhoneTR,
} from "@/lib/contact-schema";
import type { FacilityType, MatrixStatus } from "@/lib/water-efficiency-matrix";

export type MatrixReportField =
  | "company"
  | "recipientName"
  | "email"
  | "phone"
  | "kvkkAccepted"
  | "naceCode"
  | "employeeCount"
  | "facilityType";

export interface MatrixReportMessages {
  required: string;
  email: string;
  kvkk: string;
  phoneInvalid: string;
  nameInvalid: string;
  naceRequired: string;
  employeeRequired: string;
  employeeInvalid: string;
}

export interface MatrixReportInput {
  company: string;
  recipientName: string;
  email: string;
  phone: string;
  kvkkAccepted: boolean;
  facilityType: FacilityType;
  naceCode: string;
  employeeCount: string;
  matrixStatus: MatrixStatus;
}

const nameRe = /^[\p{L}\s'\-]+$/u;

const facilityTypes = ["industrial", "osb", "freeZone", "industrialZone"] as const;
const matrixStatuses = ["YUKUMLU", "GONULLU", "OUT_OF_EK1"] as const;

export function validateMatrixReport(
  input: MatrixReportInput,
  m: MatrixReportMessages,
): Partial<Record<MatrixReportField, string>> {
  const fieldErrors: Partial<Record<MatrixReportField, string>> = {};

  const base = z.object({
    company: z.string().min(2, m.required).max(120, m.required),
    recipientName: z
      .string()
      .min(2, m.required)
      .max(80, m.required)
      .refine((v) => nameRe.test(v.trim()), m.nameInvalid),
    email: z.string().email(m.email).max(254, m.email),
    phone: z
      .string()
      .min(1, m.required)
      .refine((v) => isValidPhoneTR(v), m.phoneInvalid),
    facilityType: z.enum(facilityTypes),
    matrixStatus: z.enum(matrixStatuses),
    naceCode: z.string().optional(),
    employeeCount: z.string().optional(),
  });

  const parsed = base.safeParse(input);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as MatrixReportField;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
  }

  if (!input.kvkkAccepted) {
    fieldErrors.kvkkAccepted = m.kvkk;
  }

  if (input.facilityType === "industrial") {
    if (!input.naceCode.trim()) {
      fieldErrors.naceCode = m.naceRequired;
    }
    const emp = input.employeeCount.trim();
    if (!emp) {
      fieldErrors.employeeCount = m.employeeRequired;
    } else {
      const n = Number(emp);
      if (!Number.isInteger(n) || n < 1 || n > 999999) {
        fieldErrors.employeeCount = m.employeeInvalid;
      }
    }
  }

  return fieldErrors;
}

export function parseEmployeeCount(raw: string): number | null {
  const n = Number(raw.trim());
  if (!Number.isInteger(n) || n < 1) return null;
  return n;
}

export function normalizeMatrixPhone(raw: string): string {
  return normalizePhoneTR(raw);
}
