import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyWa } from "@/components/StickyWa";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `The story behind ${site.name}, a Bali mobile spa founded by ${site.founder}.`
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-cream pt-40 pb-16">
          <div className="container-edge max-w-4xl">
            <p className="eyebrow mb-4">About</p>
            <h1 className="display text-5xl md:text-7xl">
              A quiet hour,<br />
              <em>brought to you.</em>
            </h1>
          </div>
        </section>

        <section className="bg-cream pb-24">
          <div className="container-edge grid lg:grid-cols-[1fr_1.3fr] gap-16 max-w-6xl">
            <div className="lg:sticky lg:top-32 h-fit">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden" style={{
                background: "linear-gradient(135deg, #c9a567 0%, #8a7146 70%)"
              }}>
                <div className="w-full h-full flex items-end p-6">
                  <p className="text-cream/80 text-xs tracking-[0.22em] uppercase">Galuh Parwati · Founder</p>
                </div>
              </div>
            </div>

            <div className="space-y-8 font-serif font-light text-xl text-ink/85 leading-relaxed">
              <p>
                <span className="float-left text-7xl leading-none mr-3 font-serif font-light text-gold-deep mt-1">G</span>
                aluh Parwati grew up watching her mother and aunties trade the small currency of touch — a shoulder pressed, a foot held — at the end of long days in the rice fields. Massage in Bali isn&rsquo;t a luxury. It&rsquo;s a daily, quiet kindness.
              </p>
              <p>
                Astungkare Spa was founded on a simple idea: take that kindness, train it to the standard of the finest hotel spa, and bring it to the rooms where guests already feel most at home. A villa terrace. A hotel suite. A balcony overlooking rice.
              </p>
              <p>
                Twelve trained therapists. One phone call. Every hour of every day.
              </p>
              <p>
                Today, a team of trained therapists serves Canggu, Seminyak, Ubud and across the south — at every hour of every day. Every therapist is vetted, trained personally by Galuh, and held to a strictly therapeutic standard.
              </p>
              <p>
                <em>Astungkara</em>, in Balinese, is the word said in hope that something good unfolds. The word said over offerings at dawn and over rituals at dusk. We chose it because it is, quietly, what we wish for every guest:
              </p>
              <p className="text-2xl text-emerald not-italic" style={{ fontStyle: "italic" }}>
                — that this is the hour your trip turns.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyWa />
    </>
  );
}
