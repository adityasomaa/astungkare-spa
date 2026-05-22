"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";
import { quickWaUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/#services", label: "Treatments" },
  { href: "/#areas", label: "Areas" },
  { href: "/services", label: "Menu" },
  { href: "/about", label: "About" }
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

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

        <nav className="hidden md:flex items-center gap-9 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-cream/75 hover:text-cream transition-colors tracking-wide group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={quickWaUrl("Hi Astungkare Spa — I'd like to ask about a treatment.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gold text-ink px-5 py-2.5 text-sm font-medium hover:bg-[#D6B57A] hover:scale-[1.02] transition"
          >
            Book via WhatsApp
            <span aria-hidden>→</span>
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
