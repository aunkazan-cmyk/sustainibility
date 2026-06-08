import { z } from "zod";
import {
  isValidPhoneTR,
  normalizePhoneTR,
} from "@/lib/contact-schema";
import type { FacilityType, MatrixStatus } from "@/lib/water-efficiency-matrix";
import {
  MAX_MATRIX_ACTIVITIES,
  MIN_MATRIX_ACTIVITIES,
  isCompleteNaceCode,
  normalizeNaceCode,
} from "@/lib/water-efficiency-matrix";

export type MatrixReportField =
  | "company"
  | "recipientName"
  | "email"
  | "phone"
  | "kvkkAccepted"
  | "employeeCount"
  | "facilityType"
  | "activitiesJson"
  | "headlineStatus";

export interface MatrixReportMessages {
  required: string;
  email: string;
  kvkk: string;
  phoneInvalid: string;
  nameInvalid: string;
  naceRequired: string;
  employeeRequired: string;
  employeeInvalid: string;
  activitiesInvalid: string;
}

export interface MatrixReportInput {
  company: string;
  recipientName: string;
  email: string;
  phone: string;
  kvkkAccepted: boolean;
  facilityType: FacilityType;
  employeeCount: string;
  activitiesJson: string;
  headlineStatus: MatrixStatus;
}

const nameRe = /^[\p{L}\s'\-]+$/u;

const facilityTypes = ["industrial", "osb", "freeZone", "industrialZone"] as const;
const matrixStatuses = ["YUKUMLU", "GONULLU", "OUT_OF_EK1"] as const;

export function parseActivitiesJson(raw: string): string[] | null {
  if (!raw.trim()) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    const codes = parsed
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object" && "naceCode" in item) {
          return String((item as { naceCode: string }).naceCode);
        }
        return null;
      })
      .filter((c): c is string => Boolean(c));
    if (
      codes.length < MIN_MATRIX_ACTIVITIES ||
      codes.length > MAX_MATRIX_ACTIVITIES
    ) {
      return null;
    }
    if (!codes.every((c) => isCompleteNaceCode(c))) return null;
    return codes.map((c) => normalizeNaceCode(c));
  } catch {
    return null;
  }
}

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
    headlineStatus: z.enum(matrixStatuses),
    employeeCount: z.string().optional(),
    activitiesJson: z.string().optional(),
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
    const emp = input.employeeCount.trim();
    if (!emp) {
      fieldErrors.employeeCount = m.employeeRequired;
    } else {
      const n = Number(emp);
      if (!Number.isInteger(n) || n < 1 || n > 999999) {
        fieldErrors.employeeCount = m.employeeInvalid;
      }
    }

    const activities = parseActivitiesJson(input.activitiesJson);
    if (!activities) {
      fieldErrors.activitiesJson = m.activitiesInvalid;
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
