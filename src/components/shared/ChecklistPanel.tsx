import type { ReactNode } from "react";

export function ChecklistPanel({
  title,
  items,
  accentColor = "var(--nx-flow)",
  variant = "default",
  footer,
}: {
  title: string;
  items: string[];
  accentColor?: string;
  variant?: "default" | "sustain";
  footer?: ReactNode;
}) {
  return (
    <aside
      className={`nx-checklist-panel${variant === "sustain" ? " nx-checklist-panel--sustain" : ""}`}
    >
      <h3 className="nx-checklist-panel__title" style={{ margin: 0 }}>{title}</h3>
      <ul className="nx-checklist-panel__list">
        {items.map((item) => (
          <li key={item}>
            <span
              className="nx-checklist-panel__check"
              style={{ color: accentColor, borderColor: accentColor }}
              aria-hidden
            >
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
      {footer}
    </aside>
  );
}
