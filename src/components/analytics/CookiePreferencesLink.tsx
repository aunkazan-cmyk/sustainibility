"use client";

import type { Locale } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { isAnalyticsEnabled, openCookieSettings } from "@/lib/analytics";

export function CookiePreferencesLink({ locale }: { locale: Locale }) {
  const { t } = getDictionary(locale);

  if (!isAnalyticsEnabled()) return null;

  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="nx-cookie-preferences-link"
    >
      {t.consent.manage}
    </button>
  );
}
