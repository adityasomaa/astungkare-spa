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
import { orgSchema } from "@/lib/seo";
import { faqPageSchema } from "@/content/faqs";

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

      {/* Structured data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema()) }}
      />
    </>
  );
}
