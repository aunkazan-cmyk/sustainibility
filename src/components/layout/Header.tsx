// Site header — ported from components.jsx (light theme = Direction A).
// Uses the real optimized logo (the user's requirement); the heavy source
// SVGs were rasterized + trimmed to a ~4.5 KB PNG (see scripts/optimize-logos).
import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/site";
import { getDictionary } from "@/i18n/getDictionary";
import { pathFor, type PageKey } from "@/lib/routes";
import { NavLink } from "./NavLink";
import { NavDropdown } from "./NavDropdown";
import { LangSwitcher } from "./LangSwitcher";
import { MobileNav } from "./MobileNav";
import { ArrowRight } from "@/components/shared/primitives";

type NavChild = { key: PageKey; label: string };
type NavItem = { key: PageKey; label: string; children?: NavChild[] };

export function Header({ locale }: { locale: Locale }) {
  const { t } = getDictionary(locale);

  // Platform & Services are index pages AND open a dropdown to pick a
  // specific platform/service directly from the navbar.
  const navItems: NavItem[] = [
    {
      key: "platformIndex",
      label: t.nav.platform,
      children: [
        { key: "flow", label: t.flowPage.title },
        { key: "adr", label: t.adrPage.title },
      ],
    },
    {
      key: "servicesIndex",
      label: t.nav.services,
      children: [
        { key: "waterService", label: t.services.water.title },
        { key: "sustainabilityService", label: t.sustainabilityPage.title },
      ],
    },
    { key: "sectors", label: t.nav.sectors },
    { key: "trainings", label: t.nav.trainings },
    { key: "insights", label: t.nav.insights },
    { key: "about", label: t.nav.about },
    { key: "contact", label: t.nav.contact },
  ];
  const contactHref = pathFor("contact", locale);
  const homeHref = pathFor("home", locale);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "saturate(180%) blur(12px)",
        WebkitBackdropFilter: "saturate(180%) blur(12px)",
        borderBottom: "1px solid var(--nx-150)",
        color: "var(--nx-900)",
      }}
    >
      <div
        className="nx-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
          gap: 32,
        }}
      >
        <Link
          href={homeHref}
          style={{ display: "flex", alignItems: "center" }}
          aria-label="Nexovia"
        >
          <Image
            src="/logos/optimized/nexovia-logo-light.png"
            alt="Nexovia"
            width={437}
            height={120}
            priority
            style={{ height: 34, width: "auto" }}
          />
        </Link>

        <nav
          className="nx-desktop-nav"
          style={{ gap: 28, alignItems: "center" }}
        >
          {navItems.map((item) =>
            item.children ? (
              <NavDropdown
                key={item.key}
                label={item.label}
                href={pathFor(item.key, locale)}
                items={item.children.map((c) => ({
                  label: c.label,
                  href: pathFor(c.key, locale),
                }))}
              />
            ) : (
              <NavLink
                key={item.key}
                href={pathFor(item.key, locale)}
                label={item.label}
              />
            ),
          )}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span className="nx-desktop-nav">
            <LangSwitcher />
          </span>
          <Link
            href={contactHref}
            className="nx-btn nx-btn--accent nx-desktop-nav"
            style={{ padding: "10px 18px", fontSize: 14 }}
          >
            {t.cta.contact}
            <ArrowRight strokeWidth={1.6} />
          </Link>
          <MobileNav
            items={navItems.map((i) => ({
              label: i.label,
              href: pathFor(i.key, locale),
              children: i.children?.map((c) => ({
                label: c.label,
                href: pathFor(c.key, locale),
              })),
            }))}
            contactHref={contactHref}
            contactLabel={t.cta.contact}
          />
        </div>
      </div>
    </header>
  );
}
