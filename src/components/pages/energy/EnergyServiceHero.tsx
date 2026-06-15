import Link from "next/link";
import type { Strings } from "@/i18n/getDictionary";
import { PageHeaderOnDark } from "@/components/shared/PageHeaderOnDark";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ArrowRight } from "@/components/shared/primitives";

export function EnergyServiceHero({
  lang,
  t,
  ep,
  homeHref,
  servicesHref,
  contactHref,
  sustainHref,
}: {
  lang: "TR" | "EN";
  t: Strings;
  ep: Strings["energyPage"];
  homeHref: string;
  servicesHref: string;
  contactHref: string;
  sustainHref: string;
}) {
  return (
    <>
      <PageHeaderOnDark />
      <section
        data-nx-section
        className="nx-energy-hero"
        style={{ position: "relative", minHeight: 480, display: "flex", alignItems: "flex-end" }}
      >
        <div className="nx-container" style={{ position: "relative", zIndex: 1, padding: "120px 0 72px", width: "100%" }}>
          <div style={{ marginBottom: 24 }}>
            <Breadcrumb
              items={[
                { name: lang === "TR" ? "Anasayfa" : "Home", href: homeHref },
                { name: t.nav.services, href: servicesHref },
                { name: ep.title },
              ]}
            />
          </div>
          <span
            className="nx-pill"
            style={{
              background: "rgba(255,255,255,0.14)",
              color: "#fff",
              marginBottom: 16,
              display: "inline-flex",
            }}
          >
            {ep.eyebrow}
          </span>
          <h1 className="nx-hero-title" style={{ color: "#fff", maxWidth: 820 }}>
            {ep.title}
          </h1>
          <p className="nx-hero-lead" style={{ color: "rgba(255,255,255,0.88)", maxWidth: 680 }}>
            {ep.lead}
          </p>
          <div className="nx-hero-actions">
            <Link href={contactHref} className="nx-btn nx-btn--accent">
              {ep.ctaPrimary}
              <ArrowRight />
            </Link>
            <Link href={sustainHref} className="nx-btn nx-btn--ghost-light">
              {ep.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
