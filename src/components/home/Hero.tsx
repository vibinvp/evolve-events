import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/en";
import { SplitText } from "@/components/ui/SplitText";
import { ButtonLink } from "@/components/ui/ButtonLink";

/** Full-bleed film, serif headline set low on the frame, facts on a hairline. */
export function Hero({ lang, t }: { lang: Locale; t: Dict }) {
  const h = t.hero;
  return (
    <section className="tone-dark relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 -z-10" data-clip="hero">
        <Image src="/img/gallery/1.webp" alt="" fill priority sizes="100vw" className="object-cover" />
        <video data-autoplay autoPlay muted loop playsInline preload="metadata" aria-label={h.videoLabel}
          className="absolute inset-0 size-full object-cover">
          <source src="/video/hero.webm" type="video/webm" />
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-night/70 via-transparent to-transparent rtl:bg-gradient-to-l" />
        <div aria-hidden className="drift absolute -bottom-1/3 start-[-10%] size-[70vw] max-w-[900px] rounded-full bg-magenta/25 blur-[140px]" />
      </div>

      {/* Balloons and bubbles drift up through the hero */}
      <div className="float-layer" aria-hidden="true">
        <span className="float-item balloon" style={{ "--l": "6%", "--w": "74px", "--c1": "#de2e97", "--c2": "#8f2a9a", "--t": "15s", "--d": "0s", "--dx": "30px" } as React.CSSProperties} />
        <span className="float-item balloon hide-sm" style={{ "--l": "20%", "--w": "58px", "--c1": "#7f3fbf", "--c2": "#4b1f8a", "--t": "18s", "--d": "-7s", "--dx": "-24px" } as React.CSSProperties} />
        <span className="float-item balloon" style={{ "--l": "46%", "--w": "66px", "--c1": "#ff6bc4", "--c2": "#de2e97", "--t": "16s", "--d": "-4s", "--dx": "26px" } as React.CSSProperties} />
        <span className="float-item balloon hide-sm" style={{ "--l": "72%", "--w": "80px", "--c1": "#a374e0", "--c2": "#7f3fbf", "--t": "19s", "--d": "-10s", "--dx": "-30px" } as React.CSSProperties} />
        <span className="float-item balloon" style={{ "--l": "90%", "--w": "56px", "--c1": "#de2e97", "--c2": "#7f3fbf", "--t": "17s", "--d": "-13s", "--dx": "-20px" } as React.CSSProperties} />
        <span className="float-item bubble" style={{ "--l": "12%", "--sz": "26px", "--t": "10s", "--d": "-2s", "--dx": "20px" } as React.CSSProperties}><i /></span>
        <span className="float-item bubble hide-sm" style={{ "--l": "30%", "--sz": "42px", "--t": "12s", "--d": "-8s", "--dx": "-30px" } as React.CSSProperties}><i /></span>
        <span className="float-item bubble" style={{ "--l": "38%", "--sz": "20px", "--t": "9s", "--d": "-5s", "--dx": "16px" } as React.CSSProperties}><i /></span>
        <span className="float-item bubble" style={{ "--l": "58%", "--sz": "34px", "--t": "11s", "--d": "-3s", "--dx": "-22px" } as React.CSSProperties}><i /></span>
        <span className="float-item bubble hide-sm" style={{ "--l": "66%", "--sz": "56px", "--t": "14s", "--d": "-9s", "--dx": "28px" } as React.CSSProperties}><i /></span>
        <span className="float-item bubble" style={{ "--l": "82%", "--sz": "30px", "--t": "10.5s", "--d": "-1s", "--dx": "-18px" } as React.CSSProperties}><i /></span>
        <span className="float-item bubble hide-sm" style={{ "--l": "95%", "--sz": "22px", "--t": "9.5s", "--d": "-6s", "--dx": "14px" } as React.CSSProperties}><i /></span>
      </div>

      <div className="container-x relative z-10 pb-10 pt-40 lg:pb-14">
        <h1 className="display max-w-[16ch] text-[clamp(3.2rem,9.4vw,9.5rem)]">
          <SplitText when="hero" text={h.titleA} />
          <br />
          <SplitText when="hero" className="accent" text={h.titleB} />
        </h1>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5" data-hero>
            <p className="text-lg font-semibold leading-snug">{h.bold}</p>
            <p className="mt-3 max-w-md text-white/70">{h.body}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/${lang}/contact`} variant="light">{h.primary}</ButtonLink>
              <ButtonLink href={`/${lang}/works`} variant="outline-light" arrow={false}>{h.secondary}</ButtonLink>
            </div>
          </div>

          <dl className="grid grid-cols-3 border-t border-white/25 pt-6 lg:col-span-6 lg:col-start-7" data-hero>
            {h.chips.map((c) => (
              <div key={c.label} className="pe-4">
                <dd className="num text-[clamp(2.4rem,5vw,4.6rem)]" data-count={c.value} data-suffix={c.suffix}>
                  {c.value}{c.suffix}
                </dd>
                <dt className="mt-2 text-xs text-white/65 lg:text-sm">{c.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
