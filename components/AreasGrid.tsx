import Link from "next/link";
import { areas } from "@/content/areas";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

export function AreasGrid() {
  return (
    <section id="areas" className="bg-cream py-24 md:py-32 border-y border-[color:var(--color-line)]">
      <div className="container-edge">
        <Reveal as="header" className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <p className="eyebrow mb-4">04 · Where we serve</p>
            <h2 className="display text-4xl md:text-5xl">
              All of <em>Bali.</em>
            </h2>
          </div>
          <p className="text-ink/65 max-w-md leading-relaxed">
            Twelve therapists based across the south. Most arrivals between 0 and 45 minutes.
          </p>
        </Reveal>

        <Reveal stagger="a" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
                  <h3 className="font-serif text-2xl md:text-3xl font-light">{a.name}</h3>
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
        </Reveal>
      </div>
    </section>
  );
}
