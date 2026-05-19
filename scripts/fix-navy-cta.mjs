import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..", "src");

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
  if (!c.includes('variant="navy"')) continue;
  c = c.replaceAll(' variant="navy"', "");
  writeFileSync(file, c);
  console.log("fixed", file);
}
