// Root layout #1 — Turkish tree (served at "/"). One of two root layouts
// (the other is the EN group); there is intentionally no app/layout.tsx, so
// each locale gets a static, correct <html lang> with full prerendering.
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RootDocument } from "@/components/layout/RootDocument";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s — ${SITE_NAME}` },
};

export default function TrRootLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="tr">{children}</RootDocument>;
}
