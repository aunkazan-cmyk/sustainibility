import Link from "next/link";
import type { Locale } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { pathFor, routeKeyForInsight, INSIGHT_ORDER } from "@/lib/routes";
import { insightArticle } from "@/i18n/insights-content";
import { IMAGES } from "@/lib/images";
import { SetHeaderVariant } from "@/components/shared/SetHeaderVariant";
import { ImageHero } from "@/components/shared/ImageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CTABand } from "@/components/shared/CTABand";
import { FeatureIconGrid } from "@/components/shared/FeatureIconGrid";
import { ServicePlatformCard } from "@/components/shared/ServicePlatformCard";
import { SectorStrip } from "@/components/shared/SectorStrip";
import { InsightCard } from "@/components/shared/InsightCard";
import { BrandIcon } from "@/components/shared/BrandIcon";
import {
  IconExpertise,
  IconLeaf,
  IconShield,
  IconTech,
} from "@/components/shared/mockup-icons";
import { ArrowRight } from "@/components/shared/primitives";

export function HomePage({ locale }: { locale: Locale }) {
  const { t, lang } = getDictionary(locale);
  const flowHref = pathFor("flow", locale);
  const waterHref = pathFor("waterService", locale);
  const sustainHref = pathFor("sustainabilityService", locale);
  const adrHref = pathFor("adr", locale);
  const contactHref = pathFor("contact", locale);
  const sectorsHref = pathFor("sectors", locale);
  const insightsHref = pathFor("insights", locale);
  const platformHref = pathFor("platformIndex", locale);

  const featureItems = [
    {
      icon: <IconExpertise />,
      title: lang === "TR" ? "Uzmanlık" : "Expertise",
      body:
        lang === "TR"
          ? "Saha tecrübesi ve dijital altyapı bir arada; mevzuat, ölçüm ve raporlama tek akışta."
          : "Field experience and digital infrastructure together; regulation, measurement and reporting in one flow.",
    },
    {
      icon: <IconLeaf />,
      title: lang === "TR" ? "Sürdürülebilirlik" : "Sustainability",
      body:
        lang === "TR"
          ? "ESG odaklı strateji, çevresel performans ve raporlama hazırlığı."
          : "ESG-focused strategy, environmental performance and reporting readiness.",
    },
    {
      icon: <IconShield />,
      title: lang === "TR" ? "Uyumluluk" : "Compliance",
      body:
        lang === "TR"
          ? "ADR/TMGD ve su verimliliği mevzuatında uyum ve dokümantasyon disiplini."
          : "Compliance and documentation discipline in ADR/TMGD and water-efficiency regulation.",
    },
    {
      icon: <IconTech />,
      title: lang === "TR" ? "Teknoloji Desteği" : "Technology support",
      body:
        lang === "TR"
          ? "Nexovia Flow ile ölçüm, izleme ve raporlama süreçlerini destekler."
          : "Nexovia Flow supports measurement, monitoring and reporting processes.",
    },
  ];

  const insightIds = INSIGHT_ORDER.slice(0, 3);

  return (
    <>
      <SetHeaderVariant variant="on-dark" />
      <ImageHero image={IMAGES.homeHero} variant="home" minHeight={560}>
        <p
          className="nx-eyebrow"
          style={{
            color: "rgba(255,255,255,0.7)",
            marginBottom: 16,
            letterSpacing: "0.18em",
          }}
        >
          {t.home.eyebrow}
        </p>
        <h1 className="nx-hero-title">{t.home.heroTitle}</h1>
        <p className="nx-hero-lead">{t.home.heroLead}</p>
        <div className="nx-hero-actions">
          <Link href={platformHref} className="nx-btn nx-btn--accent">
            {lang === "TR" ? "Platformu Keşfedin" : "Explore the platform"}
            <ArrowRight />
          </Link>
          <Link href={waterHref} className="nx-btn nx-btn--ghost-light">
            {t.cta.explore}
          </Link>
        </div>
      </ImageHero>

      <section data-nx-section style={{ padding: "72px 0", background: "#fff" }}>
        <div className="nx-container">
          <FeatureIconGrid items={featureItems} />
        </div>
      </section>

      <section data-nx-section style={{ padding: "0 0 96px", background: "#fff" }}>
        <div className="nx-container">
          <SectionHeader
            eyebrow={t.home.services.eyebrow}
            title={
              lang === "TR"
                ? "Platform ve Hizmetlerimiz"
                : "Our platform and services"
            }
            intro={t.home.services.intro}
          />
          <div className="nx-service-cards">
            <ServicePlatformCard
              icon={<BrandIcon kind="flow" size={40} />}
              title="Nexovia Flow"
              description={t.flowPage.lead}
              imageSrc={IMAGES.flowScreen1}
              imageAlt="Nexovia Flow dashboard"
              href={flowHref}
              linkLabel={lang === "TR" ? "Platformu Keşfedin" : "Explore the platform"}
              accentColor="var(--nx-flow)"
            />
            <ServicePlatformCard
              icon={<BrandIcon kind="flow" size={40} />}
              title={t.services.water.title}
              description={t.services.water.short}
              imageSrc={IMAGES.waterCard}
              imageAlt=""
              href={waterHref}
              linkLabel={lang === "TR" ? "Hizmeti İncele" : "View service"}
            />
            <ServicePlatformCard
              icon={<BrandIcon kind="sustain" size={40} />}
              title={t.services.sustain.title}
              description={t.services.sustain.short}
              imageSrc={IMAGES.sustainCard}
              imageAlt=""
              href={sustainHref}
              linkLabel={lang === "TR" ? "Hizmeti İncele" : "View service"}
              accentColor="var(--nx-sustain)"
            />
            <ServicePlatformCard
              icon={<BrandIcon kind="adr" size={40} />}
              title={t.services.adr.title}
              description={t.services.adr.short}
              imageSrc={IMAGES.adrCard}
              imageAlt=""
              href={adrHref}
              linkLabel={lang === "TR" ? "Hizmeti İncele" : "View service"}
              accentColor="var(--nx-adr)"
            />
          </div>
        </div>
      </section>

      <section data-nx-section style={{ padding: "96px 0", background: "var(--nx-50)" }}>
        <div className="nx-container">
          <SectionHeader
            eyebrow={t.home.sectors.eyebrow}
            title={t.home.sectors.title}
            intro={t.home.sectors.intro}
          />
          <SectorStrip
            sectors={t.sectors.slice(1, 6)}
            allHref={sectorsHref}
            allLabel={lang === "TR" ? "Tüm Sektörleri Gör" : "View all sectors"}
          />
        </div>
      </section>

      <section data-nx-section style={{ padding: "96px 0", background: "#fff" }}>
        <div className="nx-container">
          <div className="nx-section-head-row">
            <SectionHeader
              eyebrow={t.home.insights.eyebrow}
              title={t.home.insights.title}
              intro={t.home.insights.intro}
            />
            <Link
              href={insightsHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 14,
                fontWeight: 600,
                color: "var(--nx-flow)",
                flexShrink: 0,
              }}
            >
              {lang === "TR" ? "Tüm İçgörüleri Gör" : "View all insights"}
              <ArrowRight />
            </Link>
          </div>
          <div className="nx-insight-cards">
            {insightIds.map((id) => {
              const article = insightArticle(id, lang);
              const href = pathFor(routeKeyForInsight(id), locale);
              return (
                <InsightCard
                  key={id}
                  href={href}
                  imageSrc={article.image}
                  imageAlt=""
                  meta={`${article.date} · ${article.tag}`}
                  title={article.title}
                  excerpt={article.lead}
                />
              );
            })}
          </div>
        </div>
      </section>

      <CTABand t={t} lang={lang} locale={locale} />
    </>
  );
}
