"use client";

import { useMemo, useState } from "react";
import { services } from "@/content/services";
import { areas } from "@/content/areas";
import { buildWaUrl } from "@/lib/whatsapp";
import { formatIdr } from "@/lib/pricing";
import { PolicyLink } from "@/components/PolicyModal";

export function BookingWidget() {
  const [serviceSlug, setServiceSlug] = useState(services[0].slug);
  const [minutes, setMinutes] = useState<number>(services[0].durations[0].minutes);
  const [when, setWhen] = useState("Tonight · 19:00");
  const [areaSlug, setAreaSlug] = useState(areas[0].slug);
  const [villa, setVilla] = useState("");
  const [people, setPeople] = useState(1);

  const service = services.find((s) => s.slug === serviceSlug)!;
  const duration = service.durations.find((d) => d.minutes === minutes) ?? service.durations[0];
  const area = areas.find((a) => a.slug === areaSlug)!;
  const total = duration.priceIdr * people;

  const waUrl = useMemo(
    () =>
      buildWaUrl({
        therapy: service.name,
        duration: `${duration.minutes} min`,
        people,
        when,
        location: area.name,
        villaName: villa || undefined,
        totalIdr: total
      }),
    [service, duration, people, when, area, villa, total]
  );

  return (
    <section id="book" className="bg-emerald-deep on-dark text-cream py-24 md:py-32">
      <div className="container-edge grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
        <div>
          <p className="eyebrow text-gold mb-4">03 · Booking</p>
          <h2 className="display text-4xl md:text-5xl text-cream mb-6">
            One short form,<br />
            <em>one WhatsApp.</em>
          </h2>
          <p className="text-cream/70 max-w-md leading-relaxed">
            Pick a treatment, when, and where. We build the message for you. You hit send, the therapist confirms within five minutes.
          </p>

          <ul className="mt-10 space-y-4 text-sm text-cream/65">
            <li className="flex gap-3"><span className="text-gold">✦</span> No deposit, no upfront payment</li>
            <li className="flex gap-3"><span className="text-gold">✦</span> Pay therapist directly · cash or QRIS</li>
            <li className="flex gap-3"><span className="text-gold">✦</span> Cancel up to 1 hour before · IDR 50K otherwise</li>
          </ul>
        </div>

        <div className="bg-cream/[0.04] border border-cream/10 rounded-2xl p-6 md:p-8 backdrop-blur">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Therapy">
              <select
                value={serviceSlug}
                onChange={(e) => {
                  setServiceSlug(e.target.value);
                  const s = services.find((x) => x.slug === e.target.value)!;
                  setMinutes(s.durations[0].minutes);
                }}
                className="select"
              >
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>{s.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Duration">
              <select
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                className="select"
              >
                {service.durations.map((d) => (
                  <option key={d.minutes} value={d.minutes}>{d.minutes} min · {formatIdr(d.priceIdr)}</option>
                ))}
              </select>
            </Field>
            <Field label="When">
              <input
                value={when}
                onChange={(e) => setWhen(e.target.value)}
                placeholder="e.g. tonight 19:00"
                className="input"
              />
            </Field>
            <Field label="People">
              <select
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
                className="select"
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? "person" : "people"}</option>
                ))}
              </select>
            </Field>
            <Field label="Area">
              <select value={areaSlug} onChange={(e) => setAreaSlug(e.target.value)} className="select">
                {areas.map((a) => (
                  <option key={a.slug} value={a.slug}>{a.name} · {a.drive}</option>
                ))}
              </select>
            </Field>
            <Field label="Villa / Hotel name">
              <input
                value={villa}
                onChange={(e) => setVilla(e.target.value)}
                placeholder="optional"
                className="input"
              />
            </Field>
          </div>

          <div className="mt-5 flex items-center justify-between text-sm">
            <span className="text-cream/55 tracking-wide">Estimated total</span>
            <span className="font-serif text-2xl text-cream tabular-nums">{formatIdr(total)}</span>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 w-full inline-flex items-center justify-center gap-3 rounded-xl bg-[color:var(--color-wa)] text-[#0a0a0a] font-semibold px-5 py-4 text-base hover:brightness-105 transition"
          >
            <span aria-hidden>✦</span> Confirm via WhatsApp
          </a>

          <p className="mt-3 text-[11px] text-cream/45 text-center tracking-wide">
            Opens WhatsApp with your booking pre-filled · response usually under 5 minutes
          </p>
          <p className="mt-4 text-[11px] text-cream/55 text-center leading-relaxed tracking-wide">
            By confirming you accept our{" "}
            <span className="text-gold/85"><PolicyLink policy="cancellation">cancellation policy</PolicyLink></span>
            {" "}and{" "}
            <span className="text-gold/85"><PolicyLink policy="conduct">professional conduct</PolicyLink></span>
            {" "}terms.
          </p>
        </div>
      </div>

      <style>{`
        .input, .select {
          width: 100%;
          background: rgba(0,0,0,0.18);
          border: 1px solid rgba(244,239,231,0.10);
          color: #F4EFE7;
          font-family: var(--font-serif);
          font-size: 15px;
          padding: 14px 14px 12px;
          border-radius: 10px;
          outline: none;
          appearance: none;
        }
        .input:focus, .select:focus { border-color: rgba(201,165,103,0.6); }
        .select option { background: #15281F; color: #F4EFE7; }
        .input::placeholder { color: rgba(244,239,231,0.35); font-family: var(--font-sans); font-size: 14px; }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] tracking-[0.22em] uppercase text-cream/50 mb-1.5">{label}</span>
      {children}
    </label>
  );
}
