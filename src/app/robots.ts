// NEXOVIA_BLOCK_ALL_ROBOTS=1 fully disallows crawling (use on staging).
// Production: allow everything; /en and assets are not blocked.
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const blockAll =
    (process.env.NEXOVIA_BLOCK_ALL_ROBOTS ?? "").toLowerCase() === "1" ||
    (process.env.NEXOVIA_BLOCK_ALL_ROBOTS ?? "").toLowerCase() === "true";

  if (blockAll) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
