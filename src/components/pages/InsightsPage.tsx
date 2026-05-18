// Insights (İçgörüler) — ported from pages-secondary.jsx InsightsPage,
// Direction A only (every dir === "B" branch dropped, taking the A value;
// dirSectionBg → "#fff"; newsletter bg → var(--nx-navy)). The prototype's
// category `useState` chip row is extracted into the shared <FilterChips>
// island, fed server-built panels (one grid per category, index 0 = all).
// The featured card stays above the filter and always shows posts[0].
// Prototype no-op anchors → registry-driven <Link href={pathFor("insights")}>.
import Link from "next/link";
import type { Locale } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { pathFor, INSIGHT_ORDER, routeKeyForInsight } from "@/lib/routes";
import { insightArticle } from "@/i18n/insights-content";
import { PageHero } from "@/components/shared/PageHero";
import { FilterChips } from "@/components/pages/_filters/FilterChips";

export function InsightsPage({ locale }: { locale: Locale }) {
  const { t, lang } = getDictionary(locale);
  const ip = t.insightsPage;
  const contactHref = pathFor("contact", locale);

  const categories =
    lang === "TR"
      ? ["Tümü", "Mevzuat", "ESG", "ADR", "Su Verimliliği", "Sürdürülebilirlik"]
      : ["All", "Regulation", "ESG", "ADR", "Water Efficiency", "Sustainability"];

  const posts = INSIGHT_ORDER.map((id) => {
    const a = insightArticle(id, lang);
    return {
      tag: a.tag,
      type: a.type,
      date: a.date,
      title: a.title,
      excerpt: a.lead,
      href: pathFor(routeKeyForInsight(id), locale),
    };
  });

  const tagColor = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes("esg") || t.includes("sürdür") || t.includes("sustain"))
      return "var(--nx-sustain)";
    if (t.includes("adr")) return "var(--nx-adr)";
    return "var(--nx-flow)";
  };

  // Match prototype `tag` strings to the category labels. Category 0 = all.
  const matchesCategory = (tag: string, categoryIndex: number) => {
    if (categoryIndex === 0) return true;
    const x = tag.toLowerCase();
    switch (categoryIndex) {
      case 1: // Mevzuat / Regulation
        return x.includes("mevzuat") || x.includes("regulation");
      case 2: // ESG
        return x.includes("esg");
      case 3: // ADR
        return x.includes("adr");
      case 4: // Su Verimliliği / Water Efficiency
        return x.includes("su") || x.includes("water");
      case 5: // Sürdürülebilirlik / Sustainability
        return x.includes("sürdür") || x.includes("sustain");
      default:
        return false;
    }
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 24,
  } as const;

  const panels = categories.map((_, ci) => {
    const visible = posts.slice(1).filter((p) => matchesCategory(p.tag, ci));
    return (
      <section
        data-nx-section-b
        key={ci}
        style={{ padding: "40px 0 120px", background: "#fff" }}
      >
        <div className="nx-container">
          <div style={gridStyle} data-nx-collapse>
            {visible.map((p, i) => (
              <Link
                key={i}
                href={p.href}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: 24,
                  border: "1px solid var(--nx-200)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  transition: "transform .15s, box-shadow .15s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  <span style={{ color: tagColor(p.tag) }}>{p.tag}</span>
                  <span style={{ color: "var(--nx-400)" }}>{p.date}</span>
                </div>
                <h3
                  style={{
                    fontSize: 18,
                    margin: 0,
                    fontWeight: 700,
                    color: "var(--nx-900)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.35,
                    textWrap: "pretty",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    color: "var(--nx-600)",
                    lineHeight: 1.55,
                  }}
                >
                  {p.excerpt}
                </p>
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: 14,
                    borderTop: "1px solid var(--nx-150)",
                    fontSize: 12,
                    color: "var(--nx-500)",
                  }}
                >
                  {p.type}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  });

  return (
    <>
      <PageHero eyebrow={ip.eyebrow} title={ip.title} lead={ip.lead} />

      {/* Featured — always posts[0], above the filter */}
      <section style={{ padding: "72px 0 40px", background: "#fff" }}>
        <div className="nx-container">
          <Link
            href={posts[0].href}
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr",
              gap: 0,
              background: "#fff",
              borderRadius: 18,
              overflow: "hidden",
              border: "1px solid var(--nx-200)",
            }}
            data-nx-collapse
          >
            <div
              style={{
                background:
                  "linear-gradient(135deg, #001244 0%, #003a7a 60%, #00B8F1 130%)",
                minHeight: 340,
                position: "relative",
                display: "flex",
                alignItems: "flex-end",
                padding: 36,
              }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              <div style={{ position: "relative", color: "#fff" }}>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    padding: "5px 11px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.25)",
                  }}
                >
                  {ip.featuredLabel}
                </span>
              </div>
            </div>
            <div
              style={{
                padding: "40px 44px",
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  color: "var(--nx-500)",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                <span style={{ color: tagColor(posts[0].tag) }}>
                  {posts[0].tag}
                </span>
                <span>
                  {posts[0].date} · {posts[0].type}
                </span>
              </div>
              <h2
                className="nx-display"
                style={{
                  fontSize: 30,
                  fontWeight: 500,
                  color: "var(--nx-900)",
                  margin: 0,
                  letterSpacing: "-0.015em",
                  lineHeight: 1.25,
                }}
              >
                {posts[0].title}
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: 16,
                  color: "var(--nx-600)",
                  lineHeight: 1.6,
                }}
              >
                {posts[0].excerpt}
              </p>
              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--nx-accent)",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                {lang === "TR" ? "Yazıyı oku" : "Read the piece"}
                <svg width="14" height="14" viewBox="0 0 14 14">
                  <path
                    d="M3 7h8 M7 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Category filter + server-built post grids */}
      <FilterChips options={categories} panels={panels} />

      {/* Newsletter */}
      <section
        data-nx-section
        style={{
          padding: "80px 0",
          background: "var(--nx-navy)",
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
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(closest-side at 70% 50%, black, transparent)",
            WebkitMaskImage:
              "radial-gradient(closest-side at 70% 50%, black, transparent)",
          }}
        />
        <div
          className="nx-container"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 48,
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: 600 }}>
            <div
              className="nx-eyebrow"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              {ip.newsletterTitle}
            </div>
            <h3
              className="nx-display"
              style={{
                fontSize: "clamp(28px, 3.4vw, 40px)",
                margin: "12px 0 0",
                color: "#fff",
                fontWeight: 500,
              }}
            >
              {lang === "TR"
                ? "Ayda bir e-posta. Spam yok."
                : "One email a month. No spam."}
            </h3>
            <p
              style={{
                margin: "12px 0 0",
                color: "rgba(255,255,255,0.65)",
                maxWidth: 460,
                fontSize: 15,
              }}
            >
              {ip.newsletterBody}
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              type="email"
              placeholder={
                lang === "TR" ? "kurumsal@e-posta.com" : "you@company.com"
              }
              style={{
                padding: "13px 18px",
                fontSize: 14,
                borderRadius: 999,
                background: "rgba(255,255,255,0.06)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)",
                minWidth: 280,
                outline: "none",
                fontFamily: "inherit",
              }}
            />
            <Link href={contactHref} className="nx-btn nx-btn--accent">
              {lang === "TR" ? "Abone ol" : "Subscribe"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
