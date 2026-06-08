"use client";

import { useEffect, useRef, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { setPageScroll } from "@/lib/scroll-lock";

interface DateTimePickerProps {
  /** "YYYY-MM-DDTHH:MM" or "" */
  value: string;
  onChange: (v: string) => void;
  /** "YYYY-MM-DDTHH:MM" earliest allowed (date granularity for disabling) */
  min?: string;
  invalid?: boolean;
  placeholder?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function toValue(y: number, m: number, d: number, h: number, min: number) {
  return `${y}-${pad(m + 1)}-${pad(d)}T${pad(h)}:${pad(min)}`;
}

function parse(v: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(v);
  if (!match) return null;
  return {
    y: +match[1],
    m: +match[2] - 1,
    d: +match[3],
    h: +match[4],
    min: +match[5]
  };
}

function prettyLabel(v: string) {
  const p = parse(v);
  if (!p) return "";
  const d = new Date(p.y, p.m, p.d, p.h, p.min);
  return d.toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function DateTimePicker({ value, onChange, min, invalid, placeholder = "Select date & time" }: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const parsed = parse(value);
  const now = new Date();

  const [viewY, setViewY] = useState(parsed?.y ?? now.getFullYear());
  const [viewM, setViewM] = useState(parsed?.m ?? now.getMonth());
  const [hour, setHour] = useState(parsed?.h ?? now.getHours());
  const [minute, setMinute] = useState(parsed?.min ?? 0);
  const [selDay, setSelDay] = useState<{ y: number; m: number; d: number } | null>(
    parsed ? { y: parsed.y, m: parsed.m, d: parsed.d } : null
  );

  const minParsed = min ? parse(min) : null;
  const minDate = minParsed ? new Date(minParsed.y, minParsed.m, minParsed.d) : null;

  // Build 42-cell grid
  const firstWeekday = new Date(viewY, viewM, 1).getDay();
  const daysInMonth = new Date(viewY, viewM + 1, 0).getDate();
  const cells: Array<{ y: number; m: number; d: number; current: boolean; disabled: boolean }> = [];
  // leading (prev month)
  const prevDays = new Date(viewY, viewM, 0).getDate();
  for (let i = firstWeekday - 1; i >= 0; i--) {
    const d = prevDays - i;
    const m = viewM === 0 ? 11 : viewM - 1;
    const y = viewM === 0 ? viewY - 1 : viewY;
    cells.push({ y, m, d, current: false, disabled: isBefore(y, m, d, minDate) });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ y: viewY, m: viewM, d, current: true, disabled: isBefore(viewY, viewM, d, minDate) });
  }
  let trail = 1;
  while (cells.length < 42) {
    const m = viewM === 11 ? 0 : viewM + 1;
    const y = viewM === 11 ? viewY + 1 : viewY;
    cells.push({ y, m, d: trail, current: false, disabled: isBefore(y, m, trail, minDate) });
    trail++;
  }

  function emit(day: { y: number; m: number; d: number }, h: number, mi: number) {
    onChange(toValue(day.y, day.m, day.d, h, mi));
  }

  function pickDay(c: { y: number; m: number; d: number; disabled: boolean }) {
    if (c.disabled) return;
    const day = { y: c.y, m: c.m, d: c.d };
    setSelDay(day);
    setViewY(c.y);
    setViewM(c.m);
    emit(day, hour, minute);
  }

  function pickHour(h: number) {
    setHour(h);
    if (selDay) emit(selDay, h, minute);
  }
  function pickMinute(mi: number) {
    setMinute(mi);
    if (selDay) emit(selDay, hour, mi);
  }

  function prevMonth() {
    if (viewM === 0) { setViewM(11); setViewY(viewY - 1); } else setViewM(viewM - 1);
  }
  function nextMonth() {
    if (viewM === 11) { setViewM(0); setViewY(viewY + 1); } else setViewM(viewM + 1);
  }

  const isSel = (c: { y: number; m: number; d: number }) =>
    selDay && selDay.y === c.y && selDay.m === c.m && selDay.d === c.d;
  const isToday = (c: { y: number; m: number; d: number }) =>
    c.y === now.getFullYear() && c.m === now.getMonth() && c.d === now.getDate();

  return (
    <Popover.Root
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        setPageScroll(!o);
      }}
    >
      <Popover.Trigger asChild>
        <button
          type="button"
          data-invalid={invalid ? "true" : undefined}
          className={[
            "w-full flex items-center justify-between gap-2 bg-black/20 border rounded-[10px] px-3.5 py-3.5",
            "font-serif text-[15px] text-left outline-none transition-colors cursor-pointer",
            "data-[state=open]:border-gold/60",
            value ? "text-cream" : "text-cream/40",
            invalid ? "border-[#e9a08f]/60" : "border-cream/10 hover:border-cream/25"
          ].join(" ")}
        >
          <span>{value ? prettyLabel(value) : placeholder}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="text-gold/70 shrink-0">
            <rect x="3" y="4.5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <path d="M3 9h18M8 2.5v4M16 2.5v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={6}
          data-lenis-prevent
          className="z-[70] w-[320px] rounded-xl bg-emerald-deep border border-cream/12 shadow-2xl shadow-black/50 p-4 data-[state=open]:animate-select-in origin-top"
        >
          <div className="flex">
            {/* Calendar */}
            <div className="flex-1 pr-3">
              <div className="flex items-center justify-between mb-3">
                <button type="button" onClick={prevMonth} aria-label="Previous month" className="w-7 h-7 inline-flex items-center justify-center rounded-md text-cream/70 hover:bg-gold/15 hover:text-gold transition cursor-pointer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <span className="font-serif text-cream text-sm tracking-wide">{MONTHS[viewM]} {viewY}</span>
                <button type="button" onClick={nextMonth} aria-label="Next month" className="w-7 h-7 inline-flex items-center justify-center rounded-md text-cream/70 hover:bg-gold/15 hover:text-gold transition cursor-pointer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>

              <div className="grid grid-cols-7 gap-0.5 mb-1">
                {WEEKDAYS.map((w) => (
                  <span key={w} className="text-[10px] text-cream/40 text-center py-1 tracking-wide">{w}</span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-0.5">
                {cells.map((c, i) => (
                  <button
                    key={i}
                    type="button"
                    disabled={c.disabled}
                    onClick={() => pickDay(c)}
                    className={[
                      "h-8 w-8 inline-flex items-center justify-center rounded-md text-[13px] font-serif transition cursor-pointer",
                      c.disabled ? "text-cream/15 cursor-not-allowed" : "hover:bg-gold/15",
                      isSel(c) ? "bg-gold text-ink hover:bg-gold" : c.current ? "text-cream/85" : "text-cream/35",
                      !isSel(c) && isToday(c) ? "ring-1 ring-gold/50" : ""
                    ].join(" ")}
                  >
                    {c.d}
                  </button>
                ))}
              </div>
            </div>

            {/* Time columns */}
            <div className="flex gap-1 border-l border-cream/10 pl-3">
              <TimeColumn label="Hr" values={range(24)} selected={hour} onPick={pickHour} />
              <TimeColumn label="Min" values={range(60)} selected={minute} onPick={pickMinute} />
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-cream/10">
            <button
              type="button"
              onClick={() => { setSelDay(null); onChange(""); }}
              className="text-[12px] text-cream/55 hover:text-cream tracking-wide cursor-pointer"
            >
              Clear
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  const day = { y: now.getFullYear(), m: now.getMonth(), d: now.getDate() };
                  setSelDay(day); setViewY(day.y); setViewM(day.m);
                  setHour(now.getHours()); setMinute(now.getMinutes());
                  emit(day, now.getHours(), now.getMinutes());
                }}
                className="text-[12px] text-gold hover:brightness-110 tracking-wide cursor-pointer"
              >
                Now
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-[12px] bg-gold text-ink rounded-md px-3 py-1 font-medium hover:brightness-105 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function TimeColumn({
  label,
  values,
  selected,
  onPick
}: {
  label: string;
  values: number[];
  selected: number;
  onPick: (v: number) => void;
}) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const selRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    selRef.current?.scrollIntoView({ block: "center" });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <span className="text-[10px] text-cream/40 mb-1 tracking-wide">{label}</span>
      <div
        ref={listRef}
        data-lenis-prevent
        className="h-[232px] w-11 overflow-y-auto overscroll-contain rounded-md [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-cream/20 [&::-webkit-scrollbar-thumb]:rounded"
      >
        {values.map((v) => (
          <button
            key={v}
            ref={v === selected ? selRef : undefined}
            type="button"
            onClick={() => onPick(v)}
            className={[
              "block w-full text-center py-1.5 text-[13px] font-serif rounded-md transition cursor-pointer",
              v === selected ? "bg-gold text-ink" : "text-cream/75 hover:bg-gold/15"
            ].join(" ")}
          >
            {pad(v)}
          </button>
        ))}
      </div>
    </div>
  );
}

function range(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}

function isBefore(y: number, m: number, d: number, min: Date | null) {
  if (!min) return false;
  return new Date(y, m, d) < new Date(min.getFullYear(), min.getMonth(), min.getDate());
}
