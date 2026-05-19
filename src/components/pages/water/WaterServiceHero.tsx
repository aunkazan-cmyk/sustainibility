import Link from "next/link";
import Image from "next/image";
import type { Strings } from "@/i18n/getDictionary";
import { IMAGES } from "@/lib/images";
import { PageHeaderOnDark } from "@/components/shared/PageHeaderOnDark";
import { ImageHero } from "@/components/shared/ImageHero";
import { ChecklistPanel } from "@/components/shared/ChecklistPanel";
import { ScopeList } from "@/components/shared/ScopeList";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { waterServiceContent } from "@/i18n/service-content";
import { IconExpertise, IconShield, IconTech } from "@/components/shared/mockup-icons";
import { ArrowRight } from "@/components/shared/primitives";

export function WaterServiceHero({
  lang,
  t,
  sp,
  homeHref,
  flowHref,
  contactHref,
}: {
  lang: "TR" | "EN";
  t: Strings;
  sp: Strings["waterPage"];
  homeHref: string;
  flowHref: string;
  contactHref: string;
}) {
  const sc = waterServiceContent(lang);
  const flowEmbed = (
    <figure style={{ marginTop: 24, borderRadius: 12, overflow: "hidden", border: "1px solid var(--nx-200)" }}>
      <Image src={IMAGES.flowScreen2} alt="" width={600} height={360} style={{ width: "100%", height: "auto", display: "block" }} />
      <figcaption style={{ padding: 16, background: "#fff" }}>
        <strong style={{ fontSize: 14 }}>{sp.relatedFlow}</strong>
        <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--nx-600)" }}>{sp.relatedFlowLead}</p>
        <Link href={flowHref} style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10, fontSize: 13, fontWeight: 600, color: "var(--nx-flow)" }}>
          {lang === "TR" ? "Platformu Keşfet" : "Explore the platform"}
          <ArrowRight size={12} />
        </Link>
      </figcaption>
    </figure>
  );

  return (
    <>
      <PageHeaderOnDark />
      <ImageHero
        image={IMAGES.waterHero}
        variant="fullBleed"
        minHeight={480}
        breadcrumbs={[
          { name: lang === "TR" ? "Anasayfa" : "Home", href: homeHref },
          { name: t.nav.services },
          { name: t.services.water.title },
        ]}
      >
        <span className="nx-pill" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", marginBottom: 16, display: "inline-flex" }}>
          {sp.eyebrow}
        </span>
        <h1 className="nx-hero-title">{sp.title}</h1>
        <p className="nx-hero-lead">{sp.lead}</p>
        <div className="nx-hero-actions">
          <Link href={contactHref} className="nx-btn nx-btn--accent">
            {t.cta.contact}
            <ArrowRight />
          </Link>
          <Link href={flowHref} className="nx-btn nx-btn--ghost-light">
            {lang === "TR" ? "Nexovia Flow'u Keşfet" : "Discover Nexovia Flow"}
          </Link>
        </div>
      </ImageHero>

      <section data-nx-section style={{ padding: "96px 0", background: "#fff" }}>
        <article className="nx-container nx-scope-split" data-nx-collapse data-nx-cgap>
          <section>
            <SectionHeader
              title={lang === "TR" ? "Hizmet Kapsamımız" : "Our service scope"}
              intro={sc.scopeIntro}
            />
            <ScopeList
              items={sc.scopeItems.map((item, i) => ({
                icon: i % 3 === 0 ? <IconExpertise /> : i % 3 === 1 ? <IconTech /> : <IconShield />,
                title: item.title,
                body: item.body,
              }))}
            />
          </section>
          <ChecklistPanel
            title={lang === "TR" ? "Yaklaşımımız" : "Our approach"}
            items={
              lang === "TR"
                ? ["Ölçülebilir veri toplama", "Saha ve danışman aynı kaynak", "Çıktı odaklı teslimatlar", "Flow ile süreklilik"]
                : ["Measurable data collection", "Field and consultant single source", "Deliverable-focused outputs", "Continuity via Flow"]
            }
            footer={flowEmbed}
          />
        </article>
      </section>
    </>
  );
}
