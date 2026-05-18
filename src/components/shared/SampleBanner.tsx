// Prominent "this is an example development" banner pinned to the top of
// every dashboard mockup. Distinct from the small ÖRNEK VERİ pill — this one
// is unmissable, per the owner's request and project_docs (no real data).
import type { LangCode } from "@/i18n/getDictionary";

export function SampleBanner({ lang = "TR" }: { lang?: LangCode }) {
  const tr = lang === "TR";
  return (
    <div
      role="note"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        marginBottom: 20,
        borderRadius: 12,
        background: "rgba(252, 211, 77, 0.12)",
        border: "1px solid rgba(252, 211, 77, 0.4)",
        color: "#FCD34D",
        fontSize: 12.5,
        lineHeight: 1.45,
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0 }}
        aria-hidden="true"
      >
        <path d="M12 9v4M12 17h.01" />
        <path d="M10.3 3.6 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z" />
      </svg>
      <span>
        <strong style={{ letterSpacing: "0.06em" }}>
          {tr ? "ÖRNEK GELİŞTİRME" : "EXAMPLE DEVELOPMENT"}
        </strong>
        {" — "}
        {tr
          ? "Bu paneldeki tüm göstergeler, grafikler ve sayılar temsilîdir; gerçek müşteri/tesis verisi değildir."
          : "Every metric, chart and number on this panel is illustrative — not real customer/facility data."}
      </span>
    </div>
  );
}
