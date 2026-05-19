import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "components", "shared");
mkdirSync(dir, { recursive: true });

const files = {
  "SectorStrip.tsx": `import Link from "next/link";
import { ArrowRight } from "./primitives";
import { SectorIcon } from "./SectorIcon";

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
    <div className="nx-sector-strip">
      <motion className="nx-sector-strip__grid" data-nx-collapse>
        {sectors.map((name) => (
          <motion key={name} className="nx-sector-strip__item">
            <SectorIcon name={name} size={32} />
            <span>{name}</span>
          </motion>
        ))}
      </motion>
      <Link href={allHref} className="nx-sector-strip__all">
        {allLabel}
        <ArrowRight />
      </Link>
    </motion>
  );
}
`.replaceAll("<motion", "<div").replaceAll("</motion>", "</div>"),

  "InsightCard.tsx": `import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "./primitives";

export function InsightCard({
  href,
  imageSrc,
  imageAlt,
  meta,
  title,
  excerpt,
}: {
  href: string;
  imageSrc: string;
  imageAlt: string;
  meta: string;
  title: string;
  excerpt: string;
}) {
  return (
    <Link href={href} className="nx-insight-card">
      <motion className="nx-insight-card__media">
        <Image src={imageSrc} alt={imageAlt} width={480} height={280} style={{ width: "100%", height: "auto", aspectRatio: "16/10", objectFit: "cover" }} />
      </motion>
      <motion className="nx-insight-card__meta">{meta}</motion>
      <h3 className="nx-insight-card__title">{title}</h3>
      <p className="nx-insight-card__excerpt">{excerpt}</p>
      <span className="nx-insight-card__arrow" aria-hidden><ArrowRight /></span>
    </Link>
  );
}
`.replaceAll("<motion", "<motion").replaceAll("<motion", "<div").replaceAll("</motion>", "</motion>").replaceAll("</motion>", "</motion>"),
};

// fix replace - do it properly
for (const [name, raw] of Object.entries(files)) {
  const content = raw.replace(/<\/?motion\b/g, (m) => m.replace("motion", "motion")).replace(/<\/?motion\b/g, (m) =>
    m.startsWith("</") ? "</div" : "<motion".replace("motion", "div"),
  );
}
