import factorsData from "@/data/tep-conversion-factors.json";
import type { LangCode } from "@/i18n/getDictionary";

export type TepCalculationType =
  | "direct"
  | "mass_ton"
  | "liter_via_density"
  | "steam_energy"
  | "custom";

export interface TepSourceFactor {
  energy_source_key: string;
  display_name_tr: string;
  display_name_en: string;
  allowed_units: string[];
  default_unit: string;
  tep_factor: number | null;
  tep_per_ton?: number;
  factor_unit: string;
  density_kg_per_liter: number | null;
  lower_heating_value: number | null;
  calculation_type: TepCalculationType;
  source_label: string;
  source_note: string;
  version: string;
  is_active: boolean;
  last_verified_at: string;
}

export interface TepFactorsMeta {
  source_label: string;
  source_note_tr: string;
  source_note_en: string;
  version: string;
  last_verified_at: string;
}

export interface TepRowInput {
  key: string;
  amountRaw: string;
  unit: string;
  customName?: string;
  customFactor?: string;
}

export interface TepRowResult {
  key: string;
  displayName: string;
  amount: number;
  unit: string;
  tep: number;
  factorLabel: string;
  factorValue: number;
  sharePercent: number;
  isCustomFactor: boolean;
  skipped: boolean;
}

export interface TepCalculationResult {
  rows: TepRowResult[];
  totalTep: number;
  commentaryKey: TepCommentaryBand;
  ctaBand: "standard" | "expert";
}

export type TepCommentaryBand = "0_250" | "250_500" | "500_1000" | "1000_plus";

const ELECTRICITY_TEP_PER_KWH = 0.000086;

export const TEP_FACTORS_META = factorsData.meta as TepFactorsMeta;

export function getActiveTepSources(): TepSourceFactor[] {
  return (factorsData.sources as TepSourceFactor[]).filter((s) => s.is_active);
}

export function getTepSource(key: string): TepSourceFactor | undefined {
  return getActiveTepSources().find((s) => s.energy_source_key === key);
}

export function displayName(source: TepSourceFactor, lang: LangCode): string {
  return lang === "TR" ? source.display_name_tr : source.display_name_en;
}

/** Parse user input; empty → 0; rejects negative. */
export function parseConsumptionInput(raw: string): number | null {
  const s = raw.trim().replace(/\s/g, "").replace(",", ".");
  if (!s) return 0;
  const n = Number(s);
  if (!Number.isFinite(n) || n < 0) return null;
  return n;
}

function massTonToTep(amount: number, unit: string, tepPerTon: number): number {
  if (unit === "ton") return amount * tepPerTon;
  if (unit === "kg") return amount * (tepPerTon / 1000);
  return amount * tepPerTon;
}

function literToTep(
  liters: number,
  density: number,
  tepPerTon: number,
): number {
  return (liters * density) / 1000 * tepPerTon;
}

export function computeRowTep(
  source: TepSourceFactor,
  amount: number,
  unit: string,
  customFactor?: number,
): { tep: number; factorLabel: string; factorValue: number; isCustom: boolean } {
  if (source.calculation_type === "custom" && customFactor != null) {
    return {
      tep: amount * customFactor,
      factorLabel: `${customFactor} TEP/${unit}`,
      factorValue: customFactor,
      isCustom: true,
    };
  }

  if (source.calculation_type === "direct" && source.tep_factor != null) {
    return {
      tep: amount * source.tep_factor,
      factorLabel: `${source.tep_factor} ${source.factor_unit}`,
      factorValue: source.tep_factor,
      isCustom: false,
    };
  }

  if (source.calculation_type === "steam_energy") {
    const kwh = unit === "MWh" ? amount * 1000 : amount;
    return {
      tep: kwh * ELECTRICITY_TEP_PER_KWH,
      factorLabel: `${ELECTRICITY_TEP_PER_KWH} TEP/kWh`,
      factorValue: ELECTRICITY_TEP_PER_KWH,
      isCustom: false,
    };
  }

  if (source.calculation_type === "mass_ton" && source.tep_per_ton != null) {
    const tep = massTonToTep(amount, unit, source.tep_per_ton);
    const factorValue = unit === "kg" ? source.tep_per_ton / 1000 : source.tep_per_ton;
    return {
      tep,
      factorLabel:
        unit === "kg"
          ? `${source.tep_per_ton / 1000} TEP/kg`
          : `${source.tep_per_ton} TEP/ton`,
      factorValue,
      isCustom: false,
    };
  }

  if (
    source.calculation_type === "liter_via_density" &&
    source.tep_per_ton != null &&
    source.density_kg_per_liter != null
  ) {
    if (unit === "ton") {
      return {
        tep: amount * source.tep_per_ton,
        factorLabel: `${source.tep_per_ton} TEP/ton`,
        factorValue: source.tep_per_ton,
        isCustom: false,
      };
    }
    const tep = literToTep(amount, source.density_kg_per_liter, source.tep_per_ton);
    const factorValue =
      (source.density_kg_per_liter / 1000) * source.tep_per_ton;
    return {
      tep,
      factorLabel: `${factorValue.toFixed(6)} TEP/L`,
      factorValue,
      isCustom: false,
    };
  }

  return { tep: 0, factorLabel: "—", factorValue: 0, isCustom: false };
}

export function evaluateTepCalculation(
  rows: TepRowInput[],
  lang: LangCode,
): { result: TepCalculationResult | null; errors: string[] } {
  const errors: string[] = [];
  const computed: Omit<TepRowResult, "sharePercent">[] = [];

  for (const row of rows) {
    const amount = parseConsumptionInput(row.amountRaw);
    if (amount === null) {
      errors.push(row.key);
      continue;
    }

    if (row.key.startsWith("custom:")) {
      const name = row.customName?.trim() || (lang === "TR" ? "Özel kaynak" : "Custom source");
      const factor = parseConsumptionInput(row.customFactor ?? "");
      if (amount > 0 && (factor === null || factor === 0)) {
        errors.push(row.key);
        continue;
      }
      const f = factor ?? 0;
      computed.push({
        key: row.key,
        displayName: name,
        amount,
        unit: row.unit,
        tep: amount * f,
        factorLabel: `${f} TEP/${row.unit}`,
        factorValue: f,
        isCustomFactor: true,
        skipped: amount === 0,
      });
      continue;
    }

    const source = getTepSource(row.key);
    if (!source) continue;

    const { tep, factorLabel, factorValue, isCustom } = computeRowTep(
      source,
      amount,
      row.unit,
    );

    computed.push({
      key: row.key,
      displayName: displayName(source, lang),
      amount,
      unit: row.unit,
      tep,
      factorLabel,
      factorValue,
      isCustomFactor: isCustom,
      skipped: amount === 0,
    });
  }

  if (errors.length > 0) return { result: null, errors };

  const activeRows = computed.filter((r) => !r.skipped);
  const totalTep = activeRows.reduce((s, r) => s + r.tep, 0);

  const withShare: TepRowResult[] = computed.map((r) => ({
    ...r,
    sharePercent: totalTep > 0 && !r.skipped ? (r.tep / totalTep) * 100 : 0,
  }));

  return {
    result: {
      rows: withShare,
      totalTep,
      commentaryKey: commentaryBand(totalTep),
      ctaBand: totalTep >= 500 ? "expert" : "standard",
    },
    errors: [],
  };
}

export function commentaryBand(totalTep: number): TepCommentaryBand {
  if (totalTep >= 1000) return "1000_plus";
  if (totalTep >= 500) return "500_1000";
  if (totalTep >= 250) return "250_500";
  return "0_250";
}

export function formatTepValue(tep: number, lang: LangCode): string {
  if (tep > 0 && tep < 0.001) {
    return lang === "TR" ? "<0,001 TEP" : "<0.001 TEP";
  }
  return `${tep.toLocaleString(lang === "TR" ? "tr-TR" : "en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  })} TEP`;
}

export function formatNumber(n: number, lang: LangCode): string {
  return n.toLocaleString(lang === "TR" ? "tr-TR" : "en-GB", {
    maximumFractionDigits: 3,
  });
}

export function formatPercent(n: number, lang: LangCode): string {
  return n.toLocaleString(lang === "TR" ? "tr-TR" : "en-GB", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export const TEP_LEAD_STORAGE_KEY = "nexovia_tep_lead";

export interface TepLeadPayload {
  totalTep: number;
  calculatedAt: string;
  source: string;
  serviceInterest: string;
  messageBlock: string;
  rows: Array<{
    name: string;
    amount: number;
    unit: string;
    tep: number;
    factor: string;
  }>;
}

export function buildTepLeadMessage(
  result: TepCalculationResult,
  lang: LangCode,
  serviceTitle: string,
): string {
  const lines =
    lang === "TR"
      ? [
          "--- TEP Hesaplama Motoru (ön değerlendirme) ---",
          `Hesaplama tarihi: ${new Date().toLocaleString("tr-TR")}`,
          `Toplam yaklaşık TEP: ${formatTepValue(result.totalTep, lang)}`,
          "Kaynak bazlı özet:",
        ]
      : [
          "--- TEP calculator (preliminary assessment) ---",
          `Calculated at: ${new Date().toLocaleString("en-GB")}`,
          `Approx. total TEP: ${formatTepValue(result.totalTep, lang)}`,
          "Breakdown:",
        ];

  for (const row of result.rows.filter((r) => !r.skipped)) {
    lines.push(
      `- ${row.displayName}: ${formatNumber(row.amount, lang)} ${row.unit} → ${formatTepValue(row.tep, lang)} (${row.factorLabel})`,
    );
  }

  lines.push(
    lang === "TR"
      ? `İlgilendiğim alan: ${serviceTitle}`
      : `Service interest: ${serviceTitle}`,
  );
  lines.push(
    lang === "TR" ? "Kaynak: TEP Hesaplama Motoru" : "Source: TEP calculator",
  );

  return lines.join("\n");
}
