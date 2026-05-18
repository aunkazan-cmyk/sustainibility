// Flow page FAQ — extracted from the prototype (direction-a.jsx FlowA) so it
// is the single source for both the rendered <details> list and the FAQPage
// JSON-LD. Real Q/A, no fabricated content.
import type { LangCode } from "./getDictionary";

export interface FaqItem {
  q: string;
  a: string;
}

export const FLOW_FAQ: Record<LangCode, FaqItem[]> = {
  TR: [
    {
      q: "Flow şu anda kullanılabilir mi?",
      a: "Şu anda erken erişim aşamasındayız. Danışmanlık projeleriyle birlikte sınırlı sayıda tesise açılıyor.",
    },
    {
      q: "Mevcut sayaç altyapımla çalışır mı?",
      a: "Çoğu standart sayaç ve SCADA çıktısıyla uyumludur. Entegrasyon ihtiyacı projeye göre değerlendirilir.",
    },
    {
      q: "Verilerim kimde?",
      a: "Tüm veriler size aittir. Dışa aktarım ve API erişimi standarttır.",
    },
    {
      q: "Fiyatlandırma nasıl?",
      a: "Erken erişim sürecinde fiyatlandırma projeye özel kurgulanır. Tesise ve modül kapsamına göre değişir.",
    },
  ],
  EN: [
    {
      q: "Is Flow available right now?",
      a: "We are currently in early access. Flow is being rolled out to a limited number of facilities alongside consulting engagements.",
    },
    {
      q: "Does it work with my existing meter infrastructure?",
      a: "It is compatible with most standard meters and SCADA outputs. Integration needs are scoped per project.",
    },
    {
      q: "Who owns my data?",
      a: "All data belongs to you. Export and API access are standard.",
    },
    {
      q: "How is it priced?",
      a: "During early access, pricing is set per project. It varies by site count and module scope.",
    },
  ],
};

export const ADR_FAQ: Record<LangCode, FaqItem[]> = {
  TR: [
    {
      q: "Nexovia ADR bir danışmanlık hizmeti mi?",
      a: "Hayır. Nexovia ADR bir platformdur; tehlikeli madde uyumu, dokümantasyon ve denetim hazırlığını yöneten bir üründür.",
    },
    {
      q: "Hangi süreçleri kapsıyor?",
      a: "ADR sınıflandırması, taşıma evrakı ve UN numarası takibi, sürücü/araç uygunluğu ve denetim öncesi kontrol listeleri.",
    },
    {
      q: "Mevcut filo ve evrak sistemimle çalışır mı?",
      a: "Standart evrak akışlarıyla uyumludur; entegrasyon ihtiyacı projeye göre değerlendirilir.",
    },
    {
      q: "Şu anda kullanılabilir mi?",
      a: "Erken erişim aşamasındayız; sınırlı sayıda operasyona açılıyor.",
    },
  ],
  EN: [
    {
      q: "Is Nexovia ADR a consulting service?",
      a: "No. Nexovia ADR is a platform — a product that manages dangerous-goods compliance, documentation and inspection readiness.",
    },
    {
      q: "Which processes does it cover?",
      a: "ADR classification, transport-document and UN-number tracking, driver/vehicle eligibility, and pre-inspection checklists.",
    },
    {
      q: "Does it work with my existing fleet and document systems?",
      a: "It is compatible with standard document flows; integration needs are scoped per project.",
    },
    {
      q: "Is it available right now?",
      a: "We are in early access; it is being rolled out to a limited number of operations.",
    },
  ],
};
