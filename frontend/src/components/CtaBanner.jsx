import React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { PureBreezeLogo } from "@/components/PureBreezeLogo";
import { EASE } from "@/lib/anim";

export default function CtaBanner() {
  return (
    <section className="relative py-16 lg:py-24 bg-white" data-testid="cta-banner-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative rounded-3xl bg-gradient-to-br from-[#4F87C9] via-[#2E6FBF] to-[#1F5AA8] px-8 py-12 lg:px-14 lg:py-16 overflow-hidden"
        >
          {/* Subtle wind grain overlay */}
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(105deg, rgba(255,255,255,0.4) 0 1px, transparent 1px 12px)"
            }}
          />
          {/* Drifting light sweep */}
          <motion.div
            className="absolute inset-y-0 w-1/3 pointer-events-none"
            style={{ background: "linear-gradient(105deg, transparent, rgba(255,255,255,0.10), transparent)" }}
            animate={{ left: ["-35%", "105%"] }}
            transition={{ duration: 6, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
            aria-hidden
          />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <motion.div
                className="hidden sm:flex w-16 h-16 rounded-full bg-white/15 border border-white/20 items-center justify-center"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <PureBreezeLogo size={36} variant="dark" />
              </motion.div>
              <div>
                <h3 className="font-display text-2xl sm:text-3xl text-white font-medium tracking-tight">
                  Your air. Our standard.
                </h3>
                <p className="text-sm text-white/80 mt-2 font-light">
                  Same-day slots across South-East Queensland — book your hospital-grade clean today.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#book"
                className="group pill pill-white px-7 py-3.5 whitespace-nowrap btn-lift"
                data-testid="cta-banner-book"
              >
                Book your clean <span className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="tel:0490205298"
                className="flex items-center justify-center gap-2.5 text-white text-sm font-medium hover:text-[#DDE9F7] transition-colors px-4"
                data-testid="cta-banner-call"
              >
                <Phone size={14} strokeWidth={1.5} />
                0490 205 298
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
