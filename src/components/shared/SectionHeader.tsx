// Section header — ported verbatim from components.jsx.
export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  maxWidth = 720,
  light = false,
  size = "default",
  theme = "flow",
  marginBottom,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  maxWidth?: number;
  light?: boolean;
  size?: "default" | "compact";
  theme?: "flow" | "sustain";
  marginBottom?: number;
}) {
  const compact = size === "compact";
  const accentColor = light
    ? "rgba(255,255,255,0.6)"
    : theme === "sustain"
      ? "var(--nx-sustain)"
      : "var(--nx-accent)";

  return (
    <div
      className={compact ? "nx-section-header nx-section-header--compact" : "nx-section-header"}
      style={{
        textAlign: align,
        maxWidth: compact ? "none" : maxWidth,
        margin: align === "center" ? "0 auto" : 0,
        marginBottom: marginBottom ?? (compact ? 20 : 48),
      }}
    >
      {eyebrow && (
        <div
          style={{
            fontSize: compact ? 11 : 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: compact ? 8 : 14,
            color: accentColor,
          }}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className="nx-display"
        style={{
          fontSize: compact ? "clamp(20px, 2.2vw, 26px)" : "clamp(32px, 4.4vw, 52px)",
          margin: 0,
          color: light ? "#fff" : "var(--nx-900)",
          lineHeight: compact ? 1.25 : undefined,
        }}
      >
        {title}
      </h2>
      {intro && (
        <p
          style={{
            marginTop: compact ? 12 : 18,
            fontSize: compact ? 15 : 18,
            lineHeight: 1.55,
            color: light ? "rgba(255,255,255,0.7)" : "var(--nx-600)",
            maxWidth: compact ? "none" : 620,
            marginLeft: align === "center" ? "auto" : 0,
            marginRight: align === "center" ? "auto" : 0,
            textWrap: "pretty",
          }}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
