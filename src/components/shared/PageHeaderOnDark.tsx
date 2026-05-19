"use client";

import { usePageHeaderVariant } from "./usePageHeaderVariant";

/** Client marker for photo-hero pages (transparent nav over hero). */
export function PageHeaderOnDark() {
  usePageHeaderVariant("on-dark");
  return null;
}
