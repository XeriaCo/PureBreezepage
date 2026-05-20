import React from "react";
import { motion } from "framer-motion";
import { Wind, Activity, AlertCircle, Droplets, Zap, FileWarning } from "lucide-react";

const FACTS = [
  { icon: <Droplets size={18} strokeWidth={1.4} />, title: "Black mould spores", stat: "3×", body: "A neglected split system can harbour three times more mould spores than a typical toilet seat — circulated through your home with every cycle.", source: "ASHRAE indoor air study" },
  { icon: <Zap size={18} strokeWidth={1.4} />,      title: "Electrical fire risk", stat: "1 in 9", body: "Australian fire reports link one in nine residential AC fires to excessive dust around electrical components.", source: "Qld Fire & Emergency" },
  { icon: <Activity size={18} strokeWidth={1.4} />, title: "Asthma & allergies", stat: "+62%", body: "Homes with neglected systems report 62% more asthma flare-ups and chronic sinus issues, especially among children.", source: "Asthma Australia, 2023" },
  { icon: <Wind size={18} strokeWidth={1.4} />,     title: "Quarterly power waste", stat: "+35%", body: "Dust-coated coils force your unit to work harder, increasing your power bill by up to 35% per quarter in Queensland.", source: "Energy Queensland" },
  { icon: <AlertCircle size={18} strokeWidth={1.4} />, title: "Legionella bacteria", stat: "Fatal", body: "Stagnant drain trays can breed Legionella — a potentially fatal lung bacterium for the elderly and immunocompromised.", source: "NSW Health advisory" },
  { icon: <FileWarning size={18} strokeWidth={1.4} />, title: "Voided warranty", stat: "Zero", body: "Most manufacturers void your warranty unless the unit is professionally cleaned at least once every twelve months.", source: "Daikin & Mitsubishi T&Cs" },
];

export default function ScaryFacts() {
  return (
    <section id="danger" className="relative bg-navy-deep text-white overflow-hidden" data-testid="scary-facts-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10 py-24 lg:py-32 relative">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl text-white font-medium tracking-tight">
            What hides <span className="text-[#7BA6D9] font-light-display">inside the air.</span>
          </h2>
          <p className="mt-5 text-base text-white/70 leading-[1.7] font-light">
            These are not scare tactics. They are documented Australian facts — quietly worth knowing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {FACTS.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="relative bg-[#061A33] p-8 lg:p-10 hover:bg-[#08213F] transition-colors"
              data-testid={`scary-fact-${i}`}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-[#7BA6D9]">{f.icon}</span>
                <span className="font-display text-3xl text-[#7BA6D9] font-medium tracking-tight">{f.stat}</span>
              </div>
              <h3 className="font-display text-lg text-white font-medium tracking-tight mb-3">{f.title}</h3>
              <p className="text-[13px] text-white/70 leading-[1.65] font-light">{f.body}</p>
              <p className="mt-6 pt-4 border-t border-white/10 text-[10px] uppercase tracking-[0.24em] text-white/40">{f.source}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-8 rounded-2xl bg-white/5 border border-white/10"
          data-testid="scary-cta-banner"
        >
          <h3 className="font-display text-xl sm:text-2xl text-white font-medium tracking-tight max-w-xl leading-snug">
            Restore the clean, quiet air your home was designed for.
          </h3>
          <a href="#book" className="pill pill-white btn-lift whitespace-nowrap" data-testid="scary-cta-button">
            Book a clean <span className="ml-1.5">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
