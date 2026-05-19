// Copy + resize mockup/source_img into public/images. Run: npm run images
import sharp from "sharp";
import { readdirSync, mkdirSync, writeFileSync, copyFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "mockup", "source_img");
const OUT = join(root, "public", "images");

/** Unique prefix of source filename → [relative out path, maxWidth] */
const MAP = [
  ["mainpage hero", "heroes/home-hero.jpg", 2400],
  [
    "Firefly_Premium corporate B2B website hero background",
    "heroes/water-hero.jpg",
    2400,
  ],
  [
    "Water droplet creating perfect circular ripples on calm water surface, navy blue tones",
    "textures/water-cta.jpg",
    1920,
  ],
  [
    "Water theme card background, abstract blue water waves",
    "cards/water-theme.jpg",
    1200,
  ],
  [
    "Sustainability theme card background, green leaves with water droplets",
    "cards/sustain-theme.jpg",
    1200,
  ],
  [
    "Photorealistic green leaves with water droplets on dark navy blue background",
    "heroes/sustain-hero.jpg",
 1600,
  ],
  [
    "Professional Turkish water management dashboard with Nexovia Flow logo, navy blue left sidebar with Turkish menu items including Panel",
    "screens/flow-dashboard-1.jpg",
    1400,
  ],
  [
    "Turkish water management dashboard interface with Nexovia Flow logo in top left corner",
    "screens/flow-dashboard-2.jpg",
    1400,
  ],
  [
    "Water efficiency dashboard with metric cards layout",
    "screens/flow-dashboard-3.jpg",
    1400,
  ],
  [
    "Photorealistic ADR hazmat tanker truck on highway at dusk",
    "cards/adr-theme.jpg",
    1200,
  ],
];

function resolveSource(prefix) {
  const files = readdirSync(SRC);
  const hit = files.find((f) => f.startsWith(prefix));
  if (!hit) throw new Error(`No source file matching: ${prefix}`);
  return hit;
}

async function processOne(srcPath, relOut, maxW) {
  const destPath = join(OUT, relOut);
  mkdirSync(dirname(destPath), { recursive: true });
  const img = sharp(srcPath).rotate();
  const meta = await img.metadata();
  const w = meta.width && meta.width > maxW ? maxW : undefined;
  await img
    .resize({ width: w, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(destPath);
  console.log("  ✓", relOut);
}

mkdirSync(OUT, { recursive: true });
console.log("Preparing mockup images…\n");

const STAGING = join(root, "mockup", "_staging");
mkdirSync(STAGING, { recursive: true });

const manifest = {};
let i = 0;
for (const [prefix, out, maxW] of MAP) {
  const file = resolveSource(prefix);
  const shortSrc = join(STAGING, `${i++}.src.jpg`);
  copyFileSync(join(SRC, file), shortSrc);
  await processOne(shortSrc, out, maxW);
  const key = out.replace(/\//g, "_").replace(/\.jpg$/, "");
  manifest[key] = `/images/${out}`;
}

// SVG hero + sustain CTA texture (copy as-is)
const SVG_COPY = [
  ["orman.svg", "heroes/sustain-forest.svg"],
];
for (const [name, relOut] of SVG_COPY) {
  const src = join(SRC, name);
  if (!existsSync(src)) {
    console.warn("  skip (missing):", name);
    continue;
  }
  const dest = join(OUT, relOut);
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(src, dest);
  manifest[relOut.replace(/\//g, "_").replace(/\.svg$/, "")] = `/images/${relOut}`;
  console.log("  ✓", relOut, "(svg copy)");
}

// Sustain CTA from card theme jpg
const sustainCtaSrc = resolveSource("Sustainability theme card background");
const sustainCtaShort = join(STAGING, "sustain-cta.src.jpg");
copyFileSync(join(SRC, sustainCtaSrc), sustainCtaShort);
await processOne(sustainCtaShort, "textures/sustain-cta.jpg", 1920);
manifest.textures_sustain_cta = "/images/textures/sustain-cta.jpg";

writeFileSync(join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log("\nDone.");
