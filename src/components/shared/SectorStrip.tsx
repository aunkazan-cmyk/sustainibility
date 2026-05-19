import Link from "next/link";
import { ArrowRight } from "./primitives";
import { SectorIcon } from "./SectorIcon";

function sectorKind(name: string): string {
  const x = name.toLowerCase();
  if (x.includes("lojistik") || x.includes("logistic")) return "adr";
  if (
    x.includes("kimya") ||
    x.includes("chemic") ||
    x.includes("enerji") ||
    x.includes("energy")
  ) {
    return "adr";
  }
  if (
    x.includes("belediye") ||
    x.includes("municip") ||
    x.includes("üniversite") ||
    x.includes("universit") ||
    x.includes("hotel") ||
    x.includes("otel") ||
    x.includes("hastane") ||
    x.includes("hospital")
  ) {
    return "sustain";
  }
  return "flow";
}

export function SectorStrip({
  sectors,
  allHref,
  allLabel,
}: {
  sectors: string[];
  allHref: string;
  allLabel: string;
}) {
  return (
    <section className="nx-sector-strip">
      <div className="nx-sector-strip__grid" data-nx-collapse>
        {sectors.map((name) => (
          <article key={name} className="nx-sector-strip__item">
            <SectorIcon name={name} kind={sectorKind(name)} size={32} />
            <span>{name}</span>
          </article>
        ))}
      </div>
      <Link href={allHref} className="nx-sector-strip__all">
        {allLabel}
        <ArrowRight />
      </Link>
    </section>
  );
}
