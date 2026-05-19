import Link from "next/link";
import type { Locale } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { pathFor, routeKeyForInsight, INSIGHT_ORDER } from "@/lib/routes";
import { insightArticle } from "@/i18n/insights-content";
import { FLOW_FAQ } from "@/i18n/faq";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CTABand } from "@/components/shared/CTABand";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { InsightCard } from "@/components/shared/InsightCard";
import { SectorIcon } from "@/components/shared/SectorIcon";
import { sectorKind } from "@/components/shared/SectorStrip";
import { IconExpertise, IconLeaf, IconShield, IconTech } from "@/components/shared/mockup-icons";
import { SustainabilityServiceHero } from "@/components/pages/sustainability/SustainabilityServiceHero";

export function SustainabilityServicePage({ locale }: { locale: Locale }) {
  const { t, lang } = getDictionary(locale);
  const sp = t.sustainabilityPage;
  const homeHref = pathFor("home", locale);
  const servicesHref = pathFor("servicesIndex", locale);
  const contactHref = pathFor("contact", locale);
  const sectorsHref = pathFor("sectors", locale);
  const insightsHref = pathFor("insights", locale);

  const processSteps =
    lang === "TR"
      ? [
          {
            icon: <IconExpertise />,
            title: "Analiz",
            body: "Organizasyon sınırı, materyalite taraması ve gösterge seçimi.",
          },
          {
            icon: <IconLeaf />,
            title: "Strateji",
            body: "Hedefler, yol haritası ve sorumluluk matrisi.",
          },
          {
            icon: <IconTech />,
            title: "Uygulama",
            body: "Veri toplama, normalizasyon ve kanıt dosyası.",
          },
          {
            icon: <IconShield />,
            title: "İzleme",
            body: "Performans takibi ve sapma yönetimi.",
          },
          {
            icon: <IconLeaf />,
            title: "Sürekli iyileştirme",
            body: "Yıllık güncelleme ve raporlama döngüsü.",
          },
        ]
      : [
          {
            icon: <IconExpertise />,
            title: "Analysis",
            body: "Organizational boundary, materiality scan and indicator selection.",
          },
          {
            icon: <IconLeaf />,
            title: "Strategy",
            body: "Targets, roadmap and accountability matrix.",
          },
          {
            icon: <IconTech />,
            title: "Implementation",
            body: "Data collection, normalization and evidence file.",
          },
          {
            icon: <IconShield />,
            title: "Monitoring",
            body: "Performance tracking and variance management.",
          },
          {
            icon: <IconLeaf />,
            title: "Continuous improvement",
            body: "Annual update and reporting cycle.",
          },
        ];

  const insightIds = INSIGHT_ORDER.slice(0, 3);

  return (
    <>
      <SustainabilityServiceHero
        lang={lang}
        t={t}
        sp={sp}
        homeHref={homeHref}
        servicesHref={servicesHref}
        contactHref={contactHref}
      />

      <section data-nx-section style={{ padding: "96px 0", background: "#fff" }}>
        <div className="nx-container">
          <SectionHeader
            eyebrow={lang === "TR" ? "Metodoloji" : "Methodology"}
            title={lang === "TR" ? "Nasıl çalışıyoruz?" : "How we work"}
            intro={sp.processIntro}
          />
          <ProcessSteps
            steps={processSteps}
            accentColor="var(--nx-sustain)"
            theme="sustain"
            showConnectors
          />
        </div>
      </section>

      <section data-nx-section style={{ padding: "96px 0", background: "#fafaf7" }}>
        <div className="nx-container nx-sustain-bottom">
          <section className="nx-sustain-bottom__col">
            <SectionHeader
              eyebrow={lang === "TR" ? "İlgili sektörler" : "Related sectors"}
              title={lang === "TR" ? "Sektörler" : "Sectors"}
            />
            <ul className="nx-sustain-sector-list">
              {t.sectors.slice(0, 5).map((name) => (
                <li key={name} className="nx-sustain-sector-row">
                  <SectorIcon name={name} kind={sectorKind(name)} size={28} />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
            <Link href={sectorsHref} className="nx-text-link" style={{ marginTop: 16, display: "inline-flex" }}>
              {lang === "TR" ? "Tüm sektörler" : "All sectors"} →
            </Link>
          </section>
          <section className="nx-sustain-bottom__col">
            <SectionHeader
              eyebrow={lang === "TR" ? "İlgili içgörüler" : "Related insights"}
              title={t.home.insights.title}
            />
            <div className="nx-sustain-insights nx-sustain-insights--cards">
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
            <Link href={insightsHref} className="nx-text-link" style={{ marginTop: 16, display: "inline-flex" }}>
              {lang === "TR" ? "Tüm içgörüler" : "All insights"} →
            </Link>
          </section>
          <section className="nx-sustain-bottom__col">
            <SectionHeader
              eyebrow="FAQ"
              title={lang === "TR" ? "Sıkça sorulan sorular" : "Frequently asked questions"}
            />
            <FaqAccordion items={FLOW_FAQ[lang].slice(0, 4)} theme="sustain" />
          </section>
        </div>
      </section>

      <CTABand t={t} lang={lang} locale={locale} variant="sustain" />
    </>
  );
}
