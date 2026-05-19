import type { ReactNode } from "react";

export function ChecklistPanel({
  title,
  items,
  accentColor = "var(--nx-flow)",
  footer,
}: {
  title: string;
  items: string[];
  accentColor?: string;
  footer?: ReactNode;
}) {
  return (
    <aside className="nx-checklist-panel">
      <h3 className="nx-checklist-panel__title">{title}</h3>
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
