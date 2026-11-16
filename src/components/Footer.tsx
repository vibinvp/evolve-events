import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { CONTACT } from "@/i18n/config";
import type { Dict } from "@/i18n/en";

export function Footer({ lang, t }: { lang: Locale; t: Dict }) {
  const f = t.footer;
  const links = [
    { href: `/${lang}/about`, label: f.links.about },
    { href: `/${lang}/services`, label: f.links.services },
    { href: `/${lang}/works`, label: f.links.works },
    { href: `/${lang}/contact`, label: f.links.contact },
  ];
  const head = "mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/45 rtl:tracking-normal rtl:text-sm";

  return (
    <footer className="tone-dark relative overflow-hidden">
      <div className="container-x relative pt-24 lg:pt-32">
        {/* the one big action */}
        <a href={`mailto:${CONTACT.email}`} dir="ltr"
          className="group flex items-center justify-between gap-6 border-b border-white/20 pb-10 lg:pb-14">
          <span className="display text-[clamp(1.9rem,6.4vw,6.6rem)] transition-colors duration-500 group-hover:text-magenta">{CONTACT.email}</span>
          <ArrowUpRight className="size-8 shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 lg:size-14" />
        </a>

        <div className="grid gap-14 py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image src="/img/logo.png" alt="Evolve Events" width={142} height={94} className="mb-6 h-16 w-auto brightness-0 invert" />
            <p className="max-w-sm text-sm leading-relaxed text-white/60">{f.about}</p>
          </div>

          <nav className="lg:col-span-2 lg:col-start-6" aria-label={f.company}>
            <div className={head}>{f.company}</div>
            <ul className="-my-2.5 text-sm">
              {links.map((l) => (
                <li key={l.href}><Link href={l.href} className="link-draw inline-block py-2.5 text-white/80 hover:text-white">{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <div className={head}>{f.contact}</div>
            <ul className="text-sm text-white/80">
              <li className="pb-2.5">{f.address}</li>
              <li className="flex items-center gap-3">
                <Image src="/img/bahrain-flag.svg" alt="Bahrain" width={28} height={20} className="h-4 w-auto" />
                <a href={`tel:${CONTACT.phoneRaw}`} dir="ltr" className="link-draw inline-block py-2.5">{CONTACT.phone}</a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className={head}>{f.getStarted}</div>
            <Link href={`/${lang}/contact`} className="link-draw inline-block py-2.5 text-sm font-semibold">{f.book}</Link>
            <p className="mt-4 text-xs text-white/45">{t.common.corporateLine}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/15 py-8 text-xs text-white/45 md:flex-row">
          <p>© {new Date().getFullYear()} Evolve Events. {f.rights}</p>
          <div className="flex items-center gap-8">
            <Link href={`/${lang}/privacy`} className="link-draw inline-block py-3 hover:text-white">{f.privacy}</Link>
            <Link href={`/${lang}/terms`} className="link-draw inline-block py-3 hover:text-white">{f.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
