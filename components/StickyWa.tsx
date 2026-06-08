import Link from "next/link";

/** Floating "Book Now" button — always visible, routes to the contact form. */
export function StickyWa() {
  return (
    <Link
      href="/contact"
      aria-label="Book now"
      className="fixed z-40 bottom-5 right-5 md:bottom-7 md:right-7 inline-flex items-center gap-2.5 rounded-full bg-gold text-ink font-semibold px-5 py-3.5 shadow-lg shadow-black/25 hover:bg-[#D6B57A] hover:scale-105 transition"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="4.5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3 9h18M8 2.5v4M16 2.5v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
      <span>Book Now</span>
    </Link>
  );
}
