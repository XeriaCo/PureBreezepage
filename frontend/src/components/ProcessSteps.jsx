import React from "react";
import { motion } from "framer-motion";
import { Search, Droplet, Wind, Check, ArrowRight } from "lucide-react";

const STEPS = [
  { num: 1, icon: <Search size={22} strokeWidth={1.4} />,  title: "Inspect",      body: "We assess your system and indoor air quality." },
  { num: 2, icon: <Droplet size={22} strokeWidth={1.4} />, title: "Deep clean",   body: "We remove build-up, mould, dust and biofilm." },
  { num: 3, icon: <Wind size={22} strokeWidth={1.4} />,    title: "Sanitise",     body: "We apply hospital-grade sanitisation for purity." },
  { num: 4, icon: <Check size={22} strokeWidth={1.6} />,   title: "Test & report",body: "We test, measure and share the results." },
];

export default function ProcessSteps() {
  return (
    <section id="process" className="relative py-24 lg:py-32 bg-glacier" data-testid="process-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl text-[#0A2A4E] font-medium tracking-tight">
            How it works
          </h2>
          <p className="mt-4 text-base text-[#5A6B82] font-light tracking-wide">
            Simple. Thorough. Effective.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 lg:gap-y-0 lg:gap-x-8">
          {STEPS.map((step, i) => (
            <React.Fragment key={step.num}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative text-center"
                data-testid={`process-step-${i}`}
              >
                <div className="mx-auto w-16 h-16 rounded-full bg-white border border-[#DCE7F3] flex items-center justify-center text-[#1F5AA8] shadow-card mb-6">
                  {step.icon}
                </div>
                <div className="font-display text-base text-[#0A2A4E] font-medium tracking-tight mb-3">
                  {step.num}. {step.title}
                </div>
                <p className="text-[13px] text-[#5A6B82] leading-[1.65] font-light max-w-[22ch] mx-auto">
                  {step.body}
                </p>
              </motion.div>

              {i < STEPS.length - 1 && (
                <div
                  className="hidden lg:flex absolute top-8 items-center justify-center text-[#7BA6D9] pointer-events-none"
                  style={{ left: `${((i + 1) * 100) / 4}%`, transform: 'translateX(-50%)' }}
                  aria-hidden
                >
                  <ArrowRight size={18} strokeWidth={1.3} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
