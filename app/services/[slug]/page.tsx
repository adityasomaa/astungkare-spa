import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyWa } from "@/components/StickyWa";
import { services, getService } from "@/content/services";
import { priceWithUsd } from "@/lib/pricing";
import { buildWaUrl } from "@/lib/whatsapp";
import { breadcrumbSchema } from "@/lib/seo";

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: `${s.name} in Bali — at your villa`,
    description: `${s.short}. ${s.description.slice(0, 150)}`
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = services
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main>
        <section className="bg-ink text-cream on-dark pt-36 pb-24 relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 opacity-90" style={{
            background: "radial-gradient(60% 50% at 80% 95%, rgba(201,165,103,0.18), transparent 60%), linear-gradient(180deg, #1A1715, #14110f)"
          }}/>
          <div className="container-edge relative grid lg:grid-cols-[1.3fr_1fr] gap-14 items-end">
            <div>
              <Link href="/services" className="text-xs tracking-[0.22em] uppercase text-cream/45 hover:text-gold transition mb-6 inline-block">
                ← All treatments
              </Link>
              <p className="eyebrow text-gold mb-4">{service.category} · Mobile</p>
              <h1 className="display text-5xl md:text-7xl">{service.name}</h1>
              <p className="mt-5 text-xl text-cream/70 font-serif font-light italic">{service.short}</p>
            </div>
            <ul className="space-y-2 text-sm text-cream/80">
              {service.durations.map((d) => {
                const p = priceWithUsd(d.priceIdr);
                return (
                  <li key={d.minutes} className="flex items-baseline justify-between border-b border-cream/10 py-3">
                    <span className="font-serif text-2xl font-light">{d.minutes} <span className="text-sm tracking-wider opacity-60">min</span></span>
                    <span className="text-right">
                      <span className="block font-medium tabular-nums">{p.idr}</span>
                      <span className="block text-[11px] text-cream/45 tabular-nums">{p.usd}</span>
                    </span>
                  </li>
                );
              })}
              <li className="pt-2">
                <a
                  href={buildWaUrl({
                    therapy: service.name,
                    duration: `${service.durations[0].minutes} min`,
                    totalIdr: service.durations[0].priceIdr
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--color-wa)] text-[#0a0a0a] font-semibold px-5 py-3.5 hover:brightness-105 transition"
                >
                  <span aria-hidden>✦</span> Book {service.name} via WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-cream py-24">
          <div className="container-edge grid lg:grid-cols-[1.2fr_1fr] gap-16">
            <div>
              <p className="eyebrow mb-4">The treatment</p>
              <p className="font-serif text-2xl md:text-3xl text-ink leading-relaxed font-light">
                {service.description}
              </p>
            </div>
            <div>
              <p className="eyebrow mb-4">What it does</p>
              <ul className="space-y-3 mt-2">
                {service.benefits.map((b) => (
                  <li key={b} className="flex gap-3 text-ink/75">
                    <span className="text-gold mt-1">✦</span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 p-6 bg-[color:var(--color-cream-50)] border border-[color:var(--color-line)] rounded-2xl">
                <p className="eyebrow mb-3">Includes</p>
                <ul className="text-sm text-ink/70 space-y-1.5">
                  <li>· Trained, vetted therapist</li>
                  <li>· Foldable massage bed & fresh linen</li>
                  <li>· Premium organic massage oils</li>
                  <li>· Soft music & calm setup</li>
                  <li>· Discreet, professional arrival</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="bg-cream pb-24 border-t border-[color:var(--color-line)] pt-20">
            <div className="container-edge">
              <p className="eyebrow mb-8">Related treatments</p>
              <div className="grid md:grid-cols-3 gap-3">
                {related.map((r) => {
                  const p = priceWithUsd(r.durations[0].priceIdr);
                  return (
                    <Link
                      key={r.slug}
                      href={`/services/${r.slug}`}
                      className="rounded-2xl p-6 bg-[color:var(--color-cream-50)] border border-[color:var(--color-line)] hover:bg-sand transition-colors group"
                    >
                      <h3 className="font-serif text-2xl font-light text-ink">{r.name}</h3>
                      <p className="text-sm text-ink/55 mt-1.5">{r.short}</p>
                      <p className="text-xs text-ink/65 mt-5 tabular-nums">
                        from {p.idr} <span className="opacity-50">{p.usd}</span>
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: service.name,
              description: service.description,
              areaServed: "Bali",
              provider: { "@type": "DaySpa", name: "Astungkare Spa" },
              offers: service.durations.map((d) => ({
                "@type": "Offer",
                price: d.priceIdr,
                priceCurrency: "IDR",
                description: `${d.minutes} minutes`
              }))
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              breadcrumbSchema([
                { name: "Home", path: "/" },
                { name: "Treatments", path: "/services" },
                { name: service.name, path: `/services/${service.slug}` }
              ])
            )
          }}
        />
      </main>
      <Footer />
      <StickyWa />
    </>
  );
}
