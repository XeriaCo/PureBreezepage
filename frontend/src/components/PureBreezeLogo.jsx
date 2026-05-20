import React from "react";
import { Wind } from "lucide-react";

/**
 * Minimal PureBreeze mark — refined for the luxury redesign.
 * Default: icon mark only. Pass showWordmark to display name + sub.
 */
export const PureBreezeLogo = ({ size = 40, showWordmark = false, variant = "light" }) => {
  const isDark = variant === "dark";
  const markBg     = isDark ? "bg-white"      : "bg-[#0A2A4E]";
  const markColor  = isDark ? "text-[#0A2A4E]" : "text-white";
  const textColor  = isDark ? "text-white"    : "text-[#0A2A4E]";
  const subColor   = isDark ? "text-white/60" : "text-[#5A6B82]";

  return (
    <div className="flex items-center gap-3" data-testid="purebreeze-logo">
      <div
        className={`flex items-center justify-center ${markBg} ${markColor}`}
        style={{ width: size, height: size }}
      >
        <Wind size={Math.round(size * 0.5)} strokeWidth={1.4} />
      </div>

      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className={`font-display font-normal text-xl tracking-tight ${textColor}`}>
            PureBreeze
          </span>
          <span className={`text-[10px] uppercase tracking-[0.28em] font-medium mt-1 ${subColor}`}>
            Air · Curated
          </span>
        </div>
      )}
    </div>
  );
};

export default PureBreezeLogo;
