import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Skull, Flame, Wind, Activity, Biohazard } from "lucide-react";

const FACTS = [
  {
    icon: <Biohazard size={24} />,
    title: "Black Mould Spores",
    stat: "3x more",
    body: "A dirty split system can harbour 3x more mould spores than a typical toilet seat — pumping them into your lungs every night.",
    source: "ASHRAE indoor air study",
  },
  {
    icon: <Flame size={24} />,
    title: "Electrical Fire Risk",
    stat: "1 in 9",
    body: "Australian fire reports link 1 in 9 residential AC fires to excessive dust build-up around electrical components.",
    source: "Qld Fire & Emergency data",
  },
  {
    icon: <Activity size={24} />,
    title: "Asthma & Allergies",
    stat: "+62%",
    body: "Homes with uncleaned AC units report 62% more asthma flare-ups and chronic sinus issues, especially in children.",
    source: "Asthma Australia 2023",
  },
  {
    icon: <Wind size={24} />,
    title: "Power Bill Explosion",
    stat: "+35%",
    body: "A dusty coil forces your unit to work overtime, spiking your Queensland power bill by up to 35% every quarter.",
    source: "Energy QLD report",
  },
  {
    icon: <Skull size={24} />,
    title: "Legionella Bacteria",
    stat: "Fatal",
    body: "Stagnant water inside drain trays breeds Legionella — a potentially fatal lung bacteria for the elderly and immunocompromised.",
    source: "NSW Health advisory",
  },
  {
    icon: <AlertTriangle size={24} />,
    title: "Voided Warranty",
    stat: "0 cover",
    body: "Most manufacturers void your warranty if you don't professionally clean your unit at least once every 12 months.",
    source: "Daikin, Mitsubishi T&Cs",
  },
];

export default function ScaryFacts() {
  return (
    <section
      id="danger"
      className="relative bg-neutral-950 text-white overflow-hidden"
      data-testid="scary-facts-section"
    >
      {/* red glow orbs */}
      <div className="absolute top-0 -left-40 w-[500px] h-[500px] bg-red-700/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 border border-red-500/30 px-4 py-2 mb-6">
            <AlertTriangle size={14} className="text-red-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-red-400">
              What's Hiding In Your Air
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05]">
            The <span className="text-red-500">scary truth</span> about<br />
            your uncleaned AC.
          </h2>

          <p className="mt-6 text-lg text-neutral-300 max-w-2xl leading-relaxed">
            Every time your air conditioner turns on, it could be pushing mould, bacteria and allergens directly into your lungs.
            These aren't scare tactics — they're documented Australian facts.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FACTS.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative rounded-3xl p-7 border border-red-900/30 bg-neutral-900/60 backdrop-blur hover:border-red-500/50 transition-colors ${
                i === 0 ? "md:col-span-2 lg:col-span-2 lg:row-span-1" : ""
              }`}
              data-testid={`scary-fact-${i}`}
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center">
                  {f.icon}
                </div>
                <span className="font-display text-3xl font-black text-red-500 tracking-tight">
                  {f.stat}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-white tracking-tight">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                {f.body}
              </p>
              <p className="mt-4 text-[10px] uppercase tracking-widest text-neutral-500">
                Source: {f.source}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-3xl bg-gradient-to-r from-red-600 to-red-700 text-white"
          data-testid="scary-cta-banner"
        >
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
              Don't let your AC make your family sick.
            </h3>
            <p className="text-red-100 mt-1 text-sm sm:text-base">
              Get an instant quote in under 60 seconds — no call required.
            </p>
          </div>
          <a
            href="#book"
            className="inline-flex items-center justify-center rounded-full bg-white text-red-700 hover:bg-red-50 px-7 py-3.5 font-bold text-sm shadow-xl btn-lift whitespace-nowrap"
            data-testid="scary-cta-button"
          >
            Book My Clean Now →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
