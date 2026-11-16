import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMeta } from "@/i18n/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section, SectionHead, Eyebrow, Rule } from "@/components/ui/Section";
import { SplitText } from "@/components/ui/SplitText";
import { Highlight } from "@/components/ui/Highlight";
import { ButtonLink } from "@/components/ui/ButtonLink";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return pageMeta(lang, "/about", (await getDictionary(lang)).meta.about);
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const a = t.about;

  return (
    <>
      <PageHero
        image="/img/gallery/6.webp"
        eyebrow={a.hero.eyebrow}
        titleA={a.hero.titleA}
        titleB={a.hero.titleB}
        body={a.hero.body}
        actions={
          <>
            <ButtonLink href={`/${lang}/contact`} variant="light">{a.hero.cta}</ButtonLink>
            <ButtonLink href={`/${lang}/services`} variant="outline-light" arrow={false}>{a.hero.cta2}</ButtonLink>
          </>
        }
      />

      {/* Responsibility: a big statement that reads itself in */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <Eyebrow className="lg:col-span-3">{a.overview.eyebrow}</Eyebrow>
          <div className="lg:col-span-9">
            <h2 className="display text-[clamp(2.4rem,5vw,4.8rem)]">
              <SplitText text={a.overview.titleA} /> <SplitText className="accent" text={a.overview.titleB} />
            </h2>
            <Highlight text={a.overview.paragraphs[0]} className="mt-12 max-w-4xl font-display text-[clamp(1.4rem,2.3vw,2.1rem)] font-light leading-[1.35]" />
            <div className="mt-12 grid gap-8 text-ink-soft md:grid-cols-2" data-stagger>
              {a.overview.paragraphs.slice(1).map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        </div>
      </Section>

      {/* Strengths: a hairline 2x2, no boxes */}
      <Section tone="paper-2">
        <SectionHead split eyebrow={a.strengths.eyebrow} title={a.strengths.title} body={a.strengths.body} />
        <div className="mt-20 grid md:grid-cols-2" data-stagger>
          {a.strengths.items.map((s, i) => (
            <div key={s.title} className="group border-t border-[var(--line)] py-10 md:pe-12 lg:py-14">
              <span className="num text-brand text-6xl">0{i + 1}</span>
              <h3 className="display mt-8 text-[clamp(1.5rem,2.3vw,2.2rem)]">{s.title}</h3>
              <p className="mt-4 max-w-md text-ink-soft">{s.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Framework: dark, four columns on a rule */}
      <Section tone="dark">
        <SectionHead split eyebrow={a.framework.eyebrow} title={<>{a.framework.titleA} <span className="accent">{a.framework.titleB}</span></>} body={a.framework.body} />
        <Rule className="mt-20 !bg-white/25" />
        <ol className="grid gap-12 pt-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8" data-stagger>
          {a.framework.steps.map((s, i) => (
            <li key={s.title}>
              <span className="num text-white/35 text-5xl">0{i + 1}</span>
              <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{s.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Standard */}
      <Section>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-6">
            <Eyebrow className="mb-7">{a.standard.eyebrow}</Eyebrow>
            <h2 className="display text-[clamp(2.3rem,4.6vw,4.4rem)]">
              <SplitText text={a.standard.titleA} /> <SplitText className="accent" text={a.standard.titleB} />
            </h2>
            <div className="mt-10 space-y-5 text-lg text-ink-soft" data-stagger>
              {a.standard.paragraphs.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
          <div className="lg:col-span-6">
            <h3 className="eyebrow mb-6 text-purple" data-reveal>{a.standard.deliverTitle}</h3>
            <ul className="border-b border-[var(--line)]" data-stagger>
              {a.standard.deliver.map((d) => (
                <li key={d.title} className="border-t border-[var(--line)] py-7">
                  <h4 className="display text-2xl">{d.title}</h4>
                  <p className="mt-2 text-ink-soft">{d.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="paper-2">
        <SectionHead split eyebrow={a.summary.eyebrow} title={<>{a.summary.titleA} <span className="accent">{a.summary.titleB}</span></>} body={a.summary.body} />
        <div className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8" data-stagger>
          {a.summary.items.map((s) => (
            <div key={s.title} className="border-t-2 border-ink pt-6">
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand lang={lang} titleA={t.finalCta.titleA} titleB={t.finalCta.titleB} body={t.finalCta.body} button={t.common.consult} line={t.common.corporateLine} image="/img/gallery/10.webp" />
    </>
  );
}
