// Water Efficiency Consulting — ported from direction-a.jsx ServiceA.
// Prototype navigate() / no-op anchors → registry-driven <Link>; hand-built
// breadcrumb → shared <Breadcrumb> (services index has no page, no href).
import Link from "next/link";
import type { Locale } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { pathFor } from "@/lib/routes";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CTABand } from "@/components/shared/CTABand";
import { FlowDashboard } from "@/components/shared/FlowDashboard";
import { BrandIcon } from "@/components/shared/BrandIcon";
import { Breadcrumb } from "@/components/shared/Breadcrumb";

export function WaterServicePage({ locale }: { locale: Locale }) {
  const { t, lang } = getDictionary(locale);
  const sp = t.waterPage;
  const homeHref = pathFor("home", locale);
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
              { name: t.nav.services },
              { name: t.services.water.title },
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
            <BrandIcon kind="flow" size={32} />
            <span
              className="nx-pill"
              style={{
                background: "var(--nx-flow-soft)",
                color: "var(--nx-flow-deep)",
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
                title: lang === "TR" ? "Saha etüdü" : "Site audit",
                items:
                  lang === "TR"
                    ? ["Tesis turu", "Sayaç envanteri", "Operasyon görüşmeleri"]
                    : [
                        "Facility walk",
                        "Meter inventory",
                        "Operations interviews",
                      ],
              },
              {
                n: "02",
                title:
                  lang === "TR" ? "Tüketim analizi" : "Consumption analysis",
                items:
                  lang === "TR"
                    ? [
                        "Veri normalizasyonu",
                        "Birim tüketim hesabı",
                        "Kıyaslama",
                      ]
                    : [
                        "Data normalization",
                        "Specific consumption",
                        "Benchmarking",
                      ],
              },
              {
                n: "03",
                title: lang === "TR" ? "İyileştirme planı" : "Improvement plan",
                items:
                  lang === "TR"
                    ? [
                        "Önceliklendirme",
                        "Yatırım çerçevesi",
                        "Geri ödeme süresi",
                      ]
                    : [
                        "Prioritization",
                        "Investment framing",
                        "Payback analysis",
                      ],
              },
              {
                n: "04",
                title:
                  lang === "TR"
                    ? "Sürekli raporlama"
                    : "Continuous reporting",
                items:
                  lang === "TR"
                    ? ["Flow entegrasyonu", "Aylık özet", "Mevzuat takibi"]
                    : [
                        "Flow integration",
                        "Monthly summary",
                        "Regulation tracking",
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
                      color: "var(--nx-accent)",
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
                      <span style={{ color: "var(--nx-accent)" }}>—</span>
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
                style={{ color: "var(--nx-accent)" }}
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
                  ? "Sonuçlar tesisin başlangıç durumuna ve uygulanan iyileştirmelere göre değişir. Aşağıdaki örnek değerler, gerçek bir tesis için kurguladığımız tipik bir senaryodur."
                  : "Outcomes depend on the facility's baseline and the improvements applied. The figures below are illustrative for a typical site."}
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
                  v: "12–18%",
                  l:
                    lang === "TR"
                      ? "Yıllık ölçülebilir tüketim azalımı"
                      : "Annual measurable consumption drop",
                },
                {
                  v: "%100",
                  l:
                    lang === "TR"
                      ? "Ölçüm-rapor zinciri kapsama"
                      : "Measurement-to-report chain coverage",
                },
                {
                  v: "14+",
                  l:
                    lang === "TR"
                      ? "Gün — etüt süresi (değişken)"
                      : "Days — audit duration (variable)",
                },
                {
                  v: "ISO",
                  l:
                    lang === "TR"
                      ? "46001 hazır raporlama altyapısı"
                      : "46001-ready reporting infrastructure",
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
                style={{ color: "var(--nx-flow)" }}
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
                {sp.relatedFlow}
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
                {sp.relatedFlowLead}
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
                  style={{ background: "var(--nx-flow)" }}
                >
                  {lang === "TR" ? "Flow'u incele" : "Explore Flow"}
                </Link>
                <Link
                  href={contactHref}
                  className="nx-btn nx-btn--ghost-light"
                >
                  {t.cta.early}
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
