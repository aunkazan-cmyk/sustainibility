/**
 * Extract Ek-1 NACE list from mavibelge.pdf pages 86–89 into src/data/nace-ek1.json.
 * Run: node scripts/build-nace-ek1-from-pdf.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const pdfPath = path.join(root, "mavibelge.pdf");
const outPath = path.join(root, "src", "data", "nace-ek1.json");

async function main() {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjs.getDocument({ data }).promise;

  let text = "";
  for (const p of [86, 87, 88, 89]) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    text += content.items.map((i) => i.str).join(" ") + " ";
  }

  // Rows: No CODE ACTIVITY STATUS (YÜKÜMLÜ | GÖNÜLLÜ)
  const re =
    /(\d+)\s+(\d{2}\.\d{2})\s+(.+?)\s+(YÜKÜMLÜ|GÖNÜLLÜ)/g;
  const entries = [];
  let m;
  while ((m = re.exec(text)) !== null) {
    entries.push({
      no: Number(m[1]),
      code: m[2],
      activityTr: m[3].replace(/\s+/g, " ").trim(),
      status: m[4] === "YÜKÜMLÜ" ? "YUKUMLU" : "GONULLU",
    });
  }

  if (entries.length !== 133) {
    console.warn(`Expected 133 entries, got ${entries.length}`);
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(entries, null, 2) + "\n", "utf8");
  console.log(`Wrote ${entries.length} entries to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
