"use client";
// Mobile hamburger + slide-down drawer. Mandatory per project_docs (mobile).
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LangSwitcher } from "./LangSwitcher";

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export function MobileNav({
  items,
  contactHref,
  contactLabel,
}: {
  items: NavItem[];
  contactHref: string;
  contactLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // `open` is false during SSR/first render, so the createPortal branch
  // never references document on the server (no hydration mismatch, no
  // mounted flag needed). The drawer is portaled to <body> because the
  // <header> uses
  // backdrop-filter, which makes position:fixed resolve against the 72px
  // header instead of the viewport (the "block, not full screen" bug).
  // Lock background scroll while the full-screen menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="nx-mobile-only" style={{ alignItems: "center" }}>
      <button
        type="button"
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        style={{
          width: 40,
          height: 40,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          border: "1px solid var(--nx-200)",
          borderRadius: 10,
          color: "var(--nx-900)",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
          {open ? (
            <path
              d="M4 4 L16 16 M16 4 L4 16"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M3 6h14 M3 10h14 M3 14h14"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {open &&
        createPortal(
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#fff",
            zIndex: 200,
            display: "flex",
            flexDirection: "column",
            overscrollBehavior: "contain",
          }}
        >
          {/* Top bar — language switcher + close, always reachable */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              height: 72,
              padding: "0 20px",
              borderBottom: "1px solid var(--nx-150)",
              flexShrink: 0,
            }}
          >
            <LangSwitcher />
            <button
              type="button"
              aria-label="Menüyü kapat"
              onClick={() => setOpen(false)}
              style={{
                width: 40,
                height: 40,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "1px solid var(--nx-200)",
                borderRadius: 10,
                color: "var(--nx-900)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  d="M4 4 L16 16 M16 4 L4 16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px 20px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
          {items.map((it) => {
            const active = pathname === it.href;
            return (
              <div
                key={it.href}
                style={{ borderBottom: "1px solid var(--nx-150)" }}
              >
                <Link
                  href={it.href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: "block",
                    padding: "16px 8px",
                    fontSize: 18,
                    fontWeight: active ? 700 : 500,
                    color: active ? "var(--nx-900)" : "var(--nx-700)",
                  }}
                >
                  {it.label}
                </Link>
                {it.children && (
                  <div style={{ paddingBottom: 8 }}>
                    {it.children.map((c) => {
                      const ca = pathname === c.href;
                      return (
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={() => setOpen(false)}
                          style={{
                            display: "block",
                            padding: "10px 8px 10px 24px",
                            fontSize: 15,
                            fontWeight: ca ? 700 : 500,
                            color: ca
                              ? "var(--nx-accent-deep)"
                              : "var(--nx-600)",
                          }}
                        >
                          {c.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          <Link
            href={contactHref}
            onClick={() => setOpen(false)}
            className="nx-btn nx-btn--accent"
            style={{ marginTop: 24, justifyContent: "center" }}
          >
            {contactLabel}
          </Link>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
