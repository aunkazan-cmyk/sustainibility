/**
 * Analyses letterhead image rows to estimate CONTENT_BOX (pt on A4).
 * Run: npm run calibrate:matrix-letterhead
 */
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "public", "documents", "matrix-letterhead.png");
const A4_W = 595.28;
const A4_H = 841.89;

function rowLum(data, width, y, channels, xEndRatio = 0.75) {
  const x0 = Math.floor(width * 0.08);
  const x1 = Math.floor(width * xEndRatio);
  let sum = 0;
  let count = 0;
  for (let x = x0; x < x1; x++) {
    const i = (y * width + x) * channels;
    sum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    count++;
  }
  return sum / count;
}

function sustainedBrightFrom(scores, start, minRun, threshold) {
  let run = 0;
  for (let i = start; i < scores.length; i++) {
    if (scores[i].lum >= threshold) {
      run++;
      if (run >= minRun) return scores[i - minRun + 1].y;
    } else {
      run = 0;
    }
  }
  return null;
}

const { data, info } = await sharp(src)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const pxToPtY = (py) => A4_H - (py / height) * A4_H;
const pxToPtX = (px) => (px / width) * A4_W;

const scores = [];
for (let y = 0; y < height; y++) {
  scores.push({ y, lum: rowLum(data, width, y, channels) });
}

const headerEndPx =
  sustainedBrightFrom(scores, Math.floor(height * 0.06), 24, 252) ??
  Math.floor(height * 0.16);

let footerStartPx = Math.floor(height * 0.82);
for (let y = Math.floor(height * 0.72); y < height; y++) {
  if (scores[y].lum < 245) {
    footerStartPx = y;
    break;
  }
}

const leftPx = Math.floor(width * 0.07);
const rightPx = Math.floor(width * 0.93);

const contentBox = {
  top: Math.round(pxToPtY(headerEndPx)),
  bottom: Math.round(pxToPtY(footerStartPx)),
  left: Math.round(pxToPtX(leftPx)),
  right: Math.round(pxToPtX(rightPx)),
};

const ratio = width / height;
const a4Ratio = A4_W / A4_H;

console.log(
  JSON.stringify(
    {
      image: {
        width,
        height,
        ratio,
        a4Ratio,
        ratioOk: Math.abs(ratio - a4Ratio) < 0.02,
      },
      pixels: { headerEndPx, footerStartPx, leftPx, rightPx },
      contentBox,
      footerSafeY: contentBox.bottom + 12,
    },
    null,
    2,
  ),
);
