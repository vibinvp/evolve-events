import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMeta } from "@/i18n/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/terms">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { ...pageMeta(lang, "/terms", (await getDictionary(lang)).meta.terms), robots: { index: true } };
}

export default async function TermsPage({ params }: PageProps<"/[lang]/terms">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const l = t.legal;
  return (
    <>
      <section className="tone-dark pb-16 pt-44 lg:pb-24 lg:pt-56">
        <div className="container-x">
          <h1 className="display text-[clamp(2.6rem,6vw,5.6rem)]">{l.termsHeading}</h1>
          <p className="mt-5 text-sm text-white/60">{l.updated}</p>
        </div>
      </section>
      <article className="container-x max-w-3xl space-y-6 py-20 text-lg leading-relaxed text-ink-soft lg:py-28">
        {l.terms.map((p) => <p key={p}>{p}</p>)}
      </article>
    </>
  );
}
