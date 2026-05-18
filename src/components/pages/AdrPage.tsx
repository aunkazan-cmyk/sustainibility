// Nexovia ADR — platform page, mirrors FlowPage structure with the ADR amber
// palette. This is a PRODUCT (early-access/platform language only, never
// "consulting"). FAQ sourced from src/i18n/faq.ts so the FAQPage JSON-LD can
// reuse the same Q/A; native <details> kept as-is.
import Link from "next/link";
import type { Locale } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { pathFor } from "@/lib/routes";
import { ADR_FAQ } from "@/i18n/faq";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CTABand } from "@/components/shared/CTABand";
import { AdrDashboard } from "@/components/shared/AdrDashboard";
import { AdrDetailPanels } from "@/components/shared/AdrDetailPanels";
import { BrandIcon } from "@/components/shared/BrandIcon";
import { NumberLabel } from "@/components/shared/primitives";

export function AdrPage({ locale }: { locale: Locale }) {
  const { t, lang } = getDictionary(locale);
  const ap = t.adrPage;
  const contactHref = pathFor("contact", locale);
  const faqs = ADR_FAQ[lang];

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
            <BrandIcon kind="adr" size={36} />
            <span
              className="nx-pill"
              style={{
                background: "var(--nx-adr-soft)",
                color: "var(--nx-adr-deep)",
                borderColor: "rgba(217,119,6,0.2)",
              }}
            >
              {ap.eyebrow}
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
            {ap.title}
            <span style={{ color: "var(--nx-adr)" }}>.</span>
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
              {ap.lead}
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
                style={{ background: "var(--nx-adr)" }}
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
          <AdrDashboard lang={lang} />
        </div>
      </section>

      {/* Detailed example screen — shipment & document register */}
      <section data-nx-section-b style={{ padding: "0 0 80px", background: "#fff" }}>
        <div className="nx-container">
          <div style={{ maxWidth: 720, marginBottom: 28 }}>
            <div className="nx-eyebrow" style={{ color: "var(--nx-adr)" }}>
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
                ? "Sevkiyat ve belge kaydı, sertifika süresi ve denetim öncesi durum"
                : "Shipment & document register, certificate expiry and pre-inspection status"}
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
                ? "Tek bir operasyonda sevkiyat-bazlı UN numarası ve ADR sınıfı kaydı, taşıma evrakının tamlık durumu, belge/sertifika süre takibi ve denetime hazırlık özeti. Tüm değerler örnek senaryodur."
                : "Per-shipment UN-number and ADR-class register for a single operation, transport-document completeness, certificate-expiry tracking and an inspection-readiness summary. All figures are an illustrative scenario."}
            </p>
          </div>
          <AdrDetailPanels lang={lang} />
        </div>
      </section>

      {/* Modules */}
      <section data-nx-section style={{ padding: "120px 0", background: "#fff" }}>
        <div className="nx-container">
          <SectionHeader
            eyebrow={lang === "TR" ? "Modüller" : "Modules"}
            title={ap.featuresTitle}
            intro={ap.featuresIntro}
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
                    ? "ADR sınıflandırma"
                    : "ADR classification",
                body:
                  lang === "TR"
                    ? "Tehlikeli maddeyi ADR sınıfı, ambalaj grubu ve etiketleme kuralına göre sınıflandırır; kayıt tek yerde tutulur."
                    : "Classifies dangerous goods by ADR class, packing group and labelling rule; the record is kept in one place.",
              },
              {
                n: "02",
                title:
                  lang === "TR"
                    ? "Taşıma evrakı"
                    : "Transport documents",
                body:
                  lang === "TR"
                    ? "Sevkiyat başına taşıma evrakını üretir ve tamlık durumunu izler; eksik belge anında işaretlenir."
                    : "Generates per-shipment transport documents and tracks completeness; missing paperwork is flagged immediately.",
              },
              {
                n: "03",
                title:
                  lang === "TR"
                    ? "UN no & sınıf takibi"
                    : "UN no. & class tracking",
                body:
                  lang === "TR"
                    ? "UN numarası, ADR sınıfı ve miktar eşikleri sevkiyat kaydına bağlanır; geçmiş kayıtlar aranabilir."
                    : "UN number, ADR class and quantity thresholds are bound to each shipment record; history is searchable.",
              },
              {
                n: "04",
                title:
                  lang === "TR"
                    ? "Sürücü-araç uygunluğu"
                    : "Driver-vehicle eligibility",
                body:
                  lang === "TR"
                    ? "ADR sürücü sertifikası ve araç uygunluk belgesi geçerliliğini sevkiyatla eşleştirir; süresi yaklaşan belgeleri uyarır."
                    : "Matches ADR driver certificate and vehicle eligibility validity against the shipment; warns on documents nearing expiry.",
              },
              {
                n: "05",
                title:
                  lang === "TR"
                    ? "Denetim öncesi kontrol listeleri"
                    : "Pre-inspection checklists",
                body:
                  lang === "TR"
                    ? "Denetime hazırlık adımlarını kontrol listesi halinde yürütür; hazırlık skorunu tek panoda gösterir."
                    : "Runs inspection-readiness steps as checklists and surfaces the readiness score on a single board.",
              },
              {
                n: "06",
                title:
                  lang === "TR"
                    ? "Dışa aktarım & API"
                    : "Export & API",
                body:
                  lang === "TR"
                    ? "Kayıt ve raporları CSV, Excel ve API ile dışa aktarır. Verileriniz size aittir."
                    : "Exports records and reports via CSV, Excel and API. Your data belongs to you.",
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
                      background: "var(--nx-adr-soft)",
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
                        background: "var(--nx-adr)",
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

      {/* FAQ */}
      <section data-nx-section style={{ padding: "120px 0", background: "#fff" }}>
        <div className="nx-container">
          <SectionHeader eyebrow="FAQ" title={ap.faqTitle} />
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

      <CTABand t={t} lang={lang} locale={locale} variant="ink" />
    </>
  );
}
