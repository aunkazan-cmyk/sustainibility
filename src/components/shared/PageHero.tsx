// Editorial page hero — ported from pages-secondary.jsx, Direction A branch
// only (the B branch is dropped with the rejected direction).
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section data-nx-section style={{ padding: "96px 0 72px", background: "#fafaf7" }}>
      <div className="nx-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <span style={{ height: 1, background: "var(--nx-300)", width: 80 }} />
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--nx-500)",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            — {eyebrow}
          </span>
          <span style={{ flex: 1, height: 1, background: "var(--nx-300)" }} />
        </div>
        <h1
          className="nx-display"
          style={{
            fontSize: "clamp(44px, 6.4vw, 84px)",
            margin: 0,
            fontWeight: 400,
            color: "var(--nx-900)",
            letterSpacing: "-0.02em",
            maxWidth: 1100,
          }}
        >
          {title}
        </h1>
        {lead && (
          <p
            style={{
              marginTop: 28,
              fontSize: 19,
              lineHeight: 1.55,
              color: "var(--nx-700)",
              maxWidth: 720,
              marginBottom: 0,
              textWrap: "pretty",
            }}
          >
            {lead}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
