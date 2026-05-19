// Unit test for the pure contact validation. Run: npm run test:contact
import assert from "node:assert/strict";
import {
  validateContact,
  isValidPhoneTR,
  normalizePhoneTR,
  type ContactInput,
} from "../src/lib/contact-schema.ts";

const M = {
  required: "REQ",
  email: "EMAIL",
  kvkk: "KVKK",
  sectorOther: "SECTOR_OTHER",
  phoneInvalid: "PHONE",
  nameInvalid: "NAME",
  messageTooShort: "MSG_SHORT",
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
  assert.equal(e.message, "MSG_SHORT");
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

t("name with digits → nameInvalid", () => {
  assert.equal(validateContact({ ...base, name: "Ada123" }, M).name, "NAME");
});

t("message under 10 chars → messageTooShort", () => {
  assert.equal(validateContact({ ...base, message: "kısa" }, M).message, "MSG_SHORT");
});

t("phone 10 digits without leading 0 → ok", () => {
  assert.deepEqual(validateContact({ ...base, phone: "5321234567" }, M), {});
});

t("phone with +90 prefix → ok", () => {
  assert.deepEqual(
    validateContact({ ...base, phone: "+90 532 123 45 67" }, M),
    {},
  );
});

t("invalid phone → phoneInvalid", () => {
  assert.equal(validateContact({ ...base, phone: "123" }, M).phone, "PHONE");
  assert.equal(validateContact({ ...base, phone: "06123456789" }, M).phone, "PHONE");
});

t("normalizePhoneTR strips formatting", () => {
  assert.equal(normalizePhoneTR("0 532 123 45 67"), "05321234567");
  assert.equal(normalizePhoneTR("+90 532 123 45 67"), "5321234567");
});

t("isValidPhoneTR", () => {
  assert.equal(isValidPhoneTR("05321234567"), true);
  assert.equal(isValidPhoneTR("5321234567"), true);
  assert.equal(isValidPhoneTR("123"), false);
});

console.log(`\n${passed} contact-schema assertions passed`);
