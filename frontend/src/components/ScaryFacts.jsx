import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "@/lib/anim";

const FACTS = [
  { value: 3,  prefix: "", suffix: "×",  title: "More mould than your toilet seat",
    body: "A neglected split system harbours three times more mould spores — pumped through your home with every cycle." },
  { value: 35, prefix: "+", suffix: "%", title: "Higher power bills",
    body: "Dust-coated coils force your system to work harder, adding up to 35% to your quarterly electricity bill." },
  { value: 62, prefix: "+", suffix: "%", title: "More asthma flare-ups",
    body: "Homes with neglected systems report 62% more asthma and sinus issues — especially in children." },
];

function CountUpStat({ value, prefix, suffix, start }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const duration = 1600;
    const begin = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - begin) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, start]);
  return (
    <span className="font-display text-5xl lg:text-6xl text-[#7BA6D9] font-medium tracking-tight tabular-nums">
      {prefix}{val}{suffix}
    </span>
  );
}

export default function ScaryFacts() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="danger" className="relative bg-navy-deep text-white overflow-hidden" data-testid="scary-facts-section">
      {/* Slow ambient glow */}
      <motion.div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(123,166,217,0.14) 0%, transparent 65%)" }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div ref={ref} className="relative max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10 py-24 lg:py-32">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center max-w-3xl mx-auto mb-14 lg:mb-16"
        >
          <div className="mb-5 inline-flex items-center gap-3">
            <span className="w-8 h-px bg-[#7BA6D9]/60" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#7BA6D9] font-medium">The invisible problem</span>
            <span className="w-8 h-px bg-[#7BA6D9]/60" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-white font-medium tracking-tight">
            What hides <span className="text-[#7BA6D9] font-light-display">inside the air.</span>
          </h2>
          <p className="mt-5 text-base text-white/60 leading-[1.7] font-light max-w-xl mx-auto">
            Your air conditioner recycles the same air hundreds of times a day.
            Whatever is growing inside it, you're breathing.
          </p>
        </motion.div>

        <motion.div
          variants={stagger(0.1, 0.14)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {FACTS.map((f, i) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              className="group p-8 lg:p-10 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-500"
              data-testid={`scary-fact-${i}`}
            >
              <CountUpStat value={f.value} prefix={f.prefix} suffix={f.suffix} start={inView} />
              <h3 className="mt-6 font-display text-lg text-white font-medium tracking-tight">{f.title}</h3>
              <p className="mt-3 text-[13px] text-white/65 leading-[1.75] font-light">{f.body}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 text-center text-sm text-white/45 font-light"
        >
          One deep clean removes all three. <a href="#book" className="text-[#7BA6D9] border-b border-[#7BA6D9]/40 hover:border-[#7BA6D9] transition-colors pb-0.5">Book yours →</a>
        </motion.p>
      </div>
    </section>
  );
}
