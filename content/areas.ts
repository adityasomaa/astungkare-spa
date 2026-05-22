export interface Area {
  slug: string;
  name: string;
  blurb: string;
  drive: string;
  surcharge?: string;
  highlighted?: boolean;
}

export const areas: Area[] = [
  {
    slug: "canggu",
    name: "Canggu",
    blurb: "Our home base. Therapists already in the area — fastest arrival.",
    drive: "0–15 min",
    highlighted: true
  },
  {
    slug: "seminyak",
    name: "Seminyak",
    blurb: "Beach-club afternoons benefit from an evening Balinese ritual.",
    drive: "15–30 min",
    highlighted: true
  },
  {
    slug: "jimbaran",
    name: "Jimbaran",
    blurb: "After sunset seafood, a 90-min hot stone in your villa.",
    drive: "45–60 min"
  },
  {
    slug: "nusa-dua",
    name: "Nusa Dua",
    blurb: "Resort guests welcome. Discreet and seamless in-room service.",
    drive: "60 min"
  },
  {
    slug: "ubud",
    name: "Ubud",
    blurb: "Rice-field villas, mountain quiet, deep-tissue evenings.",
    drive: "60–75 min",
    highlighted: true
  },
  {
    slug: "denpasar",
    name: "Denpasar",
    blurb: "Long-stay residents and business travellers.",
    drive: "30–45 min"
  },
  {
    slug: "tabanan",
    name: "Tabanan",
    blurb: "West-coast retreats and quiet rice-field villas.",
    drive: "45–60 min"
  },
  {
    slug: "gianyar",
    name: "Gianyar",
    blurb: "Including Sukawati and the surrounding cultural belt.",
    drive: "45–60 min"
  },
  {
    slug: "badung",
    name: "Badung",
    blurb: "Greater Badung — Kerobokan, Umalas, Berawa, Pererenan.",
    drive: "0–20 min",
    highlighted: true
  }
];

export function getArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}
