// Mobile-only sticky contact CTA (project_docs requirement). Pure CSS
// visibility (.nx-sticky-cta) — no client JS.
import Link from "next/link";
import type { Locale } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { pathFor } from "@/lib/routes";
import { ArrowRight } from "@/components/shared/primitives";

export function StickyContactCta({ locale }: { locale: Locale }) {
  const { t } = getDictionary(locale);
  return (
    <div className="nx-sticky-cta">
      <Link
        href={pathFor("contact", locale)}
        className="nx-btn nx-btn--accent"
        style={{ flex: 1, justifyContent: "center" }}
      >
        {t.cta.contact}
        <ArrowRight strokeWidth={1.8} />
      </Link>
    </div>
  );
}
