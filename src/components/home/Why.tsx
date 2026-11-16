import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/en";
import { Section, Eyebrow } from "@/components/ui/Section";
import { SplitText } from "@/components/ui/SplitText";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function Why({ lang, t, tone = "paper" }: { lang: Locale; t: Dict; tone?: "paper" | "paper-2" }) {
  const w = t.why;
  return (
    <Section tone={tone} id="why-us">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-24">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Eyebrow className="mb-7">{w.eyebrow}</Eyebrow>
            <h2 className="display text-[clamp(2.3rem,4.6vw,4.4rem)]">
              <SplitText text={w.titleA} /> <SplitText className="accent" text={w.titleB} />
            </h2>
            <p className="mt-8 max-w-md text-lg text-ink-soft" data-reveal>{w.body}</p>
            <div className="mt-10 rounded-sm bg-ink p-7 text-white" data-reveal>
              <p className="text-white/80">{w.strip}</p>
              <div className="mt-6"><ButtonLink href={`/${lang}/contact`} variant="light">{t.common.consult}</ButtonLink></div>
            </div>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {w.reasons.map((r, i) => (
            <li key={r.title} className="group border-t border-[var(--line)] py-9 last:border-b lg:py-11">
              <div className="grid gap-5 sm:grid-cols-[4.5rem_1fr]">
                <span className="num text-4xl text-ink/30 transition-colors duration-500 group-hover:text-magenta">0{i + 1}</span>
                <div>
                  <h3 className="display text-[clamp(1.5rem,2.4vw,2.2rem)] transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">{r.title}</h3>
                  <p className="mt-3 max-w-xl text-ink-soft">{r.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
