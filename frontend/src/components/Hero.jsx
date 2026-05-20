import React from "react";
import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden min-h-[100vh] flex items-end"
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
        {/* Bottom-up gradient so the headline & data card stay legible regardless of the photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#061A33]/85" />
        {/* Side vignette to soften the busy desk area */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2A4E]/30 via-transparent to-[#0A2A4E]/20" />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10 w-full pb-16 sm:pb-20 lg:pb-24 pt-32 relative">

        <div className="grid lg:grid-cols-12 gap-10 items-end">

          {/* LEFT — Headline + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:col-span-7 text-white"
          >
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.2rem] leading-[1.02] font-medium tracking-tight">
              Cleaner air.
              <br />
              <span className="text-[#BFD4EE] font-light-display">Higher standard.</span>
            </h1>

            <p className="mt-7 text-base sm:text-lg text-white/85 leading-[1.7] font-light max-w-md" data-testid="hero-subtitle">
              Hospital-grade deep cleans for split systems, ducted runs and
              commercial AC. So you can breathe easy — every day.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5" data-testid="hero-ctas">
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
          </motion.div>

          {/* RIGHT — Floating air-quality card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="data-card max-w-[420px] ml-auto backdrop-blur-sm" data-testid="hero-data-card" style={{ background: "rgba(255,255,255,0.96)" }}>
              <div className="px-7 pt-7 pb-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1F5AA8]" />
                  <span className="text-[10px] uppercase tracking-[0.28em] text-[#1F5AA8] font-medium">Air quality, post-clean</span>
                </div>

                <div className="flex items-baseline gap-2 mb-7">
                  <span className="font-display text-7xl text-[#0A2A4E] font-light leading-none tracking-tight">97</span>
                  <span className="text-2xl text-[#8597AE] font-light">/100</span>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E5ECF4]">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.24em] text-[#8597AE] font-medium mb-2">PM 2.5</div>
                    <div className="font-display text-xl text-[#0A2A4E] font-medium">0.4</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.24em] text-[#8597AE] font-medium mb-2">CFU</div>
                    <div className="font-display text-xl text-[#0A2A4E] font-medium">nil</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.24em] text-[#8597AE] font-medium mb-2">Improvement</div>
                    <div className="font-display text-xl text-[#1F5AA8] font-medium">+38%</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0A2A4E] text-white px-7 py-5 flex items-center gap-3">
                <span className="relative inline-flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-[#7BA6D9] opacity-70 animate-ping" />
                  <span className="relative w-2 h-2 rounded-full bg-[#7BA6D9]" />
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-white/60 font-medium">Next available</span>
                  <span className="text-sm font-medium mt-0.5">Tomorrow · 8:00 am · Brisbane</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
