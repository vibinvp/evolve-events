import "server-only";
import type { Locale } from "./config";
import type { Dict } from "./en";

const dictionaries = {
  en: () => import("./en").then((m) => m.en),
  ar: () => import("./ar").then((m) => m.ar),
} satisfies Record<Locale, () => Promise<Dict>>;

export const getDictionary = (locale: Locale) => dictionaries[locale]();
