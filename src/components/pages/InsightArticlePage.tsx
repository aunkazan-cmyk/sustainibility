// Insight article — editorial detail page for a single insight. Server
// component. Cover SVGs live in /public/insights (next.config images
// unoptimized), so next/image is passed concrete intrinsic sizes.
import Image from "next/image";
import type { Locale } from "@/lib/site";
import type { InsightId } from "@/lib/routes";
import { getDictionary } from "@/i18n/getDictionary";
import { pathFor } from "@/lib/routes";
import { insightArticle } from "@/i18n/insights-content";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { CTABand } from "@/components/shared/CTABand";

export function InsightArticlePage({
  locale,
  insightId,
}: {
  locale: Locale;
  insightId: InsightId;
}) {
  const { t, lang } = getDictionary(locale);
  const a = insightArticle(insightId, lang);

  return (
    <>
      {/* Hero — breadcrumb, meta row, title, lead, cover */}
      <section data-nx-section style={{ padding: "96px 0 72px", background: "#fafaf7" }}>
        <div className="nx-container">
          <Breadcrumb
            items={[
              {
                name: lang === "TR" ? "Anasayfa" : "Home",
                href: pathFor("home", locale),
              },
              { name: t.nav.insights, href: pathFor("insights", locale) },
              { name: a.title },
            ]}
          />
          <div
            style={{
              marginTop: 28,
              fontSize: 12,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "var(--nx-500)",
            }}
          >
            {a.tag} · {a.type} · {a.date}
          </div>
          <h1
            className="nx-display"
            style={{
              fontSize: "clamp(36px, 5.4vw, 64px)",
              margin: "16px 0 0",
              fontWeight: 400,
              color: "var(--nx-900)",
              letterSpacing: "-0.02em",
              maxWidth: 900,
            }}
          >
            {a.title}
          </h1>
          <p
            style={{
              marginTop: 24,
              marginBottom: 0,
              fontSize: 19,
              lineHeight: 1.55,
              color: "var(--nx-700)",
              maxWidth: 760,
              textWrap: "pretty",
            }}
          >
            {a.lead}
          </p>
          <Image
            src={a.image}
            alt={a.title}
            width={1200}
            height={630}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 14,
              marginTop: 32,
            }}
          />
        </div>
      </section>

      {/* Body — centered editorial column */}
      <section data-nx-section style={{ padding: "96px 0", background: "#fff" }}>
        <div className="nx-container">
          <article style={{ maxWidth: 760, margin: "0 auto" }}>
            {a.sections.map((section) => (
              <div key={section.h} style={{ marginBottom: 48 }}>
                <h2
                  className="nx-display"
                  style={{
                    fontSize: 26,
                    margin: "0 0 16px",
                    fontWeight: 500,
                    color: "var(--nx-navy)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {section.h}
                </h2>
                {section.p.map((para, i) => (
                  <p
                    key={i}
                    style={{
                      margin: i === 0 ? 0 : "16px 0 0",
                      fontSize: 17,
                      lineHeight: 1.7,
                      color: "var(--nx-600)",
                      textWrap: "pretty",
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            ))}

            {/* References */}
            <div
              style={{
                marginTop: 56,
                paddingTop: 32,
                borderTop: "1px solid var(--nx-200)",
              }}
            >
              <h2
                className="nx-display"
                style={{
                  fontSize: 20,
                  margin: "0 0 16px",
                  fontWeight: 500,
                  color: "var(--nx-900)",
                }}
              >
                {lang === "TR" ? "Kaynaklar" : "References"}
              </h2>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 20,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "var(--nx-500)",
                }}
              >
                {a.references.map((ref) => (
                  <li key={ref}>{ref}</li>
                ))}
              </ul>
              <p
                style={{
                  marginTop: 20,
                  marginBottom: 0,
                  fontSize: 13,
                  color: "var(--nx-400)",
                }}
              >
                {lang === "TR"
                  ? "Bu yazı genel bilgilendirme amaçlıdır."
                  : "This article is for general information."}
              </p>
            </div>
          </article>
        </div>
      </section>

      <CTABand t={t} lang={lang} locale={locale} />
    </>
  );
}
