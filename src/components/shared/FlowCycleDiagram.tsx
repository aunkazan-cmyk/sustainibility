import type { LangCode } from "@/i18n/getDictionary";

const LABELS: Record<LangCode, string[]> = {
  TR: [
    "Veri Toplama",
    "Analiz",
    "Aksiyon",
    "İzleme",
    "Raporlama",
  ],
  EN: [
    "Data collection",
    "Analysis",
    "Action",
    "Monitoring",
    "Reporting",
  ],
};

export function FlowCycleDiagram({ lang }: { lang: LangCode }) {
  const labels = LABELS[lang];
  return (
    <figure className="nx-flow-cycle" aria-label={lang === "TR" ? "Flow süreç döngüsü" : "Flow process cycle"}>
      <svg viewBox="0 0 320 320" className="nx-flow-cycle__svg">
        <circle
          cx="160"
          cy="160"
          r="118"
          fill="none"
          stroke="var(--nx-flow)"
          strokeWidth="2"
          strokeDasharray="8 6"
          opacity="0.5"
        />
        {labels.map((label, i) => {
          const angle = (i / labels.length) * Math.PI * 2 - Math.PI / 2;
          const x = 160 + Math.cos(angle) * 118;
          const y = 160 + Math.sin(angle) * 118;
          return (
            <g key={label}>
              <circle cx={x} cy={y} r="6" fill="var(--nx-flow)" />
              <text
                x={x}
                y={y + (Math.sin(angle) > 0.3 ? 22 : -14)}
                textAnchor="middle"
                fontSize="11"
                fill="var(--nx-700)"
                fontFamily="var(--nx-font-body)"
              >
                {label}
              </text>
            </g>
          );
        })}
        <circle cx="160" cy="160" r="36" fill="var(--nx-flow-soft)" />
        <text
          x="160"
          y="166"
          textAnchor="middle"
          fontSize="22"
          fill="var(--nx-flow-deep)"
        >
          💧
        </text>
      </svg>
    </figure>
  );
}
