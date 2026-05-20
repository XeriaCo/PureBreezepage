import React from "react";
import { motion } from "framer-motion";
import { Wind, Activity, AlertCircle, Droplets, Zap, FileWarning } from "lucide-react";

const FACTS = [
  {
    icon: <Droplets size={18} strokeWidth={1.4} />,
    title: "Black mould spores",
    stat: "3×",
    body: "A neglected split system can harbour three times more mould spores than a typical toilet seat — circulated through your home with every cycle.",
    source: "ASHRAE indoor air study",
  },
  {
    icon: <Zap size={18} strokeWidth={1.4} />,
    title: "Electrical fire risk",
    stat: "1 in 9",
    body: "Australian fire reports link one in nine residential AC fires to excessive dust around electrical components.",
    source: "Qld Fire & Emergency",
  },
  {
    icon: <Activity size={18} strokeWidth={1.4} />,
    title: "Asthma & allergies",
    stat: "+62%",
    body: "Homes with neglected systems report 62% more asthma flare-ups and chronic sinus issues, especially among children.",
    source: "Asthma Australia, 2023",
  },
  {
    icon: <Wind size={18} strokeWidth={1.4} />,
    title: "Quarterly power waste",
    stat: "+35%",
    body: "Dust-coated coils force your unit to work harder, increasing your power bill by up to 35% per quarter in Queensland.",
    source: "Energy Queensland",
  },
  {
    icon: <AlertCircle size={18} strokeWidth={1.4} />,
    title: "Legionella bacteria",
    stat: "Fatal",
    body: "Stagnant drain trays can breed Legionella — a potentially fatal lung bacterium for the elderly and immunocompromised.",
    source: "NSW Health advisory",
  },
  {
    icon: <FileWarning size={18} strokeWidth={1.4} />,
    title: "Voided warranty",
    stat: "Zero",
    body: "Most manufacturers void your warranty unless the unit is professionally cleaned at least once every twelve months.",
    source: "Daikin & Mitsubishi T&Cs",
  },
];

export default function ScaryFacts() {
  return (
    <section
      id="danger"
      className="relative bg-navy-deep text-white overflow-hidden"
      data-testid="scary-facts-section"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-32 lg:py-40 relative">

        <div className="grid lg:grid-cols-12 gap-12 items-end mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-px bg-[#7BA6D9]" />
              <span className="eyebrow text-[#7BA6D9]">What hides inside</span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-white leading-[1.0] tracking-tight">
              The unseen
              <br />
              <span className="serif-italic text-[#7BA6D9]">case for cleaning.</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 text-lg text-white/70 leading-[1.75] font-light"
          >
            Every cycle of a neglected air conditioner moves more than air.
            These are not scare tactics — they are documented Australian
            facts. Quietly worth knowing.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {FACTS.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="relative bg-navy-deep p-10 lg:p-12 hover:bg-[#08213F] transition-colors"
              data-testid={`scary-fact-${i}`}
            >
              <div className="flex items-start justify-between mb-8">
                <span className="text-[#7BA6D9]">{f.icon}</span>
                <span className="font-display text-4xl text-[#7BA6D9] font-light tracking-tight">
                  {f.stat}
                </span>
              </div>
              <h3 className="font-display text-xl text-white font-normal tracking-tight mb-3">
                {f.title}
              </h3>
              <p className="text-[14px] text-white/65 leading-[1.7] font-light">
                {f.body}
              </p>
              <p className="mt-8 pt-5 border-t border-white/10 text-[10px] uppercase tracking-[0.24em] text-white/40">
                {f.source}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-8 py-12 border-t border-b border-white/15"
          data-testid="scary-cta-banner"
        >
          <div>
            <div className="eyebrow text-[#7BA6D9] mb-3">The remedy</div>
            <h3 className="font-display text-3xl sm:text-4xl text-white font-light tracking-tight max-w-xl leading-tight">
              Restore the quiet, clean air<br /> your home was designed for.
            </h3>
          </div>
          <a
            href="#book"
            className="inline-flex items-center gap-3 bg-white text-[#0A2A4E] hover:bg-[#F2F7FD] px-8 py-5 text-[12px] uppercase tracking-[0.24em] font-medium btn-lift whitespace-nowrap"
            data-testid="scary-cta-button"
          >
            Schedule a Service
            <span className="text-lg">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
