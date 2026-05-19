import type { ReactNode } from "react";

export type BenefitIconItem = {
  icon: ReactNode;
  title: string;
  body: string;
};

export function BenefitIconGrid({ items }: { items: BenefitIconItem[] }) {
  return (
    <div className="nx-benefit-icon-grid" data-nx-collapse>
      {items.map((item) => (
        <article key={item.title} className="nx-benefit-icon-grid__item">
          <span className="nx-benefit-icon-grid__icon">{item.icon}</span>
          <h4 className="nx-benefit-icon-grid__title">{item.title}</h4>
          <p className="nx-benefit-icon-grid__body">{item.body}</p>
        </article>
      ))}
    </div>
  );
}
