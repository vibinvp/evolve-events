import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { isLocale, CONTACT } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMeta } from "@/i18n/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/ContactForm";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return pageMeta(lang, "/contact", (await getDictionary(lang)).meta.contact);
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const c = t.contact;

  return (
    <>
      <PageHero
        image="/img/gallery/9.webp"
        eyebrow={c.hero.eyebrow}
        titleA={c.hero.titleA}
        titleB={c.hero.titleB}
        body={c.hero.body}
        extra={
          <ul className="mt-2 space-y-2 text-sm font-medium text-white/80">
            {c.hero.checks.map((x) => (
              <li key={x} className="flex items-center gap-3"><Check className="size-4 text-magenta" />{x}</li>
            ))}
          </ul>
        }
      />

      <Section className="!py-24 lg:!py-36">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-7" data-reveal>
            <h2 className="display text-[clamp(2.2rem,4.4vw,4rem)]">{c.form.title}</h2>
            <p className="mb-14 mt-5 max-w-lg text-ink-soft">{c.form.body}</p>
            <ContactForm t={c.form} lang={lang} />
          </div>

          <aside className="tone-dark relative self-start overflow-hidden p-8 lg:col-span-5 lg:p-12" data-reveal>
            <div aria-hidden className="drift absolute -end-1/3 -top-1/4 size-[420px] rounded-full bg-magenta/25 blur-[110px]" />
            <div className="relative">
              <h3 className="display text-3xl">{c.after.title}</h3>
              <ol className="mt-8 divide-y divide-white/15 border-y border-white/15">
                {c.process.map((p, i) => (
                  <li key={p.title} className="flex gap-5 py-5">
                    <span className="num text-brand text-3xl">0{i + 1}</span>
                    <div>
                      <h4 className="font-semibold">{p.title}</h4>
                      <p className="mt-1 text-sm text-white/65">{p.description}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <h3 className="mb-5 mt-12 text-xs font-semibold uppercase tracking-[0.2em] text-white/50 rtl:tracking-normal rtl:text-sm">{c.after.detailsTitle}</h3>
              <ul className="space-y-4 text-white/85">
                <li className="flex items-center gap-3"><MapPin className="size-5 text-magenta" />{c.after.location}</li>
                <li className="flex items-center gap-3"><Mail className="size-5 text-magenta" /><a href={`mailto:${CONTACT.email}`} className="link-draw">{CONTACT.email}</a></li>
                <li className="flex items-center gap-3"><Phone className="size-5 text-magenta" /><a href={`tel:${CONTACT.phoneRaw}`} dir="ltr" className="link-draw">{CONTACT.phone}</a></li>
                <li className="flex items-center gap-3"><MessageCircle className="size-5 text-magenta" /><a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="link-draw">{c.after.whatsapp}</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
