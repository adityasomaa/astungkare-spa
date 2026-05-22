import type { Metadata } from "next";
import { site } from "@/lib/site";

interface PageSeo {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

export function pageMetadata({ title, description, path = "/", image = "/opengraph-image" }: PageSeo): Metadata {
  const url = `${site.url.replace(/\/$/, "")}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      images: [{ url: image, width: 1200, height: 630 }],
      locale: "en_US",
      type: "website"
    },
    twitter: { card: "summary_large_image", title, description, images: [image] }
  };
}

export const orgSchema = {
  "@context": "https://schema.org",
  "@type": "DaySpa",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: "+62 895 2880 0011",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59"
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "19"
  },
  sameAs: [site.socials.instagram, site.socials.facebook]
};
