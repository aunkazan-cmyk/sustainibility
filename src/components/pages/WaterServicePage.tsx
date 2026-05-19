import type { Locale } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { pathFor } from "@/lib/routes";
import { FLOW_FAQ } from "@/i18n/faq";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CTABand } from "@/components/shared/CTABand";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { FeatureIconGrid } from "@/components/shared/FeatureIconGrid";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { SectorStrip } from "@/components/shared/SectorStrip";
import { WaterServiceHero } from "@/components/pages/water/WaterServiceHero";
import { IconExpertise, IconShield, IconTech, IconLeaf } from "@/components/shared/mockup-icons";
export function WaterServicePage({ locale }: { locale: Locale }) {
  const { t, lang } = getDictionary(locale);
  const sp = t.waterPage;
  const homeHref = pathFor("home", locale);
  const flowHref = pathFor("flow", locale);
  const contactHref = pathFor("contact", locale);
  const sectorsHref = pathFor("sectors", locale);

  const processSteps =
    lang === "TR"
      ? [
          { title: "Saha etüdü", body: "Tesis turu, sayaç envanteri ve operasyon görüşmeleri." },
          { title: "Tüketim analizi", body: "Veri normalizasyonu, birim tüketim hesabı ve kıyaslama." },
          { title: "İyileştirme planı", body: "Önceliklendirme, yatırım çerçevesi ve geri ödeme süresi." },
          { title: "Sürekli raporlama", body: "Flow entegrasyonu, aylık özet ve mevzuat takibi." },
          { title: "Devreye alma", body: "İzleme, raporlama ve iyileştirme döngüsünün sürekliliği." },
        ]
      : [
          { title: "Site audit", body: "Facility walk, meter inventory and operations interviews." },
          { title: "Consumption analysis", body: "Data normalization, specific consumption and benchmarking." },
          { title: "Improvement plan", body: "Prioritization, investment framing and payback analysis." },
          { title: "Continuous reporting", body: "Flow integration, monthly summary and regulation tracking." },
          { title: "Go-live", body: "Continuity of monitoring, reporting and improvement cycles." },
        ];

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
          <FaqAccordion items={FLOW_FAQ[lang]} />
        </div>
      </section>

      <CTABand t={t} lang={lang} locale={locale} />
    </>
  );
}
