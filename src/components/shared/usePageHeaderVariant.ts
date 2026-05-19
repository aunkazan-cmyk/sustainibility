"use client";

import { useEffect } from "react";
import type { HeaderVariant } from "./SetHeaderVariant";

/** Marks the page as using a photo hero header (transparent nav over hero). */
export function usePageHeaderVariant(variant: HeaderVariant) {
  useEffect(() => {
    if (variant === "on-dark") {
      document.documentElement.dataset.nxHeader = "on-dark";
    } else {
      delete document.documentElement.dataset.nxHeader;
    }
    return () => {
      delete document.documentElement.dataset.nxHeader;
      delete document.documentElement.dataset.nxHeaderSolid;
    };
  }, [variant]);
}
