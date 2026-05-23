import {
  CONSENT_STORAGE_KEY,
  isAnalyticsEnabled,
} from "@/lib/analytics";

export function AnalyticsConsentScript() {
  if (!isAnalyticsEnabled()) return null;

  const script = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'wait_for_update': 500
    });
    try {
      var consent = localStorage.getItem('${CONSENT_STORAGE_KEY}');
      if (consent === 'accepted') {
        gtag('consent', 'update', {
          'analytics_storage': 'granted',
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied'
        });
      }
    } catch (e) {}
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
