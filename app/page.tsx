import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { ServicesSection } from "@/components/ServicesSection";
import { BookingWidget } from "@/components/BookingWidget";
import { AreasGrid } from "@/components/AreasGrid";
import { Reviews } from "@/components/Reviews";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { StickyWa } from "@/components/StickyWa";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <ServicesSection />
        <BookingWidget />
        <AreasGrid />
        <Reviews />
        <Faq />
      </main>
      <Footer />
      <StickyWa />

      {/* LocalBusiness schema for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DaySpa",
            name: site.name,
            description: site.description,
            url: site.url,
            telephone: "+62 895 2880 0011",
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
            sameAs: [site.socials.instagram, site.socials.facebook]
          })
        }}
      />
    </>
  );
}
