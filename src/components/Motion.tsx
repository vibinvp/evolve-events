"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isReady = () =>
  document.documentElement.classList.contains("seen") || (window as { __evReady?: boolean }).__evReady;

/** Global smooth scroll (Lenis) wired into GSAP ScrollTrigger. */
function useSmoothScroll() {
  useEffect(() => {
    if (reduced()) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}

/**
 * Scroll-driven animations declared with data attributes, so pages stay
 * server-rendered (full HTML for SEO) and only this one script is client-side.
 *   data-hero      fade/slide in once the preloader is done
 *   data-reveal    fade/slide in on scroll
 *   data-stagger   children fade/slide in one after another
 *   data-split     word-by-word headline (value "hero" waits for preloader)
 *   data-clip      image mask reveal
 *   data-parallax  inner image drifts slower than the page
 *   data-count     number counts up
 */
function useAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (reduced()) return;
    let cleanupReady: (() => void) | undefined;

    const ctx = gsap.context(() => {
      const q = <T extends HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel);
      const runHero = () => {
        q("[data-hero]").forEach((el, i) =>
          gsap.fromTo(el, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.35 + i * 0.1 }),
        );
        q('[data-split="hero"]').forEach((el) =>
          gsap.fromTo(el.querySelectorAll(".word-inner"), { yPercent: 115, y: 0 }, { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.06 }),
        );
        q("[data-clip='hero']").forEach((el) =>
          gsap.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut", delay: 0.2 }),
        );
      };
      if (isReady()) runHero();
      else {
        window.addEventListener("ev:ready", runHero, { once: true });
        cleanupReady = () => window.removeEventListener("ev:ready", runHero);
      }

      q("[data-reveal]").forEach((el) =>
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0, duration: 1, ease: "power3.out",
            delay: Number(el.dataset.delay ?? 0),
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        ),
      );

      q("[data-stagger]").forEach((el) =>
        gsap.fromTo(
          el.children,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          },
        ),
      );

      q('[data-split]:not([data-split="hero"])').forEach((el) =>
        gsap.fromTo(el.querySelectorAll(".word-inner"), { yPercent: 115, y: 0 }, {
          yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.05,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }),
      );

      q("[data-clip]:not([data-clip='hero'])").forEach((el) =>
        gsap.to(el, {
          clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }),
      );

      q("[data-parallax]").forEach((el) =>
        gsap.fromTo(
          el,
          { yPercent: -7 },
          { yPercent: 7, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } },
        ),
      );

      q("[data-highlight]").forEach((el) =>
        gsap.to(el.querySelectorAll(".hl-word"), {
          opacity: 1, ease: "none", stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
        }),
      );

      q("[data-rule]").forEach((el) =>
        gsap.to(el, { scaleX: 1, duration: 1.4, ease: "power3.inOut", scrollTrigger: { trigger: el, start: "top 92%", once: true } }),
      );

      q("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const suffix = el.dataset.suffix ?? "";
        const state = { v: 0 };
        el.textContent = `0${suffix}`;
        gsap.to(state, {
          v: end, duration: 1.8, ease: "power2.out",
          onUpdate: () => { el.textContent = `${Math.round(state.v)}${suffix}`; },
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
    });

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      window.clearTimeout(refresh);
      cleanupReady?.();
      ctx.revert();
    };
  }, [pathname]);
}

export function Motion() {
  useSmoothScroll();
  useAnimations();
  return null;
}
