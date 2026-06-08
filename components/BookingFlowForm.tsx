"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { services } from "@/content/services";
import { areas } from "@/content/areas";
import { buildWaUrl } from "@/lib/whatsapp";
import { formatIdr } from "@/lib/pricing";
import { PolicyLink } from "@/components/PolicyModal";
import { Select } from "@/components/ui/Select";
import { DateTimePicker } from "@/components/ui/DateTimePicker";

interface BookingFlowFormProps {
  defaultServiceSlug?: string;
  defaultAreaSlug?: string;
  variant?: "inline" | "page";
  autoLaunchWa?: boolean;
}

/** Local datetime "now" in the format datetime-local expects (YYYY-MM-DDTHH:MM). */
function localNow(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

/** Pretty-print a datetime-local value for the WhatsApp message. */
function prettyWhen(v: string): string {
  if (!v) return "";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  return d.toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function BookingFlowForm({
  defaultServiceSlug,
  defaultAreaSlug,
  autoLaunchWa = true
}: BookingFlowFormProps) {
  const params = useSearchParams();

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
  const [when, setWhen] = useState("");
  const [areaSlug, setAreaSlug] = useState(initialArea.slug);
  const [villa, setVilla] = useState("");
  const [name, setName] = useState("");
  const [people, setPeople] = useState(1);
  const [note, setNote] = useState("");
  const [touched, setTouched] = useState(false);
  const [minDateTime, setMinDateTime] = useState("");

  useEffect(() => setMinDateTime(localNow()), []);

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

  // Required: name, when, villa. Optional: note.
  const errors = {
    name: name.trim().length < 2,
    when: when.trim().length < 1,
    villa: villa.trim().length < 2
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const waUrl = useMemo(
    () =>
      buildWaUrl({
        name: name.trim(),
        therapy: service.name,
        duration: `${duration.minutes} min`,
        people,
        when: prettyWhen(when),
        location: area.name,
        villaName: villa,
        totalIdr: total,
        note: note.trim()
      }),
    [service, duration, people, when, area, villa, name, note, total]
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (hasErrors) {
      const firstInvalid = document.querySelector<HTMLElement>("[data-invalid='true']");
      firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" });
      firstInvalid?.focus();
      return;
    }
    if (autoLaunchWa) window.open(waUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-cream/[0.04] border border-cream/10 rounded-2xl p-6 md:p-8 backdrop-blur w-full"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Therapy" required>
          <Select
            ariaLabel="Therapy"
            value={serviceSlug}
            onValueChange={(v) => {
              setServiceSlug(v);
              setMinutes(services.find((x) => x.slug === v)!.durations[0].minutes);
            }}
            options={services.map((s) => ({ value: s.slug, label: s.name }))}
          />
        </Field>

        <Field label="Duration" required>
          <Select
            ariaLabel="Duration"
            value={String(minutes)}
            onValueChange={(v) => setMinutes(Number(v))}
            options={service.durations.map((d) => ({
              value: String(d.minutes),
              label: `${d.minutes} min · ${formatIdr(d.priceIdr)}`
            }))}
          />
        </Field>

        <Field label="Your name" required error={touched && errors.name} hint="So the therapist knows who to greet">
          <Input value={name} onChange={setName} placeholder="e.g. Sophie" invalid={touched && errors.name} autoComplete="name" />
        </Field>

        <Field label="People" required>
          <Counter value={people} onChange={setPeople} min={1} max={6} />
        </Field>

        <Field label="When" required error={touched && errors.when} hint="Choose your date & time" className="sm:col-span-2">
          <DateTimePicker value={when} onChange={setWhen} min={minDateTime} invalid={touched && errors.when} />
        </Field>

        <Field label="Area" required>
          <Select
            ariaLabel="Area"
            value={areaSlug}
            onValueChange={setAreaSlug}
            options={areas.map((a) => ({ value: a.slug, label: `${a.name} · ${a.drive}` }))}
          />
        </Field>

        <Field label="Location/Villa name" required error={touched && errors.villa}>
          <Input value={villa} onChange={setVilla} placeholder="e.g. Villa Asri, Berawa" invalid={touched && errors.villa} />
        </Field>

        <Field label="Note for the therapist" hint="Optional · pressure, allergies, gate code…" className="sm:col-span-2">
          <Input value={note} onChange={setNote} placeholder="e.g. medium pressure, gate code 1234, please call on arrival" />
        </Field>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="text-cream/55 tracking-wide">Estimated total</span>
        <span className="font-serif text-2xl text-cream tabular-nums">{formatIdr(total)}</span>
      </div>

      {touched && hasErrors && (
        <p className="mt-4 text-[12px] text-[#e9a08f] text-center tracking-wide animate-fade-up">
          Please complete the required fields so your WhatsApp booking is clear and fast to confirm.
        </p>
      )}

      <button
        type="submit"
        className="mt-4 w-full inline-flex items-center justify-center gap-3 rounded-xl bg-[color:var(--color-wa)] text-[#0a0a0a] font-semibold px-5 py-4 text-base hover:brightness-105 active:scale-[0.99] transition cursor-pointer"
      >
        <span aria-hidden>✦</span> Confirm via WhatsApp
      </button>

      <p className="mt-3 text-[11px] text-cream/45 text-center tracking-wide">
        Opens WhatsApp with your full booking pre-filled · response usually under 5 minutes
      </p>
      <p className="mt-4 text-[11px] text-cream/55 text-center leading-relaxed tracking-wide">
        By confirming you accept our{" "}
        <span className="text-gold/85"><PolicyLink policy="cancellation">cancellation policy</PolicyLink></span>
        {" "}and{" "}
        <span className="text-gold/85"><PolicyLink policy="conduct">professional conduct</PolicyLink></span>
        {" "}terms.
      </p>
    </form>
  );
}

function Field({
  label,
  children,
  required,
  error,
  hint,
  className
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  error?: boolean;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={`block ${className ?? ""}`}>
      <span className="flex items-center gap-1.5 text-[10px] tracking-[0.22em] uppercase text-cream/50 mb-1.5">
        {label}
        {required && <span className="text-gold/70" aria-hidden>*</span>}
      </span>
      {children}
      {hint && !error && <span className="block mt-1 text-[10px] text-cream/35 tracking-wide normal-case">{hint}</span>}
      {error && <span className="block mt-1 text-[10px] text-[#e9a08f] tracking-wide normal-case">Required</span>}
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  invalid,
  autoComplete
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  invalid?: boolean;
  autoComplete?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      data-invalid={invalid ? "true" : undefined}
      className={`w-full bg-black/20 border rounded-[10px] px-3.5 py-3.5 font-serif text-[15px] text-cream outline-none transition-colors placeholder:font-sans placeholder:text-[13px] placeholder:text-cream/35 focus:border-gold/60 ${
        invalid ? "border-[#e9a08f]/60" : "border-cream/10 hover:border-cream/25"
      }`}
    />
  );
}

function Counter({
  value,
  onChange,
  min = 1,
  max = 6
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));
  return (
    <div className="flex items-center justify-between bg-black/20 border border-cream/10 rounded-[10px] px-2 py-1.5">
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Fewer people"
        className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-cream/80 hover:bg-gold/15 hover:text-gold disabled:opacity-25 disabled:hover:bg-transparent transition cursor-pointer disabled:cursor-not-allowed"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <span className="font-serif text-[15px] text-cream tabular-nums select-none">
        {value} <span className="text-cream/45 text-[13px]">{value === 1 ? "person" : "people"}</span>
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="More people"
        className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-cream/80 hover:bg-gold/15 hover:text-gold disabled:opacity-25 disabled:hover:bg-transparent transition cursor-pointer disabled:cursor-not-allowed"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
