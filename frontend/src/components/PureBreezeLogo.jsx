import React from "react";
import { Wind } from "lucide-react";

/**
 * Clean, professional PureBreeze wordmark.
 * Uses a minimal Lucide icon + typeset name — no animation.
 */
export const PureBreezeLogo = ({ size = 40, showWordmark = true, variant = "light" }) => {
  const markBg =
    variant === "dark"
      ? "bg-white border-white/20"
      : "bg-sky-500 border-sky-500";
  const markColor = variant === "dark" ? "text-sky-600" : "text-white";
  const textColor = variant === "dark" ? "text-white" : "text-slate-900";
  const accentColor = variant === "dark" ? "text-sky-400" : "text-sky-600";
  const subColor = variant === "dark" ? "text-sky-300/80" : "text-slate-500";

  return (
    <div className="flex items-center gap-3" data-testid="purebreeze-logo">
      <div
        className={`flex items-center justify-center rounded-xl border ${markBg} ${markColor} shadow-sm`}
        style={{ width: size, height: size }}
      >
        <Wind size={Math.round(size * 0.52)} strokeWidth={2.25} />
      </div>

      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className={`font-display font-semibold text-xl tracking-tight ${textColor}`}>
            Pure<span className={accentColor}>Breeze</span>
          </span>
          <span className={`text-[10px] uppercase tracking-[0.22em] font-medium mt-0.5 ${subColor}`}>
            QLD · AC Cleaning
          </span>
        </div>
      )}
    </div>
  );
};

export default PureBreezeLogo;
