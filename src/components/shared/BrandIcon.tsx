// Sub-brand mark — ported verbatim from components.jsx.
type BrandKind = "flow" | "sustain" | "adr" | "nexovia";

export function BrandIcon({
  kind,
  size = 40,
}: {
  kind: BrandKind | string;
  size?: number;
}) {
  const config = {
    flow: { color: "var(--nx-flow)", soft: "var(--nx-flow-soft)" },
    sustain: { color: "var(--nx-sustain)", soft: "var(--nx-sustain-soft)" },
    adr: { color: "var(--nx-adr)", soft: "var(--nx-adr-soft)" },
    nexovia: { color: "var(--nx-navy)", soft: "#EEF2FF" },
  }[kind as BrandKind];

  const icon = {
    flow: (
      <g fill="none" stroke={config.color} strokeWidth="1.8" strokeLinecap="round">
        <path d="M7 14 Q12 8, 17 14 T17 14" />
        <path d="M7 18 Q12 12, 17 18" opacity="0.5" />
        <circle cx="12" cy="6" r="2.2" fill={config.color} stroke="none" />
      </g>
    ),
    sustain: (
      <g fill="none" stroke={config.color} strokeWidth="1.8" strokeLinecap="round">
        <path
          d="M12 4 C7 8, 7 14, 12 19 C17 14, 17 8, 12 4 Z"
          fill={config.color}
          fillOpacity="0.12"
        />
        <path d="M12 10 L12 18" />
      </g>
    ),
    adr: (
      <g fill="none" stroke={config.color} strokeWidth="1.8" strokeLinejoin="round">
        <path
          d="M12 4 L20 18 L4 18 Z"
          fill={config.color}
          fillOpacity="0.12"
        />
        <path d="M12 9 L12 14" strokeLinecap="round" />
        <circle cx="12" cy="16" r="0.8" fill={config.color} stroke="none" />
      </g>
    ),
    nexovia: (
      <g fill="none" stroke={config.color} strokeWidth="1.8">
        <rect
          x="5"
          y="5"
          width="14"
          height="14"
          rx="3"
          fill={config.color}
          fillOpacity="0.1"
        />
        <path
          d="M9 16 L9 8 L15 16 L15 8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    ),
  }[kind as BrandKind];

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        background: config.soft,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24">
        {icon}
      </svg>
    </div>
  );
}
