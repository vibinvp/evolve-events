import Image from "next/image";
import { Star } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/en";
import { Section, Eyebrow, Rule } from "@/components/ui/Section";
import { Highlight } from "@/components/ui/Highlight";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SplitText } from "@/components/ui/SplitText";

/** Opening statement (words light up on scroll), three proof points on hairlines, then a wide photograph. */
export function Philosophy({ lang, t }: { lang: Locale; t: Dict }) {
  const p = t.philosophy;
  return (
    <>
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Eyebrow className="text-lilac">{p.badge}</Eyebrow>
          </div>
          <div className="lg:col-span-9">
            <h2 className="display text-[clamp(2.4rem,5.4vw,5.2rem)]">
              <SplitText text={p.titleA} /> <SplitText className="accent" text={p.titleB} />
            </h2>
            <Highlight text={p.body} className="mt-12 max-w-4xl font-display text-[clamp(1.5rem,2.6vw,2.4rem)] font-light leading-[1.3] tracking-tight" />
          </div>
        </div>

        <ul className="mt-24 grid lg:mt-32 lg:grid-cols-3" data-stagger>
          {p.points.map((pt, i) => (
            <li key={pt.title} className="border-t border-[var(--line)] py-8 lg:pe-10">
              <span className="num text-5xl text-brand">0{i + 1}</span>
              <h3 className="mt-6 text-xl font-semibold">{pt.title}</h3>
              <p className="mt-2 text-ink-soft">{pt.desc}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 text-sm font-semibold text-ink-soft" data-reveal>
          <span className="flex items-center gap-2">
            <span className="flex" aria-hidden>{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="size-4 fill-magenta text-magenta" />)}</span>
            {p.rating}
          </span>
          <span>{p.clients}</span>
          <span>{p.years}</span>
          <span className="ms-auto flex gap-3">
            <ButtonLink href={`/${lang}/contact`}>{p.cta}</ButtonLink>
            <ButtonLink href={`/${lang}/works`} variant="outline" arrow={false}>{p.cta2}</ButtonLink>
          </span>
        </div>
      </Section>

      {/* wide photograph */}
      <div className="relative h-[70svh] overflow-hidden bg-night lg:h-[92svh]" data-clip>
        <Image data-parallax src="/img/gallery/2.webp" alt={p.imageAlt} fill sizes="100vw" className="scale-125 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-night/50 to-transparent" />
      </div>

      {/* testimonial */}
      <section className="tone-paper-2 py-28 lg:py-40">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-2"><span className="num text-brand text-8xl leading-none" aria-hidden>“</span></div>
          <figure className="lg:col-span-9">
            <blockquote className="display text-[clamp(1.9rem,3.8vw,3.6rem)]" data-reveal>{p.quote}</blockquote>
            <Rule className="my-10" />
            <figcaption className="flex flex-wrap items-center justify-between gap-6" data-reveal>
              <span className="font-semibold">{p.quoteBy}</span>
              <ButtonLink href={`/${lang}/contact`} variant="outline">{p.quoteCta}</ButtonLink>
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
