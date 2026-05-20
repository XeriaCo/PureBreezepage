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
      <div className="absolute inset-0 -z-10">
        <img
          src="/webbackground.png"
          alt="PureBreeze — modern office with pristine ceiling cassette air conditioning"
          className="absolute inset-0 w-full h-full object-cover"
          fetchpriority="high"
        />
        {/* Strong bottom-up gradient so headline reads cleanly without touching the baked-in logo */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#061A33] from-0% via-[#061A33]/70 via-25% to-transparent to-55%" />
      </div>

      {/* Push content to the very bottom of the viewport, well below the baked-in logo */}
      <div className="flex-1" />

      <div className="relative max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10 w-full pb-16 sm:pb-20 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="max-w-2xl text-white"
        >
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.4rem] leading-[1.02] font-medium tracking-tight">
            Cleaner air.
            <br />
            <span className="text-[#BFD4EE] font-light-display">Higher standard.</span>
          </h1>

          <p className="mt-7 text-base sm:text-lg text-white/85 leading-[1.7] font-light max-w-md" data-testid="hero-subtitle">
            Hospital-grade deep cleans for split systems, ducted runs and
            commercial AC. So you can breathe easy — every day.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5" data-testid="hero-ctas">
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

          {/* Small trust row in place of the data card */}
          <div className="mt-12 pt-6 border-t border-white/15 flex flex-wrap items-center gap-x-8 gap-y-3 text-white/85">
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
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/60 font-medium">Same-day service</div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/60 font-medium">HVAC certified</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
