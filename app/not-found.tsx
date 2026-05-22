import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-cream min-h-[70vh] flex items-center">
        <div className="container-edge text-center">
          <p className="eyebrow mb-4">404</p>
          <h1 className="display text-5xl md:text-7xl mb-6">
            This page is <em>away on retreat.</em>
          </h1>
          <p className="text-ink/65 text-lg mb-10">It went looking for the calm. You can do the same.</p>
          <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-ink text-cream px-7 py-3.5 text-sm hover:bg-emerald transition">
            Back home →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
