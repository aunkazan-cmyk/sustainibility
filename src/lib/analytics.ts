// Google Analytics 4 + Consent Mode v2 helpers.
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";

export const CONSENT_STORAGE_KEY = "nexovia_cookie_consent";

export type ConsentChoice = "accepted" | "rejected";

export const OPEN_COOKIE_SETTINGS_EVENT = "nexovia:open-cookie-settings";

export function isAnalyticsEnabled(): boolean {
  return GA_MEASUREMENT_ID.length > 0;
}

export function consentUpdatePayload(granted: boolean) {
  return {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  };
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (value === "accepted" || value === "rejected") return value;
  } catch {
    // private browsing / blocked storage
  }
  return null;
}

let bannerForceOpen = false;
const bannerListeners = new Set<() => void>();

function notifyBannerListeners() {
  bannerListeners.forEach((listener) => listener());
}

export function subscribeCookieBanner(callback: () => void): () => void {
  bannerListeners.add(callback);
  return () => bannerListeners.delete(callback);
}

export function getCookieBannerSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  if (!isAnalyticsEnabled()) return false;
  if (bannerForceOpen) return true;
  return getStoredConsent() === null;
}

export function getCookieBannerServerSnapshot(): boolean {
  return false;
}

export function openCookieSettings(): void {
  if (typeof window === "undefined") return;
  bannerForceOpen = true;
  notifyBannerListeners();
  window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT));
}

function closeCookieBannerPreferences(): void {
  bannerForceOpen = false;
  notifyBannerListeners();
}

export function setStoredConsent(choice: ConsentChoice): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // ignore
  }
  closeCookieBannerPreferences();
}

export function updateAnalyticsConsent(granted: boolean): void {
  window.gtag?.("consent", "update", consentUpdatePayload(granted));
}

export function sendPageView(path: string): void {
  if (!isAnalyticsEnabled()) return;
  if (getStoredConsent() !== "accepted") return;
  window.gtag?.("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

