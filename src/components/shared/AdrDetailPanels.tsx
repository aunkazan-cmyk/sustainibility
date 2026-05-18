// Second Nexovia ADR screen — document register + certificate expiry +
// shipment status. Static, ÖRNEK/SAMPLE-tagged, compliance-themed (no
// fabricated real records). Mirrors FlowDetailPanels' structure for parity.
import type { LangCode } from "@/i18n/getDictionary";
import { SampleBanner } from "@/components/shared/SampleBanner";
import { Donut, BarGroup, StackedBar } from "@/components/shared/charts";

export function AdrDetailPanels({ lang = "TR" }: { lang?: LangCode }) {
  const tr = lang === "TR";
  const L = {
    title: tr ? "Sevkiyat & Belge Kaydı" : "Shipment & Document Register",
    sample: tr ? "ÖRNEK VERİ" : "SAMPLE DATA",
    scope: tr ? "Son 30 gün" : "Last 30 days",
    regTitle: tr ? "Belge kaydı" : "Document register",
    shipment: tr ? "Sevkiyat" : "Shipment",
    un: "UN",
    cls: tr ? "Sınıf" : "Class",
    docState: tr ? "Evrak" : "Docs",
    full: tr ? "Tam" : "Complete",
    missing: tr ? "Eksik" : "Missing",
    review: tr ? "İncelemede" : "In review",
    certTitle: tr ? "Belge / sertifika süresi" : "Certificate expiry",
    statusTitle: tr ? "Denetim öncesi durum" : "Pre-inspection status",
    note: tr
      ? "Değerler örnek senaryodur; gerçek sevkiyat verisi değildir."
      : "Figures are an illustrative scenario, not real shipment data.",
    overTimeTitle: tr ? "Durum (zaman)" : "Status over time",
    byClassTitle: tr ? "Sınıfa göre" : "By class",
    completionTitle: tr ? "Tamamlanma" : "Completion",
    completionSub: tr ? "tam" : "complete",
    mWk1: tr ? "1. hafta" : "Wk 1",
    mWk2: tr ? "2. hafta" : "Wk 2",
    mWk3: tr ? "3. hafta" : "Wk 3",
    mWk4: tr ? "4. hafta" : "Wk 4",
    mWk5: tr ? "5. hafta" : "Wk 5",
  };

  const rows = [
    { s: "#4821", un: "1203", c: "3", st: "missing" },
    { s: "#4822", un: "1789", c: "8", st: "full" },
    { s: "#4823", un: "1965", c: "2", st: "full" },
    { s: "#4825", un: "3082", c: "9", st: "review" },
    { s: "#4827", un: "1830", c: "8", st: "full" },
  ];
  const stC: Record<string, string> = {
    full: "#34D399",
    missing: "#FB7185",
    review: "#FCD34D",
  };
  const stL: Record<string, string> = {
    full: L.full,
    missing: L.missing,
    review: L.review,
  };

  const certs = [
    { n: tr ? "ADR sürücü sertifikası" : "ADR driver certificate", d: 12, t: "warn" },
    { n: tr ? "Araç ADR uygunluk belgesi" : "Vehicle ADR certificate", d: 41, t: "ok" },
    { n: tr ? "TMGD sözleşmesi" : "TMGD agreement", d: 88, t: "ok" },
    { n: tr ? "Tank muayene raporu" : "Tank inspection report", d: 6, t: "crit" },
  ];
  const certC: Record<string, string> = {
    ok: "#34D399",
    warn: "#FCD34D",
    crit: "#FB7185",
  };

  const card: React.CSSProperties = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 12,
    padding: 16,
  };

  return (
    <div
      style={{
        background: "#1A1206",
        borderRadius: 18,
        padding: 26,
        color: "#fff",
        fontFamily: "var(--nx-font-body)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "0 30px 80px -20px rgba(245,158,11,0.18), 0 0 0 1px rgba(255,255,255,0.04)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -140,
          left: -120,
          width: 320,
          height: 320,
          background:
            "radial-gradient(closest-side, rgba(245,158,11,0.2), transparent)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative" }}>
        <SampleBanner lang={lang} />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          position: "relative",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 15, fontWeight: 600 }}>{L.title}</span>
          <span
            style={{
              fontSize: 9,
              padding: "2px 7px",
              borderRadius: 4,
              background: "rgba(252, 211, 77, 0.15)",
              color: "#FCD34D",
              letterSpacing: "0.08em",
              fontWeight: 700,
            }}
          >
            {L.sample}
          </span>
        </div>
        <span
          className="nx-mono"
          style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}
        >
          {L.scope}
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: 12,
          position: "relative",
        }}
        data-nx-collapse
      >
        {/* Register table */}
        <div style={card}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: 12,
            }}
          >
            {L.regTitle}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 0.8fr 0.6fr 1fr",
              gap: 6,
              fontSize: 10,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              paddingBottom: 8,
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span>{L.shipment}</span>
            <span>{L.un}</span>
            <span>{L.cls}</span>
            <span>{L.docState}</span>
          </div>
          {rows.map((r) => (
            <div
              key={r.s}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 0.8fr 0.6fr 1fr",
                gap: 6,
                alignItems: "center",
                fontSize: 13,
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <span
                className="nx-mono"
                style={{ fontSize: 12, color: "rgba(255,255,255,0.85)" }}
              >
                {r.s}
              </span>
              <span
                className="nx-mono"
                style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}
              >
                {r.un}
              </span>
              <span style={{ color: "rgba(255,255,255,0.85)" }}>{r.c}</span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 11.5,
                  color: stC[r.st],
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: stC[r.st],
                  }}
                />
                {stL[r.st]}
              </span>
            </div>
          ))}
        </div>

        {/* Certificate expiry */}
        <div style={card}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: 12,
            }}
          >
            {L.certTitle}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {certs.map((c) => (
              <div
                key={c.n}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 12.5,
                    color: "rgba(255,255,255,0.8)",
                    lineHeight: 1.3,
                  }}
                >
                  {c.n}
                </span>
                <span
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: certC[c.t],
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.d} {tr ? "gün" : "days"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status-over-time + class split + completion analytics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: 12,
          marginTop: 12,
          position: "relative",
        }}
        data-nx-collapse
      >
        <div style={card}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: 14,
            }}
          >
            {L.overTimeTitle}
          </div>
          <BarGroup
            bars={[
              { label: L.mWk1, value: 71, color: "#FB7185" },
              { label: L.mWk2, value: 78, color: "#FCD34D" },
              { label: L.mWk3, value: 84, color: "#FCD34D" },
              { label: L.mWk4, value: 90, color: "#34D399" },
              { label: L.mWk5, value: 87, color: "#F59E0B" },
            ]}
            width={300}
            height={108}
            max={100}
          />
        </div>

        <div
          style={{
            ...card,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                marginBottom: 12,
              }}
            >
              {L.byClassTitle}
            </div>
            <StackedBar
              parts={[
                { value: 38, color: "#F59E0B" },
                { value: 26, color: "#FB7185" },
                { value: 20, color: "#FCD34D" },
                { value: 16, color: "#A78BFA" },
              ]}
              height={12}
            />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px 12px",
                marginTop: 12,
              }}
            >
              {[
                { c: "#F59E0B", l: "3" },
                { c: "#FB7185", l: "8" },
                { c: "#FCD34D", l: "2" },
                { c: "#A78BFA", l: "9" },
              ].map((lg) => (
                <span
                  key={lg.l}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 10.5,
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: 2,
                      background: lg.c,
                    }}
                  />
                  {tr ? "Sınıf" : "Class"} {lg.l}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: 14,
            }}
          >
            <Donut
              segments={[
                { value: 80, color: "#34D399" },
                { value: 20, color: "rgba(255,255,255,0.08)" },
              ]}
              size={92}
              thickness={11}
              centerTop="80%"
            />
            <div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 4,
                }}
              >
                {L.completionTitle}
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {L.completionSub}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 16,
          fontSize: 11,
          color: "rgba(255,255,255,0.4)",
          position: "relative",
        }}
      >
        {L.note}
      </div>
    </div>
  );
}
