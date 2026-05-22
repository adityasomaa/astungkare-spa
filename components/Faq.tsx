const faqs = [
  {
    q: "How quickly can a therapist arrive?",
    a: "From Canggu, Seminyak, Berawa and central Badung, usually within 30 minutes. Ubud, Jimbaran, and the far south, allow 45–75 minutes. We confirm the precise ETA on WhatsApp when you book."
  },
  {
    q: "Do I need to provide anything?",
    a: "Nothing at all. We bring the massage bed, fresh linen, oils, towels, and even soft music. You just need a quiet room with a power outlet."
  },
  {
    q: "How do I pay?",
    a: "No deposit is required. You pay the therapist directly after the treatment — cash (IDR), QRIS, or bank transfer. Tips are appreciated but never expected."
  },
  {
    q: "Is this a sensual service?",
    a: "No. Astungkare Spa is strictly therapeutic. Our therapists are trained, vetted professionals and have full authority to refuse and leave (with a 50K fee) if anything inappropriate is requested."
  },
  {
    q: "Can I book for 2 or more people?",
    a: "Yes — couples, families, and small groups are welcome. We bring one therapist per guest so everyone is treated at the same time."
  },
  {
    q: "How late can I book?",
    a: "We're open 24 hours, 7 days a week. A 3am Balinese after a long flight, an 11pm hot stone after dinner — all fine. WhatsApp is monitored around the clock."
  }
];

import { Reveal } from "@/components/motion/Reveal";

export function Faq() {
  return (
    <section className="bg-cream py-24 md:py-32 border-t border-[color:var(--color-line)]">
      <Reveal className="container-edge grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
        <div className="lg:sticky lg:top-24">
          <p className="eyebrow mb-4">06 · Common questions</p>
          <h2 className="display text-4xl md:text-5xl">
            Short answers,<br />
            <em>no fluff.</em>
          </h2>
          <p className="text-ink/60 mt-6 max-w-sm leading-relaxed text-sm">
            Anything else?{" "}
            <a href="https://wa.me/6289528800011" className="underline underline-offset-4 decoration-gold/60 hover:text-emerald transition-colors">
              Message us on WhatsApp
            </a>
            .
          </p>
        </div>

        <div className="divide-y divide-[color:var(--color-line)]">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="cursor-pointer list-none flex items-start gap-4 text-ink">
                <span className="font-serif text-xl md:text-2xl font-light leading-snug flex-1">{f.q}</span>
                <span className="text-gold mt-1.5 text-lg transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="mt-3 pr-8 text-ink/65 leading-relaxed text-[15px]">{f.a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
