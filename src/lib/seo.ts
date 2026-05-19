// Per-page metadata: localized title/description + canonical/hreflang/OG.
// Titles use `title.absolute` so they aren't doubled by the layout template.
// Descriptions reuse the page lead copy (non-promotional, project_docs rule).
import type { Metadata } from "next";
import type { PageKey } from "./routes";
import { pathFor, alternatesFor, getRoute } from "./routes";
import { SITE_URL, SITE_NAME, HREFLANG, OG_LOCALE, type Locale } from "./site";
import { I18N } from "@/i18n/dictionary";
import { langOf } from "@/i18n/getDictionary";
import { legalDoc } from "./legal-content";
import { insightArticle } from "@/i18n/insights-content";

const TITLES: Partial<Record<PageKey, Record<Locale, string>>> = {
  home: {
    tr: "Nexovia | Su Verimliliği, Sürdürülebilirlik ve Dijital Uyum Platformları",
    en: "Nexovia | Water Efficiency, Sustainability & Digital Compliance Platforms",
  },
  platformIndex: {
    tr: "Platform | Nexovia",
    en: "Platform | Nexovia",
  },
  flow: {
    tr: "Nexovia Flow | Su Verimliliği İzleme ve Raporlama Platformu",
    en: "Nexovia Flow | Water Efficiency Monitoring & Reporting Platform",
  },
  adr: {
    tr: "Nexovia ADR | Tehlikeli Madde Uyum Platformu",
    en: "Nexovia ADR | Dangerous Goods Compliance Platform",
  },
  servicesIndex: {
    tr: "Danışmanlık Hizmetleri | Nexovia",
    en: "Consulting Services | Nexovia",
  },
  waterService: {
    tr: "Su Verimliliği Danışmanlığı | Nexovia",
    en: "Water Efficiency Consulting | Nexovia",
  },
  sustainabilityService: {
    tr: "Sürdürülebilirlik Danışmanlığı | Nexovia",
    en: "Sustainability Consulting | Nexovia",
  },
  sectors: { tr: "Sektörler | Nexovia", en: "Sectors | Nexovia" },
  trainings: { tr: "Eğitimler | Nexovia", en: "Trainings | Nexovia" },
  insights: { tr: "İçgörüler | Nexovia", en: "Insights | Nexovia" },
  about: { tr: "Hakkımızda | Nexovia", en: "About | Nexovia" },
  contact: { tr: "İletişim | Nexovia", en: "Contact | Nexovia" },
};

function titleFor(key: PageKey, locale: Locale): string {
  const t = TITLES[key]?.[locale];
  if (t) return t;
  const route = getRoute(key);
  if (route.legalDocId) {
    return `${legalDoc(route.legalDocId, langOf(locale)).title} | ${SITE_NAME}`;
  }
  if (route.insightId) {
    return `${insightArticle(route.insightId, langOf(locale)).title} | ${SITE_NAME}`;
  }
  return SITE_NAME;
}

function descriptionFor(key: PageKey, locale: Locale): string {
  const d = I18N[langOf(locale)];
  const route = getRoute(key);
  const clamp = (s: string) => (s.length > 300 ? s.slice(0, 297) + "…" : s);
  if (route.legalDocId) return clamp(legalDoc(route.legalDocId, langOf(locale)).lead);
  if (route.insightId)
    return clamp(insightArticle(route.insightId, langOf(locale)).lead);
  switch (key) {
    case "home":
      return clamp(d.home.heroLead);
    case "platformIndex":
      return clamp(d.platformIndex.lead);
    case "flow":
      return clamp(d.flowPage.lead);
    case "adr":
      return clamp(d.adrPage.lead);
    case "servicesIndex":
      return clamp(d.servicesIndex.lead);
    case "waterService":
      return clamp(d.waterPage.lead);
    case "sustainabilityService":
      return clamp(d.sustainabilityPage.lead);
    case "sectors":
      return clamp(d.sectorsPage.lead);
    case "trainings":
      return clamp(d.trainingsPage.lead);
    case "insights":
      return clamp(d.insightsPage.lead);
    case "about":
      return clamp(d.aboutPage.lead);
    case "contact":
      return clamp(d.contactPage.lead);
    default:
      return clamp(d.home.heroLead);
  }
}

export function buildMetadata(key: PageKey, locale: Locale): Metadata {
  const canonical = pathFor(key, locale);
  const alt = alternatesFor(key);
  const title = titleFor(key, locale);
  const description = descriptionFor(key, locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: {
        [HREFLANG.tr]: alt.tr,
        [HREFLANG.en]: alt.en,
        "x-default": alt.tr,
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: canonical,
      locale: OG_LOCALE[locale],
      images: [{ url: "/og/default-og.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og/default-og.png"],
    },
    robots: { index: true, follow: true },
  };
}
