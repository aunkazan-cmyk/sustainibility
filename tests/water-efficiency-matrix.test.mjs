import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const nace = JSON.parse(
  readFileSync(join(root, "src/data/nace-ek1.json"), "utf8"),
) as { code: string; status: string }[];

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg);
}

const byCode = new Map(nace.map((e) => [e.code, e]));
const TH = 50;

function evaluate(
  facilityType: string,
  naceCode?: string,
  employeeCount?: number,
) {
  if (facilityType !== "industrial") return "YUKUMLU";
  const entry = naceCode ? byCode.get(naceCode) : undefined;
  if (!entry) return "OUT_OF_EK1";
  if (entry.status === "GONULLU") return "GONULLU";
  return (employeeCount ?? 0) >= TH ? "YUKUMLU" : "GONULLU";
}

assert(evaluate("industrial", "10.15", 50) === "YUKUMLU", "50 => YUKUMLU");
assert(evaluate("industrial", "10.15", 30) === "GONULLU", "30 => GONULLU");
assert(evaluate("industrial", "03.12", 200) === "GONULLU", "GONULLU NACE");
assert(evaluate("industrial", "99.99", 100) === "OUT_OF_EK1", "out of ek1");
assert(evaluate("osb") === "YUKUMLU", "OSB");

console.log("matrix logic tests passed");
