// FAQ copy — TR from mockup/nexovia_hizmetler_ve_sss_detayli.md;
// EN kept shorter until a dedicated translation pass.
import type { LangCode } from "./getDictionary";
import type { PageKey } from "@/lib/routes";

export interface FaqItem {
  q: string;
  a: string;
}

export const WATER_FAQ: Record<LangCode, FaqItem[]> = {
  TR: [
    {
      q: "Su verimliliği danışmanlığı nedir?",
      a: "Su verimliliği danışmanlığı, bir işletmenin su tüketimini analiz ederek gereksiz tüketim, kayıp-kaçak, ölçüm eksikliği ve iyileştirme fırsatlarını belirleyen danışmanlık sürecidir. Amaç, su kullanımını azaltmak ve daha yönetilebilir hale getirmektir.",
    },
    {
      q: "Su verimliliği etüdü ile su verimliliği danışmanlığı aynı şey midir?",
      a: "Etüt, danışmanlık sürecinin önemli bir parçasıdır. Su verimliliği etüdü mevcut durumu analiz ederken, danışmanlık süreci buna ek olarak iyileştirme planı, raporlama, takip göstergeleri ve dijital izleme önerilerini de kapsayabilir.",
    },
    {
      q: "Bu hizmet sadece üretim tesisleri için mi uygundur?",
      a: "Hayır. Üretim tesislerinin yanı sıra oteller, hastaneler, üniversiteler, OSB'ler, alışveriş merkezleri, lojistik tesisleri ve büyük ticari yapılar için de uygundur.",
    },
    {
      q: "Su tüketim verilerimiz çok düzenli değilse çalışma yapılabilir mi?",
      a: "Evet. Veri eksikliği de mevcut durum analizinin bir parçasıdır. Çalışma sırasında hangi verilerin eksik olduğu, hangi sayaçların gerekli olduğu ve nasıl bir takip sistemi kurulması gerektiği belirlenebilir.",
    },
    {
      q: "Alt sayaç yoksa su verimliliği çalışması yapılabilir mi?",
      a: "Yapılabilir; ancak alt sayaç olmaması detaylı analiz kapasitesini sınırlar. Bu durumda ana sayaç, fatura, saha gözlemi, proses bilgisi ve tahmini kullanım dağılımları ile başlangıç değerlendirmesi yapılabilir. Ardından alt sayaçlandırma önerileri sunulabilir.",
    },
    {
      q: "Çalışma sonucunda kesin tasarruf garantisi verilir mi?",
      a: "Su verimliliği çalışmaları iyileştirme potansiyellerini ortaya koyar. Gerçekleşecek tasarruf; önerilerin uygulanmasına, tesis koşullarına, yatırım kararlarına ve düzenli takip yapılmasına bağlıdır. Bu nedenle garanti yerine ölçülebilir potansiyel ve uygulanabilir aksiyon planı sunulur.",
    },
    {
      q: "Minimum gece akışı testi bu hizmete dahil midir?",
      a: "İhtiyaca göre dahil edilebilir veya önerilebilir. Özellikle gece tüketimi yüksek görünen tesislerde minimum gece akışı testi kayıp-kaçak kontrolü için faydalı bir yöntemdir.",
    },
    {
      q: "ISO 46001 için hazırlık sağlar mı?",
      a: "Evet. Su verimliliği danışmanlığı, ISO 46001 yaklaşımında ihtiyaç duyulan veri, sayaç, hedef, performans göstergesi ve iyileştirme planı altyapısının oluşturulmasına destek olur. Ancak belgelendirme süreci ayrı bir değerlendirme gerektirir.",
    },
    {
      q: "ESG raporlamasına katkı sağlar mı?",
      a: "Evet. Toplam su tüketimi, kaynak bazlı su kullanımı, birim tüketim, geri kazanım ve iyileştirme aksiyonları ESG raporlamasında kullanılabilecek çevresel göstergelerdir.",
    },
    {
      q: "Nexovia Flow bu hizmetle birlikte kullanılabilir mi?",
      a: "Evet. Nexovia Flow, su tüketim verilerinin dijital olarak izlenmesi, analiz edilmesi ve raporlanması için danışmanlık sürecini destekleyen bir platform olarak kullanılabilir.",
    },
  ],
  EN: [
    {
      q: "What is water-efficiency consulting?",
      a: "It is a structured process to analyse consumption, identify losses, metering gaps and improvement opportunities, and make water use more manageable — not only to cut volume.",
    },
    {
      q: "Is a water audit the same as consulting?",
      a: "The audit is a core part of consulting. Consulting can also cover improvement plans, reporting, indicators and digital monitoring recommendations.",
    },
    {
      q: "Is this only for manufacturing sites?",
      a: "No. Hotels, hospitals, campuses, industrial zones, retail and logistics sites can all benefit.",
    },
    {
      q: "Can you work with irregular data?",
      a: "Yes. Data gaps are part of the baseline. The engagement clarifies what to measure next and how to set up tracking.",
    },
    {
      q: "What if we have no sub-meters?",
      a: "Work can still start from main meters, bills and field observation; sub-metering is then recommended where detail is needed.",
    },
    {
      q: "Do you guarantee savings?",
      a: "We quantify potential and prioritise actions. Realised savings depend on implementation, investment and ongoing monitoring.",
    },
    {
      q: "Is minimum night flow testing included?",
      a: "It can be included or recommended where night consumption suggests leakage risk.",
    },
    {
      q: "Does this support ISO 46001 readiness?",
      a: "Yes, for data, indicators and improvement planning. Certification itself is a separate process.",
    },
    {
      q: "Does it help ESG reporting?",
      a: "Yes — consumption, intensity, recovery and improvement actions are typical environmental indicators.",
    },
    {
      q: "Can Nexovia Flow be used alongside?",
      a: "Yes. Flow supports digital monitoring and reporting during and after the consulting engagement.",
    },
  ],
};

export const SUSTAIN_FAQ: Record<LangCode, FaqItem[]> = {
  TR: [
    {
      q: "Sürdürülebilirlik danışmanlığı nedir?",
      a: "Sürdürülebilirlik danışmanlığı, kurumların çevresel, sosyal ve yönetişim başlıklarında mevcut durumunu değerlendiren, hedef ve aksiyon planı oluşturan, raporlamaya uygun veri altyapısı kurmasına destek olan danışmanlık hizmetidir.",
    },
    {
      q: "ESG ile sürdürülebilirlik aynı şey midir?",
      a: "ESG, sürdürülebilirlik performansını çevresel, sosyal ve yönetişim başlıklarıyla ölçmeye yarayan bir yaklaşımdır. Sürdürülebilirlik daha geniş bir kavramdır; ESG ise bu performansın takip ve raporlama yapılarından biridir.",
    },
    {
      q: "Küçük ve orta ölçekli işletmeler için uygun mudur?",
      a: "Evet. KOBİ'ler için sürdürülebilirlik çalışmaları daha sade ve uygulanabilir bir yol haritasıyla başlatılabilir. İlk aşamada veri toplama, kaynak tüketimi, atık yönetimi ve temel çevresel göstergeler üzerine odaklanmak mümkündür.",
    },
    {
      q: "Sürdürülebilirlik raporu hazırlamak zorunda mıyız?",
      a: "Her kurum için zorunluluk durumu farklı olabilir. Ancak zorunluluk olmasa bile müşteriler, tedarik zinciri, yatırımcılar ve kurumsal itibar açısından sürdürülebilirlik verilerinin düzenli takip edilmesi önemli hale gelmiştir.",
    },
    {
      q: "Karbon ayak izi bu hizmete dahil midir?",
      a: "Karbon ayak izi hesaplamasına hazırlık ve faaliyet verilerinin düzenlenmesi bu hizmet kapsamında ele alınabilir. Tam kapsamlı karbon ayak izi hesaplaması için ayrıca veri kalitesi, kapsam sınırları ve hesaplama metodolojisi netleştirilmelidir.",
    },
    {
      q: "ESG veri seti ne işe yarar?",
      a: "ESG veri seti, kurumun çevresel ve sürdürülebilirlik performansını izlemek için hangi verileri toplayacağını gösterir. Bu sayede raporlama dönemlerinde veri arama ve belge toplama süreci daha düzenli hale gelir.",
    },
    {
      q: "Kanıt dosyası neden önemlidir?",
      a: "Raporlanan verilerin güvenilir olabilmesi için dayanak belgelerinin bulunması gerekir. Kanıt dosyası; fatura, sayaç kaydı, atık belgesi, analiz raporu ve eğitim kaydı gibi belgeleri düzenli şekilde saklamayı sağlar.",
    },
    {
      q: "Bu hizmet yazılımla desteklenebilir mi?",
      a: "Evet. Sürdürülebilirlik verileri farklı departmanlardan geldiği için dijital takip sistemleri süreci kolaylaştırır. Nexovia yaklaşımı, danışmanlık çıktılarının dijital izleme altyapısıyla desteklenmesini önemser.",
    },
    {
      q: "Sürdürülebilirlik yol haritası ne kadar detaylı olur?",
      a: "Kurumun ihtiyacına göre değişir. Başlangıç seviyesinde temel çevresel göstergeler, hedefler ve aksiyonlar yeterli olabilir. Daha ileri seviyede ESG, karbon, tedarik zinciri ve raporlama yapıları da dahil edilebilir.",
    },
    {
      q: "Sadece çevresel sürdürülebilirlik mi ele alınıyor?",
      a: "Nexovia'nın odak noktası ağırlıklı olarak çevresel performans, kaynak verimliliği, veri takibi ve raporlanabilirliktir. Sosyal ve yönetişim başlıkları ise kurumun ihtiyacına göre kapsamlandırılabilir.",
    },
  ],
  EN: [
    {
      q: "What is sustainability consulting?",
      a: "It helps organisations assess environmental performance, set targets and build a reporting-ready data and evidence structure.",
    },
    {
      q: "Are ESG and sustainability the same?",
      a: "ESG is a reporting lens (environmental, social, governance). Sustainability is broader; ESG is one way to track and disclose it.",
    },
    {
      q: "Is it suitable for SMEs?",
      a: "Yes. A phased roadmap can start with core environmental indicators and data discipline.",
    },
    {
      q: "Must we publish a sustainability report?",
      a: "Requirements vary. Even without a mandate, customers and supply chains increasingly expect traceable data.",
    },
    {
      q: "Is carbon footprint included?",
      a: "Preparation and activity data structuring can be included; full footprint studies need explicit scope and methodology.",
    },
    {
      q: "What is an ESG data set?",
      a: "A defined list of indicators and collection rules so reporting cycles are repeatable, not ad hoc.",
    },
    {
      q: "Why does an evidence file matter?",
      a: "Reported figures need supporting documents — bills, meter logs, waste records, training logs — for auditability.",
    },
    {
      q: "Can software support this work?",
      a: "Yes. Digital tracking helps when data comes from many departments. Nexovia links consulting outputs to monitoring tools where relevant.",
    },
    {
      q: "How detailed is the roadmap?",
      a: "From a starter set of indicators to fuller ESG, carbon and supply-chain structures — scoped to your maturity.",
    },
    {
      q: "Is it only environmental?",
      a: "Our core focus is environmental performance and resource efficiency. Social and governance topics can be scoped as needed.",
    },
  ],
};

export const FLOW_FAQ: Record<LangCode, FaqItem[]> = {
  TR: [
    {
      q: "Nexovia Flow nedir?",
      a: "Nexovia Flow, su tüketim verilerinin izlenmesi, analiz edilmesi, raporlanması ve su verimliliği aksiyonlarının takip edilmesi için tasarlanmış dijital bir platformdur.",
    },
    {
      q: "Nexovia Flow danışmanlık hizmeti midir?",
      a: "Hayır. Nexovia Flow bir dijital platformdur. Ancak su verimliliği danışmanlığı sürecinde elde edilen verilerin takibi ve raporlanması için destekleyici araç olarak kullanılabilir.",
    },
    {
      q: "Sayaçlardan otomatik veri alıyor mu?",
      a: "Bu, tesisin mevcut sayaç altyapısına bağlıdır. Uygun dijital sayaç veya entegrasyon altyapısı varsa otomatik veri akışı değerlendirilebilir. Manuel veri girişiyle de takip yapılabilir.",
    },
    {
      q: "Alt sayaç yoksa platform kullanılabilir mi?",
      a: "Evet. Ana sayaç verileriyle başlangıç takibi yapılabilir. Ancak daha detaylı analiz için alt sayaçlandırma önerilir.",
    },
    {
      q: "Oteller için uygun mu?",
      a: "Evet. Otellerde oda, geceleme, çamaşırhane, mutfak, havuz ve peyzaj gibi farklı tüketim alanları olduğu için Nexovia Flow otel su yönetiminde faydalı olabilir.",
    },
    {
      q: "Üretim tesislerinde hangi göstergeler izlenebilir?",
      a: "Üretim tesislerinde birim üretim başına su tüketimi, proses bazlı tüketim, vardiya bazlı değişim, yardımcı işletme tüketimi ve dönemsel trendler izlenebilir.",
    },
    {
      q: "Platform ESG raporlamasına katkı sağlar mı?",
      a: "Evet. Su tüketimi, kaynak kullanımı ve su verimliliği aksiyonları ESG raporlamasında kullanılabilecek önemli çevresel göstergelerdir.",
    },
    {
      q: "ISO 46001 için kullanılabilir mi?",
      a: "Nexovia Flow, ISO 46001 yaklaşımında ihtiyaç duyulan su verisi takibi, performans göstergeleri, hedef izleme ve raporlama süreçlerini destekleyebilir.",
    },
    {
      q: "Uyarı sistemi nasıl çalışır?",
      a: "Belirlenen eşik değerlerin aşılması durumunda sistem anormal tüketim alanlarını işaretleyebilir. Bu yapı tesisin veri altyapısına ve platform kurgusuna göre özelleştirilebilir.",
    },
    {
      q: "Birden fazla tesis takip edilebilir mi?",
      a: "Evet. Çok lokasyonlu kurumlar için tesis bazlı tüketimlerin karşılaştırılması ve merkezi raporlanması mümkündür.",
    },
    {
      q: "Flow şu anda kullanılabilir mi?",
      a: "Şu anda erken erişim aşamasındayız. Danışmanlık projeleriyle birlikte sınırlı sayıda tesise açılıyor.",
    },
    {
      q: "Verilerim kimde?",
      a: "Tüm veriler size aittir. Dışa aktarım ve API erişimi standarttır.",
    },
  ],
  EN: [
    {
      q: "What is Nexovia Flow?",
      a: "A digital platform to monitor, analyse and report water consumption and track efficiency actions.",
    },
    {
      q: "Is Flow a consulting service?",
      a: "No. It is a product that supports consulting and ongoing operations.",
    },
    {
      q: "Does it pull data from meters automatically?",
      a: "Depends on your metering and integration setup; manual entry is also supported.",
    },
    {
      q: "Can we start without sub-meters?",
      a: "Yes, from main meters; sub-metering is recommended for deeper analysis.",
    },
    {
      q: "Is it suitable for hotels?",
      a: "Yes — rooms, laundry, F&B, pools and irrigation are typical consumption zones.",
    },
    {
      q: "Which KPIs work in manufacturing?",
      a: "Specific consumption per unit, by process, shift patterns, utilities and trends.",
    },
    {
      q: "Does it help ESG reporting?",
      a: "Yes — water use, intensity and improvement actions are common disclosures.",
    },
    {
      q: "Does it support ISO 46001?",
      a: "It can support tracking, indicators, targets and reporting workflows.",
    },
    {
      q: "How do alerts work?",
      a: "Thresholds flag unusual night, weekend or line-level consumption — configured per site.",
    },
    {
      q: "Multi-site tracking?",
      a: "Yes — compare and report across facilities centrally.",
    },
    {
      q: "Is Flow available now?",
      a: "We are in early access, onboarding a limited number of sites with consulting partners.",
    },
    {
      q: "Who owns my data?",
      a: "You do. Export and API access are standard.",
    },
  ],
};

export const ADR_FAQ: Record<LangCode, FaqItem[]> = {
  TR: [
    {
      q: "Nexovia ADR nedir?",
      a: "Nexovia ADR, ADR/TMGD bağlantılı belge, kayıt, SDS/MSDS, süre, eğitim, taşıma evrakı ve denetim hazırlığı süreçlerinin dijital ortamda takip edilmesine yardımcı olan bir platformdur.",
    },
    {
      q: "Nexovia ADR bir TMGD danışmanlık hizmeti midir?",
      a: "Hayır. Nexovia ADR danışmanlık hizmeti değildir. Platform, işletmelerin kendi iç kayıtlarını ve TMGD çalışmalarıyla bağlantılı süreçlerini dijital ortamda daha düzenli yönetmesine destek olur.",
    },
    {
      q: "Platform TMGD'nin yerine geçer mi?",
      a: "Hayır. Nexovia ADR, TMGD veya uzman değerlendirmesinin yerine geçmez. Yalnızca belge ve süreç takibini kolaylaştıran dijital altyapı sağlar.",
    },
    {
      q: "UN numarası ve ADR sınıfı otomatik belirlenir mi?",
      a: "Platform, kayıtların düzenli tutulmasına yardımcı olur. Ancak tehlikeli madde sınıflandırması uzman değerlendirmesi gerektirebilir. Bu nedenle otomatik sınıflandırma yerine doğrulanmış bilgilerin kayıt altına alınması esastır.",
    },
    {
      q: "SDS/MSDS belgeleri platformda takip edilebilir mi?",
      a: "Evet. SDS/MSDS belgeleri ürün kayıtlarıyla ilişkilendirilebilir, revizyon tarihleri ve versiyon bilgileri takip edilebilir.",
    },
    {
      q: "Taşıma evrakları platforma yüklenebilir mi?",
      a: "Evet. Sevkiyat kayıtlarıyla bağlantılı taşıma evrakları dijital ortamda arşivlenebilir ve kontrol durumu takip edilebilir.",
    },
    {
      q: "Eğitim kayıtları takip edilebilir mi?",
      a: "Evet. Eğitim tarihleri, katılımcılar, görev grupları ve sertifika kayıtları platformda tutulabilir.",
    },
    {
      q: "Süresi yaklaşan belgeler görülebilir mi?",
      a: "Evet. Süreli belgeler kayıt altına alınarak geçerlilik tarihleri takip edilebilir. Böylece süresi yaklaşan belgelerin önceden fark edilmesi kolaylaşır.",
    },
    {
      q: "Denetim hazırlığında nasıl fayda sağlar?",
      a: "Denetim öncesi kontrol listeleri, eksik belge takibi, açık aksiyonlar ve kanıt dokümanları tek merkezde izlenebilir. Bu da hazırlık sürecini daha düzenli hale getirir.",
    },
    {
      q: "Çok lokasyonlu işletmeler için uygun mu?",
      a: "Evet. Birden fazla tesis veya şube bulunan işletmelerde kayıtların standart şekilde tutulmasına ve merkezi raporlanmasına destek olur.",
    },
    {
      q: "Platformda kimler yetkilendirilebilir?",
      a: "İşletmenin ihtiyacına göre depo, lojistik, kalite, çevre, iş güvenliği, satın alma, yönetim ve TMGD ile ilişkili kullanıcılar için farklı erişim yetkileri kurgulanabilir.",
    },
    {
      q: "Nexovia ADR hangi riskleri azaltır?",
      a: "Eksik belge, güncel olmayan SDS/MSDS, süresi geçmiş belge, dağınık kayıt, denetim hazırlığında zaman kaybı ve kurumsal hafıza kaybı gibi riskleri azaltmaya yardımcı olur.",
    },
    {
      q: "Şu anda kullanılabilir mi?",
      a: "Erken erişim aşamasındayız; sınırlı sayıda operasyona açılıyor.",
    },
  ],
  EN: [
    {
      q: "What is Nexovia ADR?",
      a: "A platform to track dangerous-goods records, SDS/MSDS, transport documents, training, expiry dates and inspection readiness.",
    },
    {
      q: "Is it a TMGD consulting service?",
      a: "No. It supports your internal records and TMGD-related workflows; it does not replace advisers.",
    },
    {
      q: "Does it replace a safety adviser?",
      a: "No. It is document and process infrastructure, not expert judgement.",
    },
    {
      q: "Are UN numbers classified automatically?",
      a: "The platform structures verified data. Classification still requires competent review.",
    },
    {
      q: "Can SDS/MSDS be tracked?",
      a: "Yes — linked to products with revision dates and versions.",
    },
    {
      q: "Can transport documents be uploaded?",
      a: "Yes — archived against shipments with control status.",
    },
    {
      q: "Training records?",
      a: "Yes — dates, attendees, roles and certificates can be logged.",
    },
    {
      q: "Expiry visibility?",
      a: "Yes — validity dates help surface renewals early.",
    },
    {
      q: "Inspection readiness?",
      a: "Checklists, gaps, open actions and evidence in one place.",
    },
    {
      q: "Multi-site use?",
      a: "Yes — standardised records and central reporting.",
    },
    {
      q: "Who can access the platform?",
      a: "Role-based access for warehouse, logistics, quality, EHS, procurement, management and TMGD-related users.",
    },
    {
      q: "Which risks does it reduce?",
      a: "Missing or outdated documents, scattered records, inspection scramble and loss of institutional memory.",
    },
    {
      q: "Is it available now?",
      a: "Early access for a limited number of operations.",
    },
  ],
};

export const TRAININGS_FAQ: Record<LangCode, FaqItem[]> = {
  TR: [
    {
      q: "Eğitimler kuruma özel hazırlanabilir mi?",
      a: "Evet. Eğitim içerikleri kurumun sektörü, faaliyet alanı, çalışan profili ve ihtiyaçlarına göre özelleştirilebilir.",
    },
    {
      q: "Eğitimler online yapılabilir mi?",
      a: "Evet. Eğitimler online, yüz yüze veya hibrit formatta düzenlenebilir.",
    },
    {
      q: "Eğitim süresi ne kadardır?",
      a: "Eğitim süresi konuya göre değişir. Kısa farkındalık eğitimleri 1-2 saat sürebilir. Daha kapsamlı eğitimler yarım gün veya tam gün olarak planlanabilir.",
    },
    {
      q: "Eğitimler sadece yöneticiler için mi?",
      a: "Hayır. Eğitimler yönetim, teknik ekip, çevre birimi, kalite, üretim, depo, lojistik veya saha çalışanları için ayrı ayrı kurgulanabilir.",
    },
    {
      q: "Platform eğitimleri uygulamalı olur mu?",
      a: "Evet. Nexovia Flow ve Nexovia ADR platform eğitimleri uygulamalı kullanım senaryoları üzerinden yapılabilir.",
    },
    {
      q: "Katılım belgesi verilir mi?",
      a: "Kurum ihtiyacına göre katılım belgesi veya eğitim katılım kaydı hazırlanabilir.",
    },
    {
      q: "Eğitim sonrası doküman verilir mi?",
      a: "Evet. Eğitim sunumu, kontrol listeleri veya kullanım rehberi gibi destekleyici dokümanlar paylaşılabilir.",
    },
    {
      q: "Eğitimler sürdürülebilirlik raporlamasına katkı sağlar mı?",
      a: "Evet. Çalışan farkındalığı, görev dağılımı ve veri toplama disiplini sürdürülebilirlik raporlamasının önemli parçalarıdır.",
    },
    {
      q: "ADR/TMGD eğitimi veriliyor mu?",
      a: "Bu içerikte ADR/TMGD danışmanlığı veya resmi eğitim hizmeti iddiası bulunmaz. Nexovia ADR kapsamında platform kullanım eğitimi ve dijital kayıt yönetimi eğitimi sunulabilir.",
    },
    {
      q: "Eğitim sonrası takip yapılabilir mi?",
      a: "Kurum ihtiyacına göre eğitim sonrası aksiyon listesi, kısa değerlendirme veya platform kullanım takibi yapılabilir.",
    },
  ],
  EN: [
    {
      q: "Can programmes be tailored?",
      a: "Yes — content is adapted to sector, site profile and audience.",
    },
    {
      q: "Online delivery?",
      a: "Yes — online, in-person or hybrid.",
    },
    {
      q: "How long are sessions?",
      a: "From 1–2 hour awareness sessions to half- or full-day programmes.",
    },
    {
      q: "Management only?",
      a: "No — modules can target operations, EHS, quality, logistics and field teams.",
    },
    {
      q: "Hands-on platform training?",
      a: "Yes — Flow and ADR training can follow live scenarios.",
    },
    {
      q: "Certificates?",
      a: "Attendance records or certificates can be provided if required.",
    },
    {
      q: "Materials after training?",
      a: "Yes — slides, checklists or quick-reference guides can be shared.",
    },
    {
      q: "Link to sustainability reporting?",
      a: "Yes — awareness and data discipline support reporting quality.",
    },
    {
      q: "Official ADR/TMGD training?",
      a: "We do not offer regulated TMGD consulting or certification training. Platform and digital records training is available.",
    },
    {
      q: "Follow-up?",
      a: "Action lists, short reviews or platform adoption check-ins can be agreed.",
    },
  ],
};

export const GENERAL_FAQ: Record<LangCode, FaqItem[]> = {
  TR: [
    {
      q: "Nexovia hangi alanlarda çözüm sunar?",
      a: "Nexovia; su verimliliği, sürdürülebilirlik, ESG veri yönetimi, dijital raporlama, Nexovia Flow ve Nexovia ADR Platformu alanlarında çözüm sunar.",
    },
    {
      q: "Nexovia yalnızca danışmanlık firması mıdır?",
      a: "Hayır. Nexovia hem danışmanlık yaklaşımı hem de dijital platform çözümleri sunan bir B2B çözüm markasıdır. Su verimliliği ve sürdürülebilirlikte danışmanlık; ADR/TMGD süreçlerinde ise dijital takip platformu yaklaşımı öne çıkar.",
    },
    {
      q: "Nexovia ADR danışmanlık hizmeti veriyor mu?",
      a: "Hayır. Nexovia ADR, danışmanlık hizmeti değil dijital takip ve dokümantasyon platformudur. İşletmelerin ADR/TMGD bağlantılı süreçlerini daha düzenli takip etmesine yardımcı olur.",
    },
    {
      q: "Nexovia Flow ve Nexovia ADR aynı sistemin parçaları mı?",
      a: "Her ikisi de Nexovia'nın dijital çözüm yaklaşımının parçasıdır. Nexovia Flow su verimliliği odaklıdır. Nexovia ADR ise tehlikeli madde süreçleri için belge, kayıt ve denetim hazırlığı takibine odaklanır.",
    },
    {
      q: "Hizmetler sektörlere göre özelleştirilebilir mi?",
      a: "Evet. Her sektörün ihtiyaçları farklı olduğu için hizmet kapsamı kurumun faaliyet alanına göre uyarlanabilir.",
    },
    {
      q: "İlk görüşmede hangi bilgiler gerekir?",
      a: "İlk değerlendirme için faaliyet alanı, lokasyon sayısı, temel ihtiyaç, mevcut veri durumu, varsa raporlama beklentisi ve öncelikli sorun alanları paylaşılabilir.",
    },
    {
      q: "Yerinde saha ziyareti gerekli mi?",
      a: "Su verimliliği danışmanlığı gibi saha gözlemi gerektiren çalışmalarda yerinde inceleme faydalıdır. Dijital platform kullanım senaryolarında ise süreç online olarak da başlatılabilir.",
    },
    {
      q: "Teklif süreci nasıl ilerler?",
      a: "Öncelikle kurum ihtiyacı anlaşılır. Ardından kapsam, lokasyon sayısı, veri durumu, beklentiler ve teslimatlar netleştirilir. Buna göre özel teklif hazırlanır.",
    },
    {
      q: "Çalışma sonunda rapor veriliyor mu?",
      a: "Evet. Hizmet kapsamına göre mevcut durum raporu, aksiyon planı, yönetim sunumu, veri seti, kontrol listesi veya platform kullanım çıktıları hazırlanabilir.",
    },
    {
      q: "Nexovia çözümleri KOBİ'ler için uygun mu?",
      a: "Evet. KOBİ'ler için daha sade, uygulanabilir ve önceliklendirilmiş kapsamlar oluşturulabilir.",
    },
    {
      q: "Çok lokasyonlu firmalar için uygun mu?",
      a: "Evet. Nexovia yaklaşımı özellikle çok lokasyonlu yapılarda veri, belge, tüketim ve aksiyon takibini merkezi hale getirmek için uygundur.",
    },
    {
      q: "Veriler gizli tutulur mu?",
      a: "Kurum verileri gizlilik ve yetkilendirme prensipleriyle ele alınmalıdır. Platform kullanımında erişim yetkileri kurum ihtiyacına göre kurgulanabilir.",
    },
    {
      q: "Web sitesinden nasıl iletişime geçilebilir?",
      a: "Kurumlar iletişim formu veya teklif talep alanı üzerinden Nexovia ile iletişime geçebilir.",
    },
  ],
  EN: [
    {
      q: "What does Nexovia cover?",
      a: "Water efficiency, sustainability, ESG data, digital reporting, Nexovia Flow and Nexovia ADR.",
    },
    {
      q: "Consulting only?",
      a: "No — consulting for water and sustainability; digital platforms for ongoing tracking, especially ADR/TMGD records.",
    },
    {
      q: "Does Nexovia ADR include consulting?",
      a: "No. ADR is a documentation and tracking platform.",
    },
    {
      q: "Are Flow and ADR one product?",
      a: "They share a brand approach: Flow for water; ADR for dangerous-goods records and inspection readiness.",
    },
    {
      q: "Sector-specific scopes?",
      a: "Yes — engagements are adapted to your activity and sites.",
    },
    {
      q: "What to prepare for a first call?",
      a: "Sector, number of sites, main need, data maturity, reporting expectations and priority issues.",
    },
    {
      q: "On-site visits required?",
      a: "Often useful for water work; platform onboarding can start remotely.",
    },
    {
      q: "How does quoting work?",
      a: "We clarify scope, locations, data state and deliverables, then propose a tailored offer.",
    },
    {
      q: "Deliverables?",
      a: "Baseline reports, action plans, management summaries, data sets, checklists or platform outputs as scoped.",
    },
    {
      q: "SME-friendly?",
      a: "Yes — phased, practical scopes are available.",
    },
    {
      q: "Multi-site organisations?",
      a: "Yes — centralised tracking of consumption, documents and actions.",
    },
    {
      q: "Data confidentiality?",
      a: "Handled under confidentiality and role-based access on platforms.",
    },
    {
      q: "How to contact us?",
      a: "Via the contact form or proposal request on this site.",
    },
  ],
};

export const ENERGY_FAQ: Record<LangCode, FaqItem[]> = {
  TR: [
    {
      q: "Enerji verimliliği çalışması neyle başlar?",
      a: "Önce mevcut tüketim verileri, faturalar, sayaç yapısı, ana ekipmanlar ve operasyon düzeni incelenir. Ardından saha değerlendirmesiyle tüketimin nerede oluştuğu netleştirilir.",
    },
    {
      q: "Resmi enerji etüdü yapıyor musunuz?",
      a: "Resmi mevzuat kapsamında yetki gerektiren etüt, VAP veya belgelendirme süreçleri proje özelinde değerlendirilir. Gerekli durumlarda yetkili çözüm ortaklarıyla ilerlenebilir.",
    },
    {
      q: "ISO 50001 belgelendirmesi sağlıyor musunuz?",
      a: "Nexovia, ISO 50001 hazırlığı, veri yapısı, performans göstergeleri ve yönetim sistemi kurgusu için danışmanlık sağlayabilir. Belgelendirme kuruluşu hizmeti ayrı bir süreçtir.",
    },
    {
      q: "Çalışma ne kadar sürer?",
      a: "Süre; tesis büyüklüğü, veri kalitesi, saha erişimi, ekipman çeşitliliği ve rapor kapsamına göre değişir. Ön değerlendirme sonrası net takvim çıkarılır.",
    },
    {
      q: "Sadece sanayi tesisleri için mi uygundur?",
      a: "Hayır. Oteller, hastaneler, kampüsler, lojistik merkezleri, OSB'ler ve büyük ticari yapılar için de enerji verimliliği çalışması yapılabilir.",
    },
    {
      q: "Enerji verimliliği ile sürdürülebilirlik birlikte yürütülebilir mi?",
      a: "Evet. Enerji tüketimi, sürdürülebilirlik ve karbon raporlamasının temel veri alanlarından biridir. Bu nedenle enerji verimliliği çalışmaları sürdürülebilirlik danışmanlığıyla birlikte kurgulanabilir.",
    },
  ],
  EN: [
    {
      q: "Where does an energy efficiency engagement start?",
      a: "We begin with consumption data, bills, metering layout, main equipment and operating patterns, then clarify where use occurs through field assessment.",
    },
    {
      q: "Do you deliver official energy audits?",
      a: "Audit, VAP or certification processes that require authorisation under regulation are scoped per project. Where needed we work with authorised partners.",
    },
    {
      q: "Do you provide ISO 50001 certification?",
      a: "Nexovia can support ISO 50001 readiness, data structures, performance indicators and management-system design. Certification body services are a separate process.",
    },
    {
      q: "How long does the work take?",
      a: "Duration depends on site size, data quality, field access, equipment diversity and report scope. A clear timeline is agreed after the initial assessment.",
    },
    {
      q: "Is it only for industrial plants?",
      a: "No. Hotels, hospitals, campuses, logistics centres, industrial zones and large commercial buildings can all benefit.",
    },
    {
      q: "Can energy efficiency run alongside sustainability consulting?",
      a: "Yes. Energy use is a core data domain for sustainability and carbon reporting, so both tracks can be designed together.",
    },
  ],
};

export function faqForRouteKey(key: PageKey, lang: LangCode): FaqItem[] {
  switch (key) {
    case "flow":
      return FLOW_FAQ[lang];
    case "adr":
      return ADR_FAQ[lang];
    case "waterService":
      return WATER_FAQ[lang];
    case "energyService":
      return ENERGY_FAQ[lang];
    case "sustainabilityService":
      return SUSTAIN_FAQ[lang];
    case "trainings":
      return TRAININGS_FAQ[lang];
    case "about":
      return GENERAL_FAQ[lang];
    default:
      return [];
  }
}
