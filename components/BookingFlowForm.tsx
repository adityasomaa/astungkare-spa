"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { services } from "@/content/services";
import { areas } from "@/content/areas";
import { buildWaUrl } from "@/lib/whatsapp";
import { formatIdr } from "@/lib/pricing";
import { PolicyLink } from "@/components/PolicyModal";
import { Select } from "@/components/ui/Select";

interface BookingFlowFormProps {
  defaultServiceSlug?: string;
  defaultAreaSlug?: string;
  variant?: "inline" | "page";
  autoLaunchWa?: boolean;
}

const PEOPLE_OPTIONS = [1, 2, 3, 4].map((n) => ({
  value: String(n),
  label: `${n} ${n === 1 ? "person" : "people"}`
}));

export function BookingFlowForm({
  defaultServiceSlug,
  defaultAreaSlug,
  variant = "inline",
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

  // Every text field is required; selects always have a value.
  const errors = {
    name: name.trim().length < 2,
    when: when.trim().length < 3,
    villa: villa.trim().length < 2,
    note: note.trim().length < 2
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const waUrl = useMemo(
    () =>
      buildWaUrl({
        therapy: service.name,
        duration: `${duration.minutes} min`,
        people,
        when,
        location: area.name,
        villaName: villa,
        totalIdr: total,
        note: `From ${name}. ${note}`
      }),
    [service, duration, people, when, area, villa, name, note, total]
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (hasErrors) {
      // focus first invalid field
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
          <Select
            ariaLabel="Number of people"
            value={String(people)}
            onValueChange={(v) => setPeople(Number(v))}
            options={PEOPLE_OPTIONS}
          />
        </Field>

        <Field label="When" required error={touched && errors.when} hint="Date & time you'd like us">
          <Input value={when} onChange={setWhen} placeholder="e.g. tonight 19:00, or Sat 24 May 5pm" invalid={touched && errors.when} />
        </Field>

        <Field label="Area" required>
          <Select
            ariaLabel="Area"
            value={areaSlug}
            onValueChange={setAreaSlug}
            options={areas.map((a) => ({ value: a.slug, label: `${a.name} · ${a.drive}` }))}
          />
        </Field>

        <Field label="Villa / Hotel name" required error={touched && errors.villa} className="sm:col-span-2">
          <Input value={villa} onChange={setVilla} placeholder="e.g. Villa Asri, Berawa — full name so we can find you" invalid={touched && errors.villa} />
        </Field>

        <Field label="Note for the therapist" required error={touched && errors.note} hint="Pressure preference, allergies, parking, gate code…" className="sm:col-span-2">
          <Input value={note} onChange={setNote} placeholder="e.g. medium pressure, gate code 1234, please call on arrival" invalid={touched && errors.note} />
        </Field>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="text-cream/55 tracking-wide">Estimated total</span>
        <span className="font-serif text-2xl text-cream tabular-nums">{formatIdr(total)}</span>
      </div>

      {touched && hasErrors && (
        <p className="mt-4 text-[12px] text-[#e9a08f] text-center tracking-wide animate-fade-up">
          Please complete every field — it makes your WhatsApp booking clear and fast to confirm.
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
    <label className={`block ${className ?? ""}`}>
      <span className="flex items-center gap-1.5 text-[10px] tracking-[0.22em] uppercase text-cream/50 mb-1.5">
        {label}
        {required && <span className="text-gold/70" aria-hidden>*</span>}
      </span>
      {children}
      {hint && !error && <span className="block mt-1 text-[10px] text-cream/35 tracking-wide normal-case">{hint}</span>}
      {error && <span className="block mt-1 text-[10px] text-[#e9a08f] tracking-wide normal-case">Required</span>}
    </label>
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
