import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Sparkles, Star, Clock, Award } from "lucide-react";

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
        <div className="absolute inset-0 dot-grid opacity-60" />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-3xl" />
        <div className="absolute top-20 -right-40 w-[500px] h-[500px] bg-cyan-200/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-sky-100 px-4 py-2 mb-6 shadow-sm">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span className="text-xs font-semibold text-slate-700 tracking-wide uppercase">
              Queensland-Owned · Same Day Service
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 leading-[1.05]">
            Professional air-conditioner cleaning across
            <span className="text-sky-600"> Queensland.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed" data-testid="hero-subtitle">
            Certified technicians remove mould, bacteria and built-up dust — restoring up to
            <span className="font-semibold text-slate-900"> 30% cooling efficiency</span> and giving your
            home hospital-grade fresh air.
          </p>

          <div className="mt-8 flex flex-wrap gap-3" data-testid="hero-ctas">
            <Button
              onClick={() => (window.location.hash = "ai-quote")}
              className="rounded-full bg-sky-600 hover:bg-sky-700 text-white px-8 py-6 text-base font-semibold shadow-lg shadow-sky-600/25 btn-lift"
              data-testid="hero-cta-quote"
            >
              <Sparkles size={18} className="mr-2" /> Get an instant AI quote
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
              <ShieldCheck size={16} className="text-sky-600" />
              $20M insured
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-700" data-testid="hero-trust-speed">
              <Clock size={16} className="text-sky-600" />
              Same-day service
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-700" data-testid="hero-trust-certified">
              <Award size={16} className="text-sky-600" />
              HVAC-certified
            </div>
          </div>
        </motion.div>

        {/* Real photo hero visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-6 relative"
        >
          <div className="relative aspect-[4/5] lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_30px_70px_-20px_rgba(15,23,42,0.35)] bg-slate-100">
            <img
              src="https://images.pexels.com/photos/6471913/pexels-photo-6471913.jpeg"
              alt="PureBreeze HVAC technician servicing an air conditioner"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* subtle top gradient for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-slate-900/10 to-transparent" />

            {/* top badge */}
            <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-3.5 py-2 shadow-md">
                <ShieldCheck size={14} className="text-sky-600" />
                <span className="text-xs font-semibold text-slate-800">Certified Clean Guarantee</span>
              </div>
              <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-3 py-1.5 shadow-md">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-700">Available today</span>
              </div>
            </div>

            {/* bottom info bar */}
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 backdrop-blur p-4 shadow-xl border border-white/60">
              <div className="grid grid-cols-3 divide-x divide-slate-200">
                <div className="px-1">
                  <div className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">14,200+</div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-0.5">Jobs done</div>
                </div>
                <div className="px-3">
                  <div className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">~30%</div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-0.5">Power saved</div>
                </div>
                <div className="px-3">
                  <div className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">99.7%</div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-0.5">Pathogens killed</div>
                </div>
              </div>
            </div>
          </div>

          {/* floating supporting photo */}
          <div className="hidden md:block absolute -bottom-8 -left-8 w-44 h-44 rounded-2xl overflow-hidden border-4 border-white shadow-[0_20px_50px_-15px_rgba(15,23,42,0.3)] bg-white">
            <img
              src="https://static.prod-images.emergentagent.com/jobs/b709f5ab-53d0-4ea5-b4b8-9d180465e97f/images/92a2813178e78b5d984a568c8656e0b699106225dacea72c8bca9f4819eb04eb.png"
              alt="Pristine clean air conditioner"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
