// TR routing leaf. The optional catch-all serves "/" and every TR slug;
// resolveRoute rejects "/en*" so the EN tree owns those. Full SSG via
// generateStaticParams (one entry per registry route, home = { slug: [] }).
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { resolveRoute, allParams } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { PageRenderer } from "@/components/PageRenderer";

type Params = Promise<{ slug?: string[] }>;

export function generateStaticParams() {
  return allParams("tr");
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = resolveRoute("tr", slug);
  if (!route) return {};
  return buildMetadata(route.key, "tr");
}

export default async function TrCatchAll({ params }: { params: Params }) {
  const { slug } = await params;
  const route = resolveRoute("tr", slug);
  if (!route) notFound();
  return <PageRenderer route={route} locale="tr" />;
}
