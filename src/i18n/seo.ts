import type { Metadata } from "next";
import { locales, type Locale, SITE_URL } from "./config";

export function pageMeta(lang: Locale, path: string, m: { title: string; description: string }): Metadata {
  const url = `/${lang}${path}`;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: url,
      languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])), "x-default": `/en${path}` },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url,
      images: [{ url: `${SITE_URL}/img/gallery/1.webp`, width: 1400, height: 933, alt: "Evolve Events" }],
    },
  };
}
