// Sector detail copy from mockup/nexovia_web_icerikleri.md (TR).
import type { LangCode } from "./getDictionary";

const TR: Record<string, string> = {
  "Üretim Tesisleri":
    "Su, enerji, atık ve süreç performansının birlikte değerlendirildiği bütüncül yaklaşım.",
  Kimya:
    "Tehlikeli madde süreçleri, belge takibi, depolama ve sevkiyat dokümantasyonu ile su tüketim yoğunluğu analizlerinin birlikte yönetilebildiği yapı.",
  "Gıda & İçecek":
    "Yıkama, proses, temizlik ve yardımcı işletme su tüketimlerinin analiz edildiği su verimliliği odaklı yaklaşım.",
  Tekstil:
    "Su ve atık su yoğunluğu yüksek proseslerde ölçüm, izleme, ESG verisi ve iyileştirme planı desteği.",
  Lojistik:
    "Tehlikeli madde taşımacılığına ilişkin kayıt, belge, araç-sürücü uygunluğu ve denetim hazırlığı takiplerinin dijitalleştirilmesine yönelik yaklaşım.",
  Enerji:
    "Tehlikeli madde, emisyon, kaynak kullanımı ve raporlama süreçlerinin birlikte ele alınabildiği uyum yaklaşımı.",
  OSB:
    "Çok tesisli izleme, karşılaştırmalı tüketim analizi ve ortak sürdürülebilirlik raporlama altyapısı.",
  Belediyeler:
    "Geniş yerleşke su yönetimi, çevresel performans takibi, atık yönetimi ve ESG hazırlığı.",
  "Büyük Yerleşkeler":
    "Geniş yerleşke su yönetimi, çevresel performans takibi, atık yönetimi ve ESG hazırlığı.",
  Oteller:
    "Geniş yerleşke su yönetimi, çevresel performans takibi, atık yönetimi ve ESG hazırlığı.",
  Hastaneler:
    "Geniş yerleşke su yönetimi, çevresel performans takibi, atık yönetimi ve ESG hazırlığı.",
  Üniversiteler:
    "Geniş yerleşke su yönetimi, çevresel performans takibi, atık yönetimi ve ESG hazırlığı.",
};

const EN: Record<string, string> = {
  "Manufacturing":
    "Holistic view of water, energy, waste and process performance.",
  Chemicals:
    "Dangerous-goods processes, documentation, storage and shipment records alongside water-intensity analysis.",
  "Food & Beverage":
    "Water-efficiency focus on washing, process, cleaning and utility consumption.",
  Textile:
    "Measurement, monitoring, ESG data and improvement planning for water-intensive processes.",
  Logistics:
    "Digital tracking of dangerous-goods records, documents, fleet eligibility and inspection readiness.",
  Energy:
    "Compliance approach covering dangerous goods, emissions, resource use and reporting.",
  "Industrial zones (OSB)":
    "Multi-site monitoring, comparative consumption analysis and shared sustainability reporting.",
  Municipalities:
    "Campus-scale water management, environmental performance tracking and ESG readiness.",
  "Large campuses":
    "Campus-scale water management, environmental performance tracking and ESG readiness.",
  Hotels:
    "Campus-scale water management, environmental performance tracking and ESG readiness.",
  Hospitals:
    "Campus-scale water management, environmental performance tracking and ESG readiness.",
  Universities:
    "Campus-scale water management, environmental performance tracking and ESG readiness.",
};

export function sectorDetail(name: string, lang: LangCode): string | undefined {
  const map = lang === "TR" ? TR : EN;
  return map[name];
}
