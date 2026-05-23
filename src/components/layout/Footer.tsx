// Footer — dark surface, registry links, social placeholders, mockup-aligned columns.
import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/site";
import { ORG_EMAIL } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { pathFor, type PageKey, type LegalDocId } from "@/lib/routes";
import { legalTitle } from "@/lib/legal-content";
import { CookiePreferencesLink } from "@/components/analytics/CookiePreferencesLink";

type FooterLink = { label: string; key?: PageKey };

export function Footer({ locale }: { locale: Locale }) {
  const { t, lang } = getDictionary(locale);

  const legal: { id: LegalDocId; key: PageKey }[] = [
    { id: "kvkk", key: "legalKvkk" },
    { id: "privacy", key: "legalPrivacy" },
    { id: "cookie", key: "legalCookie" },
    { id: "terms", key: "legalTerms" },
    { id: "formNotice", key: "legalFormNotice" },
  ];

  const cols: { title: string; links: FooterLink[] }[] = [
    {
      title: t.nav.platform,
      links: [
        { label: "Nexovia Flow", key: "flow" },
        { label: "Nexovia ADR", key: "adr" },
      ],
    },
    {
      title: t.nav.services,
      links: [
        { label: t.services.water.title, key: "waterService" },
        { label: t.sustainabilityPage.title, key: "sustainabilityService" },
      ],
    },
    {
      title: lang === "TR" ? "Kurumsal" : "Company",
      links: [
        { label: t.nav.about, key: "about" },
        { label: t.nav.contact, key: "contact" },
      ],
    },
    {
      title: lang === "TR" ? "Kaynaklar" : "Resources",
      links: [
        { label: t.nav.insights, key: "insights" },
        { label: t.nav.trainings, key: "trainings" },
        { label: t.nav.sectors, key: "sectors" },
      ],
    },
    {
      title: lang === "TR" ? "Yasal" : "Legal",
      links: legal.map((l) => ({
        label: legalTitle(l.id, lang),
        key: l.key,
      })),
    },
  ];

  const taglineItems =
    lang === "TR"
      ? ["Mevzuat odaklı", "Ölçülebilir süreçler", "Saha + dijital"]
      : ["Regulation-aware", "Measurable processes", "Field + digital"];

  return (
    <footer
      style={{
        background: "var(--nx-ink)",
        color: "rgba(255,255,255,0.78)",
        padding: "80px 0 32px",
      }}
    >
      <div className="nx-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr repeat(5, 1fr)",
            gap: 40,
            marginBottom: 48,
          }}
          data-nx-collapse-2
        >
          <div>
            <Image
              src="/logos/optimized/nexovia-logo-footer.png"
              alt="Nexovia"
              width={437}
              height={120}
              style={{ height: 34, width: "auto" }}
            />
            <p
              style={{
                marginTop: 18,
                fontSize: 14,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.6)",
                maxWidth: 280,
              }}
            >
              {lang === "TR"
                ? "Su verimliliği, sürdürülebilirlik ve ADR/TMGD danışmanlığı. Ölçülebilir süreçler, mevzuat odaklı yaklaşım."
                : "Water efficiency, sustainability and ADR/TMGD consulting. Measurable processes, regulation-aware approach."}
            </p>
            <nav className="nx-footer-social" aria-label={lang === "TR" ? "Sosyal medya" : "Social media"}>
              <a href="#" aria-label="LinkedIn">
                in
              </a>
              <a href="#" aria-label="YouTube">
                YT
              </a>
              <a href={`mailto:${ORG_EMAIL}`} aria-label="E-posta">
                @
              </a>
            </nav>
            <p style={{ marginTop: 20, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
              <a href={`mailto:${ORG_EMAIL}`} style={{ color: "inherit" }}>
                {ORG_EMAIL}
              </a>
              <br />
              <span style={{ marginTop: 4, display: "inline-block" }}>nexovia.com.tr</span>
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: 18,
                  fontWeight: 600,
                }}
              >
                {c.title}
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {c.links.map((l) => (
                  <li key={l.label}>
                    {l.key ? (
                      <Link
                        href={pathFor(l.key, locale)}
                        style={{ fontSize: 14, color: "rgba(255,255,255,0.78)" }}
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>{l.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="nx-footer-tagline">
          <span>Nexovia</span>
          <span>{taglineItems.join(" · ")}</span>
        </div>
        <div
          style={{
            marginTop: 20,
            paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 13,
            color: "rgba(255,255,255,0.5)",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            © 2026 Nexovia — {lang === "TR" ? "Tüm hakları saklıdır" : "All rights reserved"}.
            {" · "}
            <CookiePreferencesLink locale={locale} />
          </div>
          <span>nexovia.com.tr</span>
        </div>
      </div>
    </footer>
  );
}
