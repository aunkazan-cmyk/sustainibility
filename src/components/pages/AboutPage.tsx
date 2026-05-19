// About — ported from pages-secondary.jsx AboutPage. Direction A locked
// (the dir === "B" branches dropped with the rejected direction). Shared
// PageHero is already Direction-A editorial, so no dir/accentColor props.
import type { Locale } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CTABand } from "@/components/shared/CTABand";
import { BrandIcon } from "@/components/shared/BrandIcon";

export function AboutPage({ locale }: { locale: Locale }) {
  const { t, lang } = getDictionary(locale);
  const ap = t.aboutPage;

  const principles = [
    {
      n: "01",
      title: lang === "TR" ? "Saha + dijital" : "Field + digital",
      body:
        lang === "TR"
          ? "Sayaçtan rapora kesintisiz veri akışı. Nexovia Flow ile ölçüm zinciri kopmaz."
          : "Unbroken data flow from meter to report. With Nexovia Flow the measurement chain stays intact.",
    },
    {
      n: "02",
      title: lang === "TR" ? "Mevzuat takibi" : "Regulation tracking",
      body:
        lang === "TR"
          ? "ISO 46001, ADR/TMGD, ESG çerçeveleri — yorum değil, uygulama."
          : "ISO 46001, ADR/TMGD, ESG frameworks — implementation, not interpretation.",
    },
    {
      n: "03",
      title: lang === "TR" ? "Sektörel ekipler" : "Sector-aware teams",
      body:
        lang === "TR"
          ? "Kimya tesisi ile otel zinciri aynı şekilde okunmaz. Sektörel alan deneyimi."
          : "A chemical site doesn't read like a hotel chain. Field experience per sector.",
    },
    {
      n: "04",
      title: lang === "TR" ? "Raporlanabilir çıktı" : "Reportable output",
      body:
        lang === "TR"
          ? "Her aşama bir teslimat. Her teslimat denetim-hazır."
          : "Every phase has a deliverable. Every deliverable is audit-ready.",
    },
  ];

  const brandAreas = [
    {
      kind: "nexovia",
      name: "Nexovia",
      role: lang === "TR" ? "Kurumsal ana marka" : "Corporate parent brand",
      body:
        lang === "TR"
          ? "Üç pratik için tek bir kalite ve metodoloji çerçevesi."
          : "One quality and methodology framework across three practices.",
    },
    {
      kind: "flow",
      name: "Nexovia Flow",
      role:
        lang === "TR"
          ? "Platform · su verimliliği desteği"
          : "Platform · water efficiency support",
      body:
        lang === "TR"
          ? "Ölçüm, izleme ve raporlama altyapısı. Erken erişim."
          : "Measurement, monitoring, and reporting infrastructure. Early access.",
    },
    {
      kind: "sustain",
      name: "Nexovia Sustainability",
      role:
        lang === "TR"
          ? "Sürdürülebilirlik danışmanlığı"
          : "Sustainability consulting",
      body:
        lang === "TR"
          ? "ESG stratejisi, çevresel performans, raporlama hazırlığı."
          : "ESG strategy, environmental performance, reporting readiness.",
    },
    {
      kind: "adr",
      name: "Nexovia ADR",
      role: lang === "TR" ? "ADR / TMGD danışmanlığı" : "ADR / TMGD consulting",
      body:
        lang === "TR"
          ? "Tehlikeli madde uyumu, dokümantasyon, denetim hazırlığı."
          : "Dangerous goods compliance, documentation, inspection prep.",
    },
  ];

  return (
    <>
      <PageHero eyebrow={ap.eyebrow} title={ap.title} lead={ap.lead} />

      {/* Manifesto block */}
      <section data-nx-section style={{ padding: "120px 0", background: "#fff" }}>
        <div className="nx-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "0.9fr 1.1fr",
              gap: 80,
              alignItems: "start",
            }}
            data-nx-collapse data-nx-cgap
          >
            <div>
              <div
                className="nx-eyebrow"
                style={{ color: "var(--nx-accent)" }}
              >
                {lang === "TR" ? "Manifesto" : "Manifesto"}
              </div>
              <h2
                className="nx-display"
                style={{
                  fontSize: "clamp(30px, 4vw, 48px)",
                  margin: "16px 0 0",
                  fontWeight: 400,
                  color: "var(--nx-900)",
                  letterSpacing: "-0.015em",
                }}
              >
                {ap.manifestoTitle}
              </h2>
            </div>
            <p
              style={{
                fontSize: 19,
                lineHeight: 1.65,
                color: "var(--nx-700)",
                margin: 0,
                textWrap: "pretty",
              }}
            >
              {ap.manifestoBody}
            </p>
          </div>
        </div>
      </section>

      {/* Brand architecture */}
      <section data-nx-section style={{ padding: "120px 0", background: "#fafaf7" }}>
        <div className="nx-container">
          <SectionHeader
            eyebrow={lang === "TR" ? "Mimari" : "Architecture"}
            title={ap.brandAreasTitle}
            intro={ap.brandAreasIntro}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
            }}
            data-nx-collapse-2
          >
            {brandAreas.map((b) => (
              <div
                key={b.name}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: 24,
                  border: "1px solid var(--nx-200)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <BrandIcon kind={b.kind} size={44} />
                <div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "var(--nx-900)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {b.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--nx-500)",
                      marginTop: 4,
                      fontWeight: 500,
                    }}
                  >
                    {b.role}
                  </div>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    color: "var(--nx-600)",
                    lineHeight: 1.55,
                  }}
                >
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section data-nx-section style={{ padding: "120px 0", background: "#fff" }}>
        <div className="nx-container">
          <SectionHeader
            eyebrow={lang === "TR" ? "Yaklaşım" : "Approach"}
            title={ap.principlesTitle}
          />
          <div style={{ borderTop: "1px solid var(--nx-200)" }}>
            {principles.map((p) => (
              <div
                key={p.n}
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr 1fr",
                  gap: 48,
                  padding: "32px 0",
                  borderBottom: "1px solid var(--nx-200)",
                  alignItems: "start",
                }}
                data-nx-collapse data-nx-cgap
              >
                <div
                  className="nx-mono"
                  style={{
                    color: "var(--nx-400)",
                    fontSize: 12,
                    paddingTop: 6,
                  }}
                >
                  {p.n}
                </div>
                <h3
                  className="nx-display"
                  style={{
                    fontSize: 26,
                    margin: 0,
                    fontWeight: 500,
                    color: "var(--nx-900)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 16,
                    color: "var(--nx-600)",
                    lineHeight: 1.6,
                    textWrap: "pretty",
                  }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand t={t} lang={lang} locale={locale} />
    </>
  );
}
