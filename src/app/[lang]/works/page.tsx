import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMeta } from "@/i18n/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { Gallery } from "@/components/Gallery";
import { ButtonLink } from "@/components/ui/ButtonLink";

export async function generateMetadata({ params }: PageProps<"/[lang]/works">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return pageMeta(lang, "/works", (await getDictionary(lang)).meta.works);
}

export default async function WorksPage({ params }: PageProps<"/[lang]/works">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const w = t.works;

  return (
    <>
      <PageHero
        image="/img/gallery/12.webp"
        eyebrow={w.hero.eyebrow}
        titleA={w.hero.titleA}
        titleB={w.hero.titleB}
        body={w.hero.body}
        actions={
          <>
            <ButtonLink href={`/${lang}/contact`} variant="light">{w.hero.cta}</ButtonLink>
            <ButtonLink href="#gallery" variant="outline-light" arrow={false}>{w.hero.cta2}</ButtonLink>
          </>
        }
      />
      <Section className="!pt-20 lg:!pt-28">
        <Gallery
          id="gallery"
          items={w.items.map((i) => ({ image: i.image, video: "video" in i ? i.video : undefined, title: i.title, category: i.category, meta: i.year }))}
          categories={w.categories}
          allLabel={w.categories[0]}
          prevLabel={t.featured.prev}
          nextLabel={t.featured.next}
          closeLabel={t.featured.close}
          ctaLabel={w.modalCta}
          ctaHref={`/${lang}/contact`}
        />
      </Section>
      <CtaBand lang={lang} titleA={w.cta.titleA} titleB={w.cta.titleB} body={w.cta.body} button={w.cta.button} line={w.cta.line} image="/img/gallery/5.webp" />
    </>
  );
}
