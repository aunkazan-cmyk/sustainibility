import type { Locale } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { pathFor } from "@/lib/routes";
import { WATER_FAQ } from "@/i18n/faq";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CTABand } from "@/components/shared/CTABand";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { FeatureIconGrid } from "@/components/shared/FeatureIconGrid";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { SectorStrip } from "@/components/shared/SectorStrip";
import { WaterServiceHero } from "@/components/pages/water/WaterServiceHero";
import { ServiceDetailSections } from "@/components/shared/ServiceDetailSections";
import { waterServiceContent } from "@/i18n/service-content";
import { IconExpertise, IconShield, IconTech, IconLeaf } from "@/components/shared/mockup-icons";
export function WaterServicePage({ locale }: { locale: Locale }) {
  const { t, lang } = getDictionary(locale);
  const sp = t.waterPage;
  const homeHref = pathFor("home", locale);
  const flowHref = pathFor("flow", locale);
  const contactHref = pathFor("contact", locale);
  const sectorsHref = pathFor("sectors", locale);

  const sc = waterServiceContent(lang);
  const processSteps = sc.scopeItems.map((item) => ({
    title: item.title,
    body: item.body,
  }));

  const benefitItems =
    lang === "TR"
      ? [
          { icon: <IconExpertise />, title: "Ölçülebilir tüketim", body: "Yıllık ölçülebilir tüketim azalımı hedefleri ve takibi." },
          { icon: <IconTech />, title: "Veri zinciri", body: "Ölçüm-rapor zincirinde uçtan uca kapsama." },
          { icon: <IconShield />, title: "Mevzuat uyumu", body: "ISO 46001 hazır raporlama altyapısı." },
          { icon: <IconLeaf />, title: "Süreklilik", body: "Flow ile izleme ve raporlama sürekliliği." },
          { icon: <IconExpertise />, title: "Saha hızı", body: "Değişken etüt süresi; tipik senaryoda 14+ gün." },
        ]
      : [
          { icon: <IconExpertise />, title: "Measurable consumption", body: "Annual measurable consumption reduction targets and tracking." },
          { icon: <IconTech />, title: "Data chain", body: "End-to-end coverage across the measurement-to-report chain." },
          { icon: <IconShield />, title: "Regulatory alignment", body: "46001-ready reporting infrastructure." },
          { icon: <IconLeaf />, title: "Continuity", body: "Monitoring and reporting continuity via Flow." },
          { icon: <IconExpertise />, title: "Field pace", body: "Variable audit duration; 14+ days in a typical scenario." },
        ];

  return (
    <>
      <WaterServiceHero
        lang={lang}
        t={t}
        sp={sp}
        homeHref={homeHref}
        flowHref={flowHref}
        contactHref={contactHref}
      />

      <section data-nx-section style={{ padding: "96px 0", background: "#fafaf7" }}>
        <div className="nx-container">
          <SectionHeader
            eyebrow={lang === "TR" ? "Metodoloji" : "Methodology"}
            title={sp.processTitle}
            intro={sp.processIntro}
          />
          <ProcessSteps steps={processSteps} accentColor="var(--nx-flow)" />
        </div>
      </section>

      <section data-nx-section style={{ padding: "96px 0", background: "#fff" }}>
        <div className="nx-container">
          <SectionHeader title={sp.benefitsTitle} />
          <FeatureIconGrid items={benefitItems} />
        </div>
      </section>

      <ServiceDetailSections
        outputsTitle={lang === "TR" ? "Hizmet çıktıları" : "Deliverables"}
        outputs={sc.outputs}
        audienceTitle={lang === "TR" ? "Kimler için uygun?" : "Who is it for?"}
        audience={sc.audience}
      />

      <section data-nx-section style={{ padding: "96px 0", background: "#fafaf7" }}>
        <div className="nx-container">
          <SectionHeader
            eyebrow={t.home.sectors.eyebrow}
            title={t.home.sectors.title}
            intro={t.home.sectors.intro}
          />
          <SectorStrip
            sectors={t.sectors.slice(0, 8)}
            allHref={sectorsHref}
            allLabel={lang === "TR" ? "Tüm sektörleri gör" : "View all sectors"}
          />
        </div>
      </section>

      <section data-nx-section style={{ padding: "96px 0", background: "#fff" }}>
        <div className="nx-container">
          <SectionHeader
            eyebrow="FAQ"
            title={lang === "TR" ? "Sık sorulanlar" : "Frequently asked questions"}
          />
          <FaqAccordion items={WATER_FAQ[lang]} />
        </div>
      </section>

      <CTABand t={t} lang={lang} locale={locale} />
    </>
  );
}
