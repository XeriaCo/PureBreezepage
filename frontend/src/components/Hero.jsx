import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ArrowRight, Star, ShieldCheck, BadgeCheck } from "lucide-react";
import { EASE } from "@/lib/anim";

const container = {
  hidden: {},
  show: { transition: { delayChildren: 0.25, staggerChildren: 0.13 } },
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
      className="relative overflow-hidden min-h-[100vh] flex items-center bg-[#061A33]"
      data-testid="hero-section"
    >
      {/* Cinematic image panel — anchored right on desktop, full-bleed on mobile */}
      <div className="absolute inset-0 lg:left-[30%] z-0 overflow-hidden">
        <motion.div style={{ y: bgY }} className="absolute inset-[-6%]">
          <motion.img
            src="/hero-bg.jpg"
            alt="Pristine ceiling cassette air conditioning in a modern interior"
            className="absolute inset-0 w-full h-full object-cover"
            fetchpriority="high"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.4, ease: EASE }}
          />
        </motion.div>
        {/* Moody navy wash over the photo */}
        <div className="absolute inset-0 bg-[#061A33]/50" />
        {/* Seam gradient blending into the navy text panel */}
        <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-[#061A33] via-[#061A33]/55 to-transparent" />
        {/* Bottom edge */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#061A33]/85 to-transparent" />
      </div>

      <motion.div style={{ opacity: contentOpacity }} className="relative z-10 w-full pt-32 pb-20 lg:pt-36 lg:pb-24">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-2xl text-white"
          >
            <motion.div variants={item} className="mb-7 text-[11px] uppercase tracking-[0.3em] text-[#BFD4EE]/90 font-medium">
              Luxury Air Con Cleaning — Queensland
            </motion.div>

            <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.2rem] leading-[1.06] tracking-tight">
              <motion.span variants={item} className="block text-white">Cleaner air.</motion.span>
              <motion.span variants={item} className="block text-[#9DB9DC]">Higher standard.</motion.span>
            </h1>

            <motion.span variants={item} className="block mt-7 w-12 h-px bg-white/35" aria-hidden />

            <motion.p
              variants={item}
              className="mt-7 text-base sm:text-lg text-white/85 leading-[1.7] font-light max-w-md"
              data-testid="hero-subtitle"
            >
              Hospital-grade deep cleans for split systems, ducted
              runs and commercial AC. Breathe easy — every day.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4" data-testid="hero-ctas">
              <a
                href="#book"
                className="group pill bg-white text-[#0A2A4E] hover:bg-[#F2F7FD] btn-lift px-7 py-4 text-[12px] uppercase tracking-[0.14em]"
                data-testid="hero-cta-quote"
              >
                Book your clean
                <ArrowRight size={14} strokeWidth={1.6} className="ml-2.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="tel:0490205298"
                className="pill border border-white/30 text-white hover:border-white/60 hover:bg-white/5 btn-lift px-7 py-4 text-sm font-medium"
                data-testid="hero-cta-call"
              >
                <Phone size={14} strokeWidth={1.6} className="mr-2.5" />
                0490 205 298
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div variants={item} className="mt-12 flex flex-wrap items-start gap-y-6 gap-x-0">
              <div className="pr-7" data-testid="hero-trust-rating">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 + i * 0.08, duration: 0.4, ease: EASE }}
                      >
                        <Star size={13} fill="#00B67A" stroke="#00B67A" strokeWidth={0} />
                      </motion.span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold">4.9</span>
                  <span className="text-[12px] text-white/60">380+ reviews</span>
                </div>
                <a href="#reviews" className="mt-1.5 inline-block text-[11px] text-white/55 hover:text-white/85 transition-colors">
                  See what our clients say
                </a>
              </div>

              <div className="hidden sm:flex items-start gap-3 border-l border-white/15 px-7">
                <ShieldCheck size={26} strokeWidth={1.2} className="text-[#BFD4EE] mt-0.5" />
                <div>
                  <div className="text-[12px] uppercase tracking-[0.16em] font-semibold text-white">$20M Insured</div>
                  <div className="mt-1 text-[11px] text-white/55 font-light">Your property is protected</div>
                </div>
              </div>

              <div className="hidden md:flex items-start gap-3 border-l border-white/15 pl-7">
                <BadgeCheck size={26} strokeWidth={1.2} className="text-[#BFD4EE] mt-0.5" />
                <div>
                  <div className="text-[12px] uppercase tracking-[0.16em] font-semibold text-white">HVAC Certified</div>
                  <div className="mt-1 text-[11px] text-white/55 font-light">Industry trained professionals</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
