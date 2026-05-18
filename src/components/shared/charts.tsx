// Tiny inline-SVG chart primitives. Pure, server-rendered, zero JS / zero
// deps — keeps dashboards static (preserves Lighthouse perf + CLS). Used by
// the Flow/ADR dashboard mockups (all data is illustrative; see SampleBanner).
import type { CSSProperties } from "react";

function norm(data: number[]) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  return { min, max, span };
}

export function Sparkline({
  data,
  color = "#22D3EE",
  width = 120,
  height = 34,
  area = false,
}: {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  area?: boolean;
}) {
  const { min, span } = norm(data);
  const step = width / (data.length - 1);
  const pts = data.map((v, i) => {
    const x = i * step;
    const y = height - 4 - ((v - min) / span) * (height - 8);
    return [x, y] as const;
  });
  const line = pts.map((p) => p.join(",")).join(" ");
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ display: "block", width: "100%", height }}
    >
      {area && (
        <polygon
          points={`0,${height} ${line} ${width},${height}`}
          fill={color}
          fillOpacity="0.14"
        />
      )}
      <polyline
        points={line}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.6" fill={color} />
    </svg>
  );
}

export function Donut({
  segments,
  size = 132,
  thickness = 14,
  centerTop,
  centerSub,
}: {
  segments: { value: number; color: string }[];
  size?: number;
  thickness?: number;
  centerTop?: string;
  centerSub?: string;
}) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  // Precompute each arc's length + cumulative offset (no render-time mutation).
  const arcs = segments.reduce<
    { color: string; len: number; offset: number }[]
  >((acc, s) => {
    const len = (s.value / total) * c;
    const prev = acc.length ? acc[acc.length - 1] : null;
    const offset = prev ? prev.offset + prev.len : 0;
    acc.push({ color: s.color, len, offset });
    return acc;
  }, []);
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      style={{ maxWidth: "100%", height: "auto" }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={thickness}
      />
      {arcs.map((a, i) => (
        <circle
          key={i}
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={a.color}
          strokeWidth={thickness}
          strokeLinecap="butt"
          strokeDasharray={`${a.len} ${c - a.len}`}
          strokeDashoffset={-a.offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      ))}
      {centerTop && (
        <text
          x={size / 2}
          y={size / 2 - 2}
          textAnchor="middle"
          fontSize={size * 0.2}
          fontWeight="700"
          fill="#fff"
        >
          {centerTop}
        </text>
      )}
      {centerSub && (
        <text
          x={size / 2}
          y={size / 2 + size * 0.15}
          textAnchor="middle"
          fontSize={size * 0.085}
          fill="rgba(255,255,255,0.5)"
        >
          {centerSub}
        </text>
      )}
    </svg>
  );
}

export function BarGroup({
  bars,
  width = 220,
  height = 92,
  max,
}: {
  bars: { label?: string; value: number; color: string }[];
  width?: number;
  height?: number;
  max?: number;
}) {
  const m = max ?? (Math.max(...bars.map((b) => b.value)) * 1.1 || 1);
  const slot = width / bars.length;
  const bw = Math.min(slot * 0.5, 26);
  const baseY = height - 16;
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <line x1="0" y1={baseY} x2={width} y2={baseY} stroke="rgba(255,255,255,0.12)" />
      {bars.map((b, i) => {
        const h = (b.value / m) * (baseY - 6);
        const x = i * slot + (slot - bw) / 2;
        return (
          <g key={i}>
            <rect
              x={x}
              y={baseY - h}
              width={bw}
              height={h}
              rx="3"
              fill={b.color}
            />
            {b.label && (
              <text
                x={x + bw / 2}
                y={height - 3}
                textAnchor="middle"
                fontSize="9"
                fill="rgba(255,255,255,0.45)"
              >
                {b.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function StackedBar({
  parts,
  height = 10,
}: {
  parts: { value: number; color: string }[];
  height?: number;
}) {
  const total = parts.reduce((s, p) => s + p.value, 0) || 1;
  return (
    <div
      style={{
        display: "flex",
        height,
        borderRadius: 999,
        overflow: "hidden",
        background: "rgba(255,255,255,0.07)",
      }}
    >
      {parts.map((p, i) => (
        <span
          key={i}
          style={{
            width: `${(p.value / total) * 100}%`,
            background: p.color,
          }}
        />
      ))}
    </div>
  );
}

export function TrendArrow({
  value,
  up,
  good,
}: {
  value: string;
  up: boolean;
  /** semantic colour: true = positive (green), false = attention (amber) */
  good?: boolean;
}) {
  const color = good === undefined ? "#22D3EE" : good ? "#34D399" : "#FB7185";
  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 3,
    fontSize: 11,
    fontWeight: 700,
    color,
  };
  return (
    <span style={style}>
      <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true">
        {up ? (
          <path d="M5 1 L9 7 H1 Z" fill={color} />
        ) : (
          <path d="M5 9 L1 3 H9 Z" fill={color} />
        )}
      </svg>
      {value}
    </span>
  );
}
