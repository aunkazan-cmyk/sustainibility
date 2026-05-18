// Platform index — landing for the two Nexovia products (Flow, ADR).
// Server component; cards are registry-driven <Link>s, no dead anchors.
import Link from "next/link";
import type { Locale } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { pathFor } from "@/lib/routes";
import { PageHero } from "@/components/shared/PageHero";
import { CTABand } from "@/components/shared/CTABand";
import { BrandIcon } from "@/components/shared/BrandIcon";
import { ArrowRight } from "@/components/shared/primitives";

export function PlatformIndexPage({ locale }: { locale: Locale }) {
  const { t, lang } = getDictionary(locale);

  const products = [
    {
      kind: "flow" as const,
      name: "Nexovia Flow",
      desc: t.flowPage.lead,
      href: pathFor("flow", locale),
    },
    {
      kind: "adr" as const,
      name: "Nexovia ADR",
      desc: t.adrPage.lead,
      href: pathFor("adr", locale),
    },
  ];

  const cardStyle = {
    display: "flex",
    flexDirection: "column" as const,
    gap: 22,
    padding: "40px 36px",
    border: "1px solid var(--nx-200)",
    borderRadius: 16,
    background: "#fff",
  };

  return (
    <>
      <PageHero
        eyebrow={t.platformIndex.eyebrow}
        title={t.platformIndex.title}
        lead={t.platformIndex.lead}
      />

      <section data-nx-section style={{ padding: "120px 0", background: "#fff" }}>
        <div className="nx-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 24,
            }}
            data-nx-collapse
          >
            {products.map((p) => (
              <Link
                key={p.name}
                href={p.href}
                className="nx-hover-lift"
                style={cardStyle}
              >
                <BrandIcon kind={p.kind} size={52} />
                <div>
                  <h2
                    className="nx-display"
                    style={{
                      fontSize: 28,
                      margin: 0,
                      fontWeight: 500,
                      color: "var(--nx-900)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {p.name}
                  </h2>
                  <p
                    style={{
                      marginTop: 14,
                      marginBottom: 0,
                      fontSize: 16,
                      color: "var(--nx-600)",
                      lineHeight: 1.65,
                      textWrap: "pretty",
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: 18,
                    borderTop: "1px solid var(--nx-150)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--nx-accent)",
                  }}
                >
                  {lang === "TR" ? "İncele" : "Explore"}
                  <ArrowRight />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand t={t} lang={lang} locale={locale} variant="navy" />
    </>
  );
}
