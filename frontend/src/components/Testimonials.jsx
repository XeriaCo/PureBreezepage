import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  { name: "Sarah M.", suburb: "New Farm · Brisbane", rating: 5,
    text: "Our split system smelled musty for years. PureBreeze came out same-day and it feels like a brand-new unit. No more coughing at night." },
  { name: "Daniel K.", suburb: "Surfers Paradise", rating: 5,
    text: "Professional from start to finish. Booked the same afternoon, and our power bill noticeably dropped the very next month." },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="relative py-20 lg:py-24 bg-frost" data-testid="testimonials-section">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-10">

        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl sm:text-4xl text-[#0A2A4E] font-medium tracking-tight">
            What our <span className="text-[#7BA6D9] font-light-display">customers say.</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="#1F5AA8" stroke="#1F5AA8" strokeWidth={0} />)}
            </div>
            <span className="text-sm text-[#5A6B82] font-light">4.9 average · 380+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white p-8 rounded-2xl hairline shadow-card"
              data-testid={`testimonial-card-${i}`}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => <Star key={j} size={11} fill="#1F5AA8" stroke="#1F5AA8" strokeWidth={0} />)}
              </div>
              <blockquote className="font-display text-base sm:text-lg text-[#0A2A4E] leading-[1.55] font-normal">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-6 pt-4 border-t border-[#E5ECF4]">
                <div className="font-display text-sm text-[#0A2A4E] font-medium">{t.name}</div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-[#8597AE] mt-1">{t.suburb}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
