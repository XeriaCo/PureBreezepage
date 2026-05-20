import React from "react";
import { motion } from "framer-motion";

export default function FoundersNote() {
  return (
    <section className="relative py-24 lg:py-32 bg-white" data-testid="founders-note-section">
      <div className="max-w-[1000px] mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-10">
            <span className="eyebrow">From the founder</span>
          </div>

          <blockquote className="text-center">
            <p className="font-display text-2xl sm:text-3xl text-[#0A2A4E] font-normal leading-[1.4] tracking-tight">
              "I started PureBreeze because I watched my mother's asthma worsen
              for years before we discovered the cause was hiding inside her
              bedroom split system. Every clean we deliver is a small return
              on that quiet promise — that no family in Queensland should breathe
              air they cannot trust."
            </p>
          </blockquote>

          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#0A2A4E] text-white flex items-center justify-center font-display text-sm font-medium">JM</div>
            <div className="text-left">
              <div className="font-display text-base text-[#0A2A4E] font-medium tracking-tight">James Morrison</div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-[#8597AE] mt-1">Founder · HVAC Lic. QLD-082-415</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
