import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..", "src");
const openBad = "<" + "motion";
const openGood = "<" + "div";
const closeBad = "</" + "motion>";
const closeGood = "</" + "div>";

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith(".tsx")) out.push(p);
  }
  return out;
}

for (const file of walk(root)) {
  let c = readFileSync(file, "utf8");
  if (!c.includes("motion")) continue;
  let n = c.split(closeBad).join(closeGood);
  n = n.split(openBad).join(openGood);
  if (n !== c) {
    writeFileSync(file, n);
    console.log("fixed", file);
  }
}
