import type { MetadataRoute } from "next";
import { locales, SITE_URL } from "@/i18n/config";

const paths = ["", "/about", "/services", "/works", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((p) =>
    locales.map((l) => ({
      url: `${SITE_URL}/${l}${p}`,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.7,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${SITE_URL}/${x}${p}`])) },
    })),
  );
}
