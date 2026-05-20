import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 14200, suffix: "+",  label: "Jobs delivered",   sub: "across Queensland" },
  { value: 9600,  suffix: "+",  label: "Households served", sub: "breathing cleaner air" },
  { value: 4.9,   suffix: "/5", decimals: 1, label: "Average review",   sub: "from 380+ ratings" },
  { value: 60,    suffix: " min", label: "Average service",   sub: "for most split systems" },
];

function useCountUp(target, duration = 1800, decimals = 0, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const begin = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - begin) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Number((eased * target).toFixed(decimals)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, decimals, start]);
  return val;
}

function StatCard({ stat, start, index }) {
  const v = useCountUp(stat.value, 1800, stat.decimals || 0, start);
  const display = stat.decimals ? v.toFixed(stat.decimals) : Math.round(v).toLocaleString();
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="text-center px-6 py-8"
    >
      <div className="font-display text-4xl lg:text-5xl text-[#0A2A4E] font-medium tracking-tight leading-none">
        {display}<span className="text-[#7BA6D9] text-2xl lg:text-3xl">{stat.suffix}</span>
      </div>
      <div className="mt-4 font-display text-sm text-[#0A2A4E] font-medium tracking-tight">{stat.label}</div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[#8597AE] font-light">{stat.sub}</div>
    </motion.div>
  );
}

export default function StatsCounter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <section ref={ref} className="relative py-16 bg-white border-y border-[#E5ECF4]" data-testid="stats-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E5ECF4]">
          {STATS.map((s, i) => <StatCard key={s.label} stat={s} index={i} start={inView} />)}
        </div>
      </div>
    </section>
  );
}
