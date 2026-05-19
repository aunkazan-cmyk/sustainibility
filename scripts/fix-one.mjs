import { readFileSync, writeFileSync } from "node:fs";

const openBad = "<" + "motion";
const openDiv = "<" + "div";
const closeBad = "</" + "motion>";
const closeDiv = "</" + "motion".slice(0, 0) + "div>";

const files = [
  "src/components/pages/WaterServicePage.tsx",
  "src/components/pages/water/WaterServiceHero.tsx",
];

for (const f of files) {
  let c = readFileSync(f, "utf8");
  const before = c;
  c = c.split(closeBad).join("</div>");
  c = c.split(openBad).join(openDiv);
  if (c !== before) {
    writeFileSync(f, c);
    console.log("fixed", f);
  }
}
