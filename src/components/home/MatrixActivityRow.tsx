"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  findNaceEntry,
  normalizeNaceCode,
  searchNace,
  isCompleteNaceCode,
  type NaceEntry,
} from "@/lib/water-efficiency-matrix";

export interface ActivityRowState {
  id: string;
  query: string;
  naceCode: string;
}

const fieldStyle: CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid var(--nx-200)",
  fontSize: 14.5,
  background: "#fff",
};

export function MatrixActivityRow({
  row,
  rowLabel,
  naceLabel,
  nacePlaceholder,
  removeLabel,
  canRemove,
  onChange,
  onRemove,
}: {
  row: ActivityRowState;
  rowLabel: string;
  naceLabel: string;
  nacePlaceholder: string;
  removeLabel: string;
  canRemove: boolean;
  onChange: (id: string, query: string, naceCode: string) => void;
  onRemove: (id: string) => void;
}) {
  const [showList, setShowList] = useState(false);

  const suggestions = useMemo(
    () => searchNace(row.query || row.naceCode, 10),
    [row.query, row.naceCode],
  );

  const pick = (entry: NaceEntry) => {
    onChange(row.id, `${entry.code} — ${entry.activityTr}`, entry.code);
    setShowList(false);
  };

  const handleChange = (value: string) => {
    const normalized = normalizeNaceCode(value);
    const code = isCompleteNaceCode(value) ? normalized : row.naceCode;
    onChange(row.id, value, code);
    setShowList(true);
  };

  const handleBlur = () => {
    window.setTimeout(() => setShowList(false), 150);
    if (isCompleteNaceCode(row.query) || isCompleteNaceCode(row.naceCode)) {
      const code = normalizeNaceCode(row.naceCode || row.query);
      const entry = findNaceEntry(code);
      onChange(
        row.id,
        entry ? `${entry.code} — ${entry.activityTr}` : code,
        code,
      );
    }
  };

  return (
    <div className="nx-matrix-activity-row">
      <div style={{ flex: 1, position: "relative" }}>
        <label className="nx-matrix-row-label">
          {rowLabel} — {naceLabel}
        </label>
        <input
          type="text"
          value={row.query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setShowList(true)}
          onBlur={handleBlur}
          placeholder={nacePlaceholder}
          style={fieldStyle}
          autoComplete="off"
        />
        {showList && suggestions.length > 0 && (
          <ul className="nx-matrix-nace-list">
            {suggestions.map((entry) => (
              <li key={entry.code}>
                <button type="button" onMouseDown={() => pick(entry)}>
                  <strong>{entry.code}</strong>
                  <span>{entry.activityTr}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {canRemove && (
        <button
          type="button"
          className="nx-btn nx-btn--ghost"
          onClick={() => onRemove(row.id)}
          aria-label={removeLabel}
        >
          {removeLabel}
        </button>
      )}
    </div>
  );
}
