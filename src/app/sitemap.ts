// All 26 URLs (13 routes × 2 locales) from the registry, each with its
// language alternates for sitemap-level hreflang.
import type { MetadataRoute } from "next";
import { allRoutes, pathFor, alternatesFor } from "@/lib/routes";
import { SITE_URL, LOCALES } from "@/lib/site";

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return allRoutes().flatMap((route) => {
    const alt = alternatesFor(route.key);
    return LOCALES.map((locale) => ({
      url: abs(pathFor(route.key, locale)),
      lastModified,
      changeFrequency: route.sitemap.changeFrequency,
      priority: route.sitemap.priority,
      alternates: {
        languages: {
          "tr-TR": abs(alt.tr),
          en: abs(alt.en),
          "x-default": abs(alt.tr),
        },
      },
    }));
  });
}
