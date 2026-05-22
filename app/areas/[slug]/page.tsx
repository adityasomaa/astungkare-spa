import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyWa } from "@/components/StickyWa";
import { areas, getArea } from "@/content/areas";
import { services } from "@/content/services";
import { AreaArt } from "@/components/graphics/AreaArt";
import { priceWithUsd } from "@/lib/pricing";
import { buildWaUrl } from "@/lib/whatsapp";

export async function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArea(slug);
  if (!a) return {};
  return {
    title: `Mobile spa in ${a.name}, Bali`,
    description: `Premium villa spa service in ${a.name}. Trained therapists, oils and linen brought to your door. ${a.drive} typical arrival.`
  };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const featured = services.filter((s) => s.featured);

  return (
    <>
      <Header />
      <main>
        <section className="bg-ink text-cream on-dark pt-36 pb-24 relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 opacity-90" style={{
            background: "radial-gradient(60% 50% at 80% 95%, rgba(201,165,103,0.18), transparent 60%), linear-gradient(180deg, #1A1715, #14110f)"
          }}/>
          <div className="container-edge relative grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
           <div>
            <Link href="/#areas" className="text-xs tracking-[0.22em] uppercase text-cream/45 hover:text-gold transition mb-6 inline-block">
              ← All areas
            </Link>
            <p className="eyebrow text-gold mb-4">Bali · {area.drive} typical arrival</p>
            <h1 className="display text-5xl md:text-7xl">
              Spa in <em>{area.name}.</em>
            </h1>
            <p className="mt-6 text-xl text-cream/70 max-w-2xl font-serif font-light italic leading-snug">
              {area.blurb}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={buildWaUrl({ location: area.name, therapy: "Balinese Massage", duration: "90 min" })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-gold text-ink px-7 py-3.5 text-sm font-medium hover:bg-[#D6B57A] transition"
              >
                Book in {area.name} via WhatsApp <span aria-hidden>→</span>
              </a>
              <Link href="/services" className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-6 py-3.5 text-sm hover:bg-cream/5 transition">
                See all treatments
              </Link>
            </div>
           </div>
           <div className="hidden lg:block aspect-[5/3] rounded-2xl overflow-hidden border border-cream/10 bg-emerald-deep">
             <AreaArt tone="warm" />
           </div>
          </div>
        </section>

        <section className="bg-cream py-24">
          <div className="container-edge">
            <header className="mb-12">
              <p className="eyebrow mb-4">Most-booked in {area.name}</p>
              <h2 className="display text-4xl">Three popular rituals.</h2>
            </header>

            <div className="grid md:grid-cols-3 gap-3">
              {featured.map((s, i) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className={
                    i === 0
                      ? "rounded-2xl p-7 bg-emerald text-cream min-h-[220px] flex flex-col justify-between"
                      : "rounded-2xl p-7 bg-[color:var(--color-cream-50)] border border-[color:var(--color-line)] min-h-[220px] flex flex-col justify-between hover:bg-sand transition"
                  }
                >
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl font-light">{s.name}</h3>
                    <p className={i === 0 ? "text-cream/65 text-sm mt-2" : "text-ink/55 text-sm mt-2"}>{s.short}</p>
                  </div>
                  <p className={i === 0 ? "text-cream/85 text-xs mt-6 tabular-nums" : "text-ink/65 text-xs mt-6 tabular-nums"}>
                    from {priceWithUsd(s.durations[0].priceIdr).idr}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-cream pb-24">
          <div className="container-edge">
            <header className="mb-10 max-w-2xl">
              <p className="eyebrow mb-4">Other areas we serve</p>
              <h2 className="display text-3xl">Across the south, across the day.</h2>
            </header>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {areas
                .filter((a) => a.slug !== area.slug)
                .map((a) => (
                  <Link
                    key={a.slug}
                    href={`/areas/${a.slug}`}
                    className="flex items-baseline justify-between rounded-xl px-4 py-3 bg-[color:var(--color-cream-50)] border border-[color:var(--color-line)] hover:bg-sand transition"
                  >
                    <span className="font-serif text-lg text-ink">{a.name}</span>
                    <span className="text-[10px] tracking-[0.18em] uppercase text-ink/45">{a.drive}</span>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyWa />
    </>
  );
}
