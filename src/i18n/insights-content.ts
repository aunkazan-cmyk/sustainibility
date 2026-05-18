// Insight article content. Original educational text written for this site;
// it describes REAL, public frameworks (ISO 46001, the UNECE ADR Agreement +
// Turkish TMGD regulation, GRI / CDP Water Security) in general terms only —
// no fabricated metrics, client names, dates or claims (project_docs rule).
// References name the public standard bodies, not invented sources.
// Cover images are original brand SVGs in /public/insights (no third-party
// imagery, no external/Gemini generation).
import type { InsightId } from "@/lib/routes";
import type { LangCode } from "./getDictionary";

export interface Article {
  tag: string;
  type: string;
  date: string;
  title: string;
  lead: string;
  image: string; // /insights/*.svg
  sections: { h: string; p: string[] }[];
  references: string[];
}

const TR: Record<InsightId, Article> = {
  iso46001: {
    tag: "Mevzuat",
    type: "Rehber",
    date: "Mart 2026",
    title: "ISO 46001 hazırlığı: tesisler için bir başlangıç notu",
    lead: "ISO 46001, su verimliliği yönetim sistemleri için uluslararası bir standarttır. Bu not, bir tesiste sisteme hazırlanırken izlenebilecek temel adımları özetler.",
    image: "/insights/iso46001.svg",
    sections: [
      {
        h: "ISO 46001 nedir?",
        p: [
          "ISO 46001, kuruluşların su kullanımını sistematik biçimde ölçmesi, değerlendirmesi ve iyileştirmesi için bir yönetim sistemi çerçevesi tanımlar. Diğer ISO yönetim sistemi standartları gibi planla–uygula–kontrol et–önlem al (PUKÖ) döngüsüne dayanır.",
          "Standart bir tüketim hedefi dayatmaz; bunun yerine ölçüm temelli, sürekli iyileştirmeye dayalı bir yöntem kurmayı bekler. Bu yüzden hazırlık, veri altyapısı ile başlar.",
        ],
      },
      {
        h: "Başlangıç: kapsam ve sayaç envanteri",
        p: [
          "İlk adım, sistemin sınırlarını tanımlamak ve mevcut sayaç altyapısını çıkarmaktır. Hangi hatların ölçüldüğü, hangilerinin tahmini olduğu netleştirilmelidir.",
          "Ölçülemeyen büyük tüketim noktaları, hazırlık aşamasında önceliklendirilmesi gereken ilk başlıklardır.",
        ],
      },
      {
        h: "Temel performans göstergeleri",
        p: [
          "Birim üretim başına su tüketimi gibi normalize edilmiş göstergeler, mutlak değerlerden daha anlamlıdır; mevsim ve üretim hacmi etkisini ayrıştırmaya yardımcı olur.",
          "Göstergeler, denetlenebilir bir veri zincirine bağlı olduğunda raporlama güvenilirliği artar.",
        ],
      },
      {
        h: "Sürekli izleme ve gözden geçirme",
        p: [
          "Standardın özü, tek seferlik bir etüt değil, tekrarlanan bir gözden geçirme döngüsüdür. İzleme, eşik aşımlarını ve sapmaları görünür kılmalıdır.",
          "Bu yazıdaki bilgiler genel niteliktedir; resmi gereklilikler için ilgili standardın güncel metni esas alınmalıdır.",
        ],
      },
    ],
    references: [
      "ISO 46001 — Water efficiency management systems (International Organization for Standardization)",
      "ISO yönetim sistemleri ortak yapısı (Annex SL / Harmonized Structure)",
    ],
  },
  esgChain: {
    tag: "ESG",
    type: "Makale",
    date: "Şubat 2026",
    title: "ESG raporlamasında ölçüm zinciri neden önemli?",
    lead: "ESG raporlamasının güvenilirliği, beyan edilen rakamın arkasındaki ölçüm zincirinin izlenebilirliğine bağlıdır. Bu yazı, veri kalitesi ve denetim izi üzerine kısa bir çerçeve sunar.",
    image: "/insights/esg-chain.svg",
    sections: [
      {
        h: "Beyan değil, izlenebilirlik",
        p: [
          "Bir ESG göstergesi, yalnızca nihai sayı kadar değil; o sayının nasıl toplandığı, normalize edildiği ve doğrulandığı kadar güvenilirdir.",
          "GRI ve CDP gibi gönüllü raporlama çerçeveleri, veri kalitesi ve sınır tanımları konusunda şeffaflık bekler.",
        ],
      },
      {
        h: "Ölçüm zinciri nedir?",
        p: [
          "Ölçüm zinciri; saha ölçümü → veri toplama → normalizasyon → analiz → raporlama adımlarının kesintisiz ve denetlenebilir biçimde bağlanmasıdır.",
          "Zincirin herhangi bir halkasında manuel ve belgesiz bir adım varsa, raporun denetimde savunulabilirliği zayıflar.",
        ],
      },
      {
        h: "Pratik sonuç",
        p: [
          "Hedef koymadan önce neyi, hangi sıklıkta ve hangi sınırlarla ölçtüğünü tanımlamak; sonradan yapılan düzeltmelerden daha sağlamdır.",
          "Bu yazı genel bir çerçevedir ve belirli bir çerçevenin resmi gerekliliklerinin yerine geçmez.",
        ],
      },
    ],
    references: [
      "GRI Standards (Global Reporting Initiative)",
      "CDP Water Security questionnaire (CDP)",
    ],
  },
  tmgd: {
    tag: "ADR",
    type: "Rehber",
    date: "Ocak 2026",
    title: "TMGD denetim hazırlığı: kontrol listesi mantığı",
    lead: "Tehlikeli Madde Güvenlik Danışmanlığı (TMGD) kapsamındaki yıllık denetime girmeden önce gözden geçirilmesi gereken başlıkların mantığını özetler.",
    image: "/insights/tmgd.svg",
    sections: [
      {
        h: "ADR ve TMGD bağlamı",
        p: [
          "ADR, tehlikeli malların karayolu ile uluslararası taşınmasına ilişkin Avrupa Anlaşması'dır. Türkiye'de tehlikeli madde faaliyetleri, ilgili ulusal mevzuat ve TMGD rolü çerçevesinde yürütülür.",
          "TMGD denetim hazırlığı, esas olarak belge bütünlüğü ve sınıflandırma doğruluğu üzerine kuruludur.",
        ],
      },
      {
        h: "Belge bütünlüğü",
        p: [
          "Taşıma evrakı, yazılı talimatlar ve araç/sürücü uygunluk belgelerinin güncel ve tutarlı olması, denetimde en sık karşılaşılan başlıktır.",
          "UN numarası, sınıf ve ambalajlama grubu bilgilerinin evrak boyunca tutarlı olması gerekir.",
        ],
      },
      {
        h: "Kontrol listesi yaklaşımı",
        p: [
          "İyi bir kontrol listesi, denetim maddelerini operasyonel sahipliğe bağlar: her madde için 'kim, hangi kayıtla' sorusunun yanıtı net olmalıdır.",
          "Buradaki içerik genel bilgilendirme amaçlıdır; bağlayıcı gereklilikler için yürürlükteki ADR metni ve ulusal mevzuat esas alınmalıdır.",
        ],
      },
    ],
    references: [
      "ADR — European Agreement concerning the International Carriage of Dangerous Goods by Road (UNECE)",
      "Türkiye tehlikeli madde mevzuatı ve TMGD düzenlemesi (T.C. Ulaştırma ve Altyapı Bakanlığı)",
    ],
  },
  waterReporting: {
    tag: "Su",
    type: "Mevzuat Güncellemesi",
    date: "Aralık 2025",
    title: "Sanayide su tüketim raporlaması: yeni dönem",
    lead: "Sanayide su tüketiminin ölçülmesi ve raporlanması giderek daha yapılandırılmış bir gereklilik hâline geliyor. Bu yazı, tesisler için pratik etkilerini genel hatlarıyla özetler.",
    image: "/insights/water-reporting.svg",
    sections: [
      {
        h: "Neden raporlama yapısı önemli?",
        p: [
          "Su tüketiminin raporlanması; yalnızca toplam rakam değil, ölçümün nasıl yapıldığı, hangi sınırların kapsandığı ve verinin nasıl doğrulandığıyla birlikte anlam kazanır.",
          "Yapılandırılmış raporlama, hem iç karar alma hem de dış denetim için aynı veri tabanını kullanmayı sağlar.",
        ],
      },
      {
        h: "Tesisler için pratik etkiler",
        p: [
          "Tahmini değerlerle ilerleyen tesisler, ölçülemeyen büyük tüketim noktalarını önceliklendirerek başlamalıdır.",
          "Birim üretim başına su gibi normalize göstergeler, dönemler arası karşılaştırmayı daha güvenilir kılar.",
        ],
      },
      {
        h: "Hazırlık adımları",
        p: [
          "Sayaç envanteri, kapsam tanımı ve düzenli gözden geçirme döngüsü; raporlamayı tek seferlik bir işten sürekli bir sürece dönüştürür.",
          "Bu yazı genel bilgilendirme amaçlıdır; bağlayıcı gereklilikler için yürürlükteki ulusal mevzuat esas alınmalıdır.",
        ],
      },
    ],
    references: [
      "ISO 46001 — Water efficiency management systems (ISO)",
      "Türkiye çevre ve su mevzuatı (T.C. Çevre, Şehircilik ve İklim Değişikliği Bakanlığı)",
    ],
  },
  sustainMeasure: {
    tag: "Sürdürülebilirlik",
    type: "Makale",
    date: "Kasım 2025",
    title: "Sürdürülebilirlik stratejisinde 'önce ölç' yaklaşımı",
    lead: "Hedef koymadan önce neyi, hangi sıklıkta ve hangi sınırlarla ölçtüğünü tanımlamak; sürdürülebilirlik stratejisinin en sağlam temelidir.",
    image: "/insights/measure-first.svg",
    sections: [
      {
        h: "Önce ölç, sonra hedefle",
        p: [
          "Ölçüm temeli olmadan konulan hedefler, ilerlemenin doğrulanmasını zorlaştırır. 'Önce ölç' yaklaşımı, hedefi ölçülebilir bir taban çizgisine bağlar.",
          "GRI ve CDP gibi gönüllü çerçeveler de veri kalitesi ve sınır tanımları konusunda şeffaflık bekler.",
        ],
      },
      {
        h: "Kısa bir çerçeve",
        p: [
          "Kapsam → gösterge → ölçüm sıklığı → veri kalitesi → taban çizgisi → hedef sırası, sonradan yapılan düzeltmelerden daha dayanıklıdır.",
          "Bu yazı genel bir çerçevedir ve belirli bir raporlama çerçevesinin resmi gerekliliklerinin yerine geçmez.",
        ],
      },
    ],
    references: [
      "GRI Standards (Global Reporting Initiative)",
      "CDP — disclosure framework (CDP)",
    ],
  },
  adrChanges: {
    tag: "ADR",
    type: "Duyuru",
    date: "Ekim 2025",
    title: "ADR mevzuat değişiklikleri ve operasyonel etkileri",
    lead: "ADR metni periyodik olarak güncellenir; bu güncellemelerin operasyonel ekipler açısından pratik etkilerini genel hatlarıyla özetleriz.",
    image: "/insights/adr-changes.svg",
    sections: [
      {
        h: "Periyodik güncelleme mantığı",
        p: [
          "ADR, tehlikeli malların karayolu ile uluslararası taşınmasına ilişkin Avrupa Anlaşması'dır ve metni belirli aralıklarla revize edilir.",
          "Operasyonel ekipler için kritik olan; sınıflandırma, ambalajlama ve evrak gerekliliklerindeki değişikliklerin zamanında yansıtılmasıdır.",
        ],
      },
      {
        h: "Operasyonel kontrol noktaları",
        p: [
          "Güncel ADR sürümüne göre taşıma evrakı, yazılı talimatlar ve etiketleme gözden geçirilmelidir.",
          "Bağlayıcı gereklilikler için yürürlükteki ADR metni ve ulusal mevzuat esas alınmalıdır; bu özet genel bilgilendirme amaçlıdır.",
        ],
      },
    ],
    references: [
      "ADR — European Agreement concerning the International Carriage of Dangerous Goods by Road (UNECE)",
      "Türkiye tehlikeli madde mevzuatı (T.C. Ulaştırma ve Altyapı Bakanlığı)",
    ],
  },
};

const EN: Record<InsightId, Article> = {
  iso46001: {
    tag: "Regulation",
    type: "Guide",
    date: "Mar 2026",
    title: "ISO 46001 readiness: a starting note for facilities",
    lead: "ISO 46001 is an international standard for water efficiency management systems. This note outlines the core steps a facility can follow when preparing for it.",
    image: "/insights/iso46001.svg",
    sections: [
      {
        h: "What is ISO 46001?",
        p: [
          "ISO 46001 defines a management-system framework for organisations to measure, evaluate and improve water use systematically. Like other ISO management-system standards, it rests on a plan–do–check–act cycle.",
          "It does not impose a fixed consumption target; it expects a measurement-based, continuous-improvement method. Preparation therefore starts with data infrastructure.",
        ],
      },
      {
        h: "Start: scope and meter inventory",
        p: [
          "The first step is defining the system boundary and mapping the existing meter infrastructure — which lines are measured and which are estimated.",
          "Large unmetered consumption points are the first items to prioritise during preparation.",
        ],
      },
      {
        h: "Key performance indicators",
        p: [
          "Normalised indicators such as water use per unit of production are more meaningful than absolute figures; they help separate seasonal and volume effects.",
          "Reporting credibility improves when indicators are tied to an auditable data chain.",
        ],
      },
      {
        h: "Continuous monitoring and review",
        p: [
          "The essence of the standard is a repeated review cycle, not a one-off audit. Monitoring must make threshold breaches and deviations visible.",
          "This article is general in nature; for formal requirements, refer to the current text of the relevant standard.",
        ],
      },
    ],
    references: [
      "ISO 46001 — Water efficiency management systems (International Organization for Standardization)",
      "ISO management-system harmonized structure (Annex SL)",
    ],
  },
  esgChain: {
    tag: "ESG",
    type: "Article",
    date: "Feb 2026",
    title: "Why the measurement chain matters in ESG reporting",
    lead: "The credibility of ESG reporting depends on the traceability of the measurement chain behind the reported figure. This piece offers a short framework on data quality and audit trail.",
    image: "/insights/esg-chain.svg",
    sections: [
      {
        h: "Traceability, not just a claim",
        p: [
          "An ESG indicator is only as credible as how it was collected, normalised and verified — not just the final number.",
          "Voluntary reporting frameworks such as GRI and CDP expect transparency about data quality and boundary definitions.",
        ],
      },
      {
        h: "What is the measurement chain?",
        p: [
          "The measurement chain links field measurement → data collection → normalisation → analysis → reporting in an unbroken, auditable way.",
          "If any link involves a manual, undocumented step, the report's defensibility under audit weakens.",
        ],
      },
      {
        h: "Practical takeaway",
        p: [
          "Defining what you measure, how often and within which boundaries — before setting targets — is more robust than after-the-fact corrections.",
          "This article is a general framework and does not replace the formal requirements of any specific framework.",
        ],
      },
    ],
    references: [
      "GRI Standards (Global Reporting Initiative)",
      "CDP Water Security questionnaire (CDP)",
    ],
  },
  tmgd: {
    tag: "ADR",
    type: "Guide",
    date: "Jan 2026",
    title: "TMGD inspection readiness: the logic of a checklist",
    lead: "A summary of the logic behind the items to review before the annual inspection within the scope of Dangerous Goods Safety Adviser (TMGD) duties.",
    image: "/insights/tmgd.svg",
    sections: [
      {
        h: "ADR and TMGD context",
        p: [
          "ADR is the European Agreement concerning the international carriage of dangerous goods by road. In Türkiye, dangerous-goods activities are conducted under the relevant national legislation and the TMGD role.",
          "Inspection readiness is essentially built on document integrity and classification accuracy.",
        ],
      },
      {
        h: "Document integrity",
        p: [
          "Keeping transport documents, written instructions and vehicle/driver eligibility records current and consistent is the most frequent inspection topic.",
          "UN number, class and packing-group information must stay consistent across the paperwork.",
        ],
      },
      {
        h: "The checklist approach",
        p: [
          "A good checklist ties inspection items to operational ownership: for each item, 'who, with which record' should be clearly answerable.",
          "This content is for general information; for binding requirements, refer to the ADR text in force and national legislation.",
        ],
      },
    ],
    references: [
      "ADR — European Agreement concerning the International Carriage of Dangerous Goods by Road (UNECE)",
      "Türkiye dangerous-goods legislation and the TMGD regulation (Republic of Türkiye, Ministry of Transport and Infrastructure)",
    ],
  },
  waterReporting: {
    tag: "Water",
    type: "Regulatory update",
    date: "Dec 2025",
    title: "Industrial water reporting: a new chapter",
    lead: "Measuring and reporting industrial water use is becoming an increasingly structured requirement. This article outlines the practical implications for facilities in general terms.",
    image: "/insights/water-reporting.svg",
    sections: [
      {
        h: "Why reporting structure matters",
        p: [
          "Water-use reporting is meaningful not just as a total figure, but together with how it was measured, which boundaries are covered, and how the data is verified.",
          "A structured report lets internal decisions and external audit draw from the same data base.",
        ],
      },
      {
        h: "Practical implications for facilities",
        p: [
          "Facilities relying on estimates should start by prioritising large unmetered consumption points.",
          "Normalised indicators such as water per unit of production make period-over-period comparison more reliable.",
        ],
      },
      {
        h: "Preparation steps",
        p: [
          "A meter inventory, a clear scope definition and a regular review cycle turn reporting from a one-off task into a continuous process.",
          "This article is for general information; for binding requirements refer to the national legislation in force.",
        ],
      },
    ],
    references: [
      "ISO 46001 — Water efficiency management systems (ISO)",
      "Türkiye environment and water legislation (Republic of Türkiye, Ministry of Environment, Urbanisation and Climate Change)",
    ],
  },
  sustainMeasure: {
    tag: "Sustainability",
    type: "Article",
    date: "Nov 2025",
    title: "A measure-first approach to sustainability strategy",
    lead: "Defining what you measure, how often, and within which boundaries — before setting targets — is the most robust foundation for a sustainability strategy.",
    image: "/insights/measure-first.svg",
    sections: [
      {
        h: "Measure first, then target",
        p: [
          "Targets set without a measurement basis make progress hard to verify. A measure-first approach anchors the target to a measurable baseline.",
          "Voluntary frameworks such as GRI and CDP also expect transparency about data quality and boundary definitions.",
        ],
      },
      {
        h: "A short framework",
        p: [
          "The order scope → indicator → measurement frequency → data quality → baseline → target is more durable than after-the-fact corrections.",
          "This article is a general framework and does not replace the formal requirements of any specific reporting framework.",
        ],
      },
    ],
    references: [
      "GRI Standards (Global Reporting Initiative)",
      "CDP — disclosure framework (CDP)",
    ],
  },
  adrChanges: {
    tag: "ADR",
    type: "Announcement",
    date: "Oct 2025",
    title: "ADR regulation changes and operational impact",
    lead: "The ADR text is updated periodically; we summarise the practical impact of these updates for operations teams in general terms.",
    image: "/insights/adr-changes.svg",
    sections: [
      {
        h: "The logic of periodic updates",
        p: [
          "ADR is the European Agreement concerning the international carriage of dangerous goods by road, and its text is revised at regular intervals.",
          "What matters for operations teams is reflecting changes in classification, packaging and documentation requirements in time.",
        ],
      },
      {
        h: "Operational checkpoints",
        p: [
          "Transport documents, written instructions and labelling should be reviewed against the current ADR version.",
          "For binding requirements refer to the ADR text in force and national legislation; this summary is for general information.",
        ],
      },
    ],
    references: [
      "ADR — European Agreement concerning the International Carriage of Dangerous Goods by Road (UNECE)",
      "Türkiye dangerous-goods legislation (Republic of Türkiye, Ministry of Transport and Infrastructure)",
    ],
  },
};

export function insightArticle(id: InsightId, lang: LangCode): Article {
  return (lang === "TR" ? TR : EN)[id];
}
