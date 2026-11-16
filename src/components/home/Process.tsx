import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/en";
import { Section, Eyebrow } from "@/components/ui/Section";
import { SplitText } from "@/components/ui/SplitText";
import { ButtonLink } from "@/components/ui/ButtonLink";

/** Dark chapter: the heading holds still while four steps scroll past on the right. */
export function Process({ lang, t }: { lang: Locale; t: Dict }) {
  const p = t.process;
  return (
    <Section tone="dark" id="process">
      <div aria-hidden className="pointer-events-none absolute -end-1/4 top-0 size-[60vw] max-w-[820px] rounded-full bg-purple/25 blur-[150px]" />
      <div className="relative grid gap-16 lg:grid-cols-12 lg:gap-24">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Eyebrow className="mb-7 text-white/80">{p.eyebrow}</Eyebrow>
            <h2 className="display text-[clamp(2.4rem,5vw,4.8rem)]">
              <SplitText text={p.titleA} /> <SplitText className="accent" text={p.titleB} />
            </h2>
            <p className="mt-8 max-w-md text-lg text-white/70" data-reveal>{p.body}</p>
            <div className="mt-10 flex flex-wrap gap-3" data-reveal>
              <ButtonLink href={`/${lang}/contact`} variant="light">{p.cta}</ButtonLink>
              <ButtonLink href={`/${lang}/works`} variant="outline-light" arrow={false}>{p.cta2}</ButtonLink>
            </div>
          </div>
        </div>

        <ol className="space-y-20 lg:col-span-7 lg:space-y-28">
          {p.steps.map((s, i) => (
            <li key={s.title}>
              <div className="relative aspect-[16/10] overflow-hidden" data-clip>
                <Image data-parallax src={s.image} alt="" fill sizes="(min-width:1024px) 55vw, 100vw" className="scale-125 object-cover" />
                <div className="absolute inset-0 bg-ink/20" />
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-[auto_1fr] sm:gap-10" data-reveal>
                <span className="num text-brand text-7xl">0{i + 1}</span>
                <div>
                  <h3 className="display text-3xl lg:text-4xl">{s.title}</h3>
                  <p className="mt-3 max-w-lg text-white/70">{s.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
