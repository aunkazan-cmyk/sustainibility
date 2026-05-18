// EN routing leaf. The literal `en` segment takes precedence over the TR
// catch-all, so /en and /en/* land here. params.slug is relative to /en.
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { resolveRoute, allParams } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { PageRenderer } from "@/components/PageRenderer";

type Params = Promise<{ slug?: string[] }>;

export function generateStaticParams() {
  return allParams("en");
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = resolveRoute("en", slug);
  if (!route) return {};
  return buildMetadata(route.key, "en");
}

export default async function EnCatchAll({ params }: { params: Params }) {
  const { slug } = await params;
  const route = resolveRoute("en", slug);
  if (!route) notFound();
  return <PageRenderer route={route} locale="en" />;
}
