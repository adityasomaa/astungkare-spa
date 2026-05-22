import { quickWaUrl } from "@/lib/whatsapp";
import { HeroAnimation } from "@/components/motion/HeroAnimation";
import { HeroArt } from "@/components/graphics/HeroArt";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-cream on-dark">
      {/* atmospheric backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(70% 60% at 78% 90%, rgba(201,165,103,0.18), transparent 60%), radial-gradient(50% 50% at 15% 10%, rgba(31,58,46,0.45), transparent 70%), linear-gradient(180deg, #1A1715 0%, #14110f 100%)"
        }}
      />
      {/* grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"
        }}
      />

      <HeroAnimation>
        <div className="relative container-edge pt-36 pb-28 md:pt-44 md:pb-36">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-20 items-center">
            <div>
              <p data-h-eyebrow className="eyebrow text-gold mb-6">Mobile spa · Bali · 24 hours</p>

              <h1 className="display text-[2.6rem] sm:text-6xl lg:text-[5.25rem] mb-7">
                <span data-h-line className="block">Spa,</span>
                <span data-h-line className="block">brought to your</span>
                <span data-h-line className="block"><em>villa.</em></span>
              </h1>

              <p data-h-sub className="text-cream/75 text-base sm:text-lg max-w-xl leading-relaxed mb-9">
                A trained therapist arrives with oils, linen, and unhurried attention.
                Open every hour of every day. Canggu, Seminyak, Ubud and across Bali.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <a
                  data-h-cta
                  href={quickWaUrl("Hi Astungkare Spa — I'd like to book a treatment tonight.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-gold text-ink px-7 py-4 text-sm font-medium tracking-wide hover:bg-[#D6B57A] hover:scale-[1.02] transition"
                >
                  Book in 60 seconds via WhatsApp
                  <span aria-hidden>→</span>
                </a>
                <a
                  data-h-cta
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/15 px-6 py-4 text-sm hover:bg-cream/5 transition-colors"
                >
                  See treatments
                </a>
              </div>

              <dl className="mt-12 grid grid-cols-3 gap-6 max-w-lg text-xs text-cream/60">
                <div data-h-meta>
                  <dt className="text-gold text-sm font-medium tracking-wide">5.0 ★</dt>
                  <dd className="mt-1 tracking-wide">19 Google reviews</dd>
                </div>
                <div data-h-meta>
                  <dt className="text-gold text-sm font-medium tracking-wide">≤ 5 min</dt>
                  <dd className="mt-1 tracking-wide">WhatsApp reply</dd>
                </div>
                <div data-h-meta>
                  <dt className="text-gold text-sm font-medium tracking-wide">24 / 7</dt>
                  <dd className="mt-1 tracking-wide">Every day</dd>
                </div>
              </dl>
            </div>

            {/* graphic, not photo */}
            <div className="relative">
              <div
                data-h-visual
                className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-cream/10"
                style={{
                  background: "linear-gradient(135deg, #1f1812 0%, #15110d 100%)"
                }}
              >
                <HeroArt />
              </div>
              <div
                data-h-chip
                className="absolute -top-3 -left-3 bg-cream text-ink rounded-full px-4 py-2 text-[11px] tracking-wider shadow-lg shadow-black/30"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald mr-2 align-middle animate-pulse" />
                Earliest tonight · 18:30
              </div>
            </div>
          </div>
        </div>
      </HeroAnimation>
    </section>
  );
}
