import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumb, type Crumb } from "./Breadcrumb";

export type ImageHeroVariant = "home" | "fullBleed" | "split";

export function ImageHero({
  image,
  imageAlt = "",
  variant = "home",
  minHeight = 520,
  breadcrumbs,
  accentColor,
  children,
  imageRight,
}: {
  image: string;
  imageAlt?: string;
  variant?: ImageHeroVariant;
  minHeight?: number;
  breadcrumbs?: Crumb[];
  accentColor?: string;
  children: ReactNode;
  imageRight?: string;
}) {
  if (variant === "split") {
    return (
      <section
        data-nx-section
        className="nx-image-hero nx-image-hero--split"
        style={{ background: "#fff", padding: "48px 0 0" }}
      >
        <div className="nx-container">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <Breadcrumb items={breadcrumbs} />
            </div>
          )}
          <div className="nx-image-hero__split-grid" data-nx-collapse data-nx-cgap>
            <div className="nx-image-hero__split-copy">{children}</div>
            <div className="nx-image-hero__split-media">
              <Image
                src={imageRight ?? image}
                alt={imageAlt}
                width={800}
                height={600}
                priority
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: 480,
                  objectFit: "cover",
                  borderRadius: 16,
                }}
              />
            </div>
          </div>
        </div>
        {accentColor && (
          <div aria-hidden style={{ height: 4, background: accentColor, marginTop: 48 }} />
        )}
      </section>
    );
  }

  const overlay =
    variant === "home"
      ? "linear-gradient(105deg, rgba(0,22,82,0.88) 0%, rgba(0,22,82,0.55) 48%, rgba(0,22,82,0.25) 100%)"
      : "linear-gradient(105deg, rgba(0,22,82,0.9) 0%, rgba(0,22,82,0.65) 45%, rgba(0,22,82,0.35) 100%)";

  return (
    <section
      className="nx-image-hero nx-image-hero--bleed"
      style={{
        position: "relative",
        minHeight,
        display: "flex",
        alignItems: "flex-end",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
        aria-hidden
      />
      <div
        aria-hidden
        style={{ position: "absolute", inset: 0, background: overlay }}
      />
      <div
        className="nx-container"
        style={{ position: "relative", padding: "120px 28px 72px", width: "100%" }}
      >
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="nx-breadcrumb--on-dark" style={{ marginBottom: 28 }}>
            <Breadcrumb items={breadcrumbs} />
          </div>
        )}
        <div style={{ maxWidth: variant === "home" ? 720 : 800 }}>{children}</div>
      </div>
    </section>
  );
}
