// Server component: emits a JSON-LD <script>. Schema objects come from
// lib/jsonld.ts. No fabricated ratings/reviews/metrics anywhere.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Schema is built from static, real values — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
