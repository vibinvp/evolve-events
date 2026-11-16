export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const dirOf = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://evolveevent.co";

export const CONTACT = {
  email: "info@evolveevent.co",
  phone: "+973 3999 9231",
  phoneRaw: "+97339999231",
  whatsapp: "97339999231",
};
