/**
 * Hero illustration — large lotus + radiating rings, organic.
 * Pure SVG, brand-coloured, animated by HeroAnimation via [data-h-petal].
 */
export function HeroArt() {
  return (
    <svg
      viewBox="0 0 480 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden
    >
      <defs>
        <radialGradient id="hero-glow" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#C9A567" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#C9A567" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#C9A567" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hero-petal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E0C387" />
          <stop offset="100%" stopColor="#A8854A" />
        </linearGradient>
        <linearGradient id="hero-petal-soft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9A567" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#A8854A" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      {/* atmospheric glow */}
      <rect x="0" y="0" width="480" height="600" fill="url(#hero-glow)" />

      {/* concentric rings */}
      <g stroke="#C9A567" fill="none" strokeWidth="0.6" opacity="0.35">
        <circle cx="240" cy="330" r="200" />
        <circle cx="240" cy="330" r="150" />
        <circle cx="240" cy="330" r="100" />
        <circle cx="240" cy="330" r="60" />
      </g>

      {/* horizon line */}
      <line x1="40" y1="330" x2="440" y2="330" stroke="#C9A567" strokeWidth="0.5" opacity="0.35" strokeDasharray="2 6" />

      {/* lotus — 5 petals stroked, light-on-dark */}
      <g
        transform="translate(240 330) scale(2.6) translate(-50 -50)"
        stroke="url(#hero-petal)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path data-h-petal d="M50 18 C 38 36, 38 60, 50 78 C 62 60, 62 36, 50 18 Z" />
        <path data-h-petal d="M50 50 C 30 42, 13 52, 15 74 C 38 74, 47 64, 50 58 Z" />
        <path data-h-petal d="M50 50 C 70 42, 87 52, 85 74 C 62 74, 53 64, 50 58 Z" />
        <path data-h-petal opacity="0.5" d="M50 50 C 22 32, 6 38, 4 64 C 28 70, 42 62, 50 56 Z" />
        <path data-h-petal opacity="0.5" d="M50 50 C 78 32, 94 38, 96 64 C 72 70, 58 62, 50 56 Z" />
      </g>

      {/* small ornament petals — floating */}
      <g fill="url(#hero-petal-soft)" opacity="0.7">
        <path d="M390 130 C 397 125, 405 132, 402 142 C 396 145, 390 142, 388 138 Z" />
        <path d="M70 470 C 78 466, 86 472, 84 481 C 78 485, 71 482, 69 478 Z" />
        <path d="M410 460 C 417 457, 423 462, 421 470 C 416 472, 410 470, 408 466 Z" />
      </g>

      {/* base script label */}
      <text x="240" y="555" textAnchor="middle" fill="#C9A567" opacity="0.55" fontFamily="ui-serif, Georgia, serif" fontStyle="italic" fontSize="13" letterSpacing="6">
        — astungkara —
      </text>
      <text x="240" y="575" textAnchor="middle" fill="#F4EFE7" opacity="0.35" fontFamily="ui-sans-serif, system-ui" fontSize="9" letterSpacing="4">
        IN HOPE THAT IT UNFOLDS
      </text>
    </svg>
  );
}
