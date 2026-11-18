"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import type { Locale } from "@/i18n/config";
import { CONTACT } from "@/i18n/config";
import type { Dict } from "@/i18n/en";

/** Transparent and light-on-dark over each page's dark hero; solid paper once scrolled. */
export function Header({ lang, t }: { lang: Locale; t: Dict["nav"] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { href: `/${lang}/works`, label: t.works },
    { href: `/${lang}/services`, label: t.services },
    { href: `/${lang}/about`, label: t.about },
    { href: `/${lang}/contact`, label: t.contact },
  ];
  const other: Locale = lang === "en" ? "ar" : "en";
  const switchHref = pathname.replace(/^\/(en|ar)/, `/${other}`) || `/${other}`;
  const solid = scrolled && !open;
  const light = !solid; // white text over dark

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500",
        solid ? "bg-paper/90 text-ink shadow-[0_1px_0_var(--line)] backdrop-blur-xl" : "text-white",
        open && "bg-night",
      )}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-6 lg:h-24">
        <Link href={`/${lang}`} aria-label={t.home} className="shrink-0">
          <Image
            src="/img/logo.png" alt="Evolve Events" width={142} height={94} priority
            className="h-11 w-auto lg:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link key={l.href} href={l.href} aria-current={active ? "page" : undefined}
                className={clsx("link-draw text-[0.95rem] font-medium", active && "after:!scale-x-100")}>
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href={switchHref} hrefLang={other} lang={other} aria-label={t.switchLabel}
            className="px-3 py-2 text-sm font-semibold opacity-80 transition-opacity hover:opacity-100">
            {t.switchTo}
          </Link>
          <Link href={`/${lang}/contact`}
            className={clsx(
              "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-500 active:scale-[0.97]",
              "bg-white text-night hover:bg-brand hover:text-white",
            )}>
            {t.plan}
            <ArrowUpRight className="flip-rtl size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-menu"
          aria-label={open ? t.close : t.menu}
          className={clsx("grid size-11 place-items-center rounded-full border lg:hidden", light || open ? "border-white/40" : "border-ink/20")}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Full-screen menu */}
      <div id="mobile-menu" hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto bg-night text-white lg:hidden">
        <div className="container-x flex min-h-full flex-col justify-between gap-12 pb-10 pt-6">
          <nav className="flex flex-col" aria-label="Mobile">
            {links.map((l, i) => (
              <Link key={l.href} href={l.href}
                className="flex items-baseline justify-between border-b border-white/15 py-5 font-display text-4xl font-light">
                <span>{l.label}</span>
                <span className="num text-base text-white/40">0{i + 1}</span>
              </Link>
            ))}
          </nav>
          <div className="grid gap-3">
            <Link href={`/${lang}/contact`} className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 font-semibold">
              {t.plan}<ArrowUpRight className="flip-rtl size-5" />
            </Link>
            <a href={`tel:${CONTACT.phoneRaw}`} dir="ltr" className="rounded-full border border-white/30 px-6 py-4 text-center font-semibold">
              {t.call} · {CONTACT.phone}
            </a>
            <Link href={switchHref} hrefLang={other} lang={other} className="py-3 text-center font-semibold text-white/80">
              {t.switchTo}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
