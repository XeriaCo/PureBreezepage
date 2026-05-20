import React from "react";
import { motion } from "framer-motion";
import { Phone, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-36 sm:pb-24"
      data-testid="hero-section"
    >
      {/* Snowy mountain backdrop */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=2200&q=85"
          alt=""
          className="absolute inset-0 w-full h-full object-cover img-luxe"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/55 to-white/85" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(242,247,253,0.4)_0%,rgba(255,255,255,0.85)_100%)]" />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10 relative">

        {/* Eyebrow line */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="eyebrow-light text-[#5A6B82]">
            Queensland · Est. 2019 · 4,200 cleans
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* LEFT — Headline + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.2rem] text-[#0A2A4E] leading-[1.02] font-medium tracking-tight">
              Cleaner air.
              <br />
              <span className="text-[#7BA6D9] font-light-display">Higher standard.</span>
            </h1>

            <p className="mt-8 text-lg text-[#5A6B82] leading-[1.7] font-light max-w-md" data-testid="hero-subtitle">
              Hospital-grade deep cleans for split systems, ducted runs
              and commercial AC. We remove the mould, dust, mites and
              biofilm — so you can breathe easy, every day.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-6" data-testid="hero-ctas">
              <a
                href="#book"
                className="pill pill-navy btn-lift px-7 py-4"
                data-testid="hero-cta-quote"
              >
                Book your clean <span className="ml-2">→</span>
              </a>
              <a
                href="tel:0490507878"
                className="flex items-center gap-2.5 text-sm text-[#0A2A4E] font-medium link-underline"
                data-testid="hero-cta-call"
              >
                <Phone size={14} strokeWidth={1.6} />
                0490 507 878
              </a>
            </div>
          </motion.div>

          {/* RIGHT — Floating air-quality card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="lg:col-span-5 lg:pl-10"
          >
            <div className="data-card max-w-[420px] ml-auto" data-testid="hero-data-card">
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
