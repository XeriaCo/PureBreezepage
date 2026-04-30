import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Sparkles, Star, Clock, Award, ArrowUpRight, Quote } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 sm:pt-32 pb-20 sm:pb-28"
      data-testid="hero-section"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/70 via-white to-white" />
        <div className="absolute inset-0 dot-grid opacity-50" />
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-sky-200/30 rounded-full blur-3xl" />
        <div className="absolute top-40 -right-40 w-[520px] h-[520px] bg-cyan-200/25 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tiny editorial meta row */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 text-xs text-slate-500 mb-10"
        >
          <span className="font-mono tracking-widest uppercase">Est. 2019 · Queensland</span>
          <span className="h-px flex-1 bg-slate-200" />
          <span className="font-mono tracking-widest uppercase hidden sm:inline">Issue №{new Date().getFullYear()}</span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT — editorial headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 relative"
          >
            {/* corner handwriting annotation */~
            <div className="hidden md:block absolute -top-4 right-8 text-sky-500 handwriting text-2xl rotate-[-6deg] select-none">
              read on →
            </div>

            <h1 className="font-display text-[13vw] sm:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold tracking-[-0.035em] text-slate-900 leading-[0.95]">
              Clean air,
              <br />
              <span className="serif-italic text-slate-900 text-[0.98em]">expertly</span>{" "}
              <span className="relative inline-block hand-underline">
                delivered
              </span>
              <br />
              <span className="text-sky-600">across Queensland.</span>
            </h1>

            <div className="mt-10 grid sm:grid-cols-12 gap-8 items-start">
              {/* Left: deck copy */}
              <p className="sm:col-span-7 text-base sm:text-lg text-slate-600 max-w-md leading-relaxed border-l-2 border-sky-200 pl-5" data-testid="hero-subtitle">
                Certified technicians, hospital-grade sanitiser and a 30-day guarantee.
                We remove what hides inside your air-con — so the air you breathe is the air you&nbsp;trust.
              </p>

              {/* Right: oversized stat column */}
              <div className="sm:col-span-5 flex flex-col gap-1">
                <div className="font-display text-5xl sm:text-6xl font-black tracking-tighter text-slate-900">
                  14,<span className="text-sky-500">200</span>+
                </div>
                <div className="text-xs uppercase tracking-[0.22em] text-slate-500 font-semibold">
                  AC units rescued since 2019
                </div>
              </div>
            </div>

            {/* CTA row */}
            <div className="mt-10 flex flex-wrap items-center gap-4" data-testid="hero-ctas">
              <Button
                onClick={() => (window.location.hash = "book")}
                className="group rounded-full bg-slate-900 hover:bg-slate-800 text-white pl-6 pr-3 py-6 text-base font-semibold btn-lift"
                data-testid="hero-cta-quote"
              >
                <Sparkles size={16} className="mr-2 text-sky-400" />
                Book a clean now
                <span className="ml-3 w-9 h-9 rounded-full bg-sky-500 group-hover:bg-sky-400 flex items-center justify-center transition-colors">
                  <ArrowUpRight size={16} />
                </span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => (window.location.href = "tel:0490507878")}
                className="rounded-full text-slate-800 hover:bg-slate-100 px-6 py-6 text-base font-semibold"
                data-testid="hero-cta-call"
              >
                or call&nbsp;
                <span className="underline underline-offset-4 decoration-sky-400 decoration-2">0490 507 878</span>
              </Button>
            </div>

            {/* Trust row */}
            <div className="mt-12 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-x-8 gap-y-3">
              <div className="flex items-center gap-2" data-testid="hero-trust-rating">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#0EA5E9" stroke="#0EA5E9" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-slate-800">4.9</span>
                <span className="text-xs text-slate-500">· 380+ reviews</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium" data-testid="hero-trust-insured">
                <ShieldCheck size={14} className="text-sky-600" /> $20M insured
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium" data-testid="hero-trust-speed">
                <Clock size={14} className="text-sky-600" /> Same-day service
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium" data-testid="hero-trust-certified">
                <Award size={14} className="text-sky-600" /> HVAC-certified
              </div>
            </div>
          </motion.div>

          {/* RIGHT — editorial photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="lg:col-span-5 relative mt-4 lg:mt-0"
          >
            {/* caption marker */}
            <div className="hidden lg:flex absolute -top-7 left-0 items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-slate-500">
              <span className="w-8 h-px bg-slate-300" />
              Field report №142
            </div>

            {/* main photo */}
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_40px_80px_-30px_rgba(15,23,42,0.4)]">
              <img
                src="https://customer-assets.emergentagent.com/wingman/05384f0b-dfa0-4afe-82d6-378d7ff1884b/attachments/0808184a9835460596de01d427a6829f_IMG_2554.jpeg"
                alt="PureBreeze HVAC technician servicing an air conditioner"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

              {/* tilted customer quote badge */}
              <div className="absolute top-6 -left-4 tag-tilt-left bg-white rounded-xl p-4 pb-3 shadow-lg max-w-[240px]">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Quote size={14} className="text-sky-500" />
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} fill="#0EA5E9" stroke="#0EA5E9" />
                    ))}
                  </div>
                </div>
                <p className="text-[13px] leading-snug text-slate-800 font-medium">
                  "Our split system smells like a brand-new unit."
                </p>
                <p className="mt-1.5 text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
                  Sarah · New Farm
                </p>
              </div>
            </div>

            {/* small polaroid-style inset */}
            <div className="hidden md:block absolute -bottom-8 -right-6 tag-tilt-right bg-white p-3 pb-6 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.35)]">
              <div className="w-44 h-44 overflow-hidden bg-slate-100">
                <img
                  src="https://static.prod-images.emergentagent.com/jobs/b709f5ab-53d0-4ea5-b4b8-9d180465e97f/images/92a2813178e78b5d984a568c8656e0b699106225dacea72c8bca9f4819eb04eb.png"
                  alt="Pristine clean air conditioner"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-2 handwriting text-xl text-slate-700 text-center">after the clean ✓</div>
            </div>

            {/* floating compact stat */}
            <div className="absolute -bottom-6 -left-2 sm:left-6 bg-slate-900 text-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
              <div>
                <div className="font-display text-2xl font-black tracking-tight">99.7%</div>
                <div className="text-[10px] uppercase tracking-widest text-sky-300 font-semibold">Pathogens killed</div>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div>
                <div className="font-display text-2xl font-black tracking-tight">~30%</div>
                <div className="text-[10px] uppercase tracking-widest text-sky-300 font-semibold">Power saved</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
