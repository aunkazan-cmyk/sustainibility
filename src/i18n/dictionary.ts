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
    matrix: {
      eyebrow: "Değerlendirme aracı",
      title: "Su verimliliği yükümlülük değerlendirmesi",
      lead:
        "NACE kodunuz ve çalışan sayınıza göre yükümlü veya gönüllü statünüzü ön değerlendirin. Kalite ve uyum ekiplerinin üst yönetime iletebileceği bilgilendirme taslağı raporu indirilebilir.",
      facilityTypeLabel: "Tesis türü",
      facilityIndustrial: "Endüstriyel işletme",
      facilityOsb: "Organize Sanayi Bölgesi (OSB)",
      facilityFreeZone: "Serbest Bölge",
      facilityIndustrialZone: "Endüstri Bölgesi",
      naceLabel: "NACE kodu (Ek-1)",
      nacePlaceholder: "Kod veya faaliyet adı ile arayın…",
      employeeLabel: "Çalışan sayısı",
      employeePlaceholder: "Örn. 75",
      sharedEmployeeHint:
        "Tüm faaliyetler için geçerli toplam çalışan sayısı.",
      addActivity: "Faaliyet ekle",
      removeActivity: "Kaldır",
      activityRowLabel: "Faaliyet",
      maxActivitiesReached: "En fazla 10 faaliyet eklenebilir.",
      activitiesEvaluated: "{count} faaliyet değerlendirildi",
      resultsTableNace: "NACE",
      resultsTableActivity: "Faaliyet",
      resultsTableStatus: "Sonuç",
      evaluateHint: "Endüstriyel işletmeler için NACE kodu ve çalışan sayısını girin.",
      resultTitle: "Değerlendirme sonucu",
      resultReference:
        "Su Verimliliği Yönetmeliği ve Endüstriyel Su Verimliliği Başvuru Kılavuzu Ek-1 / s.15.",
      downloadCta: "Yönetime iletilebilir raporu indir",
      modalTitle: "Rapor bilgileri",
      modalIntro:
        "Taslak raporu indirmeden önce aşağıdaki bilgileri doldurun. Rapor, üst yönetime iletilmek üzere hazırlanmış bilgilendirme formatındadır.",
      companyLabel: "Şirket adı",
      recipientLabel: "Raporu alan kişi (ad soyad)",
      emailLabel: "E-posta",
      phoneLabel: "Telefon",
      kvkkLabel: "Form Aydınlatma Metni'ni okudum; kişisel verilerimin bu talep kapsamında işlenmesini kabul ediyorum.",
      submitDownload: "Raporu oluştur ve indir",
      cancel: "Vazgeç",
      disclaimer:
        "Bu sonuç bilgilendirme amaçlıdır; resmi başvuru veya hukuki görüş yerine geçmez.",
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
          "Su verimliliği, enerji verimliliği, sürdürülebilirlik stratejisi ve tehlikeli madde uyumu — her biri ayrı bir disiplin, hepsi ortak bir kalite çerçevesinde.",
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
      energy: {
        title: "Enerji Verimliliği Danışmanlığı",
        short:
          "Tesis enerji tüketimini analiz eder, verimlilik fırsatlarını belirler ve enerji performansının izlenebilir hale gelmesi için veri, raporlama ve aksiyon planı yapısı kurarız.",
        brand: "energy",
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
    energyPage: {
      eyebrow: "Hizmet — Enerji Verimliliği",
      title: "Enerji Verimliliği Danışmanlığı",
      lead: "Nexovia, kurumların enerji tüketimini ölçülebilir hale getirmesine, verimsizlik alanlarını belirlemesine, iyileştirme fırsatlarını önceliklendirmesine ve enerji performansını düzenli izlenebilir bir yapıya taşımasına yardımcı olur.",
      seoDescription:
        "Nexovia enerji verimliliği danışmanlığı; tesis enerji tüketim analizi, saha değerlendirmesi, verimlilik fırsatları, ISO 50001 hazırlığı, raporlama ve izleme süreçlerini kapsar.",
      ctaPrimary: "Danışmanlık Talep Et",
      ctaSecondary: "Sürdürülebilirlik Yaklaşımını İncele",
      scopeNoteTitle: "Enerji verimliliği çalışması yalnızca tasarruf listesi değildir.",
      scopeNoteLead:
        "Enerji verimliliği danışmanlığında amaç; elektrik, doğalgaz, buhar, basınçlı hava, soğutma, iklimlendirme, aydınlatma ve proses kaynaklı tüketimleri bütüncül şekilde değerlendirmektir. Resmi mevzuat kapsamında yetkilendirme gerektiren etüt, VAP veya belgelendirme süreçlerinde çalışma kapsamı proje özelinde değerlendirilir; gerekli durumlarda yetkili çözüm ortaklarıyla ilerlenir.",
      processTitle: "Süreç",
      processIntro:
        "Altı aşamalı, çıktı odaklı bir metodoloji. Her adımda raporlanabilir bir teslimat.",
      evaluatedTopicsTitle: "Değerlendirilen başlıklar",
      outcomesTitle: "Enerji performansı, düzenli ölçüm ve doğru yorumla yönetilir.",
      outcomesLead:
        "Enerji verimliliği çalışmasının değeri yalnızca bir defalık tasarruf önerilerinden gelmez. Asıl değer; tüketimin hangi faaliyetlerden kaynaklandığını anlamak, sapmaları erken görmek, yatırım kararlarını veriye dayandırmak ve enerji performansını düzenli raporlanabilir hale getirmektir.",
      isoTitle: "ISO 50001 hazırlığı için güçlü başlangıç: veri, sınır ve gösterge disiplini.",
      isoLead:
        "Enerji yönetim sistemi kurmak isteyen kurumlar için ilk ihtiyaç, enerji kullanım sınırlarını, önemli enerji kullanım alanlarını, veri kaynaklarını ve performans göstergelerini netleştirmektir. Nexovia, ISO 50001 hazırlık sürecinde enerji verisinin düzenlenmesi, sorumlulukların tanımlanması ve izleme yapısının kurulması için danışmanlık sağlar.",
      sustainTitle:
        "Enerji verimliliği, sürdürülebilirlik raporlamasının en güçlü veri alanlarından biridir.",
      sustainLead:
        "Enerji tüketimi, karbon emisyonu, operasyonel maliyet ve kaynak verimliliği doğrudan ilişkilidir. Enerji verimliliği çalışmaları; ESG, sürdürülebilirlik raporlaması ve kurumsal çevresel performans göstergeleri için güvenilir bir veri zemini oluşturur.",
      audienceTitle: "Kimler için uygun?",
      outputsTitle: "Teslimatlar",
      ctaTitle: "Tesisinizde enerji verimliliği potansiyelini birlikte ortaya çıkaralım.",
      ctaLead:
        "Enerji tüketiminizi, ana kullanım noktalarınızı ve iyileştirme fırsatlarınızı birlikte değerlendirelim; kurumunuza uygun ölçülebilir bir yol haritası oluşturalım.",
      ctaButton: "Danışmanlık Talep Et",
      cardLinkLabel: "Detayları İncele",
      tep: {
        eyebrow: "TEP Hesaplama Motoru",
        title: "Tesisinizin yıllık enerji tüketimini TEP cinsinden hesaplayın.",
        intro:
          "Elektrik, doğalgaz ve diğer enerji kaynaklarına ait yıllık tüketimlerinizi girerek yaklaşık toplam TEP değerinizi hesaplayabilirsiniz. Sonuçlar ön değerlendirme amaçlıdır; resmi beyan, etüt veya mevzuat yorumu yerine geçmez.",
        inputHint:
          "Boş bırakılan alanlar 0 kabul edilir. Yıllık tüketim miktarlarını girin.",
        calculateButton: "TEP Hesapla",
        validationError: "Negatif veya geçersiz değerleri düzeltin.",
        totalLabel: "Yaklaşık toplam yıllık TEP",
        colSource: "Enerji kaynağı",
        colConsumption: "Tüketim",
        colFactor: "Katsayı",
        colTep: "TEP",
        colShare: "Pay",
        colUnit: "Birim",
        noInputNote: "Tüm alanlar boş — en az bir tüketim değeri girin.",
        versionLabel: "Katsayı sürümü",
        customBadge: "özel katsayı",
        addCustom: "+ Özel enerji kaynağı ekle",
        removeCustom: "Kaldır",
        customNamePlaceholder: "Kaynak adı",
        customUnitPlaceholder: "Birim",
        customFactorPlaceholder: "TEP katsayısı (TEP/birim)",
        customFactorWarning: "Bu satırda özel katsayı kullanıldı.",
        commentary0_250:
          "Yaklaşık enerji tüketiminiz temel izleme ve verimlilik değerlendirmesi için uygun görünebilir; proje özelinde ayrıca değerlendirilmelidir.",
        commentary250_500:
          "Yaklaşık enerji tüketiminiz düzenli raporlama ve performans takibi açısından ön değerlendirmede değerlendirilmeye değer görünüyor; kesin hüküm için uzman incelemesi önerilir.",
        commentary500_1000:
          "Yaklaşık TEP değeriniz enerji yönetimi, detaylı analiz ve potansiyel yükümlülükler açısından uzman değerlendirmesi gerektirebilir.",
        commentary1000_plus:
          "Yaklaşık TEP değeriniz sanayi tesisleri için enerji yönetimi ve mevzuat eşikleri açısından detaylı uzman değerlendirmesi gerektirebilir; nihai sonuç tesis özelinde belirlenmelidir.",
        ctaStandardTitle: "Enerji tüketiminizi izlenebilir hale getirin",
        ctaStandardButton: "Ön Değerlendirme Talep Et",
        ctaExpertTitle: "TEP değeriniz detaylı değerlendirme gerektirebilir",
        ctaExpertButton: "Uzman Değerlendirmesi Talep Et",
        legalDisclaimer:
          "Bu araç ön değerlendirme amacıyla hazırlanmıştır. Hesaplama sonuçları; resmi enerji etüdü, mevzuat yükümlülüğü tespiti, VAP başvurusu, ISO 50001 belgelendirme kararı veya resmi beyan yerine geçmez. Nihai değerlendirme tesisin faaliyet alanı, kullanım alanı, üretim yapısı, ölçüm altyapısı ve güncel mevzuat çerçevesinde ayrıca yapılmalıdır.",
      },
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
      lead: "Mevzuat odaklı, ölçülebilir danışmanlık. Su verimliliği, enerji verimliliği ve sürdürülebilirlik alanlarında saha tecrübesi ile dijital altyapı bir arada.",
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
    matrix: {
      eyebrow: "Assessment tool",
      title: "Water efficiency obligation assessment",
      lead:
        "Pre-assess whether you are obligatory or voluntary based on your NACE code and employee count. Download a draft report suitable for quality teams to forward to senior management.",
      facilityTypeLabel: "Facility type",
      facilityIndustrial: "Industrial facility",
      facilityOsb: "Organized Industrial Zone (OIZ)",
      facilityFreeZone: "Free Zone",
      facilityIndustrialZone: "Industrial Zone",
      naceLabel: "NACE code (Annex-1)",
      nacePlaceholder: "Search by code or activity…",
      employeeLabel: "Employee count",
      employeePlaceholder: "e.g. 75",
      sharedEmployeeHint:
        "Total employee count applicable to all activities.",
      addActivity: "Add activity",
      removeActivity: "Remove",
      activityRowLabel: "Activity",
      maxActivitiesReached: "You can add up to 10 activities.",
      activitiesEvaluated: "{count} activities assessed",
      resultsTableNace: "NACE",
      resultsTableActivity: "Activity",
      resultsTableStatus: "Result",
      evaluateHint: "For industrial facilities, enter NACE code and employee count.",
      resultTitle: "Assessment result",
      resultReference:
        "Water Efficiency Regulation and Industrial Water Efficiency Application Guide Annex-1 / p.15.",
      downloadCta: "Download management-ready report",
      modalTitle: "Report details",
      modalIntro:
        "Complete the fields below before downloading the draft report. The document is formatted as an informational brief for senior management.",
      companyLabel: "Company name",
      recipientLabel: "Report recipient (full name)",
      emailLabel: "Email",
      phoneLabel: "Phone",
      kvkkLabel:
        "I have read the Form Privacy Notice and accept processing of my personal data for this request.",
      submitDownload: "Generate and download report",
      cancel: "Cancel",
      disclaimer:
        "This result is for information only; it does not replace an official application or legal advice.",
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
          "Water efficiency, energy efficiency, sustainability strategy, and dangerous-goods compliance — each its own discipline, all under one quality framework.",
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
      energy: {
        title: "Energy Efficiency Consulting",
        short:
          "We analyse site energy consumption, identify efficiency opportunities, and build data, reporting and action-plan structures so performance becomes trackable.",
        brand: "energy",
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
    energyPage: {
      eyebrow: "Service — Energy Efficiency",
      title: "Energy Efficiency Consulting",
      lead: "Nexovia helps organisations make energy consumption measurable, identify inefficiencies, prioritise improvement opportunities, and move energy performance into a structure that can be monitored regularly.",
      seoDescription:
        "Nexovia energy efficiency consulting covers site consumption analysis, field assessment, efficiency opportunities, ISO 50001 readiness, reporting and monitoring.",
      ctaPrimary: "Request consulting",
      ctaSecondary: "Explore our sustainability approach",
      scopeNoteTitle: "Energy efficiency work is more than a savings list.",
      scopeNoteLead:
        "The aim is to assess electricity, natural gas, steam, compressed air, cooling, HVAC, lighting and process-related use holistically. Official audit, VAP or certification processes that require authorisation under regulation are scoped per project; where needed we work with authorised partners.",
      processTitle: "Process",
      processIntro:
        "A six-step, deliverable-oriented methodology. Each step produces a reportable output.",
      evaluatedTopicsTitle: "Areas assessed",
      outcomesTitle: "Energy performance is managed through regular measurement and sound interpretation.",
      outcomesLead:
        "The value of energy efficiency work is not only one-off savings suggestions. The real value is understanding which activities drive consumption, spotting deviations early, grounding investment decisions in data, and making energy performance regularly reportable.",
      isoTitle: "A strong start for ISO 50001 readiness: data, boundaries and indicator discipline.",
      isoLead:
        "Organisations building an energy management system first need clear energy boundaries, significant energy uses, data sources and performance indicators. Nexovia supports ISO 50001 readiness through structured energy data, defined responsibilities and monitoring design.",
      sustainTitle:
        "Energy efficiency is one of the strongest data domains in sustainability reporting.",
      sustainLead:
        "Energy use is directly linked to carbon emissions, operating cost and resource efficiency. Energy efficiency work creates a reliable data base for ESG, sustainability reporting and corporate environmental performance indicators.",
      audienceTitle: "Who is it for?",
      outputsTitle: "Deliverables",
      ctaTitle: "Let's uncover your site's energy efficiency potential together.",
      ctaLead:
        "Let's review your consumption, main use points and improvement opportunities — and build a measurable roadmap suited to your organisation.",
      ctaButton: "Request consulting",
      cardLinkLabel: "View details",
      tep: {
        eyebrow: "TEP calculator",
        title: "Calculate your site's annual energy use in TEP.",
        intro:
          "Enter annual consumption for electricity, natural gas and other energy sources to estimate your approximate total TEP. Results are for preliminary assessment only — not official declarations, audits or regulatory interpretation.",
        inputHint:
          "Empty fields are treated as zero. Enter annual consumption amounts.",
        calculateButton: "Calculate TEP",
        validationError: "Fix negative or invalid values.",
        totalLabel: "Approx. total annual TEP",
        colSource: "Energy source",
        colConsumption: "Consumption",
        colFactor: "Factor",
        colTep: "TEP",
        colShare: "Share",
        colUnit: "Unit",
        noInputNote: "All fields empty — enter at least one consumption value.",
        versionLabel: "Factor version",
        customBadge: "custom factor",
        addCustom: "+ Add custom energy source",
        removeCustom: "Remove",
        customNamePlaceholder: "Source name",
        customUnitPlaceholder: "Unit",
        customFactorPlaceholder: "TEP factor (TEP/unit)",
        customFactorWarning: "A custom factor is used for this row.",
        commentary0_250:
          "Your approximate consumption may suit basic monitoring and efficiency review; this should be confirmed for your specific site.",
        commentary250_500:
          "Your approximate consumption may warrant regular reporting and performance tracking in preliminary terms; expert review is advised before any firm conclusion.",
        commentary500_1000:
          "Your approximate TEP may require expert review for energy management, detailed analysis and potential obligations.",
        commentary1000_plus:
          "Your approximate TEP may require detailed expert review for industrial energy management and regulatory thresholds; final outcomes depend on site-specific factors.",
        ctaStandardTitle: "Make your energy use measurable",
        ctaStandardButton: "Request preliminary assessment",
        ctaExpertTitle: "Your TEP may need detailed review",
        ctaExpertButton: "Request expert assessment",
        legalDisclaimer:
          "This tool is for preliminary assessment only. Results do not replace official energy audits, regulatory obligation checks, VAP applications, ISO 50001 certification decisions or official declarations. Final evaluation must consider activity type, use areas, production structure, metering infrastructure and current regulation.",
      },
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
      lead: "Regulation-aware, measurable consulting. Field experience and digital infrastructure together, across water efficiency, energy efficiency and sustainability.",
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
