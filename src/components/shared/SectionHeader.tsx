// Section header — ported verbatim from components.jsx.
export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  maxWidth = 720,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  maxWidth?: number;
  light?: boolean;
}) {
  return (
    <div
      style={{
        textAlign: align,
        maxWidth,
        margin: align === "center" ? "0 auto" : 0,
        marginBottom: 48,
      }}
    >
      {eyebrow && (
        <div
          style={{
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: 14,
            color: light ? "rgba(255,255,255,0.6)" : "var(--nx-accent)",
          }}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className="nx-display"
        style={{
          fontSize: "clamp(32px, 4.4vw, 52px)",
          margin: 0,
          color: light ? "#fff" : "var(--nx-900)",
        }}
      >
        {title}
      </h2>
      {intro && (
        <p
          style={{
            marginTop: 18,
            fontSize: 18,
            lineHeight: 1.55,
            color: light ? "rgba(255,255,255,0.7)" : "var(--nx-600)",
            maxWidth: 620,
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
