import React from "react";
import { motion } from "framer-motion";
import { Search, Droplet, Wind, Check } from "lucide-react";
import { fadeUp, viewportOnce, EASE } from "@/lib/anim";

const STEPS = [
  { num: 1, icon: <Search size={22} strokeWidth={1.4} />,  title: "Inspect",       body: "We assess your system, photograph the build-up, and benchmark your indoor air quality." },
  { num: 2, icon: <Droplet size={22} strokeWidth={1.4} />, title: "Deep clean",    body: "Full strip-down chemical clean — coils, blades, filters, drains. Mould and biofilm removed at the source." },
  { num: 3, icon: <Wind size={22} strokeWidth={1.4} />,    title: "Sanitise",      body: "Hospital-grade, child-and-pet-safe sanitisation through the entire airflow path." },
  { num: 4, icon: <Check size={22} strokeWidth={1.6} />,   title: "Test & report", body: "We re-test the air, measure the difference, and hand you the results in writing." },
];

export default function ProcessSteps() {
  return (
    <section id="process" className="relative py-24 lg:py-36 bg-glacier" data-testid="process-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="mb-5 inline-flex items-center gap-3">
            <span className="w-8 h-px bg-[#7BA6D9]" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#7BA6D9] font-medium">The method</span>
            <span className="w-8 h-px bg-[#7BA6D9]" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-[#0A2A4E] font-medium tracking-tight">
            How it works
          </h2>
          <p className="mt-5 text-base text-[#5A6B82] font-light tracking-wide">
            Four steps. About an hour. <span className="text-[#7BA6D9] font-light-display">A different home.</span>
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-14 lg:gap-y-0 lg:gap-x-8">
          {/* Connecting line that draws itself as you arrive */}
          <motion.div
            className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#7BA6D9]/60 via-[#7BA6D9]/60 to-[#7BA6D9]/60"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
            style={{ transformOrigin: "left" }}
            aria-hidden
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.18, ease: EASE }}
              className="relative text-center"
              data-testid={`process-step-${i}`}
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.2 + i * 0.18 }}
                className="relative mx-auto w-16 h-16 rounded-full bg-white border border-[#DCE7F3] flex items-center justify-center text-[#1F5AA8] shadow-card mb-6"
              >
                {step.icon}
                <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#0A2A4E] text-white text-[10px] font-medium flex items-center justify-center">
                  {step.num}
                </span>
              </motion.div>
              <div className="font-display text-base text-[#0A2A4E] font-medium tracking-tight mb-3">
                {step.title}
              </div>
              <p className="text-[13px] text-[#5A6B82] leading-[1.7] font-light max-w-[26ch] mx-auto">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center text-sm text-[#8597AE] font-light"
        >
          Most split systems are finished in under 75 minutes — and you'll see the before photos.
        </motion.p>
      </div>
    </section>
  );
}
