// JSON-LD builders. Only real, verifiable values — no ratings, reviews,
// aggregateRating, fake founders or unsupported claims (project_docs rule).
import { SITE_URL, SITE_NAME, ORG_EMAIL, type Locale } from "./site";
import { pathFor, type RouteDef } from "./routes";
import { I18N } from "@/i18n/dictionary";
import { langOf } from "@/i18n/getDictionary";
import { faqForRouteKey } from "@/i18n/faq";
import { insightArticle } from "@/i18n/insights-content";

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

export function organizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    email: ORG_EMAIL,
    logo: `${SITE_URL}/logos/nexovia-logo.svg`,
    description:
      "Su verimliliği, sürdürülebilirlik ve ADR/TMGD alanlarında kurumsal danışmanlık.",
    sameAs: [],
  };
}

export function webSiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ["tr-TR", "en"],
  };
}

// Home → current page. Intermediate no-page crumbs are intentionally omitted
// so every ListItem has a real URL (valid BreadcrumbList).
export function breadcrumbSchema(
  route: RouteDef,
  locale: Locale,
): Record<string, unknown> {
  const lang = langOf(locale);
  const home = lang === "TR" ? "Anasayfa" : "Home";
  const current = currentCrumbName(route, lang);
  const items = [
    { name: home, url: abs(pathFor("home", locale)) },
    { name: current, url: abs(pathFor(route.key, locale)) },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

function currentCrumbName(route: RouteDef, lang: "TR" | "EN"): string {
  const d = I18N[lang];
  if (route.legalDocId) {
    // legalTitle without importing legal-content cycle — read via dictionary
    // is not available, so map by key label here.
    const labels: Record<string, [string, string]> = {
      kvkk: ["KVKK Aydınlatma Metni", "Privacy Notice"],
      privacy: ["Gizlilik Politikası", "Privacy Policy"],
      cookie: ["Çerez Politikası", "Cookie Policy"],
      terms: ["Kullanım Şartları", "Terms of Use"],
      formNotice: ["Form Aydınlatma Metni", "Form Privacy Notice"],
    };
    const [tr, en] = labels[route.legalDocId];
    return lang === "TR" ? tr : en;
  }
  if (route.insightId)
    return insightArticle(route.insightId, lang).title;
  switch (route.key) {
    case "platformIndex":
      return d.nav.platform;
    case "flow":
      return d.flowPage.title;
    case "adr":
      return d.adrPage.title;
    case "servicesIndex":
      return d.nav.services;
    case "waterService":
      return d.services.water.title;
    case "sustainabilityService":
      return d.sustainabilityPage.title;
    case "sectors":
      return d.nav.sectors;
    case "trainings":
      return d.nav.trainings;
    case "insights":
      return d.nav.insights;
    case "about":
      return d.nav.about;
    case "contact":
      return d.nav.contact;
    default:
      return SITE_NAME;
  }
}

export function faqSchema(
  route: RouteDef,
  locale: Locale,
): Record<string, unknown> | null {
  const items = faqForRouteKey(route.key, langOf(locale));
  if (!items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(
  route: RouteDef,
  locale: Locale,
): Record<string, unknown> {
  const a = insightArticle(route.insightId!, langOf(locale));
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.lead,
    inLanguage: locale === "tr" ? "tr-TR" : "en",
    image: `${SITE_URL}${a.image}`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: abs(pathFor(route.key, locale)),
  };
}

export function serviceSchema(
  route: RouteDef,
  locale: Locale,
): Record<string, unknown> {
  const d = I18N[langOf(locale)];
  const isSustain = route.key === "sustainabilityService";
  const name = isSustain
    ? d.sustainabilityPage.title
    : d.services.water.title;
  const description = isSustain ? d.sustainabilityPage.lead : d.waterPage.lead;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    description,
    areaServed: "TR",
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    url: abs(pathFor(route.key, locale)),
  };
}
