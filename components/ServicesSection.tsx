import Link from "next/link";
import { services } from "@/content/services";
import { priceWithUsd } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceArt } from "@/components/graphics/ServiceArt";

export function ServicesSection() {
  const featured = services.filter((s) => s.featured);
  const rest = services.filter((s) => !s.featured && s.category === "massage").slice(0, 4);
  const others = services.filter((s) => s.category !== "massage").slice(0, 4);

  return (
    <section id="services" className="bg-cream py-24 md:py-32">
      <div className="container-edge">
        <Reveal as="header" className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-20 items-end mb-14">
          <div>
            <p className="eyebrow mb-4">02 · Treatments</p>
            <h2 className="display text-4xl md:text-5xl">
              The full menu,<br />
              <em>at your door.</em>
            </h2>
          </div>
          <p className="text-ink/65 text-base md:text-lg leading-relaxed max-w-xl lg:justify-self-end">
            Twenty treatments, twelve trained therapists, one phone call. Prices in IDR with a USD reference — final amount confirmed on WhatsApp.
          </p>
        </Reveal>

        <Reveal stagger="[data-card]" className="grid md:grid-cols-3 gap-3 md:gap-4 mb-4">
          {featured.map((s, i) => (
            <Link
              key={s.slug}
              data-card
              href={`/services/${s.slug}`}
              className={cn(
                "group relative rounded-2xl p-7 md:p-8 flex flex-col justify-between min-h-[260px] overflow-hidden transition-all hover:-translate-y-1",
                i === 0
                  ? "bg-emerald text-cream"
                  : "bg-[color:var(--color-cream-50)] text-ink border border-[color:var(--color-line)]"
              )}
            >
              {/* corner pictogram */}
              <div aria-hidden className="absolute -right-4 -bottom-4 w-32 h-32 opacity-40 group-hover:opacity-70 transition-opacity">
                <ServiceArt category={s.category} />
              </div>

              <div className="relative">
                {s.mostBooked && (
                  <span className={cn(
                    "inline-block text-[10px] tracking-[0.22em] uppercase font-medium mb-4 px-2.5 py-1 rounded-full",
                    i === 0 ? "bg-gold/15 text-gold" : "bg-gold/15 text-gold-deep"
                  )}>
                    Most booked
                  </span>
                )}
                <h3 className="font-serif font-light text-3xl md:text-4xl leading-tight">{s.name}</h3>
                <p className={cn("mt-3 text-sm leading-relaxed max-w-xs", i === 0 ? "text-cream/70" : "text-ink/60")}>
                  {s.short}
                </p>
              </div>

              <div className="relative mt-8 flex items-end justify-between gap-4">
                <ul className={cn("text-xs space-y-1", i === 0 ? "text-cream/65" : "text-ink/55")}>
                  {s.durations.map((d) => {
                    const p = priceWithUsd(d.priceIdr);
                    return (
                      <li key={d.minutes} className="tracking-wide">
                        <span className="tabular-nums">{d.minutes} min</span> · {p.idr} <span className="opacity-60">{p.usd}</span>
                      </li>
                    );
                  })}
                </ul>
                <span className={cn(
                  "inline-flex shrink-0 items-center justify-center w-9 h-9 rounded-full transition-transform group-hover:translate-x-1",
                  i === 0 ? "bg-gold text-ink" : "bg-ink text-cream"
                )} aria-hidden>→</span>
              </div>
            </Link>
          ))}
        </Reveal>

        <Reveal stagger="a" className="grid md:grid-cols-2 gap-x-12 mt-12">
          {[...rest, ...others].map((s) => {
            const main = s.durations[0];
            const p = priceWithUsd(main.priceIdr);
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-baseline justify-between py-5 border-b border-[color:var(--color-line)] hover:bg-[color:var(--color-cream-50)] -mx-3 px-3 rounded transition-colors"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-xl text-ink group-hover:text-emerald transition-colors">{s.name}</span>
                  <span className="text-xs text-ink/45 tracking-wide">{main.minutes} min</span>
                </div>
                <div className="text-right">
                  <span className="text-sm text-ink font-medium tabular-nums">{p.idr}</span>
                  <span className="block text-[10px] text-ink/45 tabular-nums">{p.usd}</span>
                </div>
              </Link>
            );
          })}
        </Reveal>

        <div className="mt-12 text-center">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm text-ink hover:text-emerald transition-colors">
            See all treatments <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
