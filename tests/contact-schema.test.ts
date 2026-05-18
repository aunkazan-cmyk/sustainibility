// Unit test for the pure contact validation. Run: npm run test:contact
import assert from "node:assert/strict";
import { validateContact, type ContactInput } from "../src/lib/contact-schema.ts";

const M = {
  required: "REQ",
  email: "EMAIL",
  kvkk: "KVKK",
  sectorOther: "SECTOR_OTHER",
};

const base: ContactInput = {
  name: "Ada Lovelace",
  company: "ACME",
  email: "ada@example.com",
  phone: "05551112233",
  sector: "Kimya",
  sectorOther: "",
  serviceInterest: "",
  message: "Su verimliliği etüdü istiyoruz.",
  kvkkAccepted: true,
};

let passed = 0;
function t(name: string, fn: () => void) {
  fn();
  passed++;
  console.log("  ✓", name);
}

t("valid input → no errors", () => {
  assert.deepEqual(validateContact(base, M), {});
});

t("empty required fields → errors on each", () => {
  const e = validateContact(
    { ...base, name: "", company: "", phone: "", message: "" },
    M,
  );
  assert.equal(e.name, "REQ");
  assert.equal(e.company, "REQ");
  assert.equal(e.phone, "REQ");
  assert.equal(e.message, "REQ");
});

t("invalid email → email error", () => {
  assert.equal(validateContact({ ...base, email: "not-an-email" }, M).email, "EMAIL");
  assert.equal(validateContact({ ...base, email: "a@b" }, M).email, "EMAIL");
});

t("kvkk not accepted → kvkk error", () => {
  assert.equal(
    validateContact({ ...base, kvkkAccepted: false }, M).kvkkAccepted,
    "KVKK",
  );
});

t("sector 'other' without detail → sectorOther error", () => {
  assert.equal(
    validateContact({ ...base, sector: "other", sectorOther: "" }, M).sectorOther,
    "SECTOR_OTHER",
  );
});

t("sector 'other' with detail → ok", () => {
  assert.deepEqual(
    validateContact({ ...base, sector: "other", sectorOther: "Madencilik" }, M),
    {},
  );
});

t("short name (1 char) → required error", () => {
  assert.equal(validateContact({ ...base, name: "A" }, M).name, "REQ");
});

console.log(`\n${passed} contact-schema assertions passed`);
