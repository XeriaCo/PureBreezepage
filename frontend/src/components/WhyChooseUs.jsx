import React from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Clock, Leaf, Users, ThumbsUp } from "lucide-react";

const POINTS = [
  { icon: <Award size={22} />,      title: "Fully qualified technicians",      body: "HVAC-certified, police-checked and uniformed." },
  { icon: <ShieldCheck size={22} />, title: "$20M public liability",           body: "Fully insured — your home, your peace of mind." },
  { icon: <Clock size={22} />,       title: "Same-day service",                body: "Book before noon, clean by sundown across QLD." },
  { icon: <Leaf size={22} />,        title: "Eco-friendly sanitisation",       body: "Biodegradable, pet-safe, zero harsh chemicals." },
  { icon: <Users size={22} />,       title: "100% Queensland-owned",           body: "Local family business — we answer our own phones." },
  { icon: <ThumbsUp size={22} />,    title: "100% satisfaction guarantee",     body: "If you're not wowed, we re-clean free. Simple." },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-white to-sky-50" data-testid="why-choose-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] border border-sky-100 shadow-[0_30px_60px_-20px_rgba(14,165,233,0.3)]">
              <img
                src="https://images.pexels.com/photos/6471913/pexels-photo-6471913.jpeg"
                alt="PureBreeze technician"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="font-display text-2xl font-bold tracking-tight">Meet your technician</div>
                <div className="text-sm text-sky-100">All PureBreeze pros are HVAC-certified & insured.</div>
              </div>
            </div>

            {/* floating card */}
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl border border-sky-100 p-5 shadow-xl max-w-[220px]" data-testid="why-floating-stat">
              <div className="text-xs uppercase tracking-widest text-slate-500">Jobs completed</div>
              <div className="font-display text-3xl font-bold text-sky-600 tracking-tighter">14,200+</div>
              <div className="text-xs text-slate-500">across Queensland</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-sky-100 px-4 py-2 mb-5 shadow-sm">
              <span className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
              <span className="text-xs font-bold tracking-widest uppercase text-sky-700">Why PureBreeze</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tighter text-slate-900 leading-[1.05]">
              Six reasons QLD homes <br /><span className="text-sky-500">trust PureBreeze.</span>
            </h2>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {POINTS.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="flex gap-3 p-4 rounded-2xl bg-white border border-sky-100 btn-lift"
                  data-testid={`why-point-${i}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
                    {p.icon}
                  </div>
                  <div>
                    <div className="font-display text-base font-semibold text-slate-900 tracking-tight">{p.title}</div>
                    <div className="text-sm text-slate-600">{p.body}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
