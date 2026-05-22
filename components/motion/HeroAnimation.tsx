"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { ensureGsap, gsap } from "@/lib/motion";

interface Props {
  children: ReactNode;
}

/** Orchestrated hero entrance — eyebrow → headline → sub → CTAs → meta → visual. */
export function HeroAnimation({ children }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      ensureGsap();
      const ctx = ref.current!;
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

      tl.from(ctx.querySelector("[data-h-eyebrow]"), { y: 14, opacity: 0, duration: 0.7 }, 0.15)
        .from(
          ctx.querySelectorAll("[data-h-line]"),
          { y: 36, opacity: 0, stagger: 0.08, duration: 1.05 },
          0.25
        )
        .from(ctx.querySelector("[data-h-sub]"), { y: 18, opacity: 0 }, 0.6)
        .from(ctx.querySelectorAll("[data-h-cta]"), { y: 14, opacity: 0, stagger: 0.06 }, 0.78)
        .from(ctx.querySelectorAll("[data-h-meta]"), { y: 8, opacity: 0, stagger: 0.05 }, 0.95)
        .from(
          ctx.querySelector("[data-h-visual]"),
          { y: 40, opacity: 0, scale: 0.96, duration: 1.2 },
          0.4
        )
        .from(
          ctx.querySelector("[data-h-chip]"),
          { y: -10, opacity: 0, duration: 0.6 },
          1.2
        )
        .from(
          ctx.querySelectorAll("[data-h-petal]"),
          { scale: 0.4, transformOrigin: "50% 60%", opacity: 0, stagger: 0.08, duration: 1.1, ease: "back.out(1.4)" },
          0.55
        );

      // gentle floating loop on the hero visual
      const visual = ctx.querySelector("[data-h-visual]");
      if (visual) {
        gsap.to(visual, {
          y: -10,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.8
        });
      }
    },
    { scope: ref }
  );

  return <div ref={ref}>{children}</div>;
}
