// Site-wide constants. Origin comes from env so prod (nexovia.com.tr) and
// local differ without code changes; it must be absolute for canonical/OG.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexovia.com.tr"
).replace(/\/$/, "");

export const SITE_NAME = "Nexovia";

// Public contact endpoints surfaced in the footer / JSON-LD. Not secrets.
export const ORG_EMAIL = "talep@nexovia.com.tr";

export type Locale = "tr" | "en";
export const LOCALES: Locale[] = ["tr", "en"];
export const DEFAULT_LOCALE: Locale = "tr";

// hreflang codes for <link rel="alternate"> + sitemap alternates.
export const HREFLANG: Record<Locale, string> = { tr: "tr-TR", en: "en" };

export const OG_LOCALE: Record<Locale, string> = {
  tr: "tr_TR",
  en: "en_US",
};
