import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const nace = JSON.parse(
  readFileSync(join(root, "src/data/nace-ek1.json"), "utf8"),
);

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const byCode = new Map(nace.map((e) => [e.code, e]));
const TH = 50;

function normalizeNaceCode(raw) {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 4) {
    return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  }
  const s = raw.trim().replace(",", ".").replace(/\s+/g, "");
  const m = s.match(/^(\d{2})\.(\d{2})$/);
  if (m) return `${m[1]}.${m[2]}`;
  return s;
}

function isCompleteNaceCode(raw) {
  return /^\d{2}\.\d{2}$/.test(normalizeNaceCode(raw));
}

function evaluate(facilityType, naceCode, employeeCount) {
  if (facilityType !== "industrial") return "YUKUMLU";
  const code = naceCode ? normalizeNaceCode(naceCode) : "";
  const entry = code ? byCode.get(code) : undefined;
  if (!entry) return "OUT_OF_EK1";
  if (entry.status === "GONULLU") return "GONULLU";
  return (employeeCount ?? 0) >= TH ? "YUKUMLU" : "GONULLU";
}

function evaluateMulti(facilityType, employeeCount, activities) {
  if (facilityType !== "industrial") {
    return { headlineStatus: "YUKUMLU", rows: 1 };
  }
  const rows = activities.map((a) =>
    evaluate("industrial", a.naceCode, employeeCount),
  );
  const summary = { yukumlu: 0, gonullu: 0, outOfEk1: 0 };
  for (const s of rows) {
    if (s === "YUKUMLU") summary.yukumlu++;
    else if (s === "GONULLU") summary.gonullu++;
    else summary.outOfEk1++;
  }
  let headlineStatus = "OUT_OF_EK1";
  if (summary.yukumlu > 0) headlineStatus = "YUKUMLU";
  else if (summary.gonullu > 0) headlineStatus = "GONULLU";
  return { headlineStatus, summary, rows: rows.length };
}

assert(normalizeNaceCode("1012") === "10.12", "1012 => 10.12");
assert(normalizeNaceCode("10,12") === "10.12", "10,12 => 10.12");
assert(normalizeNaceCode("10 12") === "10.12", "10 12 => 10.12");
assert(isCompleteNaceCode("1012"), "1012 complete");
assert(isCompleteNaceCode("10.12"), "10.12 complete");
assert(!isCompleteNaceCode("10.1"), "10.1 incomplete");

assert(evaluate("industrial", "10.12", 50) === "YUKUMLU", "50 => YUKUMLU");
assert(evaluate("industrial", "1012", 50) === "YUKUMLU", "1012 lookup");
assert(evaluate("industrial", "10.12", 30) === "GONULLU", "30 => GONULLU");
assert(evaluate("industrial", "03.12", 200) === "GONULLU", "GONULLU NACE");
assert(evaluate("industrial", "99.99", 100) === "OUT_OF_EK1", "out of ek1");
assert(evaluate("osb") === "YUKUMLU", "OSB");

const multi = evaluateMulti("industrial", 75, [
  { naceCode: "10.12" },
  { naceCode: "03.12" },
  { naceCode: "99.99" },
]);
assert(multi.rows === 3, "3 rows");
assert(multi.summary.yukumlu === 1, "1 yukumlu");
assert(multi.summary.gonullu === 1, "1 gonullu");
assert(multi.summary.outOfEk1 === 1, "1 out");
assert(multi.headlineStatus === "YUKUMLU", "headline YUKUMLU");

console.log("matrix logic tests passed");
