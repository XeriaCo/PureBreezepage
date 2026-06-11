import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { fadeUp, stagger, viewportOnce } from "@/lib/anim";

const TESTIMONIALS = [
  { name: "Sarah M.", suburb: "New Farm · Brisbane", rating: 5,
    text: "Our split system smelled musty for years. PureBreeze came out same-day and it feels like a brand-new unit. No more coughing at night." },
  { name: "Daniel K.", suburb: "Surfers Paradise", rating: 5,
    text: "Professional from start to finish. Booked the same afternoon, and our power bill noticeably dropped the very next month." },
  { name: "Priya R.", suburb: "Buderim · Sunshine Coast", rating: 5,
    text: "They showed me the before photos — I had no idea what we'd been breathing. The written air-quality report afterwards was a lovely touch." },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="relative py-24 lg:py-32 bg-frost" data-testid="testimonials-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
        >
          <div className="mb-5 inline-flex items-center gap-3">
            <span className="w-8 h-px bg-[#7BA6D9]" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#7BA6D9] font-medium">Reviews</span>
            <span className="w-8 h-px bg-[#7BA6D9]" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#0A2A4E] font-medium tracking-tight">
            What our <span className="text-[#7BA6D9] font-light-display">customers say.</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="#1F5AA8" stroke="#1F5AA8" strokeWidth={0} />)}
            </div>
            <span className="text-sm text-[#5A6B82] font-light">4.9 average · 380+ reviews</span>
          </div>
        </motion.div>

        <motion.div
          variants={stagger(0.05, 0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              variants={fadeUp}
              className="bg-white p-8 rounded-2xl hairline shadow-card flex flex-col card-hover-soft"
              data-testid={`testimonial-card-${i}`}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => <Star key={j} size={11} fill="#1F5AA8" stroke="#1F5AA8" strokeWidth={0} />)}
              </div>
              <blockquote className="font-display text-base text-[#0A2A4E] leading-[1.6] font-normal flex-1">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-6 pt-4 border-t border-[#E5ECF4] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F2F7FD] border border-[#DCE7F3] flex items-center justify-center font-display text-xs text-[#1F5AA8] font-medium">
                  {t.name.split(" ").map((w) => w[0]).join("")}
                </div>
                <div>
                  <div className="font-display text-sm text-[#0A2A4E] font-medium">{t.name}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#8597AE] mt-0.5">{t.suburb}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
