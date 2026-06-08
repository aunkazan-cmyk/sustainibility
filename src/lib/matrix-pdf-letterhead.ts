import path from "path";

/** Full-page letterhead asset for matrix PDF reports. */
export const LETTERHEAD_RELATIVE_PATH = path.join(
  "public",
  "documents",
  "matrix-letterhead.png",
);

/**
 * Text safe area on A4 when letterhead is present (pt, origin bottom-left).
 * Base calibration: npm run calibrate:matrix-letterhead (724×1024).
 * top manually adjusted −28 pt (~1 cm) below auto-detected header line.
 */
export const CONTENT_BOX = {
  top: 708,
  left: 41,
  right: 553,
  bottom: 170,
};

export const FOOTER_SAFE_Y = 100;

export const LOGO_RELATIVE_PATH = path.join(
  "public",
  "logos",
  "optimized",
  "nexovia-logo.png",
);

/** Set MATRIX_PDF_CALIBRATE=1 to draw CONTENT_BOX guides on generated PDFs. */
export const SHOW_CALIBRATION_OVERLAY =
  process.env.MATRIX_PDF_CALIBRATE === "1";
