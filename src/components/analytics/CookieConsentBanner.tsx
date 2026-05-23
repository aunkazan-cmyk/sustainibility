"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import type { Locale } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { pathFor } from "@/lib/routes";
import {
  getCookieBannerServerSnapshot,
  getCookieBannerSnapshot,
  sendPageView,
  setStoredConsent,
  subscribeCookieBanner,
  updateAnalyticsConsent,
} from "@/lib/analytics";

export function CookieConsentBanner({ locale }: { locale: Locale }) {
  const { t } = getDictionary(locale);
  const visible = useSyncExternalStore(
    subscribeCookieBanner,
    getCookieBannerSnapshot,
    getCookieBannerServerSnapshot,
  );

  const accept = () => {
    setStoredConsent("accepted");
    updateAnalyticsConsent(true);
    const qs = window.location.search;
    const path = qs
      ? `${window.location.pathname}${qs}`
      : window.location.pathname;
    sendPageView(path);
  };

  const reject = () => {
    setStoredConsent("rejected");
    updateAnalyticsConsent(false);
  };

  if (!visible) return null;

  return (
    <div
      className="nx-cookie-banner"
      role="dialog"
      aria-labelledby="nx-cookie-banner-title"
      aria-describedby="nx-cookie-banner-desc"
    >
      <div className="nx-cookie-banner__inner nx-container">
        <div className="nx-cookie-banner__copy">
          <p id="nx-cookie-banner-title" className="nx-cookie-banner__title">
            {t.consent.title}
          </p>
          <p id="nx-cookie-banner-desc" className="nx-cookie-banner__desc">
            {t.consent.description}{" "}
            <Link href={pathFor("legalCookie", locale)} className="nx-cookie-banner__link">
              {t.consent.policyLink}
            </Link>
          </p>
        </div>
        <div className="nx-cookie-banner__actions">
          <button type="button" className="nx-btn nx-btn--ghost-light" onClick={reject}>
            {t.consent.reject}
          </button>
          <button type="button" className="nx-btn nx-btn--accent" onClick={accept}>
            {t.consent.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
