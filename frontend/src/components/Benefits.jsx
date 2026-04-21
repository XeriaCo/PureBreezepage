import React from "react";
import { motion } from "framer-motion";
import { Leaf, DollarSign, Heart, Moon, Sparkles, Zap } from "lucide-react";

const BENEFITS = [
  { icon: <DollarSign size={22} />, title: "Save up to 30% on power", body: "A clean coil transfers heat efficiently — less load, lower bills every quarter." },
  { icon: <Heart size={22} />,      title: "Healthier family",        body: "Remove mould, bacteria and allergens. Breathe hospital-grade filtered air." },
  { icon: <Moon size={22} />,       title: "Whisper-quiet nights",    body: "A debris-free fan runs silent — sleep deeper without that rattling hum." },
  { icon: <Zap size={22} />,        title: "Restore icy performance", body: "Feel full cooling power within minutes, even on Queensland's hottest days." },
  { icon: <Leaf size={22} />,       title: "Eco-friendly sanitisation", body: "Biodegradable enzymes kill pathogens without harsh chemicals or residue." },
  { icon: <Sparkles size={22} />,   title: "Extend unit life by 5+ years", body: "Regular professional cleans double the lifespan of your investment." },
];

export default function Benefits() {
  return (
    <section id="benefits" className="relative py-24 lg:py-32 bg-white" data-testid="benefits-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 border border-sky-100 px-4 py-2 mb-5">
              <span className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
              <span className="text-xs font-bold tracking-widest uppercase text-sky-700">The PureBreeze difference</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 leading-[1.05]">
              From <span className="text-red-500 line-through decoration-2">toxic</span> to{" "}
              <span className="text-sky-500">transformative.</span>
            </h2>
            <p className="mt-6 text-lg text-slate-600 max-w-lg leading-relaxed">
              Our signature clean doesn't just remove the dirt — it restores your unit to better-than-new condition and your home to
              <span className="font-semibold text-slate-900"> fresh coastal air</span>.
            </p>

            {/* photo mosaic */}
            <div className="mt-8 grid grid-cols-3 gap-2" data-testid="benefits-photos">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-sky-100">
                <img
                  src="https://images.pexels.com/photos/8961065/pexels-photo-8961065.jpeg"
                  alt="Clean AC unit"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-sky-100 row-span-2">
                <img
                  src="https://images.pexels.com/photos/5824517/pexels-photo-5824517.jpeg"
                  alt="Fresh AC"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-sky-100">
                <img
                  src="https://images.pexels.com/photos/6471913/pexels-photo-6471913.jpeg"
                  alt="PureBreeze technician"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="relative col-span-2 aspect-[2/1] rounded-2xl overflow-hidden border border-sky-100">
                <img
                  src="https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg"
                  alt="AC servicing"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="mt-6 p-6 rounded-3xl bg-gradient-to-br from-sky-50 to-cyan-50 border border-sky-100">
              <div className="font-display text-5xl font-black text-sky-600 tracking-tighter">99.7%</div>
              <div className="text-sm text-slate-700 mt-1">of tested airborne pathogens eliminated after a PureBreeze clean.</div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group relative rounded-3xl bg-white border border-sky-100 p-6 shadow-[0_6px_24px_rgba(14,165,233,0.06)] hover:shadow-[0_10px_30px_rgba(14,165,233,0.18)] btn-lift"
                data-testid={`benefit-card-${i}`}
              >
                <div className="w-11 h-11 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-colors">
                  {b.icon}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-slate-900 tracking-tight">{b.title}</h3>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">{b.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
