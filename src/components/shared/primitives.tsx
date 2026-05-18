// Small editorial primitives — ported verbatim from direction-a.jsx.
export function Hairline({ color = "var(--nx-200)" }: { color?: string }) {
  return <div style={{ height: 1, background: color, width: "100%" }} />;
}

export function NumberLabel({ n }: { n: string }) {
  return (
    <div
      className="nx-mono"
      style={{ color: "var(--nx-400)", fontSize: 12, letterSpacing: "0.04em" }}
    >
      {n}
    </div>
  );
}

// Shared right-arrow glyph used across CTAs/cards in the prototype.
export function ArrowRight({ size = 14, strokeWidth = 1.6 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M3 7h8 M7 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
