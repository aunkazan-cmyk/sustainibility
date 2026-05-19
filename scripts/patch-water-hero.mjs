import fs from "fs";

const p = "src/components/pages/WaterServicePage.tsx";
let s = fs.readFileSync(p, "utf8");
const start = s.indexOf("      {/* Breadcrumb + Hero */}");
const end = s.indexOf("      {/* Process */}");
if (start < 0 || end < 0) {
  console.error("markers not found", start, end);
  process.exit(1);
}
const insert = `      <WaterServiceHero
        locale={locale}
        lang={lang}
        t={t}
        sp={sp}
        homeHref={homeHref}
        flowHref={flowHref}
        contactHref={contactHref}
      />

`;
s = s.slice(0, start) + insert + s.slice(end);
fs.writeFileSync(p, s);
console.log("patched hero");
