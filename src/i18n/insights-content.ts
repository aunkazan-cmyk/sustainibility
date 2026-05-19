// Insight articles — TR body from mockup/nexovia_icgoruler_makaleleri.md (generated JSON).
// EN: full articles for key pieces; others use TR structure with English title/lead stubs.
import type { InsightId } from "@/lib/routes";
import type { LangCode } from "./getDictionary";
import generatedTr from "./insights-generated-tr.json";

export interface Article {
  tag: string;
  type: string;
  date: string;
  title: string;
  lead: string;
  image: string;
  sections: { h: string; p: string[] }[];
  references: string[];
}

type GeneratedEntry = (typeof generatedTr)[keyof typeof generatedTr];

function fromGenerated(g: GeneratedEntry): Article {
  return {
    tag: g.tag,
    type: g.type,
    date: g.date,
    title: g.title,
    lead: g.lead,
    image: g.image,
    sections: g.sections,
    references: g.references,
  };
}

const TR = Object.fromEntries(
  Object.entries(generatedTr).map(([id, entry]) => [id, fromGenerated(entry)]),
) as Record<InsightId, Article>;

const EN_TITLES: Partial<Record<InsightId, string>> = {
  waterAudit: "How to conduct a water-efficiency audit",
  iso46001: "What ISO 46001 brings to facilities",
  esgEnvData: "Which environmental data to track for ESG reporting",
  waterClassification: "How to classify water use in facilities",
  minNightFlow: "What is minimum night flow testing?",
  digitalDocTracking: "Why digital document tracking matters in ADR/TMGD",
  sdsMsds: "How to systematise SDS/MSDS tracking",
  auditChecklists: "Using digital checklists for inspection readiness",
  waterSoftware: "What water-efficiency software provides",
  adrPlatformRisks: "Risks reduced by digital ADR/TMGD platforms",
  sustainRoadmap: "How to prepare a corporate sustainability roadmap",
  waterSustainLink: "The link between water efficiency and sustainability",
};

function enFromTr(id: InsightId, tr: Article): Article {
  const title = EN_TITLES[id] ?? tr.title;
  return {
    ...tr,
    title,
    tag: tr.tag === "Mevzuat" ? "Regulation" : tr.tag === "Su" ? "Water" : tr.tag === "ADR" ? "ADR" : tr.tag === "Platform" ? "Platform" : tr.tag,
    type: tr.type === "Rehber" ? "Guide" : "Article",
    sections: tr.sections.slice(0, 5).map((s) => ({
      h: s.h,
      p: [s.p[0] ?? ""].filter(Boolean),
    })),
    references: tr.references.map((r) =>
      r.includes("Genel bilgilendirme")
        ? "General information only; refer to applicable legislation and standards."
        : r,
    ),
  };
}

const EN: Record<InsightId, Article> = {
  iso46001: {
    tag: "Regulation",
    type: "Guide",
    date: "Mar 2026",
    title: "What ISO 46001 brings to facilities",
    lead: "ISO 46001 is an international standard for water efficiency management systems. This note outlines core preparation steps at facility level.",
    image: "/insights/iso46001.svg",
    sections: TR.iso46001.sections.slice(0, 6).map((s) => ({
      h: s.h,
      p: s.p.slice(0, 2),
    })),
    references: [
      "ISO 46001 — Water efficiency management systems (ISO)",
      "ISO management-system harmonized structure (Annex SL)",
    ],
  },
  esgEnvData: {
    tag: "ESG",
    type: "Article",
    date: "Feb 2026",
    title: "Which environmental data to track for ESG reporting",
    lead: "Environmental indicators need consistent definitions, boundaries and evidence. This article outlines common data domains for ESG reporting.",
    image: "/insights/esg-chain.svg",
    sections: TR.esgEnvData.sections.slice(0, 5).map((s) => ({
      h: s.h,
      p: s.p.slice(0, 2),
    })),
    references: [
      "GRI Standards (Global Reporting Initiative)",
      "CDP disclosure frameworks (CDP)",
    ],
  },
  digitalDocTracking: enFromTr("digitalDocTracking", TR.digitalDocTracking),
  waterAudit: enFromTr("waterAudit", TR.waterAudit),
  waterClassification: enFromTr("waterClassification", TR.waterClassification),
  minNightFlow: enFromTr("minNightFlow", TR.minNightFlow),
  sdsMsds: enFromTr("sdsMsds", TR.sdsMsds),
  auditChecklists: enFromTr("auditChecklists", TR.auditChecklists),
  waterSoftware: enFromTr("waterSoftware", TR.waterSoftware),
  adrPlatformRisks: enFromTr("adrPlatformRisks", TR.adrPlatformRisks),
  sustainRoadmap: enFromTr("sustainRoadmap", TR.sustainRoadmap),
  waterSustainLink: enFromTr("waterSustainLink", TR.waterSustainLink),
};

export function insightArticle(id: InsightId, lang: LangCode): Article {
  return lang === "TR" ? TR[id] : EN[id];
}
