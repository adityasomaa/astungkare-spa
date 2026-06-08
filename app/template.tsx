"use client";

import { useEffect, useRef } from "react";

/**
 * Re-mounts on every route change (Next.js template semantics).
 * - Resets scroll to the very top (Lenis-aware), fixing mid-page landings.
 * - Plays an entrance animation so new pages fade/slide in instead of popping.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    // belt and suspenders for browsers restoring scroll late
    const t = setTimeout(() => window.scrollTo(0, 0), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={ref} className="page-enter">
      {children}
      <style>{`
        .page-enter {
          animation: page-enter 0.6s cubic-bezier(.22,.61,.36,1) both;
        }
        @keyframes page-enter {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .page-enter { animation: none; }
        }
      `}</style>
    </div>
  );
}
