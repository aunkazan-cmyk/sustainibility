"use client";
// Accessible nav dropdown for Platform / Services. The label still links to
// the index page; hovering/focusing reveals a panel to pick a specific
// platform/service. Opens on hover AND keyboard focus/click; Escape and
// click-outside close it. Active when the path is the index or any child.
import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useHeaderTheme } from "./header-theme";

export interface DropItem {
  label: string;
  href: string;
}

export function NavDropdown({
  label,
  href,
  items,
}: {
  label: string;
  href: string;
  items: DropItem[];
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const pathname = usePathname() || "/";
  const { transparent } = useHeaderTheme();
  const active =
    pathname === href || items.some((i) => pathname === i.href);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="nx-dropdown"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node))
          setOpen(false);
      }}
    >
      <Link
        href={href}
        className="nx-dropdown__trigger nx-nav-link"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          fontSize: 14,
          fontWeight: active ? 600 : 500,
          color: transparent
            ? active
              ? "#fff"
              : "rgba(255,255,255,0.88)"
            : active
              ? "var(--nx-900)"
              : "var(--nx-700)",
          padding: "8px 2px",
        }}
      >
        {label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          aria-hidden="true"
          style={{
            opacity: 0.55,
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform .15s",
          }}
        >
          <path d="M2 4 L5 7 L8 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </Link>

      <div
        id={menuId}
        role="menu"
        aria-label={label}
        className="nx-dropdown__panel"
        data-open={open ? "true" : "false"}
      >
        {items.map((it) => {
          const a = pathname === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              role="menuitem"
              aria-current={a ? "page" : undefined}
              onClick={() => setOpen(false)}
              className="nx-dropdown__item"
              style={{ color: a ? "var(--nx-accent-deep)" : "var(--nx-800)" }}
            >
              {it.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
