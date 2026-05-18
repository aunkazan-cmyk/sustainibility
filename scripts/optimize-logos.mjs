// One-time logo prep. The brand logo SVGs are Canva exports: a base64 PNG
// (dark navy wordmark + cyan swirl) with a BAKED-IN white raster background
// and no alpha channel — so removing the SVG's white <rect> alone does
// nothing. We extract the embedded PNG, chroma-key the near-white field to
// transparent, trim, and downscale to a tiny header-size PNG. Source is
// nexovia-logo-light.svg (per request); the result is transparent so it sits
// cleanly on the white header.
//
// Run: node scripts/optimize-logos.mjs   (also `npm run logos`)
import sharp from "sharp";
import { readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "public", "logos");
const OUT = join(root, "public", "logos", "optimized");
mkdirSync(OUT, { recursive: true });

// All-channels-above-this counts as background → fully transparent. The art
// (navy ~[9,24,67], saturated cyan) stays well clear of this; ~off-white
// anti-alias halo is removed for a clean edge.
const WHITE = 238;

function extractEmbeddedPng(svgPath) {
  const svg = readFileSync(svgPath, "utf8");
  const m = svg.match(/(?:xlink:href|href)="data:image\/png;base64,([A-Za-z0-9+/=]+)"/);
  if (!m) throw new Error(`No embedded PNG in ${svgPath}`);
  return Buffer.from(m[1], "base64");
}

const jobs = [
  { in: "nexovia-logo-light.svg", out: "nexovia-logo-light.png" },
  { in: "nexovia-logo.svg", out: "nexovia-logo.png" },
];

for (const job of jobs) {
  try {
    const png = extractEmbeddedPng(join(SRC, job.in));
    const { data, info } = await sharp(png)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += 4) {
      if (data[i] >= WHITE && data[i + 1] >= WHITE && data[i + 2] >= WHITE) {
        data[i + 3] = 0; // make the white field transparent
      }
    }

    const keyed = await sharp(data, {
      raw: { width: info.width, height: info.height, channels: 4 },
    })
      .png()
      .toBuffer();

    // Trim the transparent border once; reuse for the wide header logo and
    // (for the light variant) the square brand-mark favicon.
    const trimmed = await sharp(keyed).trim().png().toBuffer({
      resolveWithObject: true,
    });

    const final = await sharp(trimmed.data)
      .resize({ height: 120, fit: "inside", withoutEnlargement: false })
      .png({ compressionLevel: 9, palette: true })
      .toBuffer({ resolveWithObject: true });

    await sharp(final.data).toFile(join(OUT, job.out));
    console.log(
      `✓ ${job.out}  ${final.info.width}x${final.info.height}  ${(final.info.size / 1024).toFixed(1)} KB  (transparent)`,
    );

    // Favicon ("window logo") = the brand mark (left square of the lockup).
    if (job.in === "nexovia-logo-light.svg") {
      const H = trimmed.info.height;
      const mark = await sharp(trimmed.data)
        .extract({ left: 0, top: 0, width: H, height: H })
        .resize(256, 256, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png({ compressionLevel: 9, effort: 10 })
        .toBuffer();
      // App Router favicon conventions: icon.png (any size) + icon.svg if
      // wanted. We ship a 512 PNG; Next derives the <link> tags.
      await sharp(mark).toFile(join(root, "src", "app", "icon.png"));
      console.log("✓ src/app/icon.png  256x256  (Nexovia mark favicon)");

      // Footer wants the SAME lockup as the navbar, but the art is dark navy
      // and the footer is dark — so emit a clean white monochrome version
      // (standard logo-on-dark treatment): tint every visible pixel white,
      // keep alpha for smooth edges.
      const white = Buffer.from(data);
      for (let i = 0; i < white.length; i += 4) {
        if (white[i + 3] !== 0) {
          white[i] = 255;
          white[i + 1] = 255;
          white[i + 2] = 255;
        }
      }
      const footer = await sharp(white, {
        raw: { width: info.width, height: info.height, channels: 4 },
      })
        .trim()
        .resize({ height: 120, fit: "inside", withoutEnlargement: false })
        .png({ compressionLevel: 9 })
        .toBuffer({ resolveWithObject: true });
      await sharp(footer.data).toFile(join(OUT, "nexovia-logo-footer.png"));
      console.log(
        `✓ nexovia-logo-footer.png  ${footer.info.width}x${footer.info.height}  ${(footer.info.size / 1024).toFixed(1)} KB  (white, for dark footer)`,
      );
    }
  } catch (err) {
    console.error(`✗ ${job.in} failed:`, err.message);
    process.exitCode = 1;
  }
}
