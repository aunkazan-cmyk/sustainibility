// Header + page + Footer + mobile sticky CTA. Server component; locale comes
// statically from the per-locale root layout.
import type { ReactNode } from "react";
import type { Locale } from "@/lib/site";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StickyContactCta } from "./StickyContactCta";
import { CookieConsentBanner } from "@/components/analytics/CookieConsentBanner";
import { HeaderThemeProvider } from "./header-theme";

export function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <HeaderThemeProvider>
      <Header locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
      <StickyContactCta locale={locale} />
      <CookieConsentBanner locale={locale} />
    </HeaderThemeProvider>
  );
}
