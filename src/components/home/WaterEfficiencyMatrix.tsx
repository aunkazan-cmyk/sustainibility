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
  buildMultiResultSummary,
  buildRowSummary,
  evaluateMatrixMulti,
  formatSummaryLine,
  MAX_MATRIX_ACTIVITIES,
  statusLabel,
  type FacilityType,
} from "@/lib/water-efficiency-matrix";
import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  MatrixActivityRow,
  type ActivityRowState,
} from "@/components/home/MatrixActivityRow";

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

let rowIdCounter = 0;
function newRow(): ActivityRowState {
  rowIdCounter += 1;
  return { id: `row-${rowIdCounter}`, query: "", naceCode: "" };
}

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

export function WaterEfficiencyMatrix({ locale }: { locale: Locale }) {
  const { t, lang } = getDictionary(locale);
  const mx = t.matrix;

  const [facilityType, setFacilityType] = useState<FacilityType>("industrial");
  const [activityRows, setActivityRows] = useState<ActivityRowState[]>(() => [
    newRow(),
  ]);
  const [employeeCount, setEmployeeCount] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [reportState, formAction, pending] = useActionState(
    submitMatrixReport,
    initialReportState,
  );
  const lastPdfRef = useRef<string | null>(null);

  const emp = employeeCount.trim() ? Number(employeeCount) : null;
  const validEmp =
    emp != null && Number.isInteger(emp) && emp >= 1 ? emp : null;

  const evaluation = useMemo(() => {
    if (facilityType !== "industrial") {
      return evaluateMatrixMulti(facilityType, undefined, []);
    }
    return evaluateMatrixMulti(
      facilityType,
      validEmp ?? undefined,
      activityRows.map((r) => ({ naceCode: r.naceCode })),
    );
  }, [facilityType, activityRows, validEmp]);

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

  const updateRow = (id: string, query: string, naceCode: string) => {
    setActivityRows((rows) =>
      rows.map((r) => (r.id === id ? { ...r, query, naceCode } : r)),
    );
  };

  const removeRow = (id: string) => {
    setActivityRows((rows) => rows.filter((r) => r.id !== id));
  };

  const addRow = () => {
    if (activityRows.length >= MAX_MATRIX_ACTIVITIES) return;
    setActivityRows((rows) => [...rows, newRow()]);
  };

  const statusColor = (status: string) => {
    if (status === "YUKUMLU") return "var(--nx-navy)";
    if (status === "GONULLU") return "var(--nx-flow)";
    return "var(--nx-600)";
  };

  const v = reportState.status === "error" ? (reportState.values ?? {}) : {};
  const err = (f: string) =>
    reportState.status === "error"
      ? reportState.fieldErrors?.[f as keyof typeof reportState.fieldErrors]
      : undefined;

  const activitiesJson = JSON.stringify(
    activityRows.map((r) => ({ naceCode: r.naceCode })),
  );

  return (
    <>
      <section
        data-nx-section
        id="matrix"
        style={{ padding: "96px 0", background: "var(--nx-50)" }}
      >
        <div className="nx-container">
          <SectionHeader eyebrow={mx.eyebrow} title={mx.title} intro={mx.lead} />

          <div className="nx-matrix-panel">
            <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
              <legend className="nx-matrix-legend">{mx.facilityTypeLabel}</legend>
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
              <>
                <div className="nx-matrix-activities">
                  {activityRows.map((row, index) => (
                    <MatrixActivityRow
                      key={row.id}
                      row={row}
                      rowLabel={`${mx.activityRowLabel} ${index + 1}`}
                      naceLabel={mx.naceLabel}
                      nacePlaceholder={mx.nacePlaceholder}
                      removeLabel={mx.removeActivity}
                      canRemove={activityRows.length > 1}
                      onChange={updateRow}
                      onRemove={removeRow}
                    />
                  ))}
                  <button
                    type="button"
                    className="nx-btn nx-btn--ghost"
                    onClick={addRow}
                    disabled={activityRows.length >= MAX_MATRIX_ACTIVITIES}
                  >
                    {mx.addActivity}
                  </button>
                  {activityRows.length >= MAX_MATRIX_ACTIVITIES && (
                    <p className="nx-matrix-hint">{mx.maxActivitiesReached}</p>
                  )}
                </div>

                <div className="nx-matrix-employee">
                  <label className="nx-matrix-row-label">{mx.employeeLabel}</label>
                  <input
                    type="number"
                    min={1}
                    value={employeeCount}
                    onChange={(e) => setEmployeeCount(e.target.value)}
                    placeholder={mx.employeePlaceholder}
                    style={fieldStyle}
                  />
                  <p className="nx-matrix-hint">{mx.sharedEmployeeHint}</p>
                </div>
              </>
            )}

            {evaluation && (
              <div className="nx-matrix-result">
                <div className="nx-matrix-result__eyebrow">{mx.resultTitle}</div>
                <div
                  className="nx-matrix-result__status"
                  style={{ color: statusColor(evaluation.headlineStatus) }}
                >
                  {statusLabel(evaluation.headlineStatus, lang)}
                </div>
                {evaluation.facilityType === "industrial" && (
                  <p className="nx-matrix-result__summary-line">
                    {mx.activitiesEvaluated.replace(
                      "{count}",
                      String(evaluation.rows.length),
                    )}{" "}
                    — {formatSummaryLine(evaluation.summary, lang)}
                  </p>
                )}
                <p className="nx-matrix-result__lead">
                  {buildMultiResultSummary(evaluation, lang)}
                </p>

                {evaluation.facilityType === "industrial" && (
                  <div className="nx-matrix-results-table-wrap">
                    <table className="nx-matrix-results-table">
                      <thead>
                        <tr>
                          <th>{mx.resultsTableNace}</th>
                          <th>{mx.resultsTableActivity}</th>
                          <th>{mx.resultsTableStatus}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {evaluation.rows.map((row) => (
                          <tr key={`${row.rowIndex}-${row.inputNaceCode}`}>
                            <td>{row.inputNaceCode || "—"}</td>
                            <td>
                              {row.naceEntry?.activityTr ??
                                (lang === "TR"
                                  ? "Ek-1 dışı / tanımsız"
                                  : "Outside Annex-1")}
                            </td>
                            <td>
                              <strong>{statusLabel(row.status, lang)}</strong>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {evaluation.facilityType === "industrial" &&
                  evaluation.rows.map((row) => (
                    <p
                      key={`detail-${row.rowIndex}-${row.inputNaceCode}`}
                      className="nx-matrix-row-detail"
                    >
                      {buildRowSummary(row, lang)}
                    </p>
                  ))}

                <p className="nx-matrix-reference">{mx.resultReference}</p>
                <p className="nx-matrix-disclaimer">{mx.disclaimer}</p>
                <button
                  type="button"
                  className="nx-btn nx-btn--primary"
                  onClick={() => setModalOpen(true)}
                >
                  {mx.downloadCta}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {modalOpen && evaluation && (
        <div
          className="nx-matrix-modal-backdrop"
          role="presentation"
          onClick={() => !pending && setModalOpen(false)}
        >
          <div
            className="nx-matrix-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="matrix-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="matrix-modal-title" className="nx-matrix-modal__title">
              {mx.modalTitle}
            </h3>
            <p className="nx-matrix-modal__intro">{mx.modalIntro}</p>

            <form action={formAction}>
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="facilityType" value={facilityType} />
              <input type="hidden" name="employeeCount" value={employeeCount} />
              <input
                type="hidden"
                name="activitiesJson"
                value={activitiesJson}
              />
              <input
                type="hidden"
                name="headlineStatus"
                value={evaluation.headlineStatus}
              />

              <div
                aria-hidden
                style={{
                  position: "absolute",
                  left: -9999,
                  width: 1,
                  height: 1,
                  overflow: "hidden",
                }}
              >
                <input type="text" name="company_url" tabIndex={-1} autoComplete="off" />
              </div>

              {reportState.status === "error" && reportState.message && (
                <div className="nx-matrix-form-error">{reportState.message}</div>
              )}

              <div style={{ display: "grid", gap: 16 }}>
                <div>
                  <label className="nx-matrix-row-label">{mx.companyLabel}</label>
                  <input name="company" defaultValue={v.company} required style={fieldStyle} />
                  {err("company") && <p style={errStyle}>{err("company")}</p>}
                </div>
                <div>
                  <label className="nx-matrix-row-label">{mx.recipientLabel}</label>
                  <input
                    name="recipientName"
                    defaultValue={v.recipientName}
                    required
                    style={fieldStyle}
                  />
                  {err("recipientName") && (
                    <p style={errStyle}>{err("recipientName")}</p>
                  )}
                </div>
                <div className="nx-matrix-modal-grid" data-nx-collapse>
                  <div>
                    <label className="nx-matrix-row-label">{mx.emailLabel}</label>
                    <input
                      name="email"
                      type="email"
                      defaultValue={v.email}
                      required
                      style={fieldStyle}
                    />
                    {err("email") && <p style={errStyle}>{err("email")}</p>}
                  </div>
                  <div>
                    <label className="nx-matrix-row-label">{mx.phoneLabel}</label>
                    <input
                      name="phone"
                      type="tel"
                      defaultValue={v.phone}
                      required
                      style={fieldStyle}
                    />
                    {err("phone") && <p style={errStyle}>{err("phone")}</p>}
                  </div>
                </div>
                <label className="nx-matrix-kvkk">
                  <input type="checkbox" name="kvkkAccepted" />
                  <span>
                    {mx.kvkkLabel}{" "}
                    <Link href={pathFor("legalFormNotice", locale)}>
                      {lang === "TR" ? "Form Aydınlatma Metni" : "Form Privacy Notice"}
                    </Link>
                  </span>
                </label>
                {err("kvkkAccepted") && <p style={errStyle}>{err("kvkkAccepted")}</p>}
              </div>

              <div className="nx-matrix-modal-actions">
                <button type="submit" className="nx-btn nx-btn--accent" disabled={pending}>
                  {pending ? "…" : mx.submitDownload}
                </button>
                <button
                  type="button"
                  className="nx-btn nx-btn--ghost"
                  disabled={pending}
                  onClick={() => setModalOpen(false)}
                >
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
