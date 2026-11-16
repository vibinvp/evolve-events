"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { en } from "@/i18n/en";
import { ar } from "@/i18n/ar";

export default function NotFound() {
  const lang = usePathname().startsWith("/ar") ? "ar" : "en";
  const t = (lang === "ar" ? ar : en).notFound;
  return (
    <section className="tone-dark grid min-h-[100svh] place-items-center px-6 pt-24 text-center">
      <div>
        <p className="num text-brand text-[10rem]">404</p>
        <h1 className="display mt-4 text-4xl">{t.title}</h1>
        <p className="mx-auto mt-4 max-w-md text-white/70">{t.body}</p>
        <Link href={`/${lang}`} className="mt-8 inline-flex rounded-full bg-white px-8 py-4 font-semibold text-night hover:bg-brand hover:text-white transition-colors">{t.cta}</Link>
      </div>
    </section>
  );
}
