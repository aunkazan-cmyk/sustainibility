import Image from "next/image";
import Link from "next/link";
import type { Strings } from "@/i18n/getDictionary";
import type { Locale } from "@/lib/site";
import { pathFor } from "@/lib/routes";
import { IMAGES } from "@/lib/images";
import { ArrowRight } from "./primitives";
import { IconChat, IconLeaf } from "./mockup-icons";

export function CTABand({
  t,
  lang,
  locale,
  variant = "water",
  title,
  subtitle,
  buttonLabel,
}: {
  t: Strings;
  lang: "TR" | "EN";
  locale: Locale;
  variant?: "water" | "sustain" | "energy";
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
}) {
  const contactHref = pathFor("contact", locale);
  const resolvedTitle =
    title ??
    (lang === "TR"
      ? "İhtiyacınıza uygun çözümü birlikte planlayalım."
      : "Let's plan the right solution for your needs together.");
  const resolvedSubtitle =
    subtitle ??
    (lang === "TR"
      ? "Uzman ekibimizle görüşmek için iletişime geçin."
      : "Contact us to speak with our specialist team.");

  const accent =
    variant === "sustain"
      ? "var(--nx-sustain-bright)"
      : variant === "energy"
        ? "var(--nx-energy-bright)"
        : "var(--nx-flow)";

  return (
    <section
      className={`nx-cta-band nx-cta-band--${variant}`}
      data-nx-section
    >
      {variant !== "energy" && (
        <div className="nx-cta-band__bg" aria-hidden>
          <Image
            src={variant === "sustain" ? IMAGES.sustainCta : IMAGES.waterCta}
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <div className="nx-cta-band__overlay" aria-hidden />
      <div className="nx-container nx-cta-band__inner">
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start", maxWidth: 640 }}>
          <span
            style={{
              color: accent,
              flexShrink: 0,
              marginTop: 4,
            }}
          >
            {variant === "sustain" ? <IconLeaf /> : <IconChat />}
          </span>
          <div>
            <h3
              className="nx-display"
              style={{ fontSize: "clamp(24px, 3vw, 32px)", margin: 0, fontWeight: 500 }}
            >
              {resolvedTitle}
            </h3>
            <p style={{ margin: "10px 0 0", fontSize: 15, opacity: 0.85, lineHeight: 1.5 }}>
              {resolvedSubtitle}
            </p>
          </div>
        </div>
        <Link href={contactHref} className="nx-btn nx-btn--white">
          {buttonLabel ?? t.cta.contact}
          <ArrowRight />
        </Link>
      </div>
    </section>
  );
}

