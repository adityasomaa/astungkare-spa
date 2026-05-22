import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyWa } from "@/components/StickyWa";
import { services, type Service } from "@/content/services";
import { priceWithUsd } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Treatments",
  description: "Twenty treatments — massage, face, scrub, nails, and waxing — delivered to your villa across Bali."
};

const categories: Array<{ key: Service["category"]; label: string }> = [
  { key: "massage", label: "Massage" },
  { key: "face", label: "Face & Beauty" },
  { key: "scrub", label: "Body Scrub" },
  { key: "nails", label: "Nails" },
  { key: "waxing", label: "Waxing" }
];

export default function ServicesIndexPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-ink text-cream on-dark pt-36 pb-20">
          <div className="container-edge">
            <p className="eyebrow text-gold mb-4">All treatments</p>
            <h1 className="display text-5xl md:text-7xl max-w-3xl">
              The full menu, <em>at your door.</em>
            </h1>
            <p className="text-cream/65 mt-6 max-w-xl text-lg leading-relaxed">
              Pick what you need, when you need it. We bring everything else.
            </p>
          </div>
        </section>

        <section className="bg-cream py-20">
          <div className="container-edge space-y-20">
            {categories.map((cat) => {
              const items = services.filter((s) => s.category === cat.key);
              if (items.length === 0) return null;
              return (
                <div key={cat.key}>
                  <header className="flex items-baseline justify-between border-b border-[color:var(--color-line)] pb-4 mb-2">
                    <h2 className="font-serif text-3xl font-light text-ink">{cat.label}</h2>
                    <span className="text-xs tracking-[0.22em] uppercase text-ink/50">{items.length} treatments</span>
                  </header>
                  <ul>
                    {items.map((s) => {
                      const main = s.durations[0];
                      const p = priceWithUsd(main.priceIdr);
                      return (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="group flex items-baseline justify-between py-5 border-b border-[color:var(--color-line)] hover:bg-[color:var(--color-cream-50)] -mx-3 px-3 rounded transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <h3 className="font-serif text-xl text-ink group-hover:text-emerald transition-colors">
                                {s.name}
                              </h3>
                              <p className="text-sm text-ink/55 mt-0.5">{s.short}</p>
                            </div>
                            <div className="text-right shrink-0 ml-4">
                              <span className="text-sm text-ink font-medium tabular-nums">{p.idr}</span>
                              <span className="block text-[10px] text-ink/45 tabular-nums">from {main.minutes} min · {p.usd}</span>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
      <StickyWa />
    </>
  );
}
