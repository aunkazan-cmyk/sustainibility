import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "./primitives";

export function InsightCard({
  href,
  imageSrc,
  imageAlt,
  meta,
  title,
  excerpt,
  compact = false,
}: {
  href: string;
  imageSrc: string;
  imageAlt: string;
  meta: string;
  title: string;
  excerpt: string;
  compact?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`nx-insight-card${compact ? " nx-insight-card--compact" : ""}`}
    >
      <span className="nx-insight-card__media">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={480}
          height={280}
          style={
            compact
              ? { width: "100%", height: "100%", objectFit: "cover" }
              : {
                  width: "100%",
                  height: "auto",
                  aspectRatio: "16/10",
                  objectFit: "cover",
                }
          }
        />
      </span>
      {compact ? (
        <span className="nx-insight-card__body">
          <span className="nx-insight-card__meta">{meta}</span>
          <h3 className="nx-insight-card__title">{title}</h3>
        </span>
      ) : (
        <>
          <span className="nx-insight-card__meta">{meta}</span>
          <h3 className="nx-insight-card__title">{title}</h3>
          <p className="nx-insight-card__excerpt">{excerpt}</p>
          <span className="nx-insight-card__arrow" aria-hidden>
            <ArrowRight />
          </span>
        </>
      )}
    </Link>
  );
}
