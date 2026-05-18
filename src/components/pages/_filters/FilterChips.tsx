"use client";
// Shared filter-chip island — the only client component among the secondary
// pages. The prototype's per-page `useState` chip rows (Insights categories,
// Trainings formats) collapse into this one island. Panels are built on the
// server (one ReactNode per option) and swapped client-side by active index,
// so filtering stays SSR-friendly. Chip styling is verbatim from the
// pages-secondary.jsx prototype (Direction A).
import { useState } from "react";
import type { ReactNode } from "react";

export function FilterChips({
  options,
  panels,
}: {
  options: string[];
  panels: React.ReactNode[];
}) {
  const [active, setActive] = useState(0);

  return (
    <>
      <section
        style={{
          padding: "32px 0",
          background: "#fff",
          borderBottom: "1px solid var(--nx-200)",
        }}
      >
        <div
          className="nx-container"
          style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
        >
          {options.map((c, i) => (
            <button
              key={c}
              onClick={() => setActive(i)}
              style={{
                padding: "9px 16px",
                borderRadius: 999,
                border: "1px solid",
                borderColor: active === i ? "var(--nx-navy)" : "var(--nx-200)",
                background: active === i ? "var(--nx-navy)" : "#fff",
                color: active === i ? "#fff" : "var(--nx-700)",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all .15s",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </section>
      {panels[active] as ReactNode}
    </>
  );
}
