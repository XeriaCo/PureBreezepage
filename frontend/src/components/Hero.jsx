import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PureBreezeLogo } from "@/components/PureBreezeLogo";
import { ShieldCheck, Sparkles, Star, Clock, Wind } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 sm:pt-36 pb-16 sm:pb-24"
      data-testid="hero-section"
    >
      {/* gradient backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-white to-white" />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-3xl" />
        <div className="absolute top-20 -right-40 w-[500px] h-[500px] bg-cyan-200/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-sky-100 px-4 py-2 mb-6 shadow-sm">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-slate-700 tracking-wide uppercase">
              Queensland-Owned · Same Day Service
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter text-slate-900 leading-[1.02]">
            Breathe <span className="shimmer-text">Pure.</span>
            <br />
            Live Better in
            <br />
            <span className="text-sky-500">Queensland.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed" data-testid="hero-subtitle">
            Professional air-conditioner cleaning that removes mould, bacteria and dust — restoring up to
            <span className="font-semibold text-slate-900"> 30% cooling efficiency</span> and giving your
            family hospital-grade fresh air.
          </p>

          <div className="mt-8 flex flex-wrap gap-3" data-testid="hero-ctas">
            <Button
              onClick={() => (window.location.hash = "ai-quote")}
              className="rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white px-8 py-6 text-base font-semibold shadow-xl shadow-sky-500/30 btn-lift"
              data-testid="hero-cta-quote"
            >
              <Sparkles size={18} className="mr-2" /> Scan AC for Instant AI Quote
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "tel:0490507878")}
              className="rounded-full border-slate-300 bg-white text-slate-800 hover:bg-slate-50 px-8 py-6 text-base font-semibold btn-lift"
              data-testid="hero-cta-call"
            >
              Call 0490 507 878
            </Button>
          </div>

          {/* trust row */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-2" data-testid="hero-trust-rating">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#0EA5E9" stroke="#0EA5E9" />
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-800">4.9/5 · 380+ reviews</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-700" data-testid="hero-trust-insured">
              <ShieldCheck size={16} className="text-sky-500" />
              $20M Insured
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-700" data-testid="hero-trust-speed">
              <Clock size={16} className="text-sky-500" />
              Same-day bookings
            </div>
          </div>
        </motion.div>

        {/* Hero visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative rounded-[2rem] overflow-hidden border border-sky-100 shadow-[0_30px_70px_-20px_rgba(14,165,233,0.35)] bg-gradient-to-br from-sky-50 to-white p-8 min-h-[440px] flex flex-col items-center justify-center grain">
            <div className="float-y mb-4">
              <PureBreezeLogo size={160} showWordmark={false} />
            </div>

            {/* concentric breeze rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-40 h-40 rounded-full border border-sky-300/40 pulse-ring" />
              <div className="w-40 h-40 rounded-full border border-sky-300/30 pulse-ring absolute" style={{ animationDelay: "0.8s" }} />
              <div className="w-40 h-40 rounded-full border border-sky-300/20 pulse-ring absolute" style={{ animationDelay: "1.6s" }} />
            </div>

            <div className="relative z-10 mt-4 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-sky-100 px-4 py-2 text-sm font-semibold text-slate-800 shadow-md">
                <Wind size={14} className="text-sky-500" />
                Fresh air, delivered
              </div>
              <p className="mt-4 font-display text-2xl font-bold text-slate-900 tracking-tight">
                PureBreeze <span className="text-sky-500">Signature Clean</span>
              </p>
              <p className="text-sm text-slate-500 mt-1">Chemical deep clean · Sanitisation · Sanity</p>
            </div>

            {/* stat chip */}
            <div className="absolute top-5 right-5 bg-white/90 backdrop-blur border border-sky-100 rounded-2xl px-3 py-2 shadow-md">
              <div className="text-[10px] uppercase tracking-widest text-slate-500">Power saved</div>
              <div className="text-xl font-display font-bold text-sky-600">~30%</div>
            </div>
            <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur border border-sky-100 rounded-2xl px-3 py-2 shadow-md">
              <div className="text-[10px] uppercase tracking-widest text-slate-500">Mould removed</div>
              <div className="text-xl font-display font-bold text-sky-600">100%</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
