// Self-hosted via next/font — no CDN request, no layout shift. latin-ext is
// required for Turkish glyphs (ş ğ İ ı ö ü ç). All three are variable fonts,
// so no explicit weight list is needed. Exposed as CSS vars consumed by
// --nx-font-* in globals.css.
// Mono is intentionally NOT a web font: it's used only for small captions
// (e.g. "S/01", "FIG. 01"); a system stack avoids a third font download
// competing for bandwidth with the critical display/body fonts (improves
// throttled-mobile LCP). See globals.css --nx-font-mono.
import { Manrope, Newsreader } from "next/font/google";

export const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-manrope",
});

// Newsreader carries the editorial display + the prototype's italic <em>.
export const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

export const fontVariables = `${manrope.variable} ${newsreader.variable}`;
