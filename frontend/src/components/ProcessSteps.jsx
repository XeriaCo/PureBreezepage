import React from "react";
import { motion } from "framer-motion";
import { Camera, Wrench, SprayCan, Droplets, ShieldCheck, Wind, ClipboardCheck } from "lucide-react";

const STEPS = [
  { icon: <Camera size={20} />,         title: "1. Inspect & photograph",   body: "We document before photos and identify mould, dust and wear." },
  { icon: <Wrench size={20} />,         title: "2. Strip & protect",         body: "Panels removed, room protected with drop sheets and bags." },
  { icon: <SprayCan size={20} />,       title: "3. Chemical coil treatment", body: "Hospital-grade enzymes break down biofilm, mould and grime." },
  { icon: <Droplets size={20} />,       title: "4. Pressure rinse",          body: "Fins rinsed clean to restore maximum heat exchange." },
  { icon: <ShieldCheck size={20} />,    title: "5. Sanitise & deodorise",    body: "Anti-bacterial fog eliminates 99.7% of airborne pathogens." },
  { icon: <Wind size={20} />,           title: "6. Reassemble & test",       body: "Airflow & temperature checked against manufacturer specs." },
  { icon: <ClipboardCheck size={20} />, title: "7. After photos + report",   body: "You get a full visual report + 30-day satisfaction guarantee." },
];

const PHOTOS = [
  {
    src: "https://images.pexels.com/photos/6471913/pexels-photo-6471913.jpeg",
    alt: "PureBreeze technician in PPE",
    className: "col-span-2 row-span-2",
  },
  {
    src: "https://images.pexels.com/photos/7031717/pexels-photo-7031717.jpeg",
    alt: "Dirty AC filter before service",
  },
  {
    src: "https://images.pexels.com/photos/8961065/pexels-photo-8961065.jpeg",
    alt: "Clean AC unit after service",
  },
  {
    src: "https://images.pexels.com/photos/5824517/pexels-photo-5824517.jpeg",
    alt: "Split system install",
    className: "col-span-2",
  },
];

export default function ProcessSteps() {
  return (
    <section className="relative py-24 lg:py-32 bg-white" data-testid="process-section">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 right-0 w-[420px] h-[420px] bg-sky-100/60 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-cyan-100/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* photo mosaic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="grid grid-cols-4 grid-rows-3 gap-3 h-[520px]">
              {PHOTOS.map((p, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-2xl border border-sky-100 group ${p.className || ""}`}
                  data-testid={`process-photo-${i}`}
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-cyan-50 border border-sky-100">
              <div className="w-10 h-10 rounded-xl bg-white border border-sky-100 flex items-center justify-center">
                <ShieldCheck size={18} className="text-sky-600" />
              </div>
              <div>
                <div className="font-display text-sm font-bold text-slate-900">30-day satisfaction guarantee</div>
                <div className="text-xs text-slate-600">Not happy? We come back and re-clean — free.</div>
              </div>
            </div>
          </motion.div>

          {/* steps */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 border border-sky-100 px-4 py-2 mb-5">
              <span className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
              <span className="text-xs font-bold tracking-widest uppercase text-sky-700">How we clean</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tighter text-slate-900 leading-[1.05]">
              The PureBreeze <br /><span className="text-sky-500">7-step signature clean.</span>
            </h2>
            <p className="mt-5 text-lg text-slate-600 max-w-xl">
              Every unit — from a $120 window rattler to a $5,000 ducted system — gets the exact same meticulous process.
            </p>

            <div className="mt-8 relative">
              <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-sky-200 via-sky-300 to-transparent hidden sm:block" />
              <div className="space-y-4">
                {STEPS.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="relative flex gap-4 items-start pl-0 sm:pl-0 group"
                    data-testid={`process-step-${i}`}
                  >
                    <div className="relative z-10 w-9 h-9 rounded-full bg-white border-2 border-sky-300 text-sky-600 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500 transition-colors">
                      {step.icon}
                    </div>
                    <div className="pb-2">
                      <div className="font-display text-lg font-semibold text-slate-900 tracking-tight">{step.title}</div>
                      <div className="text-sm text-slate-600">{step.body}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
