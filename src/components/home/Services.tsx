import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/en";
import { Section, SectionHead } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ServiceIndex } from "./ServiceIndex";

export function KeyServices({ lang, t }: { lang: Locale; t: Dict }) {
  const s = t.keyServices;
  return (
    <Section tone="paper-2" id="services">
      <SectionHead split eyebrow={s.eyebrow} title={s.title} body={s.body} />
      <div className="mt-20 lg:mt-28" data-reveal>
        <ServiceIndex items={s.items} cta={s.cta} href={`/${lang}/contact`} />
      </div>
      <div className="mt-14" data-reveal>
        <ButtonLink href={`/${lang}/services`} variant="outline">{s.all}</ButtonLink>
      </div>
    </Section>
  );
}
