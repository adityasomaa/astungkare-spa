export interface Review {
  name: string;
  origin: string;
  rating: number;
  body: string;
  treatment?: string;
}

export const reviews: Review[] = [
  {
    name: "Sophie L.",
    origin: "Sydney · Villa in Berawa",
    rating: 5,
    body: "Booked at 6pm for 8pm. Therapist arrived ten minutes early, set up beautifully, and gave us the best Balinese massage we've had in five trips to Bali.",
    treatment: "Balinese, 90 min × 2"
  },
  {
    name: "Marc & Elise",
    origin: "Paris · Seminyak",
    rating: 5,
    body: "Honestly the highlight of our honeymoon. Hot stones, candles, our terrace. We rebooked them three nights in a row.",
    treatment: "Hot Stone, 90 min × 2"
  },
  {
    name: "James K.",
    origin: "London · Ubud",
    rating: 5,
    body: "Deep tissue that actually goes deep. My surf shoulders thanked me the next morning. Communication on WhatsApp was instant.",
    treatment: "Deep Tissue, 90 min"
  },
  {
    name: "Ayu R.",
    origin: "Jakarta · Canggu",
    rating: 5,
    body: "Layanan rapi, profesional, dan datang tepat waktu. Saya book reflexology malam-malam dan dapat slot dalam 30 menit.",
    treatment: "Reflexology, 60 min"
  }
];
