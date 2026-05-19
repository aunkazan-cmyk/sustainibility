// Legal page content for Nexovia (nexovia.com.tr).
//
// This file contains STANDARD-PRACTICE legal text only. It is general
// information and is NOT a substitute for advice from a qualified lawyer.
// Every company-specific fact is a clearly-marked [BRACKET] token that the
// site owner must replace with verified information before publication. No
// legal names, addresses, tax numbers, providers, retention periods or
// jurisdiction cities are invented here.
//
// Used by Footer, Breadcrumb, the legal route metadata and LegalPage.
import type { LegalDocId } from "./routes";
import type { LangCode } from "@/i18n/getDictionary";

export interface LegalSection {
  /** Section heading. */
  h: string;
  /** Paragraphs. May contain [BRACKET] tokens and "- " bullet lines. */
  body: string[];
}

interface LegalDoc {
  title: string;
  lead: string;
  sections: LegalSection[];
}

/**
 * Every company-specific token used across the documents below. The site
 * owner must replace each of these with verified information (and have the
 * final text reviewed by legal counsel) before publication.
 */
export const LEGAL_PLACEHOLDERS: string[] = [
  // Turkish tokens
  "[Şirket Yasal Unvanı]",
  "[Vergi Kimlik No]",
  "[MERSİS No]",
  "[Kayıtlı Adres]",
  "[KEP Adresi]",
  "[KVKK İletişim E-posta]",
  "[Barındırma Sağlayıcı ve Ülke]",
  "[E-posta Sağlayıcı ve Ülke]",
  "[Analitik Sağlayıcı ve Ülke]",
  "[Saklama Süresi]",
  "[Çerez Süresi]",
  "[Yetkili Mahkeme ve İcra Daireleri Şehri]",
  "[Yürürlük Tarihi]",
  // English tokens
  "[Company Legal Name]",
  "[Tax ID]",
  "[MERSIS No]",
  "[Registered Address]",
  "[KEP Address]",
  "[KVKK Contact Email]",
  "[Hosting Provider & Country]",
  "[Email Provider & Country]",
  "[Analytics Provider & Country]",
  "[Retention Period]",
  "[Cookie Duration]",
  "[Competent Courts City]",
  "[Effective Date]",
];

/**
 * Safe example values that can be derived from the public domain
 * (nexovia.com.tr). These are filled into the rendered text. Tokens NOT in
 * this map stay unknown — LegalPage hides them inline and lists them in a
 * "missing fields" warning so the owner knows exactly what to provide.
 */
export const LEGAL_FILL: Record<string, string> = {
  "[KVKK İletişim E-posta]": "kvkk@nexovia.com.tr",
  "[KVKK Contact Email]": "kvkk@nexovia.com.tr",
};

const TR: Record<LegalDocId, LegalDoc> = {
  kvkk: {
    title: "KVKK Aydınlatma Metni",
    lead: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu sıfatıyla aydınlatma yükümlülüğümüze ilişkin bilgilendirme.",
    sections: [
      {
        h: "1. Veri Sorumlusunun Kimliği",
        body: [
          "Bu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ile ilgili mevzuat uyarınca, veri sorumlusu sıfatıyla aşağıda kimliği belirtilen şirket tarafından düzenlenmiştir.",
          "- Yasal Unvan: [Şirket Yasal Unvanı]",
          "- Vergi Kimlik No: [Vergi Kimlik No]",
          "- MERSİS No: [MERSİS No]",
          "- Kayıtlı Adres: [Kayıtlı Adres]",
          "- KEP Adresi: [KEP Adresi]",
          "- KVKK İletişim E-posta: [KVKK İletişim E-posta]",
          "Bu metin, www.nexovia.com.tr web sitesi (\"Site\") üzerinden gerçekleştirilen kişisel veri işleme faaliyetlerini kapsar. İşbu metin yalnızca genel bilgilendirme amaçlıdır; yayımlanmadan önce yetkili bir hukuk danışmanı tarafından gözden geçirilmesi tavsiye edilir.",
        ],
      },
      {
        h: "2. İşlenen Kişisel Veriler ve İşleme Amaçları",
        body: [
          "Site üzerinden iletişim ve talep formlarını kullanmanız ya da Site'yi ziyaret etmeniz halinde aşağıdaki kişisel veri kategorileri işlenebilir:",
          "- Kimlik bilgileri (ad, soyad)",
          "- İletişim bilgileri (e-posta adresi, telefon numarası, varsa şirket/kuruluş bilgisi)",
          "- Talep ve mesaj içeriği (formlar veya e-posta yoluyla ilettiğiniz bilgiler)",
          "- İşlem ve teknik veriler (IP adresi, tarayıcı ve cihaz bilgileri, ziyaret kayıtları, çerez verileri)",
          "Bu veriler şu amaçlarla işlenir:",
          "- Tarafınızdan iletilen talep, soru ve başvuruların yanıtlanması",
          "- Potansiyel müşteri (lead) ve iş ilişkisi yönetimi ile iletişimin sürdürülmesi",
          "- Sözleşme öncesi görüşmelerin yürütülmesi ve danışmanlık/hizmet sunumunun sağlanması",
          "- Hukuki yükümlülüklerin yerine getirilmesi ve yetkili kurumlara karşı bilgi verme",
          "- Site güvenliğinin sağlanması, kötüye kullanımın önlenmesi ve istatistiksel analiz/iyileştirme",
        ],
      },
      {
        h: "3. Kişisel Verilerin Aktarılması",
        body: [
          "Kişisel verileriniz, yukarıdaki amaçların gerçekleştirilmesi için gerekli olduğu ölçüde ve KVKK'nın 8. ve 9. maddelerindeki şartlara uygun olarak aşağıdaki alıcı gruplarına aktarılabilir:",
          "- Barındırma (hosting) hizmeti sağlayıcımız: [Barındırma Sağlayıcı ve Ülke]",
          "- E-posta ve iletişim altyapısı sağlayıcımız: [E-posta Sağlayıcı ve Ülke]",
          "- Web analitiği hizmeti sağlayıcımız: [Analitik Sağlayıcı ve Ülke]",
          "- İletişim formlarında bot ve kötüye kullanım koruması (basit matematik doğrulama, honeypot ve istek sınırlama; üçüncü taraf çerez kullanılmaz)",
          "- Hukuken yetkili kamu kurum ve kuruluşları ile adli/idari makamlar (talep edilmesi halinde ve mevzuat gereği)",
          "Yurt dışına aktarım söz konusu olduğunda, aktarım KVKK'da öngörülen şartlar (açık rıza veya kanunda belirtilen uygun güvence ve istisnalar) çerçevesinde gerçekleştirilir.",
        ],
      },
      {
        h: "4. Toplama Yöntemi ve Hukuki Sebep",
        body: [
          "Kişisel verileriniz; Site üzerindeki iletişim ve başvuru formları, e-posta yazışmaları, çerezler ve benzeri otomatik yollarla elektronik ortamda toplanır.",
          "Verileriniz, KVKK'nın 5. maddesi kapsamında aşağıdaki hukuki sebeplere dayanılarak işlenir:",
          "- Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması (sözleşme öncesi görüşmeler dâhil)",
          "- Veri sorumlusunun hukuki yükümlülüğünü yerine getirmesi için zorunlu olması",
          "- İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için zorunlu olması",
          "Bu sebeplerin bulunmadığı hâllerde (örneğin pazarlama amaçlı iletişim) kişisel verileriniz yalnızca açık rızanıza dayanılarak işlenir.",
        ],
      },
      {
        h: "5. İlgili Kişinin Hakları (KVKK Madde 11)",
        body: [
          "KVKK'nın 11. maddesi uyarınca, veri sorumlusuna başvurarak aşağıdaki haklarınızı kullanabilirsiniz:",
          "- Kişisel verilerinizin işlenip işlenmediğini öğrenme",
          "- Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme",
          "- Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme",
          "- Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme",
          "- Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme",
          "- KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme",
          "- Düzeltme, silme veya yok etme işlemlerinin, kişisel verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme",
          "- İşlenen verilerinizin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme",
          "- Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme",
        ],
      },
      {
        h: "6. Haklarınızı Nasıl Kullanabilirsiniz",
        body: [
          "Yukarıda sayılan haklarınıza ilişkin taleplerinizi, kimliğinizi tevsik edici bilgilerle birlikte yazılı olarak [Kayıtlı Adres] adresine veya [KVKK İletişim E-posta] e-posta adresine iletebilirsiniz.",
          "Talebiniz, niteliğine göre en kısa sürede ve her hâlde Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ uyarınca en geç otuz (30) gün içinde sonuçlandırılır. İşlemin ayrıca bir maliyet gerektirmesi hâlinde Kişisel Verileri Koruma Kurulu tarafından belirlenen tarifedeki ücret alınabilir.",
          "Başvurunuzun reddedilmesi, verilen yanıtı yetersiz bulmanız veya süresinde yanıt verilmemesi hâlinde Kişisel Verileri Koruma Kurulu'na şikâyette bulunma hakkınız saklıdır.",
        ],
      },
    ],
  },

  privacy: {
    title: "Gizlilik Politikası",
    lead: "Web sitemizi ziyaret ettiğinizde kişisel verilerinizin nasıl işlendiğine ilişkin gizlilik ilkelerimiz.",
    sections: [
      {
        h: "1. Kapsam",
        body: [
          "Bu Gizlilik Politikası, www.nexovia.com.tr web sitesi (\"Site\") aracılığıyla toplanan kişisel verilerin hangi amaçlarla ve nasıl işlendiğini açıklar. Politika; Site üzerinden sunulan içerik, formlar ve çerez teknolojileri için geçerlidir.",
          "Bu metin genel bilgilendirme amaçlıdır ve hukuki danışmanlık yerine geçmez; yayımlanmadan önce yetkili bir hukuk danışmanı tarafından gözden geçirilmesi tavsiye edilir.",
        ],
      },
      {
        h: "2. Veri Sorumlusu",
        body: [
          "Kişisel verileriniz bakımından veri sorumlusu aşağıda kimliği belirtilen şirkettir:",
          "- Yasal Unvan: [Şirket Yasal Unvanı]",
          "- Vergi Kimlik No: [Vergi Kimlik No]",
          "- MERSİS No: [MERSİS No]",
          "- Kayıtlı Adres: [Kayıtlı Adres]",
          "- KEP Adresi: [KEP Adresi]",
          "- İletişim: [KVKK İletişim E-posta]",
        ],
      },
      {
        h: "3. Toplanan Veriler",
        body: [
          "- Kimlik ve iletişim verileri: ad, soyad, e-posta, telefon, varsa şirket bilgisi",
          "- İçerik verileri: form ve e-posta yoluyla ilettiğiniz talep ve mesajlar",
          "- Teknik ve kullanım verileri: IP adresi, tarayıcı/cihaz bilgileri, ziyaret edilen sayfalar, çerez ve benzeri tanımlayıcılar",
        ],
      },
      {
        h: "4. İşleme Amaçları",
        body: [
          "- Talep ve başvurularınızın yanıtlanması ve iletişimin sürdürülmesi",
          "- Potansiyel müşteri (lead) ve iş ilişkisi yönetimi",
          "- Danışmanlık ve hizmetlerin sunulması, sözleşme öncesi/sonrası süreçlerin yürütülmesi",
          "- Site güvenliği, kötüye kullanımın önlenmesi ve performans/analitik amaçlı iyileştirme",
          "- Hukuki yükümlülüklerin yerine getirilmesi",
        ],
      },
      {
        h: "5. Hukuki Sebepler",
        body: [
          "Kişisel verileriniz KVKK'nın 5. maddesi kapsamında; bir sözleşmenin kurulması veya ifası, veri sorumlusunun hukuki yükümlülüğü, meşru menfaat ve gerektiğinde açık rıza hukuki sebeplerine dayanılarak işlenir. Pazarlama amaçlı iletişimler yalnızca açık rızanız bulunduğunda gerçekleştirilir.",
        ],
      },
      {
        h: "6. Çerezler",
        body: [
          "Site, zorunlu çerezlerin yanı sıra performans/analitik ve güvenlik amaçlı çerezler kullanır. Çerezlerin türleri, süreleri ve yönetimi hakkında ayrıntılı bilgi için Çerez Politikası'nı inceleyebilirsiniz. Zorunlu olmayan çerezler yalnızca onayınızla çalıştırılır.",
        ],
      },
      {
        h: "7. Alıcılar ve Aktarım",
        body: [
          "Kişisel verileriniz, hizmetin sunulması için gerekli olduğu ölçüde aşağıdaki alıcılarla paylaşılabilir:",
          "- Barındırma sağlayıcısı: [Barındırma Sağlayıcı ve Ülke]",
          "- E-posta/iletişim sağlayıcısı: [E-posta Sağlayıcı ve Ülke]",
          "- Analitik sağlayıcısı: [Analitik Sağlayıcı ve Ülke]",
          "- İletişim formlarında bot ve kötüye kullanım koruması (basit matematik doğrulama, honeypot ve istek sınırlama)",
          "- Hukuken yetkili kamu kurum ve kuruluşları (talep hâlinde)",
        ],
      },
      {
        h: "8. Yurt Dışına Aktarım",
        body: [
          "Yukarıda belirtilen sağlayıcıların altyapısının yurt dışında bulunması hâlinde, kişisel verileriniz KVKK'da öngörülen şartlara (açık rıza veya kanunda belirtilen uygun güvence ve istisnalar) uygun olarak yurt dışına aktarılabilir. İlgili sağlayıcılar ve ülkeleri: [Barındırma Sağlayıcı ve Ülke], [E-posta Sağlayıcı ve Ülke], [Analitik Sağlayıcı ve Ülke].",
        ],
      },
      {
        h: "9. Saklama Süreleri",
        body: [
          "Kişisel verileriniz, işleme amacının gerektirdiği süre ve ilgili mevzuatta öngörülen zamanaşımı/saklama süreleri boyunca saklanır. Belirlenen saklama süresi: [Saklama Süresi]. Sürenin sonunda verileriniz silinir, yok edilir veya anonim hâle getirilir.",
        ],
      },
      {
        h: "10. Veri Güvenliği",
        body: [
          "Kişisel verilerinizin hukuka aykırı erişime, kayba ve değişikliğe karşı korunması için makul idari ve teknik tedbirler uygulanır. Bunlar arasında erişim kontrolleri, şifreli iletişim (TLS) ve düzenli güvenlik değerlendirmeleri yer alır. İnternet üzerinden hiçbir iletim yönteminin %100 güvenli olmadığını hatırlatmak isteriz.",
        ],
      },
      {
        h: "11. Üçüncü Taraf Bağlantıları",
        body: [
          "Site, üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin gizlilik uygulamalarından sorumlu değiliz; ilgili sitelerin kendi gizlilik politikalarını incelemenizi öneririz.",
        ],
      },
      {
        h: "12. Haklarınız",
        body: [
          "KVKK'nın 11. maddesi kapsamındaki haklarınızı (bilgi talep etme, düzeltme, silme, itiraz vb.) kullanabilirsiniz. Hakların ayrıntısı ve başvuru usulü için KVKK Aydınlatma Metni'ne bakınız. Başvurularınızı [KVKK İletişim E-posta] adresine iletebilirsiniz.",
        ],
      },
      {
        h: "13. Çocukların Gizliliği",
        body: [
          "Site, çocuklara yönelik değildir ve bilerek çocuklardan kişisel veri toplamayız. Bir çocuğa ait verinin rızası olmaksızın iletildiğini düşünüyorsanız [KVKK İletişim E-posta] adresinden bizimle iletişime geçiniz; söz konusu veriyi sileceğiz.",
        ],
      },
      {
        h: "14. Değişiklikler",
        body: [
          "Bu Politika zaman zaman güncellenebilir. Güncel sürüm bu sayfada yayımlanır ve yayımlandığı tarihte yürürlüğe girer. Önemli değişikliklerde uygun yöntemlerle bilgilendirme yapılabilir.",
        ],
      },
      {
        h: "15. İletişim",
        body: [
          "Bu Politika veya kişisel verilerinizin işlenmesine ilişkin sorularınız için: [KVKK İletişim E-posta] / [Kayıtlı Adres].",
        ],
      },
    ],
  },

  cookie: {
    title: "Çerez Politikası",
    lead: "Sitemizde kullanılan çerezler, türleri ve çerez tercihlerinizi nasıl yönetebileceğiniz.",
    sections: [
      {
        h: "1. Çerez Nedir?",
        body: [
          "Çerez (cookie), bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza yerleştirilen küçük metin dosyasıdır. Çerezler, sitenin düzgün çalışmasını sağlamak, tercihlerinizi hatırlamak ve kullanım hakkında istatistik üretmek için kullanılır. Benzer teknolojiler (piksel, yerel depolama vb.) da bu Politika kapsamındadır.",
          "Bu metin genel bilgilendirme amaçlıdır; yayımlanmadan önce yetkili bir hukuk danışmanı tarafından gözden geçirilmesi tavsiye edilir.",
        ],
      },
      {
        h: "2. Çerez Türleri",
        body: [
          "- Zorunlu çerezler: Sitenin temel işlevleri, güvenlik ve form gönderimi için gereklidir; devre dışı bırakılamaz.",
          "- Performans/analitik çerezleri: Site kullanımını anlamak ve iyileştirmek için ziyaret istatistikleri üretir.",
          "- İşlevsel çerezler: Tercihlerinizi (örn. dil) hatırlayarak deneyimi kişiselleştirir.",
          "- Hedefleme/reklam çerezleri: İlgi alanına dayalı içerik/reklam sunmak için kullanılır.",
          "Bu Site şu anda yalnızca zorunlu çerezler ve performans/analitik çerezleri kullanmaktadır; hedefleme/reklam çerezleri kullanılmamaktadır. İletişim formu güvenliği için üçüncü taraf çerez kullanılmaz.",
        ],
      },
      {
        h: "3. Kullanılan Çerezler",
        body: [
          "- Zorunlu: Oturum ve güvenlik çerezleri. Süre: oturum boyu veya [Çerez Süresi].",
          "- Performans/analitik: [Analitik Sağlayıcı ve Ülke] tarafından sağlanan, sayfa görüntüleme ve ziyaret davranışını ölçen çerezler. Süre: [Çerez Süresi].",
          "- İşlevsel: Dil/görüntü tercihinizi hatırlayan çerezler. Süre: [Çerez Süresi].",
          "Çerez adları, sağlayıcıları ve süreleri zaman zaman değişebilir; güncel ayrıntılar çerez yönetim aracında görüntülenebilir.",
        ],
      },
      {
        h: "4. Çerez Yönetimi",
        body: [
          "Site'ye ilk girişte gösterilen çerez bildirimi/banner üzerinden zorunlu olmayan çerezleri kabul edebilir veya reddedebilirsiniz. Tercihlerinizi daha sonra da güncelleyebilirsiniz.",
          "Ayrıca tarayıcı ayarlarınızdan çerezleri yönetebilir veya silebilirsiniz; genel adımlar:",
          "- Google Chrome: Ayarlar > Gizlilik ve güvenlik > Çerezler ve diğer site verileri",
          "- Mozilla Firefox: Ayarlar > Gizlilik ve Güvenlik > Çerezler ve Site Verileri",
          "- Safari: Tercihler/Ayarlar > Gizlilik > Çerezler ve web sitesi verileri",
          "- Microsoft Edge: Ayarlar > Çerezler ve site izinleri",
          "Zorunlu çerezlerin engellenmesi sitenin bazı bölümlerinin düzgün çalışmamasına yol açabilir.",
        ],
      },
      {
        h: "5. KVKK ve Onay",
        body: [
          "Zorunlu olmayan çerezler (performans/analitik, işlevsel ve varsa hedefleme) yalnızca açık rızanız/onayınız bulunduğunda çalıştırılır. Verdiğiniz onayı dilediğiniz zaman çerez bildirimi veya tarayıcı ayarları üzerinden geri alabilirsiniz. Çerezler aracılığıyla işlenen kişisel veriler bakımından KVKK Aydınlatma Metni ve Gizlilik Politikası geçerlidir.",
        ],
      },
      {
        h: "6. Güncellemeler",
        body: [
          "Bu Çerez Politikası, mevzuat veya kullanılan teknolojilerdeki değişikliklere bağlı olarak güncellenebilir. Güncel sürüm bu sayfada yayımlandığı tarihte geçerli olur.",
        ],
      },
      {
        h: "7. İletişim",
        body: [
          "Çerez kullanımına ilişkin sorularınız için: [KVKK İletişim E-posta].",
        ],
      },
    ],
  },

  terms: {
    title: "Kullanım Şartları",
    lead: "Bu web sitesini kullanırken kabul etmiş sayıldığınız şartlar ve koşullar.",
    sections: [
      {
        h: "1. Kapsam ve Kabul",
        body: [
          "Bu Kullanım Şartları, www.nexovia.com.tr web sitesinin (\"Site\") kullanımına ilişkin koşulları düzenler. Site'yi kullanarak bu şartları okuduğunuzu ve kabul ettiğinizi beyan etmiş olursunuz. Şartları kabul etmiyorsanız Site'yi kullanmamanız gerekir.",
          "Bu metin genel bilgilendirme amaçlıdır; yayımlanmadan önce yetkili bir hukuk danışmanı tarafından gözden geçirilmesi tavsiye edilir.",
        ],
      },
      {
        h: "2. Tanımlar",
        body: [
          "- \"Şirket\": [Şirket Yasal Unvanı].",
          "- \"Site\": www.nexovia.com.tr alan adı altında sunulan web sitesi ve içeriği.",
          "- \"Kullanıcı\": Site'yi herhangi bir şekilde ziyaret eden veya kullanan gerçek/tüzel kişi.",
          "- \"İçerik\": Site'de yer alan metin, görsel, logo, tasarım, yazılım ve diğer materyaller.",
        ],
      },
      {
        h: "3. Fikri Mülkiyet",
        body: [
          "Site'de yer alan \"Nexovia\" markası, logosu, tasarımı ve tüm İçerik, Şirket'e veya lisans verenlerine aittir ve fikri mülkiyet mevzuatı ile korunur. Önceden yazılı izin alınmaksızın İçeriğin kopyalanması, çoğaltılması, dağıtılması veya türev çalışma oluşturulması yasaktır.",
        ],
      },
      {
        h: "4. İzinli Kullanım ve Yasaklar",
        body: [
          "Site yalnızca hukuka uygun ve kişisel/kurumsal bilgilendirme amacıyla kullanılabilir. Kullanıcı aşağıdakileri yapmamayı kabul eder:",
          "- Site'nin güvenliğini veya işleyişini tehlikeye atmak, yetkisiz erişim sağlamaya çalışmak",
          "- Otomatik veri toplama (scraping), aşırı yük oluşturma veya hizmeti kötüye kullanma",
          "- Yanıltıcı, hukuka aykırı veya üçüncü kişilerin haklarını ihlal eden içerik iletme",
          "- İçeriği izinsiz ticari amaçla kullanma veya yeniden yayımlama",
        ],
      },
      {
        h: "5. Sorumluluk Reddi",
        body: [
          "Site ve İçerik \"olduğu gibi\" sunulmaktadır. İçerik genel bilgilendirme amaçlı olup profesyonel danışmanlık (hukuki, mali, teknik vb.) niteliği taşımaz ve bu amaçla kullanılmamalıdır. İçeriğin doğruluğu, güncelliği ve eksiksizliği konusunda açık veya zımni hiçbir garanti verilmez.",
        ],
      },
      {
        h: "6. Sorumluluğun Sınırlandırılması",
        body: [
          "Yürürlükteki hukukun izin verdiği azami ölçüde Şirket; Site'nin kullanımından veya kullanılamamasından, İçeriğe güvenilmesinden ya da hizmet kesintilerinden doğan dolaylı, arızi veya sonuç niteliğindeki zararlardan sorumlu tutulamaz.",
        ],
      },
      {
        h: "7. Üçüncü Taraf Bağlantıları",
        body: [
          "Site, kontrolümüzde olmayan üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin içeriğinden, gizlilik uygulamalarından veya hizmetlerinden Şirket sorumlu değildir.",
        ],
      },
      {
        h: "8. Kişisel Verilerin Korunması",
        body: [
          "Site aracılığıyla işlenen kişisel veriler bakımından KVKK Aydınlatma Metni, Gizlilik Politikası ve Çerez Politikası uygulanır. Site'yi kullanarak bu metinleri incelediğinizi kabul edersiniz.",
        ],
      },
      {
        h: "9. Değişiklikler",
        body: [
          "Şirket, bu Kullanım Şartları'nı dilediği zaman güncelleyebilir. Güncel sürüm bu sayfada yayımlanır ve yayım tarihinde yürürlüğe girer. Site'nin kullanımına devam edilmesi güncel şartların kabulü anlamına gelir.",
        ],
      },
      {
        h: "10. Uygulanacak Hukuk ve Yetki",
        body: [
          "Bu Kullanım Şartları Türkiye Cumhuriyeti hukukuna tabidir. Bu şartlardan doğabilecek uyuşmazlıkların çözümünde [Yetkili Mahkeme ve İcra Daireleri Şehri] Mahkemeleri ve İcra Daireleri yetkilidir.",
        ],
      },
      {
        h: "11. Bölünebilirlik",
        body: [
          "Bu şartların herhangi bir hükmünün geçersiz veya uygulanamaz sayılması, diğer hükümlerin geçerliliğini etkilemez; geçersiz hüküm, amaca en yakın geçerli hükümle değiştirilmiş sayılır.",
        ],
      },
      {
        h: "12. Yürürlük",
        body: [
          "Bu Kullanım Şartları [Yürürlük Tarihi] tarihinde yürürlüğe girmiştir.",
        ],
      },
      {
        h: "13. İletişim",
        body: [
          "Bu Kullanım Şartları'na ilişkin sorularınız için: [KVKK İletişim E-posta] / [Kayıtlı Adres].",
        ],
      },
    ],
  },

  formNotice: {
    title: "Form Aydınlatma Metni",
    lead: "İletişim ve başvuru formları aracılığıyla ilettiğiniz kişisel verilere ilişkin aydınlatma metni.",
    sections: [
      {
        h: "1. Hangi Veriler İşleniyor?",
        body: [
          "İletişim/başvuru formu aracılığıyla ilettiğiniz ad-soyad, şirket bilgisi, e-posta adresi, telefon numarası ve mesaj içeriği veri sorumlusu [Şirket Yasal Unvanı] tarafından işlenir. Bu metin genel bilgilendirme amaçlıdır.",
        ],
      },
      {
        h: "2. İşleme Amaçları",
        body: [
          "- Talebinize yanıt verilmesi ve sizinle iletişim kurulması",
          "- Potansiyel müşteri (lead) ve iş ilişkisi yönetimi",
        ],
      },
      {
        h: "3. Hukuki Sebep",
        body: [
          "Verileriniz, KVKK'nın 5/2. maddesi kapsamında sözleşmenin kurulması/ifası (sözleşme öncesi görüşmeler dâhil) ve veri sorumlusunun meşru menfaati hukuki sebeplerine dayanılarak işlenir. Pazarlama amaçlı iletişim yalnızca ayrıca verdiğiniz açık rıza ile gerçekleştirilir.",
        ],
      },
      {
        h: "4. Aktarım",
        body: [
          "Verileriniz, formun iletilmesi ve saklanması için e-posta ve barındırma altyapısı sağlayıcılarımıza aktarılabilir: [E-posta Sağlayıcı ve Ülke], [Barındırma Sağlayıcı ve Ülke]. Form güvenliği için basit matematik doğrulama, honeypot ve istek sınırlama uygulanır.",
        ],
      },
      {
        h: "5. Saklama",
        body: [
          "Verileriniz, talebinizin gerektirdiği süre ve ilgili mevzuattaki zamanaşımı süreleri boyunca saklanır: [Saklama Süresi]. Süre sonunda silinir, yok edilir veya anonim hâle getirilir.",
        ],
      },
      {
        h: "6. Pazarlama İzni",
        body: [
          "Pazarlama/ticari elektronik ileti almak isteğe bağlıdır ve formdaki ayrı bir onay kutusu ile alınır. Bu onayı vermemeniz talebinizin değerlendirilmesini etkilemez. Verdiğiniz onayı dilediğiniz zaman ücretsiz olarak geri alabilirsiniz.",
        ],
      },
      {
        h: "7. Haklarınız",
        body: [
          "KVKK'nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltme, silme/yok etme, aktarıldığı kişilere bildirim, otomatik analize itiraz ve zararın giderilmesini talep etme haklarına sahipsiniz. Başvurularınızı [KVKK İletişim E-posta] adresine iletebilirsiniz. Ayrıntılı bilgi için KVKK Aydınlatma Metni'ne bakınız.",
        ],
      },
    ],
  },
};

const EN: Record<LegalDocId, LegalDoc> = {
  kvkk: {
    title: "Privacy Notice",
    lead: "Information regarding our disclosure obligations as a data controller under Turkish data protection law (KVKK No. 6698).",
    sections: [
      {
        h: "1. Identity of the Data Controller",
        body: [
          "This Privacy Notice is provided under the Turkish Personal Data Protection Law No. 6698 (\"KVKK\") and related legislation by the company identified below, acting as data controller.",
          "- Legal Name: [Company Legal Name]",
          "- Tax ID: [Tax ID]",
          "- MERSIS No: [MERSIS No]",
          "- Registered Address: [Registered Address]",
          "- KEP Address: [KEP Address]",
          "- KVKK Contact Email: [KVKK Contact Email]",
          "This notice covers personal data processing carried out through the www.nexovia.com.tr website (the \"Site\"). It is general information only and should be reviewed by qualified legal counsel before publication.",
        ],
      },
      {
        h: "2. Personal Data Processed and Purposes",
        body: [
          "When you use the contact or request forms or visit the Site, the following categories of personal data may be processed:",
          "- Identity data (first name, last name)",
          "- Contact data (email address, phone number, company/organisation where provided)",
          "- Request and message content (information you submit via forms or email)",
          "- Technical and usage data (IP address, browser/device information, visit logs, cookie data)",
          "This data is processed for the following purposes:",
          "- Responding to your inquiries, questions and applications",
          "- Lead and business relationship management and maintaining communication",
          "- Conducting pre-contractual discussions and delivering advisory/consulting services",
          "- Fulfilling legal obligations and providing information to competent authorities",
          "- Ensuring Site security, preventing misuse, and statistical analysis/improvement",
        ],
      },
      {
        h: "3. Transfer of Personal Data",
        body: [
          "Your personal data may be transferred to the following recipient groups, only to the extent necessary to fulfil the purposes above and in accordance with Articles 8 and 9 of the KVKK:",
          "- Our hosting provider: [Hosting Provider & Country]",
          "- Our email and communication infrastructure provider: [Email Provider & Country]",
          "- Our web analytics provider: [Analytics Provider & Country]",
          "- Bot and abuse protection on contact forms (simple math verification, honeypot and rate limiting; no third-party cookies)",
          "- Legally authorised public institutions and judicial/administrative authorities (upon request and as required by law)",
          "Where an international transfer is involved, it is carried out in accordance with the conditions set out in the KVKK (explicit consent or the appropriate safeguards/exceptions specified by law).",
        ],
      },
      {
        h: "4. Collection Method and Legal Basis",
        body: [
          "Your personal data is collected electronically through the contact and application forms on the Site, email correspondence, cookies and similar automated means.",
          "Your data is processed on the following legal bases under Article 5 of the KVKK:",
          "- Where directly related to the conclusion or performance of a contract (including pre-contractual discussions)",
          "- Where necessary for the data controller to fulfil a legal obligation",
          "- Where necessary for the legitimate interests of the data controller, provided it does not harm your fundamental rights and freedoms",
          "Where none of these grounds apply (for example, marketing communications), your personal data is processed solely on the basis of your explicit consent.",
        ],
      },
      {
        h: "5. Rights of the Data Subject (KVKK Article 11)",
        body: [
          "Under Article 11 of the KVKK, you may exercise the following rights by applying to the data controller:",
          "- To learn whether your personal data is being processed",
          "- To request information if your personal data has been processed",
          "- To learn the purpose of processing and whether the data is used in accordance with that purpose",
          "- To know the third parties, in Turkey or abroad, to whom your personal data is transferred",
          "- To request rectification of incomplete or inaccurate personal data",
          "- To request erasure or destruction of your personal data under the conditions of Article 7 of the KVKK",
          "- To request that rectification, erasure or destruction be notified to third parties to whom the data was transferred",
          "- To object to a result against you arising from analysis of your data solely by automated systems",
          "- To claim compensation for damages suffered due to unlawful processing of your personal data",
        ],
      },
      {
        h: "6. How to Exercise Your Rights",
        body: [
          "You may submit requests regarding the rights above, together with information verifying your identity, in writing to [Registered Address] or by email to [KVKK Contact Email].",
          "Your request will be concluded as soon as possible and in any case within thirty (30) days, in accordance with the Communiqué on the Procedures and Principles for Application to the Data Controller. A fee from the tariff set by the Personal Data Protection Board may be charged where the process entails an additional cost.",
          "If your application is rejected, the response is found insufficient, or no timely response is given, you have the right to file a complaint with the Personal Data Protection Board.",
        ],
      },
    ],
  },

  privacy: {
    title: "Privacy Policy",
    lead: "Our privacy principles describing how your personal data is handled when you visit our website.",
    sections: [
      {
        h: "1. Scope",
        body: [
          "This Privacy Policy explains the purposes for which, and how, personal data collected through the www.nexovia.com.tr website (the \"Site\") is processed. It applies to the content, forms and cookie technologies provided through the Site.",
          "This document is general information and is not a substitute for legal advice; it should be reviewed by qualified legal counsel before publication.",
        ],
      },
      {
        h: "2. Data Controller",
        body: [
          "The data controller for your personal data is the company identified below:",
          "- Legal Name: [Company Legal Name]",
          "- Tax ID: [Tax ID]",
          "- MERSIS No: [MERSIS No]",
          "- Registered Address: [Registered Address]",
          "- KEP Address: [KEP Address]",
          "- Contact: [KVKK Contact Email]",
        ],
      },
      {
        h: "3. Data Collected",
        body: [
          "- Identity and contact data: first name, last name, email, phone, company where provided",
          "- Content data: requests and messages you submit via forms and email",
          "- Technical and usage data: IP address, browser/device information, pages visited, cookies and similar identifiers",
        ],
      },
      {
        h: "4. Purposes of Processing",
        body: [
          "- Responding to your requests and applications and maintaining communication",
          "- Lead and business relationship management",
          "- Delivering advisory services and conducting pre- and post-contractual processes",
          "- Site security, prevention of misuse, and performance/analytics improvement",
          "- Fulfilling legal obligations",
        ],
      },
      {
        h: "5. Legal Bases",
        body: [
          "Your personal data is processed under Article 5 of the KVKK on the bases of conclusion or performance of a contract, the data controller's legal obligation, legitimate interest and, where required, explicit consent. Marketing communications are carried out only where you have given explicit consent.",
        ],
      },
      {
        h: "6. Cookies",
        body: [
          "In addition to strictly necessary cookies, the Site uses performance/analytics and security cookies. For detailed information on cookie types, durations and management, please see the Cookie Policy. Non-essential cookies are set only with your consent.",
        ],
      },
      {
        h: "7. Recipients and Transfers",
        body: [
          "Your personal data may be shared with the following recipients, only to the extent necessary to provide the service:",
          "- Hosting provider: [Hosting Provider & Country]",
          "- Email/communication provider: [Email Provider & Country]",
          "- Analytics provider: [Analytics Provider & Country]",
          "- Bot and abuse protection on contact forms (simple math verification, honeypot and rate limiting)",
          "- Legally authorised public institutions (upon request)",
        ],
      },
      {
        h: "8. International Transfers",
        body: [
          "Where the infrastructure of the providers listed above is located abroad, your personal data may be transferred internationally in accordance with the conditions set out in the KVKK (explicit consent or the appropriate safeguards/exceptions specified by law). Relevant providers and countries: [Hosting Provider & Country], [Email Provider & Country], [Analytics Provider & Country].",
        ],
      },
      {
        h: "9. Retention Periods",
        body: [
          "Your personal data is retained for the period required by the purpose of processing and for the statutory limitation/retention periods provided by the applicable legislation. Designated retention period: [Retention Period]. At the end of this period your data is deleted, destroyed or anonymised.",
        ],
      },
      {
        h: "10. Data Security",
        body: [
          "Reasonable administrative and technical measures are applied to protect your personal data against unlawful access, loss and alteration, including access controls, encrypted transmission (TLS) and regular security assessments. Please note that no method of transmission over the internet is 100% secure.",
        ],
      },
      {
        h: "11. Third-Party Links",
        body: [
          "The Site may contain links to third-party websites. We are not responsible for the privacy practices of those sites; we recommend reviewing their own privacy policies.",
        ],
      },
      {
        h: "12. Your Rights",
        body: [
          "You may exercise your rights under Article 11 of the KVKK (requesting information, rectification, erasure, objection, etc.). For details of these rights and the application procedure, see the Privacy Notice. You may submit requests to [KVKK Contact Email].",
        ],
      },
      {
        h: "13. Children's Privacy",
        body: [
          "The Site is not directed at children and we do not knowingly collect personal data from children. If you believe a child's data has been submitted without consent, please contact us at [KVKK Contact Email] and we will delete it.",
        ],
      },
      {
        h: "14. Changes",
        body: [
          "This Policy may be updated from time to time. The current version is published on this page and takes effect on the date of publication. We may provide notice of material changes by appropriate means.",
        ],
      },
      {
        h: "15. Contact",
        body: [
          "For questions about this Policy or the processing of your personal data: [KVKK Contact Email] / [Registered Address].",
        ],
      },
    ],
  },

  cookie: {
    title: "Cookie Policy",
    lead: "The cookies used on our site, their types, and how you can manage your cookie preferences.",
    sections: [
      {
        h: "1. What Is a Cookie?",
        body: [
          "A cookie is a small text file placed on your device through your browser when you visit a website. Cookies help the site function properly, remember your preferences and produce usage statistics. Similar technologies (pixels, local storage, etc.) are also covered by this Policy.",
          "This document is general information and should be reviewed by qualified legal counsel before publication.",
        ],
      },
      {
        h: "2. Cookie Categories",
        body: [
          "- Strictly necessary cookies: required for core site functions, security and form submission; cannot be disabled.",
          "- Performance/analytics cookies: produce visit statistics to help us understand and improve the Site.",
          "- Functional cookies: remember your preferences (e.g. language) to personalise your experience.",
          "- Targeting/advertising cookies: used to deliver interest-based content/ads.",
          "This Site currently uses only strictly necessary cookies and performance/analytics cookies; no targeting/advertising cookies are used. Contact form security does not use third-party cookies.",
        ],
      },
      {
        h: "3. Cookies Used",
        body: [
          "- Strictly necessary: session and security cookies. Duration: session or [Cookie Duration].",
          "- Performance/analytics: cookies provided by [Analytics Provider & Country] measuring page views and visit behaviour. Duration: [Cookie Duration].",
          "- Functional: cookies remembering your language/display preference. Duration: [Cookie Duration].",
          "Cookie names, providers and durations may change from time to time; current details can be viewed in the cookie management tool.",
        ],
      },
      {
        h: "4. Managing Cookies",
        body: [
          "Through the cookie notice/banner shown on your first visit you can accept or reject non-essential cookies, and you can update your preferences later.",
          "You can also manage or delete cookies through your browser settings; general steps:",
          "- Google Chrome: Settings > Privacy and security > Cookies and other site data",
          "- Mozilla Firefox: Settings > Privacy & Security > Cookies and Site Data",
          "- Safari: Preferences/Settings > Privacy > Cookies and website data",
          "- Microsoft Edge: Settings > Cookies and site permissions",
          "Blocking strictly necessary cookies may cause parts of the Site to malfunction.",
        ],
      },
      {
        h: "5. KVKK and Consent",
        body: [
          "Non-essential cookies (performance/analytics, functional and, where used, targeting) are set only where you have given consent. You can withdraw your consent at any time through the cookie notice or your browser settings. The Privacy Notice and Privacy Policy apply to personal data processed through cookies.",
        ],
      },
      {
        h: "6. Updates",
        body: [
          "This Cookie Policy may be updated due to changes in legislation or the technologies used. The current version takes effect on the date it is published on this page.",
        ],
      },
      {
        h: "7. Contact",
        body: [
          "For questions about the use of cookies: [KVKK Contact Email].",
        ],
      },
    ],
  },

  terms: {
    title: "Terms of Use",
    lead: "The terms and conditions you are deemed to accept when using this website.",
    sections: [
      {
        h: "1. Scope and Acceptance",
        body: [
          "These Terms of Use govern the conditions for using the www.nexovia.com.tr website (the \"Site\"). By using the Site you represent that you have read and accept these terms. If you do not accept the terms, you should not use the Site.",
          "This document is general information and should be reviewed by qualified legal counsel before publication.",
        ],
      },
      {
        h: "2. Definitions",
        body: [
          "- \"Company\": [Company Legal Name].",
          "- \"Site\": the website and content provided under the www.nexovia.com.tr domain.",
          "- \"User\": any natural or legal person who visits or uses the Site in any manner.",
          "- \"Content\": text, images, logos, design, software and other materials on the Site.",
        ],
      },
      {
        h: "3. Intellectual Property",
        body: [
          "The \"Nexovia\" brand, logo, design and all Content on the Site belong to the Company or its licensors and are protected by intellectual property law. Copying, reproducing, distributing or creating derivative works of the Content without prior written permission is prohibited.",
        ],
      },
      {
        h: "4. Permitted Use and Prohibitions",
        body: [
          "The Site may be used only for lawful, personal/business informational purposes. The User agrees not to:",
          "- Endanger the security or operation of the Site or attempt unauthorised access",
          "- Carry out automated data collection (scraping), generate excessive load or otherwise misuse the service",
          "- Submit misleading, unlawful content or content infringing third-party rights",
          "- Use or republish the Content for commercial purposes without permission",
        ],
      },
      {
        h: "5. Disclaimer",
        body: [
          "The Site and Content are provided \"as is\". The Content is for general information purposes only, does not constitute professional advice (legal, financial, technical, etc.) and must not be relied upon as such. No express or implied warranty is given as to the accuracy, currency or completeness of the Content.",
        ],
      },
      {
        h: "6. Limitation of Liability",
        body: [
          "To the maximum extent permitted by applicable law, the Company shall not be liable for any indirect, incidental or consequential damages arising from the use of or inability to use the Site, reliance on the Content, or service interruptions.",
        ],
      },
      {
        h: "7. Third-Party Links",
        body: [
          "The Site may contain links to third-party websites not under our control. The Company is not responsible for the content, privacy practices or services of those sites.",
        ],
      },
      {
        h: "8. Data Protection",
        body: [
          "The Privacy Notice, Privacy Policy and Cookie Policy apply to personal data processed through the Site. By using the Site you acknowledge that you have reviewed these documents.",
        ],
      },
      {
        h: "9. Changes",
        body: [
          "The Company may update these Terms of Use at any time. The current version is published on this page and takes effect on the date of publication. Continued use of the Site constitutes acceptance of the updated terms.",
        ],
      },
      {
        h: "10. Governing Law and Jurisdiction",
        body: [
          "These Terms of Use are governed by the laws of the Republic of Türkiye. The Courts and Enforcement Offices of [Competent Courts City] shall have jurisdiction over any disputes arising from these terms.",
        ],
      },
      {
        h: "11. Severability",
        body: [
          "If any provision of these terms is held invalid or unenforceable, the validity of the remaining provisions shall not be affected, and the invalid provision shall be deemed replaced by the closest valid provision serving its purpose.",
        ],
      },
      {
        h: "12. Effective Date",
        body: [
          "These Terms of Use took effect on [Effective Date].",
        ],
      },
      {
        h: "13. Contact",
        body: [
          "For questions about these Terms of Use: [KVKK Contact Email] / [Registered Address].",
        ],
      },
    ],
  },

  formNotice: {
    title: "Form Privacy Notice",
    lead: "Privacy notice for the personal data you submit through our contact and application forms.",
    sections: [
      {
        h: "1. Which Data Is Processed?",
        body: [
          "The first name, last name, company, email address, phone number and message content you submit through the contact/application form are processed by the data controller [Company Legal Name]. This notice is general information.",
        ],
      },
      {
        h: "2. Purposes",
        body: [
          "- Responding to your request and communicating with you",
          "- Lead and business relationship management",
        ],
      },
      {
        h: "3. Legal Basis",
        body: [
          "Your data is processed under Article 5/2 of the KVKK on the bases of conclusion/performance of a contract (including pre-contractual steps) and the data controller's legitimate interest. Marketing communications are carried out only with the separate explicit consent you provide.",
        ],
      },
      {
        h: "4. Transfer",
        body: [
          "Your data may be transferred to our email and hosting infrastructure providers for the submission and storage of the form: [Email Provider & Country], [Hosting Provider & Country]. Form security uses simple math verification, a honeypot and rate limiting.",
        ],
      },
      {
        h: "5. Retention",
        body: [
          "Your data is retained for the period required by your request and for the statutory limitation periods in the applicable legislation: [Retention Period]. At the end of this period it is deleted, destroyed or anonymised.",
        ],
      },
      {
        h: "6. Marketing Consent",
        body: [
          "Receiving marketing/commercial electronic messages is optional and is obtained via a separate consent checkbox on the form. Not giving this consent does not affect the handling of your request. You may withdraw your consent at any time, free of charge.",
        ],
      },
      {
        h: "7. Your Rights",
        body: [
          "Under Article 11 of the KVKK you have the rights to learn whether your data is processed, request information, request rectification, erasure/destruction, notification to recipients, object to automated analysis, and claim compensation for damages. You may submit requests to [KVKK Contact Email]. For detailed information, see the Privacy Notice.",
        ],
      },
    ],
  },
};

export function legalDoc(id: LegalDocId, lang: LangCode): LegalDoc {
  return (lang === "TR" ? TR : EN)[id];
}

export function legalTitle(id: LegalDocId, lang: LangCode): string {
  return legalDoc(id, lang).title;
}
