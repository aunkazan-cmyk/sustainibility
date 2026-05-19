export type FaqItem = { q: string; a: string };

export function FaqAccordion({
  items,
  theme = "flow",
}: {
  items: FaqItem[];
  theme?: "flow" | "sustain";
}) {
  const mid = Math.ceil(items.length / 2);
  const cols = [items.slice(0, mid), items.slice(mid)];
  return (
    <div className="nx-faq-grid" data-nx-collapse>
      {cols.map((col, ci) => (
        <div key={ci} className="nx-faq-col">
          {col.map((item) => (
            <details
              key={item.q}
              className={`nx-faq-item${theme === "sustain" ? " nx-faq-item--sustain" : ""}`}
            >
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      ))}
    </div>
  );
}
