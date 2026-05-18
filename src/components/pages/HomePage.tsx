// Home — ported from direction-a.jsx HomeA. Hero variant locked to
// "typographic" (split/dashboard variants dropped with the tweaks panel).
// Prototype navigate() / no-op anchors → registry-driven <Link>.
import Link from "next/link";
import type { Locale } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { pathFor } from "@/lib/routes";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CTABand } from "@/components/shared/CTABand";
import { FlowDashboard } from "@/components/shared/FlowDashboard";
import { BrandIcon } from "@/components/shared/BrandIcon";
import { Hairline, NumberLabel, ArrowRight } from "@/components/shared/primitives";

export function HomePage({ locale }: { locale: Locale }) {
  const { t, lang } = getDictionary(locale);
  const flowHref = pathFor("flow", locale);
  const serviceHref = pathFor("waterService", locale);
  const contactHref = pathFor("contact", locale);
  const sectorsHref = pathFor("sectors", locale);
  const insightsHref = pathFor("insights", locale);

  const services = [
    {
      ...t.services.water,
      href: serviceHref,
      subBrand: "Nexovia Flow",
      subRole: lang === "TR" ? "destekleyici platform" : "supporting platform",
    },
    {
      ...t.services.sustain,
      href: null,
      subBrand: "Nexovia Sustainability",
      subRole: lang === "TR" ? "marka alanı" : "brand area",
    },
    {
      ...t.services.adr,
      href: null,
      subBrand: "Nexovia ADR",
      subRole: lang === "TR" ? "marka alanı" : "brand area",
    },
  ];

  return (
    <>
      {/* Hero — typographic */}
      <section
        data-nx-section
        style={{
          padding: "120px 0 96px",
          background: "linear-gradient(180deg, #fafaf7 0%, #fff 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 80,
            right: -120,
            fontSize: 480,
            fontFamily: "var(--nx-font-display)",
            fontWeight: 400,
            color: "var(--nx-100)",
            letterSpacing: "-0.06em",
            lineHeight: 1,
            pointerEvents: "none",
            opacity: 0.55,
          }}
        >
          N
        </div>
        <div className="nx-container" style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 32,
            }}
          >
            <Hairline color="var(--nx-300)" />
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--nx-500)",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              — {t.home.eyebrow}
            </span>
            <div style={{ flex: 1 }}>
              <Hairline color="var(--nx-300)" />
            </div>
          </div>
          <h1
            className="nx-display"
            style={{
              fontSize: "clamp(42px, 6.8vw, 92px)",
              margin: 0,
              color: "var(--nx-900)",
              fontWeight: 400,
              maxWidth: 1100,
            }}
          >
            {t.home.heroTitle.split(".")[0]}.{" "}
            <em style={{ fontStyle: "italic", color: "var(--nx-accent)" }}>
              {lang === "TR" ? "Ölçülebilir." : "Measurable."}
            </em>
          </h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: 64,
              marginTop: 64,
              alignItems: "end",
            }}
            data-nx-collapse data-nx-cgap
          >
            <p
              style={{
                fontSize: 20,
                lineHeight: 1.55,
                color: "var(--nx-700)",
                maxWidth: 620,
                margin: 0,
                textWrap: "pretty",
              }}
            >
              {t.home.heroLead}
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "flex-end",
                flexWrap: "wrap",
              }}
            >
              <Link href={flowHref} className="nx-btn nx-btn--primary">
                {t.cta.explore}
                <ArrowRight />
              </Link>
              <Link href={contactHref} className="nx-btn nx-btn--ghost">
                {t.cta.contact}
              </Link>
            </div>
          </div>
          <div
            style={{
              marginTop: 88,
              paddingTop: 32,
              borderTop: "1px solid var(--nx-200)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 40,
              }}
              data-nx-collapse-2 data-nx-cgap
            >
              {[
                {
                  k: "01",
                  v:
                    lang === "TR"
                      ? "Mevzuat odaklı yaklaşım"
                      : "Regulation-aware approach",
                },
                {
                  k: "02",
                  v:
                    lang === "TR"
                      ? "Ölçülebilir süreç yönetimi"
                      : "Measurable process management",
                },
                {
                  k: "03",
                  v:
                    lang === "TR"
                      ? "Sektörel çözüm kurgusu"
                      : "Sector-specific solutions",
                },
                {
                  k: "04",
                  v:
                    lang === "TR"
                      ? "Dijital altyapı entegrasyonu"
                      : "Digital infrastructure integration",
                },
              ].map((q) => (
                <div key={q.k}>
                  <NumberLabel n={q.k} />
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 15,
                      fontWeight: 500,
                      color: "var(--nx-800)",
                      lineHeight: 1.35,
                    }}
                  >
                    {q.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Nexovia */}
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
            <div data-nx-unstick style={{ position: "sticky", top: 100 }}>
              <div className="nx-eyebrow" style={{ color: "var(--nx-accent)" }}>
                {t.home.values.eyebrow}
              </div>
              <h2
                className="nx-display"
                style={{
                  fontSize: "clamp(32px, 4vw, 48px)",
                  margin: "16px 0 0",
                  color: "var(--nx-900)",
                  fontWeight: 400,
                }}
              >
                {t.home.values.title}
              </h2>
              <p
                style={{
                  marginTop: 20,
                  fontSize: 17,
                  color: "var(--nx-600)",
                  lineHeight: 1.6,
                }}
              >
                {t.home.values.intro}
              </p>
            </div>
            <div>
              {[
                {
                  n: "01",
                  title: lang === "TR" ? "Saha + dijital" : "Field + digital",
                  body:
                    lang === "TR"
                      ? "Tesiste ölçtüğümüzü, raporda da görürsünüz. Nexovia Flow ile ölçüm zinciri kopmaz."
                      : "What we measure in the field, you see in the report. With Nexovia Flow, the measurement chain stays unbroken.",
                },
                {
                  n: "02",
                  title: lang === "TR" ? "Mevzuat takibi" : "Regulation tracking",
                  body:
                    lang === "TR"
                      ? "ISO 46001, ADR, TMGD, ESG çerçeveleri — yorum değil, uygulama."
                      : "ISO 46001, ADR, TMGD, ESG frameworks — implementation, not interpretation.",
                },
                {
                  n: "03",
                  title:
                    lang === "TR" ? "Sektörel ekipler" : "Sector-aware teams",
                  body:
                    lang === "TR"
                      ? "Kimya tesisi ile otel zinciri aynı şekilde okunmaz. Her sektörde alan deneyimi olan ekipler."
                      : "A chemical site doesn't read like a hotel chain. Teams with field experience in your sector.",
                },
                {
                  n: "04",
                  title:
                    lang === "TR" ? "Raporlanabilir çıktı" : "Reportable output",
                  body:
                    lang === "TR"
                      ? "Her aşama bir teslimat. Her teslimat denetim-hazır."
                      : "Every phase has a deliverable. Every deliverable is audit-ready.",
                },
              ].map((v, i, arr) => (
                <div
                  key={v.n}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr",
                    gap: 32,
                    padding: "32px 0",
                    borderBottom:
                      i < arr.length - 1
                        ? "1px solid var(--nx-200)"
                        : "none",
                  }}
                >
                  <NumberLabel n={v.n} />
                  <div>
                    <h3
                      className="nx-display"
                      style={{
                        fontSize: 26,
                        margin: 0,
                        fontWeight: 500,
                        color: "var(--nx-900)",
                      }}
                    >
                      {v.title}
                    </h3>
                    <p
                      style={{
                        marginTop: 10,
                        fontSize: 16,
                        color: "var(--nx-600)",
                        lineHeight: 1.6,
                        textWrap: "pretty",
                      }}
                    >
                      {v.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Flow highlight */}
      <section
        data-nx-section
        style={{
          padding: "120px 0",
          background: "#0B1226",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at top right, rgba(0,184,241,0.15), transparent 60%)",
          }}
        />
        <div className="nx-container" style={{ position: "relative" }}>
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
              <div className="nx-eyebrow" style={{ color: "var(--nx-flow)" }}>
                — {t.home.flow.eyebrow}
              </div>
              <h2
                className="nx-display"
                style={{
                  fontSize: "clamp(32px, 4.2vw, 52px)",
                  color: "#fff",
                  fontWeight: 400,
                  margin: "16px 0 0",
                }}
              >
                {t.home.flow.title}
              </h2>
              <p
                style={{
                  marginTop: 22,
                  fontSize: 17.5,
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.65,
                  maxWidth: 480,
                }}
              >
                {t.home.flow.lead}
              </p>
              <ul
                style={{
                  marginTop: 28,
                  padding: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {[
                  lang === "TR"
                    ? "Tesis seviyesinde anlık tüketim takibi"
                    : "Real-time consumption tracking at site level",
                  lang === "TR"
                    ? "Eşik bazlı uyarılar ve olay kaydı"
                    : "Threshold-based alerts and event logs",
                  lang === "TR"
                    ? "Mevzuata uygun aylık ve yıllık raporlama"
                    : "Regulation-aligned monthly and yearly reports",
                ].map((f, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "center",
                      fontSize: 15,
                      color: "rgba(255,255,255,0.85)",
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "var(--nx-flow)",
                        flexShrink: 0,
                      }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <div
                style={{
                  marginTop: 36,
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
                  {t.cta.early}
                </Link>
                <Link href={flowHref} className="nx-btn nx-btn--ghost-light">
                  {lang === "TR" ? "Platformu incele" : "Explore the platform"}
                </Link>
              </div>
            </div>
            <FlowDashboard lang={lang} />
          </div>
        </div>
      </section>

      {/* Services */}
      <section data-nx-section style={{ padding: "120px 0", background: "#fff" }}>
        <div className="nx-container">
          <SectionHeader
            eyebrow={t.home.services.eyebrow}
            title={t.home.services.title}
            intro={t.home.services.intro}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 0,
              borderTop: "1px solid var(--nx-200)",
            }}
            data-nx-collapse
          >
            {services.map((s, i, arr) => {
              const inner = (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <BrandIcon kind={s.brand} size={48} />
                    <NumberLabel n={`0${i + 1}`} />
                  </div>
                  <div>
                    <h3
                      className="nx-display"
                      style={{
                        fontSize: 26,
                        fontWeight: 500,
                        color: "var(--nx-900)",
                        margin: 0,
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      style={{
                        marginTop: 12,
                        fontSize: 15,
                        color: "var(--nx-600)",
                        lineHeight: 1.6,
                      }}
                    >
                      {s.short}
                    </p>
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--nx-500)",
                      paddingTop: 14,
                      borderTop: "1px solid var(--nx-150)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <span>
                      <strong
                        style={{ color: "var(--nx-800)", fontWeight: 600 }}
                      >
                        {s.subBrand}
                      </strong>{" "}
                      · {s.subRole}
                    </span>
                  </div>
                  {s.href && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--nx-accent)",
                        marginTop: "auto",
                      }}
                    >
                      {lang === "TR" ? "Detayları gör" : "View details"}
                      <ArrowRight />
                    </div>
                  )}
                </>
              );
              const cellStyle = {
                padding: "40px 32px",
                borderRight:
                  i < arr.length - 1 ? "1px solid var(--nx-200)" : "none",
                borderBottom: "1px solid var(--nx-200)",
                display: "flex",
                flexDirection: "column" as const,
                gap: 20,
              };
              return s.href ? (
                <Link
                  key={i}
                  href={s.href}
                  className="nx-hover-soft"
                  style={cellStyle}
                >
                  {inner}
                </Link>
              ) : (
                <div key={i} style={cellStyle}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section data-nx-section style={{ padding: "120px 0", background: "#fafaf7" }}>
        <div className="nx-container">
          <SectionHeader
            eyebrow={t.home.sectors.eyebrow}
            title={t.home.sectors.title}
            intro={t.home.sectors.intro}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 1,
              background: "var(--nx-200)",
              border: "1px solid var(--nx-200)",
            }}
            data-nx-collapse-2
          >
            {t.sectors.map((s, i) => (
              <Link
                key={s}
                href={sectorsHref}
                className="nx-hover-tile"
                style={{
                  padding: "28px 22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <NumberLabel n={String(i + 1).padStart(2, "0")} />
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 16,
                      fontWeight: 500,
                      color: "var(--nx-900)",
                    }}
                  >
                    {s}
                  </div>
                </div>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  style={{ color: "var(--nx-400)" }}
                  aria-hidden="true"
                >
                  <path
                    d="M5 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Insights teaser */}
      <section data-nx-section style={{ padding: "120px 0", background: "#fff" }}>
        <div className="nx-container">
          <SectionHeader
            eyebrow={t.home.insights.eyebrow}
            title={t.home.insights.title}
            intro={t.home.insights.intro}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 32,
            }}
            data-nx-collapse
          >
            {[
              {
                tag: lang === "TR" ? "Mevzuat" : "Regulation",
                title:
                  lang === "TR"
                    ? "ISO 46001 hazırlığı: tesisler için bir başlangıç notu"
                    : "ISO 46001 readiness: a starting note for facilities",
                date: lang === "TR" ? "Mart 2026" : "Mar 2026",
                read: lang === "TR" ? "Rehber" : "Guide",
              },
              {
                tag: "ESG",
                title:
                  lang === "TR"
                    ? "ESG raporlamasında ölçüm zinciri neden önemli?"
                    : "Why the measurement chain matters in ESG reporting",
                date: lang === "TR" ? "Şubat 2026" : "Feb 2026",
                read: lang === "TR" ? "Makale" : "Article",
              },
              {
                tag: "ADR",
                title:
                  lang === "TR"
                    ? "TMGD denetim hazırlığı: 12 maddelik kontrol listesi"
                    : "TMGD inspection readiness: a 12-item checklist",
                date: lang === "TR" ? "Ocak 2026" : "Jan 2026",
                read: lang === "TR" ? "Rehber" : "Guide",
              },
            ].map((p, i) => (
              <Link
                key={i}
                href={insightsHref}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  paddingTop: 24,
                  borderTop: "1px solid var(--nx-300)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    color: "var(--nx-500)",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {p.tag}
                  </span>
                  <span>{p.date}</span>
                </div>
                <h3
                  className="nx-display"
                  style={{
                    fontSize: 22,
                    fontWeight: 500,
                    color: "var(--nx-900)",
                    margin: 0,
                    lineHeight: 1.3,
                    textWrap: "pretty",
                  }}
                >
                  {p.title}
                </h3>
                <div
                  style={{
                    marginTop: "auto",
                    fontSize: 13,
                    color: "var(--nx-accent)",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {p.read}
                  <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand t={t} lang={lang} locale={locale} variant="navy" />
    </>
  );
}
