export const site = {
  name: "Astungkare Spa",
  shortName: "Astungkare",
  tagline: "Wellness Brought to You",
  description:
    "A premium mobile spa serving villas, hotels and homes across Bali. Trained therapists arrive with oils and linen, 24 hours a day.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://astungkarespa.com",
  whatsapp: process.env.NEXT_PUBLIC_WA_NUMBER ?? "6289528800011",
  whatsappDisplay: "+62 895-2880-0011",
  email: "hello@astungkarespa.com",
  address: {
    street: "Jl. Raya Padonan No. 83",
    locality: "Tibubeneng",
    region: "Bali",
    postalCode: "80361",
    country: "ID"
  },
  hours: "24 hours · 7 days a week",
  founder: "Galuh Parwati",
  socials: {
    instagram: "https://www.instagram.com/astungkarespa/",
    facebook: "https://www.facebook.com/astungkarespa"
  },
  usdRate: Number(process.env.NEXT_PUBLIC_USD_RATE ?? 16200)
} as const;
