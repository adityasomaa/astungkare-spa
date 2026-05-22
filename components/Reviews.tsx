import { reviews } from "@/content/reviews";

export function Reviews() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-edge">
        <header className="mb-14">
          <p className="eyebrow mb-4">05 · Said quietly</p>
          <h2 className="display text-4xl md:text-5xl max-w-2xl">
            From <em>guests</em> who came back<br />the next night.
          </h2>
        </header>

        <div className="grid md:grid-cols-2 gap-3">
          {reviews.map((r, i) => (
            <figure
              key={r.name}
              className={
                i === 0
                  ? "rounded-2xl p-8 md:p-10 bg-ink text-cream md:row-span-2 flex flex-col justify-between"
                  : "rounded-2xl p-7 bg-[color:var(--color-cream-50)] border border-[color:var(--color-line)]"
              }
            >
              <blockquote className={i === 0 ? "font-serif text-2xl md:text-3xl font-light leading-snug" : "font-serif text-xl font-light leading-snug text-ink"}>
                <span className="text-gold mr-1">“</span>{r.body}<span className="text-gold ml-1">”</span>
              </blockquote>
              <figcaption className={i === 0 ? "mt-8 text-sm text-cream/60" : "mt-6 text-sm text-ink/55"}>
                <span className={i === 0 ? "text-cream font-medium" : "text-ink font-medium"}>{r.name}</span>
                <span className="mx-2 opacity-40">·</span>
                <span>{r.origin}</span>
                {r.treatment && (
                  <span className={i === 0 ? "block mt-1 text-cream/45 text-xs tracking-wide" : "block mt-1 text-ink/45 text-xs tracking-wide"}>
                    {r.treatment}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
