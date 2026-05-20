import React from "react";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Star } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden min-h-[100vh] flex flex-col"
      data-testid="hero-section"
    >
      {/* Full-bleed cinematic backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src="/webbackground.png"
          alt="PureBreeze — modern office with pristine ceiling cassette air conditioning"
          className="absolute inset-0 w-full h-full object-cover"
          fetchpriority="high"
        />
        {/* Right-side veil only — keeps the wall logo on the left completely clean */}
        <div className="absolute inset-y-0 left-[40%] right-0 bg-gradient-to-l from-[#061A33]/80 via-[#061A33]/45 to-transparent" />
        {/* Subtle bottom edge for the trust row */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#061A33]/55 to-transparent" />
      </div>

      <div className="flex-1" />

      <div className="relative z-10 w-full pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10 grid grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="col-span-12 lg:col-start-7 lg:col-span-6 text-white"
          >
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[4.6rem] leading-[1.05] font-medium tracking-tight">
              Cleaner air.
              <br />
              <span className="text-[#BFD4EE] font-light-display">Higher standard.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-white/85 leading-[1.65] font-light max-w-md" data-testid="hero-subtitle">
              Hospital-grade deep cleans for split systems, ducted runs
              and commercial AC. Breathe easy — every day.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5" data-testid="hero-ctas">
              <a
                href="#book"
                className="pill bg-white text-[#0A2A4E] hover:bg-[#F2F7FD] btn-lift px-7 py-4"
                data-testid="hero-cta-quote"
              >
                Book your clean
                <ArrowRight size={14} strokeWidth={1.6} className="ml-2" />
              </a>
              <a
                href="tel:0490205298"
                className="flex items-center gap-2.5 text-sm text-white font-medium border-b border-white/40 hover:border-white pb-1 transition-colors"
                data-testid="hero-cta-call"
              >
                <Phone size={14} strokeWidth={1.6} />
                0490 205 298
              </a>
            </div>

            {/* Trust row */}
            <div className="mt-10 pt-5 border-t border-white/15 flex flex-wrap items-center gap-x-7 gap-y-2.5 text-white/85">
              <div className="flex items-center gap-2" data-testid="hero-trust-rating">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="#BFD4EE" stroke="#BFD4EE" strokeWidth={0} />
                  ))}
                </div>
                <span className="text-sm font-medium">4.9</span>
                <span className="text-[11px] text-white/60">· 380+ reviews</span>
              </div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/60 font-medium">$20M Insured</div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/60 font-medium">Same-day</div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/60 font-medium">HVAC certified</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
