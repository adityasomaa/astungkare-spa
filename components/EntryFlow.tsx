"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { policies, type Policy } from "@/content/policies";
import { setPageScroll } from "@/lib/scroll-lock";

const COOKIE_KEY = "ask:cookie-consent";

type Step = "idle" | "conduct" | "cancellation" | "cookie" | "done";

/**
 * Homepage entry sequence:
 *   Professional Conduct (agree) → Cancellation (agree) → Cookie consent.
 * Conduct + Cancellation show on EVERY homepage visit (awareness).
 * Cookie consent shows only once (stored in localStorage).
 */
export function EntryFlow() {
  const [step, setStep] = useState<Step>("idle");

  useEffect(() => {
    // small delay so it appears after the page settles
    const t = setTimeout(() => setStep("conduct"), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const blocking = step === "conduct" || step === "cancellation";
    setPageScroll(!blocking);
    return () => setPageScroll(true);
  }, [step]);

  function afterCancellation() {
    let accepted = false;
    try {
      accepted = localStorage.getItem(COOKIE_KEY) !== null;
    } catch {
      /* ignore */
    }
    setStep(accepted ? "done" : "cookie");
  }

  function setCookie(choice: "accepted" | "declined") {
    try {
      localStorage.setItem(COOKIE_KEY, choice);
    } catch {
      /* ignore */
    }
    setStep("done");
  }

  return (
    <>
      <PolicyGate
        open={step === "conduct"}
        policy="conduct"
        onAgree={() => setStep("cancellation")}
      />
      <PolicyGate
        open={step === "cancellation"}
        policy="cancellation"
        onAgree={afterCancellation}
      />
      {step === "cookie" && <CookieBanner onChoice={setCookie} />}
    </>
  );
}

function PolicyGate({
  open,
  policy,
  onAgree
}: {
  open: boolean;
  policy: Policy["key"];
  onAgree: () => void;
}) {
  const data = policies[policy];
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-ink/70 backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <Dialog.Content
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          className="fixed left-1/2 top-1/2 z-[90] w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-cream text-ink p-7 md:p-9 shadow-2xl shadow-ink/40 data-[state=open]:animate-fade-up focus:outline-none"
        >
          <p className="eyebrow mb-3">Please read</p>
          <Dialog.Title className="font-serif font-light text-3xl md:text-4xl text-ink leading-tight">
            {data.title}
          </Dialog.Title>
          <Dialog.Description className="sr-only">{data.paragraphs[0]}</Dialog.Description>

          <div className="mt-5 space-y-3.5 text-ink/75 leading-relaxed text-[14px] max-h-[50vh] overflow-y-auto pr-2" data-lenis-prevent>
            {data.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <button
            onClick={onAgree}
            className="mt-7 w-full rounded-full bg-ink text-cream px-5 py-3.5 text-sm font-medium hover:bg-emerald transition cursor-pointer"
          >
            I Agree
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function CookieBanner({ onChoice }: { onChoice: (c: "accepted" | "declined") => void }) {
  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed z-[80] bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-[380px] rounded-2xl bg-ink text-cream p-5 shadow-2xl shadow-black/50 animate-fade-up"
    >
      <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-2">Cookies</p>
      <p className="text-sm text-cream/80 leading-relaxed">
        We use a small set of cookies to understand how the site is used and to improve your experience. You can decline non-essential cookies.
      </p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onChoice("accepted")}
          className="flex-1 rounded-full bg-gold text-ink px-4 py-2.5 text-sm font-medium hover:bg-[#D6B57A] transition cursor-pointer"
        >
          Accept
        </button>
        <button
          onClick={() => onChoice("declined")}
          className="flex-1 rounded-full border border-cream/20 text-cream px-4 py-2.5 text-sm hover:bg-cream/5 transition cursor-pointer"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
