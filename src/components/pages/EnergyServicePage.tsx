import Link from "next/link";
import type { Locale } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { pathFor } from "@/lib/routes";
import { ENERGY_FAQ } from "@/i18n/faq";
import { energyServiceContent } from "@/i18n/service-content";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CTABand } from "@/components/shared/CTABand";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { ChecklistPanel } from "@/components/shared/ChecklistPanel";
import { EnergyServiceHero } from "@/components/pages/energy/EnergyServiceHero";
import { TepCalculator } from "@/components/energy/TepCalculator";
import { ArrowRight } from "@/components/shared/primitives";

export function EnergyServicePage({ locale }: { locale: Locale }) {
  const { t, lang } = getDictionary(locale);
  const ep = t.energyPage;
  const homeHref = pathFor("home", locale);
  const servicesHref = pathFor("servicesIndex", locale);
  const contactHref = pathFor("contact", locale);
  const sustainHref = pathFor("sustainabilityService", locale);

  const sc = energyServiceContent(lang);
  const processSteps = sc.scopeItems.map((item) => ({
    title: item.title,
    body: item.body,
  }));

  return (
    <>
      <EnergyServiceHero
        lang={lang}
        t={t}
        ep={ep}
        homeHref={homeHref}
        servicesHref={servicesHref}
        contactHref={contactHref}
        sustainHref={sustainHref}
      />

      <TepCalculator locale={locale} />

      <section data-nx-section style={{ padding: "96px 0", background: "#fff" }}>
        <div className="nx-container" style={{ maxWidth: 820 }}>
          <SectionHeader title={ep.scopeNoteTitle} intro={ep.scopeNoteLead} />
        </div>
      </section>

      <section data-nx-section style={{ padding: "96px 0", background: "#fafaf7" }}>
        <div className="nx-container">
          <SectionHeader
            eyebrow={lang === "TR" ? "Metodoloji" : "Methodology"}
            title={ep.processTitle}
            intro={ep.processIntro}
          />
          <ProcessSteps steps={processSteps} accentColor="var(--nx-energy)" />
        </div>
      </section>

      <section data-nx-section style={{ padding: "96px 0", background: "#fff" }}>
        <div className="nx-container nx-scope-split" data-nx-collapse data-nx-cgap>
          <ChecklistPanel title={ep.evaluatedTopicsTitle} items={sc.evaluatedTopics} />
        </div>
      </section>

      <section data-nx-section style={{ padding: "96px 0", background: "#fafaf7" }}>
        <div className="nx-container">
          <SectionHeader size="compact" title={ep.outputsTitle} marginBottom={24} />
          <ul className="nx-bullet-list">
            {sc.outputs.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section data-nx-section style={{ padding: "96px 0", background: "#fff" }}>
        <div className="nx-container" style={{ maxWidth: 820 }}>
          <SectionHeader title={ep.outcomesTitle} intro={ep.outcomesLead} />
        </div>
      </section>

      <section data-nx-section style={{ padding: "96px 0", background: "#fafaf7" }}>
        <div className="nx-container nx-energy-link-grid" data-nx-collapse data-nx-cgap>
          <div className="nx-energy-link-card">
            <SectionHeader size="compact" title={ep.isoTitle} intro={ep.isoLead} marginBottom={0} />
          </div>
          <div className="nx-energy-link-card">
            <SectionHeader size="compact" title={ep.sustainTitle} intro={ep.sustainLead} marginBottom={0} />
            <Link
              href={sustainHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginTop: 16,
                fontSize: 14,
                fontWeight: 600,
                color: "var(--nx-energy)",
              }}
            >
              {lang === "TR" ? "Sürdürülebilirlik hizmeti" : "Sustainability service"}
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      <section data-nx-section style={{ padding: "96px 0", background: "#fff" }}>
        <div className="nx-container">
          <SectionHeader title={ep.audienceTitle} marginBottom={32} />
          <div className="nx-energy-audience-grid" data-nx-collapse>
            {sc.audience.map((seg) => (
              <article key={seg.title} className="nx-energy-audience-card">
                <h3 style={{ margin: "0 0 10px", fontSize: 17, color: "var(--nx-navy)" }}>
                  {seg.title}
                </h3>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: "var(--nx-600)" }}>
                  {seg.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-nx-section style={{ padding: "96px 0", background: "#fafaf7" }}>
        <div className="nx-container">
          <SectionHeader
            eyebrow="FAQ"
            title={lang === "TR" ? "Sık sorulanlar" : "Frequently asked questions"}
          />
          <FaqAccordion items={ENERGY_FAQ[lang]} />
        </div>
      </section>

      <CTABand
        t={t}
        lang={lang}
        locale={locale}
        variant="energy"
        title={ep.ctaTitle}
        subtitle={ep.ctaLead}
        buttonLabel={ep.ctaButton}
      />
    </>
  );
}
