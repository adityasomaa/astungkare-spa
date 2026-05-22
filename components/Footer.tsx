import Link from "next/link";
import { Logo } from "@/components/Logo";
import { site } from "@/lib/site";
import { PolicyLink } from "@/components/PolicyModal";

export function Footer() {
  return (
    <footer className="bg-ink text-cream on-dark py-20">
      <div className="container-edge grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12">
        <div>
          <Logo variant="horizontal" size={40} color="cream" />
          <p className="mt-6 text-sm text-cream/55 leading-relaxed max-w-xs">
            {site.description}
          </p>
        </div>

        <div>
          <p className="eyebrow text-gold mb-4">Treatments</p>
          <ul className="space-y-2.5 text-sm text-cream/70">
            <li><Link href="/services/balinese-massage" className="hover:text-cream">Balinese</Link></li>
            <li><Link href="/services/hot-stone-massage" className="hover:text-cream">Hot Stone</Link></li>
            <li><Link href="/services/lymphatic-massage" className="hover:text-cream">Lymphatic</Link></li>
            <li><Link href="/services/deep-tissue-massage" className="hover:text-cream">Deep Tissue</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold mb-4">Areas</p>
          <ul className="space-y-2.5 text-sm text-cream/70">
            <li><Link href="/areas/canggu" className="hover:text-cream">Canggu</Link></li>
            <li><Link href="/areas/seminyak" className="hover:text-cream">Seminyak</Link></li>
            <li><Link href="/areas/ubud" className="hover:text-cream">Ubud</Link></li>
            <li><Link href="/areas/badung" className="hover:text-cream">Greater Badung</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold mb-4">Contact</p>
          <ul className="space-y-2.5 text-sm text-cream/70">
            <li>
              <a href={`https://wa.me/${site.whatsapp}`} className="hover:text-cream">WhatsApp · {site.whatsappDisplay}</a>
            </li>
            <li>
              <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-cream">Instagram</a>
            </li>
            <li>
              <a href={site.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-cream">Facebook</a>
            </li>
            <li className="text-cream/55 mt-4 text-xs leading-relaxed">
              {site.address.street}<br />
              {site.address.locality}, Bali {site.address.postalCode}
            </li>
          </ul>
        </div>
      </div>

      <div className="container-edge mt-16 pt-8 border-t border-cream/10 flex flex-wrap justify-between gap-4 text-[11px] text-cream/40 tracking-wide uppercase">
        <span>© {new Date().getFullYear()} Astungkare Spa</span>
        <div className="flex flex-wrap gap-6">
          <span className="text-cream/50"><PolicyLink policy="cancellation">Cancellation</PolicyLink></span>
          <span className="text-cream/50"><PolicyLink policy="conduct">Professional Conduct</PolicyLink></span>
          <Link href="/policies" className="hover:text-cream/70">All Policies</Link>
          <Link href="/about" className="hover:text-cream/70">About</Link>
        </div>
      </div>
    </footer>
  );
}
