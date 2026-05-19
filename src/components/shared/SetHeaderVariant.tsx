"use client";
import { useEffect } from "react";

export type HeaderVariant = "light" | "on-dark";

export function SetHeaderVariant({ variant }: { variant: HeaderVariant }) {
  useEffect(() => {
    document.documentElement.dataset.nxHeader = variant;
    return () => {
      delete document.documentElement.dataset.nxHeader;
    };
  }, [variant]);
  return null;
}
