// Sustainability Consulting (ESG) — mirrors WaterServicePage structure with
// the sustainability green palette. This is a consulting service page (no
// early-access/SaaS language for the service itself); it may reference
// Nexovia Flow lightly as a supporting platform. Hand-built breadcrumb →
// shared <Breadcrumb> (services index resolves via the registry).
import Link from "next/link";
import type { Locale } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { pathFor } from "@/lib/routes";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CTABand } from "@/components/shared/CTABand";
import { FlowDashboard } from "@/components/shared/FlowDashboard";
import { BrandIcon } from "@/components/shared/BrandIcon";
import { Breadcrumb } from "@/components/shared/Breadcrumb";

export function SustainabilityServicePage({ locale }: { locale: Locale }) {
  const { t, lang } = getDictionary(locale);
  const sp = t.sustainabilityPage;
  const homeHref = pathFor("home", locale);
  const servicesHref = pathFor("servicesIndex", locale);
  const flowHref = pathFor("flow", locale);
  const contactHref = pathFor("contact", locale);

  return (
    <>
      {/* Breadcrumb + Hero */}
      <section style={{ padding: "40px 0 16px", background: "#fff" }}>
        <div className="nx-container">
          <Breadcrumb
            items={[
              {
                name: lang === "TR" ? "Anasayfa" : "Home",
                href: homeHref,
              },
              { name: t.nav.services, href: servicesHref },
              { name: sp.title },
            ]}
          />
        </div>
      </section>
      <section data-nx-section-b style={{ padding: "32px 0 96px", background: "#fff" }}>
        <div className="nx-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <BrandIcon kind="sustain" size={32} />
            <span
              className="nx-pill"
              style={{
                background: "var(--nx-sustain-soft)",
                color: "var(--nx-sustain-dark)",
              }}
            >
              {sp.eyebrow}
            </span>
          </div>
          <h1
            className="nx-display"
            style={{
              fontSize: "clamp(40px, 5.5vw, 72px)",
              margin: 0,
              fontWeight: 400,
              color: "var(--nx-900)",
              maxWidth: 1000,
            }}
          >
            {sp.title}
          </h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: 64,
              marginTop: 40,
              alignItems: "end",
            }}
            data-nx-collapse data-nx-cgap
          >
            <p
              style={{
                fontSize: 19,
                color: "var(--nx-700)",
                lineHeight: 1.55,
                margin: 0,
                maxWidth: 620,
              }}
            >
              {sp.lead}
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                justifyContent: "flex-end",
              }}
            >
              <Link href={contactHref} className="nx-btn nx-btn--primary">
                {t.cta.consulting}
              </Link>
              <Link href={contactHref} className="nx-btn nx-btn--ghost">
                {t.cta.proposal}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section data-nx-section style={{ padding: "120px 0", background: "#fafaf7" }}>
        <div className="nx-container">
          <SectionHeader
            eyebrow={lang === "TR" ? "Metodoloji" : "Methodology"}
            title={sp.processTitle}
            intro={sp.processIntro}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 24,
            }}
            data-nx-collapse-2
          >
            {[
              {
                n: "01",
                title:
                  lang === "TR"
                    ? "Kapsam & ölçüm sınırı"
                    : "Scope & boundary",
                items:
                  lang === "TR"
                    ? [
                        "Organizasyon sınırı",
                        "Materyalite taraması",
                        "Gösterge seçimi",
                      ]
                    : [
                        "Organizational boundary",
                        "Materiality scan",
                        "Indicator selection",
                      ],
              },
              {
                n: "02",
                title:
                  lang === "TR"
                    ? "Veri toplama & normalizasyon"
                    : "Data collection & normalization",
                items:
                  lang === "TR"
                    ? [
                        "Kaynak envanteri",
                        "Birim dönüşümü",
                        "Veri kalite kontrolü",
                      ]
                    : [
                        "Source inventory",
                        "Unit conversion",
                        "Data quality checks",
                      ],
              },
              {
                n: "03",
                title:
                  lang === "TR"
                    ? "Analiz & boşluk değerlendirmesi"
                    : "Analysis & gap assessment",
                items:
                  lang === "TR"
                    ? [
                        "Çerçeve eşlemesi",
                        "Boşluk analizi",
                        "Önceliklendirme",
                      ]
                    : [
                        "Framework mapping",
                        "Gap analysis",
                        "Prioritization",
                      ],
              },
              {
                n: "04",
                title:
                  lang === "TR"
                    ? "Raporlama hazırlığı"
                    : "Reporting readiness",
                items:
                  lang === "TR"
                    ? [
                        "GRI / CDP uyumu",
                        "Kanıt dosyası",
                        "Beyan taslağı",
                      ]
                    : [
                        "GRI / CDP alignment",
                        "Evidence file",
                        "Disclosure draft",
                      ],
              },
            ].map((step) => (
              <div
                key={step.n}
                style={{
                  background: "#fff",
                  border: "1px solid var(--nx-200)",
                  borderRadius: 10,
                  padding: 28,
                  display: "flex",
                  flexDirection: "column" as const,
                  gap: 18,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    className="nx-display"
                    style={{
                      fontSize: 32,
                      color: "var(--nx-sustain)",
                      fontWeight: 400,
                    }}
                  >
                    {step.n}
                  </span>
                  <span
                    style={{
                      width: 28,
                      height: 1,
                      background: "var(--nx-300)",
                    }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: 19,
                    margin: 0,
                    fontWeight: 600,
                    color: "var(--nx-900)",
                  }}
                >
                  {step.title}
                </h3>
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column" as const,
                    gap: 8,
                  }}
                >
                  {step.items.map((it) => (
                    <li
                      key={it}
                      style={{
                        fontSize: 14,
                        color: "var(--nx-600)",
                        display: "flex",
                        gap: 8,
                      }}
                    >
                      <span style={{ color: "var(--nx-sustain)" }}>—</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section data-nx-section style={{ padding: "120px 0", background: "#fff" }}>
        <div className="nx-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "0.9fr 1.1fr",
              gap: 80,
            }}
            data-nx-collapse data-nx-cgap
          >
            <div>
              <div
                className="nx-eyebrow"
                style={{ color: "var(--nx-sustain)" }}
              >
                {lang === "TR" ? "Çıktılar" : "Outcomes"}
              </div>
              <h2
                className="nx-display"
                style={{
                  fontSize: "clamp(28px, 3.6vw, 44px)",
                  fontWeight: 400,
                  color: "var(--nx-900)",
                  margin: "16px 0 0",
                }}
              >
                {sp.benefitsTitle}
              </h2>
              <p
                style={{
                  marginTop: 16,
                  fontSize: 16,
                  color: "var(--nx-600)",
                  lineHeight: 1.6,
                }}
              >
                {lang === "TR"
                  ? "Sonuçlar kuruluşun başlangıç olgunluğuna ve hedeflenen raporlama çerçevesine göre değişir. Aşağıdaki örnek değerler, tipik bir kuruluş için kurguladığımız bir senaryodur."
                  : "Outcomes depend on the organization's baseline maturity and the target reporting framework. The figures below are illustrative for a typical organization."}
              </p>
              <span
                className="nx-pill nx-pill--placeholder"
                style={{ marginTop: 16, display: "inline-flex" }}
              >
                {lang === "TR" ? "Örnek senaryo" : "Sample scenario"}
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 0,
              }}
              data-nx-collapse
            >
              {[
                {
                  v: "GRI",
                  l:
                    lang === "TR"
                      ? "Çerçeveye eşlenmiş gösterge seti"
                      : "Framework-mapped indicator set",
                },
                {
                  v: "%100",
                  l:
                    lang === "TR"
                      ? "Veri-kanıt zinciri izlenebilirliği"
                      : "Data-to-evidence chain traceability",
                },
                {
                  v: "20+",
                  l:
                    lang === "TR"
                      ? "Gün — kapsam çalışması (değişken)"
                      : "Days — scoping engagement (variable)",
                },
                {
                  v: "CDP",
                  l:
                    lang === "TR"
                      ? "Beyan taslağına hazır altyapı"
                      : "Disclosure-draft-ready infrastructure",
                },
              ].map((b, i) => (
                <div
                  key={i}
                  style={{
                    padding: "32px 24px",
                    borderRight:
                      i % 2 === 0 ? "1px solid var(--nx-200)" : "none",
                    borderBottom:
                      i < 2 ? "1px solid var(--nx-200)" : "none",
                  }}
                >
                  <div
                    className="nx-display"
                    style={{
                      fontSize: 56,
                      fontWeight: 400,
                      color: "var(--nx-900)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {b.v}
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 14,
                      color: "var(--nx-600)",
                      lineHeight: 1.45,
                    }}
                  >
                    {b.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Flow block */}
      <section
        data-nx-section
        style={{ padding: "100px 0", background: "#0B1226", color: "#fff" }}
      >
        <div className="nx-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: 64,
              alignItems: "center",
            }}
            data-nx-collapse data-nx-cgap
          >
            <div>
              <div
                className="nx-eyebrow"
                style={{ color: "var(--nx-sustain-bright)" }}
              >
                — {lang === "TR" ? "İlgili Platform" : "Related Platform"}
              </div>
              <h2
                className="nx-display"
                style={{
                  fontSize: "clamp(28px, 3.6vw, 44px)",
                  fontWeight: 400,
                  margin: "16px 0 0",
                }}
              >
                {sp.relatedNote}
              </h2>
              <p
                style={{
                  marginTop: 18,
                  fontSize: 17,
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.6,
                  maxWidth: 520,
                }}
              >
                {sp.relatedNoteLead}
              </p>
              <div
                style={{
                  marginTop: 28,
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <Link
                  href={flowHref}
                  className="nx-btn nx-btn--accent"
                  style={{ background: "var(--nx-sustain)" }}
                >
                  {lang === "TR" ? "Flow'u incele" : "Explore Flow"}
                </Link>
                <Link
                  href={contactHref}
                  className="nx-btn nx-btn--ghost-light"
                >
                  {t.cta.consulting}
                </Link>
              </div>
            </div>
            <FlowDashboard compact lang={lang} />
          </div>
        </div>
      </section>

      <CTABand t={t} lang={lang} locale={locale} variant="navy" />
    </>
  );
}
