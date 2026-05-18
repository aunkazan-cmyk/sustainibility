// Editorial breadcrumb trail. Visible trail here; the BreadcrumbList JSON-LD
// is emitted alongside it in the SEO task (it consumes the same `items`).
import Link from "next/link";
import { Fragment } from "react";

export interface Crumb {
  name: string;
  /** Absolute-from-root path; omitted for the current (last) crumb. */
  href?: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="breadcrumb"
      style={{
        fontSize: 13,
        color: "var(--nx-500)",
        display: "flex",
        gap: 8,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {items.map((c, i) => {
        const last = i === items.length - 1;
        return (
          <Fragment key={c.name}>
            {c.href && !last ? (
              <Link href={c.href}>{c.name}</Link>
            ) : (
              <span style={last ? { color: "var(--nx-900)" } : undefined}>
                {c.name}
              </span>
            )}
            {!last && <span aria-hidden>/</span>}
          </Fragment>
        );
      })}
    </nav>
  );
}
