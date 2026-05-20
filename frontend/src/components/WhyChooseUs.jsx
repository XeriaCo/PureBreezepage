import React from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Clock, Leaf, Users, ThumbsUp } from "lucide-react";

const POINTS = [
  { icon: <Award size={18} strokeWidth={1.4} />,      title: "Certified technicians",   body: "HVAC-qualified, police-checked, uniformed." },
  { icon: <ShieldCheck size={18} strokeWidth={1.4} />, title: "$20M public liability",  body: "Comprehensively insured — full peace of mind." },
  { icon: <Clock size={18} strokeWidth={1.4} />,       title: "Same-day service",       body: "Book before noon for evening completion across QLD." },
  { icon: <Leaf size={18} strokeWidth={1.4} />,        title: "Considered chemistry",   body: "Biodegradable, pet-safe, residue-free agents." },
  { icon: <Users size={18} strokeWidth={1.4} />,       title: "Queensland-owned",       body: "Local family business — we answer our own phones." },
  { icon: <ThumbsUp size={18} strokeWidth={1.4} />,    title: "30-day guarantee",       body: "If you're not quietly delighted, we return free." },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 lg:py-32 bg-white" data-testid="why-choose-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-4xl sm:text-5xl text-[#0A2A4E] font-medium tracking-tight">
            Why <span className="text-[#7BA6D9] font-light-display">PureBreeze.</span>
          </h2>
          <p className="mt-4 text-base text-[#5A6B82] leading-[1.7] font-light">
            Six reasons Queensland homes and businesses choose us.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POINTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="p-7 rounded-2xl bg-white hairline shadow-card btn-lift"
              data-testid={`why-point-${i}`}
            >
              <div className="w-11 h-11 rounded-full bg-[#F2F7FD] flex items-center justify-center text-[#1F5AA8] mb-5">{p.icon}</div>
              <div className="font-display text-base text-[#0A2A4E] font-medium tracking-tight mb-2">{p.title}</div>
              <div className="text-[13px] text-[#5A6B82] font-light leading-[1.65]">{p.body}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
