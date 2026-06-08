"use client";

import { useEffect, useState } from "react";

/**
 * Branded lotus loader on first paint only.
 * Route-change transitions are handled by app/template.tsx (fade + slide),
 * so the new page animates in instead of being hidden behind a veil.
 */
export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 900);
    const t2 = setTimeout(() => setIntro(false), 1700);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  if (!intro && !visible) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-ink transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <svg width="72" height="72" viewBox="0 0 100 100" fill="none" className="loader-lotus">
          <g stroke="#C9A567" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path className="petal" d="M50 22 C 40 38, 40 60, 50 76 C 60 60, 60 38, 50 22 Z" />
            <path className="petal" d="M50 50 C 32 44, 17 54, 19 72 C 38 73, 47 64, 50 58 Z" />
            <path className="petal" d="M50 50 C 68 44, 83 54, 81 72 C 62 73, 53 64, 50 58 Z" />
            <path className="petal" d="M50 50 C 28 35, 12 38, 8 58 C 28 64, 42 60, 50 54 Z" opacity="0.5" />
            <path className="petal" d="M50 50 C 72 35, 88 38, 92 58 C 72 64, 58 60, 50 54 Z" opacity="0.5" />
          </g>
        </svg>
        <span className="text-cream/60 text-[10px] tracking-[0.5em] uppercase loader-word">Astungkare</span>
      </div>

      <style>{`
        .loader-lotus { animation: loader-breathe 1.6s ease-in-out infinite; }
        .loader-lotus .petal {
          stroke-dasharray: 120;
          stroke-dashoffset: 120;
          animation: loader-draw 1.4s ease forwards;
        }
        .loader-lotus .petal:nth-child(2) { animation-delay: .1s; }
        .loader-lotus .petal:nth-child(3) { animation-delay: .2s; }
        .loader-lotus .petal:nth-child(4) { animation-delay: .3s; }
        .loader-lotus .petal:nth-child(5) { animation-delay: .4s; }
        .loader-word { animation: loader-fade 1.2s ease .3s both; }
        @keyframes loader-draw { to { stroke-dashoffset: 0; } }
        @keyframes loader-breathe {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @keyframes loader-fade { from { opacity: 0; letter-spacing: .3em; } to { opacity: 1; letter-spacing: .5em; } }
        @media (prefers-reduced-motion: reduce) {
          .loader-lotus, .loader-lotus .petal, .loader-word { animation: none; }
          .loader-lotus .petal { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
