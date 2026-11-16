import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, SITE_URL, CONTACT } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMeta } from "@/i18n/seo";
import { Hero } from "@/components/home/Hero";
import { Philosophy } from "@/components/home/Philosophy";
import { KeyServices } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { Why } from "@/components/home/Why";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section, SectionHead } from "@/components/ui/Section";
import { Gallery } from "@/components/Gallery";
import { ButtonLink } from "@/components/ui/ButtonLink";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return pageMeta(lang, "", (await getDictionary(lang)).meta.home);
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const f = t.featured;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EventPlanner",
    name: "Evolve Events",
    url: SITE_URL,
    logo: `${SITE_URL}/img/logo.png`,
    image: `${SITE_URL}/img/gallery/1.webp`,
    email: CONTACT.email,
    telephone: CONTACT.phoneRaw,
    description: t.meta.home.description,
    areaServed: ["Bahrain", "Gulf Cooperation Council"],
    address: { "@type": "PostalAddress", streetAddress: "Seef District", addressLocality: "Manama", addressCountry: "BH" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero lang={lang} t={t} />
      <Philosophy lang={lang} t={t} />
      <KeyServices lang={lang} t={t} />
      <Process lang={lang} t={t} />

      <Section id="featured">
        <SectionHead split eyebrow={f.eyebrow} title={<>{f.titleA} <span className="accent">{f.titleB}</span></>} body={f.body} />
        <div className="mt-16 lg:mt-24" data-reveal>
          <Gallery
            items={f.projects.map((p) => ({ image: p.image, title: p.title, category: p.type, meta: `${p.attendees} ${f.attendees} · ${p.year}` }))}
            categories={f.categories}
            allLabel={f.all}
            prevLabel={f.prev}
            nextLabel={f.next}
            closeLabel={f.close}
            ctaLabel={f.ctaButton}
            ctaHref={`/${lang}/contact`}
          />
        </div>
        <div className="mt-20 grid gap-8 border-t border-[var(--line)] pt-12 lg:grid-cols-12 lg:items-end" data-reveal>
          <div className="lg:col-span-7">
            <h3 className="display text-[clamp(1.9rem,3.4vw,3.2rem)]">{f.ctaTitle}</h3>
            <p className="mt-4 max-w-xl text-ink-soft">{f.ctaBody}</p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <ButtonLink href={`/${lang}/contact`} className="w-full sm:w-auto">{f.ctaButton}</ButtonLink>
            <p className="mt-4 text-sm text-ink-soft">{f.ctaNote}</p>
          </div>
        </div>
      </Section>

      <Why lang={lang} t={t} tone="paper-2" />
      <CtaBand lang={lang} titleA={t.finalCta.titleA} titleB={t.finalCta.titleB} body={t.finalCta.body} button={t.common.consult} line={t.common.corporateLine} />
    </>
  );
}
