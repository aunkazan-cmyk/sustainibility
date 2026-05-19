import type { ReactNode } from "react";

export type FeatureItem = {
  icon: ReactNode;
  title: string;
  body: string;
};

const Box = "div" as unknown as React.ElementType;

export function FeatureIconGrid({
  items,
  theme = "flow",
}: {
  items: FeatureItem[];
  theme?: "flow" | "sustain";
}) {
  return (
    <Box
      className={`nx-feature-grid${theme === "sustain" ? " nx-feature-grid--sustain" : ""}`}
      data-nx-collapse-2
    >
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
