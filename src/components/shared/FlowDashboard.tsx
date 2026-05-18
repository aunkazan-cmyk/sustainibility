// Flow dashboard mockup — ported verbatim from components.jsx. Static markup
// only (a marketing mock, not a real app), SAMPLE-tagged per project rules.
import type { LangCode } from "@/i18n/getDictionary";
import { SampleBanner } from "@/components/shared/SampleBanner";
import {
  Sparkline,
  Donut,
  BarGroup,
  TrendArrow,
} from "@/components/shared/charts";

export function FlowDashboard({
  compact = false,
  lang = "TR",
}: {
  compact?: boolean;
  lang?: LangCode;
}) {
  const labels =
    lang === "TR"
      ? {
          title: "Üretim Tesisi A — Su İzleme",
          live: "Canlı",
          consumption: "Anlık tüketim",
          target: "Aylık hedef",
          facilities: "Aktif tesis",
          reports: "Bekleyen rapor",
          placeholder: "ÖRNEK VERİ",
          chart: "Son 30 gün — m³/saat",
          alerts: "Uyarılar",
          alert1: "Tesis B — eşik üstü tüketim",
          alert2: "Sayaç 04-A bakım hatırlatması",
          analytics: "7 günlük eğilim",
          mTrend7: "Tüketim (7g)",
          mPress: "Hat basıncı",
          mReuse: "Geri kazanım",
          mLeak: "Kaçak olayı",
          targetTitle: "Aylık hedef ilerlemesi",
          targetSub: "hedefin",
          shiftTitle: "Vardiyaya göre tüketim",
          s1: "Vrd 1",
          s2: "Vrd 2",
          s3: "Vrd 3",
          s4: "Gece",
          unitM3: "m³/h",
          unitBar: "bar",
        }
      : {
          title: "Manufacturing Site A — Water Monitoring",
          live: "Live",
          consumption: "Real-time use",
          target: "Monthly target",
          facilities: "Active sites",
          reports: "Pending reports",
          placeholder: "SAMPLE DATA",
          chart: "Last 30 days — m³/h",
          alerts: "Alerts",
          alert1: "Site B — consumption above threshold",
          alert2: "Meter 04-A maintenance reminder",
          analytics: "7-day trend",
          mTrend7: "Use (7d)",
          mPress: "Line pressure",
          mReuse: "Water reuse",
          mLeak: "Leak events",
          targetTitle: "Monthly target progress",
          targetSub: "of target",
          shiftTitle: "Consumption by shift",
          s1: "Sh 1",
          s2: "Sh 2",
          s3: "Sh 3",
          s4: "Night",
          unitM3: "m³/h",
          unitBar: "bar",
        };

  return (
    <div
      style={{
        background: "#0B1226",
        borderRadius: 18,
        padding: compact ? 18 : 26,
        color: "#fff",
        fontFamily: "var(--nx-font-body)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "0 30px 80px -20px rgba(0, 184, 241, 0.25), 0 0 0 1px rgba(255,255,255,0.04)",
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
            "radial-gradient(closest-side, rgba(0,184,241,0.3), transparent)",
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
              background: "#22D3EE",
              boxShadow: "0 0 12px #22D3EE",
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
            {labels.live}
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
            {labels.placeholder}
          </span>
        </div>
        <div
          style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}
          className="nx-mono"
        >
          flow.nexovia.com.tr
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 16,
          position: "relative",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: compact ? 14 : 16, fontWeight: 600 }}>
          {labels.title}
        </span>
        {/* Site selector — adds product depth (multi-facility context). */}
        <div style={{ display: "flex", gap: 6 }}>
          {[
            { n: lang === "TR" ? "Tesis A" : "Site A", on: true },
            { n: lang === "TR" ? "Tesis B" : "Site B", on: false },
            { n: lang === "TR" ? "Tüm tesisler" : "All sites", on: false },
          ].map((s) => (
            <span
              key={s.n}
              style={{
                fontSize: 11,
                padding: "4px 10px",
                borderRadius: 999,
                fontWeight: 600,
                color: s.on ? "#001244" : "rgba(255,255,255,0.6)",
                background: s.on ? "#22D3EE" : "rgba(255,255,255,0.05)",
                border: s.on
                  ? "1px solid #22D3EE"
                  : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {s.n}
            </span>
          ))}
        </div>
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
        {[
          {
            label: labels.consumption,
            value: "42.8",
            unit: "m³/h",
            trend: "-12%",
            up: false,
          },
          { label: labels.target, value: "78%", unit: "", trend: "+4 pts", up: true },
          { label: labels.facilities, value: "07", unit: "", trend: "" },
          { label: labels.reports, value: "3", unit: "", trend: "" },
        ].map((kpi, i) => (
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
              {kpi.label}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span
                style={{
                  fontSize: compact ? 20 : 24,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                }}
              >
                {kpi.value}
              </span>
              {kpi.unit && (
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>
                  {kpi.unit}
                </span>
              )}
            </div>
            {kpi.trend && (
              <div
                style={{
                  fontSize: 11,
                  marginTop: 4,
                  fontWeight: 600,
                  color: kpi.up ? "#34D399" : "#22D3EE",
                }}
              >
                {kpi.trend}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Extra analytics block — mini KPI sparklines + target donut + shift bars */}
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
          {labels.analytics}
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
              label: labels.mTrend7,
              value: "298",
              unit: labels.unitM3,
              data: [41, 39, 44, 38, 36, 35, 32],
              color: "#22D3EE",
              trend: "-9%",
              up: false,
              good: true,
            },
            {
              label: labels.mPress,
              value: "4.2",
              unit: labels.unitBar,
              data: [3.9, 4.1, 4.0, 4.2, 4.1, 4.3, 4.2],
              color: "#00B8F1",
              trend: "+0.3",
              up: true,
              good: undefined as boolean | undefined,
            },
            {
              label: labels.mReuse,
              value: "61%",
              unit: "",
              data: [48, 51, 53, 55, 57, 59, 61],
              color: "#34D399",
              trend: "+13 pts",
              up: true,
              good: true,
            },
            {
              label: labels.mLeak,
              value: "2",
              unit: "",
              data: [5, 4, 4, 3, 3, 2, 2],
              color: "#FB7185",
              trend: "-3",
              up: false,
              good: true,
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
                style={{ display: "flex", alignItems: "baseline", gap: 4 }}
              >
                <span
                  style={{
                    fontSize: compact ? 18 : 21,
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {m.value}
                </span>
                {m.unit && (
                  <span
                    style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}
                  >
                    {m.unit}
                  </span>
                )}
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
              {labels.targetTitle}
            </div>
            <Donut
              segments={[
                { value: 78, color: "#22D3EE" },
                { value: 22, color: "rgba(255,255,255,0.08)" },
              ]}
              size={126}
              thickness={14}
              centerTop="78%"
              centerSub={labels.targetSub}
            />
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
              {labels.shiftTitle}
            </div>
            <BarGroup
              bars={[
                { label: labels.s1, value: 118, color: "#22D3EE" },
                { label: labels.s2, value: 142, color: "#00B8F1" },
                { label: labels.s3, value: 96, color: "#34D399" },
                { label: labels.s4, value: 54, color: "#FB7185" },
              ]}
              width={260}
              height={104}
            />
          </div>
        </div>
      </div>

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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            {labels.chart}
          </span>
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { c: "#22D3EE", l: lang === "TR" ? "Gerçek" : "Actual" },
              {
                c: "rgba(255,255,255,0.3)",
                l: lang === "TR" ? "Hedef" : "Target",
              },
            ].map((leg, i) => (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 10,
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 2,
                    background: leg.c,
                    display: "inline-block",
                  }}
                />
                {leg.l}
              </span>
            ))}
          </div>
        </div>
        <svg
          viewBox="0 0 400 90"
          style={{ width: "100%", height: compact ? 72 : 92 }}
        >
          <defs>
            <linearGradient id="flowFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1="0"
              y1={20 + i * 20}
              x2="400"
              y2={20 + i * 20}
              stroke="rgba(255,255,255,0.05)"
            />
          ))}
          <line
            x1="0"
            y1="42"
            x2="400"
            y2="42"
            stroke="rgba(255,255,255,0.25)"
            strokeDasharray="3 4"
          />
          <path
            d="M0,55 L25,52 L50,58 L75,48 L100,50 L125,45 L150,42 L175,48 L200,38 L225,40 L250,32 L275,35 L300,30 L325,28 L350,33 L375,25 L400,28"
            fill="none"
            stroke="#22D3EE"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M0,55 L25,52 L50,58 L75,48 L100,50 L125,45 L150,42 L175,48 L200,38 L225,40 L250,32 L275,35 L300,30 L325,28 L350,33 L375,25 L400,28 L400,90 L0,90 Z"
            fill="url(#flowFill)"
          />
        </svg>
      </div>

      <div style={{ position: "relative" }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            marginBottom: 8,
          }}
        >
          {labels.alerts}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 8,
              background: "rgba(252, 211, 77, 0.06)",
              border: "1px solid rgba(252, 211, 77, 0.2)",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#FCD34D",
              }}
            />
            <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.9)" }}>
              {labels.alert1}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 8,
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.4)",
              }}
            />
            <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.7)" }}>
              {labels.alert2}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
