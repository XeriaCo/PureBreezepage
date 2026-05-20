import React from "react";
import { motion } from "framer-motion";
import { Wind, Sparkles, Snowflake, ShieldCheck } from "lucide-react";

const BENEFITS = [
  {
    icon: <Wind size={28} strokeWidth={1.2} />,
    title: "Deep clean",
    sub: "We remove the hidden contaminants.",
  },
  {
    icon: <Sparkles size={28} strokeWidth={1.2} />,
    title: "Better living",
    sub: "Cleaner air for your family, staff and customers.",
  },
  {
    icon: <Snowflake size={28} strokeWidth={1.2} />,
    title: "Lasting impact",
    sub: "Restored performance. Proven results.",
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1.2} />,
    title: "Trusted experts",
    sub: "Hospital-grade process. Local team you can rely on.",
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="relative py-20 lg:py-24 bg-frost" data-testid="benefits-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-[#DCE7F3]">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="px-6 lg:px-10 py-10 text-center"
              data-testid={`benefit-card-${i}`}
            >
              <div className="mx-auto w-14 h-14 flex items-center justify-center text-[#1F5AA8] mb-6">
                {b.icon}
              </div>
              <div className="font-display text-lg text-[#0A2A4E] font-medium tracking-tight mb-3">{b.title}</div>
              <p className="text-[13px] text-[#5A6B82] leading-[1.65] font-light max-w-[24ch] mx-auto">{b.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
