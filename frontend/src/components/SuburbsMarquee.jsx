import React from "react";

const SUBURBS = [
  "Brisbane", "Gold Coast", "Sunshine Coast", "Toowoomba", "Ipswich",
  "Logan", "Redlands", "Noosa", "Caboolture", "Cairns", "Townsville",
  "Mackay", "Bundaberg", "Hervey Bay", "Rockhampton", "Gladstone",
  "Southport", "Mooloolaba", "Maroochydore", "Coolangatta", "Beenleigh",
];

export default function SuburbsMarquee() {
  const row = [...SUBURBS, ...SUBURBS];
  return (
    <section
      className="relative py-14 bg-white border-y border-[#E5ECF4] overflow-hidden"
      data-testid="suburbs-marquee"
    >
      <div className="text-center mb-8">
        <span className="eyebrow">Serving · Queensland</span>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

      <div className="flex gap-16 animate-marquee whitespace-nowrap">
        {row.map((s, i) => (
          <div key={`${s}-${i}`} className="flex items-center gap-16">
            <span className="font-display text-3xl sm:text-4xl text-[#0A2A4E] font-light tracking-tight">{s}</span>
            <span className="w-1 h-1 rounded-full bg-[#7BA6D9]" />
          </div>
        ))}
      </div>
    </section>
  );
}
