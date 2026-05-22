import type { Service } from "@/content/services";

interface Props {
  category: Service["category"];
  className?: string;
}

/** Per-category abstract pictogram. Pure SVG, brand palette. */
export function ServiceArt({ category, className }: Props) {
  const common = "w-full h-full";
  switch (category) {
    case "massage":
      return (
        <svg viewBox="0 0 200 200" fill="none" className={`${common} ${className ?? ""}`} aria-hidden>
          {/* hands cradling */}
          <g stroke="#A8854A" strokeWidth="1.5" fill="none" strokeLinecap="round">
            <path d="M50 110 C 50 80, 70 70, 100 70 C 130 70, 150 80, 150 110" opacity="0.7" />
            <path d="M40 130 C 40 95, 65 80, 100 80 C 135 80, 160 95, 160 130" />
            <circle cx="100" cy="115" r="22" fill="#C9A567" opacity="0.18" stroke="none" />
            <circle cx="100" cy="115" r="6" fill="#C9A567" stroke="none" />
            <path d="M60 145 Q 100 165, 140 145" opacity="0.5" />
          </g>
        </svg>
      );
    case "face":
      return (
        <svg viewBox="0 0 200 200" fill="none" className={`${common} ${className ?? ""}`} aria-hidden>
          {/* face contour + petal */}
          <g stroke="#A8854A" strokeWidth="1.5" fill="none" strokeLinecap="round">
            <path d="M65 80 C 65 55, 80 45, 100 45 C 120 45, 135 55, 135 80 L 135 115 C 135 140, 120 155, 100 155 C 80 155, 65 140, 65 115 Z" />
            <circle cx="85" cy="95" r="2.5" fill="#A8854A" stroke="none" />
            <circle cx="115" cy="95" r="2.5" fill="#A8854A" stroke="none" />
            <path d="M88 118 Q 100 128, 112 118" />
            <path d="M100 30 C 90 38, 90 50, 100 60 C 110 50, 110 38, 100 30 Z" fill="#C9A567" opacity="0.4" stroke="none" />
          </g>
        </svg>
      );
    case "scrub":
      return (
        <svg viewBox="0 0 200 200" fill="none" className={`${common} ${className ?? ""}`} aria-hidden>
          {/* bowl + grains */}
          <g stroke="#A8854A" strokeWidth="1.5" fill="none">
            <path d="M40 120 C 40 145, 70 160, 100 160 C 130 160, 160 145, 160 120 Z" fill="#C9A567" fillOpacity="0.18" />
            <ellipse cx="100" cy="120" rx="60" ry="8" />
          </g>
          <g fill="#A8854A">
            <circle cx="80" cy="100" r="2.5" />
            <circle cx="92" cy="92" r="2" />
            <circle cx="105" cy="105" r="2.5" />
            <circle cx="118" cy="95" r="2" />
            <circle cx="125" cy="108" r="2.5" />
            <circle cx="88" cy="115" r="1.8" />
            <circle cx="112" cy="118" r="1.8" />
          </g>
        </svg>
      );
    case "nails":
      return (
        <svg viewBox="0 0 200 200" fill="none" className={`${common} ${className ?? ""}`} aria-hidden>
          {/* polish bottle + brush */}
          <g stroke="#A8854A" strokeWidth="1.5" fill="none" strokeLinecap="round">
            <rect x="80" y="85" width="40" height="65" rx="6" fill="#C9A567" fillOpacity="0.22" />
            <rect x="86" y="70" width="28" height="18" rx="3" />
            <line x1="100" y1="70" x2="100" y2="50" />
            <ellipse cx="100" cy="48" rx="9" ry="4" fill="#A8854A" stroke="none" />
            <path d="M75 130 L 125 130" opacity="0.4" />
          </g>
        </svg>
      );
    case "waxing":
      return (
        <svg viewBox="0 0 200 200" fill="none" className={`${common} ${className ?? ""}`} aria-hidden>
          {/* leaf/herb */}
          <g stroke="#A8854A" strokeWidth="1.5" fill="none" strokeLinecap="round">
            <path d="M100 40 Q 60 80, 80 150 Q 110 110, 100 40 Z" fill="#C9A567" fillOpacity="0.18" />
            <path d="M100 50 L 100 145" opacity="0.5" />
            <path d="M93 75 L 80 75 M 96 95 L 78 95 M 99 115 L 80 113 M 100 132 L 84 132" opacity="0.6" />
          </g>
        </svg>
      );
  }
}
