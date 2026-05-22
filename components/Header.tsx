import Link from "next/link";
import { Logo } from "@/components/Logo";
import { quickWaUrl } from "@/lib/whatsapp";

const nav = [
  { href: "/#services", label: "Treatments" },
  { href: "/#areas", label: "Areas" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" }
];

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="container-edge flex items-center justify-between py-6">
        <Link href="/" aria-label="Astungkare Spa home" className="shrink-0">
          <Logo variant="horizontal" size={36} color="gold" />
        </Link>

        <nav className="hidden md:flex items-center gap-9 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink/70 hover:text-ink transition-colors tracking-wide"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={quickWaUrl("Hi Astungkare Spa — I'd like to ask about a treatment.")}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 rounded-full bg-ink text-cream px-5 py-2.5 text-sm font-medium hover:bg-emerald transition-colors"
        >
          Book via WhatsApp
          <span aria-hidden>→</span>
        </a>
      </div>
    </header>
  );
}
