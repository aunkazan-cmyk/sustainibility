import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const p = join(dirname(fileURLToPath(import.meta.url)), "..", "src/components/shared/ImageHero.tsx");
let c = readFileSync(p, "utf8");

const block = `            <motion
              className={
                fadeToWhite
                  ? "nx-image-hero__split-media nx-image-hero__split-media--fade"
                  : "nx-image-hero__split-media"
              }
            >
              <Image
                src={imageRight ?? image}
                alt={imageAlt}
                width={800}
                height={600}
                priority
                className="nx-image-hero__split-img"
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: 360,
                  objectFit: "cover",
                  borderRadius: 16,
                }}
              />
            </motion>`;

const blockFixed = block.replaceAll("<motion", "<div").replaceAll("</motion>", "</div>");

if (c.includes("nx-image-hero__split-media--fade")) {
  console.log("already patched");
} else {
  c = c.replace(
    /            <div className="nx-image-hero__split-media">[\s\S]*?            <\/div>\n          <\/motion>/,
    blockFixed + "\n          </div>",
  );
  // fix accidental closing tag
  c = c.replace(
    /blockFixed \+ "\n          <\/div>"/,
    "blockFixed",
  );
}

writeFileSync(p, c);
console.log("done", c.includes("split-media--fade"));
