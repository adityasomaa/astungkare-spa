import { quickWaUrl } from "@/lib/whatsapp";

export function StickyWa() {
  return (
    <a
      href={quickWaUrl("Hi Astungkare Spa — I'd like to ask about a booking.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-40 bottom-5 right-5 md:bottom-7 md:right-7 inline-flex items-center gap-2.5 rounded-full bg-[color:var(--color-wa)] text-[#0a0a0a] font-semibold px-5 py-3.5 shadow-lg shadow-black/20 hover:scale-105 transition-transform"
      aria-label="Open WhatsApp"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.46 0 .1 5.36.1 11.96c0 2.11.55 4.16 1.6 5.97L0 24l6.27-1.64a11.94 11.94 0 0 0 5.79 1.47h.01c6.6 0 11.96-5.36 11.96-11.96 0-3.2-1.25-6.2-3.51-8.39zM12.06 21.79h-.01a9.83 9.83 0 0 1-5.01-1.37l-.36-.21-3.72.97.99-3.62-.23-.37a9.84 9.84 0 0 1-1.51-5.23c0-5.45 4.43-9.88 9.86-9.88 2.63 0 5.1 1.03 6.96 2.89a9.78 9.78 0 0 1 2.88 6.99c0 5.45-4.43 9.83-9.85 9.83zm5.42-7.36c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.51-.07-.15-.66-1.6-.91-2.18-.24-.57-.48-.5-.66-.51l-.56-.01c-.2 0-.5.07-.76.37-.27.3-1 .98-1 2.4 0 1.42 1.03 2.79 1.17 2.98.15.2 2.02 3.08 4.9 4.32.68.29 1.22.47 1.63.6.69.22 1.31.19 1.81.12.55-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.34z"/>
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
