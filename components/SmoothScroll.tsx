"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth scroll — DESKTOP ONLY.
 * On touch devices (phones, tablets) Lenis is skipped entirely so native
 * scrolling always works; in-page anchors fall back to native smooth scroll.
 * Disabled when prefers-reduced-motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    // In-page anchor handler shared by both paths
    function onClick(e: MouseEvent, lenis?: Lenis) {
      const target = (e.target as HTMLElement)?.closest('a[href*="#"]') as HTMLAnchorElement | null;
      if (!target) return;
      const url = new URL(target.href, window.location.href);
      if (url.pathname === window.location.pathname && url.hash) {
        const el = document.querySelector(url.hash);
        if (el) {
          e.preventDefault();
          if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -80 });
          else {
            const y = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }
      }
    }

    // Touch / reduced-motion: native scroll only, just wire smooth anchors.
    if (isTouch || reduceMotion) {
      const handler = (e: MouseEvent) => onClick(e);
      document.addEventListener("click", handler);
      return () => document.removeEventListener("click", handler);
    }

    // Desktop: Lenis smooth wheel
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const st = (window as unknown as { ScrollTrigger?: { update: () => void } }).ScrollTrigger;
    lenis.on("scroll", () => st?.update());

    const handler = (e: MouseEvent) => onClick(e, lenis);
    document.addEventListener("click", handler);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handler);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}
