"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import clsx from "clsx";

export type GalleryItem = { image: string; title: string; category: string; meta: string };

type Props = {
  items: GalleryItem[];
  categories: string[];
  allLabel: string;
  prevLabel: string;
  nextLabel: string;
  closeLabel: string;
  ctaLabel: string;
  ctaHref: string;
  id?: string;
};

export function Gallery({ items, categories, allLabel, prevLabel, nextLabel, closeLabel, ctaLabel, ctaHref, id }: Props) {
  const [filter, setFilter] = useState<string>(allLabel);
  const [active, setActive] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const visible = filter === allLabel ? items : items.filter((i) => i.category === filter);
  const tabs = [allLabel, ...categories.filter((c) => c !== allLabel)];

  const close = useCallback(() => {
    setActive(null);
    opener.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => setActive((i) => (i === null ? i : (i + d + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    if (active === null) return;
    document.documentElement.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      const dir = document.documentElement.dir === "rtl" ? -1 : 1;
      if (e.key === "ArrowRight") step(dir);
      if (e.key === "ArrowLeft") step(-dir);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, step]);

  const current = active !== null ? visible[active] : null;

  return (
    <div id={id}>
      <div className="mb-12 flex flex-wrap gap-x-8 gap-y-0 border-b border-[var(--line)] pb-5" role="tablist" aria-label="Filter">
        {tabs.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={filter === c}
            onClick={() => setFilter(c)}
            className={clsx(
              "relative py-3 text-sm font-semibold transition-colors after:absolute after:inset-x-0 after:bottom-[-1.35rem] after:h-px after:bg-brand after:transition-transform after:duration-500",
              filter === c ? "text-ink after:scale-x-100" : "text-ink-soft after:scale-x-0 hover:text-ink",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Mosaic: rows alternate 7+5 and 4+4+4 columns, so no two rows share a rhythm */}
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">
        {visible.map((it, i) => {
          const span = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4"][i % 5];
          const height = i % 5 < 2 ? "lg:h-[34rem]" : "lg:h-[26rem]";
          return (
            <li key={it.image + it.title} className={span}>
              <button
                onClick={(e) => { opener.current = e.currentTarget; setActive(i); }}
                className={clsx("group relative block aspect-[4/5] w-full overflow-hidden bg-ink text-start sm:aspect-square lg:aspect-auto", height)}
              >
                <Image src={it.image} alt={it.title} fill sizes="(min-width:1024px) 55vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white lg:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70 rtl:tracking-normal">{it.category}</p>
                  <h3 className="display mt-2 text-2xl lg:text-3xl">{it.title}</h3>
                  <p className="mt-1 translate-y-2 text-sm text-white/75 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 max-lg:translate-y-0 max-lg:opacity-100">{it.meta}</p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {current && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-[150] grid place-items-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && close()}
          data-lenis-prevent
        >
          <button ref={closeBtn} onClick={close} aria-label={closeLabel} className="absolute end-5 top-5 grid size-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
            <X className="size-6" />
          </button>
          <button onClick={() => step(-1)} aria-label={prevLabel} className="absolute start-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:start-6">
            <ChevronLeft className="flip-rtl size-6" />
          </button>
          <button onClick={() => step(1)} aria-label={nextLabel} className="absolute end-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:end-6">
            <ChevronRight className="flip-rtl size-6" />
          </button>

          <div className="w-full max-w-4xl text-center text-white">
            <div className="relative mx-auto aspect-[4/3] max-h-[68vh] w-full overflow-hidden ">
              <Image src={current.image} alt={current.title} fill sizes="(min-width:1024px) 56rem, 100vw" className="object-contain" priority />
            </div>
            <h3 className="mt-6 text-2xl font-bold">{current.title}</h3>
            <p className="mb-7 mt-1 text-white/65">{current.category} · {current.meta}</p>
            <Link href={ctaHref} className="inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 font-semibold text-ink transition-colors hover:bg-brand hover:text-white">
              {ctaLabel}<ArrowRight className="flip-rtl size-4" />
            </Link>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
