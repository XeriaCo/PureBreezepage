import React from "react";
import { motion } from "framer-motion";

const FACTS = [
  { stat: "3×",   title: "More mould than your toilet seat",
    body: "A neglected split system harbours three times more mould spores — pumped through your home with every cycle." },
  { stat: "+35%", title: "Higher power bills",
    body: "Dust-coated coils force your system to work harder, adding up to 35% to your quarterly electricity bill." },
  { stat: "+62%", title: "More asthma flare-ups",
    body: "Homes with neglected systems report 62% more asthma and sinus issues — especially in children." },
];

export default function ScaryFacts() {
  return (
    <section id="danger" className="relative bg-navy-deep text-white overflow-hidden" data-testid="scary-facts-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10 py-20 lg:py-24">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <h2 className="font-display text-4xl sm:text-5xl text-white font-medium tracking-tight">
            What hides <span className="text-[#7BA6D9] font-light-display">inside the air.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {FACTS.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-8 lg:p-10 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.06] transition-colors"
              data-testid={`scary-fact-${i}`}
            >
              <div className="font-display text-5xl text-[#7BA6D9] font-medium tracking-tight">{f.stat}</div>
              <h3 className="mt-6 font-display text-lg text-white font-medium tracking-tight">{f.title}</h3>
              <p className="mt-3 text-[13px] text-white/65 leading-[1.7] font-light">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
