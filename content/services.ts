export interface Duration {
  minutes: number;
  priceIdr: number;
}

export interface Service {
  slug: string;
  name: string;
  short: string;
  category: "massage" | "face" | "scrub" | "nails" | "waxing";
  durations: Duration[];
  description: string;
  benefits: string[];
  featured?: boolean;
  mostBooked?: boolean;
}

export const services: Service[] = [
  {
    slug: "balinese-massage",
    name: "Balinese Massage",
    short: "The signature ritual",
    category: "massage",
    durations: [
      { minutes: 60, priceIdr: 250_000 },
      { minutes: 90, priceIdr: 400_000 },
      { minutes: 120, priceIdr: 500_000 }
    ],
    description:
      "A flowing combination of stretching, acupressure, palm pressure, and warm oil that has defined Bali wellness for generations. Calm, deep, restorative.",
    benefits: ["Releases full-body tension", "Improves circulation", "Quiets the nervous system"],
    featured: true,
    mostBooked: true
  },
  {
    slug: "hot-stone-massage",
    name: "Hot Stone Massage",
    short: "Heated basalt, deep release",
    category: "massage",
    durations: [
      { minutes: 60, priceIdr: 400_000 },
      { minutes: 90, priceIdr: 900_000 }
    ],
    description:
      "Smooth volcanic stones heated to a precise temperature glide along the back, shoulders, and legs, melting deeper layers of tension than hands alone can reach.",
    benefits: ["Deep muscular release", "Soothes joint stiffness", "Profound calm"],
    featured: true
  },
  {
    slug: "lymphatic-massage",
    name: "Lymphatic Drainage",
    short: "Gentle, sculpting, restorative",
    category: "massage",
    durations: [
      { minutes: 60, priceIdr: 400_000 },
      { minutes: 90, priceIdr: 600_000 }
    ],
    description:
      "Light rhythmic strokes that follow the body's lymph pathways — ideal after travel, late nights, or long flights. Reduces puffiness and supports recovery.",
    benefits: ["Reduces fluid retention", "Supports detoxification", "Visibly de-puffs"],
    featured: true
  },
  {
    slug: "deep-tissue-massage",
    name: "Deep Tissue",
    short: "For surfers and desk-bound shoulders",
    category: "massage",
    durations: [
      { minutes: 60, priceIdr: 350_000 },
      { minutes: 90, priceIdr: 500_000 }
    ],
    description:
      "Slow, sustained pressure into the deeper layers of muscle and fascia — targeted relief for surf shoulders, runner legs, and laptop necks.",
    benefits: ["Releases chronic knots", "Restores mobility", "Targets specific pain"]
  },
  {
    slug: "thai-massage",
    name: "Thai Massage",
    short: "Stretching meets pressure",
    category: "massage",
    durations: [
      { minutes: 60, priceIdr: 350_000 },
      { minutes: 90, priceIdr: 500_000 }
    ],
    description:
      "Performed clothed, on a mat. Assisted yoga-like stretches combined with thumb and palm pressure. Energising rather than sedating.",
    benefits: ["Improves flexibility", "Energises the body", "Releases hips & spine"]
  },
  {
    slug: "shiatsu-massage",
    name: "Shiatsu",
    short: "Japanese finger pressure",
    category: "massage",
    durations: [
      { minutes: 60, priceIdr: 350_000 },
      { minutes: 90, priceIdr: 500_000 }
    ],
    description:
      "Precise finger and palm pressure along meridian lines. Slow, methodical, and deeply balancing for the nervous system.",
    benefits: ["Balances energy", "Calms anxiety", "Improves sleep"]
  },
  {
    slug: "reflexology",
    name: "Reflexology",
    short: "Whole body, through the feet",
    category: "massage",
    durations: [{ minutes: 60, priceIdr: 250_000 }],
    description:
      "Targeted pressure to reflex points on the feet that map to the body's organs and systems. Best after a long day of walking or driving.",
    benefits: ["Reduces foot fatigue", "Improves circulation", "Profoundly calming"]
  },
  {
    slug: "back-massage",
    name: "Back Massage",
    short: "Focused 60-minute relief",
    category: "massage",
    durations: [{ minutes: 60, priceIdr: 250_000 }],
    description:
      "An hour focused entirely on the back, shoulders, and neck. Ideal if you only have a single, specific complaint to address.",
    benefits: ["Targets upper-body tension", "Quick reset", "Perfect lunchtime ritual"]
  },
  {
    slug: "hand-massage",
    name: "Hand Massage",
    short: "Underrated, deeply restorative",
    category: "massage",
    durations: [
      { minutes: 60, priceIdr: 350_000 },
      { minutes: 90, priceIdr: 500_000 }
    ],
    description:
      "An overlooked treatment that releases tension built up from typing, scrolling, and gripping. Beautifully calming.",
    benefits: ["Relieves wrist & forearm strain", "Soothes joint stiffness", "Deeply meditative"]
  },
  {
    slug: "massage-and-scrub",
    name: "Massage + Body Scrub",
    short: "Ritual of softness",
    category: "scrub",
    durations: [{ minutes: 90, priceIdr: 400_000 }],
    description:
      "A traditional Balinese body scrub followed by a calming massage. Leaves the skin remarkably soft and the body in deep rest.",
    benefits: ["Polishes the skin", "Improves texture", "Full body ritual"]
  },
  {
    slug: "foot-scrub",
    name: "Foot Scrub",
    short: "60 minutes of feet-first care",
    category: "scrub",
    durations: [{ minutes: 60, priceIdr: 250_000 }],
    description:
      "An exfoliating scrub, warm soak, and finishing massage focused entirely on the feet — ideal after long days of beach and exploration.",
    benefits: ["Softens skin", "Eases fatigue", "Wonderful before bed"]
  },
  {
    slug: "facial",
    name: "Facial",
    short: "A calm hour for the skin",
    category: "face",
    durations: [{ minutes: 60, priceIdr: 250_000 }],
    description:
      "A multi-step cleanse, exfoliation, mask, and serum facial using gentle, plant-based products suited to the Bali climate.",
    benefits: ["Hydrates", "Brightens", "Calms reactive skin"]
  },
  {
    slug: "totok-wajah",
    name: "Totok Wajah",
    short: "Traditional Javanese face acupressure",
    category: "face",
    durations: [{ minutes: 60, priceIdr: 150_000 }],
    description:
      "Precise pressure point work along the face that improves circulation, sculpts, and releases jaw tension. Often paired with a facial.",
    benefits: ["Sculpts naturally", "Releases jaw tension", "Boosts glow"]
  },
  {
    slug: "creambath",
    name: "Creambath",
    short: "The classic scalp ritual",
    category: "face",
    durations: [{ minutes: 60, priceIdr: 250_000 }],
    description:
      "A nourishing scalp and hair treatment with a warm cream mask, scalp massage, and steam. Profoundly relaxing — and excellent for hair health.",
    benefits: ["Nourishes scalp", "Relieves headaches", "Deeply calming"]
  },
  {
    slug: "manicure",
    name: "Manicure",
    short: "Spa-grade nail care",
    category: "nails",
    durations: [{ minutes: 60, priceIdr: 250_000 }],
    description: "Soak, file, cuticle work, hand massage, and polish. Done with proper sterilised tools in the comfort of your villa.",
    benefits: ["Pristine finish", "Sanitary tools", "Includes hand massage"]
  },
  {
    slug: "pedicure",
    name: "Pedicure",
    short: "Foot care with full ritual",
    category: "nails",
    durations: [{ minutes: 60, priceIdr: 250_000 }],
    description: "Warm soak, exfoliation, full cuticle and nail work, foot massage, and polish.",
    benefits: ["Smooths heels", "Sanitary tools", "Includes foot massage"]
  },
  {
    slug: "nail-gel",
    name: "Nail Gel",
    short: "Long-lasting colour",
    category: "nails",
    durations: [{ minutes: 60, priceIdr: 250_000 }],
    description: "A long-wear gel polish service. Add on to manicure or pedicure for a finish that lasts two to three weeks.",
    benefits: ["Two to three weeks of wear", "High shine", "Wide colour range"]
  },
  {
    slug: "waxing-arm",
    name: "Arm Waxing",
    short: "Smooth, professional",
    category: "waxing",
    durations: [{ minutes: 30, priceIdr: 200_000 }],
    description: "Professional warm-wax arm hair removal in the comfort of your villa.",
    benefits: ["Lasting smoothness", "Hygienic", "Done in-villa"]
  },
  {
    slug: "waxing-half-leg",
    name: "Half-Leg Waxing",
    short: "From knee down (or up)",
    category: "waxing",
    durations: [{ minutes: 30, priceIdr: 400_000 }],
    description: "Professional half-leg waxing — pick upper or lower.",
    benefits: ["Lasting smoothness", "Hygienic", "Done in-villa"]
  },
  {
    slug: "waxing-full-leg",
    name: "Full-Leg Waxing",
    short: "Knee to ankle, hip to knee",
    category: "waxing",
    durations: [{ minutes: 60, priceIdr: 800_000 }],
    description: "Professional full-leg waxing.",
    benefits: ["Lasting smoothness", "Hygienic", "Done in-villa"]
  }
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getFeaturedServices(): Service[] {
  return services.filter((s) => s.featured);
}

export function getServicesByCategory(category: Service["category"]): Service[] {
  return services.filter((s) => s.category === category);
}
