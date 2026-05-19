import Image from "next/image";
import Link from "next/link";
import type { Strings } from "@/i18n/getDictionary";
import type { Locale } from "@/lib/site";
import { pathFor } from "@/lib/routes";
import { IMAGES } from "@/lib/images";
import { ArrowRight } from "./primitives";
import { IconChat } from "./mockup-icons";

export function CTABand({
  t,
  lang,
  locale,
  variant = "water",
}: {
  t: Strings;
  lang: "TR" | "EN";
  locale: Locale;
  variant?: "water" | "sustain";
}) {
  const contactHref = pathFor("contact", locale);
  const title =
    lang === "TR"
      ? "İhtiyacınıza uygun çözümü birlikte planlayalım."
      : "Let's plan the right solution for your needs together.";
  const subtitle =
    lang === "TR"
      ? "Uzman ekibimizle görüşmek için iletişime geçin."
      : "Contact us to speak with our specialist team.";

  return (
    <section
      className={`nx-cta-band nx-cta-band--${variant}`}
      data-nx-section
    >
      <div className="nx-cta-band__bg" aria-hidden>
        <Image
          src={IMAGES.waterCta}
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="nx-cta-band__overlay" aria-hidden />
      <div className="nx-container nx-cta-band__inner">
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start", maxWidth: 640 }}>
          <span
            style={{
              color: variant === "sustain" ? "var(--nx-sustain-bright)" : "var(--nx-flow)",
              flexShrink: 0,
              marginTop: 4,
            }}
          >
            <IconChat />
          </span>
          <div>
            <h3
              className="nx-display"
              style={{ fontSize: "clamp(24px, 3vw, 32px)", margin: 0, fontWeight: 500 }}
            >
              {title}
            </h3>
            <p style={{ margin: "10px 0 0", fontSize: 15, opacity: 0.85, lineHeight: 1.5 }}>
              {subtitle}
            </p>
          </div>
        </div>
        <Link href={contactHref} className="nx-btn nx-btn--white">
          {t.cta.contact}
          <ArrowRight />
        </Link>
      </div>
    </section>
  );
}

