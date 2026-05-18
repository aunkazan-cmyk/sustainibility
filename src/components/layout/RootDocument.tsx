// Shared <html>/<body> shell for both locale root layouts. There are two
// root layouts (one per locale tree) so <html lang> is correct AND fully
// static — neither reads request state, so every page still prerenders.
// SiteShell (Header/Footer) + site-wide JSON-LD are layered in here so the
// two layouts stay one-liners.
import type { ReactNode } from "react";
import type { Locale } from "@/lib/site";
import { fontVariables } from "@/lib/fonts";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, webSiteSchema } from "@/lib/jsonld";
import "@/app/globals.css";

export function RootDocument({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <html lang={locale === "tr" ? "tr" : "en"} className={fontVariables}>
      <body>
        {/* Site-wide structured data on every page of both trees. */}
        <JsonLd data={organizationSchema()} />
        <JsonLd data={webSiteSchema()} />
        <SiteShell locale={locale}>{children}</SiteShell>
      </body>
    </html>
  );
}
