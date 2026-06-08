import "server-only";
import fs from "fs";
import path from "path";
import {
  PDFDocument,
  rgb,
  type PDFImage,
  type PDFPage,
  type PDFFont,
} from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import type { Locale } from "@/lib/site";
import { ORG_EMAIL } from "@/lib/site";
import {
  buildMultiResultSummary,
  buildRowSummary,
  facilityTypeLabel,
  statusLabel,
  type MatrixEvaluation,
} from "@/lib/water-efficiency-matrix";
import { langOf } from "@/i18n/getDictionary";
import {
  CONTENT_BOX,
  FOOTER_SAFE_Y,
  LETTERHEAD_RELATIVE_PATH,
  LOGO_RELATIVE_PATH,
} from "@/lib/matrix-pdf-letterhead";

export interface MatrixPdfInput {
  locale: Locale;
  company: string;
  recipientName: string;
  evaluation: MatrixEvaluation;
}

const DISCLAIMER_TR =
  "Bu belge bilgilendirme amaçlı bir taslaktır; resmi başvuru yerine geçmez. Nihai yükümlülük, Su Verimliliği Yönetmeliği, ilgili kılavuzlar ve yetkili kurum değerlendirmesine tabidir.";
const DISCLAIMER_EN =
  "This document is an informational draft only; it does not replace an official application. Final obligations depend on the Water Efficiency Regulation, applicable guides and the competent authority.";

const navy = rgb(0.02, 0.05, 0.2);
const muted = rgb(0.35, 0.4, 0.48);
const lineColor = rgb(0.85, 0.87, 0.9);

function assetPath(relative: string) {
  return path.join(process.cwd(), relative);
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

class PdfWriter {
  private y: number;
  private page: PDFPage;
  private letterhead: PDFImage | null;

  constructor(
    private pdf: PDFDocument,
    page: PDFPage,
    letterhead: PDFImage | null,
    private font: PDFFont,
    private fontBold: PDFFont,
    private useLetterhead: boolean,
  ) {
    this.page = page;
    this.letterhead = letterhead;
    this.y = useLetterhead ? CONTENT_BOX.top : 780;
    this.paintBackground();
  }

  private paintBackground() {
    if (this.letterhead) {
      const { width, height } = this.page.getSize();
      this.page.drawImage(this.letterhead, {
        x: 0,
        y: 0,
        width,
        height,
      });
    }
  }

  private ensureSpace(needed: number) {
    const minY = this.useLetterhead ? CONTENT_BOX.bottom : FOOTER_SAFE_Y;
    if (this.y - needed >= minY) return;
    this.page = this.pdf.addPage([595.28, 841.89]);
    this.y = this.useLetterhead ? CONTENT_BOX.top : 780;
    this.paintBackground();
  }

  drawLine(size: number, text: string, bold = false, color = navy) {
    this.ensureSpace(size + 10);
    this.page.drawText(text, {
      x: CONTENT_BOX.left,
      y: this.y,
      size,
      font: bold ? this.fontBold : this.font,
      color,
    });
    this.y -= size + 8;
  }

  drawParagraph(text: string, size = 10) {
    for (const line of wrapText(text, 92)) {
      this.ensureSpace(size + 8);
      this.page.drawText(line, {
        x: CONTENT_BOX.left,
        y: this.y,
        size,
        font: this.font,
        color: navy,
      });
      this.y -= size + 5;
    }
    this.y -= 4;
  }

  drawRule() {
    this.ensureSpace(12);
    this.page.drawLine({
      start: { x: CONTENT_BOX.left, y: this.y },
      end: { x: CONTENT_BOX.right, y: this.y },
      thickness: 0.75,
      color: lineColor,
    });
    this.y -= 14;
  }

  drawHeader(
    title: string,
    dateLabel: string,
    logo: PDFImage | null,
  ) {
    if (this.useLetterhead) {
      this.drawLine(16, title, true);
      this.drawLine(10, dateLabel, false, muted);
      this.drawRule();
      return;
    }

    if (logo) {
      const logoWidth = 120;
      const scale = logoWidth / logo.width;
      const logoHeight = logo.height * scale;
      this.page.drawImage(logo, {
        x: CONTENT_BOX.left,
        y: this.y - logoHeight + 10,
        width: logoWidth,
        height: logoHeight,
      });
      const titleX = CONTENT_BOX.left + logoWidth + 20;
      this.page.drawText(title, {
        x: titleX,
        y: this.y - 4,
        size: 14,
        font: this.fontBold,
        color: navy,
        maxWidth: CONTENT_BOX.right - titleX,
      });
      this.page.drawText(dateLabel, {
        x: titleX,
        y: this.y - 22,
        size: 9,
        font: this.font,
        color: muted,
      });
      this.y -= logoHeight + 16;
    } else {
      this.drawLine(14, "Nexovia", true);
      this.drawLine(16, title, true);
      this.drawLine(10, dateLabel, false, muted);
    }
    this.drawRule();
  }

  drawMetaGrid(
    lang: "TR" | "EN",
    company: string,
    recipient: string,
    facility: string,
    employees: string,
  ) {
    const l = (tr: string, en: string) => (lang === "TR" ? tr : en);
    this.drawLine(11, l("Şirket", "Company"), true);
    this.drawParagraph(company);
    this.drawLine(11, l("Raporu alan", "Report recipient"), true);
    this.drawParagraph(recipient);
    this.drawLine(11, l("Tesis türü", "Facility type"), true);
    this.drawParagraph(facility);
    this.drawLine(11, l("Çalışan sayısı", "Employee count"), true);
    this.drawParagraph(employees);
    this.y -= 4;
  }

  drawActivityTable(
    lang: "TR" | "EN",
    evaluation: MatrixEvaluation,
  ) {
    const l = (tr: string, en: string) => (lang === "TR" ? tr : en);
    this.drawLine(12, l("Faaliyet değerlendirme tablosu", "Activity assessment table"), true);

    const colNace = CONTENT_BOX.left;
    const colActivity = CONTENT_BOX.left + 52;
    const colStatus = CONTENT_BOX.right - 90;
    const rowH = 14;

    this.ensureSpace(rowH + 4);
    this.page.drawText(l("NACE", "NACE"), {
      x: colNace,
      y: this.y,
      size: 9,
      font: this.fontBold,
      color: muted,
    });
    this.page.drawText(l("Faaliyet", "Activity"), {
      x: colActivity,
      y: this.y,
      size: 9,
      font: this.fontBold,
      color: muted,
    });
    this.page.drawText(l("Sonuç", "Result"), {
      x: colStatus,
      y: this.y,
      size: 9,
      font: this.fontBold,
      color: muted,
    });
    this.y -= rowH;

    for (const row of evaluation.rows) {
      const activity =
        row.naceEntry?.activityTr ??
        (lang === "TR" ? "Tanımsız / Ek-1 dışı" : "Undefined / outside Annex-1");
      const code = row.inputNaceCode || row.naceEntry?.code || "—";
      const status = statusLabel(row.status, lang);

      const activityLines = wrapText(activity, 52);
      const blockH = Math.max(rowH, activityLines.length * 11 + 4);
      this.ensureSpace(blockH);

      this.page.drawText(code, {
        x: colNace,
        y: this.y,
        size: 9,
        font: this.font,
        color: navy,
      });

      let ay = this.y;
      for (const al of activityLines) {
        this.page.drawText(al, {
          x: colActivity,
          y: ay,
          size: 9,
          font: this.font,
          color: navy,
        });
        ay -= 11;
      }

      this.page.drawText(status, {
        x: colStatus,
        y: this.y,
        size: 9,
        font: this.fontBold,
        color: navy,
      });

      this.y -= blockH + 2;
      this.page.drawLine({
        start: { x: CONTENT_BOX.left, y: this.y + 2 },
        end: { x: CONTENT_BOX.right, y: this.y + 2 },
        thickness: 0.4,
        color: lineColor,
      });
    }

    this.y -= 8;
  }
}

export async function buildMatrixPdf(input: MatrixPdfInput): Promise<Uint8Array> {
  const lang = langOf(input.locale);
  const { evaluation, company, recipientName } = input;
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);

  const regularBytes = fs.readFileSync(
    assetPath(path.join("public", "fonts", "NotoSans-Regular.ttf")),
  );
  const boldBytes = fs.readFileSync(
    assetPath(path.join("public", "fonts", "NotoSans-Bold.ttf")),
  );
  const font = await pdf.embedFont(regularBytes);
  const fontBold = await pdf.embedFont(boldBytes);

  const letterheadPath = assetPath(LETTERHEAD_RELATIVE_PATH);
  const useLetterhead = fs.existsSync(letterheadPath);
  const letterhead = useLetterhead
    ? await pdf.embedPng(fs.readFileSync(letterheadPath))
    : null;

  let logo: PDFImage | null = null;
  const logoPath = assetPath(LOGO_RELATIVE_PATH);
  if (fs.existsSync(logoPath)) {
    logo = await pdf.embedPng(fs.readFileSync(logoPath));
  }

  const page = pdf.addPage([595.28, 841.89]);
  const writer = new PdfWriter(pdf, page, letterhead, font, fontBold, useLetterhead);

  const title =
    lang === "TR"
      ? "Su Verimliliği Yükümlülük Değerlendirme Taslağı"
      : "Water Efficiency Obligation Assessment Draft";
  const dateLabel = `${lang === "TR" ? "Tarih" : "Date"}: ${new Date().toLocaleDateString(lang === "TR" ? "tr-TR" : "en-GB")}`;

  writer.drawHeader(title, dateLabel, logo);

  writer.drawMetaGrid(
    lang,
    company,
    recipientName,
    facilityTypeLabel(evaluation.facilityType, lang),
    evaluation.employeeCount != null ? String(evaluation.employeeCount) : "—",
  );

  if (evaluation.facilityType === "industrial") {
    writer.drawActivityTable(lang, evaluation);
  }

  writer.drawLine(
    12,
    lang === "TR" ? "Genel sonuç" : "Overall result",
    true,
  );
  writer.drawLine(14, statusLabel(evaluation.headlineStatus, lang), true);
  writer.drawParagraph(buildMultiResultSummary(evaluation, lang));

  if (evaluation.facilityType === "industrial") {
    for (const row of evaluation.rows) {
      writer.drawParagraph(buildRowSummary(row, lang));
    }
  }

  writer.drawLine(11, lang === "TR" ? "Referans" : "Reference", true);
  writer.drawParagraph(
    lang === "TR"
      ? "Su Verimliliği Yönetmeliği; Endüstriyel Su Verimliliği / Mavi Su Verimliliği Belgesi Başvuru Kılavuzu Ek-1 (4 haneli NACE listesi); kılavuz s.15 yükümlü-gönüllü matrisi."
      : "Water Efficiency Regulation; Industrial Water Efficiency / Blue Certificate Application Guide Annex-1 (4-digit NACE list); guide p.15 obligation matrix.",
  );

  writer.drawLine(11, lang === "TR" ? "Uyarı" : "Disclaimer", true);
  writer.drawParagraph(lang === "TR" ? DISCLAIMER_TR : DISCLAIMER_EN);
  writer.drawParagraph(
    lang === "TR"
      ? `Danışmanlık ve uygulama desteği: ${ORG_EMAIL} · nexovia.com.tr`
      : `Consulting support: ${ORG_EMAIL} · nexovia.com.tr`,
  );

  return pdf.save();
}
