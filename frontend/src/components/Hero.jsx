import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ArrowRight, Star } from "lucide-react";
import { EASE } from "@/lib/anim";

const container = {
  hidden: {},
  show: { transition: { delayChildren: 0.25, staggerChildren: 0.14 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden min-h-[100vh] flex flex-col"
      data-testid="hero-section"
    >
      {/* Full-bleed cinematic backdrop with slow Ken Burns drift + scroll parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div style={{ y: bgY }} className="absolute inset-[-6%]">
          <motion.img
            src="/webbackground.png"
            alt="PureBreeze — modern office with pristine ceiling cassette air conditioning"
            className="absolute inset-0 w-full h-full object-cover"
            fetchpriority="high"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.4, ease: EASE }}
          />
        </motion.div>
        {/* Right-side veil only — keeps the wall logo on the left completely clean */}
        <div className="absolute inset-y-0 left-[40%] right-0 bg-gradient-to-l from-[#061A33]/80 via-[#061A33]/45 to-transparent" />
        {/* Subtle bottom edge for the trust row */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#061A33]/55 to-transparent" />
      </div>

      <div className="flex-1" />

      <motion.div style={{ opacity: contentOpacity }} className="relative z-10 w-full pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10 grid grid-cols-12">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="col-span-12 lg:col-start-7 lg:col-span-6 text-white"
          >
            <motion.div variants={item} className="mb-5 inline-flex items-center gap-3">
              <span className="w-10 h-px bg-[#BFD4EE]/70" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#BFD4EE] font-medium">
                Luxury air-con cleaning · Queensland
              </span>
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[4.6rem] leading-[1.05] font-medium tracking-tight">
              <motion.span variants={item} className="block">Cleaner air.</motion.span>
              <motion.span variants={item} className="block text-[#BFD4EE] font-light-display">
                Higher standard.
              </motion.span>
            </h1>

            <motion.p
              variants={item}
              className="mt-6 text-base sm:text-lg text-white/85 leading-[1.65] font-light max-w-md"
              data-testid="hero-subtitle"
            >
              Hospital-grade deep cleans for split systems, ducted runs
              and commercial AC. Breathe easy — every day.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-5" data-testid="hero-ctas">
              <a
                href="#book"
                className="group pill bg-white text-[#0A2A4E] hover:bg-[#F2F7FD] btn-lift px-7 py-4"
                data-testid="hero-cta-quote"
              >
                Book your clean
                <ArrowRight size={14} strokeWidth={1.6} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="tel:0490205298"
                className="flex items-center gap-2.5 text-sm text-white font-medium border-b border-white/40 hover:border-white pb-1 transition-colors"
                data-testid="hero-cta-call"
              >
                <Phone size={14} strokeWidth={1.6} />
                0490 205 298
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div variants={item} className="mt-10 pt-5 border-t border-white/15 flex flex-wrap items-center gap-x-7 gap-y-2.5 text-white/85">
              <div className="flex items-center gap-2" data-testid="hero-trust-rating">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + i * 0.08, duration: 0.4, ease: EASE }}
                    >
                      <Star size={12} fill="#BFD4EE" stroke="#BFD4EE" strokeWidth={0} />
                    </motion.span>
                  ))}
                </div>
                <span className="text-sm font-medium">4.9</span>
                <span className="text-[11px] text-white/60">· 380+ reviews</span>
              </div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/60 font-medium">$20M Insured</div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/60 font-medium">Same-day</div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/60 font-medium">HVAC certified</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#services"
        aria-label="Scroll to services"
        className="hidden md:flex absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll</span>
        <motion.span
          className="block w-px h-8 bg-gradient-to-b from-white/70 to-transparent"
          animate={{ scaleY: [1, 0.45, 1], opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.a>
    </section>
  );
}
