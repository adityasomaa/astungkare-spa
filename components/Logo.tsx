import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "horizontal" | "mark" | "wordmark";
  size?: number; // height in px (width auto)
  color?: "gold" | "cream" | "ink";
  className?: string;
  priority?: boolean;
}

/**
 * Astungkare Spa logo.
 * - "horizontal": full PNG lotus + ASTUNGKARE SPA wordmark (use in header / footer)
 * - "mark": SVG lotus only (favicons, small spaces, hover states)
 * - "wordmark": text only (rare — fallback)
 */
export function Logo({ variant = "horizontal", size = 40, color = "gold", className, priority = false }: LogoProps) {
  if (variant === "horizontal") {
    // ratio of source asset: 325 × 219
    const w = Math.round(size * (325 / 219));
    return (
      <Image
        src="/brand/logo.png"
        alt="Astungkare Spa"
        width={w}
        height={size}
        priority={priority}
        className={cn(
          color === "cream" && "brightness-0 invert opacity-95",
          color === "ink" && "brightness-0",
          className
        )}
      />
    );
  }

  const stroke = color === "gold" ? "#C9A567" : color === "cream" ? "#F4EFE7" : "#1A1715";

  if (variant === "wordmark") {
    return (
      <span
        className={cn(
          "font-serif font-light tracking-[0.34em]",
          color === "gold" && "text-[#A8854A]",
          color === "cream" && "text-cream",
          color === "ink" && "text-ink",
          className
        )}
        style={{ fontSize: size * 0.35 }}
      >
        ASTUNGKARE
      </span>
    );
  }

  // mark — five-petal lotus SVG (for tiny spots, icons, ornament)
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className} aria-label="Astungkare Spa">
      <g stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M50 22 C 40 38, 40 60, 50 76 C 60 60, 60 38, 50 22 Z" />
        <path d="M50 50 C 32 44, 17 54, 19 72 C 38 73, 47 64, 50 58 Z" />
        <path d="M50 50 C 68 44, 83 54, 81 72 C 62 73, 53 64, 50 58 Z" />
        <path d="M50 50 C 28 35, 12 38, 8 58 C 28 64, 42 60, 50 54 Z" opacity="0.4" />
        <path d="M50 50 C 72 35, 88 38, 92 58 C 72 64, 58 60, 50 54 Z" opacity="0.4" />
      </g>
    </svg>
  );
}
