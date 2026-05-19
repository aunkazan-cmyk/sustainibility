import type { ReactNode } from "react";

export type FeatureItem = {
  icon: ReactNode;
  title: string;
  body: string;
};

const Box = "div" as unknown as React.ElementType;

export function FeatureIconGrid({ items }: { items: FeatureItem[] }) {
  return (
    <Box className="nx-feature-grid" data-nx-collapse-2>
      {items.map((item) => (
        <Box key={item.title} className="nx-feature-grid__item">
          <Box className="nx-feature-grid__icon">{item.icon}</Box>
          <h3 className="nx-feature-grid__title">{item.title}</h3>
          <p className="nx-feature-grid__body">{item.body}</p>
        </Box>
      ))}
    </Box>
  );
}
