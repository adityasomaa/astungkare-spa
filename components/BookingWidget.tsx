import { Suspense } from "react";
import { BookingFlowForm } from "@/components/BookingFlowForm";

export function BookingWidget() {
  return (
    <section id="book" className="bg-emerald-deep on-dark text-cream py-24 md:py-32">
      <div className="container-edge grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
        <div>
          <p className="eyebrow text-gold mb-4">03 · Booking</p>
          <h2 className="display text-4xl md:text-5xl text-cream mb-6">
            One short form,<br />
            <em>one WhatsApp.</em>
          </h2>
          <p className="text-cream/70 max-w-md leading-relaxed">
            Pick a treatment, when, and where. We build the message for you. You hit send, the therapist confirms within five minutes.
          </p>

          <ul className="mt-10 space-y-4 text-sm text-cream/65">
            <li className="flex gap-3"><span className="text-gold">✦</span> No deposit, no upfront payment</li>
            <li className="flex gap-3"><span className="text-gold">✦</span> Pay therapist directly · cash or QRIS</li>
            <li className="flex gap-3"><span className="text-gold">✦</span> Cancel up to 1 hour before · IDR 50K otherwise</li>
          </ul>
        </div>

        <Suspense fallback={<div className="bg-cream/[0.04] border border-cream/10 rounded-2xl p-8 min-h-[400px]" />}>
          <BookingFlowForm variant="inline" />
        </Suspense>
      </div>
    </section>
  );
}
