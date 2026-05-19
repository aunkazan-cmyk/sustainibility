// Sectors — ported from pages-secondary.jsx SectorsPage. Direction A locked
// (the dir === "B" branches dropped). Prototype no-op anchors with JS hover
// → registry-driven <Link> + CSS .nx-hover-lift. aff()/challenge() verbatim.
import Link from "next/link";
import type { Locale } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { pathFor } from "@/lib/routes";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CTABand } from "@/components/shared/CTABand";
import { BrandIcon } from "@/components/shared/BrandIcon";
import { SectorIcon } from "@/components/shared/SectorIcon";
import { ArrowRight } from "@/components/shared/primitives";
import { sectorDetail } from "@/i18n/sectors-content";

export function SectorsPage({ locale }: { locale: Locale }) {
  const { t, lang } = getDictionary(locale);
  const sp = t.sectorsPage;
  const sectors = t.sectors;
  const contactHref = pathFor("contact", locale);

  // Sector → brand area affinity for icon coloring
  const aff = (s: string) => {
    const x = s.toLowerCase();
    if (x.includes("lojistik") || x.includes("logistic")) return "adr";
    if (
      x.includes("kimya") ||
      x.includes("chemic") ||
      x.includes("enerji") ||
      x.includes("energy")
    )
      return "adr";
    if (
      x.includes("belediye") ||
      x.includes("municip") ||
      x.includes("üniversite") ||
      x.includes("universit") ||
      x.includes("hotel") ||
      x.includes("otel") ||
      x.includes("hastane") ||
      x.includes("hospital")
    )
      return "sustain";
    return "flow";
  };
  const challenge = (s: string) => {
    const detail = sectorDetail(s, lang);
    if (detail) return detail;
    const x = s.toLowerCase();
    if (x.includes("kimya") || x.includes("chemic"))
      return lang === "TR"
        ? "ADR uyumu + su tüketim yoğunluğu"
        : "ADR compliance + water intensity";
    if (x.includes("gıda") || x.includes("food"))
      return lang === "TR"
        ? "Su verimliliği + sürdürülebilirlik raporlaması"
        : "Water efficiency + ESG reporting";
    if (x.includes("tekstil") || x.includes("textile"))
      return lang === "TR"
        ? "Atık su + ESG izleme"
        : "Wastewater + ESG monitoring";
    if (x.includes("lojistik") || x.includes("logistic"))
      return lang === "TR"
        ? "ADR / TMGD operasyonel uyum"
        : "ADR / TMGD operational compliance";
    if (x.includes("enerji") || x.includes("energy"))
      return lang === "TR"
        ? "Tehlikeli madde + emisyon raporlaması"
        : "Dangerous goods + emissions reporting";
    if (x.includes("osb"))
      return lang === "TR"
        ? "Çok tesisli izleme ve raporlama"
        : "Multi-site monitoring and reporting";
    if (x.includes("belediye") || x.includes("municip"))
      return lang === "TR"
        ? "ESG + büyük yerleşke izleme"
        : "ESG + large-area monitoring";
    if (x.includes("üniversite") || x.includes("universit"))
      return lang === "TR"
        ? "Kampüs su yönetimi + ESG"
        : "Campus water management + ESG";
    if (x.includes("hotel") || x.includes("otel"))
      return lang === "TR"
        ? "Su verimliliği + sürdürülebilirlik"
        : "Water efficiency + sustainability";
    if (x.includes("hastane") || x.includes("hospital"))
      return lang === "TR"
        ? "Tıbbi atık + su yönetimi"
        : "Medical waste + water management";
    if (x.includes("büyük yer") || x.includes("large camp"))
      return lang === "TR" ? "Çok-noktalı izleme" : "Multi-point monitoring";
    if (x.includes("üretim") || x.includes("manufac"))
      return lang === "TR" ? "Su + ESG + uyum" : "Water + ESG + compliance";
    return lang === "TR"
      ? "Sektörel uyum çerçevesi"
      : "Sector compliance framework";
  };

  const approach = [
    {
      k: "flow",
      title:
        lang === "TR" ? "Su yoğun sektörler" : "Water-intensive sectors",
      sectors:
        lang === "TR"
          ? "Kimya · Gıda · Tekstil · Üretim"
          : "Chemicals · Food · Textile · Manufacturing",
      body:
        lang === "TR"
          ? "Su Verimliliği Danışmanlığı + Nexovia Flow ile sürekli ölçüm-raporlama."
          : "Water Efficiency Consulting + Nexovia Flow for continuous measurement-reporting.",
    },
    {
      k: "sustain",
      title: lang === "TR" ? "Geniş yerleşkeler" : "Large campuses",
      sectors:
        lang === "TR"
          ? "OSB · Belediyeler · Üniversiteler · Oteller · Hastaneler"
          : "Industrial zones · Municipalities · Universities · Hotels · Hospitals",
      body:
        lang === "TR"
          ? "Sürdürülebilirlik stratejisi, ESG raporlama, çok tesisli izleme."
          : "Sustainability strategy, ESG reporting, multi-site monitoring.",
    },
    {
      k: "adr",
      title:
        lang === "TR"
          ? "Tehlikeli madde yoğun sektörler"
          : "Dangerous-goods-intensive sectors",
      sectors:
        lang === "TR"
          ? "Lojistik · Enerji · Depolama"
          : "Logistics · Energy · Storage",
      body:
        lang === "TR"
          ? "ADR/TMGD uyumu, dokümantasyon kontrolü, denetim hazırlığı."
          : "ADR/TMGD compliance, documentation control, inspection prep.",
    },
  ];

  return (
    <>
      <PageHero eyebrow={sp.eyebrow} title={sp.title} lead={sp.lead} />

      {/* Sector grid */}
      <section data-nx-section style={{ padding: "80px 0", background: "#fff" }}>
        <div className="nx-container">
          <SectionHeader
            eyebrow={lang === "TR" ? "Sektör seçimi" : "Sector picker"}
            title={sp.pickTitle}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 14,
            }}
            data-nx-collapse-2
          >
            {sectors.map((s, i) => (
              <Link
                key={s}
                href={contactHref}
                className="nx-hover-lift"
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  border: "1px solid var(--nx-200)",
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <SectorIcon name={s} kind={aff(s)} size={40} />
                  <span
                    className="nx-mono"
                    style={{ fontSize: 11, color: "var(--nx-400)" }}
                  >
                    S/{String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                      color: "var(--nx-900)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {s}
                  </div>
                  <div
                    style={{
                      fontSize: 12.5,
                      color: "var(--nx-500)",
                      marginTop: 6,
                      lineHeight: 1.45,
                    }}
                  >
                    {challenge(s)}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: 14,
                    borderTop: "1px solid var(--nx-150)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--nx-accent)",
                  }}
                >
                  {lang === "TR" ? "Yaklaşımımız" : "Our approach"}
                  <ArrowRight strokeWidth={1.8} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section data-nx-section style={{ padding: "120px 0", background: "#fafaf7" }}>
        <div className="nx-container">
          <SectionHeader
            eyebrow={lang === "TR" ? "Çerçeve" : "Framework"}
            title={sp.approachTitle}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}
            data-nx-collapse
          >
            {approach.map((b) => (
              <div
                key={b.k}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: 28,
                  border: "1px solid var(--nx-200)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <BrandIcon kind={b.k} size={48} />
                <div>
                  <h3
                    style={{
                      fontSize: 20,
                      margin: 0,
                      fontWeight: 700,
                      color: "var(--nx-900)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {b.title}
                  </h3>
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 12.5,
                      color: "var(--nx-500)",
                    }}
                  >
                    {b.sectors}
                  </div>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14.5,
                    color: "var(--nx-600)",
                    lineHeight: 1.6,
                  }}
                >
                  {b.body}
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
