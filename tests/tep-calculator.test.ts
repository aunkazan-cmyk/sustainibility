import {
  computeRowTep,
  evaluateTepCalculation,
  formatTepValue,
  getTepSource,
  parseConsumptionInput,
} from "../src/lib/tep-calculator.ts";

function assert(cond: unknown, msg: string) {
  if (!cond) throw new Error(msg);
}

const approx = (a: number, b: number, eps = 1e-6) => Math.abs(a - b) < eps;

// parseConsumptionInput
assert(parseConsumptionInput("") === 0, "empty => 0");
assert(parseConsumptionInput("1,5") === 1.5, "comma decimal");
assert(parseConsumptionInput("1234,567") === 1234.567, "comma decimal long");
assert(parseConsumptionInput("-1") === null, "negative rejected");

// Electricity: 1_000_000 kWh => 86 TEP
const elec = getTepSource("electricity")!;
const elecCalc = computeRowTep(elec, 1_000_000, "kWh");
assert(approx(elecCalc.tep, 86), `electricity: ${elecCalc.tep}`);

// Natural gas: 100_000 m³ => 82.5 TEP
const gas = getTepSource("natural_gas")!;
const gasCalc = computeRowTep(gas, 100_000, "m3");
assert(approx(gasCalc.tep, 82.5), `gas: ${gasCalc.tep}`);

// LPG: 1000 kg => 1.09 TEP
const lpg = getTepSource("lpg")!;
assert(approx(computeRowTep(lpg, 1000, "kg").tep, 1.09), "lpg kg");
assert(approx(computeRowTep(lpg, 1, "ton").tep, 1.09), "lpg ton");

// Diesel: 1000 L => 1000 * 0.83/1000 * 1.02
const diesel = getTepSource("diesel")!;
assert(
  approx(computeRowTep(diesel, 1000, "liter").tep, 0.8466),
  `diesel liter: ${computeRowTep(diesel, 1000, "liter").tep}`,
);

// Gasoline liter conversion
const gasoline = getTepSource("gasoline")!;
assert(
  approx(computeRowTep(gasoline, 2000, "liter").tep, 1.5288),
  `gasoline: ${computeRowTep(gasoline, 2000, "liter").tep}`,
);

// Steam via kWh equivalent
const steam = getTepSource("steam")!;
assert(
  approx(computeRowTep(steam, 1000, "kWh").tep, 0.086),
  `steam kWh: ${computeRowTep(steam, 1000, "kWh").tep}`,
);
assert(
  approx(computeRowTep(steam, 1, "MWh").tep, 0.086),
  `steam MWh: ${computeRowTep(steam, 1, "MWh").tep}`,
);

// Full evaluation + bands
const { result, errors } = evaluateTepCalculation(
  [
    { key: "electricity", amountRaw: "1000000", unit: "kWh" },
    { key: "natural_gas", amountRaw: "", unit: "m3" },
  ],
  "TR",
);
assert(errors.length === 0, "no errors");
assert(result!.totalTep === 86, "total 86");
assert(result!.commentaryKey === "0_250", "band 0-250");
assert(result!.ctaBand === "standard", "standard cta");

const big = evaluateTepCalculation(
  [{ key: "electricity", amountRaw: "6000000", unit: "kWh" }],
  "TR",
);
assert(big.result!.totalTep === 516, "516 tep");
assert(big.result!.ctaBand === "expert", "expert cta");

assert(formatTepValue(0.0005, "TR") === "<0,001 TEP", "tiny tep format");

console.log("tep-calculator tests passed");
