import React from "react";
import { motion } from "framer-motion";
import { Leaf, DollarSign, Heart, Moon, Sparkles, Zap } from "lucide-react";

const BENEFITS = [
  { num: "01", icon: <DollarSign size={18} strokeWidth={1.4} />, title: "Energy returned",     body: "Clean coils transfer heat efficiently. Most clients see up to 30% lower running costs from the next quarter." },
  { num: "02", icon: <Heart size={18} strokeWidth={1.4} />,      title: "Healthier rooms",     body: "Mould, bacteria and allergens are removed at source. The air your family breathes becomes the air you trust." },
  { num: "03", icon: <Moon size={18} strokeWidth={1.4} />,       title: "Quieter nights",      body: "A debris-free fan runs near silent. Sleep without the familiar rattling hum of a tired unit." },
  { num: "04", icon: <Zap size={18} strokeWidth={1.4} />,        title: "Icy performance",     body: "Full cooling capacity restored within minutes — exactly as it felt the day your system was installed." },
  { num: "05", icon: <Leaf size={18} strokeWidth={1.4} />,       title: "Considered chemistry",body: "Biodegradable, hospital-grade enzymes. Pet-safe, child-safe, residue-free once dry." },
  { num: "06", icon: <Sparkles size={18} strokeWidth={1.4} />,   title: "Years extended",      body: "Annual professional cleans double the working life of your investment. Quietly, year after year." },
];

export default function Benefits() {
  return (
    <section id="benefits" className="relative py-32 lg:py-40 bg-white" data-testid="benefits-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">

        <div className="grid lg:grid-cols-12 gap-12 items-end mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-px bg-[#1F5AA8]" />
              <span className="eyebrow">The Difference</span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-[#0A2A4E] leading-[1.0] tracking-tight">
              Six quiet improvements
              <br />
              <span className="serif-italic text-[#1F5AA8]">you'll feel</span> by morning.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 text-lg text-[#5A6B82] leading-[1.75] font-light"
          >
            Our signature clean does more than remove dirt. It restores
            the original character of your system — and the original
            calm of your home.
          </motion.p>
        </div>

        {/* Hero image strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full aspect-[16/7] overflow-hidden mb-24 shadow-luxe"
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85"
            alt="Refined interior with quietly cooled air"
            className="absolute inset-0 w-full h-full object-cover img-luxe"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A2A4E]/40 via-[#0A2A4E]/10 to-transparent" />
          <div className="absolute inset-0 flex items-end p-10 sm:p-16">
            <div className="text-white max-w-md">
              <div className="eyebrow text-white/70 mb-3">Before & After</div>
              <p className="font-display text-2xl sm:text-3xl font-light leading-tight">
                "Our split system smells like a brand new unit. The air feels different."
              </p>
              <div className="mt-4 text-xs uppercase tracking-[0.24em] text-white/70">Sarah · New Farm</div>
            </div>
          </div>
        </motion.div>

        {/* Benefits grid — refined */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group"
              data-testid={`benefit-card-${i}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[11px] uppercase tracking-[0.32em] text-[#7BA6D9] font-medium">{b.num}</span>
                <span className="h-px w-8 bg-[#DCE7F3]" />
                <span className="text-[#1F5AA8]">{b.icon}</span>
              </div>
              <h3 className="font-display text-2xl text-[#0A2A4E] mb-3 font-normal tracking-tight">{b.title}</h3>
              <p className="text-[15px] text-[#5A6B82] leading-[1.75] font-light max-w-[28ch]">{b.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
