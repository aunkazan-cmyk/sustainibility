import path from "path";

/** Optional full-page letterhead asset (add when design is ready). */
export const LETTERHEAD_RELATIVE_PATH = path.join(
  "public",
  "documents",
  "matrix-letterhead.png",
);

/** Text safe area on A4 when letterhead is present (pt, origin bottom-left). */
export const CONTENT_BOX = {
  top: 720,
  left: 50,
  right: 545,
  bottom: 80,
};

export const FOOTER_SAFE_Y = 100;

export const LOGO_RELATIVE_PATH = path.join(
  "public",
  "logos",
  "optimized",
  "nexovia-logo.png",
);
