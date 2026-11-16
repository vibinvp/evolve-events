import type { ReactNode } from "react";
import Image from "next/image";
import { SplitText } from "@/components/ui/SplitText";

/** Dark photographic opener for inner pages: label top, huge title low, copy and actions beside it. */
export function PageHero({
  eyebrow, titleA, titleB, body, actions, extra, image,
}: { eyebrow: string; titleA: string; titleB?: string; body: string; actions?: ReactNode; extra?: ReactNode; image: string }) {
  return (
    <section className="tone-dark relative isolate flex min-h-[86svh] items-end overflow-hidden">
      <div className="absolute inset-0 -z-10" data-clip="hero">
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/65 to-night/35" />
        <div aria-hidden className="drift absolute -top-1/4 end-[-10%] size-[55vw] max-w-[760px] rounded-full bg-purple/35 blur-[140px]" />
      </div>
      <div className="container-x pb-14 pt-44 lg:pb-20">
        <p className="eyebrow mb-8 text-white/80" data-hero>{eyebrow}</p>
        <h1 className="display max-w-[15ch] text-[clamp(3rem,8.6vw,8.6rem)]">
          <SplitText when="hero" text={titleA} />
          {titleB && (<><br /><SplitText when="hero" className="accent" text={titleB} /></>)}
        </h1>
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <p className="max-w-xl text-lg text-white/75 lg:col-span-6" data-hero>{body}</p>
          {(actions || extra) && (
            <div className="lg:col-span-5 lg:col-start-8" data-hero>
              {actions && <div className="flex flex-col gap-3 sm:flex-row">{actions}</div>}
              {extra}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
