import React from "react";

/**
 * Animated PureBreeze logo mark: an AC unit with blue breeze streams.
 * Pure SVG + CSS animation (scales and sizes via width prop).
 */
export const PureBreezeLogo = ({ size = 48, showWordmark = true }) => {
  return (
    <div className="flex items-center gap-3" data-testid="purebreeze-logo">
      <div
        className="relative"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 64 64"
          width={size}
          height={size}
          className="float-y"
        >
          <defs>
            <linearGradient id="pb-ac-body" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>
            <linearGradient id="pb-ac-breeze" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* AC body */}
          <rect
            x="6" y="14" width="42" height="20" rx="5"
            fill="url(#pb-ac-body)"
            stroke="#0EA5E9" strokeWidth="1.6"
          />
          {/* louvres */}
          <line x1="10" y1="28" x2="44" y2="28" stroke="#7DD3FC" strokeWidth="1.2" />
          <line x1="10" y1="31" x2="44" y2="31" stroke="#7DD3FC" strokeWidth="1.2" />
          {/* brand dot */}
          <circle cx="42" cy="20" r="1.6" fill="#0EA5E9" />

          {/* breeze streams */}
          <g>
            <rect className="breeze-stream" x="48" y="20" width="12" height="2" rx="1" fill="url(#pb-ac-breeze)" style={{ animationDelay: "0s" }} />
            <rect className="breeze-stream" x="48" y="25" width="16" height="2" rx="1" fill="url(#pb-ac-breeze)" style={{ animationDelay: "0.6s" }} />
            <rect className="breeze-stream" x="48" y="30" width="10" height="2" rx="1" fill="url(#pb-ac-breeze)" style={{ animationDelay: "1.2s" }} />
          </g>
        </svg>
      </div>

      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className="font-display font-bold text-xl tracking-tight text-slate-900">
            Pure<span className="text-sky-500">Breeze</span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-sky-600 font-medium mt-0.5">
            QLD · AC Cleaning
          </span>
        </div>
      )}
    </div>
  );
};

export default PureBreezeLogo;
