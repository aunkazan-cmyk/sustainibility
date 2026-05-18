// CTA band — ported verbatim from components.jsx. Prototype no-op anchors are
// wired to the real contact route via the registry.
import Link from "next/link";
import type { Strings } from "@/i18n/getDictionary";
import type { Locale } from "@/lib/site";
import { pathFor } from "@/lib/routes";
import { ArrowRight } from "./primitives";

export function CTABand({
  t,
  lang,
  locale,
  variant = "navy",
}: {
  t: Strings;
  lang: "TR" | "EN";
  locale: Locale;
  variant?: "navy" | "ink";
}) {
  const bg = variant === "navy" ? "var(--nx-navy)" : "var(--nx-ink)";
  const contactHref = pathFor("contact", locale);
  return (
    <section
      data-nx-section
      style={{
        background: bg,
        color: "#fff",
        padding: "88px 0",
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
        <div style={{ maxWidth: 640 }}>
          <div className="nx-eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>
            {lang === "TR" ? "Birlikte çalışalım" : "Let's work together"}
          </div>
          <h3
            className="nx-display"
            style={{
              fontSize: "clamp(32px, 3.8vw, 44px)",
              margin: "12px 0 0",
              color: "#fff",
            }}
          >
            {lang === "TR"
              ? "Süreçlerinizi ölçülebilir ve raporlanabilir hale getirelim."
              : "Make your processes measurable, monitorable, and reportable."}
          </h3>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href={contactHref} className="nx-btn nx-btn--accent">
            {t.cta.contact}
            <ArrowRight />
          </Link>
          <Link href={contactHref} className="nx-btn nx-btn--ghost-light">
            {lang === "TR" ? "Detaylı bilgi al" : "Learn more"}
          </Link>
        </div>
      </div>
    </section>
  );
}
