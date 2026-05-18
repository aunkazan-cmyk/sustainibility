// A second, more detailed Flow "screen" — zone/meter breakdown, period
// comparison and anomaly log. Static mockup, every number marked ÖRNEK/SAMPLE
// per project_docs (no fabricated real metrics, no real client data).
// Visual language follows the FlowDashboard dark product look; the content is
// an original analytics view inspired by water sub-metering tools generally
// (not copied from any specific product).
import type { LangCode } from "@/i18n/getDictionary";
import { SampleBanner } from "@/components/shared/SampleBanner";
import { Sparkline, Donut, StackedBar } from "@/components/shared/charts";

export function FlowDetailPanels({ lang = "TR" }: { lang?: LangCode }) {
  const tr = lang === "TR";
  const L = {
    title: tr ? "Tesis A — Bölge Bazlı Analiz" : "Site A — Zone-Level Analysis",
    sample: tr ? "ÖRNEK VERİ" : "SAMPLE DATA",
    period: tr ? "Son 30 gün" : "Last 30 days",
    zonesTitle: tr ? "Sayaç / bölge dağılımı" : "Meter / zone breakdown",
    zone: tr ? "Bölge" : "Zone",
    meter: tr ? "Sayaç" : "Meter",
    nowU: tr ? "Anlık" : "Now",
    dayU: tr ? "Günlük" : "Daily",
    state: tr ? "Durum" : "Status",
    ok: tr ? "Normal" : "OK",
    warn: tr ? "Eşik üstü" : "Over threshold",
    watch: tr ? "İzlemede" : "Watch",
    compareTitle: tr ? "Dönem karşılaştırması" : "Period comparison",
    thisM: tr ? "Bu ay" : "This month",
    lastM: tr ? "Geçen ay" : "Last month",
    saving: tr ? "Ölçülen azalım" : "Measured reduction",
    anomTitle: tr ? "Anomali kaydı" : "Anomaly log",
    a1: tr
      ? "Bölge 3 — gece debisi sıfırlanmadı (olası kaçak)"
      : "Zone 3 — night flow did not drop to zero (possible leak)",
    a2: tr
      ? "Sayaç 07-B — eşik 2 saat aşıldı"
      : "Meter 07-B — threshold exceeded for 2h",
    a3: tr
      ? "Soğutma hattı — birim tüketim normalleşti"
      : "Cooling line — specific consumption back to normal",
    note: tr
      ? "Değerler örnek senaryodur; gerçek tesis verisi değildir."
      : "Figures are an illustrative scenario, not real facility data.",
    trend: tr ? "Eğilim" : "Trend",
    splitTitle: tr ? "Bölgeye göre dağılım" : "Split by zone",
    usageTitle: tr ? "Kullanım kırılımı" : "Usage split",
    uProc: tr ? "Proses" : "Process",
    uCool: tr ? "Soğutma" : "Cooling",
    uClean: tr ? "Temizlik" : "Cleaning",
    uOther: tr ? "Diğer" : "Other",
    uShare: tr ? "proses" : "process",
  };

  const zones = [
    { z: tr ? "Üretim hattı 1" : "Production line 1", m: "M-01", now: "18.4", day: "402", s: "ok", t: [16, 17, 19, 18, 17, 18, 18] },
    { z: tr ? "Üretim hattı 2" : "Production line 2", m: "M-02", now: "12.1", day: "271", s: "watch", t: [10, 11, 11, 13, 12, 14, 12] },
    { z: tr ? "Soğutma kuleleri" : "Cooling towers", m: "M-05", now: "7.6", day: "168", s: "ok", t: [8, 7, 8, 7, 8, 7, 8] },
    { z: tr ? "Proses suyu" : "Process water", m: "07-B", now: "9.2", day: "233", s: "warn", t: [7, 8, 9, 11, 10, 12, 9] },
    { z: tr ? "Genel kullanım" : "General use", m: "M-09", now: "3.1", day: "74", s: "ok", t: [4, 3, 3, 4, 3, 3, 3] },
  ];
  const stColor: Record<string, string> = {
    ok: "#34D399",
    watch: "#FCD34D",
    warn: "#FB7185",
  };
  const stLabel: Record<string, string> = {
    ok: L.ok,
    watch: L.watch,
    warn: L.warn,
  };

  const card: React.CSSProperties = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 12,
    padding: 18,
  };

  return (
    <div
      style={{
        background: "#0B1226",
        borderRadius: 18,
        padding: 26,
        color: "#fff",
        fontFamily: "var(--nx-font-body)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "0 30px 80px -20px rgba(0, 184, 241, 0.18), 0 0 0 1px rgba(255,255,255,0.04)",
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
            "radial-gradient(closest-side, rgba(0,184,241,0.22), transparent)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative" }}>
        <SampleBanner lang={lang} />
      </div>

      {/* Top bar */}
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
          {L.period} · m³
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
        {/* Zone / meter table */}
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
            {L.zonesTitle}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 0.6fr 0.55fr 0.8fr 0.85fr",
              gap: 6,
              fontSize: 10,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              paddingBottom: 8,
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
            data-nx-collapse
          >
            <span>{L.zone}</span>
            <span>{L.meter}</span>
            <span>{L.nowU}</span>
            <span>{L.trend}</span>
            <span>{L.state}</span>
          </div>
          {zones.map((r) => (
            <div
              key={r.m}
              style={{
                display: "grid",
                gridTemplateColumns: "1.4fr 0.6fr 0.55fr 0.8fr 0.85fr",
                gap: 6,
                alignItems: "center",
                fontSize: 13,
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
              data-nx-collapse
            >
              <span style={{ color: "rgba(255,255,255,0.9)" }}>{r.z}</span>
              <span
                className="nx-mono"
                style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}
              >
                {r.m}
              </span>
              <span style={{ color: "rgba(255,255,255,0.85)" }}>{r.now}</span>
              <span
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                <Sparkline
                  data={r.t}
                  color={stColor[r.s]}
                  width={56}
                  height={22}
                />
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 11.5,
                  color: stColor[r.s],
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: stColor[r.s],
                  }}
                />
                {stLabel[r.s]}
              </span>
            </div>
          ))}
        </div>

        {/* Period comparison + saving */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
              {L.compareTitle}
            </div>
            {[
              { k: L.thisM, v: 1148, max: 1480, c: "#22D3EE" },
              { k: L.lastM, v: 1372, max: 1480, c: "rgba(255,255,255,0.35)" },
            ].map((b) => (
              <div key={b.k} style={{ marginBottom: 12 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.6)",
                    marginBottom: 5,
                  }}
                >
                  <span>{b.k}</span>
                  <span style={{ color: "#fff" }}>{b.v} m³</span>
                </div>
                <div
                  style={{
                    height: 7,
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.07)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${(b.v / b.max) * 100}%`,
                      height: "100%",
                      background: b.c,
                      borderRadius: 4,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              ...card,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>
              {L.saving}
            </span>
            <span
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: "#34D399",
                letterSpacing: "-0.02em",
              }}
            >
              −16%
            </span>
          </div>
        </div>
      </div>

      {/* Distribution analytics — split by zone + usage donut */}
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
            {L.splitTitle}
          </div>
          <StackedBar
            parts={[
              { value: 402, color: "#22D3EE" },
              { value: 271, color: "#00B8F1" },
              { value: 168, color: "#34D399" },
              { value: 233, color: "#FB7185" },
              { value: 74, color: "rgba(255,255,255,0.25)" },
            ]}
            height={12}
          />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px 16px",
              marginTop: 14,
            }}
          >
            {[
              { c: "#22D3EE", l: zones[0].z, v: "402" },
              { c: "#00B8F1", l: zones[1].z, v: "271" },
              { c: "#34D399", l: zones[2].z, v: "168" },
              { c: "#FB7185", l: zones[3].z, v: "233" },
              { c: "rgba(255,255,255,0.25)", l: zones[4].z, v: "74" },
            ].map((lg) => (
              <span
                key={lg.l}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 11,
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    background: lg.c,
                  }}
                />
                {lg.l}
                <span
                  className="nx-mono"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  {lg.v} m³
                </span>
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            ...card,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: 12,
              alignSelf: "flex-start",
            }}
          >
            {L.usageTitle}
          </div>
          <Donut
            segments={[
              { value: 47, color: "#22D3EE" },
              { value: 28, color: "#00B8F1" },
              { value: 16, color: "#34D399" },
              { value: 9, color: "#FB7185" },
            ]}
            size={120}
            thickness={14}
            centerTop="47%"
            centerSub={L.uShare}
          />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px 14px",
              marginTop: 12,
              justifyContent: "center",
            }}
          >
            {[
              { c: "#22D3EE", l: L.uProc },
              { c: "#00B8F1", l: L.uCool },
              { c: "#34D399", l: L.uClean },
              { c: "#FB7185", l: L.uOther },
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
                {lg.l}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Anomaly log */}
      <div style={{ marginTop: 12, position: "relative" }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            marginBottom: 8,
          }}
        >
          {L.anomTitle}
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
          data-nx-collapse-2
        >
          {[
            { t: L.a1, c: "#FB7185", bg: "rgba(251,113,133,0.06)", bd: "rgba(251,113,133,0.2)" },
            { t: L.a2, c: "#FCD34D", bg: "rgba(252,211,77,0.06)", bd: "rgba(252,211,77,0.2)" },
            { t: L.a3, c: "#34D399", bg: "rgba(52,211,153,0.06)", bd: "rgba(52,211,153,0.2)" },
          ].map((a, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 8,
                background: a.bg,
                border: `1px solid ${a.bd}`,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: a.c,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.85)" }}>
                {a.t}
              </span>
            </div>
          ))}
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
