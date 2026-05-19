import type { ReactNode } from "react";

export type ScopeItem = { icon: ReactNode; title: string; body: string };

export function ScopeList({ items }: { items: ScopeItem[] }) {
  return (
    <ul className="nx-scope-list">
      {items.map((item) => (
        <li key={item.title} className="nx-scope-list__item">
          <span className="nx-scope-list__icon">{item.icon}</span>
          <div>
            <h4 className="nx-scope-list__title">{item.title}</h4>
            <p className="nx-scope-list__body">{item.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
