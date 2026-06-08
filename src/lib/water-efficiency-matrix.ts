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

export interface MatrixActivityInput {
  naceCode: string;
}

export interface MatrixRowResult extends MatrixResult {
  rowIndex: number;
  inputNaceCode: string;
}

export interface MatrixEvaluation {
  facilityType: FacilityType;
  employeeCount: number | null;
  rows: MatrixRowResult[];
  summary: {
    yukumlu: number;
    gonullu: number;
    outOfEk1: number;
  };
  headlineStatus: MatrixStatus;
}

export const NACE_EK1: NaceEntry[] = naceEk1 as NaceEntry[];

export const MAX_MATRIX_ACTIVITIES = 10;
export const MIN_MATRIX_ACTIVITIES = 1;

const NACE_BY_CODE = new Map(NACE_EK1.map((e) => [e.code, e]));

export function normalizeNaceCode(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 4) {
    return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  }
  const s = raw.trim().replace(",", ".").replace(/\s+/g, "");
  const m = s.match(/^(\d{2})\.(\d{2})$/);
  if (m) return `${m[1]}.${m[2]}`;
  return s;
}

export function isCompleteNaceCode(raw: string): boolean {
  return /^\d{2}\.\d{2}$/.test(normalizeNaceCode(raw));
}

export function findNaceEntry(code: string): NaceEntry | null {
  return NACE_BY_CODE.get(normalizeNaceCode(code)) ?? null;
}

export function searchNace(query: string, limit = 20): NaceEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return NACE_EK1.slice(0, limit);
  const normalized = normalizeNaceCode(q);
  const digits = q.replace(/\D/g, "");
  return NACE_EK1.filter((e) => {
    const codeDigits = e.code.replace(".", "");
    return (
      e.code.startsWith(normalized) ||
      (digits.length > 0 && codeDigits.startsWith(digits)) ||
      e.code.includes(q) ||
      e.activityTr.toLowerCase().includes(q)
    );
  }).slice(0, limit);
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
    (employeeCount ?? 0) >= EMPLOYEE_OBLIGATION_THRESHOLD
      ? "YUKUMLU"
      : "GONULLU";

  return {
    status,
    naceEntry,
    employeeCount,
    facilityType,
  };
}

function headlineFromSummary(summary: MatrixEvaluation["summary"]): MatrixStatus {
  if (summary.yukumlu > 0) return "YUKUMLU";
  if (summary.gonullu > 0) return "GONULLU";
  return "OUT_OF_EK1";
}

export function isMatrixEvaluationReady(
  facilityType: FacilityType,
  employeeCount: number | null,
  activities: MatrixActivityInput[],
): boolean {
  if (facilityType !== "industrial") return true;
  if (employeeCount == null || employeeCount < 1) return false;
  if (
    activities.length < MIN_MATRIX_ACTIVITIES ||
    activities.length > MAX_MATRIX_ACTIVITIES
  ) {
    return false;
  }
  return activities.every((a) => isCompleteNaceCode(a.naceCode));
}

export function evaluateMatrixMulti(
  facilityType: FacilityType,
  employeeCount: number | undefined,
  activities: MatrixActivityInput[],
): MatrixEvaluation | null {
  if (facilityType !== "industrial") {
    const single = evaluateMatrix({ facilityType });
    return {
      facilityType,
      employeeCount: null,
      rows: [{ ...single, rowIndex: 0, inputNaceCode: "" }],
      summary: { yukumlu: 1, gonullu: 0, outOfEk1: 0 },
      headlineStatus: "YUKUMLU",
    };
  }

  const emp =
    typeof employeeCount === "number" && employeeCount >= 1
      ? Math.floor(employeeCount)
      : null;

  if (!isMatrixEvaluationReady(facilityType, emp, activities)) {
    return null;
  }

  const rows: MatrixRowResult[] = activities.map((activity, index) => {
    const code = normalizeNaceCode(activity.naceCode);
    const result = evaluateMatrix({
      facilityType: "industrial",
      naceCode: code,
      employeeCount: emp!,
    });
    return { ...result, rowIndex: index, inputNaceCode: code };
  });

  const summary = { yukumlu: 0, gonullu: 0, outOfEk1: 0 };
  for (const row of rows) {
    if (row.status === "YUKUMLU") summary.yukumlu++;
    else if (row.status === "GONULLU") summary.gonullu++;
    else summary.outOfEk1++;
  }

  return {
    facilityType,
    employeeCount: emp,
    rows,
    summary,
    headlineStatus: headlineFromSummary(summary),
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

export function buildRowSummary(row: MatrixRowResult, lang: "TR" | "EN"): string {
  return buildResultSummary(row, lang);
}

export function buildMultiResultSummary(
  evaluation: MatrixEvaluation,
  lang: "TR" | "EN",
): string {
  const { summary, facilityType, employeeCount } = evaluation;

  if (facilityType !== "industrial") {
    return buildResultSummary(evaluation.rows[0], lang);
  }

  const total = evaluation.rows.length;
  if (lang === "TR") {
    return `${total} faaliyet değerlendirildi (${employeeCount ?? "—"} çalışan): ${summary.yukumlu} yükümlü, ${summary.gonullu} gönüllü, ${summary.outOfEk1} Ek-1 kapsamı dışı. Aşağıdaki tabloda faaliyet bazlı sonuçlar yer almaktadır.`;
  }
  return `${total} activities assessed (${employeeCount ?? "—"} employees): ${summary.yukumlu} obligatory, ${summary.gonullu} voluntary, ${summary.outOfEk1} outside Annex-1. Per-activity results are listed in the table below.`;
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
  const code = naceEntry?.code ?? result.naceEntry?.code ?? "";

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

export function formatSummaryLine(
  summary: MatrixEvaluation["summary"],
  lang: "TR" | "EN",
): string {
  if (lang === "TR") {
    return `${summary.yukumlu} yükümlü, ${summary.gonullu} gönüllü, ${summary.outOfEk1} Ek-1 dışı faaliyet`;
  }
  return `${summary.yukumlu} obligatory, ${summary.gonullu} voluntary, ${summary.outOfEk1} outside Annex-1`;
}
