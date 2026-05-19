// Signed math challenge for contact-form spam protection (no third-party).
import { createHmac, randomInt, timingSafeEqual } from "node:crypto";

const TTL_MS = 10 * 60 * 1000;
const MIN = 1;
const MAX = 9;

export interface MathChallenge {
  prompt: string;
  token: string;
}

function secret(): string {
  const s = process.env.CONTACT_CAPTCHA_SECRET;
  if (!s && process.env.NODE_ENV === "production") {
    console.warn(
      "[contact-captcha] CONTACT_CAPTCHA_SECRET is unset in production",
    );
  }
  return s ?? "dev-captcha-secret-change-in-production";
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

function encode(answer: number, expiresAt: number): string {
  const payload = `${answer}:${expiresAt}`;
  return `${Buffer.from(payload).toString("base64url")}.${sign(payload)}`;
}

function decode(token: string): { answer: number; expiresAt: number } | null {
  const dot = token.lastIndexOf(".");
  if (dot < 1) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  let payload: string;
  try {
    payload = Buffer.from(body, "base64url").toString("utf8");
  } catch {
    return null;
  }
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  const [ans, exp] = payload.split(":");
  const answer = Number(ans);
  const expiresAt = Number(exp);
  if (!Number.isInteger(answer) || !Number.isFinite(expiresAt)) return null;
  return { answer, expiresAt };
}

export function createMathChallenge(): MathChallenge {
  const a = randomInt(MIN, MAX + 1);
  const b = randomInt(MIN, MAX + 1);
  const expiresAt = Date.now() + TTL_MS;
  return {
    prompt: `${a} + ${b}`,
    token: encode(a + b, expiresAt),
  };
}

export type CaptchaVerifyResult = "ok" | "missing" | "invalid" | "expired";

export function verifyChallenge(
  token: string | undefined,
  userAnswer: string | undefined,
): CaptchaVerifyResult {
  if (!token?.trim() || userAnswer === undefined || userAnswer === "") {
    return "missing";
  }
  const parsed = decode(token.trim());
  if (!parsed) return "invalid";
  if (Date.now() > parsed.expiresAt) return "expired";
  const n = Number(String(userAnswer).trim());
  if (!Number.isInteger(n) || n !== parsed.answer) return "invalid";
  return "ok";
}
