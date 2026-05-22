import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Astungkare Spa — Wellness Brought to You";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at 75% 80%, rgba(201,165,103,0.30), transparent 60%), linear-gradient(180deg, #1A1715 0%, #14110f 100%)",
          color: "#F4EFE7",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "serif",
          position: "relative"
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 18,
            letterSpacing: 8,
            color: "#C9A567",
            textTransform: "uppercase",
            fontFamily: "sans-serif"
          }}
        >
          ASTUNGKARE · SPA · BALI
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, lineHeight: 1, letterSpacing: -2, fontWeight: 300, display: "flex", flexDirection: "column" }}>
            <span>Spa,</span>
            <span style={{ display: "flex", gap: 22 }}>
              brought to your
              <span style={{ fontStyle: "italic", color: "#C9A567" }}>villa.</span>
            </span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 22,
              color: "rgba(244,239,231,0.72)",
              maxWidth: 760,
              fontFamily: "sans-serif"
            }}
          >
            A trained therapist arrives with oils, linen, and unhurried attention. Open 24 hours, across Bali.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            fontSize: 16,
            letterSpacing: 4,
            color: "rgba(244,239,231,0.55)",
            fontFamily: "sans-serif"
          }}
        >
          <span style={{ display: "flex" }}>astungkarespa.com</span>
          <span style={{ display: "flex" }}>5.0 / 5 · 24/7 · WHATSAPP BOOKING</span>
        </div>

        {/* lotus mark — pure SVG, no fonts */}
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 60,
            display: "flex"
          }}
        >
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
            <g stroke="#C9A567" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M50 22 C 40 38, 40 60, 50 76 C 60 60, 60 38, 50 22 Z" />
              <path d="M50 50 C 32 44, 17 54, 19 72 C 38 73, 47 64, 50 58 Z" />
              <path d="M50 50 C 68 44, 83 54, 81 72 C 62 73, 53 64, 50 58 Z" />
            </g>
          </svg>
        </div>
      </div>
    ),
    size
  );
}
