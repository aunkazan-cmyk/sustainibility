// Nexovia ADR product mockup — a dangerous-goods COMPLIANCE board (document
// & shipment status, ADR class mix, inspection readiness), NOT a water
// dashboard. Static, every value ÖRNEK/SAMPLE-tagged (project_docs: no
// fabricated real data). Amber/ADR palette to read distinctly from Flow.
import type { LangCode } from "@/i18n/getDictionary";
import { SampleBanner } from "@/components/shared/SampleBanner";
import {
  Sparkline,
  Donut,
  BarGroup,
  TrendArrow,
} from "@/components/shared/charts";

export function AdrDashboard({
  compact = false,
  lang = "TR",
}: {
  compact?: boolean;
  lang?: LangCode;
}) {
  const tr = lang === "TR";
  const L = {
    title: tr ? "Operasyon — ADR Uyum Panosu" : "Operation — ADR Compliance Board",
    live: tr ? "Canlı" : "Live",
    sample: tr ? "ÖRNEK VERİ" : "SAMPLE DATA",
    host: "adr.nexovia.com.tr",
    shipments: tr ? "Aktif sevkiyat" : "Active shipments",
    docsOk: tr ? "Evrak tam" : "Docs complete",
    pending: tr ? "Eksik evrak" : "Missing docs",
    expiring: tr ? "Süresi yaklaşan belge" : "Expiring documents",
    classTitle: tr ? "ADR sınıf dağılımı" : "ADR class mix",
    readiness: tr ? "Denetim hazırlığı" : "Inspection readiness",
    alerts: tr ? "Uyarılar" : "Alerts",
    a1: tr
      ? "Sevkiyat #4821 — taşıma evrakı eksik"
      : "Shipment #4821 — transport document missing",
    a2: tr
      ? "ADR sürücü sertifikası — 12 gün içinde sona eriyor"
      : "ADR driver certificate — expires in 12 days",
    analytics: tr ? "7 günlük eğilim" : "7-day trend",
    mShip: tr ? "Sevkiyat / hafta" : "Shipments / week",
    mDocs: tr ? "Evrak tamlık" : "Doc complete",
    mExp: tr ? "Süresi yaklaşan" : "Expiring docs",
    mInsp: tr ? "Denetim" : "Inspections",
    byClassTitle: tr ? "Sınıfa göre sevkiyat" : "Shipments by class",
    byClassSub: tr ? "sevkiyat" : "shipments",
    weeklyTitle: tr ? "Haftalık uyum" : "Weekly compliance",
    w1: tr ? "H1" : "W1",
    w2: tr ? "H2" : "W2",
    w3: tr ? "H3" : "W3",
    w4: tr ? "H4" : "W4",
    w5: tr ? "H5" : "W5",
  };

  const classes = [
    { c: "3", l: tr ? "Yanıcı sıvı" : "Flammable liq.", pct: 38, col: "#F59E0B" },
    { c: "8", l: tr ? "Aşındırıcı" : "Corrosive", pct: 26, col: "#FB7185" },
    { c: "2", l: tr ? "Gaz" : "Gas", pct: 20, col: "#22D3EE" },
    { c: "9", l: tr ? "Muhtelif" : "Misc.", pct: 16, col: "#A78BFA" },
  ];

  const kpi = (label: string, value: string, sub: string, col: string) => (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 10,
        padding: "12px 14px",
      }}
    >
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.05em",
          color: "rgba(255,255,255,0.5)",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span
          style={{
            fontSize: compact ? 20 : 24,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          {value}
        </span>
        {sub && (
          <span style={{ fontSize: 11, color: col, fontWeight: 600 }}>{sub}</span>
        )}
      </div>
    </div>
  );

  return (
    <div
      style={{
        background: "#1A1206",
        borderRadius: 18,
        padding: compact ? 18 : 26,
        color: "#fff",
        fontFamily: "var(--nx-font-body)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "0 30px 80px -20px rgba(245, 158, 11, 0.22), 0 0 0 1px rgba(255,255,255,0.04)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 300,
          height: 300,
          background:
            "radial-gradient(closest-side, rgba(245,158,11,0.3), transparent)",
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
          marginBottom: 22,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#FCD34D",
              boxShadow: "0 0 12px #FCD34D",
            }}
          />
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {L.live}
          </span>
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
          {L.host}
        </span>
      </div>

      <div
        style={{
          fontSize: compact ? 14 : 16,
          fontWeight: 600,
          marginBottom: 18,
          position: "relative",
        }}
      >
        {L.title}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10,
          marginBottom: 18,
          position: "relative",
        }}
        data-nx-collapse-2
      >
        {kpi(L.shipments, "23", "", "#FCD34D")}
        {kpi(L.docsOk, "87%", "+5", "#34D399")}
        {kpi(L.pending, "3", "", "#FB7185")}
        {kpi(L.expiring, "5", "≤30g", "#FCD34D")}
      </div>

      {/* Extra analytics — KPI sparklines + class donut + weekly compliance */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 12,
          padding: "14px 16px",
          marginBottom: 12,
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            marginBottom: 12,
          }}
        >
          {L.analytics}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
            marginBottom: 16,
          }}
          data-nx-collapse-2
        >
          {[
            {
              label: L.mShip,
              value: "23",
              data: [14, 17, 16, 19, 21, 20, 23],
              color: "#F59E0B",
              trend: "+9",
              up: true,
              good: true as boolean | undefined,
            },
            {
              label: L.mDocs,
              value: "87%",
              data: [74, 78, 80, 79, 83, 85, 87],
              color: "#34D399",
              trend: "+5 pts",
              up: true,
              good: true as boolean | undefined,
            },
            {
              label: L.mExp,
              value: "5",
              data: [2, 3, 3, 4, 4, 5, 5],
              color: "#FCD34D",
              trend: "+3",
              up: true,
              good: false as boolean | undefined,
            },
            {
              label: L.mInsp,
              value: "4",
              data: [1, 2, 2, 3, 3, 4, 4],
              color: "#FB7185",
              trend: "+1",
              up: true,
              good: undefined as boolean | undefined,
            },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10,
                padding: "12px 14px",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.05em",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 6,
                }}
              >
                {m.label}
              </div>
              <div
                style={{
                  fontSize: compact ? 18 : 21,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                }}
              >
                {m.value}
              </div>
              <div style={{ marginTop: 8 }}>
                <Sparkline
                  data={m.data}
                  color={m.color}
                  width={120}
                  height={30}
                  area
                />
              </div>
              <div style={{ marginTop: 6 }}>
                <TrendArrow value={m.trend} up={m.up} good={m.good} />
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.8fr 1.2fr",
            gap: 12,
          }}
          data-nx-collapse
        >
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 10,
              padding: 14,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.55)",
                marginBottom: 12,
                alignSelf: "flex-start",
              }}
            >
              {L.byClassTitle}
            </div>
            <Donut
              segments={[
                { value: 38, color: "#F59E0B" },
                { value: 26, color: "#FB7185" },
                { value: 20, color: "#FCD34D" },
                { value: 16, color: "#A78BFA" },
              ]}
              size={126}
              thickness={14}
              centerTop="23"
              centerSub={L.byClassSub}
            />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px 12px",
                marginTop: 12,
                justifyContent: "center",
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
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 10,
              padding: 14,
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.55)",
                marginBottom: 12,
              }}
            >
              {L.weeklyTitle}
            </div>
            <BarGroup
              bars={[
                { label: L.w1, value: 79, color: "#FB7185" },
                { label: L.w2, value: 83, color: "#FCD34D" },
                { label: L.w3, value: 85, color: "#FCD34D" },
                { label: L.w4, value: 91, color: "#34D399" },
                { label: L.w5, value: 87, color: "#F59E0B" },
              ]}
              width={260}
              height={104}
              max={100}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: 12,
          position: "relative",
        }}
        data-nx-collapse
      >
        {/* Class mix */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12,
            padding: 16,
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.55)",
              marginBottom: 14,
            }}
          >
            {L.classTitle}
          </div>
          {classes.map((c) => (
            <div key={c.c} style={{ marginBottom: 12 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: 5,
                }}
              >
                <span>
                  <span
                    style={{
                      display: "inline-block",
                      minWidth: 22,
                      textAlign: "center",
                      padding: "1px 6px",
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.06)",
                      color: c.col,
                      fontWeight: 700,
                      marginRight: 8,
                      fontSize: 11,
                    }}
                  >
                    {c.c}
                  </span>
                  {c.l}
                </span>
                <span style={{ color: "#fff" }}>{c.pct}%</span>
              </div>
              <div
                style={{
                  height: 6,
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.07)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${c.pct}%`,
                    height: "100%",
                    background: c.col,
                    borderRadius: 3,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Readiness gauge */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12,
            padding: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.55)",
              marginBottom: 12,
              alignSelf: "flex-start",
            }}
          >
            {L.readiness}
          </div>
          <svg width="132" height="132" viewBox="0 0 132 132">
            <circle
              cx="66"
              cy="66"
              r="54"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="12"
            />
            <circle
              cx="66"
              cy="66"
              r="54"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 54 * 0.82} ${2 * Math.PI * 54}`}
              transform="rotate(-90 66 66)"
            />
            <text
              x="66"
              y="62"
              textAnchor="middle"
              fontSize="30"
              fontWeight="700"
              fill="#fff"
            >
              82%
            </text>
            <text
              x="66"
              y="84"
              textAnchor="middle"
              fontSize="11"
              fill="rgba(255,255,255,0.5)"
            >
              {tr ? "hazır" : "ready"}
            </text>
          </svg>
        </div>
      </div>

      {/* Alerts */}
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
          {L.alerts}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            { t: L.a1, c: "#FB7185", bg: "rgba(251,113,133,0.06)", bd: "rgba(251,113,133,0.2)" },
            { t: L.a2, c: "#FCD34D", bg: "rgba(252,211,77,0.06)", bd: "rgba(252,211,77,0.2)" },
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
              <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.88)" }}>
                {a.t}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
