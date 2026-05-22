"use client";

import { useRef, useState, useId } from "react";
import { useGSAP } from "@gsap/react";
import { ensureGsap, gsap } from "@/lib/motion";
import { Reveal } from "@/components/motion/Reveal";

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

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
            <a
              href="https://wa.me/6289528800011"
              className="underline underline-offset-4 decoration-gold/60 hover:text-emerald transition-colors"
            >
              Message us on WhatsApp
            </a>
            .
          </p>
        </div>

        <ul className="divide-y divide-[color:var(--color-line)]">
          {faqs.map((f, i) => (
            <AccordionItem
              key={f.q}
              question={f.q}
              answer={f.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

interface AccordionItemProps {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}

function AccordionItem({ question, answer, open, onToggle }: AccordionItemProps) {
  const id = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<SVGSVGElement | null>(null);

  useGSAP(
    () => {
      ensureGsap();
      if (!panelRef.current || !innerRef.current) return;

      if (open) {
        const h = innerRef.current.offsetHeight;
        gsap.fromTo(
          panelRef.current,
          { height: 0, opacity: 0 },
          { height: h, opacity: 1, duration: 0.45, ease: "power2.out" }
        );
        gsap.fromTo(
          innerRef.current.children,
          { y: 8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.1, stagger: 0.05 }
        );
        if (iconRef.current) {
          gsap.to(iconRef.current, { rotation: 45, duration: 0.35, ease: "back.out(1.6)" });
        }
      } else {
        gsap.to(panelRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.32,
          ease: "power2.in"
        });
        if (iconRef.current) {
          gsap.to(iconRef.current, { rotation: 0, duration: 0.32, ease: "power2.out" });
        }
      }
    },
    { dependencies: [open] }
  );

  return (
    <li className="py-5">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`faq-panel-${id}`}
        onClick={onToggle}
        className="w-full flex items-start gap-4 text-left text-ink group"
      >
        <span className="font-serif text-xl md:text-2xl font-light leading-snug flex-1 group-hover:text-emerald transition-colors">
          {question}
        </span>
        <svg
          ref={iconRef}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className="text-gold mt-2 shrink-0"
        >
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      <div
        ref={panelRef}
        id={`faq-panel-${id}`}
        role="region"
        style={{ height: open ? "auto" : 0, overflow: "hidden", opacity: open ? 1 : 0 }}
      >
        <div ref={innerRef} className="pt-3 pr-8 pb-1">
          <p className="text-ink/65 leading-relaxed text-[15px]">{answer}</p>
        </div>
      </div>
    </li>
  );
}
