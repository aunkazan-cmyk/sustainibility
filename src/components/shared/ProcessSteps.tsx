export type ProcessStep = { title: string; body: string };

export function ProcessSteps({
  steps,
  accentColor = "var(--nx-flow)",
}: {
  steps: ProcessStep[];
  accentColor?: string;
}) {
  return (
    <ol className="nx-process-steps">
      {steps.map((step, i) => (
        <li key={step.title} className="nx-process-steps__item">
          <span
            className="nx-process-steps__num"
            style={{ background: accentColor }}
          >
            {i + 1}
          </span>
          <h4 className="nx-process-steps__title">{step.title}</h4>
          <p className="nx-process-steps__body">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
