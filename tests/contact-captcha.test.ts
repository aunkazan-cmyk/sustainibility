// Unit test for contact math captcha. Run: npm run test:captcha
import assert from "node:assert/strict";
import {
  createMathChallenge,
  verifyChallenge,
} from "../src/lib/contact-captcha.ts";

process.env.CONTACT_CAPTCHA_SECRET = "test-secret";

let passed = 0;
function t(name: string, fn: () => void) {
  fn();
  passed++;
  console.log("  ✓", name);
}

t("createMathChallenge has prompt and token", () => {
  const c = createMathChallenge();
  assert.match(c.prompt, /^\d+ \+ \d+$/);
  assert.ok(c.token.length > 10);
});

t("verify correct answer", () => {
  const c = createMathChallenge();
  const [a, b] = c.prompt.split(" + ").map(Number);
  assert.equal(verifyChallenge(c.token, String(a + b)), "ok");
});

t("verify wrong answer", () => {
  const c = createMathChallenge();
  assert.equal(verifyChallenge(c.token, "0"), "invalid");
});

t("verify missing answer", () => {
  const c = createMathChallenge();
  assert.equal(verifyChallenge(c.token, ""), "missing");
});

t("verify invalid token", () => {
  assert.equal(verifyChallenge("bad.token", "5"), "invalid");
});

console.log(`\n${passed} contact-captcha assertions passed`);
