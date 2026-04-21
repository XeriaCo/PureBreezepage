import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Wrench, Users, Star, Clock } from "lucide-react";

const STATS = [
  { icon: <Wrench size={22} />, value: 14200, suffix: "+", label: "Jobs completed", sub: "across Queensland" },
  { icon: <Users size={22} />,  value: 9600,  suffix: "+", label: "Happy households", sub: "breathing cleaner air" },
  { icon: <Star size={22} />,   value: 4.9,   suffix: "/5", decimals: 1, label: "Average rating", sub: "from 380+ reviews" },
  { icon: <Clock size={22} />,  value: 60,    suffix: " min", label: "Avg. on-site time", sub: "most split systems" },
];

function useCountUp(target, duration = 1600, decimals = 0, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const begin = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - begin) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setVal(Number((eased * target).toFixed(decimals)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, decimals, start]);
  return val;
}

function StatCard({ stat, start, index }) {
  const val = useCountUp(stat.value, 1600 + index * 150, stat.decimals || 0, start);
  const display = stat.decimals
    ? val.toFixed(stat.decimals)
    : Math.floor(val).toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group relative rounded-3xl bg-white border border-sky-100 p-7 overflow-hidden btn-lift"
      data-testid={`stat-card-${index}`}
    >
      <div className="absolute -top-10 -right-10 w-36 h-36 bg-sky-100/60 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="w-11 h-11 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-colors">
          {stat.icon}
        </div>
        <div className="mt-5 flex items-baseline gap-1">
          <span className="font-display text-5xl font-black text-slate-900 tracking-tighter">{display}</span>
          <span className="font-display text-2xl font-bold text-sky-500">{stat.suffix}</span>
        </div>
        <div className="mt-2 font-display text-base font-semibold text-slate-900">{stat.label}</div>
        <div className="text-sm text-slate-500">{stat.sub}</div>
      </div>
    </motion.div>
  );
}

export default function StatsCounter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative py-24 bg-white" data-testid="stats-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 border border-sky-100 px-4 py-2 mb-5">
            <span className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
            <span className="text-xs font-bold tracking-widest uppercase text-sky-700">By the numbers</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-slate-900">
            Trusted by Queensland,<br /> <span className="text-sky-500">proven in the numbers.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} start={inView} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
