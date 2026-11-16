import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Hanken_Grotesk, Fraunces, IBM_Plex_Sans_Arabic } from "next/font/google";
import "../globals.css";
import { locales, isLocale, dirOf, SITE_URL } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Motion } from "@/components/Motion";
import { Preloader } from "@/components/Preloader";
import SplashCursor from "@/components/SplashCursor";

const latin = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap",
});
const serif = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-serif",
  display: "swap",
});
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const viewport: Viewport = { themeColor: "#0b0812" };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = await getDictionary(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.meta.home.title, template: "%s" },
    description: t.meta.home.description,
    applicationName: t.meta.siteName,
    openGraph: { siteName: t.meta.siteName, type: "website", locale: lang === "ar" ? "ar_BH" : "en_US" },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = await getDictionary(lang);


  return (
    <html lang={lang} dir={dirOf(lang)} className={`${latin.variable} ${serif.variable} ${arabic.variable}`} suppressHydrationWarning>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-night focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          {t.nav.skip}
        </a>
        <Preloader />
        <Motion />
        <SplashCursor />
        <Header lang={lang} t={t.nav} />
        {children}
        <Footer lang={lang} t={t} />
        <WhatsAppButton />
      </body>
    </html>
  );
}
