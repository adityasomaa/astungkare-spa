"use client";

import { useEffect, useState, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { policies, type Policy } from "@/content/policies";

interface Props {
  children: ReactNode;
  policy: Policy["key"];
}

export function PolicyModalTrigger({ children, policy }: Props) {
  const data = policies[policy];
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-cream text-ink p-7 md:p-9 shadow-2xl shadow-ink/40 data-[state=open]:animate-fade-up focus:outline-none"
        >
          <Dialog.Title className="font-serif font-light text-3xl md:text-4xl text-ink leading-tight">
            {data.title}
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            {data.paragraphs[0]}
          </Dialog.Description>

          <div className="mt-6 space-y-4 text-ink/75 leading-relaxed text-[15px] max-h-[60vh] overflow-y-auto pr-2">
            {data.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-7 flex items-center justify-between gap-3 pt-5 border-t border-[color:var(--color-line)]">
            <span className="text-[11px] tracking-[0.22em] uppercase text-ink/45">
              By booking, you accept these terms
            </span>
            <Dialog.Close asChild>
              <button className="rounded-full bg-ink text-cream px-5 py-2.5 text-sm font-medium hover:bg-emerald transition">
                Understood
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/** Inline link styled like an underlined word. */
export function PolicyLink({ policy, children }: { policy: Policy["key"]; children: ReactNode }) {
  return (
    <PolicyModalTrigger policy={policy}>
      <button
        type="button"
        className="underline underline-offset-[5px] decoration-gold/60 decoration-1 hover:decoration-gold transition-colors text-inherit font-inherit"
      >
        {children}
      </button>
    </PolicyModalTrigger>
  );
}

/** First-visit toast (shown once, never blocks). */
export function FirstVisitNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem("ask:fv-policy");
    if (!seen) {
      const t = setTimeout(() => setVisible(true), 1600);
      return () => clearTimeout(t);
    }
  }, []);

  function dismiss() {
    localStorage.setItem("ask:fv-policy", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="status"
      className="fixed z-40 bottom-24 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-[360px] rounded-2xl bg-ink text-cream p-5 shadow-2xl shadow-ink/40 animate-fade-up"
    >
      <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-2">Before you book</p>
      <p className="text-sm text-cream/85 leading-relaxed">
        Our services are{" "}
        <PolicyLink policy="conduct">strictly therapeutic</PolicyLink>. Late cancellations carry a small fee — see our{" "}
        <PolicyLink policy="cancellation">cancellation policy</PolicyLink>.
      </p>
      <button
        onClick={dismiss}
        className="mt-4 text-xs text-cream/55 hover:text-cream tracking-wide"
      >
        Got it →
      </button>
    </div>
  );
}
