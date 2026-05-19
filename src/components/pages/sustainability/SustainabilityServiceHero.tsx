import Link from "next/link";
import type { Strings } from "@/i18n/getDictionary";
import { IMAGES } from "@/lib/images";
import { ImageHero } from "@/components/shared/ImageHero";
import { ChecklistPanel } from "@/components/shared/ChecklistPanel";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FeatureIconGrid } from "@/components/shared/FeatureIconGrid";
import { BenefitIconGrid } from "@/components/shared/BenefitIconGrid";
import { IconExpertise, IconShield, IconTech, IconLeaf } from "@/components/shared/mockup-icons";
import { ArrowRight } from "@/components/shared/primitives";
import { sustainServiceContent } from "@/i18n/service-content";

export function SustainabilityServiceHero({
  lang,
  t,
  sp,
  homeHref,
  servicesHref,
  contactHref,
}: {
  lang: "TR" | "EN";
  t: Strings;
  sp: Strings["sustainabilityPage"];
  homeHref: string;
  servicesHref: string;
  contactHref: string;
}) {
  const sc = sustainServiceContent(lang);
  const icons = [<IconLeaf />, <IconExpertise />, <IconShield />, <IconTech />, <IconLeaf />, <IconExpertise />];
  const scopeItems = sc.scopeItems.map((item, i) => ({
    icon: icons[i % icons.length],
    title: item.title,
    body: item.body,
  }));

  const benefitItems =
    lang === "TR"
      ? [
          {
            icon: <IconShield />,
            title: "Risk yönetimi",
            body: "Çerçeveye eşlenmiş gösterge seti ile öngörülebilir uyum.",
          },
          {
            icon: <IconTech />,
            title: "Veri zinciri",
            body: "Ölçümden kanıta izlenebilir raporlama altyapısı.",
          },
          {
            icon: <IconExpertise />,
            title: "Operasyonel verim",
            body: "Kaynak tüketiminde ölçülebilir iyileştirme alanları.",
          },
          {
            icon: <IconLeaf />,
            title: "Raporlama hazırlığı",
            body: "GRI / CDP beyan taslağına hazır çıktılar.",
          },
        ]
      : [
          {
            icon: <IconShield />,
            title: "Risk management",
            body: "Predictable compliance with a framework-mapped indicator set.",
          },
          {
            icon: <IconTech />,
            title: "Data chain",
            body: "Traceable reporting from measurement to evidence.",
          },
          {
            icon: <IconExpertise />,
            title: "Operational efficiency",
            body: "Measurable improvement areas in resource use.",
          },
          {
            icon: <IconLeaf />,
            title: "Reporting readiness",
            body: "GRI / CDP disclosure-draft-ready outputs.",
          },
        ];

  return (
    <>
      <ImageHero
        image={IMAGES.sustainHero}
        variant="split"
        imageRight={IMAGES.sustainHero}
        fadeToWhite
        accentColor="var(--nx-sustain)"
        imageAlt={lang === "TR" ? "Orman ve sürdürülebilirlik" : "Forest and sustainability"}
        breadcrumbs={[
          { name: lang === "TR" ? "Anasayfa" : "Home", href: homeHref },
          { name: t.nav.services, href: servicesHref },
          { name: sp.title },
        ]}
      >
        <span
          className="nx-pill nx-pill--sustain"
          style={{ marginBottom: 16, display: "inline-flex" }}
        >
          {sp.eyebrow}
        </span>
        <h1 className="nx-display" style={{ fontSize: "clamp(36px, 4vw, 56px)", margin: 0, fontWeight: 500 }}>
          {sp.title}
        </h1>
        <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.6, color: "var(--nx-700)", maxWidth: 520 }}>
          {sp.lead}
        </p>
        <div className="nx-hero-actions" style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href={contactHref} className="nx-btn nx-btn--sustain">
            {t.cta.consulting}
            <ArrowRight />
          </Link>
          <Link href={contactHref} className="nx-btn nx-btn--ghost nx-btn--ghost-sustain">
            {t.cta.proposal}
          </Link>
        </div>
      </ImageHero>

      <section data-nx-section style={{ padding: "80px 0", background: "#fff" }}>
        <div className="nx-container">
          <SectionHeader
            title={lang === "TR" ? "Hizmet kapsamımız" : "Our service scope"}
            intro={sc.scopeIntro}
          />
          <FeatureIconGrid items={scopeItems} theme="sustain" />
        </div>
      </section>

      <section data-nx-section style={{ padding: "80px 0", background: "var(--nx-sustain-soft)" }}>
        <article className="nx-container nx-scope-split" data-nx-collapse data-nx-cgap>
          <ChecklistPanel
            variant="sustain"
            title={lang === "TR" ? "Yaklaşımımız" : "Our approach"}
            accentColor="var(--nx-sustain)"
            items={
              lang === "TR"
                ? [
                    "Materyalite odaklı kapsam",
                    "Ölçülebilir gösterge seti",
                    "Kanıt dosyası disiplini",
                    "Çerçeve eşlemesi",
                    "Saha ve danışman tek kaynak",
                    "Çıktı odaklı teslimatlar",
                  ]
                : [
                    "Materiality-led scope",
                    "Measurable indicator set",
                    "Evidence-file discipline",
                    "Framework mapping",
                    "Field and consultant single source",
                    "Deliverable-focused outputs",
                  ]
            }
          />
          <section>
            <SectionHeader title={sp.benefitsTitle} />
            <BenefitIconGrid items={benefitItems} />
          </section>
        </article>
      </section>
    </>
  );
}
