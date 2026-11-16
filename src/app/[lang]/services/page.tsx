import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMeta } from "@/i18n/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { SplitText } from "@/components/ui/SplitText";
import { ButtonLink } from "@/components/ui/ButtonLink";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return pageMeta(lang, "/services", (await getDictionary(lang)).meta.services);
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const s = t.services;

  return (
    <>
      <PageHero
        image="/img/gallery/3.webp"
        eyebrow={s.hero.eyebrow}
        titleA={s.hero.titleA}
        titleB={s.hero.titleB}
        body={s.hero.body}
        actions={
          <>
            <ButtonLink href={`/${lang}/contact`} variant="light">{s.hero.cta}</ButtonLink>
            <ButtonLink href="#service-list" variant="outline-light" arrow={false}>{s.hero.cta2}</ButtonLink>
          </>
        }
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-24">
          <h2 className="display text-[clamp(2.4rem,5vw,4.8rem)] lg:col-span-7">
            <SplitText text={`${s.overview.titleA} ${s.overview.titleB}`} /> <SplitText className="accent" text={s.overview.titleC} />
          </h2>
          <div className="lg:col-span-5">
            <div className="space-y-5 text-lg text-ink-soft" data-stagger>
              {s.overview.paragraphs.map((p) => <p key={p}>{p}</p>)}
            </div>
            <div className="mt-9 flex flex-wrap gap-3" data-reveal>
              <ButtonLink href={`/${lang}/contact`}>{s.overview.cta}</ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <div id="service-list" className="bg-paper-2">
        {s.items.map((it, i) => (
          <section key={it.title} className="border-t border-[var(--line)] py-20 first:border-t-0 lg:py-32">
            <div className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-20">
              <div className={clsx("relative aspect-[5/4] overflow-hidden bg-night lg:col-span-6", i % 2 && "lg:order-2")} data-clip>
                <Image data-parallax src={it.image} alt={it.title} fill sizes="(min-width:1024px) 48vw, 100vw" className="scale-125 object-cover" />
              </div>
              <div className={clsx("lg:col-span-5", i % 2 ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-8")}>
                <span className="num text-brand text-7xl lg:text-8xl" data-reveal>0{i + 1}</span>
                <h2 className="display mt-6 text-[clamp(2rem,3.6vw,3.4rem)]" data-reveal>{it.title}</h2>
                <dl className="mt-8 space-y-5" data-reveal>
                  <div><dt className="eyebrow text-lilac before:hidden">{s.problem}</dt><dd className="mt-1.5 text-ink-soft">{it.problem}</dd></div>
                  <div><dt className="eyebrow text-lilac before:hidden">{s.outcome}</dt><dd className="mt-1.5 text-ink-soft">{it.outcome}</dd></div>
                </dl>
                <ul className="mt-8 border-b border-[var(--line)]" data-stagger>
                  {it.features.map((f) => (
                    <li key={f} className="border-t border-[var(--line)] py-3.5 text-[0.98rem]">{f}</li>
                  ))}
                </ul>
                <Link href={`/${lang}/contact`} className="link-draw mt-8 inline-flex items-center gap-2 font-semibold" data-reveal>
                  {s.quote}<ArrowUpRight className="flip-rtl size-4" />
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      <CtaBand lang={lang} titleA={s.cta.titleA} titleB={s.cta.titleB} body={s.cta.body} button={t.common.requestConsult} line={t.common.corporateLine} image="/img/gallery/8.webp" />
    </>
  );
}
