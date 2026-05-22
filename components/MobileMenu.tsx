"use client";

import { useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Logo } from "@/components/Logo";
import { quickWaUrl } from "@/lib/whatsapp";
import { site } from "@/lib/site";

const nav = [
  { href: "/#services", label: "Treatments", hint: "20 rituals" },
  { href: "/#areas", label: "Areas", hint: "Across Bali" },
  { href: "/services", label: "Full menu", hint: "All treatments" },
  { href: "/about", label: "About", hint: "Our story" },
  { href: "/policies", label: "Policies", hint: "Terms & conduct" }
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="md:hidden inline-flex flex-col gap-[5px] p-3 -mr-3 group"
        >
          <span className="block w-6 h-[1.5px] bg-cream transition-transform group-hover:w-7" />
          <span className="block w-5 h-[1.5px] bg-cream/85 transition-transform group-hover:w-7" />
          <span className="block w-6 h-[1.5px] bg-cream transition-transform group-hover:w-7" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <Dialog.Content
          className="fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-sm bg-ink text-cream shadow-2xl shadow-black/50 flex flex-col data-[state=open]:animate-slide-in-right focus:outline-none"
        >
          <Dialog.Title className="sr-only">Astungkare Spa menu</Dialog.Title>
          <Dialog.Description className="sr-only">
            Navigate to treatments, areas, about, policies, or contact via WhatsApp.
          </Dialog.Description>

          <div className="flex items-center justify-between px-6 py-5 border-b border-cream/10">
            <Logo variant="horizontal" size={32} color="cream" />
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="p-2 -mr-2 text-cream/70 hover:text-cream transition"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </Dialog.Close>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-10 flex flex-col gap-1">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline justify-between py-4 border-b border-cream/8 hover:bg-cream/5 -mx-3 px-3 rounded-lg transition"
                style={{
                  animation: `mobile-slide-row 0.4s cubic-bezier(.2,.65,.3,1) ${0.08 + i * 0.05}s both`
                }}
              >
                <span className="font-serif text-2xl font-light group-hover:text-gold transition-colors">
                  {item.label}
                </span>
                <span className="text-[10px] tracking-[0.22em] uppercase text-cream/40 group-hover:text-gold/70 transition-colors">
                  {item.hint}
                </span>
              </Link>
            ))}
          </nav>

          <div className="px-6 pb-8 pt-4 border-t border-cream/10 space-y-3">
            <a
              href={quickWaUrl("Hi Astungkare Spa — I'd like to book a treatment.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-gold text-ink px-6 py-3.5 text-sm font-medium hover:bg-[#D6B57A] transition"
            >
              Book via WhatsApp <span aria-hidden>→</span>
            </a>
            <p className="text-center text-[11px] tracking-[0.22em] uppercase text-cream/40">
              {site.whatsappDisplay} · Open 24/7
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
