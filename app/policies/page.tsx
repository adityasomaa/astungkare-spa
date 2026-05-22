import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyWa } from "@/components/StickyWa";

export const metadata: Metadata = {
  title: "Policies",
  description: "Cancellation, conduct, and operating policies for Astungkare Spa."
};

const sections = [
  {
    title: "Booking & Confirmation",
    body: [
      "All bookings are confirmed via WhatsApp. Once you submit the form, a therapist coordinator replies — typically within five minutes — with the precise ETA and the therapist's name.",
      "No deposit is required. You pay the therapist directly after the treatment, in IDR cash, QRIS, or local bank transfer."
    ]
  },
  {
    title: "Cancellation",
    body: [
      "Cancel free of charge up to one hour before the scheduled arrival.",
      "Late cancellations — within one hour of arrival, or if the therapist is already en route — incur a flat fee of IDR 50,000.",
      "No-shows are charged the equivalent of one 60-minute Balinese massage (IDR 250,000)."
    ]
  },
  {
    title: "Professional Conduct",
    body: [
      "Astungkare Spa provides strictly therapeutic treatments. Our therapists are trained professionals, and our service is bound by the standards of a hotel spa.",
      "Any request that compromises that standard — sexual, inappropriate, discriminatory, or otherwise outside the therapeutic scope — is refused. In such cases the therapist may leave immediately. A IDR 50,000 fee applies and the booking is not refunded."
    ]
  },
  {
    title: "What We Bring",
    body: [
      "Foldable massage bed, fresh linen, premium organic oils, soft music. We arrive discreetly and set up in a quiet room of your choosing.",
      "You only need a power outlet and a small amount of space. We handle everything else."
    ]
  },
  {
    title: "Privacy",
    body: [
      "We collect only the information needed to deliver your booking — your name, phone number, and address. We never share, sell, or pass this on to third parties. Booking history is retained for one year for service quality, then deleted."
    ]
  }
];

export default function PoliciesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-cream pt-40 pb-12">
          <div className="container-edge max-w-3xl">
            <p className="eyebrow mb-4">Policies</p>
            <h1 className="display text-5xl md:text-6xl">The short version.</h1>
            <p className="mt-6 text-ink/65 text-lg leading-relaxed">
              Clear terms, fairly enforced. Nothing hidden.
            </p>
          </div>
        </section>

        <section className="bg-cream pb-24">
          <div className="container-edge max-w-3xl space-y-12">
            {sections.map((s) => (
              <article key={s.title}>
                <h2 className="font-serif text-3xl font-light text-ink border-b border-[color:var(--color-line)] pb-3 mb-5">
                  {s.title}
                </h2>
                <div className="space-y-4 text-ink/75 leading-relaxed">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <StickyWa />
    </>
  );
}
