import React from "react";
import { MapPin } from "lucide-react";

const SUBURBS = [
  "Brisbane", "Gold Coast", "Sunshine Coast", "Toowoomba", "Ipswich",
  "Logan", "Redlands", "Noosa", "Caboolture", "Cairns", "Townsville",
  "Mackay", "Bundaberg", "Hervey Bay", "Rockhampton", "Gladstone",
  "Southport", "Mooloolaba", "Maroochydore", "Coolangatta", "Beenleigh",
];

export default function SuburbsMarquee() {
  const row = [...SUBURBS, ...SUBURBS]; // duplicate for seamless loop
  return (
    <section
      className="relative py-10 bg-slate-950 text-white overflow-hidden border-y border-slate-800"
      data-testid="suburbs-marquee"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10" />

      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {row.map((s, i) => (
          <div key={`${s}-${i}`} className="flex items-center gap-3 text-sky-200/90">
            <MapPin size={16} className="text-sky-400" />
            <span className="font-display text-lg sm:text-xl font-semibold tracking-tight">{s}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500/60" />
          </div>
        ))}
      </div>
    </section>
  );
}
