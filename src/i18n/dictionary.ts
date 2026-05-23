// Bilingual copy — ported verbatim from the prototype's i18n.jsx. Keys stay
// "TR"/"EN" so the ported page components keep their `t` / `lang === "TR"`
// contract unchanged (max fidelity, min regression). The locale→{t,lang}
// adapter lives in getDictionary.ts.

export const I18N = {
  TR: {
    nav: {
      platform: "Platform",
      services: "Hizmetler",
      sectors: "Sektörler",
      trainings: "Eğitimler",
      insights: "İçgörüler",
      about: "Hakkımızda",
      contact: "İletişim",
    },
    cta: {
      contact: "İletişime Geç",
      early: "Erken erişim talep et",
      learn: "Detaylı bilgi al",
      consulting: "Danışmanlık talep et",
      proposal: "Teklif talep et",
      explore: "Hizmetleri İncele",
    },
    consent: {
      title: "Çerez tercihleri",
      description:
        "Zorunlu olmayan analitik çerezler, site kullanımını anlamamıza yardımcı olur. Tercihinizi dilediğiniz zaman güncelleyebilirsiniz. Ayrıntılar için",
      policyLink: "Çerez Politikası",
      accept: "Kabul et",
      reject: "Reddet",
      manage: "Çerez tercihleri",
    },
    home: {
      eyebrow: "Mevzuat odaklı, ölçülebilir danışmanlık",
      heroTitle:
        "Su, sürdürülebilirlik ve uyum süreçlerinizi ölçülebilir hale getirin.",
      heroLead:
        "Nexovia; su verimliliği, sürdürülebilirlik ve ADR/TMGD alanlarında kurumsal danışmanlık sunar. Nexovia Flow ile veriye dayalı planlama, izleme ve raporlama süreçlerini destekler.",
      values: {
        eyebrow: "Neden Nexovia",
        title: "Danışmanlık güvencesi, platform disiplini.",
        intro:
          "Saha tecrübesi ve dijital altyapı bir arada. Mevzuat, ölçüm ve raporlama tek bir akışta yönetilir.",
      },
      flow: {
        eyebrow: "Platform",
        title:
          "Nexovia Flow ile su verimliliği yeni nesil bir altyapıya kavuşur.",
        lead: "Tesis seviyesinde tüketim takibi, eşik bazlı uyarılar, mevzuata uygun raporlama. Saha ekibiniz ve danışman ekibimiz aynı veriyi görür.",
      },
      services: {
        eyebrow: "Hizmetler",
        title: "Üç odak alanı, bütünleşik bir metodoloji.",
        intro:
          "Su verimliliği, sürdürülebilirlik stratejisi ve tehlikeli madde uyumu — her biri ayrı bir disiplin, hepsi ortak bir kalite çerçevesinde.",
      },
      sectors: {
        eyebrow: "Sektörler",
        title: "Sektöre özel yaklaşım, ortak bir yöntem.",
        intro:
          "Üretim tesislerinden büyük yerleşkelere; her sektörün su, ESG ve operasyonel uyum gereksinimleri farklıdır. Bizimkisi, sektör sektör konuşmak.",
      },
      insights: {
        eyebrow: "İçgörüler",
        title: "Mevzuat ve uygulama bir arada.",
        intro:
          "Saha deneyimimizden çıkardığımız notlar — kısa, somut, uygulanabilir.",
      },
    },
    services: {
      water: {
        title: "Su Verimliliği Danışmanlığı",
        short: "Tüketim analizi, etüt, raporlama ve iyileştirme planları.",
        brand: "flow",
      },
      sustain: {
        title: "Sürdürülebilirlik Danışmanlığı",
        short: "ESG odaklı strateji, çevresel performans, raporlama hazırlığı.",
        brand: "sustain",
      },
      adr: {
        title: "Nexovia ADR",
        short:
          "ADR/TMGD süreçleri için dijital takip ve dokümantasyon platformu.",
        brand: "adr",
      },
    },
    sectors: [
      "Üretim Tesisleri",
      "Kimya",
      "Gıda & İçecek",
      "Tekstil",
      "Lojistik",
      "Enerji",
      "OSB",
      "Belediyeler",
      "Büyük Yerleşkeler",
      "Oteller",
      "Hastaneler",
      "Üniversiteler",
    ],
    flowPage: {
      eyebrow: "Platform — Erken Erişim",
      title: "Nexovia Flow",
      lead: "Su verimliliği için tasarlanmış ölçüm, izleme ve raporlama platformu. Su Verimliliği Danışmanlığı süreçlerimizin doğal uzantısı.",
      featuresTitle: "Platformun temel modülleri",
      featuresIntro:
        "Saha verisini mevzuat çerçevesine bağlayan, kararı kolaylaştıran bir altyapı.",
      faqTitle: "Sık sorulanlar",
    },
    waterPage: {
      eyebrow: "Hizmet — Su Verimliliği",
      title: "Su Verimliliği Danışmanlığı",
      lead: "Tesis seviyesinde tüketim analizi, su verimliliği etüdü, raporlama ve iyileştirme planı. ISO 46001 hazırlığı, regülasyon takibi ve Nexovia Flow ile süreklilik.",
      processTitle: "Süreç",
      processIntro:
        "Dört aşamalı, çıktı odaklı bir metodoloji. Her adımda raporlanabilir bir teslimat.",
      benefitsTitle: "Beklenen sonuçlar",
      relatedFlow: "Nexovia Flow — destekleyici platform",
      relatedFlowLead:
        "Su Verimliliği Danışmanlığı'nın doğal uzantısı; ölçüm, izleme ve raporlamayı tek akışta sürdürür.",
    },
    aboutPage: {
      eyebrow: "Hakkımızda",
      title: "Mevzuata uygun, ölçülebilir bir danışmanlık.",
      lead: "Nexovia; su verimliliği ve sürdürülebilirlik danışmanlığı ile ADR/TMGD süreçlerine yönelik dijital takip platformları geliştiren bir B2B çözüm markasıdır. Saha tecrübesini dijital altyapıyla birleştirerek kurumlara ölçülebilir ve raporlanabilir çözümler sunar.",
      manifestoTitle:
        "Bizim için ölçülebilir, raporlanabilir olmaktan geçer.",
      manifestoBody:
        "Söz vermek kolaydır; veriyle desteklemek ayrı bir disiplin. Üç pratiğimizde de aynı çerçeveyi takip ederiz: mevzuat → ölçüm → analiz → karar → rapor. Her aşama bir teslimat; her teslimat denetim-hazır.",
      brandAreasTitle: "Marka mimarisi",
      brandAreasIntro: "Tek bir kurumsal kimlik, dört farklı uzmanlık odağı.",
      principlesTitle: "Yaklaşımımızın temelleri",
    },
    contactPage: {
      eyebrow: "İletişim",
      title: "Konuşalım.",
      lead: "Su verimliliği etüdü, sürdürülebilirlik stratejisi veya ADR/TMGD uyum süreciniz için kısa bir görüşmeyle başlayabiliriz. En az 3 iş günü içinde dönüş yaparız.",
      formTitle: "Bilgi alın",
      formIntro:
        "Talebinizi iletin; uygun danışman ekibimiz sizinle iletişime geçsin.",
      detailsTitle: "Doğrudan ulaşın",
      kvkkNotice:
        "Formu göndererek KVKK Aydınlatma Metni'ni okuduğunuzu kabul edersiniz.",
      captchaLabel: "Güvenlik doğrulaması",
      captchaHint: "Yukarıdaki işlemin sonucunu girin.",
    },
    insightsPage: {
      eyebrow: "İçgörüler",
      title: "Mevzuat ve uygulama arasındaki not defteri.",
      lead: "Saha projelerimizden ve regülasyon takibinden çıkardığımız kısa, somut yazılar. Tesis ekipleri ve uyum yöneticileri için yazıldı.",
      featuredLabel: "Öne çıkan",
      allCategories: "Tümü",
      newsletterTitle: "Aylık bülten",
      newsletterBody:
        "Mevzuat güncellemeleri ve rehberler için ayda bir e-posta. Spam yok.",
    },
    trainingsPage: {
      eyebrow: "Eğitimler",
      title: "Sahaya inen, sertifikalı eğitim programları.",
      lead: "Su verimliliği, ESG raporlama, ADR/TMGD uyumu ve ISO 46001 hazırlığı için kurumsal eğitimler. Online, yüz yüze ve hibrit format desteklenir.",
      allTypes: "Tüm formatlar",
      processTitle: "Başvuru süreci",
      processIntro:
        "İki kişiden büyük ekipler için kurum içi özel programlar da düzenliyoruz.",
    },
    sectorsPage: {
      eyebrow: "Sektörler",
      title: "Sektörünüzün diliyle konuşan bir danışman.",
      lead: "Üretim tesisinden büyük yerleşkeye, otelden hastaneye — her sektörün su, ESG ve uyum gereksinimleri farklıdır. Bizimkisi, sektör sektör konuşmak.",
      pickTitle: "Sektör seçin",
      approachTitle: "Sektöre göre yaklaşım",
    },
    platformIndex: {
      eyebrow: "Platform",
      title: "Nexovia platform ekosistemi",
      lead: "Operasyonel uyum ve verimliliği ölçülebilir kılan iki ürün: su verimliliği için Nexovia Flow, tehlikeli madde uyumu için Nexovia ADR.",
    },
    servicesIndex: {
      eyebrow: "Hizmetler",
      title: "Danışmanlık hizmetleri",
      lead: "Mevzuat odaklı, ölçülebilir danışmanlık. Su verimliliği ve sürdürülebilirlik alanlarında saha tecrübesi ile dijital altyapı bir arada.",
    },
    adrPage: {
      eyebrow: "Platform — Nexovia ADR",
      title: "Nexovia ADR",
      lead: "Tehlikeli madde taşımacılığında uyum, dokümantasyon ve denetim hazırlığını tek panelde yöneten ADR/TMGD platformu. Sınıflandırma, belge ve sevkiyat durumu aynı akışta.",
      featuresTitle: "Platformun temel modülleri",
      featuresIntro:
        "ADR/TMGD süreçlerini dokümantasyon, sınıflandırma ve denetim ekseninde tek akışta toplar.",
      faqTitle: "Sık sorulanlar",
    },
    sustainabilityPage: {
      eyebrow: "Hizmet — Sürdürülebilirlik",
      title: "Sürdürülebilirlik Danışmanlığı",
      lead: "ESG odaklı strateji, çevresel performans ölçümü ve raporlama hazırlığı. GRI ve CDP gibi çerçevelere uyumlu, ölçülebilir göstergelerle ilerleyen bir metodoloji.",
      processTitle: "Süreç",
      processIntro:
        "Dört aşamalı, çıktı odaklı bir metodoloji. Her adımda raporlanabilir bir teslimat.",
      benefitsTitle: "Beklenen sonuçlar",
      relatedNote: "Nexovia Flow — destekleyici platform",
      relatedNoteLead:
        "Su ve kaynak verimliliği göstergeleri Flow üzerinde ölçülür; sürdürülebilirlik raporlaması aynı veriden beslenir.",
    },
  },
  EN: {
    nav: {
      platform: "Platform",
      services: "Services",
      sectors: "Sectors",
      trainings: "Trainings",
      insights: "Insights",
      about: "About",
      contact: "Contact",
    },
    cta: {
      contact: "Contact us",
      early: "Request early access",
      learn: "Learn more",
      consulting: "Request consulting",
      proposal: "Request a proposal",
      explore: "Explore services",
    },
    consent: {
      title: "Cookie preferences",
      description:
        "Non-essential analytics cookies help us understand how the site is used. You can update your choice at any time. See our",
      policyLink: "Cookie Policy",
      accept: "Accept",
      reject: "Reject",
      manage: "Cookie preferences",
    },
    home: {
      eyebrow: "Regulation-aware, measurable consulting",
      heroTitle:
        "Make water, sustainability and compliance processes measurable.",
      heroLead:
        "Nexovia provides corporate consulting for water efficiency, sustainability and ADR/TMGD. Nexovia Flow supports planning, monitoring and reporting with real, useful data.",
      values: {
        eyebrow: "Why Nexovia",
        title: "Consulting credibility, platform discipline.",
        intro:
          "Field experience and digital infrastructure together. Regulation, measurement and reporting in a single flow.",
      },
      flow: {
        eyebrow: "Platform",
        title:
          "Nexovia Flow gives water efficiency a next-generation infrastructure.",
        lead: "Site-level consumption tracking, threshold-based alerts, regulation-aligned reporting. Your field team and our consultants see the same data.",
      },
      services: {
        eyebrow: "Services",
        title: "Three focus areas, one integrated methodology.",
        intro:
          "Water efficiency, sustainability strategy, and dangerous-goods compliance — each its own discipline, all under one quality framework.",
      },
      sectors: {
        eyebrow: "Sectors",
        title: "Sector-specific approach, a shared method.",
        intro:
          "From manufacturing sites to large campuses — each sector's water, ESG and compliance needs differ. We meet them sector by sector.",
      },
      insights: {
        eyebrow: "Insights",
        title: "Regulation meets practice.",
        intro:
          "Short, concrete notes from the field — written to be useful, not impressive.",
      },
    },
    services: {
      water: {
        title: "Water Efficiency Consulting",
        short: "Consumption analysis, audits, reporting, and improvement plans.",
        brand: "flow",
      },
      sustain: {
        title: "Sustainability Consulting",
        short:
          "ESG-oriented strategy, environmental performance, reporting readiness.",
        brand: "sustain",
      },
      adr: {
        title: "Nexovia ADR",
        short:
          "Digital tracking and documentation platform for ADR/TMGD processes.",
        brand: "adr",
      },
    },
    sectors: [
      "Manufacturing",
      "Chemicals",
      "Food & Beverage",
      "Textile",
      "Logistics",
      "Energy",
      "Industrial Zones",
      "Municipalities",
      "Large Campuses",
      "Hotels",
      "Hospitals",
      "Universities",
    ],
    flowPage: {
      eyebrow: "Platform — Early Access",
      title: "Nexovia Flow",
      lead: "A measurement, monitoring and reporting platform built for water efficiency. The natural extension of our consulting practice.",
      featuresTitle: "Core platform modules",
      featuresIntro:
        "Infrastructure that connects field data to regulatory frameworks and makes decisions easier.",
      faqTitle: "Frequently asked",
    },
    waterPage: {
      eyebrow: "Service — Water Efficiency",
      title: "Water Efficiency Consulting",
      lead: "Site-level consumption analysis, water-efficiency audits, reporting and improvement plans. ISO 46001 readiness, regulation tracking, and continuity through Nexovia Flow.",
      processTitle: "Process",
      processIntro:
        "A four-step, deliverable-oriented methodology. Each step ends with a reportable output.",
      benefitsTitle: "Expected outcomes",
      relatedFlow: "Nexovia Flow — supporting platform",
      relatedFlowLead:
        "The natural extension of Water Efficiency Consulting; keeps measurement, monitoring and reporting in one flow.",
    },
    aboutPage: {
      eyebrow: "About",
      title: "Regulation-aware, measurable consulting.",
      lead: "Nexovia is a B2B consulting ecosystem that combines field experience with digital infrastructure across water efficiency, sustainability, and ADR/TMGD.",
      manifestoTitle: "For us, credibility means measurable and reportable.",
      manifestoBody:
        "Promises are easy; backing them with data is a separate discipline. Across our three practices we follow the same framework: regulation → measurement → analysis → decision → report. Every phase has a deliverable; every deliverable is audit-ready.",
      brandAreasTitle: "Brand architecture",
      brandAreasIntro: "One corporate identity, four distinct areas of expertise.",
      principlesTitle: "Principles behind our approach",
    },
    contactPage: {
      eyebrow: "Contact",
      title: "Let's talk.",
      lead: "Whether it's a water-efficiency audit, sustainability strategy, or ADR/TMGD compliance — we can start with a short call. We respond within at least 3 business days.",
      formTitle: "Get in touch",
      formIntro: "Send your request; the right consulting team will reach out.",
      detailsTitle: "Reach us directly",
      kvkkNotice:
        "By submitting this form you confirm you have read our Privacy Notice.",
      captchaLabel: "Security check",
      captchaHint: "Enter the result of the calculation above.",
    },
    insightsPage: {
      eyebrow: "Insights",
      title: "Notes from the space between regulation and practice.",
      lead: "Short, concrete writing from our field projects and regulation tracking. Written for facility teams and compliance leads.",
      featuredLabel: "Featured",
      allCategories: "All",
      newsletterTitle: "Monthly briefing",
      newsletterBody:
        "One email a month with regulation updates and guides. No spam.",
    },
    trainingsPage: {
      eyebrow: "Trainings",
      title: "Field-grounded, certified training programs.",
      lead: "Corporate trainings for water efficiency, ESG reporting, ADR/TMGD compliance, and ISO 46001 readiness. Online, in-person, and hybrid delivery supported.",
      allTypes: "All formats",
      processTitle: "Application process",
      processIntro:
        "We also run private in-house programs for teams of two or more.",
    },
    sectorsPage: {
      eyebrow: "Sectors",
      title: "A consultant that speaks your sector's language.",
      lead: "From manufacturing sites to large campuses, hotels to hospitals — each sector's water, ESG and compliance needs differ. We meet them sector by sector.",
      pickTitle: "Pick a sector",
      approachTitle: "Sector-tailored approach",
    },
    platformIndex: {
      eyebrow: "Platform",
      title: "The Nexovia platform ecosystem",
      lead: "Two products that make operational compliance and efficiency measurable: Nexovia Flow for water efficiency, Nexovia ADR for dangerous-goods compliance.",
    },
    servicesIndex: {
      eyebrow: "Services",
      title: "Consulting services",
      lead: "Regulation-aware, measurable consulting. Field experience and digital infrastructure together, across water efficiency and sustainability.",
    },
    adrPage: {
      eyebrow: "Platform — Nexovia ADR",
      title: "Nexovia ADR",
      lead: "An ADR/TMGD platform that manages dangerous-goods compliance, documentation and inspection readiness in one panel — classification, documents and shipment status in a single flow.",
      featuresTitle: "Core platform modules",
      featuresIntro:
        "Brings ADR/TMGD processes together in one flow around documentation, classification and inspection.",
      faqTitle: "Frequently asked",
    },
    sustainabilityPage: {
      eyebrow: "Service — Sustainability",
      title: "Sustainability Consulting",
      lead: "ESG-oriented strategy, environmental performance measurement and reporting readiness. A methodology aligned with frameworks like GRI and CDP, advancing on measurable indicators.",
      processTitle: "Process",
      processIntro:
        "A four-step, deliverable-oriented methodology. Each step ends with a reportable output.",
      benefitsTitle: "Expected outcomes",
      relatedNote: "Nexovia Flow — supporting platform",
      relatedNoteLead:
        "Water and resource-efficiency indicators are measured in Flow; sustainability reporting draws from the same data.",
    },
  },
};

// No `as const`: values widen to `string` / `string[]` so TR and EN share
// one structural shape (components read strings, not literals).
export type Strings = (typeof I18N)["TR"];
