"use client";
// Nav link with active state. The shell lives in a layout (no route params),
// so active detection uses usePathname — the documented Next pattern.
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { useHeaderTheme } from "./header-theme";

export function NavLink({
  href,
  label,
  dark: darkProp,
  hasMenu = false,
  style,
}: {
  href: string;
  label: string;
  dark?: boolean;
  hasMenu?: boolean;
  style?: CSSProperties;
}) {
  const pathname = usePathname();
  const { transparent } = useHeaderTheme();
  const dark = darkProp ?? transparent;
  const active = pathname === href;
  const base: CSSProperties = {
    fontSize: 14,
    fontWeight: active ? 600 : 500,
    color: active
      ? dark
        ? "#fff"
        : "var(--nx-900)"
      : dark
        ? "rgba(255,255,255,0.88)"
        : "var(--nx-700)",
    padding: "8px 2px",
    position: "relative",
    ...style,
  };
  return (
    <Link
      href={href}
      className="nx-nav-link"
      style={base}
      aria-current={active ? "page" : undefined}
    >
      {label}
      {hasMenu && (
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          style={{ display: "inline", marginLeft: 4, opacity: 0.5 }}
          aria-hidden="true"
        >
          <path d="M2 4 L5 7 L8 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      )}
    </Link>
  );
}
