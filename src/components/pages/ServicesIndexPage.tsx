// Services index — landing for the two consulting practices (water,
// sustainability). Server component; cards are registry-driven <Link>s.
import Link from "next/link";
import type { Locale } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { pathFor } from "@/lib/routes";
import { PageHero } from "@/components/shared/PageHero";
import { CTABand } from "@/components/shared/CTABand";
import { BrandIcon } from "@/components/shared/BrandIcon";
import { ArrowRight } from "@/components/shared/primitives";

export function ServicesIndexPage({ locale }: { locale: Locale }) {
  const { t, lang } = getDictionary(locale);

  const servicesList = [
    {
      kind: "flow" as const,
      title: t.services.water.title,
      desc: t.services.water.short,
      href: pathFor("waterService", locale),
    },
    {
      kind: "sustain" as const,
      title: t.sustainabilityPage.title,
      desc: t.sustainabilityPage.lead,
      href: pathFor("sustainabilityService", locale),
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
        eyebrow={t.servicesIndex.eyebrow}
        title={t.servicesIndex.title}
        lead={t.servicesIndex.lead}
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
            {servicesList.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="nx-hover-lift"
                style={cardStyle}
              >
                <BrandIcon kind={s.kind} size={52} />
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
                    {s.title}
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
                    {s.desc}
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
                  {lang === "TR" ? "Detayları gör" : "View details"}
                  <ArrowRight />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand t={t} lang={lang} locale={locale} />
    </>
  );
}
