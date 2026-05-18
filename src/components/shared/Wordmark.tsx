// Typographic wordmark — ported verbatim from the prototype. Used on dark
// surfaces (footer) where the rasterized real logo's white canvas would read
// wrong; the light header uses the real optimized logo (see Header.tsx).
export function Wordmark({
  light = false,
  sub = null,
}: {
  light?: boolean;
  sub?: string | null;
}) {
  const ink = light ? "#fff" : "var(--nx-navy)";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        fontFamily: "var(--font-manrope), sans-serif",
      }}
    >
      <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
        <rect
          x="2"
          y="2"
          width="28"
          height="28"
          rx="7"
          fill={light ? "rgba(255,255,255,0.08)" : "var(--nx-accent-soft)"}
          stroke={
            light
              ? "rgba(255,255,255,0.25)"
              : "color-mix(in oklab, var(--nx-accent) 28%, transparent)"
          }
          strokeWidth="1"
        />
        <path
          d="M9 23 L9 9 L23 23 L23 9"
          stroke="var(--nx-accent)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span
        style={{
          fontWeight: 800,
          letterSpacing: "-0.035em",
          fontSize: 21,
          color: ink,
          lineHeight: 1,
        }}
      >
        Nexovia
        {sub && (
          <span
            style={{
              fontWeight: 500,
              fontSize: 13,
              marginLeft: 7,
              color: "var(--nx-accent)",
              letterSpacing: 0,
              fontStyle: "italic",
            }}
          >
            {sub}
          </span>
        )}
      </span>
    </span>
  );
}
