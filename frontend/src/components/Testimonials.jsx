import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    suburb: "New Farm · Brisbane",
    rating: 5,
    text: "Our split system smelled musty for years. PureBreeze came out same-day and the difference is unreal — it feels like a brand-new unit. No more coughing at night.",
  },
  {
    name: "Daniel K.",
    suburb: "Surfers Paradise · Gold Coast",
    rating: 5,
    text: "Booked the same afternoon. The technician was professional and explained everything. Our power bill noticeably dropped the very next month.",
  },
  {
    name: "Priya L.",
    suburb: "Toowoomba",
    rating: 5,
    text: "I have asthma and the air in our home used to set me off every summer. After PureBreeze cleaned the ducted system, six months without a flare-up.",
  },
  {
    name: "Marcus T.",
    suburb: "Noosa Heads",
    rating: 5,
    text: "Fair price, no upselling, and they left the room cleaner than they found it. The office has already been booked. Gold-standard service.",
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="relative py-32 lg:py-40 bg-glacier" data-testid="testimonials-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">

        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-12 h-px bg-[#1F5AA8]" />
            <span className="eyebrow">Reviews</span>
            <span className="w-12 h-px bg-[#1F5AA8]" />
          </div>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-[#0A2A4E] leading-[1.0] tracking-tight">
            Three hundred & eighty
            <br />
            <span className="serif-italic text-[#1F5AA8]">quiet endorsements.</span>
          </h2>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="#1F5AA8" stroke="#1F5AA8" strokeWidth={0} />
              ))}
            </div>
            <span className="text-sm text-[#5A6B82] font-light tracking-wide">4.9 average · 380+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative bg-white p-10 lg:p-12 shadow-luxe hairline"
              data-testid={`testimonial-card-${i}`}
            >
              <div className="flex items-center gap-1 mb-6">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={12} fill="#1F5AA8" stroke="#1F5AA8" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="font-display text-2xl lg:text-[1.7rem] text-[#0A2A4E] leading-[1.4] font-light">
                <span className="serif-italic text-[#7BA6D9]">"</span>
                {t.text}
                <span className="serif-italic text-[#7BA6D9]">"</span>
              </blockquote>
              <figcaption className="mt-10 pt-6 border-t border-[#E5ECF4] flex items-center justify-between">
                <div>
                  <div className="font-display text-base text-[#0A2A4E] font-normal">{t.name}</div>
                  <div className="text-[11px] uppercase tracking-[0.24em] text-[#8597AE] mt-1">{t.suburb}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
