import React from "react";

/**
 * PureBreeze brand assets.
 * - SpiralMark renders the cropped /PBMark.png (just the swirl).
 * - PureBreezeLockup renders the full /PBLogo.png (mark + wordmark + tagline).
 * On dark backgrounds the mark inverts to white via CSS filters.
 */

function SpiralMark({ size = 32, variant = "light" }) {
  const isDark = variant === "dark";
  return (
    <img
      src="/PBMark.png"
      alt=""
      width={size}
      height={size}
      className={`block flex-shrink-0 ${isDark ? "brightness-0 invert" : ""}`}
      style={{ width: size, height: size, objectFit: "contain" }}
      aria-hidden="true"
    />
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

/** Full image lockup straight from /PBLogo.png — preserves the exact original design. */
export function PureBreezeLockup({ height = 56, variant = "light", className = "" }) {
  const isDark = variant === "dark";
  return (
    <img
      src="/PBLogo.png"
      alt="PureBreeze · Luxury Air Con Cleaning"
      style={{ height, width: "auto" }}
      className={`block ${isDark ? "brightness-0 invert" : ""} ${className}`}
    />
  );
}

export default PureBreezeLogo;
