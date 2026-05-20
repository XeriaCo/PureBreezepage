import React from "react";
import { motion } from "framer-motion";

export default function FoundersNote() {
  return (
    <section className="relative py-32 lg:py-40 bg-white" data-testid="founders-note-section">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className="w-12 h-px bg-[#1F5AA8]" />
            <span className="eyebrow">From the Founder</span>
            <span className="w-12 h-px bg-[#1F5AA8]" />
          </div>

          <blockquote className="text-center">
            <p className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#0A2A4E] font-light leading-[1.3] tracking-tight">
              <span className="serif-italic text-[#7BA6D9]">"</span>
              I started PureBreeze because I watched my mother's asthma worsen for years
              before we discovered the cause was hiding inside her bedroom split system.
              Every clean we deliver is a small return on that quiet promise — that no
              family in Queensland should breathe air they cannot trust.
              <span className="serif-italic text-[#7BA6D9]">"</span>
            </p>
          </blockquote>

          <div className="mt-16 flex items-center justify-center gap-5">
            <div className="w-14 h-14 rounded-full bg-[#0A2A4E] text-white flex items-center justify-center font-display text-lg font-normal">JM</div>
            <div className="text-left">
              <div className="font-display text-lg text-[#0A2A4E] font-normal tracking-tight">James Morrison</div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-[#8597AE] mt-1">Founder · HVAC Lic. QLD-082-415</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
