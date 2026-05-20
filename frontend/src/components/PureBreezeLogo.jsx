import React from "react";

/**
 * PureBreeze spiral mark — 5 swirling blades alternating between
 * deep navy and pale blue, suggesting moving, freshly-cleaned air.
 * Renders inline so it scales crisply and inherits the theme.
 */
function SpiralMark({ size = 32, variant = "light" }) {
  const isDark = variant === "dark";
  const navy  = isDark ? "#FFFFFF" : "#0A2A4E";
  const blue  = isDark ? "#BFD4EE" : "#7BA6D9";
  const accent= isDark ? "#7BA6D9" : "#1F5AA8";

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="block flex-shrink-0"
    >
      <g transform="translate(50,50)">
        {[0, 72, 144, 216, 288].map((rot, i) => (
          <g key={rot} transform={`rotate(${rot})`}>
            <path
              d="M 0 0
                 C -2 -10, 8 -22, 24 -22
                 C 36 -22, 42 -14, 42 -4
                 C 32 -8, 18 -8, 8 -4
                 C 2 -2, 0 0, 0 0 Z"
              fill={i % 2 === 0 ? navy : blue}
              opacity={i % 2 === 0 ? 1 : 0.85}
            />
          </g>
        ))}
        {/* Small accent dot in the centre */}
        <circle cx="0" cy="0" r="2.2" fill={accent} />
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
            className={`${textColor} font-display font-medium tracking-[0.18em] uppercase`}
            style={{ fontSize: Math.round(size * 0.48) }}
          >
            PureBreeze
          </span>
          {showTagline && (
            <span
              className={`${subColor} mt-1.5 font-display tracking-[0.32em] uppercase`}
              style={{ fontSize: Math.max(9, Math.round(size * 0.22)) }}
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
