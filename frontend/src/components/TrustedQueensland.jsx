import React from "react";
import { motion } from "framer-motion";
import { Home, Calendar, ShieldCheck, MapPin } from "lucide-react";

const STATS = [
  { icon: <Home size={20} strokeWidth={1.4} />,        value: "4,200+",  label: "Cleans completed" },
  { icon: <Calendar size={20} strokeWidth={1.4} />,    value: "5+",      label: "Years in business" },
  { icon: <ShieldCheck size={20} strokeWidth={1.4} />, value: "100%",    label: "Satisfaction focused" },
  { icon: <MapPin size={20} strokeWidth={1.4} />,      value: "QLD-wide",label: "Local. Reliable." },
];

// Approximate pin positions (% within the SVG viewBox) — Brisbane, Gold Coast, Sunshine Coast, Toowoomba, Cairns
const PINS = [
  { x: 78, y: 78, label: "Brisbane", primary: true },
  { x: 84, y: 86 },
  { x: 76, y: 70 },
  { x: 68, y: 78 },
  { x: 52, y: 28 },
  { x: 58, y: 50 },
];

export default function TrustedQueensland() {
  return (
    <section className="relative py-24 lg:py-32 bg-frost" data-testid="trusted-qld-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10">

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <h2 className="font-display text-4xl sm:text-5xl text-[#0A2A4E] font-medium tracking-tight leading-[1.1]">
              Trusted across <span className="text-[#7BA6D9] font-light-display">Queensland.</span>
            </h2>
            <p className="mt-5 text-base text-[#5A6B82] leading-[1.7] font-light max-w-lg">
              Proudly servicing homes and businesses with care and precision.
            </p>

            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="text-center"
                  data-testid={`qld-stat-${i}`}
                >
                  <div className="mx-auto w-12 h-12 rounded-full bg-white border border-[#DCE7F3] flex items-center justify-center text-[#1F5AA8] mb-4 shadow-card">
                    {s.icon}
                  </div>
                  <div className="font-display text-xl text-[#0A2A4E] font-medium tracking-tight">{s.value}</div>
                  <div className="text-[12px] text-[#5A6B82] font-light mt-1.5">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-square max-w-[420px] mx-auto">
              {/* Stylised QLD outline */}
              <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden>
                <defs>
                  <pattern id="dots" x="0" y="0" width="2.6" height="2.6" patternUnits="userSpaceOnUse">
                    <circle cx="1.3" cy="1.3" r="0.55" fill="#BFD4EE" />
                  </pattern>
                </defs>
                {/* Approximation of Queensland's outline */}
                <path
                  d="M 28 18 L 38 14 L 50 12 L 62 18 L 72 16 L 80 22 L 88 32 L 90 46 L 86 60 L 82 72 L 78 80 L 84 86 L 84 92 L 76 94 L 64 88 L 56 90 L 48 92 L 40 88 L 34 80 L 28 74 L 22 68 L 22 52 L 24 38 L 26 28 Z"
                  fill="url(#dots)"
                  stroke="#7BA6D9"
                  strokeWidth="0.4"
                  strokeOpacity="0.4"
                />
              </svg>

              {/* Pins */}
              {PINS.map((p, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <span className="map-pin" />
                  {p.primary && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#0A2A4E] text-white text-[10px] uppercase tracking-[0.22em] font-medium px-3 py-1.5 rounded-full whitespace-nowrap">
                      {p.label}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
