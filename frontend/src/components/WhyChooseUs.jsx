import React from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Clock, Leaf, Users, ThumbsUp } from "lucide-react";

const POINTS = [
  { icon: <Award size={18} strokeWidth={1.4} />,      title: "Certified technicians",   body: "HVAC-qualified, police-checked, uniformed." },
  { icon: <ShieldCheck size={18} strokeWidth={1.4} />, title: "$20M public liability",  body: "Comprehensively insured for absolute peace of mind." },
  { icon: <Clock size={18} strokeWidth={1.4} />,       title: "Same-day service",       body: "Book before noon for service across QLD by evening." },
  { icon: <Leaf size={18} strokeWidth={1.4} />,        title: "Considered chemistry",   body: "Biodegradable, pet-safe, residue-free agents." },
  { icon: <Users size={18} strokeWidth={1.4} />,       title: "Queensland-owned",       body: "Local family business — we answer our own phones." },
  { icon: <ThumbsUp size={18} strokeWidth={1.4} />,    title: "30-day guarantee",       body: "If you're not quietly delighted, we return free." },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-32 lg:py-40 bg-white" data-testid="why-choose-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden shadow-luxe-lg">
              <img
                src="https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=1100&q=85"
                alt="PureBreeze technician at work"
                className="w-full h-full object-cover img-luxe"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2A4E]/70 via-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="eyebrow text-white/75 mb-3">The Team</div>
                <div className="font-display text-3xl font-light leading-tight">
                  Certified, insured,<br />
                  <span className="serif-italic">and quietly proud.</span>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 sm:-right-10 bg-white p-7 shadow-luxe-lg max-w-[240px]" data-testid="why-floating-stat">
              <div className="eyebrow mb-2">Jobs delivered</div>
              <div className="font-display text-4xl text-[#0A2A4E] font-light tracking-tight">14,200<span className="text-[#7BA6D9] text-2xl">+</span></div>
              <div className="text-xs text-[#5A6B82] mt-2 font-light">across Queensland · since 2019</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-px bg-[#1F5AA8]" />
              <span className="eyebrow">Why PureBreeze</span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-[#0A2A4E] leading-[1.0] tracking-tight">
              Six reasons
              <br />
              <span className="serif-italic text-[#1F5AA8]">Queensland</span> chooses us.
            </h2>

            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
              {POINTS.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="group"
                  data-testid={`why-point-${i}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[#1F5AA8]">{p.icon}</span>
                    <span className="h-px w-8 bg-[#DCE7F3]" />
                  </div>
                  <div className="font-display text-xl text-[#0A2A4E] font-normal tracking-tight mb-1.5">{p.title}</div>
                  <div className="text-[14px] text-[#5A6B82] font-light leading-relaxed">{p.body}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
