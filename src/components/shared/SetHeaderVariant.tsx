"use client";

export type HeaderVariant = "light" | "on-dark";

import { usePageHeaderVariant } from "./usePageHeaderVariant";

/** @deprecated Prefer usePageHeaderVariant — kept for existing call sites. */
export function SetHeaderVariant({ variant }: { variant: HeaderVariant }) {
  usePageHeaderVariant(variant);
  return null;
}
