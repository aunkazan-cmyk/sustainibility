// THE single source of truth. This registry drives: routing resolution,
// generateStaticParams, generateMetadata, hreflang alternates, the sitemap,
// breadcrumbs, footer links and the language switcher. A slug is written
// exactly once here and nowhere else.
import type { Locale } from "./site";

export type PageKey =
  | "home"
  | "platformIndex"
  | "flow"
  | "adr"
  | "servicesIndex"
  | "waterService"
  | "sustainabilityService"
  | "sectors"
  | "trainings"
  | "insights"
  | "insightIso46001"
  | "insightEsgEnvData"
  | "insightDigitalDocTracking"
  | "insightWaterAudit"
  | "insightWaterClassification"
  | "insightMinNightFlow"
  | "insightSdsMsds"
  | "insightAuditChecklists"
  | "insightWaterSoftware"
  | "insightAdrPlatformRisks"
  | "insightSustainRoadmap"
  | "insightWaterSustainLink"
  | "about"
  | "contact"
  | "legalKvkk"
  | "legalPrivacy"
  | "legalCookie"
  | "legalTerms"
  | "legalFormNotice";

export type RendererKey =
  | "home"
  | "platformIndex"
  | "flow"
  | "adr"
  | "servicesIndex"
  | "waterService"
  | "sustainabilityService"
  | "sectors"
  | "trainings"
  | "insights"
  | "insightArticle"
  | "about"
  | "contact"
  | "legal";

export type JsonLdKind = "Breadcrumb" | "FAQ" | "Service" | "Article";

export type LegalDocId =
  | "kvkk"
  | "privacy"
  | "cookie"
  | "terms"
  | "formNotice";

export type InsightId =
  | "waterAudit"
  | "iso46001"
  | "esgEnvData"
  | "waterClassification"
  | "minNightFlow"
  | "digitalDocTracking"
  | "sdsMsds"
  | "auditChecklists"
  | "waterSoftware"
  | "adrPlatformRisks"
  | "sustainRoadmap"
  | "waterSustainLink";

export interface RouteDef {
  key: PageKey;
  /** Slug segments per locale, relative to that locale's root. [] = home.
   *  The EN `/en` prefix comes from the folder, never stored here. */
  segments: Record<Locale, string[]>;
  renderer: RendererKey;
  jsonLd: JsonLdKind[];
  sitemap: {
    priority: number;
    changeFrequency:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never";
  };
  legalDocId?: LegalDocId;
  insightId?: InsightId;
}

export const ROUTES: RouteDef[] = [
  {
    key: "home",
    segments: { tr: [], en: [] },
    renderer: "home",
    jsonLd: [],
    sitemap: { priority: 1, changeFrequency: "weekly" },
  },
  {
    key: "platformIndex",
    segments: { tr: ["platform"], en: ["platform"] },
    renderer: "platformIndex",
    jsonLd: [],
    sitemap: { priority: 0.8, changeFrequency: "monthly" },
  },
  {
    key: "flow",
    segments: {
      tr: ["platform", "nexovia-flow"],
      en: ["platform", "nexovia-flow"],
    },
    renderer: "flow",
    jsonLd: ["FAQ"],
    sitemap: { priority: 0.9, changeFrequency: "monthly" },
  },
  {
    key: "adr",
    segments: {
      tr: ["platform", "nexovia-adr"],
      en: ["platform", "nexovia-adr"],
    },
    renderer: "adr",
    jsonLd: ["FAQ"],
    sitemap: { priority: 0.9, changeFrequency: "monthly" },
  },
  {
    key: "servicesIndex",
    segments: { tr: ["hizmetler"], en: ["services"] },
    renderer: "servicesIndex",
    jsonLd: [],
    sitemap: { priority: 0.8, changeFrequency: "monthly" },
  },
  {
    key: "waterService",
    segments: {
      tr: ["hizmetler", "su-verimliligi-danismanligi"],
      en: ["services", "water-efficiency-consulting"],
    },
    renderer: "waterService",
    jsonLd: ["Breadcrumb", "Service", "FAQ"],
    sitemap: { priority: 0.9, changeFrequency: "monthly" },
  },
  {
    key: "sustainabilityService",
    segments: {
      tr: ["hizmetler", "surdurulebilirlik-danismanligi"],
      en: ["services", "sustainability-consulting"],
    },
    renderer: "sustainabilityService",
    jsonLd: ["Breadcrumb", "Service"],
    sitemap: { priority: 0.9, changeFrequency: "monthly" },
  },
  {
    key: "sectors",
    segments: { tr: ["sektorler"], en: ["sectors"] },
    renderer: "sectors",
    jsonLd: [],
    sitemap: { priority: 0.8, changeFrequency: "monthly" },
  },
  {
    key: "trainings",
    segments: { tr: ["egitimler"], en: ["trainings"] },
    renderer: "trainings",
    jsonLd: ["FAQ"],
    sitemap: { priority: 0.7, changeFrequency: "weekly" },
  },
  {
    key: "insights",
    segments: { tr: ["icgoruler"], en: ["insights"] },
    renderer: "insights",
    jsonLd: [],
    sitemap: { priority: 0.7, changeFrequency: "weekly" },
  },
  {
    key: "insightIso46001",
    segments: {
      tr: ["icgoruler", "iso-46001-hazirligi"],
      en: ["insights", "iso-46001-readiness"],
    },
    renderer: "insightArticle",
    jsonLd: ["Breadcrumb", "Article"],
    sitemap: { priority: 0.6, changeFrequency: "monthly" },
    insightId: "iso46001",
  },
  {
    key: "insightEsgEnvData",
    segments: {
      tr: ["icgoruler", "esg-cevresel-veriler"],
      en: ["insights", "esg-environmental-data"],
    },
    renderer: "insightArticle",
    jsonLd: ["Breadcrumb", "Article"],
    sitemap: { priority: 0.6, changeFrequency: "monthly" },
    insightId: "esgEnvData",
  },
  {
    key: "insightDigitalDocTracking",
    segments: {
      tr: ["icgoruler", "dijital-belge-takibi"],
      en: ["insights", "digital-document-tracking"],
    },
    renderer: "insightArticle",
    jsonLd: ["Breadcrumb", "Article"],
    sitemap: { priority: 0.6, changeFrequency: "monthly" },
    insightId: "digitalDocTracking",
  },
  {
    key: "insightWaterAudit",
    segments: {
      tr: ["icgoruler", "su-verimliligi-etudu"],
      en: ["insights", "water-efficiency-audit"],
    },
    renderer: "insightArticle",
    jsonLd: ["Breadcrumb", "Article"],
    sitemap: { priority: 0.6, changeFrequency: "monthly" },
    insightId: "waterAudit",
  },
  {
    key: "insightWaterClassification",
    segments: {
      tr: ["icgoruler", "su-tuketimi-siniflandirma"],
      en: ["insights", "water-consumption-classification"],
    },
    renderer: "insightArticle",
    jsonLd: ["Breadcrumb", "Article"],
    sitemap: { priority: 0.6, changeFrequency: "monthly" },
    insightId: "waterClassification",
  },
  {
    key: "insightMinNightFlow",
    segments: {
      tr: ["icgoruler", "minimum-gece-akisi"],
      en: ["insights", "minimum-night-flow"],
    },
    renderer: "insightArticle",
    jsonLd: ["Breadcrumb", "Article"],
    sitemap: { priority: 0.6, changeFrequency: "monthly" },
    insightId: "minNightFlow",
  },
  {
    key: "insightSdsMsds",
    segments: {
      tr: ["icgoruler", "sds-msds-takibi"],
      en: ["insights", "sds-msds-tracking"],
    },
    renderer: "insightArticle",
    jsonLd: ["Breadcrumb", "Article"],
    sitemap: { priority: 0.6, changeFrequency: "monthly" },
    insightId: "sdsMsds",
  },
  {
    key: "insightAuditChecklists",
    segments: {
      tr: ["icgoruler", "dijital-kontrol-listeleri"],
      en: ["insights", "digital-audit-checklists"],
    },
    renderer: "insightArticle",
    jsonLd: ["Breadcrumb", "Article"],
    sitemap: { priority: 0.6, changeFrequency: "monthly" },
    insightId: "auditChecklists",
  },
  {
    key: "insightWaterSoftware",
    segments: {
      tr: ["icgoruler", "su-verimliligi-yazilimi"],
      en: ["insights", "water-efficiency-software"],
    },
    renderer: "insightArticle",
    jsonLd: ["Breadcrumb", "Article"],
    sitemap: { priority: 0.6, changeFrequency: "monthly" },
    insightId: "waterSoftware",
  },
  {
    key: "insightAdrPlatformRisks",
    segments: {
      tr: ["icgoruler", "adr-platform-riskleri"],
      en: ["insights", "adr-platform-risks"],
    },
    renderer: "insightArticle",
    jsonLd: ["Breadcrumb", "Article"],
    sitemap: { priority: 0.6, changeFrequency: "monthly" },
    insightId: "adrPlatformRisks",
  },
  {
    key: "insightSustainRoadmap",
    segments: {
      tr: ["icgoruler", "surdurulebilirlik-yol-haritasi"],
      en: ["insights", "sustainability-roadmap"],
    },
    renderer: "insightArticle",
    jsonLd: ["Breadcrumb", "Article"],
    sitemap: { priority: 0.6, changeFrequency: "monthly" },
    insightId: "sustainRoadmap",
  },
  {
    key: "insightWaterSustainLink",
    segments: {
      tr: ["icgoruler", "su-ve-surdurulebilirlik"],
      en: ["insights", "water-and-sustainability"],
    },
    renderer: "insightArticle",
    jsonLd: ["Breadcrumb", "Article"],
    sitemap: { priority: 0.6, changeFrequency: "monthly" },
    insightId: "waterSustainLink",
  },
  {
    key: "about",
    segments: { tr: ["hakkimizda"], en: ["about"] },
    renderer: "about",
    jsonLd: ["FAQ"],
    sitemap: { priority: 0.6, changeFrequency: "monthly" },
  },
  {
    key: "contact",
    segments: { tr: ["iletisim"], en: ["contact"] },
    renderer: "contact",
    jsonLd: ["Breadcrumb"],
    sitemap: { priority: 0.6, changeFrequency: "yearly" },
  },
  {
    key: "legalKvkk",
    segments: { tr: ["kvkk-aydinlatma-metni"], en: ["privacy-notice"] },
    renderer: "legal",
    jsonLd: ["Breadcrumb"],
    sitemap: { priority: 0.3, changeFrequency: "yearly" },
    legalDocId: "kvkk",
  },
  {
    key: "legalPrivacy",
    segments: { tr: ["gizlilik-politikasi"], en: ["privacy-policy"] },
    renderer: "legal",
    jsonLd: ["Breadcrumb"],
    sitemap: { priority: 0.3, changeFrequency: "yearly" },
    legalDocId: "privacy",
  },
  {
    key: "legalCookie",
    segments: { tr: ["cerez-politikasi"], en: ["cookie-policy"] },
    renderer: "legal",
    jsonLd: ["Breadcrumb"],
    sitemap: { priority: 0.3, changeFrequency: "yearly" },
    legalDocId: "cookie",
  },
  {
    key: "legalTerms",
    segments: { tr: ["kullanim-sartlari"], en: ["terms-of-use"] },
    renderer: "legal",
    jsonLd: ["Breadcrumb"],
    sitemap: { priority: 0.3, changeFrequency: "yearly" },
    legalDocId: "terms",
  },
  {
    key: "legalFormNotice",
    segments: {
      tr: ["form-aydinlatma-metni"],
      en: ["form-privacy-notice"],
    },
    renderer: "legal",
    jsonLd: ["Breadcrumb"],
    sitemap: { priority: 0.3, changeFrequency: "yearly" },
    legalDocId: "formNotice",
  },
];

const BY_KEY = new Map<PageKey, RouteDef>(ROUTES.map((r) => [r.key, r]));

const BY_INSIGHT = new Map<InsightId, PageKey>(
  ROUTES.filter((r) => r.insightId).map((r) => [r.insightId!, r.key]),
);

/** Ordered list of insight articles (drives the Insights index + detail
 *  pages from one source). First entry is the featured article. */
export const INSIGHT_ORDER: InsightId[] = [
  "iso46001",
  "esgEnvData",
  "digitalDocTracking",
  "waterAudit",
  "waterClassification",
  "minNightFlow",
  "sdsMsds",
  "auditChecklists",
  "waterSoftware",
  "adrPlatformRisks",
  "sustainRoadmap",
  "waterSustainLink",
];

/** InsightId → its page route key (so cards can link to the detail page). */
export function routeKeyForInsight(id: InsightId): PageKey {
  const k = BY_INSIGHT.get(id);
  if (!k) throw new Error(`No route for insight: ${id}`);
  return k;
}

export function allRoutes(): RouteDef[] {
  return ROUTES;
}

export function getRoute(key: PageKey): RouteDef {
  const r = BY_KEY.get(key);
  if (!r) throw new Error(`Unknown route key: ${key}`);
  return r;
}

/** Resolve an incoming slug array (from the catch-all) to a route, or null
 *  (caller -> notFound()). The TR tree must reject `/en*` so it isn't
 *  double-served by both trees. */
export function resolveRoute(
  locale: Locale,
  slug: string[] | undefined,
): RouteDef | null {
  const parts = slug ?? [];
  if (locale === "tr" && parts[0] === "en") return null;
  const path = parts.join("/");
  return (
    ROUTES.find((r) => r.segments[locale].join("/") === path) ?? null
  );
}

/** Absolute-from-root path for a page in a locale. TR at `/`, EN under `/en`. */
export function pathFor(key: PageKey, locale: Locale): string {
  const segs = getRoute(key).segments[locale];
  const tail = segs.join("/");
  if (locale === "tr") return tail ? `/${tail}` : "/";
  return tail ? `/en/${tail}` : "/en";
}

/** { tr, en } absolute-from-root paths — for hreflang + the lang switcher. */
export function alternatesFor(key: PageKey): Record<Locale, string> {
  return { tr: pathFor(key, "tr"), en: pathFor(key, "en") };
}

/** Param objects for generateStaticParams of an optional catch-all.
 *  Home is `{ slug: [] }`; everything else its segment array. */
export function allParams(locale: Locale): { slug: string[] }[] {
  return ROUTES.map((r) => ({ slug: r.segments[locale] }));
}
