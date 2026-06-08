"use client";

import Link from "next/link";
import {
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import type { Locale } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { pathFor } from "@/lib/routes";
import {
  submitMatrixReport,
  type MatrixReportState,
} from "@/actions/matrix-report";
import {
  buildResultSummary,
  evaluateMatrix,
  findNaceEntry,
  normalizeNaceCode,
  searchNace,
  statusLabel,
  type FacilityType,
  type MatrixResult,
  type NaceEntry,
} from "@/lib/water-efficiency-matrix";
import { SectionHeader } from "@/components/shared/SectionHeader";

const initialReportState: MatrixReportState = { status: "idle" };

const fieldStyle: CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid var(--nx-200)",
  fontSize: 14.5,
  background: "#fff",
};

const errStyle: CSSProperties = { marginTop: 6, fontSize: 12, color: "#b91c1c" };

function downloadPdf(base64: string, fileName: string) {
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

function isReady(
  facilityType: FacilityType,
  naceCode: string,
  employeeCount: string,
): boolean {
  if (facilityType !== "industrial") return true;
  const code = normalizeNaceCode(naceCode);
  if (!/^\d{2}\.\d{2}$/.test(code)) return false;
  const entry = findNaceEntry(code);
  if (!entry) return true;
  const n = Number(employeeCount);
  return Number.isInteger(n) && n >= 1;
}

export function WaterEfficiencyMatrix({ locale }: { locale: Locale }) {
  const { t, lang } = getDictionary(locale);
  const mx = t.matrix;

  const [facilityType, setFacilityType] = useState<FacilityType>("industrial");
  const [naceQuery, setNaceQuery] = useState("");
  const [naceCode, setNaceCode] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [showNaceList, setShowNaceList] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [reportState, formAction, pending] = useActionState(
    submitMatrixReport,
    initialReportState,
  );
  const lastPdfRef = useRef<string | null>(null);

  const naceSuggestions = useMemo(
    () => searchNace(naceQuery || naceCode, 12),
    [naceQuery, naceCode],
  );

  const result: MatrixResult | null = useMemo(() => {
    if (!isReady(facilityType, naceCode, employeeCount)) return null;
    const emp = employeeCount.trim() ? Number(employeeCount) : undefined;
    return evaluateMatrix({
      facilityType,
      naceCode: facilityType === "industrial" ? naceCode : undefined,
      employeeCount: emp,
    });
  }, [facilityType, naceCode, employeeCount]);

  useEffect(() => {
    if (
      reportState.status === "success" &&
      reportState.pdfBase64 !== lastPdfRef.current
    ) {
      lastPdfRef.current = reportState.pdfBase64;
      downloadPdf(reportState.pdfBase64, reportState.fileName);
      setModalOpen(false);
    }
  }, [reportState]);

  const facilityOptions: { value: FacilityType; label: string }[] = [
    { value: "industrial", label: mx.facilityIndustrial },
    { value: "osb", label: mx.facilityOsb },
    { value: "freeZone", label: mx.facilityFreeZone },
    { value: "industrialZone", label: mx.facilityIndustrialZone },
  ];

  const pickNace = (entry: NaceEntry) => {
    setNaceCode(entry.code);
    setNaceQuery(`${entry.code} — ${entry.activityTr}`);
    setShowNaceList(false);
  };

  const statusColor = (status: MatrixResult["status"]) => {
    if (status === "YUKUMLU") return "var(--nx-navy)";
    if (status === "GONULLU") return "var(--nx-flow)";
    return "var(--nx-600)";
  };

  const v = reportState.status === "error" ? (reportState.values ?? {}) : {};
  const err = (f: string) =>
    reportState.status === "error" ? reportState.fieldErrors?.[f as keyof typeof reportState.fieldErrors] : undefined;

  return (
    <>
      <section
        data-nx-section
        id="matrix"
        style={{ padding: "96px 0", background: "var(--nx-50)" }}
      >
        <div className="nx-container">
          <SectionHeader eyebrow={mx.eyebrow} title={mx.title} intro={mx.lead} />

          <div
            className="nx-matrix-panel"
            style={{
              marginTop: 36,
              background: "#fff",
              borderRadius: 18,
              border: "1px solid var(--nx-200)",
              padding: 32,
              boxShadow: "0 24px 48px -32px rgba(2,13,51,0.12)",
            }}
          >
            <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
              <legend
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--nx-600)",
                  marginBottom: 12,
                }}
              >
                {mx.facilityTypeLabel}
              </legend>
              <div className="nx-matrix-facility-types">
                {facilityOptions.map((opt) => (
                  <label key={opt.value} className="nx-matrix-facility-option">
                    <input
                      type="radio"
                      name="facilityType"
                      value={opt.value}
                      checked={facilityType === opt.value}
                      onChange={() => setFacilityType(opt.value)}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {facilityType === "industrial" && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr 0.6fr",
                  gap: 20,
                  marginTop: 28,
                }}
                data-nx-collapse
              >
                <div style={{ position: "relative" }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                    {mx.naceLabel}
                  </label>
                  <input
                    type="text"
                    value={naceQuery}
                    onChange={(e) => {
                      setNaceQuery(e.target.value);
                      const normalized = normalizeNaceCode(e.target.value);
                      if (/^\d{2}\.\d{2}$/.test(normalized)) setNaceCode(normalized);
                      setShowNaceList(true);
                    }}
                    onFocus={() => setShowNaceList(true)}
                    placeholder={mx.nacePlaceholder}
                    style={fieldStyle}
                    autoComplete="off"
                  />
                  {showNaceList && naceSuggestions.length > 0 && (
                    <ul className="nx-matrix-nace-list">
                      {naceSuggestions.map((entry) => (
                        <li key={entry.code}>
                          <button type="button" onClick={() => pickNace(entry)}>
                            <strong>{entry.code}</strong>
                            <span>{entry.activityTr}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <p style={{ margin: "8px 0 0", fontSize: 12, color: "var(--nx-500)" }}>
                    {mx.evaluateHint}
                  </p>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                    {mx.employeeLabel}
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={employeeCount}
                    onChange={(e) => setEmployeeCount(e.target.value)}
                    placeholder={mx.employeePlaceholder}
                    style={fieldStyle}
                  />
                </div>
              </div>
            )}

            {result && (
              <div
                className="nx-matrix-result"
                style={{
                  marginTop: 28,
                  padding: "24px 28px",
                  borderRadius: 14,
                  background: "var(--nx-50)",
                  border: "1px solid var(--nx-150)",
                }}
              >
                <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-500)", marginBottom: 8 }}>
                  {mx.resultTitle}
                </div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: statusColor(result.status),
                    marginBottom: 12,
                  }}
                >
                  {statusLabel(result.status, lang)}
                </div>
                <p style={{ margin: "0 0 12px", lineHeight: 1.65, color: "var(--nx-700)", fontSize: 15 }}>
                  {buildResultSummary(result, lang)}
                </p>
                <p style={{ margin: 0, fontSize: 12.5, color: "var(--nx-500)" }}>
                  {mx.resultReference}
                </p>
                <p style={{ margin: "12px 0 0", fontSize: 12, color: "var(--nx-500)" }}>
                  {mx.disclaimer}
                </p>
                <button
                  type="button"
                  className="nx-btn nx-btn--primary"
                  style={{ marginTop: 20 }}
                  onClick={() => setModalOpen(true)}
                >
                  {mx.downloadCta}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {modalOpen && result && (
        <div className="nx-matrix-modal-backdrop" role="presentation" onClick={() => !pending && setModalOpen(false)}>
          <div
            className="nx-matrix-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="matrix-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="matrix-modal-title" className="nx-display" style={{ fontSize: 24, margin: "0 0 8px", fontWeight: 500 }}>
              {mx.modalTitle}
            </h3>
            <p style={{ margin: "0 0 24px", color: "var(--nx-600)", fontSize: 14, lineHeight: 1.6 }}>
              {mx.modalIntro}
            </p>

            <form action={formAction}>
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="facilityType" value={facilityType} />
              <input type="hidden" name="naceCode" value={naceCode} />
              <input type="hidden" name="employeeCount" value={employeeCount} />
              <input type="hidden" name="matrixStatus" value={result.status} />

              <div aria-hidden style={{ position: "absolute", left: -9999, width: 1, height: 1, overflow: "hidden" }}>
                <input type="text" name="company_url" tabIndex={-1} autoComplete="off" />
              </div>

              {reportState.status === "error" && reportState.message && (
                <div style={{ marginBottom: 16, padding: 12, borderRadius: 10, background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: 13 }}>
                  {reportState.message}
                </div>
              )}

              <div style={{ display: "grid", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{mx.companyLabel}</label>
                  <input name="company" defaultValue={v.company} required style={fieldStyle} />
                  {err("company") && <p style={errStyle}>{err("company")}</p>}
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{mx.recipientLabel}</label>
                  <input name="recipientName" defaultValue={v.recipientName} required style={fieldStyle} />
                  {err("recipientName") && <p style={errStyle}>{err("recipientName")}</p>}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} data-nx-collapse>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{mx.emailLabel}</label>
                    <input name="email" type="email" defaultValue={v.email} required style={fieldStyle} />
                    {err("email") && <p style={errStyle}>{err("email")}</p>}
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{mx.phoneLabel}</label>
                    <input name="phone" type="tel" defaultValue={v.phone} required style={fieldStyle} />
                    {err("phone") && <p style={errStyle}>{err("phone")}</p>}
                  </div>
                </div>
                <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, lineHeight: 1.5, color: "var(--nx-700)" }}>
                  <input type="checkbox" name="kvkkAccepted" style={{ marginTop: 3 }} />
                  <span>
                    {mx.kvkkLabel}{" "}
                    <Link href={pathFor("legalFormNotice", locale)} style={{ color: "var(--nx-flow)", textDecoration: "underline" }}>
                      {lang === "TR" ? "Form Aydınlatma Metni" : "Form Privacy Notice"}
                    </Link>
                  </span>
                </label>
                {err("kvkkAccepted") && <p style={errStyle}>{err("kvkkAccepted")}</p>}
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
                <button type="submit" className="nx-btn nx-btn--accent" disabled={pending}>
                  {pending ? "…" : mx.submitDownload}
                </button>
                <button type="button" className="nx-btn nx-btn--ghost" disabled={pending} onClick={() => setModalOpen(false)}>
                  {mx.cancel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
