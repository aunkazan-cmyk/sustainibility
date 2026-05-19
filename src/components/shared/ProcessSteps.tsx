import type { ReactNode } from "react";

export type ProcessStep = { title: string; body: string; icon?: ReactNode };

export function ProcessSteps({
  steps,
  accentColor = "var(--nx-flow)",
  theme = "flow",
  showConnectors = false,
}: {
  steps: ProcessStep[];
  accentColor?: string;
  theme?: "flow" | "sustain";
  showConnectors?: boolean;
}) {
  const sustain = theme === "sustain";
  return (
    <ol
      className={`nx-process-steps${sustain ? " nx-process-steps--sustain" : ""}${showConnectors ? " nx-process-steps--connected" : ""}`}
    >
      {steps.map((step, i) => (
        <li key={step.title} className="nx-process-steps__item">
          <span
            className="nx-process-steps__num"
            style={{ background: accentColor }}
          >
            {i + 1}
          </span>
          {step.icon && <span className="nx-process-steps__icon">{step.icon}</span>}
          <h4 className="nx-process-steps__title">{step.title}</h4>
          <p className="nx-process-steps__body">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
