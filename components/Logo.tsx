import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "mark" | "horizontal" | "stack";
  size?: number;
  color?: "gold" | "cream" | "ink";
  className?: string;
}

export function Logo({ variant = "horizontal", size = 40, color = "gold", className }: LogoProps) {
  const stroke = color === "gold" ? "#A8854A" : color === "cream" ? "#F4EFE7" : "#1A1715";
  const text = color === "gold" ? "text-[#A8854A]" : color === "cream" ? "text-cream" : "text-ink";

  const lotus = (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden>
      <g stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 25 C 40 40, 40 60, 50 75 C 60 60, 60 40, 50 25 Z" />
        <path d="M50 50 C 32 45, 18 55, 20 72 C 38 73, 47 65, 50 58 Z" />
        <path d="M50 50 C 68 45, 82 55, 80 72 C 62 73, 53 65, 50 58 Z" />
        {variant !== "mark" && <path d="M22 75 L 78 75" strokeOpacity=".5" />}
      </g>
    </svg>
  );

  if (variant === "mark") {
    return <span className={cn("inline-flex", className)}>{lotus}</span>;
  }

  if (variant === "stack") {
    return (
      <span className={cn("inline-flex flex-col items-center gap-2", className)}>
        {lotus}
        <span className={cn("font-serif font-light tracking-[0.36em] text-sm", text)}>ASTUNGKARE</span>
        <span className={cn("text-[9px] tracking-[0.5em]", text, "opacity-70 -mt-1")}>· SPA ·</span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      {lotus}
      <span className="flex flex-col leading-none">
        <span className={cn("font-serif font-light tracking-[0.34em] text-base", text)}>ASTUNGKARE</span>
        <span className={cn("text-[8px] tracking-[0.5em] mt-1", text, "opacity-60")}>SPA · BALI</span>
      </span>
    </span>
  );
}
