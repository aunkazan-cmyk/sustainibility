// locale → the prototype's { t, lang } contract. Ported page components keep
// using `t.x` and `lang === "TR"` verbatim; this is the only adapter.
import type { Locale } from "@/lib/site";
import { I18N, type Strings } from "./dictionary";

export type LangCode = "TR" | "EN";

export function langOf(locale: Locale): LangCode {
  return locale === "tr" ? "TR" : "EN";
}

export function getDictionary(locale: Locale): {
  t: Strings;
  lang: LangCode;
} {
  const lang = langOf(locale);
  return { t: I18N[lang], lang };
}

export type { Strings };
