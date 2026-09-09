// Google Ads tag (public conversion id). Loaded once by <GoogleAnalytics>; used for
// remarketing and conversion tracking of booking intents (WhatsApp confirmations).
export const GADS_ID = "AW-18088777997";

// Conversion label from a Google Ads "Conversion action" (e.g. "AbC-D_efGhIjk").
// Until this is set, the WhatsApp confirmation still fires a GA4 `generate_lead`
// event; the Google Ads conversion only records once the label exists.
const CONVERSION_LABEL = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL;

type GtagFn = (...args: unknown[]) => void;

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  const fn = (window as typeof window & { gtag?: GtagFn }).gtag;
  if (typeof fn === "function") fn(...args);
}

/** Called when the visitor accepts cookies — unlocks ads/analytics storage. */
export function grantAdConsent() {
  gtag("consent", "update", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted"
  });
}

/** Fired when a visitor confirms a booking via WhatsApp (the conversion moment). */
export function trackBookingConversion(valueIdr: number) {
  // GA4 lead event — works immediately, no label needed.
  gtag("event", "generate_lead", { currency: "IDR", value: valueIdr });
  // Google Ads conversion — records only once a conversion label is configured.
  if (CONVERSION_LABEL) {
    gtag("event", "conversion", {
      send_to: `${GADS_ID}/${CONVERSION_LABEL}`,
      value: valueIdr,
      currency: "IDR"
    });
  }
}
