import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    suburb: "New Farm, Brisbane",
    rating: 5,
    text: "Our split system smelled musty for years. PureBreeze came out same-day and the difference is unreal — feels like a brand new unit. No more coughing at night!",
  },
  {
    name: "Daniel K.",
    suburb: "Surfers Paradise, Gold Coast",
    rating: 5,
    text: "Got the AI quote in 30 seconds, booked that afternoon. The tech was professional, explained everything, and our power bill dropped the very next month.",
  },
  {
    name: "Priya L.",
    suburb: "Toowoomba",
    rating: 5,
    text: "I have asthma and the air in our home used to set me off every summer. After PureBreeze cleaned the ducted system, zero flare-ups in 6 months. Life-changing.",
  },
  {
    name: "Marcus T.",
    suburb: "Noosa Heads",
    rating: 5,
    text: "Fair price, zero upsell, and they left the area cleaner than they found it. Already booked them for the office. Absolute gold-standard service.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 lg:py-32 bg-white" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 border border-sky-100 px-4 py-2 mb-5">
            <span className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
            <span className="text-xs font-bold tracking-widest uppercase text-sky-700">Reviews</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tighter text-slate-900 leading-[1.05]">
            Loved by <span className="text-sky-500">380+ Queensland</span> families.
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#0EA5E9" stroke="#0EA5E9" />
              ))}
            </div>
            <span className="font-semibold text-slate-800">4.9/5 average rating</span>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-3xl bg-gradient-to-br from-sky-50 to-white border border-sky-100 p-7 btn-lift"
              data-testid={`testimonial-card-${i}`}
            >
              <div className="flex">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={16} fill="#0EA5E9" stroke="#0EA5E9" />
                ))}
              </div>
              <p className="mt-4 text-slate-800 leading-relaxed">"{t.text}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center text-white font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.suburb}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
