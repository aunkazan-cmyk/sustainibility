import naceEk1 from "../data/nace-ek1.json";

export type FacilityType = "industrial" | "osb" | "freeZone" | "industrialZone";

export type MatrixStatus = "YUKUMLU" | "GONULLU" | "OUT_OF_EK1";

export interface NaceEntry {
  no: number;
  code: string;
  activityTr: string;
  status: "YUKUMLU" | "GONULLU";
}

export interface MatrixInput {
  facilityType: FacilityType;
  naceCode?: string;
  employeeCount?: number;
}

export interface MatrixResult {
  status: MatrixStatus;
  naceEntry: NaceEntry | null;
  employeeCount: number | null;
  facilityType: FacilityType;
}

export const NACE_EK1: NaceEntry[] = naceEk1 as NaceEntry[];

const NACE_BY_CODE = new Map(NACE_EK1.map((e) => [e.code, e]));

export function normalizeNaceCode(raw: string): string {
  const s = raw.trim().replace(",", ".");
  const m = s.match(/^(\d{2})\.?(\d{2})$/);
  if (!m) return s;
  return `${m[1]}.${m[2]}`;
}

export function findNaceEntry(code: string): NaceEntry | null {
  return NACE_BY_CODE.get(normalizeNaceCode(code)) ?? null;
}

export function searchNace(query: string, limit = 20): NaceEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return NACE_EK1.slice(0, limit);
  const normalized = normalizeNaceCode(q);
  return NACE_EK1.filter(
    (e) =>
      e.code.startsWith(normalized) ||
      e.code.includes(q) ||
      e.activityTr.toLowerCase().includes(q),
  ).slice(0, limit);
}

export const EMPLOYEE_OBLIGATION_THRESHOLD = 50;

export function evaluateMatrix(input: MatrixInput): MatrixResult {
  const { facilityType } = input;

  if (facilityType !== "industrial") {
    return {
      status: "YUKUMLU",
      naceEntry: null,
      employeeCount: null,
      facilityType,
    };
  }

  const employeeCount =
    typeof input.employeeCount === "number" && input.employeeCount >= 1
      ? Math.floor(input.employeeCount)
      : null;

  const naceEntry = input.naceCode ? findNaceEntry(input.naceCode) : null;

  if (!naceEntry) {
    return {
      status: "OUT_OF_EK1",
      naceEntry: null,
      employeeCount,
      facilityType,
    };
  }

  if (naceEntry.status === "GONULLU") {
    return {
      status: "GONULLU",
      naceEntry,
      employeeCount,
      facilityType,
    };
  }

  const status: MatrixStatus =
    (employeeCount ?? 0) >= EMPLOYEE_OBLIGATION_THRESHOLD ? "YUKUMLU" : "GONULLU";

  return {
    status,
    naceEntry,
    employeeCount,
    facilityType,
  };
}

export function facilityTypeLabel(
  type: FacilityType,
  lang: "TR" | "EN",
): string {
  const labels: Record<FacilityType, [string, string]> = {
    industrial: ["Endüstriyel işletme", "Industrial facility"],
    osb: ["Organize Sanayi Bölgesi (OSB)", "Organized Industrial Zone (OIZ)"],
    freeZone: ["Serbest Bölge", "Free Zone"],
    industrialZone: ["Endüstri Bölgesi", "Industrial Zone"],
  };
  return labels[type][lang === "TR" ? 0 : 1];
}

export function statusLabel(status: MatrixStatus, lang: "TR" | "EN"): string {
  const labels: Record<MatrixStatus, [string, string]> = {
    YUKUMLU: ["YÜKÜMLÜ", "OBLIGATORY"],
    GONULLU: ["GÖNÜLLÜ", "VOLUNTARY"],
    OUT_OF_EK1: ["Ek-1 kapsamında değil", "Outside Annex-1 scope"],
  };
  return labels[status][lang === "TR" ? 0 : 1];
}

export function buildResultSummary(
  result: MatrixResult,
  lang: "TR" | "EN",
): string {
  const { status, naceEntry, employeeCount, facilityType } = result;

  if (facilityType !== "industrial") {
    const zone = facilityTypeLabel(facilityType, lang);
    if (lang === "TR") {
      return `${zone} statüsünde faaliyet gösteren kuruluşlar, Su Verimliliği Yönetmeliği ve Endüstriyel Su Verimliliği Başvuru Kılavuzu (s.15) kapsamında çalışan sayısı şartı aranmaksızın yükümlü kabul edilir.`;
    }
    return `Entities operating as ${zone} are classified as obligatory under the Water Efficiency Regulation and the Industrial Water Efficiency Application Guide (p.15), without an employee-count threshold.`;
  }

  if (status === "OUT_OF_EK1") {
    if (lang === "TR") {
      return "Ek-1 Kapsamında Değilsiniz. 30 Haziran 2026 tarihinden sonra GÖNÜLLÜ olarak başvuruda bulunabilirsiniz.";
    }
    return "You are outside Annex-1 scope. Voluntary applications may be possible after 30 June 2026.";
  }

  const activity = naceEntry?.activityTr ?? "";
  const code = naceEntry?.code ?? "";

  if (status === "GONULLU" && naceEntry?.status === "GONULLU") {
    if (lang === "TR") {
      return `Kılavuz Ek-1 kapsamında ${code} (${activity}) faaliyeti gönüllü statüsündedir; çalışan sayısı şartı aranmaksızın isteğe bağlı belge başvurusu yapılabilir.`;
    }
    return `Under Guide Annex-1, activity ${code} (${activity}) is voluntary; certification may be applied for without an employee-count requirement.`;
  }

  if (status === "GONULLU" && naceEntry?.status === "YUKUMLU") {
    if (lang === "TR") {
      return `Kılavuz Ek-1'de ${code} (${activity}) faaliyeti yükümlü sınıfında yer almakla birlikte, çalışan sayınız ${employeeCount ?? "—"} olup 50'nin altında olduğundan gönüllü statüsündesiniz.`;
    }
    return `Annex-1 lists ${code} (${activity}) as obligatory, but with ${employeeCount ?? "—"} employees (below 50) you are currently in the voluntary category.`;
  }

  if (lang === "TR") {
    return `Su Verimliliği Yönetmeliği ve Endüstriyel Su Verimliliği Başvuru Kılavuzu Ek-1 kapsamında ${code} (${activity}) faaliyetindesiniz. Çalışan sayınız ${employeeCount ?? "—"} olup 50 ve üzeri eşiği karşıladığından yükümlü statüsündesiniz; su verimliliği sistemi kurulumu ve belge başvurusu yükümlülükleri değerlendirilmelidir.`;
  }
  return `Under the Water Efficiency Regulation and Guide Annex-1, you operate in ${code} (${activity}). With ${employeeCount ?? "—"} employees (50 or above), you are in the obligatory category and should assess system setup and certification duties.`;
}
