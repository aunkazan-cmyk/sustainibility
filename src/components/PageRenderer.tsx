// Maps a resolved route to its page component + per-route JSON-LD.
import type { RouteDef } from "@/lib/routes";
import type { Locale } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
  articleSchema,
} from "@/lib/jsonld";
import { HomePage } from "@/components/pages/HomePage";
import { PlatformIndexPage } from "@/components/pages/PlatformIndexPage";
import { FlowPage } from "@/components/pages/FlowPage";
import { AdrPage } from "@/components/pages/AdrPage";
import { ServicesIndexPage } from "@/components/pages/ServicesIndexPage";
import { WaterServicePage } from "@/components/pages/WaterServicePage";
import { SustainabilityServicePage } from "@/components/pages/SustainabilityServicePage";
import { SectorsPage } from "@/components/pages/SectorsPage";
import { TrainingsPage } from "@/components/pages/TrainingsPage";
import { InsightsPage } from "@/components/pages/InsightsPage";
import { InsightArticlePage } from "@/components/pages/InsightArticlePage";
import { AboutPage } from "@/components/pages/AboutPage";
import { ContactPage } from "@/components/pages/ContactPage";
import { LegalPage } from "@/components/pages/LegalPage";

export function PageRenderer({
  route,
  locale,
}: {
  route: RouteDef;
  locale: Locale;
}) {
  const page = (() => {
    switch (route.renderer) {
      case "home":
        return <HomePage locale={locale} />;
      case "platformIndex":
        return <PlatformIndexPage locale={locale} />;
      case "flow":
        return <FlowPage locale={locale} />;
      case "adr":
        return <AdrPage locale={locale} />;
      case "servicesIndex":
        return <ServicesIndexPage locale={locale} />;
      case "waterService":
        return <WaterServicePage locale={locale} />;
      case "sustainabilityService":
        return <SustainabilityServicePage locale={locale} />;
      case "sectors":
        return <SectorsPage locale={locale} />;
      case "trainings":
        return <TrainingsPage locale={locale} />;
      case "insights":
        return <InsightsPage locale={locale} />;
      case "insightArticle":
        return (
          <InsightArticlePage locale={locale} insightId={route.insightId!} />
        );
      case "about":
        return <AboutPage locale={locale} />;
      case "contact":
        return <ContactPage locale={locale} />;
      case "legal":
        return <LegalPage locale={locale} docId={route.legalDocId!} />;
    }
  })();

  return (
    <>
      {route.jsonLd.includes("Breadcrumb") && (
        <JsonLd data={breadcrumbSchema(route, locale)} />
      )}
      {(() => {
        const faq = route.jsonLd.includes("FAQ") ? faqSchema(route, locale) : null;
        return faq ? <JsonLd data={faq} /> : null;
      })()}
      {route.jsonLd.includes("Service") && (
        <JsonLd data={serviceSchema(route, locale)} />
      )}
      {route.jsonLd.includes("Article") && (
        <JsonLd data={articleSchema(route, locale)} />
      )}
      {page}
    </>
  );
}
