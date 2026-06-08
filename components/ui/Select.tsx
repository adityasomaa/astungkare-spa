"use client";

import * as RSelect from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  ariaLabel?: string;
}

/** Fully-styled, animated dropdown — replaces native <select>. Dark-theme tuned. */
export function Select({ value, onValueChange, options, placeholder, ariaLabel }: SelectProps) {
  return (
    <RSelect.Root value={value} onValueChange={onValueChange}>
      <RSelect.Trigger
        aria-label={ariaLabel}
        className={cn(
          "group w-full flex items-center justify-between gap-2",
          "bg-black/20 border border-cream/10 rounded-[10px] px-3.5 py-3.5",
          "font-serif text-[15px] text-cream text-left",
          "outline-none transition-colors data-[state=open]:border-gold/60 hover:border-cream/25",
          "data-[placeholder]:text-cream/40 cursor-pointer"
        )}
      >
        <RSelect.Value placeholder={placeholder} />
        <RSelect.Icon className="text-gold/70 transition-transform duration-300 group-data-[state=open]:rotate-180">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </RSelect.Icon>
      </RSelect.Trigger>

      <RSelect.Portal>
        <RSelect.Content
          position="popper"
          sideOffset={6}
          className={cn(
            "z-[60] w-[var(--radix-select-trigger-width)] max-h-[300px] overflow-hidden",
            "bg-emerald-deep border border-cream/12 rounded-xl shadow-2xl shadow-black/50",
            "data-[state=open]:animate-select-in data-[state=closed]:animate-select-out origin-top"
          )}
        >
          <RSelect.ScrollUpButton className="flex items-center justify-center h-6 text-gold/60">
            <Chevron up />
          </RSelect.ScrollUpButton>

          <RSelect.Viewport className="p-1.5">
            {options.map((opt) => (
              <RSelect.Item
                key={opt.value}
                value={opt.value}
                className={cn(
                  "relative flex items-center px-3 py-2.5 pr-8 rounded-lg",
                  "font-serif text-[14px] text-cream/80 select-none outline-none cursor-pointer",
                  "data-[highlighted]:bg-gold/15 data-[highlighted]:text-cream",
                  "data-[state=checked]:text-gold transition-colors"
                )}
              >
                <RSelect.ItemText>{opt.label}</RSelect.ItemText>
                <RSelect.ItemIndicator className="absolute right-3 inline-flex">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 13l4 4L19 7" stroke="#C9A567" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </RSelect.ItemIndicator>
              </RSelect.Item>
            ))}
          </RSelect.Viewport>

          <RSelect.ScrollDownButton className="flex items-center justify-center h-6 text-gold/60">
            <Chevron />
          </RSelect.ScrollDownButton>
        </RSelect.Content>
      </RSelect.Portal>
    </RSelect.Root>
  );
}

function Chevron({ up = false }: { up?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className={up ? "rotate-180" : ""}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
