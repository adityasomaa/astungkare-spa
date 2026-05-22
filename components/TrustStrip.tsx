const items = [
  { k: "Trained, vetted therapists", d: "Every therapist personally trained by Galuh Parwati" },
  { k: "Premium organic oils", d: "Cold-pressed, locally sourced, never reused" },
  { k: "Strictly therapeutic", d: "Zero tolerance for inappropriate requests" },
  { k: "Open 24 hours", d: "Late night, early morning, any day" }
];

export function TrustStrip() {
  return (
    <section className="bg-cream py-10 border-y border-[color:var(--color-line)]">
      <div className="container-edge">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {items.map((i) => (
            <li key={i.k}>
              <p className="font-serif text-lg text-ink leading-tight">{i.k}</p>
              <p className="text-sm text-ink/55 mt-1.5 leading-relaxed">{i.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
