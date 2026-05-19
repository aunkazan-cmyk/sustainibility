// Long-form TR service copy from mockup (web + hizmetler MD).
// Used by water / sustainability heroes and detail sections.
import type { LangCode } from "./getDictionary";

export type ScopeItem = { title: string; body: string };

export const WATER_SERVICE = {
  TR: {
    scopeIntro:
      "Nexovia Su Verimliliği Danışmanlığı; tesislerin su tüketimini analiz etmek, verimlilik potansiyelini belirlemek ve uygulanabilir iyileştirme planları oluşturmak için tasarlanmış uçtan uca bir danışmanlık hizmetidir.",
    scopeItems: [
      {
        title: "Mevcut durum analizi",
        body: "Su faturaları, sayaç kayıtları, tesis yerleşimi, proses akışları ve mevcut kayıt sistemi incelenir.",
      },
      {
        title: "Saha etüdü",
        body: "Su kullanım noktaları, sayaç altyapısı, prosesler ve operasyonel tüketim alanları yerinde değerlendirilir.",
      },
      {
        title: "Sayaç ve ölçüm altyapısı",
        body: "Ana ve alt sayaç ihtiyacı, kritik tüketim noktaları ve veri kalitesi analiz edilir.",
      },
      {
        title: "Tüketim analizi",
        body: "Dönemsel profil, birim tüketim göstergeleri ve kıyaslama çalışmaları yapılır.",
      },
      {
        title: "Kayıp-kaçak değerlendirmesi",
        body: "Anormal tüketim, gece akışı ve şüpheli hatlar için kontrol önerileri geliştirilir.",
      },
      {
        title: "İyileştirme fırsatları",
        body: "Teknik, operasyonel ve davranışsal iyileştirme alanları önceliklendirilir.",
      },
      {
        title: "Aksiyon planı",
        body: "Uygulanabilirlik, yatırım ihtiyacı ve beklenen etkiye göre yol haritası oluşturulur.",
      },
      {
        title: "Raporlama ve izleme",
        body: "Yönetim sunumu, mevzuat hazırlığı ve Nexovia Flow ile sürekli izleme önerileri.",
      },
    ] as ScopeItem[],
    outputs: [
      "Su tüketim mevcut durum raporu",
      "Su kullanım noktaları envanteri",
      "Sayaç değerlendirme raporu",
      "Su verimliliği fırsat listesi",
      "Önceliklendirilmiş aksiyon planı",
      "Yönetim sunumu",
      "ISO 46001 hazırlık veri listesi",
      "ESG raporlaması için su göstergeleri",
      "Nexovia Flow kullanım senaryosu",
      "Periyodik izleme önerileri",
    ],
    audience: [
      "Su tüketimi yüksek üretim tesisleri",
      "Gıda ve içecek işletmeleri",
      "Tekstil tesisleri",
      "Kimya ve yardımcı kimyasal kullanan tesisler",
      "Oteller ve turizm tesisleri",
      "Hastaneler ve üniversite kampüsleri",
      "OSB'ler ve çok lokasyonlu kurumsal yapılar",
      "ESG raporlamasına hazırlanan işletmeler",
      "ISO 46001 yaklaşımına hazırlanan kurumlar",
    ],
  },
  EN: {
    scopeIntro:
      "End-to-end consulting to analyse consumption, quantify efficiency potential and build actionable improvement plans at facility level.",
    scopeItems: [
      { title: "Baseline review", body: "Bills, meter logs, site layout, process flows and existing records." },
      { title: "Site audit", body: "On-site review of use points, metering and operational consumption." },
      { title: "Metering assessment", body: "Main and sub-meter needs, critical points and data quality." },
      { title: "Consumption analysis", body: "Period profiles, intensity KPIs and benchmarking." },
      { title: "Loss and leakage", body: "Abnormal use, night flow and targeted checks." },
      { title: "Improvement opportunities", body: "Technical, operational and behavioural measures prioritised." },
      { title: "Action plan", body: "Roadmap by feasibility, investment and expected impact." },
      { title: "Reporting and monitoring", body: "Management outputs, compliance readiness and Flow scenarios." },
    ] as ScopeItem[],
    outputs: [
      "Current-state water report",
      "Use-point inventory",
      "Metering assessment",
      "Efficiency opportunity list",
      "Prioritised action plan",
      "Management summary",
      "ISO 46001 readiness data list",
      "Water indicators for ESG",
      "Nexovia Flow scenario",
      "Periodic monitoring recommendations",
    ],
    audience: [
      "High-consumption manufacturing sites",
      "Food and beverage plants",
      "Textile facilities",
      "Chemical sites",
      "Hotels and tourism",
      "Hospitals and campuses",
      "Industrial zones and multi-site groups",
      "Organisations preparing ESG disclosures",
      "ISO 46001 readiness programmes",
    ],
  },
};

export const SUSTAIN_SERVICE = {
  TR: {
    scopeIntro:
      "Nexovia Sürdürülebilirlik Danışmanlığı; kurumların çevresel performansını ölçmesi, sürdürülebilirlik önceliklerini belirlemesi ve raporlanabilir veri altyapısı oluşturması için tasarlanmıştır.",
    scopeItems: [
      {
        title: "Mevcut durum analizi",
        body: "Su, enerji, atık, emisyon kaynakları, belge yapısı ve raporlama deneyimi değerlendirilir.",
      },
      {
        title: "Öncelikli konular",
        body: "Faaliyet alanı ve paydaş beklentilerine göre materyal konular belirlenir.",
      },
      {
        title: "ESG veri seti",
        body: "İzlenecek göstergeler, toplama sıklığı ve sorumluluklar tanımlanır.",
      },
      {
        title: "Kanıt dosyası",
        body: "Fatura, ölçüm, atık, eğitim ve iç kontrol belgeleri için düzenli yapı kurulur.",
      },
      {
        title: "Hedef ve aksiyon planı",
        body: "Ölçülebilir hedefler ve departman sorumlulukları netleştirilir.",
      },
      {
        title: "Raporlama hazırlığı",
        body: "GRI/CDP uyumlu veri ve kanıt dosyası mantığı ile yönetim özeti hazırlanır.",
      },
    ] as ScopeItem[],
    outputs: [
      "Mevcut durum değerlendirme raporu",
      "ESG veri seti",
      "Çevresel performans göstergeleri",
      "Öncelikli konu analizi",
      "Sürdürülebilirlik yol haritası",
      "Aksiyon planı",
      "Kanıt dosyası kontrol listesi",
      "Yönetim sunumu",
      "Raporlama hazırlık dokümanı",
      "Dijital takip önerileri",
    ],
    audience: [
      "ESG raporlamasına hazırlanan işletmeler",
      "Sürdürülebilirlik yol haritası oluşturmak isteyen kurumlar",
      "Tedarik zinciri taleplerine cevap veren şirketler",
      "Çevresel verilerini düzenli takip etmek isteyen tesisler",
      "Su, enerji ve atık performansını iyileştirmek isteyen kurumlar",
      "Çok lokasyonlu işletmeler ve OSB'ler",
    ],
  },
  EN: {
    scopeIntro:
      "Consulting to measure environmental performance, set priorities and build a reporting-ready data and evidence base.",
    scopeItems: [
      { title: "Baseline review", body: "Water, energy, waste, emissions sources, documents and reporting history." },
      { title: "Material topics", body: "Priorities aligned to sector, footprint and stakeholders." },
      { title: "ESG data set", body: "Indicators, collection cadence and ownership defined." },
      { title: "Evidence file", body: "Structure for bills, meters, waste, training and control records." },
      { title: "Targets and actions", body: "Measurable goals and accountable owners." },
      { title: "Reporting readiness", body: "GRI/CDP-aligned data logic and management summary." },
    ] as ScopeItem[],
    outputs: [
      "Baseline assessment report",
      "ESG data set",
      "Environmental performance indicators",
      "Material topic analysis",
      "Sustainability roadmap",
      "Action plan",
      "Evidence checklist",
      "Management summary",
      "Reporting readiness pack",
      "Digital tracking recommendations",
    ],
    audience: [
      "Organisations preparing ESG disclosures",
      "Teams building a sustainability roadmap",
      "Companies responding to supply-chain requests",
      "Sites improving environmental data discipline",
      "Multi-site and industrial-zone operators",
    ],
  },
};

export function waterServiceContent(lang: LangCode) {
  return WATER_SERVICE[lang];
}

export function sustainServiceContent(lang: LangCode) {
  return SUSTAIN_SERVICE[lang];
}
