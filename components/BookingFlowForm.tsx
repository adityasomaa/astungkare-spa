"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { services } from "@/content/services";
import { areas } from "@/content/areas";
import { buildWaUrl } from "@/lib/whatsapp";
import { formatIdr } from "@/lib/pricing";
import { PolicyLink } from "@/components/PolicyModal";

interface BookingFlowFormProps {
  /** Slug for default service (overridden by ?service= URL param). */
  defaultServiceSlug?: string;
  /** Slug for default area (overridden by ?area= URL param). */
  defaultAreaSlug?: string;
  /** Show big landing-page intro vs compact inline. */
  variant?: "inline" | "page";
  /** Auto-open WhatsApp after submit (default true). */
  autoLaunchWa?: boolean;
}

export function BookingFlowForm({
  defaultServiceSlug,
  defaultAreaSlug,
  variant = "inline",
  autoLaunchWa = true
}: BookingFlowFormProps) {
  const params = useSearchParams();

  // Resolve initial service/area from URL or defaults
  const initialService =
    services.find((s) => s.slug === params.get("service")) ??
    services.find((s) => s.slug === defaultServiceSlug) ??
    services[0];

  const initialArea =
    areas.find((a) => a.slug === params.get("area")) ??
    areas.find((a) => a.slug === defaultAreaSlug) ??
    areas[0];

  const [serviceSlug, setServiceSlug] = useState(initialService.slug);
  const [minutes, setMinutes] = useState<number>(initialService.durations[0].minutes);
  const [when, setWhen] = useState("Tonight · 19:00");
  const [areaSlug, setAreaSlug] = useState(initialArea.slug);
  const [villa, setVilla] = useState("");
  const [name, setName] = useState("");
  const [people, setPeople] = useState(1);
  const [note, setNote] = useState("");

  // Sync state when URL param changes (rare, but enables deep-linking transitions)
  useEffect(() => {
    const s = params.get("service");
    const a = params.get("area");
    if (s && services.some((x) => x.slug === s)) {
      setServiceSlug(s);
      setMinutes(services.find((x) => x.slug === s)!.durations[0].minutes);
    }
    if (a && areas.some((x) => x.slug === a)) setAreaSlug(a);
  }, [params]);

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
        totalIdr: total,
        note: note ? `${name ? `From ${name}. ` : ""}${note}` : name ? `From ${name}.` : undefined
      }),
    [service, duration, people, when, area, villa, name, note, total]
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (autoLaunchWa) {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }
  }

  const isPage = variant === "page";

  return (
    <form
      onSubmit={handleSubmit}
      className={
        isPage
          ? "bg-cream/[0.04] border border-cream/10 rounded-2xl p-6 md:p-8 backdrop-blur w-full"
          : "bg-cream/[0.04] border border-cream/10 rounded-2xl p-6 md:p-8 backdrop-blur"
      }
    >
      <div className="grid sm:grid-cols-2 gap-3">
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
              <option key={d.minutes} value={d.minutes}>
                {d.minutes} min · {formatIdr(d.priceIdr)}
              </option>
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
          <select value={people} onChange={(e) => setPeople(Number(e.target.value))} className="select">
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "person" : "people"}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Area">
          <select value={areaSlug} onChange={(e) => setAreaSlug(e.target.value)} className="select">
            {areas.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.name} · {a.drive}
              </option>
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
        {isPage && (
          <>
            <Field label="Your name">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="optional"
                className="input"
                autoComplete="name"
              />
            </Field>
            <Field label="Any note for the therapist">
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="optional · allergies, pressure preference, etc."
                className="input"
              />
            </Field>
          </>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="text-cream/55 tracking-wide">Estimated total</span>
        <span className="font-serif text-2xl text-cream tabular-nums">{formatIdr(total)}</span>
      </div>

      <button
        type="submit"
        className="mt-5 w-full inline-flex items-center justify-center gap-3 rounded-xl bg-[color:var(--color-wa)] text-[#0a0a0a] font-semibold px-5 py-4 text-base hover:brightness-105 transition cursor-pointer"
      >
        <span aria-hidden>✦</span> Confirm via WhatsApp
      </button>

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
          transition: border-color .15s ease;
        }
        .input:focus, .select:focus { border-color: rgba(201,165,103,0.6); }
        .select option { background: #15281F; color: #F4EFE7; }
        .input::placeholder { color: rgba(244,239,231,0.35); font-family: var(--font-sans); font-size: 14px; }
      `}</style>
    </form>
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
