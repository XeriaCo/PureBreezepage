import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden min-h-screen flex items-center pt-32 pb-20 sm:pt-40 sm:pb-28 bg-aurora"
      data-testid="hero-section"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 w-full">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="w-12 h-px bg-[#1F5AA8]" />
          <span className="eyebrow">Queensland · Est. 2019</span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* LEFT — Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <h1 className="font-display text-[11vw] sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem] text-[#0A2A4E] leading-[0.98] font-light">
              The art of
              <br />
              <span className="serif-italic text-[#1F5AA8]">pristine</span>{" "}
              air.
            </h1>

            <div className="mt-14 max-w-xl">
              <p className="text-lg sm:text-xl text-[#5A6B82] leading-[1.7] font-light" data-testid="hero-subtitle">
                Refined air conditioning restoration for Queensland's most discerning homes.
                Hospital-grade sanitisation, certified technicians, and a quietly perfect result.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-14 flex flex-wrap items-center gap-6" data-testid="hero-ctas">
              <Button
                onClick={() => (window.location.hash = "book")}
                className="group rounded-none bg-[#0A2A4E] hover:bg-[#061A33] text-white pl-8 pr-6 py-7 text-[12px] uppercase tracking-[0.24em] font-medium btn-lift border-0"
                data-testid="hero-cta-quote"
              >
                Schedule a Service
                <ArrowRight size={16} strokeWidth={1.5} className="ml-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <a
                href="tel:0490507878"
                className="text-sm text-[#0A2A4E] font-medium link-underline tracking-wide"
                data-testid="hero-cta-call"
              >
                or speak with us — 0490 507 878
              </a>
            </div>

            {/* Trust band */}
            <div className="mt-20 pt-10 border-t border-[#E5ECF4] grid grid-cols-3 gap-8 max-w-2xl">
              <div data-testid="hero-trust-rating">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} fill="#1F5AA8" stroke="#1F5AA8" strokeWidth={0} />
                  ))}
                </div>
                <div className="font-display text-3xl text-[#0A2A4E] font-light">4.9</div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-[#8597AE] mt-1">380+ Reviews</div>
              </div>
              <div data-testid="hero-trust-units">
                <div className="font-display text-3xl text-[#0A2A4E] font-light mt-[18px]">14,200<span className="text-[#7BA6D9]">+</span></div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-[#8597AE] mt-1">Units Serviced</div>
              </div>
              <div data-testid="hero-trust-insured">
                <div className="font-display text-3xl text-[#0A2A4E] font-light mt-[18px]">$20M</div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-[#8597AE] mt-1">Insured · Certified</div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.25 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden shadow-luxe-lg">
              <img
                src="https://images.unsplash.com/photo-1631545806609-aaeed8b86259?auto=format&fit=crop&w=1100&q=85"
                alt="Modern split system air conditioner in a refined interior"
                className="absolute inset-0 w-full h-full object-cover img-luxe zoom-in-slow"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2A4E]/30 via-transparent to-transparent" />

              {/* Caption marker */}
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <span className="w-8 h-px bg-white/80" />
                <span className="text-[10px] uppercase tracking-[0.28em] text-white/90 font-medium">№ 142 · Field Report</span>
              </div>

              {/* Bottom signature plate */}
              <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                <div className="eyebrow text-white/70 mb-2">The Signature Clean</div>
                <div className="font-display text-2xl font-light leading-snug">
                  Restoring the quiet, cool air<br />of a Queensland home.
                </div>
              </div>
            </div>

            {/* Floating accolade */}
            <div className="hidden md:block absolute -bottom-10 -left-10 bg-white shadow-luxe-lg p-7 max-w-[230px]">
              <div className="eyebrow mb-3">Trusted by</div>
              <div className="font-display text-4xl text-[#0A2A4E] font-light leading-none">99.7<span className="text-[#7BA6D9] text-2xl">%</span></div>
              <div className="text-xs text-[#5A6B82] mt-2 leading-relaxed">
                of airborne pathogens eliminated post-service.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
