import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  { name: "Sarah M.", suburb: "New Farm · Brisbane",         rating: 5, text: "Our split system smelled musty for years. PureBreeze came out same-day and the difference is unreal — it feels like a brand-new unit. No more coughing at night." },
  { name: "Daniel K.", suburb: "Surfers Paradise · Gold Coast", rating: 5, text: "Booked the same afternoon. The technician was professional and explained everything. Our power bill noticeably dropped the very next month." },
  { name: "Priya L.", suburb: "Toowoomba",                  rating: 5, text: "I have asthma and the air in our home used to set me off every summer. After PureBreeze cleaned the ducted system, six months without a flare-up." },
  { name: "Marcus T.", suburb: "Noosa Heads",                rating: 5, text: "Fair price, no upselling, and they left the room cleaner than they found it. The office has already been booked. Gold-standard service." },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="relative py-24 lg:py-32 bg-frost" data-testid="testimonials-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10">

        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-display text-4xl sm:text-5xl text-[#0A2A4E] font-medium tracking-tight">
            Loved by <span className="text-[#7BA6D9] font-light-display">Queensland families.</span>
          </h2>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="#1F5AA8" stroke="#1F5AA8" strokeWidth={0} />
              ))}
            </div>
            <span className="text-sm text-[#5A6B82] font-light">4.9 average · 380+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="relative bg-white p-8 lg:p-10 rounded-2xl hairline shadow-card"
              data-testid={`testimonial-card-${i}`}
            >
              <div className="flex items-center gap-1 mb-5">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={12} fill="#1F5AA8" stroke="#1F5AA8" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="font-display text-lg text-[#0A2A4E] leading-[1.55] font-normal">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-8 pt-5 border-t border-[#E5ECF4] flex items-center justify-between">
                <div>
                  <div className="font-display text-sm text-[#0A2A4E] font-medium">{t.name}</div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-[#8597AE] mt-1">{t.suburb}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
