import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const POINTS = [
  "Remove mould, dust mites & biofilm",
  "Reduce allergens & airborne irritants",
  "Improve efficiency & lower running costs",
  "Hospital-grade process & equipment",
];

export default function BreatheDifference() {
  return (
    <section id="about" className="relative py-24 lg:py-32 bg-frost" data-testid="breathe-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <h2 className="font-display text-4xl sm:text-5xl text-[#0A2A4E] font-medium tracking-tight leading-[1.1]">
              Breathe the
              <br />
              difference.
            </h2>
            <p className="mt-6 text-[15px] text-[#5A6B82] leading-[1.75] font-light max-w-md">
              Dirty systems circulate more than just air. Our deep clean
              restores performance, improves air quality and protects
              what matters most.
            </p>

            <ul className="mt-10 space-y-4">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#1F5AA8] flex items-center justify-center">
                    <Check size={11} strokeWidth={3} className="text-white" />
                  </span>
                  <span className="text-[14px] text-[#0A2A4E] font-light">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="relative aspect-[16/11] overflow-hidden rounded-2xl shadow-luxe-lg">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85"
                alt="Refined living room with a clean air conditioning system"
                className="absolute inset-0 w-full h-full object-cover img-luxe"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
