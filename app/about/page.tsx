import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is a premium mobile spa serving villas, hotels and homes across Bali, 24 hours a day.`
};

const pillars = [
  {
    title: "Trained & vetted",
    body: "Every therapist is professionally trained and held to the standard of a fine hotel spa. Strictly therapeutic, always."
  },
  {
    title: "We bring everything",
    body: "Foldable bed, fresh linen, premium organic oils, soft music. You only need a quiet room and a power outlet."
  },
  {
    title: "Open 24 hours",
    body: "A 3am treatment after a long flight, an 11pm hot stone after dinner. Every hour of every day, all across Bali."
  }
];

export default function AboutPage() {
  return (
    <>
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

        <section className="bg-cream pb-20">
          <div className="container-edge max-w-3xl space-y-8 font-serif font-light text-xl text-ink/85 leading-relaxed">
            <p>
              Astungkare Spa is a premium mobile spa. Instead of asking guests to travel, we bring the
              treatment to them, to villa terraces, hotel suites, and balconies overlooking the rice fields.
            </p>
            <p>
              Massage in Bali isn&rsquo;t a luxury. It&rsquo;s a daily, quiet kindness, passed down through
              generations. We took that tradition, trained it to the standard of the finest hotel spa, and made
              it available wherever you already feel most at home.
            </p>
            <p>
              A team of trained therapists serves Canggu, Seminyak, Ubud and across the south, at every hour of
              every day. Every therapist is vetted and held to a strictly therapeutic standard.
            </p>
            <p>
              <em>Astungkara</em>, in Balinese, is the word said in hope that something good unfolds, spoken over
              offerings at dawn and over rituals at dusk. It is, quietly, what we wish for every guest.
            </p>
          </div>
        </section>

        <section className="bg-cream pb-24">
          <div className="container-edge max-w-5xl grid md:grid-cols-3 gap-3">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-2xl p-7 bg-[color:var(--color-cream-50)] border border-[color:var(--color-line)]">
                <h2 className="font-serif text-2xl font-light text-ink">{p.title}</h2>
                <p className="text-sm text-ink/60 mt-3 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>

          <div className="container-edge max-w-5xl mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-ink text-cream px-7 py-4 text-sm font-medium hover:bg-emerald transition"
            >
              Book your treatment <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
