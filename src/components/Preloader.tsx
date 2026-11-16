"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

/** Brand intro: logo + progress line, then a curtain lifts. Plays once per browser session. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const finish = () => {
      html.classList.add("seen");
      (window as { __evReady?: boolean }).__evReady = true;
      try { sessionStorage.setItem("ev-seen", "1"); } catch {}
      window.dispatchEvent(new Event("ev:ready"));
      setDone(true);
    };

    let seen = false;
    try { seen = sessionStorage.getItem("ev-seen") === "1"; } catch {}
    if (seen || document.visibilityState !== "visible" || html.classList.contains("seen") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    // Failsafe: never keep the page behind the curtain if animation frames stall.
    const failsafe = window.setTimeout(finish, 6000);
    const tl = gsap.timeline({ onComplete: () => { window.clearTimeout(failsafe); finish(); } });
    tl.fromTo(".pre-logo", { opacity: 0, y: 24, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" })
      .fromTo(".pre-bar", { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power2.inOut" }, "-=0.4")
      .to(".pre-content", { opacity: 0, y: -16, duration: 0.4, ease: "power2.in" })
      .to(root.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "-=0.1");
    // Notify the page a bit before the curtain finishes so the hero starts as it lifts.
    tl.call(() => window.dispatchEvent(new Event("ev:ready")), undefined, "-=0.5");
    return () => { window.clearTimeout(failsafe); tl.kill(); };
  }, []);

  if (done) return null;
  return (
    <div ref={root} className="preloader place-items-center bg-paper" aria-hidden="true">
      <div className="pre-content flex flex-col items-center gap-8">
        <Image src="/img/logo.png" alt="" width={142} height={94} priority className="pre-logo h-24 w-auto" />
        <div className="h-[3px] w-48 overflow-hidden rounded-full bg-black/10">
          <div className="pre-bar h-full origin-left bg-brand rtl:origin-right" />
        </div>
      </div>
    </div>
  );
}
