"use client";

import { useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Logo } from "@/components/Logo";
import { site } from "@/lib/site";
import { setPageScroll } from "@/lib/scroll-lock";
import { navItems, treatmentGroups } from "@/lib/nav";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        setPageScroll(!o);
      }}
    >
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="lg:hidden inline-flex flex-col gap-[5px] p-3 -mr-3 group"
        >
          <span className="block w-6 h-[1.5px] bg-cream transition-transform group-hover:w-7" />
          <span className="block w-5 h-[1.5px] bg-cream/85 transition-transform group-hover:w-7" />
          <span className="block w-6 h-[1.5px] bg-cream transition-transform group-hover:w-7" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <Dialog.Content className="fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-sm bg-ink text-cream shadow-2xl shadow-black/50 flex flex-col data-[state=open]:animate-slide-in-right focus:outline-none">
          <Dialog.Title className="sr-only">Astungkare Spa menu</Dialog.Title>
          <Dialog.Description className="sr-only">Browse treatments, areas, about, and contact.</Dialog.Description>

          <div className="flex items-center justify-between px-6 py-5">
            <Logo variant="horizontal" size={32} color="cream" />
            <Dialog.Close asChild>
              <button type="button" aria-label="Close menu" className="p-2 -mr-2 text-cream/70 hover:text-cream transition">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </Dialog.Close>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-1" data-lenis-prevent>
            {navItems.map((item, i) =>
              item.dropdown === "treatments" ? (
                <div
                  key={item.href}
                  style={{ animation: `mobile-slide-row 0.4s cubic-bezier(.2,.65,.3,1) ${0.06 + i * 0.05}s both` }}
                >
                  <button
                    type="button"
                    onClick={() => setTreatmentsOpen((v) => !v)}
                    aria-expanded={treatmentsOpen}
                    className="w-full flex items-center justify-between py-3.5 -mx-3 px-3 rounded-lg hover:bg-cream/5 transition group"
                  >
                    <span className="font-serif text-2xl font-light group-hover:text-gold transition-colors">{item.label}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                      className={`text-gold transition-transform duration-300 ${treatmentsOpen ? "rotate-180" : ""}`}
                    >
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {treatmentsOpen && (
                    <div className="pl-3 pb-2 animate-fade-up">
                      {treatmentGroups.map((g) => (
                        <div key={g.key} className="mb-3">
                          <p className="text-[10px] tracking-[0.24em] uppercase text-gold/70 mb-1.5">{g.label}</p>
                          <ul className="space-y-1">
                            {g.items.map((s) => (
                              <li key={s.slug}>
                                <Link
                                  href={`/services/${s.slug}`}
                                  onClick={close}
                                  className="block text-[15px] text-cream/70 hover:text-gold py-1 transition-colors"
                                >
                                  {s.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <Link href="/services" onClick={close} className="inline-flex items-center gap-2 text-[13px] text-cream hover:text-gold transition-colors mt-1">
                        View all treatments <span aria-hidden>→</span>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="py-3.5 -mx-3 px-3 rounded-lg hover:bg-cream/5 transition group"
                  style={{ animation: `mobile-slide-row 0.4s cubic-bezier(.2,.65,.3,1) ${0.06 + i * 0.05}s both` }}
                >
                  <span className="font-serif text-2xl font-light group-hover:text-gold transition-colors">{item.label}</span>
                </Link>
              )
            )}
          </nav>

          <div className="px-6 pb-8 pt-4 space-y-3">
            <Link
              href="/contact"
              onClick={close}
              className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-gold text-ink px-6 py-3.5 text-sm font-medium hover:bg-[#D6B57A] transition"
            >
              Book Now <span aria-hidden>→</span>
            </Link>
            <p className="text-center text-[11px] tracking-[0.22em] uppercase text-cream/40">
              {site.whatsappDisplay} · Open 24/7
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
