import React from "react";
import { Wind } from "lucide-react";

/**
 * Minimal PureBreeze circular mark.
 */
export const PureBreezeLogo = ({ size = 28, showWordmark = false, variant = "light" }) => {
  const isDark = variant === "dark";
  const ring = isDark ? "border-white/30" : "border-[#0A2A4E]";
  const fill = isDark ? "text-white"      : "text-[#0A2A4E]";

  return (
    <div className="flex items-center gap-2" data-testid="purebreeze-logo">
      <div
        className={`flex items-center justify-center rounded-full border ${ring} ${fill}`}
        style={{ width: size, height: size }}
      >
        <Wind size={Math.round(size * 0.46)} strokeWidth={1.5} />
      </div>
      {showWordmark && (
        <span className={`font-display font-medium text-lg tracking-tight ${isDark ? "text-white" : "text-[#0A2A4E]"}`}>
          PureBreeze
        </span>
      )}
    </div>
  );
};

export default PureBreezeLogo;
