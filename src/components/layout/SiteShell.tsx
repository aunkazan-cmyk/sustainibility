// Header + page + Footer + mobile sticky CTA. Server component; locale comes
// statically from the per-locale root layout.
import type { ReactNode } from "react";
import type { Locale } from "@/lib/site";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StickyContactCta } from "./StickyContactCta";

export function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <>
      <Header locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
      <StickyContactCta locale={locale} />
    </>
  );
}
