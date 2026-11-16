"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import clsx from "clsx";

type Item = { title: string; description: string; benefit: string; stat: string; image: string };

/** A typographic index: hover or focus a row and its photograph takes the stage. */
export function ServiceIndex({ items, cta, href }: { items: Item[]; cta: string; href: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
      <ul className="lg:col-span-7" onMouseLeave={() => undefined}>
        {items.map((it, i) => {
          const on = i === active;
          return (
            <li key={it.title} className="border-t border-[var(--line)] last:border-b">
              <button
                type="button"
                aria-expanded={on}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group flex w-full items-baseline gap-5 py-6 text-start lg:py-8"
              >
                <span className={clsx("num w-10 shrink-0 text-lg transition-colors duration-500", on ? "text-magenta" : "text-ink-soft")}>0{i + 1}</span>
                <span className={clsx("display flex-1 text-[clamp(1.7rem,3.3vw,3.2rem)] transition-all duration-500", on ? "translate-x-0" : "text-ink/55 group-hover:text-ink")}>
                  {it.title}
                </span>
                <Plus className={clsx("size-5 shrink-0 transition-transform duration-500", on && "rotate-45 text-magenta")} />
              </button>

              <div className={clsx("grid transition-[grid-template-rows] duration-700 ease-out", on ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                <div className="min-h-0 overflow-hidden">
                  <div className="grid gap-6 pb-10 ps-[3.75rem] pe-2 sm:grid-cols-[1fr_auto]">
                    <div>
                      <div className="relative mb-6 aspect-[16/10] overflow-hidden lg:hidden">
                        <Image src={it.image} alt="" fill sizes="100vw" className="object-cover" />
                      </div>
                      <p className="max-w-xl text-ink-soft">{it.description}</p>
                      <p className="mt-4 font-semibold">{it.benefit}</p>
                    </div>
                    <div className="flex flex-col items-start justify-between gap-5 sm:items-end">
                      <span className="text-sm font-semibold text-brand">{it.stat}</span>
                      <Link href={href} className="link-draw inline-flex items-center gap-1.5 text-sm font-semibold">
                        {cta}<ArrowUpRight className="flip-rtl size-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="relative hidden lg:col-span-5 lg:block">
        <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-ink">
          {items.map((it, i) => (
            <Image
              key={it.image}
              src={it.image}
              alt={i === active ? it.title : ""}
              fill
              sizes="40vw"
              className={clsx("object-cover transition-all duration-[900ms] ease-out", i === active ? "scale-100 opacity-100" : "scale-110 opacity-0")}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
          <span className="num absolute bottom-6 start-6 text-7xl text-white/90">0{active + 1}</span>
        </div>
      </div>
    </div>
  );
}
