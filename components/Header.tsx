"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";
import { navItems, treatmentGroups } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-30 transition-all duration-300",
        scrolled
          ? "bg-ink/85 backdrop-blur-md border-b border-cream/5 py-3"
          : "bg-gradient-to-b from-ink/40 to-transparent py-5"
      )}
    >
      <div className="container-edge flex items-center justify-between gap-4">
        <Link href="/" aria-label="Astungkare Spa home" className="shrink-0">
          <Logo variant="horizontal" size={scrolled ? 30 : 34} color="cream" priority />
        </Link>

        <nav className="hidden lg:flex items-center gap-9 text-sm">
          {navItems.map((item) =>
            item.dropdown === "treatments" ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setTreatmentsOpen(true)}
                onMouseLeave={() => setTreatmentsOpen(false)}
              >
                <Link
                  href={item.href}
                  className="relative inline-flex items-center gap-1.5 text-cream/75 hover:text-cream transition-colors tracking-wide group py-2"
                >
                  {item.label}
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                    className={cn("text-gold/70 transition-transform duration-300", treatmentsOpen && "rotate-180")}
                  >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-[calc(100%-18px)]" />
                </Link>

                {/* Dropdown */}
                <div
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-all duration-200 origin-top",
                    treatmentsOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
                  )}
                >
                  <div className="w-[640px] rounded-2xl bg-emerald-deep border border-cream/12 shadow-2xl shadow-black/50 p-6">
                    <div className="columns-3 gap-6 [column-fill:balance]">
                      {treatmentGroups.map((g) => (
                        <div key={g.key} className="break-inside-avoid mb-5">
                          <p className="text-[10px] tracking-[0.24em] uppercase text-gold/80 mb-2.5">{g.label}</p>
                          <ul className="space-y-1.5">
                            {g.items.map((s) => (
                              <li key={s.slug}>
                                <Link
                                  href={`/services/${s.slug}`}
                                  className="block text-[13px] text-cream/75 hover:text-gold transition-colors"
                                >
                                  {s.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 mt-1 border-t border-cream/10">
                      <Link href="/services" className="inline-flex items-center gap-2 text-[13px] text-cream hover:text-gold transition-colors">
                        View all treatments <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-cream/75 hover:text-cream transition-colors tracking-wide group py-2"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gold text-ink px-5 py-2.5 text-sm font-medium hover:bg-[#D6B57A] hover:scale-[1.02] transition"
          >
            Book Now
            <span aria-hidden>→</span>
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
