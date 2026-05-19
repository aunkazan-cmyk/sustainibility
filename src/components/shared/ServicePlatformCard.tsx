import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "./primitives";

export function ServicePlatformCard({
  icon,
  title,
  description,
  imageSrc,
  imageAlt,
  href,
  linkLabel,
  accentColor = "var(--nx-flow)",
}: {
  icon: ReactNode;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string | null;
  linkLabel: string;
  accentColor?: string;
}) {
  const inner = (
    <article className="nx-service-card">
      <div className="nx-service-card__head">
        {icon}
        <div>
          <h3 className="nx-service-card__title">{title}</h3>
          <p className="nx-service-card__desc">{description}</p>
        </div>
      </div>
      <div className="nx-service-card__media">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={600}
          height={380}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      {href ? (
        <span className="nx-service-card__link" style={{ color: accentColor }}>
          {linkLabel}
          <ArrowRight />
        </span>
      ) : (
        <span className="nx-service-card__link nx-service-card__link--muted">
          {linkLabel}
        </span>
      )}
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="nx-service-card-wrap">
        {inner}
      </Link>
    );
  }
  return <div className="nx-service-card-wrap">{inner}</div>;
}
