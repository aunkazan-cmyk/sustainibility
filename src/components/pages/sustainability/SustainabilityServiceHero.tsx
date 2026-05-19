import Link from "next/link";
import type { Strings } from "@/i18n/getDictionary";
import { IMAGES } from "@/lib/images";
import { ImageHero } from "@/components/shared/ImageHero";
import { ChecklistPanel } from "@/components/shared/ChecklistPanel";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FeatureIconGrid } from "@/components/shared/FeatureIconGrid";
import { IconExpertise, IconShield, IconTech, IconLeaf } from "@/components/shared/mockup-icons";
import { ArrowRight } from "@/components/shared/primitives";


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
  const scopeItems =
    lang === "TR"
      ? [
          { icon: <IconLeaf />, title: "ESG strateji", body: "Materyalite ve hedef çerçevesi." },
          { icon: <IconExpertise />, title: "Performans ölçümü", body: "Çevresel gösterge seti ve veri kalitesi." },
          { icon: <IconShield />, title: "Çerçeve uyumu", body: "GRI ve CDP eşlemesi." },
          { icon: <IconTech />, title: "Veri altyapısı", body: "Kanıt dosyası ve izlenebilirlik." },
          { icon: <IconLeaf />, title: "Raporlama", body: "Beyan taslağı ve süreklilik." },
        ]
      : [
          { icon: <IconLeaf />, title: "ESG strategy", body: "Materiality and target framing." },
          { icon: <IconExpertise />, title: "Performance measurement", body: "Environmental indicator set and data quality." },
          { icon: <IconShield />, title: "Framework alignment", body: "GRI and CDP mapping." },
          { icon: <IconTech />, title: "Data infrastructure", body: "Evidence file and traceability." },
          { icon: <IconLeaf />, title: "Reporting", body: "Disclosure draft and continuity." },
        ];

  const benefitCards =
    lang === "TR"
      ? [
          { title: "GRI", body: "Çerçeveye eşlenmiş gösterge seti" },
          { title: "%100", body: "Veri-kanıt zinciri izlenebilirliği" },
          { title: "20+", body: "Gün — kapsam çalışması (değişken)" },
          { title: "CDP", body: "Beyan taslağına hazır altyapı" },
        ]
      : [
          { title: "GRI", body: "Framework-mapped indicator set" },
          { title: "100%", body: "Data-to-evidence chain traceability" },
          { title: "20+", body: "Days — scoping engagement (variable)" },
          { title: "CDP", body: "Disclosure-draft-ready infrastructure" },
        ];

  return (
    <>
      <ImageHero
        image={IMAGES.sustainHero}
        variant="split"
        imageRight={IMAGES.sustainHero}
        accentColor="var(--nx-sustain)"
        breadcrumbs={[
          { name: lang === "TR" ? "Anasayfa" : "Home", href: homeHref },
          { name: t.nav.services, href: servicesHref },
          { name: sp.title },
        ]}
      >
        <span
          className="nx-pill"
          style={{
            background: "var(--nx-sustain-soft)",
            color: "var(--nx-sustain-dark)",
            marginBottom: 16,
            display: "inline-flex",
          }}
        >
          {sp.eyebrow}
        </span>
        <h1 className="nx-display" style={{ fontSize: "clamp(36px, 4vw, 56px)", margin: 0, fontWeight: 500 }}>
          {sp.title}
        </h1>
        <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.6, color: "var(--nx-700)", maxWidth: 520 }}>{sp.lead}</p>
        <div className="nx-hero-actions" style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href={contactHref} className="nx-btn nx-btn--primary" style={{ background: "var(--nx-sustain)" }}>
            {t.cta.consulting}
            <ArrowRight />
          </Link>
          <Link href={contactHref} className="nx-btn nx-btn--ghost">
            {t.cta.proposal}
          </Link>
        </div>
      </ImageHero>

      <section data-nx-section style={{ padding: "80px 0", background: "#fff" }}>
        <div className="nx-container">
          <SectionHeader
            title={lang === "TR" ? "Hizmet kapsamımız" : "Our service scope"}
            intro={lang === "TR" ? "ESG ve raporlama hazırlığında uçtan uca danışmanlık." : "End-to-end consulting for ESG and reporting readiness."}
          />
          <FeatureIconGrid items={scopeItems} />
        </div>
      </section>

      <section data-nx-section style={{ padding: "80px 0", background: "#fafaf7" }}>
        <article className="nx-container nx-scope-split" data-nx-collapse data-nx-cgap>
          <ChecklistPanel
            title={lang === "TR" ? "Yaklaşımımız" : "Our approach"}
            accentColor="var(--nx-sustain)"
            items={
              lang === "TR"
                ? ["Materyalite odaklı kapsam", "Ölçülebilir gösterge seti", "Kanıt dosyası disiplini", "Çerçeve eşlemesi"]
                : ["Materiality-led scope", "Measurable indicator set", "Evidence-file discipline", "Framework mapping"]
            }
          />
          <section>
            <SectionHeader title={sp.benefitsTitle} />
            <div className="nx-benefit-cards" data-nx-collapse>
              {benefitCards.map((card) => (
                <article key={card.title} className="nx-benefit-card">
                  <strong className="nx-benefit-card__value">{card.title}</strong>
                  <p className="nx-benefit-card__label">{card.body}</p>
                </article>
              ))}
            </div>
          </section>
        </article>
      </section>
    </>
  );
}
