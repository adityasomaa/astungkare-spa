/** Abstract Bali coastline + pin marker. Used on /areas/[slug]. */
export function AreaArt({ tone = "warm" }: { tone?: "warm" | "cool" }) {
  const stroke = tone === "warm" ? "#A8854A" : "#1F3A2E";
  const fill = tone === "warm" ? "#C9A567" : "#1F3A2E";
  return (
    <svg viewBox="0 0 400 240" fill="none" className="w-full h-full" aria-hidden>
      {/* horizon */}
      <line x1="0" y1="120" x2="400" y2="120" stroke={stroke} strokeWidth="0.5" opacity="0.5" strokeDasharray="2 6" />
      {/* terraced rice waves */}
      <g stroke={stroke} strokeWidth="1" fill="none" opacity="0.5">
        <path d="M0 150 Q 80 130, 160 152 T 320 150 T 400 145" />
        <path d="M0 175 Q 80 158, 160 178 T 320 175 T 400 170" />
        <path d="M0 200 Q 80 185, 160 203 T 320 200 T 400 195" />
      </g>
      {/* sun/full moon */}
      <circle cx="300" cy="80" r="34" fill={fill} fillOpacity="0.15" />
      <circle cx="300" cy="80" r="20" fill={fill} fillOpacity="0.25" />
      {/* palm fronds */}
      <g stroke={stroke} strokeWidth="1.5" fill="none" strokeLinecap="round">
        <path d="M70 220 L 70 130" />
        <path d="M70 130 Q 50 120, 40 100" />
        <path d="M70 130 Q 90 120, 100 100" />
        <path d="M70 130 Q 55 130, 35 130" />
        <path d="M70 130 Q 85 130, 105 130" />
      </g>
      {/* pin marker */}
      <g transform="translate(200 95)">
        <circle r="9" fill={fill} />
        <circle r="3.5" fill="#F4EFE7" />
        <path d="M0 9 L 0 22" stroke={fill} strokeWidth="2" />
        <circle cx="0" cy="22" r="2.5" fill={fill} opacity="0.5" />
      </g>
    </svg>
  );
}
