import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const STEPS = [
  { num: "01", title: "Inspect & document",      body: "Each unit is photographed and assessed before a single panel is removed." },
  { num: "02", title: "Strip & protect",         body: "Floors, walls and furnishings draped. The unit fully dismantled in sequence." },
  { num: "03", title: "Hospital-grade chemistry",body: "Biodegradable enzymes break down biofilm, mould and grime at source." },
  { num: "04", title: "Precision rinse",         body: "Each fin individually rinsed to restore manufacturer-specified airflow." },
  { num: "05", title: "Sanitise & deodorise",    body: "A pharmaceutical-grade fog eliminates 99.7% of airborne pathogens." },
  { num: "06", title: "Reassemble & calibrate",  body: "Performance tested against original installation specifications." },
  { num: "07", title: "Report & guarantee",      body: "A full visual report is delivered with our 30-day satisfaction guarantee." },
];

export default function ProcessSteps() {
  return (
    <section id="process" className="relative py-32 lg:py-40 bg-white" data-testid="process-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Left — Image stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden shadow-luxe-lg">
                <img
                  src="https://images.unsplash.com/photo-1581275288578-bf3d3b1f3f7f?auto=format&fit=crop&w=1100&q=85"
                  alt="Pristine air conditioning system in a refined room"
                  className="absolute inset-0 w-full h-full object-cover img-luxe"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2A4E]/30 via-transparent to-transparent" />
              </div>

              {/* Floating guarantee plate */}
              <div className="absolute -bottom-8 -right-6 sm:-right-10 bg-white p-7 shadow-luxe-lg max-w-[260px]">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck size={18} strokeWidth={1.4} className="text-[#1F5AA8]" />
                  <div className="eyebrow">The Guarantee</div>
                </div>
                <div className="font-display text-xl text-[#0A2A4E] font-light leading-snug">
                  Thirty days of certainty
                </div>
                <p className="mt-2 text-xs text-[#5A6B82] leading-relaxed font-light">
                  Not entirely satisfied? We return and re-service — at no cost.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — Steps */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-px bg-[#1F5AA8]" />
              <span className="eyebrow">Method</span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-[#0A2A4E] leading-[1.0] tracking-tight">
              The seven-step
              <br />
              <span className="serif-italic text-[#1F5AA8]">signature</span> clean.
            </h2>
            <p className="mt-8 text-lg text-[#5A6B82] leading-[1.75] font-light max-w-xl">
              Every unit — from a single window installation to a multi-zone
              ducted system — moves through the same considered process.
            </p>

            <div className="mt-16 space-y-1">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group grid grid-cols-12 gap-6 items-start py-7 border-t border-[#E5ECF4] last:border-b"
                  data-testid={`process-step-${i}`}
                >
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-[11px] tracking-[0.32em] uppercase text-[#7BA6D9] font-medium">{step.num}</span>
                  </div>
                  <div className="col-span-10 sm:col-span-11">
                    <h3 className="font-display text-xl sm:text-2xl text-[#0A2A4E] font-normal tracking-tight mb-2 transition-colors group-hover:text-[#1F5AA8]">
                      {step.title}
                    </h3>
                    <p className="text-[15px] text-[#5A6B82] leading-[1.7] font-light max-w-xl">{step.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
