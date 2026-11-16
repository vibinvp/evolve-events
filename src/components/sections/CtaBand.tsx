import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { SplitText } from "@/components/ui/SplitText";
import { ButtonLink } from "@/components/ui/ButtonLink";

/** Closing frame: a full-bleed night photograph under an enormous line. */
export function CtaBand({
  lang, titleA, titleB, body, button, line, image = "/img/gallery/7.webp",
}: { lang: Locale; titleA: string; titleB: string; body: string; button: string; line: string; image?: string }) {
  return (
    <section className="tone-dark relative isolate flex min-h-[88svh] items-end overflow-hidden">
      <div className="absolute inset-0 -z-10" data-clip>
        <Image data-parallax src={image} alt="" fill sizes="100vw" className="scale-125 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/80 to-night/55" />
        <div aria-hidden className="drift absolute -bottom-1/4 end-[-10%] size-[60vw] max-w-[800px] rounded-full bg-magenta/30 blur-[140px]" />
      </div>
      <div className="container-x py-24 lg:py-32">
        <h2 className="display max-w-[14ch] text-[clamp(3rem,8vw,8rem)]">
          <SplitText text={titleA} /> <SplitText className="accent" text={titleB} />
        </h2>
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <p className="max-w-xl text-lg text-white/75 lg:col-span-6" data-reveal>{body}</p>
          <div className="lg:col-span-5 lg:col-start-8" data-reveal>
            <ButtonLink href={`/${lang}/contact`} variant="light" className="w-full sm:w-auto">{button}</ButtonLink>
            <p className="mt-5 text-xs uppercase tracking-[0.18em] text-white/55 rtl:tracking-normal">{line}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
