import { writeFileSync } from "node:fs";

const content = `import Link from "next/link";
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
          { title: "Kapsam & ölçüm sınırı", body: "Organizasyon sınırı, materyalite taraması ve gösterge seçimi." },
          { title: "Veri toplama", body: "Kaynak envanteri, birim dönüşümü ve veri kalite kontrolü." },
          { title: "Analiz", body: "Çerçeve eşlemesi, boşluk analizi ve önceliklendirme." },
          { title: "Raporlama hazırlığı", body: "GRI / CDP uyumu, kanıt dosyası ve beyan taslağı." },
          { title: "Süreklilik", body: "Yıllık güncelleme ve performans izleme döngüsü." },
        ]
      : [
          { title: "Scope & boundary", body: "Organizational boundary, materiality scan and indicator selection." },
          { title: "Data collection", body: "Source inventory, unit conversion and data quality checks." },
          { title: "Analysis", body: "Framework mapping, gap analysis and prioritization." },
          { title: "Reporting readiness", body: "GRI / CDP alignment, evidence file and disclosure draft." },
          { title: "Continuity", body: "Annual update and performance monitoring cycle." },
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
            title={sp.processTitle}
            intro={sp.processIntro}
          />
          <ProcessSteps steps={processSteps} accentColor="var(--nx-sustain)" />
        </div>
      </section>

      <section data-nx-section style={{ padding: "96px 0", background: "#fafaf7" }}>
        <div className="nx-container nx-sustain-bottom">
          <section className="nx-sustain-bottom__col">
            <SectionHeader
              eyebrow={t.home.sectors.eyebrow}
              title={lang === "TR" ? "Sektörler" : "Sectors"}
            />
            <ul className="nx-sustain-sector-list">
              {t.sectors.slice(0, 6).map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
            <Link href={sectorsHref} className="nx-text-link" style={{ marginTop: 16, display: "inline-flex" }}>
              {lang === "TR" ? "Tüm sektörler" : "All sectors"} →
            </Link>
          </section>
          <section className="nx-sustain-bottom__col">
            <SectionHeader eyebrow={t.home.insights.eyebrow} title={t.home.insights.title} />
            <div className="nx-sustain-insights">
              {insightIds.map((id) => {
                const article = insightArticle(id, lang);
                const key = routeKeyForInsight(id);
                return (
                  <InsightCard
                    key={id}
                    href={pathFor(key, locale)}
                    title={article.title}
                    excerpt={article.excerpt}
                    category={article.category}
                    date={article.date}
                  />
                );
              })}
            </div>
            <Link href={insightsHref} className="nx-text-link" style={{ marginTop: 16, display: "inline-flex" }}>
              {lang === "TR" ? "Tüm içgörüler" : "All insights"} →
            </Link>
          </section>
          <section className="nx-sustain-bottom__col">
            <SectionHeader eyebrow="FAQ" title={lang === "TR" ? "Sık sorulanlar" : "FAQ"} />
            <FaqAccordion items={FLOW_FAQ[lang].slice(0, 4)} />
          </section>
        </div>
      </section>

      <CTABand t={t} lang={lang} locale={locale} variant="sustain" />
    </>
  );
}
`;

writeFileSync("src/components/pages/SustainabilityServicePage.tsx", content);
console.log("written");
