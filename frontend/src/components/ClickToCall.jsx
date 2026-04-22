import React from "react";
import { Phone } from "lucide-react";

export default function ClickToCall() {
  return (
    <a
      href="tel:0490507878"
      aria-label="Call PureBreeze"
      data-testid="click-to-call"
      className="fixed bottom-6 left-6 z-40 group flex items-center gap-3 rounded-full bg-slate-900 text-white pl-3 pr-5 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.3)] hover:bg-slate-800 transition-all"
    >
      <span className="relative">
        <span className="absolute inset-0 rounded-full bg-emerald-400/60 animate-ping" />
        <span className="relative w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
          <Phone size={16} />
        </span>
      </span>
      <span className="hidden sm:flex flex-col leading-none">
        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Call us · anytime</span>
        <span className="font-display text-lg font-bold tracking-tight mt-0.5">0490 507 878</span>
      </span>
      <span className="flex sm:hidden font-display text-sm font-bold">Call</span>
    </a>
  );
}
