// Flow — ported from direction-a.jsx FlowA. Prototype navigate() / no-op
// anchors → registry-driven <Link>. FAQ sourced from src/i18n/faq.ts so the
// FAQPage JSON-LD can reuse the same Q/A; native <details> kept as-is.
import Link from "next/link";
import type { Locale } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { pathFor } from "@/lib/routes";
import { FLOW_FAQ } from "@/i18n/faq";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CTABand } from "@/components/shared/CTABand";
import { FlowDashboard } from "@/components/shared/FlowDashboard";
import { FlowDetailPanels } from "@/components/shared/FlowDetailPanels";
import { BrandIcon } from "@/components/shared/BrandIcon";
import { NumberLabel, ArrowRight } from "@/components/shared/primitives";

export function FlowPage({ locale }: { locale: Locale }) {
  const { t, lang } = getDictionary(locale);
  const fp = t.flowPage;
  const serviceHref = pathFor("waterService", locale);
  const contactHref = pathFor("contact", locale);
  const faqs = FLOW_FAQ[lang];

  return (
    <>
      {/* Hero */}
      <section
        data-nx-section-t
        style={{
          padding: "96px 0 64px",
          background: "#fafaf7",
          borderBottom: "1px solid var(--nx-200)",
        }}
      >
        <div className="nx-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 24,
            }}
          >
            <BrandIcon kind="flow" size={36} />
            <span
              className="nx-pill"
              style={{
                background: "var(--nx-flow-soft)",
                color: "var(--nx-flow-deep)",
                borderColor: "rgba(0,184,241,0.2)",
              }}
            >
              {fp.eyebrow}
            </span>
          </div>
          <h1
            className="nx-display"
            style={{
              fontSize: "clamp(48px, 7vw, 96px)",
              margin: 0,
              fontWeight: 400,
              color: "var(--nx-900)",
              letterSpacing: "-0.03em",
            }}
          >
            {fp.title}
            <span style={{ color: "var(--nx-flow)" }}>.</span>
          </h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: 64,
              marginTop: 36,
              alignItems: "end",
            }}
            data-nx-collapse data-nx-cgap
          >
            <p
              style={{
                fontSize: 20,
                lineHeight: 1.55,
                color: "var(--nx-700)",
                margin: 0,
                maxWidth: 620,
              }}
            >
              {fp.lead}
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "flex-end",
                flexWrap: "wrap",
              }}
            >
              <Link
                href={contactHref}
                className="nx-btn nx-btn--accent"
                style={{ background: "var(--nx-flow)" }}
              >
                {t.cta.early}
              </Link>
              <Link href={contactHref} className="nx-btn nx-btn--ghost">
                {t.cta.contact}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard mockup */}
      <section data-nx-section-t style={{ padding: "80px 0 40px", background: "#fff" }}>
        <div className="nx-container">
          <FlowDashboard lang={lang} />
        </div>
      </section>

      {/* Detailed example screen — zone breakdown / period / anomalies */}
      <section data-nx-section-b style={{ padding: "0 0 80px", background: "#fff" }}>
        <div className="nx-container">
          <div style={{ maxWidth: 720, marginBottom: 28 }}>
            <div className="nx-eyebrow" style={{ color: "var(--nx-flow)" }}>
              {lang === "TR" ? "Örnek ekran" : "Example screen"}
            </div>
            <h2
              className="nx-display"
              style={{
                fontSize: "clamp(26px, 3.2vw, 38px)",
                fontWeight: 400,
                color: "var(--nx-900)",
                margin: "12px 0 0",
              }}
            >
              {lang === "TR"
                ? "Bölge bazlı tüketim, dönem karşılaştırması ve anomali kaydı"
                : "Zone-level consumption, period comparison and anomaly log"}
            </h2>
            <p
              style={{
                marginTop: 14,
                fontSize: 16,
                color: "var(--nx-600)",
                lineHeight: 1.6,
              }}
            >
              {lang === "TR"
                ? "Tek bir tesiste sayaç/bölge kırılımı, geçmiş döneme göre ölçülen azalım ve olası kaçak/eşik anomalilerinin kaydı. Tüm değerler örnek senaryodur."
                : "Per-meter/zone breakdown for a single site, measured reduction vs. the previous period, and a log of likely leak/threshold anomalies. All figures are an illustrative scenario."}
            </p>
          </div>
          <FlowDetailPanels lang={lang} />
        </div>
      </section>

      {/* Features */}
      <section data-nx-section style={{ padding: "120px 0", background: "#fff" }}>
        <div className="nx-container">
          <SectionHeader
            eyebrow={lang === "TR" ? "Modüller" : "Modules"}
            title={fp.featuresTitle}
            intro={fp.featuresIntro}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 0,
              border: "1px solid var(--nx-200)",
            }}
            data-nx-collapse
          >
            {[
              {
                n: "01",
                title:
                  lang === "TR"
                    ? "Anlık tüketim izleme"
                    : "Real-time consumption monitoring",
                body:
                  lang === "TR"
                    ? "Sayaç verisini saatlik ve günlük dilimler halinde toplar; tesisler arası karşılaştırılabilir hale getirir."
                    : "Collects meter data in hourly and daily slices; makes facilities comparable to each other.",
              },
              {
                n: "02",
                title:
                  lang === "TR"
                    ? "Eşik bazlı uyarılar"
                    : "Threshold-based alerts",
                body:
                  lang === "TR"
                    ? "Tüketim, basınç ve akış için özelleştirilebilir eşikler. Sapma anında bildirim."
                    : "Customizable thresholds for consumption, pressure, and flow. Notification on deviation.",
              },
              {
                n: "03",
                title:
                  lang === "TR"
                    ? "Mevzuat şablonlu raporlama"
                    : "Regulation-templated reporting",
                body:
                  lang === "TR"
                    ? "ISO 46001 ve sektör spesifik raporlar için hazır şablonlar."
                    : "Ready-made templates for ISO 46001 and sector-specific reports.",
              },
              {
                n: "04",
                title:
                  lang === "TR"
                    ? "Tesis ve sayaç haritası"
                    : "Facility and meter map",
                body:
                  lang === "TR"
                    ? "Çok tesisli işletmeler için hiyerarşik tesis & sayaç görünümü."
                    : "Hierarchical site & meter view for multi-facility operations.",
              },
              {
                n: "05",
                title: lang === "TR" ? "Danışman erişimi" : "Consultant access",
                body:
                  lang === "TR"
                    ? "Saha ekibiniz ve Nexovia danışmanları aynı veriyi, aynı arayüzden görür."
                    : "Your field team and Nexovia consultants see the same data, in the same interface.",
              },
              {
                n: "06",
                title: lang === "TR" ? "Veri dışa aktarımı" : "Data export",
                body:
                  lang === "TR"
                    ? "CSV, Excel ve API ile entegrasyon. Verileriniz size ait."
                    : "CSV, Excel and API integration. Your data belongs to you.",
              },
            ].map((f, i, arr) => (
              <div
                key={f.n}
                style={{
                  padding: 36,
                  borderRight:
                    i % 2 === 0 ? "1px solid var(--nx-200)" : "none",
                  borderBottom:
                    i < arr.length - 2 ? "1px solid var(--nx-200)" : "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 14,
                  }}
                >
                  <NumberLabel n={f.n} />
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: "var(--nx-flow-soft)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "var(--nx-flow)",
                      }}
                    />
                  </div>
                </div>
                <h3
                  className="nx-display"
                  style={{
                    fontSize: 24,
                    margin: 0,
                    fontWeight: 500,
                    color: "var(--nx-900)",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    marginTop: 12,
                    fontSize: 15,
                    color: "var(--nx-600)",
                    lineHeight: 1.6,
                  }}
                >
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Relationship with Water Efficiency Consulting */}
      <section data-nx-section style={{ padding: "120px 0", background: "#fafaf7" }}>
        <div className="nx-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "center",
            }}
            data-nx-collapse data-nx-cgap
          >
            <div>
              <div
                className="nx-eyebrow"
                style={{ color: "var(--nx-flow)" }}
              >
                —{" "}
                {lang === "TR"
                  ? "Danışmanlıkla ilişki"
                  : "Relationship to consulting"}
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
                {lang === "TR"
                  ? "Flow tek başına çalışmaz. Danışmanlığın doğal uzantısıdır."
                  : "Flow doesn't work alone. It is the natural extension of consulting."}
              </h2>
              <p
                style={{
                  marginTop: 20,
                  fontSize: 17,
                  color: "var(--nx-600)",
                  lineHeight: 1.65,
                }}
              >
                {lang === "TR"
                  ? "Su Verimliliği Danışmanlığı sürecinde topladığımız veriler Flow üzerinde yaşar. Saha ekipleriniz, danışman ekibimiz ve denetim ekibiniz aynı kaynaktan beslenir."
                  : "Data collected during Water Efficiency Consulting lives inside Flow. Your field teams, our consultants and your auditors all draw from the same source."}
              </p>
              <Link
                href={serviceHref}
                className="nx-btn nx-btn--primary"
                style={{ marginTop: 28 }}
              >
                {lang === "TR"
                  ? "Su Verimliliği Danışmanlığı"
                  : "Water Efficiency Consulting"}
                <ArrowRight />
              </Link>
            </div>
            <div>
              {/* Flow diagram */}
              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--nx-200)",
                  borderRadius: 10,
                  padding: 32,
                }}
              >
                {[
                  {
                    step: "01",
                    label: lang === "TR" ? "Saha ölçümü" : "Field measurement",
                    color: "var(--nx-400)",
                  },
                  {
                    step: "02",
                    label: lang === "TR" ? "Etüt & analiz" : "Audit & analysis",
                    color: "var(--nx-400)",
                  },
                  {
                    step: "03",
                    label: lang === "TR" ? "Flow'a aktarım" : "Pipe into Flow",
                    color: "var(--nx-flow)",
                  },
                  {
                    step: "04",
                    label:
                      lang === "TR"
                        ? "Sürekli raporlama"
                        : "Continuous reporting",
                    color: "var(--nx-flow)",
                  },
                ].map((s, i, arr) => (
                  <div key={s.step}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 18,
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          border: `1px solid ${s.color}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          fontWeight: 600,
                          color: s.color,
                          flexShrink: 0,
                        }}
                      >
                        {s.step}
                      </div>
                      <div
                        style={{
                          fontSize: 17,
                          color: "var(--nx-900)",
                          fontWeight: 500,
                        }}
                      >
                        {s.label}
                      </div>
                    </div>
                    {i < arr.length - 1 && (
                      <div
                        style={{
                          width: 1,
                          height: 22,
                          background: s.color,
                          marginLeft: 18,
                          opacity: 0.4,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section data-nx-section style={{ padding: "120px 0", background: "#fff" }}>
        <div className="nx-container">
          <SectionHeader eyebrow="FAQ" title={fp.faqTitle} />
          <div style={{ borderTop: "1px solid var(--nx-200)" }}>
            {faqs.map((faq, i) => (
              <details
                key={i}
                style={{
                  borderBottom: "1px solid var(--nx-200)",
                  padding: "24px 0",
                }}
              >
                <summary
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    listStyle: "none",
                    fontSize: 19,
                    fontWeight: 500,
                    color: "var(--nx-900)",
                    fontFamily: "var(--nx-font-display)",
                  }}
                >
                  {faq.q}
                  <span style={{ fontSize: 22, color: "var(--nx-400)" }}>
                    +
                  </span>
                </summary>
                <p
                  style={{
                    marginTop: 14,
                    fontSize: 16,
                    color: "var(--nx-600)",
                    lineHeight: 1.6,
                    maxWidth: 780,
                  }}
                >
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTABand t={t} lang={lang} locale={locale} variant="navy" />
    </>
  );
}
