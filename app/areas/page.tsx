import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { areas } from "@/content/areas";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Areas Covered",
  description: "Astungkare Spa serves villas, hotels and homes across South Bali — Canggu, Seminyak, Ubud, Jimbaran, Nusa Dua, Denpasar, Tabanan, Gianyar and greater Badung.",
  alternates: { canonical: "https://astungkarespa.com/areas" }
};

export default function AreasIndexPage() {
  return (
    <>
      <main>
        <section className="bg-ink text-cream on-dark pt-36 pb-20 relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 opacity-90" style={{
            background: "radial-gradient(60% 50% at 80% 95%, rgba(201,165,103,0.18), transparent 60%), linear-gradient(180deg, #1A1715, #14110f)"
          }} />
          <div className="container-edge relative">
            <p className="eyebrow text-gold mb-4">Where we serve</p>
            <h1 className="display text-5xl md:text-7xl max-w-3xl">
              All of <em>Bali.</em>
            </h1>
            <p className="text-cream/65 mt-6 max-w-xl text-lg leading-relaxed">
              Twelve therapists based across the south. Most arrivals between 0 and 45 minutes — we confirm the precise ETA on WhatsApp.
            </p>
          </div>
        </section>

        <section className="bg-cream py-20">
          <div className="container-edge grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {areas.map((a) => (
              <Link
                key={a.slug}
                href={`/areas/${a.slug}`}
                className={cn(
                  "group rounded-2xl p-6 md:p-7 flex flex-col justify-between min-h-[180px] transition-colors",
                  a.highlighted
                    ? "bg-ink text-cream hover:bg-emerald"
                    : "bg-[color:var(--color-cream-50)] text-ink border border-[color:var(--color-line)] hover:bg-sand"
                )}
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="font-serif text-2xl md:text-3xl font-light">{a.name}</h2>
                    <span className={cn("text-[11px] tracking-[0.18em] uppercase", a.highlighted ? "text-gold" : "text-ink/45")}>
                      {a.drive}
                    </span>
                  </div>
                  <p className={cn("text-sm mt-3 leading-relaxed", a.highlighted ? "text-cream/70" : "text-ink/60")}>
                    {a.blurb}
                  </p>
                </div>
                <span className={cn(
                  "mt-6 self-end inline-flex items-center gap-2 text-xs tracking-wide transition-transform group-hover:translate-x-1",
                  a.highlighted ? "text-gold" : "text-ink/70"
                )}>
                  See {a.name} <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>

          <div className="container-edge mt-12 text-center">
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
