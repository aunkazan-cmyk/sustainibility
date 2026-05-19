// Contact — ported from pages-secondary.jsx ContactPage (Direction A forced).
// The interactive form is the ContactForm client island; the hero + details
// sidebar + map placeholder are static server markup.
import type { Locale } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { createMathChallenge } from "@/lib/contact-captcha";

export function ContactPage({ locale }: { locale: Locale }) {
  const { t, lang } = getDictionary(locale);
  const cp = t.contactPage;
  const captcha = createMathChallenge();

  return (
    <>
      <PageHero eyebrow={cp.eyebrow} title={cp.title} lead={cp.lead} />

      <section data-nx-section style={{ padding: "96px 0 120px", background: "#fff" }}>
        <div className="nx-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: 64,
              alignItems: "start",
            }}
            data-nx-collapse data-nx-cgap
          >
            <ContactForm locale={locale} captcha={captcha} />

            {/* Details */}
            <div>
              <div className="nx-eyebrow" style={{ color: "var(--nx-accent)" }}>
                {cp.detailsTitle}
              </div>
              <h3
                className="nx-display"
                style={{
                  fontSize: 28,
                  margin: "16px 0 0",
                  fontWeight: 500,
                  color: "var(--nx-900)",
                }}
              >
                {lang === "TR"
                  ? "Üç farklı pratik. Tek bir iletişim noktası."
                  : "Three practices. One point of contact."}
              </h3>
              <div
                style={{
                  marginTop: 28,
                  display: "flex",
                  flexDirection: "column",
                  gap: 22,
                }}
              >
                {[
                  {
                    icon: "@",
                    label:
                      lang === "TR" ? "Genel talep" : "General inquiries",
                    value: "talep@nexovia.com.tr",
                  },
                  {
                    icon: "✆",
                    label:
                      lang === "TR" ? "Çalışma saatleri" : "Working hours",
                    value:
                      lang === "TR"
                        ? "Pzt–Cum · 09:00–18:00 (GMT+3)"
                        : "Mon–Fri · 09:00–18:00 (GMT+3)",
                  },
                  {
                    icon: "↗",
                    label:
                      lang === "TR"
                        ? "Erken erişim talebi"
                        : "Early access — Flow",
                    value: "flow@nexovia.com.tr",
                  },
                  {
                    icon: "⊕",
                    label:
                      lang === "TR"
                        ? "Eğitim başvuruları"
                        : "Training applications",
                    value: "egitim@nexovia.com.tr",
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      paddingBottom: 22,
                      borderBottom: "1px solid var(--nx-200)",
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 10,
                        background: "var(--nx-accent-soft)",
                        color: "var(--nx-accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                        fontWeight: 700,
                      }}
                    >
                      {row.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "var(--nx-500)",
                          marginBottom: 3,
                        }}
                      >
                        {row.label}
                      </div>
                      <div
                        style={{
                          fontSize: 15,
                          color: "var(--nx-900)",
                          fontWeight: 600,
                        }}
                      >
                        {row.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 32,
                  padding: 24,
                  background: "var(--nx-accent-soft)",
                  border:
                    "1px solid color-mix(in oklab, var(--nx-accent) 20%, transparent)",
                  borderRadius: 14,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--nx-accent)",
                  }}
                >
                  {lang === "TR" ? "Yer tutucu" : "Placeholder"}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 14,
                    color: "var(--nx-800)",
                    lineHeight: 1.5,
                  }}
                >
                  {lang === "TR"
                    ? "Bu prototipte gerçek adres ve harita gösterilmiyor. Ofis bilgisi sağlandığında bu bölge harita ile değiştirilecek."
                    : "Real address and map are not shown in this prototype. This area will be replaced with a map once office details are provided."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
