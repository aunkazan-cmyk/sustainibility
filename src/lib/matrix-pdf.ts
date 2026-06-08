import "server-only";
import fs from "fs";
import path from "path";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import type { Locale } from "@/lib/site";
import { ORG_EMAIL, SITE_NAME } from "@/lib/site";
import {
  buildResultSummary,
  facilityTypeLabel,
  statusLabel,
  type MatrixResult,
} from "@/lib/water-efficiency-matrix";
import { langOf } from "@/i18n/getDictionary";

export interface MatrixPdfInput {
  locale: Locale;
  company: string;
  recipientName: string;
  result: MatrixResult;
}

const DISCLAIMER_TR =
  "Bu belge bilgilendirme amaçlı bir taslaktır; resmi başvuru yerine geçmez. Nihai yükümlülük, Su Verimliliği Yönetmeliği, ilgili kılavuzlar ve yetkili kurum değerlendirmesine tabidir.";
const DISCLAIMER_EN =
  "This document is an informational draft only; it does not replace an official application. Final obligations depend on the Water Efficiency Regulation, applicable guides and the competent authority.";

function fontPath(name: string) {
  return path.join(process.cwd(), "public", "fonts", name);
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars) {
      if (line) lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export async function buildMatrixPdf(input: MatrixPdfInput): Promise<Uint8Array> {
  const lang = langOf(input.locale);
  const { result, company, recipientName } = input;
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);

  const regularBytes = fs.readFileSync(fontPath("NotoSans-Regular.ttf"));
  const boldBytes = fs.readFileSync(fontPath("NotoSans-Bold.ttf"));
  const font = await pdf.embedFont(regularBytes);
  const fontBold = await pdf.embedFont(boldBytes);

  const page = pdf.addPage([595.28, 841.89]);
  const margin = 50;
  let y = 780;
  const navy = rgb(0.02, 0.05, 0.2);
  const muted = rgb(0.35, 0.4, 0.48);

  const draw = (text: string, size: number, bold = false, color = navy) => {
    page.drawText(text, {
      x: margin,
      y,
      size,
      font: bold ? fontBold : font,
      color,
    });
    y -= size + 8;
  };

  const drawParagraph = (text: string, size = 11) => {
    for (const line of wrapText(text, 88)) {
      if (y < 80) break;
      page.drawText(line, { x: margin, y, size, font, color: navy });
      y -= size + 6;
    }
    y -= 6;
  };

  const title =
    lang === "TR"
      ? "Su Verimliliği Yükümlülük Değerlendirme Taslağı"
      : "Water Efficiency Obligation Assessment Draft";
  draw(SITE_NAME, 14, true);
  draw(title, 18, true);
  y -= 4;
  draw(
    `${lang === "TR" ? "Tarih" : "Date"}: ${new Date().toLocaleDateString(lang === "TR" ? "tr-TR" : "en-GB")}`,
    10,
    false,
    muted,
  );
  y -= 10;

  draw(lang === "TR" ? "Şirket" : "Company", 11, true);
  drawParagraph(company);
  draw(lang === "TR" ? "Raporu alan" : "Report recipient", 11, true);
  drawParagraph(recipientName);

  draw(lang === "TR" ? "Değerlendirme girdileri" : "Assessment inputs", 12, true);
  drawParagraph(
    `${lang === "TR" ? "Tesis türü" : "Facility type"}: ${facilityTypeLabel(result.facilityType, lang)}`,
  );
  if (result.naceEntry) {
    drawParagraph(
      `NACE: ${result.naceEntry.code} — ${result.naceEntry.activityTr}`,
    );
  }
  if (result.employeeCount != null) {
    drawParagraph(
      `${lang === "TR" ? "Çalışan sayısı" : "Employee count"}: ${result.employeeCount}`,
    );
  }

  y -= 4;
  draw(lang === "TR" ? "Sonuç" : "Result", 12, true);
  draw(statusLabel(result.status, lang), 16, true);
  y -= 4;
  drawParagraph(buildResultSummary(result, lang));

  y -= 8;
  draw(lang === "TR" ? "Referans" : "Reference", 11, true);
  drawParagraph(
    lang === "TR"
      ? "Su Verimliliği Yönetmeliği; Endüstriyel Su Verimliliği / Mavi Su Verimliliği Belgesi Başvuru Kılavuzu Ek-1 (4 haneli NACE listesi); kılavuz s.15 yükümlü-gönüllü matrisi."
      : "Water Efficiency Regulation; Industrial Water Efficiency / Blue Certificate Application Guide Annex-1 (4-digit NACE list); guide p.15 obligation matrix.",
  );

  y -= 8;
  draw(lang === "TR" ? "Uyarı" : "Disclaimer", 11, true);
  drawParagraph(lang === "TR" ? DISCLAIMER_TR : DISCLAIMER_EN);

  y -= 8;
  drawParagraph(
    lang === "TR"
      ? `Danışmanlık ve uygulama desteği: ${ORG_EMAIL} · nexovia.com.tr`
      : `Consulting support: ${ORG_EMAIL} · nexovia.com.tr`,
  );

  return pdf.save();
}
