import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { pathFor } from "@/lib/routes";
import { FLOW_FAQ } from "@/i18n/faq";
import { IMAGES } from "@/lib/images";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CTABand } from "@/components/shared/CTABand";
import { FlowCycleDiagram } from "@/components/shared/FlowCycleDiagram";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { BrandIcon } from "@/components/shared/BrandIcon";
import { ArrowRight } from "@/components/shared/primitives";

const FEATURES = {
  TR: [
    { title: "Gerçek Zamanlı İzleme", body: "Sayaç verisini saatlik ve günlük dilimler halinde toplar." },
    { title: "Veri Analitiği", body: "Tesisler arası karşılaştırma ve trend analizi." },
    { title: "Eşik Uyarıları", body: "Özelleştirilebilir eşikler; sapma anında bildirim." },
    { title: "Raporlama", body: "ISO 46001 ve sektör şablonlarıyla rapor üretimi." },
    { title: "Danışman Erişimi", body: "Saha ve danışman ekipleri aynı arayüzü kullanır." },
  ],
  EN: [
    { title: "Real-time monitoring", body: "Collects meter data in hourly and daily slices." },
    { title: "Data analytics", body: "Cross-facility comparison and trend analysis." },
    { title: "Threshold alerts", body: "Customizable thresholds with instant notification." },
    { title: "Reporting", body: "ISO 46001 and sector templates for report output." },
    { title: "Consultant access", body: "Field and consulting teams share one interface." },
  ],
};

export function FlowPage({ locale }: { locale: Locale }) {
  const { t, lang } = getDictionary(locale);
  const fp = t.flowPage;
  const serviceHref = pathFor("waterService", locale);
  const contactHref = pathFor("contact", locale);
  const faqs = FLOW_FAQ[lang];
  const features = FEATURES[lang];

  const steps =
    lang === "TR"
      ? [
          { title: "Keşif", body: "Mevcut sayaç ve veri altyapısı değerlendirilir." },
          { title: "Kurulum", body: "Tesis ve sayaç envanteri Flow'a tanımlanır." },
          { title: "Veri onboarding", body: "Geçmiş ve canlı veri akışı bağlanır." },
          { title: "Eğitim", body: "Saha ve yönetim ekipleri için kullanım eğitimi." },
          { title: "Başlangıç", body: "İzleme ve raporlama süreklilik kazanır." },
        ]
      : [
          { title: "Discovery", body: "Existing meter and data infrastructure is assessed." },
          { title: "Setup", body: "Sites and meters are configured in Flow." },
          { title: "Data onboarding", body: "Historical and live data streams are connected." },
          { title: "Training", body: "Hands-on training for field and management teams." },
          { title: "Go-live", body: "Monitoring and reporting run continuously." },
        ];

  return (
    <>
      <section
        data-nx-section-t
        style={{ padding: "72px 0 48px", background: "linear-gradient(180deg, #f0f9ff 0%, #fff 70%)" }}
      >
        <div className="nx-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.1fr",
              gap: 48,
              alignItems: "center",
            }}
            data-nx-collapse
            data-nx-cgap
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <BrandIcon kind="flow" size={36} />
                <span className="nx-pill" style={{ background: "var(--nx-flow-soft)", color: "var(--nx-flow-deep)" }}>
                  {fp.eyebrow}
                </span>
              </div>
              <h1 className="nx-display" style={{ fontSize: "clamp(40px, 5vw, 64px)", margin: 0, fontWeight: 500 }}>
                Nexovia <span style={{ color: "var(--nx-flow)" }}>Flow</span>
              </h1>
              <p style={{ marginTop: 20, fontSize: 17, lineHeight: 1.6, color: "var(--nx-700)", maxWidth: 520 }}>{fp.lead}</p>
              <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href={contactHref} className="nx-btn nx-btn--accent" style={{ background: "var(--nx-flow)" }}>
                  {t.cta.early}
                  <ArrowRight />
                </Link>
                <Link href={serviceHref} className="nx-btn nx-btn--ghost">
                  {lang === "TR" ? "Danışmanlığı incele" : "View consulting"}
                </Link>
              </div>
            </div>
            <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid var(--nx-200)", boxShadow: "0 24px 48px -24px rgba(0,0,0,0.12)" }}>
              <Image src={IMAGES.flowScreen1} alt="Nexovia Flow" width={900} height={560} priority style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          </div>
        </div>
      </section>

      <section data-nx-section style={{ padding: "64px 0", background: "#fff" }}>
        <div className="nx-container">
          <div className="nx-flow-feature-cards">
            {features.map((f) => (
              <article key={f.title} className="nx-flow-feature-card">
                <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 600 }}>{f.title}</h3>
                <p style={{ margin: 0, fontSize: 13, color: "var(--nx-600)", lineHeight: 1.5, flex: 1 }}>{f.body}</p>
                <span style={{ marginTop: 12, color: "var(--nx-flow)" }} aria-hidden>
                  <ArrowRight size={14} />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-nx-section style={{ padding: "96px 0", background: "var(--nx-50)" }}>
        <div className="nx-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} data-nx-collapse data-nx-cgap>
            <div>
              <div className="nx-eyebrow" style={{ color: "var(--nx-flow)" }}>
                {lang === "TR" ? "Danışmanlıkta etkin destek" : "Effective consulting support"}
              </div>
              <h2 className="nx-display" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", marginTop: 12, fontWeight: 500 }}>
                {lang === "TR" ? (
                  <>
                    Flow, Su Verimliliği Danışmanlığınızı uçtan uca{" "}
                    <span style={{ color: "var(--nx-flow)" }}>destekler</span>
                  </>
                ) : (
                  <>
                    Flow supports your water-efficiency consulting{" "}
                    <span style={{ color: "var(--nx-flow)" }}>end to end</span>
                  </>
                )}
              </h2>
              <p style={{ marginTop: 16, fontSize: 16, color: "var(--nx-600)", lineHeight: 1.6 }}>
                {lang === "TR"
                  ? "Saha ölçümünden raporlamaya kadar veri tek kaynakta toplanır; danışman ve tesis ekibi aynı görünümü kullanır."
                  : "From field measurement to reporting, data lives in one place; consultants and site teams share the same view."}
              </p>
              <Link href={serviceHref} className="nx-btn nx-btn--primary" style={{ marginTop: 24 }}>
                {t.services.water.title}
                <ArrowRight />
              </Link>
            </div>
            <FlowCycleDiagram lang={lang} />
          </div>
        </div>
      </section>

      <section data-nx-section style={{ padding: "96px 0", background: "#fff" }}>
        <div className="nx-container">
          <SectionHeader
            title={lang === "TR" ? "Flow'u nasıl kullanmaya başlarsınız?" : "How do you get started with Flow?"}
            intro={lang === "TR" ? "Beş adımlı kurulum ve devreye alma süreci." : "A five-step setup and go-live process."}
          />
          <ProcessSteps steps={steps} accentColor="var(--nx-flow)" />
        </div>
      </section>

      <section data-nx-section style={{ padding: "96px 0", background: "#fff" }}>
        <div className="nx-container">
          <SectionHeader eyebrow="FAQ" title={fp.faqTitle} />
          <div style={{ borderTop: "1px solid var(--nx-200)" }}>
            {faqs.map((faq, i) => (
              <details key={i} style={{ borderBottom: "1px solid var(--nx-200)", padding: "24px 0" }}>
                <summary style={{ cursor: "pointer", listStyle: "none", fontSize: 18, fontWeight: 600, color: "var(--nx-900)" }}>
                  {faq.q}
                </summary>
                <p style={{ marginTop: 12, fontSize: 15, color: "var(--nx-600)", lineHeight: 1.6, maxWidth: 780 }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTABand t={t} lang={lang} locale={locale} />
    </>
  );
}
