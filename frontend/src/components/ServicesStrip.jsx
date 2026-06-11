import React from "react";
import { motion } from "framer-motion";
import { AirVent, Layers, Building2, SearchCheck, ArrowRight } from "lucide-react";
import { fadeUp, stagger } from "@/lib/anim";

const ITEMS = [
  {
    icon: <AirVent size={28} strokeWidth={1.3} />,
    title: "Split System Cleaning",
    desc: "Deep clean your indoor unit for healthier air, better performance and lower running costs.",
  },
  {
    icon: <Layers size={28} strokeWidth={1.3} />,
    title: "Ducted Cleaning",
    desc: "Remove hidden dust, mould and allergens from your ducted system for cleaner air throughout.",
  },
  {
    icon: <Building2 size={28} strokeWidth={1.3} />,
    title: "Commercial Cleaning",
    desc: "Specialist cleaning for offices, retail and facilities. Minimal disruption, maximum results.",
  },
  {
    icon: <SearchCheck size={28} strokeWidth={1.3} />,
    title: "Air Quality Testing",
    desc: "Measure what you can't see. Professional testing for peace of mind and healthier spaces.",
  },
];

export default function ServicesStrip() {
  return (
    <section className="relative bg-white py-14 lg:py-20" data-testid="services-strip">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          variants={stagger(0.1, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
        >
          {ITEMS.map((it, i) => (
            <motion.a
              key={it.title}
              href="#services"
              variants={fadeUp}
              className="group block p-7 rounded-xl bg-[#FBFDFF] hairline card-hover"
              data-testid={`services-strip-card-${i}`}
            >
              <div className="flex items-start justify-between mb-7">
                <div className="text-[#1F5AA8] transition-transform duration-500 group-hover:-translate-y-0.5">{it.icon}</div>
                <div className="w-9 h-9 rounded-full border border-[#DCE7F3] flex items-center justify-center text-[11px] text-[#1F5AA8] font-medium transition-colors duration-500 group-hover:border-[#1F5AA8]">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <h3 className="text-[12px] uppercase tracking-[0.2em] text-[#0A2A4E] font-semibold">
                {it.title}
              </h3>
              <p className="mt-3 text-[13px] text-[#5A6B82] leading-[1.7] font-light">
                {it.desc}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-[13px] text-[#0A2A4E] font-medium group-hover:text-[#1F5AA8] transition-colors">
                Learn more
                <ArrowRight size={13} strokeWidth={1.8} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
