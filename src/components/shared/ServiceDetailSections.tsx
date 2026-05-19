import { SectionHeader } from "./SectionHeader";

export function ServiceDetailSections({
  outputsTitle,
  outputs,
  audienceTitle,
  audience,
}: {
  outputsTitle: string;
  outputs: string[];
  audienceTitle: string;
  audience: string[];
}) {
  return (
    <section data-nx-section style={{ padding: "96px 0", background: "#fff" }}>
      <div className="nx-container nx-service-detail-grid" data-nx-collapse data-nx-cgap>
        <div>
          <SectionHeader size="compact" title={outputsTitle} marginBottom={20} />
          <ul className="nx-bullet-list">
            {outputs.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <SectionHeader size="compact" title={audienceTitle} marginBottom={20} />
          <ul className="nx-bullet-list">
            {audience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
