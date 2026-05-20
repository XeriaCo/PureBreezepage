import React from "react";

/**
 * PureBreeze spiral mark — five flowing comma blades that swirl
 * inward around a soft centre. Alternates deep navy and pale blue
 * to match the brand palette. Rendered inline as SVG so it stays
 * crisp at any size and inherits the theme.
 */

// A single comma/teardrop blade.
// Drawn pointing UP from the centre (0,0). Tail at centre, fat
// head at the top, curling slightly clockwise.
const BLADE_PATH =
  "M 0 0 " +
  "C -3 -12, 6 -28, 22 -34 " +
  "C 36 -38, 46 -28, 42 -14 " +
  "C 38 -4, 28 -2, 20 -6 " +
  "C 12 -10, 4 -6, 0 0 Z";

function SpiralMark({ size = 32, variant = "light" }) {
  const isDark = variant === "dark";

  // Brand colours — match the supplied logo
  const navy   = isDark ? "#FFFFFF" : "#0A2A4E";
  const navy2  = isDark ? "#E5EEF8" : "#112B4D";
  const blue   = isDark ? "#BFD4EE" : "#7BA6D9";
  const blue2  = isDark ? "#9BC0E0" : "#92B5DA";
  const accent = isDark ? "#FFFFFF" : "#1F5AA8";

  // Subtle gradient adds a touch of depth on each blade
  const gradients = (
    <defs>
      <linearGradient id="pb-navy" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%"  stopColor={navy2} />
        <stop offset="100%" stopColor={navy} />
      </linearGradient>
      <linearGradient id="pb-blue" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%"  stopColor={blue2} />
        <stop offset="100%" stopColor={blue} />
      </linearGradient>
    </defs>
  );

  // 5 blades, alternating colour, rotated 72° each.
  const blades = [
    { rot: 0,   fill: "url(#pb-navy)" },
    { rot: 72,  fill: "url(#pb-blue)" },
    { rot: 144, fill: "url(#pb-navy)" },
    { rot: 216, fill: "url(#pb-blue)" },
    { rot: 288, fill: "url(#pb-navy)" },
  ];

  return (
    <svg
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="block flex-shrink-0"
    >
      {gradients}
      <g>
        {blades.map((b, i) => (
          <g key={i} transform={`rotate(${b.rot})`}>
            <path d={BLADE_PATH} fill={b.fill} />
          </g>
        ))}
        {/* Small accent dot in the centre */}
        <circle cx="0" cy="0" r="1.6" fill={accent} />
      </g>
    </svg>
  );
}

export const PureBreezeLogo = ({
  size = 32,
  showWordmark = false,
  showTagline = false,
  variant = "light",
}) => {
  const isDark = variant === "dark";
  const textColor = isDark ? "text-white"  : "text-[#0A2A4E]";
  const subColor  = isDark ? "text-white/55" : "text-[#7BA6D9]";

  return (
    <div className="flex items-center gap-3" data-testid="purebreeze-logo">
      <SpiralMark size={size} variant={variant} />

      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span
            className={`${textColor} font-display font-medium tracking-[0.22em] uppercase`}
            style={{ fontSize: Math.round(size * 0.46) }}
          >
            PureBreeze
          </span>
          {showTagline && (
            <span
              className={`${subColor} mt-2 font-display tracking-[0.36em] uppercase whitespace-nowrap`}
              style={{ fontSize: Math.max(9, Math.round(size * 0.18)) }}
            >
              — Luxury Air Con Cleaning —
            </span>
          )}
        </div>
      )}
    </div>
  );
};

/** Full lock-up (mark + wordmark + tagline) — for hero plates, footers, splash. */
export function PureBreezeLockup({ size = 64, variant = "light" }) {
  return <PureBreezeLogo size={size} showWordmark showTagline variant={variant} />;
}

export default PureBreezeLogo;
