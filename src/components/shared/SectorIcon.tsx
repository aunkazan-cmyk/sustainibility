// Per-sector icon. Same brand-tinted container as BrandIcon (color keyed to
// the sector's brand-area affinity) but a distinct Lucide-style glyph per
// sector instead of the three generic brand marks. Matched by name (TR+EN)
// the same way aff()/challenge() do in SectorsPage.
type Kind = "flow" | "sustain" | "adr" | "nexovia";

const CONFIG: Record<Kind, { color: string; soft: string }> = {
  flow: { color: "var(--nx-flow)", soft: "var(--nx-flow-soft)" },
  sustain: { color: "var(--nx-sustain)", soft: "var(--nx-sustain-soft)" },
  adr: { color: "var(--nx-adr)", soft: "var(--nx-adr-soft)" },
  nexovia: { color: "var(--nx-navy)", soft: "#EEF2FF" },
};

type GlyphKey =
  | "manufacturing"
  | "chemicals"
  | "food"
  | "textile"
  | "logistics"
  | "energy"
  | "industrialZone"
  | "municipality"
  | "campus"
  | "hotel"
  | "hospital"
  | "university"
  | "generic";

function glyphFor(name: string): GlyphKey {
  const x = name.toLowerCase();
  if (x.includes("üretim") || x.includes("manufac")) return "manufacturing";
  if (x.includes("kimya") || x.includes("chemic")) return "chemicals";
  if (x.includes("gıda") || x.includes("food")) return "food";
  if (x.includes("tekstil") || x.includes("textile")) return "textile";
  if (x.includes("lojistik") || x.includes("logistic")) return "logistics";
  if (x.includes("enerji") || x.includes("energy")) return "energy";
  if (x.includes("osb") || x.includes("industrial zone")) return "industrialZone";
  if (x.includes("belediye") || x.includes("municip")) return "municipality";
  if (x.includes("yerleşke") || x.includes("campus")) return "campus";
  if (x.includes("otel") || x.includes("hotel")) return "hotel";
  if (x.includes("hastane") || x.includes("hospital")) return "hospital";
  if (x.includes("üniversite") || x.includes("universit")) return "university";
  return "generic";
}

// 24×24, line style, inherits stroke via the wrapping <svg stroke=color>.
const GLYPHS: Record<GlyphKey, React.ReactNode> = {
  manufacturing: (
    <>
      <path d="M3 21V10l5 3V10l5 3V7l5 3v11Z" />
      <path d="M3 21h18" />
      <path d="M9 21v-4M14 21v-4" />
    </>
  ),
  chemicals: (
    <>
      <path d="M9 3h6" />
      <path d="M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" />
      <path d="M7.5 15h9" />
    </>
  ),
  food: (
    <>
      <path d="M5 3v8a3 3 0 0 0 6 0V3" />
      <path d="M8 11v10" />
      <path d="M17 3c-1.5 1-2 3-2 5s.5 4 2 5v8" />
    </>
  ),
  textile: (
    <>
      <rect x="6" y="3" width="12" height="4" rx="1" />
      <rect x="6" y="17" width="12" height="4" rx="1" />
      <path d="M8 7v10M12 7v10M16 7v10" />
    </>
  ),
  logistics: (
    <>
      <path d="M3 7h11v9H3z" />
      <path d="M14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </>
  ),
  energy: <path d="M13 2 4 14h7l-1 8 9-12h-7z" strokeLinejoin="round" />,
  industrialZone: (
    <>
      <path d="M3 21V9l5 3V9l5 3" />
      <path d="M13 21V5l8 4v12" />
      <path d="M3 21h18" />
      <path d="M17 13v.01M17 17v.01" />
    </>
  ),
  municipality: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V10M9 21V10M15 21V10M19 21V10" />
      <path d="M3 10h18L12 4Z" strokeLinejoin="round" />
    </>
  ),
  campus: (
    <>
      <path d="M3 21V8l6-4 6 4" />
      <path d="M9 21V12h6v9" />
      <path d="M15 21V10l6 3v8" />
      <path d="M2 21h20" />
    </>
  ),
  hotel: (
    <>
      <path d="M3 7v13M3 16h18v4M21 16v-3a3 3 0 0 0-3-3h-7v6" />
      <circle cx="7.5" cy="11.5" r="1.6" />
    </>
  ),
  hospital: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M12 8v6M9 11h6" />
    </>
  ),
  university: (
    <>
      <path d="M12 4 2 9l10 5 10-5Z" strokeLinejoin="round" />
      <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    </>
  ),
  generic: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M9 16V9l6 7V9" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

export function SectorIcon({
  name,
  kind,
  size = 40,
}: {
  name: string;
  kind: Kind | string;
  size?: number;
}) {
  const cfg = CONFIG[(kind as Kind) in CONFIG ? (kind as Kind) : "flow"];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        background: cfg.soft,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg
        width={size * 0.58}
        height={size * 0.58}
        viewBox="0 0 24 24"
        fill="none"
        stroke={cfg.color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {GLYPHS[glyphFor(name)]}
      </svg>
    </div>
  );
}
