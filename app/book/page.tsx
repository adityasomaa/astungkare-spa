import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyWa } from "@/components/StickyWa";
import { BookingFlowForm } from "@/components/BookingFlowForm";

export const metadata: Metadata = {
  title: "Book your treatment",
  description: "Pick a treatment, when and where. We build the message, you confirm in WhatsApp.",
  alternates: { canonical: "https://astungkarespa.com/book" }
};

export default function BookPage() {
  return (
    <>
      <Header />
      <main className="bg-emerald-deep on-dark text-cream min-h-screen">
        {/* atmospheric backdrop */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-90 pointer-events-none"
          style={{
            background:
              "radial-gradient(70% 60% at 78% 90%, rgba(201,165,103,0.18), transparent 60%), radial-gradient(40% 40% at 15% 10%, rgba(31,58,46,0.45), transparent 70%)"
          }}
        />

        <div className="relative container-edge pt-36 pb-24">
          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-20 items-start">
            <div>
              <Link
                href="/"
                className="inline-block text-xs tracking-[0.22em] uppercase text-cream/45 hover:text-gold transition mb-6"
              >
                ← Back home
              </Link>
              <p className="eyebrow text-gold mb-4">Book a treatment</p>
              <h1 className="display text-5xl md:text-7xl mb-6 text-cream">
                Tell us the details<br /><em>once.</em>
              </h1>
              <p className="text-cream/70 max-w-md leading-relaxed text-lg">
                Pick a treatment, when, and where. We build a complete WhatsApp message, you hit send.
                A therapist replies within five minutes.
              </p>

              <ul className="mt-10 space-y-4 text-sm text-cream/65 max-w-md">
                <li className="flex gap-3"><span className="text-gold mt-0.5">✦</span> <span><b className="text-cream font-medium">No deposit.</b> Pay therapist directly · cash, QRIS, or bank transfer.</span></li>
                <li className="flex gap-3"><span className="text-gold mt-0.5">✦</span> <span><b className="text-cream font-medium">Open 24 hours.</b> A 3am Balinese, an 11pm hot stone, all fine.</span></li>
                <li className="flex gap-3"><span className="text-gold mt-0.5">✦</span> <span><b className="text-cream font-medium">Cancel up to 1 hour before.</b> IDR 50K otherwise.</span></li>
                <li className="flex gap-3"><span className="text-gold mt-0.5">✦</span> <span><b className="text-cream font-medium">We bring everything.</b> Bed, linen, oils, soft music.</span></li>
              </ul>

              <div className="mt-10 pt-8 border-t border-cream/10">
                <p className="text-[10px] tracking-[0.28em] uppercase text-cream/45 mb-2">Need help choosing?</p>
                <p className="text-cream/70 text-sm">
                  Browse <Link href="/services" className="underline underline-offset-4 decoration-gold/60 hover:text-gold transition">all 20 treatments</Link> first, then come back and complete the form. We&rsquo;ll have everything we need to confirm fast.
                </p>
              </div>
            </div>

            <Suspense fallback={<div className="bg-cream/[0.04] border border-cream/10 rounded-2xl p-8 min-h-[500px]" />}>
              <BookingFlowForm variant="page" />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
      <StickyWa />
    </>
  );
}
