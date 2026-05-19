/**
 * Parses mockup/nexovia_icgoruler_makaleleri.md into src/i18n/insights-generated-tr.json
 * Run: node scripts/build-insights-from-mockup.mjs
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const md = fs.readFileSync(
  path.join(root, "mockup/nexovia_icgoruler_makaleleri.md"),
  "utf8",
);

const articleBlocks = md.split(/\n(?=# \d+\. )/);

const slugMap = {
  "Su Verimliliği Etüdü Nasıl Yapılır?": {
    id: "waterAudit",
    slugTr: "su-verimliligi-etudu",
    slugEn: "water-efficiency-audit",
    image: "/insights/water-reporting.svg",
    tag: "Su",
    type: "Rehber",
    date: "Mart 2026",
  },
  "ISO 46001 İşletmelere Ne Kazandırır?": {
    id: "iso46001",
    slugTr: "iso-46001-hazirligi",
    slugEn: "iso-46001-readiness",
    image: "/insights/iso46001.svg",
    tag: "Mevzuat",
    type: "Rehber",
    date: "Mart 2026",
  },
  "ESG Raporlamasında Hangi Çevresel Veriler İzlenmelidir?": {
    id: "esgEnvData",
    slugTr: "esg-cevresel-veriler",
    slugEn: "esg-environmental-data",
    image: "/insights/esg-chain.svg",
    tag: "ESG",
    type: "Makale",
    date: "Şubat 2026",
  },
  "Tesislerde Su Tüketimi Nasıl Sınıflandırılır?": {
    id: "waterClassification",
    slugTr: "su-tuketimi-siniflandirma",
    slugEn: "water-consumption-classification",
    image: "/insights/water-reporting.svg",
    tag: "Su",
    type: "Rehber",
    date: "Şubat 2026",
  },
  "Minimum Gece Akışı Testi Nedir?": {
    id: "minNightFlow",
    slugTr: "minimum-gece-akisi",
    slugEn: "minimum-night-flow",
    image: "/insights/water-reporting.svg",
    tag: "Su",
    type: "Rehber",
    date: "Ocak 2026",
  },
  "ADR/TMGD Süreçlerinde Dijital Belge Takibi Neden Önemlidir?": {
    id: "digitalDocTracking",
    slugTr: "dijital-belge-takibi",
    slugEn: "digital-document-tracking",
    image: "/insights/tmgd.svg",
    tag: "ADR",
    type: "Rehber",
    date: "Ocak 2026",
  },
  "SDS/MSDS Takibi Nasıl Sistematik Hale Getirilir?": {
    id: "sdsMsds",
    slugTr: "sds-msds-takibi",
    slugEn: "sds-msds-tracking",
    image: "/insights/adr-changes.svg",
    tag: "ADR",
    type: "Rehber",
    date: "Ocak 2026",
  },
  "Denetim Hazırlığında Dijital Kontrol Listeleri Nasıl Kullanılır?": {
    id: "auditChecklists",
    slugTr: "dijital-kontrol-listeleri",
    slugEn: "digital-audit-checklists",
    image: "/insights/tmgd.svg",
    tag: "ADR",
    type: "Rehber",
    date: "Aralık 2025",
  },
  "Su Verimliliği Yazılımı İşletmelere Ne Sağlar?": {
    id: "waterSoftware",
    slugTr: "su-verimliligi-yazilimi",
    slugEn: "water-efficiency-software",
    image: "/insights/iso46001.svg",
    tag: "Platform",
    type: "Makale",
    date: "Aralık 2025",
  },
  "ADR/TMGD Süreçlerinde Dijital Platform Kullanımı Hangi Riskleri Azaltır?": {
    id: "adrPlatformRisks",
    slugTr: "adr-platform-riskleri",
    slugEn: "adr-platform-risks",
    image: "/insights/adr-changes.svg",
    tag: "ADR",
    type: "Makale",
    date: "Kasım 2025",
  },
  "Kurumsal Sürdürülebilirlik Yol Haritası Nasıl Hazırlanır?": {
    id: "sustainRoadmap",
    slugTr: "surdurulebilirlik-yol-haritasi",
    slugEn: "sustainability-roadmap",
    image: "/insights/measure-first.svg",
    tag: "Sürdürülebilirlik",
    type: "Rehber",
    date: "Kasım 2025",
  },
  "Su Verimliliği ve Sürdürülebilirlik Arasındaki Bağlantı": {
    id: "waterSustainLink",
    slugTr: "su-ve-surdurulebilirlik",
    slugEn: "water-and-sustainability",
    image: "/insights/esg-chain.svg",
    tag: "Sürdürülebilirlik",
    type: "Makale",
    date: "Ekim 2025",
  },
};

function parseArticle(block) {
  const titleMatch = block.match(/^# \d+\. (.+)$/m);
  if (!titleMatch) return null;
  const title = titleMatch[1].trim();
  const meta = slugMap[title];
  if (!meta) {
    console.warn("No slug map for:", title);
    return null;
  }

  const leadMatch = block.match(/## Kısa Özet\n+([\s\S]*?)(?=\n## )/);
  const lead = leadMatch
    ? leadMatch[1].trim().replace(/\n+/g, " ")
    : "";

  const body = block.replace(/^# \d+\. .+\n+/m, "");
  const sectionParts = body.split(/\n(?=## )/);
  const sections = [];
  for (const part of sectionParts) {
    const hMatch = part.match(/^## (.+)/);
    if (!hMatch) continue;
    const h = hMatch[1].trim();
    if (h === "Kısa Özet") continue;
    const paras = part
      .replace(/^## .+\n+/, "")
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter((p) => p && !p.startsWith("#"));
    if (paras.length) sections.push({ h, p: paras });
  }

  return {
    ...meta,
    title,
    lead,
    sections,
    references: [
      "Genel bilgilendirme amaçlıdır; bağlayıcı gereklilikler için yürürlükteki mevzuat ve standart metinleri esas alınmalıdır.",
    ],
  };
}

const articles = {};
for (const block of articleBlocks) {
  const a = parseArticle(block);
  if (a) articles[a.id] = a;
}

const outPath = path.join(root, "src/i18n/insights-generated-tr.json");
fs.writeFileSync(outPath, JSON.stringify(articles, null, 2), "utf8");
console.log("Wrote", Object.keys(articles).length, "articles to", outPath);
