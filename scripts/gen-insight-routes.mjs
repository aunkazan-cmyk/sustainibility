import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const data = JSON.parse(
  fs.readFileSync(path.join(root, "src/i18n/insights-generated-tr.json"), "utf8"),
);

const order = [
  "iso46001",
  "esgEnvData",
  "digitalDocTracking",
  "waterAudit",
  "waterClassification",
  "minNightFlow",
  "sdsMsds",
  "auditChecklists",
  "waterSoftware",
  "adrPlatformRisks",
  "sustainRoadmap",
  "waterSustainLink",
];

function pageKey(id) {
  return "insight" + id.charAt(0).toUpperCase() + id.slice(1);
}

const keys = order.map(pageKey);
console.log("PageKeys:", keys.join(" | "));

const defs = order.map((id) => {
  const g = data[id];
  const key = pageKey(id);
  return `  {
    key: "${key}",
    segments: {
      tr: ["icgoruler", "${g.slugTr}"],
      en: ["insights", "${g.slugEn}"],
    },
    renderer: "insightArticle",
    jsonLd: ["Breadcrumb", "Article"],
    sitemap: { priority: 0.6, changeFrequency: "monthly" },
    insightId: "${id}",
  },`;
});

console.log(defs.join("\n"));
