import React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { PureBreezeLogo } from "@/components/PureBreezeLogo";

export default function CtaBanner() {
  return (
    <section className="relative py-16 lg:py-20 bg-white" data-testid="cta-banner-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl bg-gradient-to-br from-[#4F87C9] via-[#2E6FBF] to-[#1F5AA8] px-8 py-12 lg:px-14 lg:py-14 overflow-hidden"
        >
          {/* Subtle wind grain overlay */}
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(105deg, rgba(255,255,255,0.4) 0 1px, transparent 1px 12px)"
            }}
          />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="hidden sm:flex w-16 h-16 rounded-full bg-white/15 border border-white/20 items-center justify-center">
                <PureBreezeLogo size={36} variant="dark" />
              </div>
              <div>
                <h3 className="font-display text-2xl sm:text-3xl text-white font-medium tracking-tight">
                  Your air. Our standard.
                </h3>
                <p className="text-sm text-white/80 mt-2 font-light">
                  Book your hospital-grade clean today.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#book"
                className="pill pill-white px-7 py-3.5 whitespace-nowrap btn-lift"
                data-testid="cta-banner-book"
              >
                Book your clean <span className="ml-1.5">→</span>
              </a>
              <a
                href="tel:0490507878"
                className="flex items-center justify-center gap-2.5 text-white text-sm font-medium hover:text-[#DDE9F7] transition-colors px-4"
                data-testid="cta-banner-call"
              >
                <Phone size={14} strokeWidth={1.5} />
                0490 507 878
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
