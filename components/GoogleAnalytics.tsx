import Script from "next/script";
import { GADS_ID, GTM_ID } from "@/lib/gtag";

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  // gtag.js needs one id to bootstrap; the Ads tag is always present.
  const primaryId = gaId || GADS_ID;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'granted',
            'wait_for_update': 500
          });
          gtag('js', new Date());
          ${gaId ? `gtag('config', '${gaId}', { anonymize_ip: true });` : ""}
          gtag('config', '${GADS_ID}');
        `}
      </Script>
      {/* GTM's install snippet = this loader + the init above (don't add a second gtag('js')). */}
      <Script
        src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
