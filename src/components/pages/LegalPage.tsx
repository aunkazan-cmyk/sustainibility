// Legal page — NOT in the prototype. An on-brand, sober editorial template
// (shared PageHero + a single centered prose column). The body is full
// standard-practice legal text from lib/legal-content.ts. Derivable fields
// (e.g. email) are filled from LEGAL_FILL; remaining company-specific
// [BRACKET] tokens render as a neutral "———" marker until the owner fills
// them in. (No on-page warning banner — removed per request.)
import { Fragment } from "react";
import type { Locale } from "@/lib/site";
import type { LegalDocId } from "@/lib/routes";
import { getDictionary } from "@/i18n/getDictionary";
import { legalDoc, LEGAL_FILL } from "@/lib/legal-content";
import { PageHero } from "@/components/shared/PageHero";

const BRACKET = /(\[[^\]]+\])/g;

// Split a paragraph on [BRACKET] tokens. Tokens with a safe example value
// (LEGAL_FILL, e.g. kvkk@nexovia.com.tr) are filled in plainly; unknown
// company-specific tokens render as a neutral "———" marker (raw field name
// kept only in the title tooltip) until the owner provides the data.
function renderText(text: string) {
  return text.split(BRACKET).map((part, i) => {
    if (!(part.startsWith("[") && part.endsWith("]"))) {
      return <Fragment key={i}>{part}</Fragment>;
    }
    const filled = LEGAL_FILL[part];
    if (filled) return <Fragment key={i}>{filled}</Fragment>;
    return (
      <span
        key={i}
        title={part}
        style={{
          display: "inline-block",
          minWidth: 56,
          textAlign: "center",
          background: "rgba(148,163,184,0.18)",
          color: "var(--nx-500)",
          padding: "0 6px",
          borderRadius: 4,
          fontSize: "0.85em",
          letterSpacing: "0.04em",
        }}
      >
        ———
      </span>
    );
  });
}

export function LegalPage({
  locale,
  docId,
}: {
  locale: Locale;
  docId: LegalDocId;
}) {
  const { lang } = getDictionary(locale);
  const { title, lead, sections } = legalDoc(docId, lang);

  return (
    <>
      <PageHero
        eyebrow={lang === "TR" ? "Yasal" : "Legal"}
        title={title}
        lead={lead}
      />

      <section data-nx-section style={{ padding: "80px 0 120px", background: "#fff" }}>
        <div className="nx-container">
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            {/* Sections — heading + body (paragraphs / bullet runs) */}
            {sections.map((section, si) => {
              const blocks: React.ReactNode[] = [];
              let bullets: string[] = [];
              const flush = (key: string) => {
                if (!bullets.length) return;
                blocks.push(
                  <ul
                    key={key}
                    style={{
                      margin: "12px 0 0",
                      paddingLeft: 22,
                      display: "flex",
                      flexDirection: "column",
                      gap: 7,
                    }}
                  >
                    {bullets.map((b, bi) => (
                      <li
                        key={bi}
                        style={{
                          fontSize: 15.5,
                          color: "var(--nx-600)",
                          lineHeight: 1.65,
                        }}
                      >
                        {renderText(b.replace(/^- /, ""))}
                      </li>
                    ))}
                  </ul>,
                );
                bullets = [];
              };
              section.body.forEach((line, li) => {
                if (line.startsWith("- ")) {
                  bullets.push(line);
                } else {
                  flush(`ul-${si}-${li}`);
                  blocks.push(
                    <p
                      key={`p-${si}-${li}`}
                      style={{
                        margin: "14px 0 0",
                        fontSize: 16,
                        color: "var(--nx-600)",
                        lineHeight: 1.75,
                        textWrap: "pretty",
                      }}
                    >
                      {renderText(line)}
                    </p>,
                  );
                }
              });
              flush(`ul-${si}-end`);

              return (
                <div
                  key={section.h}
                  style={{ marginTop: si === 0 ? 0 : 48 }}
                >
                  <h2
                    className="nx-display"
                    style={{
                      fontSize: "clamp(22px, 2.6vw, 30px)",
                      margin: 0,
                      fontWeight: 500,
                      color: "var(--nx-900)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {section.h}
                  </h2>
                  {blocks}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
