"use client";
// TR/EN toggle. The shell is in a layout (no route params), so the current
// page is derived from the pathname against the registry, then linked to the
// equivalent slug in the other locale (cross-slug correct). Falls back to the
// other locale's home if it can't resolve (defensive — all 13 pages map).
import Link from "next/link";
import { usePathname } from "next/navigation";
import { resolveRoute, pathFor } from "@/lib/routes";
import type { Locale } from "@/lib/site";

function parse(pathname: string): { locale: Locale; slug: string[] } {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const rest = pathname.slice(3).replace(/^\//, "");
    return { locale: "en", slug: rest ? rest.split("/") : [] };
  }
  const rest = pathname.replace(/^\//, "");
  return { locale: "tr", slug: rest ? rest.split("/") : [] };
}

export function LangSwitcher({ dark = false }: { dark?: boolean }) {
  const pathname = usePathname() || "/";
  const { locale, slug } = parse(pathname);
  const route = resolveRoute(locale, slug);

  const hrefFor = (target: Locale) =>
    route ? pathFor(route.key, target) : target === "tr" ? "/" : "/en";

  return (
    <div
      style={{
        display: "inline-flex",
        borderRadius: 999,
        background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)",
        padding: 2,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {(["tr", "en"] as Locale[]).map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={hrefFor(l)}
            hrefLang={l === "tr" ? "tr-TR" : "en"}
            aria-current={active ? "true" : undefined}
            style={{
              padding: "5px 12px",
              borderRadius: 999,
              background: active ? "var(--nx-navy)" : "transparent",
              color: active
                ? "#fff"
                : dark
                  ? "rgba(255,255,255,0.7)"
                  : "var(--nx-600)",
              letterSpacing: "0.04em",
            }}
          >
            {l.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
