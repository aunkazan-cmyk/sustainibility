// Trainings — Direction A. Per request, the sample training catalogue +
// format filter are replaced with an honest empty state ("no active
// material yet, check back later"); the hero, application process and CTA
// remain so the page still explains how programs work.
import Link from "next/link";
import type { Locale } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { pathFor } from "@/lib/routes";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CTABand } from "@/components/shared/CTABand";
import { ArrowRight } from "@/components/shared/primitives";

export function TrainingsPage({ locale }: { locale: Locale }) {
  const { t, lang } = getDictionary(locale);
  const tp = t.trainingsPage;
  const contactHref = pathFor("contact", locale);

  return (
    <>
      <PageHero eyebrow={tp.eyebrow} title={tp.title} lead={tp.lead} />

      {/* Empty state — no active educational material yet */}
      <section data-nx-section style={{ padding: "80px 0", background: "#fff" }}>
        <div className="nx-container">
          <div
            style={{
              maxWidth: 720,
              margin: "0 auto",
              textAlign: "center",
              border: "1px solid var(--nx-200)",
              borderRadius: 18,
              padding: "64px 40px",
              background: "var(--nx-50)",
            }}
          >
            <div
              aria-hidden
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                margin: "0 auto",
                background: "var(--nx-accent-soft)",
                color: "var(--nx-accent-deep)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 7v5l3 2" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>
            <h2
              className="nx-display"
              style={{
                fontSize: "clamp(26px, 3.4vw, 38px)",
                fontWeight: 400,
                color: "var(--nx-900)",
                margin: "24px 0 0",
              }}
            >
              {lang === "TR"
                ? "Şu anda aktif eğitim içeriğimiz bulunmuyor."
                : "We don't have active educational material yet."}
            </h2>
            <p
              style={{
                marginTop: 14,
                fontSize: 17,
                color: "var(--nx-600)",
                lineHeight: 1.6,
                maxWidth: 520,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {lang === "TR"
                ? "Yeni programlar yayınlandığında bu sayfada listelenecek. Lütfen daha sonra tekrar göz atın."
                : "New programs will be listed here once published. Please check back later."}
            </p>
            <div
              style={{
                marginTop: 28,
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link href={contactHref} className="nx-btn nx-btn--accent">
                {lang === "TR"
                  ? "Kurumsal eğitim talebi"
                  : "Request in-house training"}
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Application process */}
      <section data-nx-section style={{ padding: "96px 0", background: "#fafaf7" }}>
        <div className="nx-container">
          <SectionHeader
            eyebrow={lang === "TR" ? "Süreç" : "Process"}
            title={tp.processTitle}
            intro={tp.processIntro}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
            }}
            data-nx-collapse-2
          >
            {[
              {
                n: "01",
                t: lang === "TR" ? "Başvuru formu" : "Application form",
                b:
                  lang === "TR"
                    ? "Eğitim sayfasından başvuru gönderin."
                    : "Submit via the training page.",
              },
              {
                n: "02",
                t: lang === "TR" ? "Ön görüşme" : "Brief intake call",
                b:
                  lang === "TR"
                    ? "En az 3 iş günü içinde dönüş yaparız."
                    : "We reply within at least 3 business days.",
              },
              {
                n: "03",
                t: lang === "TR" ? "Kayıt onayı" : "Confirmation",
                b:
                  lang === "TR"
                    ? "Program detayları ve hazırlık materyali."
                    : "Program details and prep materials.",
              },
              {
                n: "04",
                t:
                  lang === "TR"
                    ? "Eğitim & sertifika"
                    : "Training & certificate",
                b:
                  lang === "TR"
                    ? "Tamamlandığında sertifika teslim edilir."
                    : "Certificate issued upon completion.",
              },
            ].map((s) => (
              <div
                key={s.n}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: 24,
                  border: "1px solid var(--nx-200)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <span
                  className="nx-mono"
                  style={{
                    fontSize: 11,
                    color: "var(--nx-accent)",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                  }}
                >
                  STEP {s.n}
                </span>
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: "var(--nx-900)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {s.t}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "var(--nx-600)",
                    lineHeight: 1.55,
                  }}
                >
                  {s.b}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand t={t} lang={lang} locale={locale} variant="navy" />
    </>
  );
}
