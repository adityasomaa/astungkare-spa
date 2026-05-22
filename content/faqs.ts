export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
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

export function faqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };
}
