"use server";

import { headers } from "next/headers";
import { sendMatrixLeadEmail } from "@/lib/matrix-mail";
import { buildMatrixPdf } from "@/lib/matrix-pdf";
import { postMatrixLeadWebhook } from "@/lib/matrix-webhook";
import {
  parseEmployeeCount,
  validateMatrixReport,
  type MatrixReportField,
} from "@/lib/matrix-report-schema";
import {
  evaluateMatrix,
  buildResultSummary,
  type FacilityType,
  type MatrixStatus,
} from "@/lib/water-efficiency-matrix";

export type MatrixReportState =
  | { status: "idle" }
  | {
      status: "error";
      message?: string;
      fieldErrors?: Partial<Record<MatrixReportField, string>>;
      values?: Record<string, string>;
    }
  | {
      status: "success";
      pdfBase64: string;
      fileName: string;
    };

const tr = {
  required: "Bu alan zorunludur.",
  email: "Geçerli bir e-posta girin.",
  kvkk: "Devam etmek için KVKK metnini onaylayın.",
  phoneInvalid:
    "Geçerli bir Türkiye telefon numarası girin (10 veya 11 hane).",
  nameInvalid: "Ad soyad yalnızca harf ve boşluk içerebilir.",
  naceRequired: "NACE kodu seçin.",
  employeeRequired: "Çalışan sayısını girin.",
  employeeInvalid: "Geçerli bir çalışan sayısı girin.",
  fix: "Lütfen işaretli alanları kontrol edin.",
  fail: "Gönderim sırasında bir sorun oluştu. Lütfen tekrar deneyin.",
  invalidMatrix: "Matris sonucu geçersiz. Lütfen değerlendirmeyi yenileyin.",
};

const en = {
  required: "This field is required.",
  email: "Enter a valid email.",
  kvkk: "Please accept the privacy notice to continue.",
  phoneInvalid: "Enter a valid Turkish phone number (10 or 11 digits).",
  nameInvalid: "Full name may only contain letters and spaces.",
  naceRequired: "Select a NACE code.",
  employeeRequired: "Enter employee count.",
  employeeInvalid: "Enter a valid employee count.",
  fix: "Please review the highlighted fields.",
  fail: "Something went wrong. Please try again.",
  invalidMatrix: "Invalid assessment result. Please refresh the evaluation.",
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

function parseFacilityType(raw: string): FacilityType | null {
  if (
    raw === "industrial" ||
    raw === "osb" ||
    raw === "freeZone" ||
    raw === "industrialZone"
  ) {
    return raw;
  }
  return null;
}

function parseMatrixStatus(raw: string): MatrixStatus | null {
  if (raw === "YUKUMLU" || raw === "GONULLU" || raw === "OUT_OF_EK1") {
    return raw;
  }
  return null;
}

export async function submitMatrixReport(
  _prev: MatrixReportState,
  formData: FormData,
): Promise<MatrixReportState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const locale = get("locale") === "en" ? "en" : "tr";
  const m = locale === "tr" ? tr : en;

  if (get("company_url")) {
    return { status: "idle" };
  }

  const values: Record<string, string> = {
    company: get("company"),
    recipientName: get("recipientName"),
    email: get("email"),
    phone: get("phone"),
    facilityType: get("facilityType"),
    naceCode: get("naceCode"),
    employeeCount: get("employeeCount"),
    matrixStatus: get("matrixStatus"),
  };

  const kvkkAccepted = formData.get("kvkkAccepted") != null;
  const facilityType = parseFacilityType(values.facilityType);
  const matrixStatus = parseMatrixStatus(values.matrixStatus);

  if (!facilityType || !matrixStatus) {
    return {
      status: "error",
      message: m.invalidMatrix,
      values,
    };
  }

  const fieldErrors = validateMatrixReport(
    {
      company: values.company,
      recipientName: values.recipientName,
      email: values.email,
      phone: values.phone,
      kvkkAccepted,
      facilityType,
      naceCode: values.naceCode,
      employeeCount: values.employeeCount,
      matrixStatus,
    },
    m,
  );

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: m.fix, fieldErrors, values };
  }

  const h = await headers();
  const ip =
    (h.get("x-forwarded-for") ?? "").split(",")[0].trim() ||
    h.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return { status: "error", message: m.fail, values };
  }

  const employeeCount =
    facilityType === "industrial"
      ? parseEmployeeCount(values.employeeCount)
      : null;

  const result = evaluateMatrix({
    facilityType,
    naceCode: facilityType === "industrial" ? values.naceCode : undefined,
    employeeCount: employeeCount ?? undefined,
  });

  if (result.status !== matrixStatus) {
    return {
      status: "error",
      message: m.invalidMatrix,
      values,
    };
  }

  const lang = locale === "tr" ? "TR" : "EN";

  try {
    await sendMatrixLeadEmail({
      company: values.company,
      recipientName: values.recipientName,
      email: values.email,
      phone: values.phone,
      kvkkAccepted,
      locale,
      result,
    });

    await postMatrixLeadWebhook({
      company: values.company,
      recipientName: values.recipientName,
      email: values.email,
      phone: values.phone,
      locale,
      facilityType,
      naceCode: result.naceEntry?.code ?? null,
      naceActivity: result.naceEntry?.activityTr ?? null,
      employeeCount: result.employeeCount,
      matrixStatus: result.status,
      summary: buildResultSummary(result, lang),
      submittedAt: new Date().toISOString(),
    });

    const pdfBytes = await buildMatrixPdf({
      locale,
      company: values.company,
      recipientName: values.recipientName,
      result,
    });

    const fileName =
      locale === "tr"
        ? `nexovia-yukumluluk-taslak-${values.company.replace(/[^\p{L}\p{N}]+/gu, "-").slice(0, 40)}.pdf`
        : `nexovia-obligation-draft-${values.company.replace(/[^\p{L}\p{N}]+/gu, "-").slice(0, 40)}.pdf`;

    return {
      status: "success",
      pdfBase64: Buffer.from(pdfBytes).toString("base64"),
      fileName,
    };
  } catch (err) {
    console.error("[matrix-report] failed:", err);
    return { status: "error", message: m.fail, values };
  }
}
