// Google Ads tag (public conversion id). Loaded once by <GoogleAnalytics>; used for
// remarketing and conversion tracking of booking intents (WhatsApp confirmations).
export const GADS_ID = "AW-18088777997";

// Google Tag Manager container run by the ads team (holds GA4). Shares the same
// dataLayer and starts on the gtag('js') command pushed by <GoogleAnalytics>.
export const GTM_ID = "GTM-5KW29MZ4";

// Conversion label from the Google Ads "WhatsApp Booking" conversion action.
// Public value (ships in the client bundle by design); env can override it.
const CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL || "zHArCLiP7vEcEI2ys7FD";

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
