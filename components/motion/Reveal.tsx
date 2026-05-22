"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { ensureGsap, gsap } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  /** index in stagger group */
  delay?: number;
  /** how far it travels up (px) */
  distance?: number;
  /** target element selector inside the wrapper for stagger lists */
  stagger?: string;
  /** wrapper element */
  as?: "div" | "section" | "header" | "article" | "ul" | "li";
  className?: string;
}

/** Fades + slides up on scroll, ScrollTrigger-driven. SSR-safe. */
export function Reveal({
  children,
  delay = 0,
  distance = 28,
  stagger,
  as: Tag = "div",
  className
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      ensureGsap();
      const el = ref.current!;
      const targets = stagger ? el.querySelectorAll(stagger) : [el];
      gsap.from(targets, {
        y: distance,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay,
        stagger: stagger ? 0.08 : 0,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true
        }
      });
    },
    { scope: ref }
  );

  return (
    // @ts-expect-error — dynamic tag with ref
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
