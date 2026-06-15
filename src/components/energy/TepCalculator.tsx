"use client";

import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";
import type { Locale } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { pathFor } from "@/lib/routes";
import {
  TEP_FACTORS_META,
  TEP_LEAD_STORAGE_KEY,
  buildTepLeadMessage,
  displayName,
  evaluateTepCalculation,
  formatNumber,
  formatPercent,
  formatTepValue,
  getActiveTepSources,
  type TepCalculationResult,
  type TepRowInput,
} from "@/lib/tep-calculator";
import { ArrowRight } from "@/components/shared/primitives";

const fieldStyle: CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid var(--nx-200)",
  fontSize: 14,
  background: "#fff",
  boxSizing: "border-box",
};

function unitLabel(unit: string, lang: "TR" | "EN"): string {
  const map: Record<string, [string, string]> = {
    kWh: ["kWh", "kWh"],
    MWh: ["MWh", "MWh"],
    m3: ["m³", "m³"],
    kg: ["kg", "kg"],
    ton: ["ton", "ton"],
    liter: ["litre", "L"],
  };
  const pair = map[unit];
  return pair ? pair[lang === "TR" ? 0 : 1] : unit;
}

let customId = 0;
function newCustomId() {
  customId += 1;
  return `custom:${customId}`;
}

export function TepCalculator({ locale }: { locale: Locale }) {
  const { t, lang } = getDictionary(locale);
  const tx = t.energyPage.tep;
  const sources = getActiveTepSources();

  const [rows, setRows] = useState<Record<string, { amount: string; unit: string }>>(
    () =>
      Object.fromEntries(
        sources.map((s) => [s.energy_source_key, { amount: "", unit: s.default_unit }]),
      ),
  );

  const [customRows, setCustomRows] = useState<
    { id: string; name: string; amount: string; unit: string; factor: string }[]
  >([]);

  const [result, setResult] = useState<TepCalculationResult | null>(null);
  const [invalidKeys, setInvalidKeys] = useState<Set<string>>(new Set());
  const [calculated, setCalculated] = useState(false);

  const contactHref = pathFor("contact", locale);
  const serviceTitle = t.services.energy.title;

  const rowInputs: TepRowInput[] = useMemo(() => {
    const catalog: TepRowInput[] = sources.map((s) => ({
      key: s.energy_source_key,
      amountRaw: rows[s.energy_source_key]?.amount ?? "",
      unit: rows[s.energy_source_key]?.unit ?? s.default_unit,
    }));
    const custom: TepRowInput[] = customRows.map((c) => ({
      key: c.id,
      amountRaw: c.amount,
      unit: c.unit.trim() || "birim",
      customName: c.name,
      customFactor: c.factor,
    }));
    return [...catalog, ...custom];
  }, [sources, rows, customRows]);

  const handleCalculate = () => {
    const { result: r, errors } = evaluateTepCalculation(rowInputs, lang);
    setInvalidKeys(new Set(errors));
    setCalculated(true);
    setResult(errors.length > 0 ? null : r);
  };

  const handleLead = () => {
    if (!result) return;
    const messageBlock = buildTepLeadMessage(result, lang, serviceTitle);
    const payload = {
      totalTep: result.totalTep,
      calculatedAt: new Date().toISOString(),
      source: lang === "TR" ? "TEP Hesaplama Motoru" : "TEP calculator",
      serviceInterest: serviceTitle,
      messageBlock,
      rows: result.rows
        .filter((row) => !row.skipped)
        .map((row) => ({
          name: row.displayName,
          amount: row.amount,
          unit: row.unit,
          tep: row.tep,
          factor: row.factorLabel,
        })),
    };
    try {
      sessionStorage.setItem(TEP_LEAD_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* ignore quota */
    }
  };

  const ctaTitle =
    result?.ctaBand === "expert" ? tx.ctaExpertTitle : tx.ctaStandardTitle;
  const ctaButton =
    result?.ctaBand === "expert" ? tx.ctaExpertButton : tx.ctaStandardButton;

  const commentary =
    result &&
    ({
      "0_250": tx.commentary0_250,
      "250_500": tx.commentary250_500,
      "500_1000": tx.commentary500_1000,
      "1000_plus": tx.commentary1000_plus,
    }[result.commentaryKey] as string);

  return (
    <section
      data-nx-section
      id="tep-calculator"
      className="nx-tep-calculator"
      style={{ padding: "96px 0", background: "var(--nx-energy-soft)" }}
    >
      <div className="nx-container">
        <div className="nx-tep-calculator__header">
          <span className="nx-pill nx-pill--energy">{tx.eyebrow}</span>
          <h2 className="nx-display nx-tep-calculator__title">{tx.title}</h2>
          <p className="nx-tep-calculator__intro">{tx.intro}</p>
        </div>

        <div className="nx-tep-calculator__panel">
          <p className="nx-tep-calculator__hint">{tx.inputHint}</p>

          <div className="nx-tep-calculator__rows">
            {sources.map((source) => {
              const row = rows[source.energy_source_key];
              const invalid = invalidKeys.has(source.energy_source_key);
              return (
                <div key={source.energy_source_key} className="nx-tep-calculator__row">
                  <label className="nx-tep-calculator__row-label">
                    {displayName(source, lang)}
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0"
                    value={row?.amount ?? ""}
                    onChange={(e) =>
                      setRows((prev) => ({
                        ...prev,
                        [source.energy_source_key]: {
                          ...prev[source.energy_source_key],
                          amount: e.target.value,
                        },
                      }))
                    }
                    style={{
                      ...fieldStyle,
                      borderColor: invalid ? "#b91c1c" : undefined,
                    }}
                    aria-invalid={invalid}
                  />
                  {source.allowed_units.length > 1 ? (
                    <select
                      value={row?.unit ?? source.default_unit}
                      onChange={(e) =>
                        setRows((prev) => ({
                          ...prev,
                          [source.energy_source_key]: {
                            ...prev[source.energy_source_key],
                            unit: e.target.value,
                          },
                        }))
                      }
                      style={fieldStyle}
                    >
                      {source.allowed_units.map((u) => (
                        <option key={u} value={u}>
                          {unitLabel(u, lang)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="nx-tep-calculator__unit">
                      {unitLabel(source.default_unit, lang)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {customRows.map((c) => (
            <div key={c.id} className="nx-tep-calculator__custom-row">
              <input
                type="text"
                placeholder={tx.customNamePlaceholder}
                value={c.name}
                onChange={(e) =>
                  setCustomRows((rows) =>
                    rows.map((r) =>
                      r.id === c.id ? { ...r, name: e.target.value } : r,
                    ),
                  )
                }
                style={fieldStyle}
              />
              <input
                type="text"
                inputMode="decimal"
                placeholder="0"
                value={c.amount}
                onChange={(e) =>
                  setCustomRows((rows) =>
                    rows.map((r) =>
                      r.id === c.id ? { ...r, amount: e.target.value } : r,
                    ),
                  )
                }
                style={{
                  ...fieldStyle,
                  borderColor: invalidKeys.has(c.id) ? "#b91c1c" : undefined,
                }}
              />
              <input
                type="text"
                placeholder={tx.customUnitPlaceholder}
                value={c.unit}
                onChange={(e) =>
                  setCustomRows((rows) =>
                    rows.map((r) =>
                      r.id === c.id ? { ...r, unit: e.target.value } : r,
                    ),
                  )
                }
                style={fieldStyle}
              />
              <input
                type="text"
                inputMode="decimal"
                placeholder={tx.customFactorPlaceholder}
                value={c.factor}
                onChange={(e) =>
                  setCustomRows((rows) =>
                    rows.map((r) =>
                      r.id === c.id ? { ...r, factor: e.target.value } : r,
                    ),
                  )
                }
                style={fieldStyle}
              />
              <button
                type="button"
                className="nx-btn nx-btn--ghost"
                onClick={() =>
                  setCustomRows((rows) => rows.filter((r) => r.id !== c.id))
                }
              >
                {tx.removeCustom}
              </button>
              <p className="nx-tep-calculator__custom-warn">{tx.customFactorWarning}</p>
            </div>
          ))}

          <div className="nx-tep-calculator__actions">
            <button
              type="button"
              className="nx-btn nx-btn--ghost"
              onClick={() =>
                setCustomRows((rows) =>
                  rows.length >= 5
                    ? rows
                    : [
                        ...rows,
                        {
                          id: newCustomId(),
                          name: "",
                          amount: "",
                          unit: "",
                          factor: "",
                        },
                      ],
                )
              }
              disabled={customRows.length >= 5}
            >
              {tx.addCustom}
            </button>
            <button
              type="button"
              className="nx-btn nx-btn--primary"
              onClick={handleCalculate}
            >
              {tx.calculateButton}
            </button>
          </div>

          {invalidKeys.size > 0 && calculated && (
            <p className="nx-tep-calculator__error">{tx.validationError}</p>
          )}

          {result && calculated && (
            <div className="nx-tep-calculator__results">
              <div className="nx-tep-calculator__total">
                <span>{tx.totalLabel}</span>
                <strong>{formatTepValue(result.totalTep, lang)}</strong>
              </div>

              {commentary && (
                <p className="nx-tep-calculator__commentary">{commentary}</p>
              )}

              <div className="nx-tep-calculator__table-wrap">
                <table className="nx-tep-calculator__table">
                  <thead>
                    <tr>
                      <th>{tx.colSource}</th>
                      <th>{tx.colConsumption}</th>
                      <th>{tx.colFactor}</th>
                      <th>{tx.colTep}</th>
                      <th>{tx.colShare}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows
                      .filter((r) => !r.skipped)
                      .map((row) => (
                        <tr key={row.key}>
                          <td>
                            {row.displayName}
                            {row.isCustomFactor && (
                              <span className="nx-tep-calculator__badge">
                                {tx.customBadge}
                              </span>
                            )}
                          </td>
                          <td>
                            {formatNumber(row.amount, lang)} {unitLabel(row.unit, lang)}
                          </td>
                          <td>{row.factorLabel}</td>
                          <td>{formatTepValue(row.tep, lang)}</td>
                          <td>{formatPercent(row.sharePercent, lang)}%</td>
                        </tr>
                      ))}
                    {result.rows.every((r) => r.skipped) && (
                      <tr>
                        <td colSpan={5}>{tx.noInputNote}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <p className="nx-tep-calculator__source-note">
                {lang === "TR"
                  ? TEP_FACTORS_META.source_note_tr
                  : TEP_FACTORS_META.source_note_en}{" "}
                ({tx.versionLabel}: {TEP_FACTORS_META.version})
              </p>

              <div className="nx-tep-calculator__cta">
                <h3>{ctaTitle}</h3>
                <Link
                  href={contactHref}
                  className="nx-btn nx-btn--accent"
                  onClick={handleLead}
                >
                  {ctaButton}
                  <ArrowRight />
                </Link>
              </div>
            </div>
          )}

          <p className="nx-tep-calculator__legal">{tx.legalDisclaimer}</p>
        </div>
      </div>
    </section>
  );
}
