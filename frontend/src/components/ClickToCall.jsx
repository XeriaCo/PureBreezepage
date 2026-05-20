import React from "react";
import { Phone } from "lucide-react";

export default function ClickToCall() {
  return (
    <a
      href="tel:0490205298"
      aria-label="Call PureBreeze"
      data-testid="click-to-call"
      className="fixed bottom-6 left-6 z-40 group flex items-center gap-3 bg-[#0A2A4E] text-white pl-3 pr-5 py-2.5 rounded-full shadow-luxe-lg hover:bg-[#061A33] transition-all"
    >
      <span className="relative">
        <span className="absolute inset-0 rounded-full bg-[#7BA6D9]/50 animate-ping" />
        <span className="relative w-8 h-8 rounded-full bg-[#1F5AA8] flex items-center justify-center">
          <Phone size={13} strokeWidth={1.5} />
        </span>
      </span>
      <span className="hidden sm:flex flex-col leading-none">
        <span className="text-[9px] uppercase tracking-[0.28em] text-white/60 font-medium">Speak with us</span>
        <span className="text-sm font-medium mt-1.5">0490 205 298</span>
      </span>
      <span className="flex sm:hidden text-sm font-medium">Call</span>
    </a>
  );
}
