/**
 * Generates sample matrix PDFs for letterhead QA.
 * Run: npm run sample:matrix-pdf
 * Calibration overlay: MATRIX_PDF_CALIBRATE=1 npm run sample:matrix-pdf
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { buildMatrixPdf } from "../src/lib/matrix-pdf";
import { evaluateMatrixMulti } from "../src/lib/water-efficiency-matrix";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "tmp", "matrix-pdf-samples");

const sampleCodes = [
  ["10.12"],
  ["10.12", "03.12", "17.21", "20.41", "23.51"],
  [
    "10.12",
    "10.13",
    "10.31",
    "10.32",
    "10.41",
    "10.51",
    "10.61",
    "10.71",
    "10.81",
    "10.91",
  ],
];

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  for (const codes of sampleCodes) {
    const evaluation = evaluateMatrixMulti(
      "industrial",
      75,
      codes.map((naceCode) => ({ naceCode })),
    );
    if (!evaluation) {
      throw new Error(`Evaluation failed for ${codes.length} rows`);
    }

    const pdf = await buildMatrixPdf({
      locale: "tr",
      company: "Örnek Sanayi A.Ş.",
      recipientName: "Kalite Müdürü",
      evaluation,
    });

    const name = `matrix-sample-${codes.length}-activities.pdf`;
    fs.writeFileSync(path.join(outDir, name), pdf);
    console.log(`Wrote ${name} (${pdf.length} bytes)`);
  }

  const osbEval = evaluateMatrixMulti("osb", undefined, []);
  if (!osbEval) throw new Error("OSB evaluation failed");
  const osbPdf = await buildMatrixPdf({
    locale: "tr",
    company: "Örnek OSB Firma Ltd.",
    recipientName: "Üst Yönetim",
    evaluation: osbEval,
  });
  fs.writeFileSync(path.join(outDir, "matrix-sample-osb.pdf"), osbPdf);
  console.log(`Wrote matrix-sample-osb.pdf (${osbPdf.length} bytes)`);
  console.log(`Output: ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
