import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function FoundersNote() {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden" data-testid="founders-note-section">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-20 w-[360px] h-[360px] bg-sky-100/60 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-12 gap-10 items-start"
        >
          {/* Left: meta */}
          <div className="lg:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-semibold">
              From the founder
            </div>
            <div className="mt-3 font-display text-sm text-slate-900 font-semibold">James Morrison</div>
            <div className="text-xs text-slate-500">Founder · HVAC Lic. #QLD-082-415</div>

            <div className="mt-6 flex items-center gap-3">
              {/* Initials mark — no stock face photo, more premium */}
              <div className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center font-display font-bold text-lg ring-4 ring-sky-50">
                JM
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400">Est.</div>
                <div className="font-display text-xl font-bold text-slate-900">2019</div>
              </div>
            </div>
          </div>

          {/* Right: note */}
          <div className="lg:col-span-9 relative">
            <Quote size={56} className="absolute -top-4 -left-2 text-sky-100 -z-10" strokeWidth={1.2} />

            <p className="font-display text-2xl sm:text-3xl lg:text-[2.15rem] text-slate-900 leading-[1.32] tracking-tight font-light">
              I started <span className="font-semibold">PureBreeze</span> after cleaning my own family's ducted system —
              the grime that came out of a &ldquo;serviced&rdquo; unit made me sick. Literally.
              So we rebuilt the cleaning process from scratch, borrowed standards from hospitals,
              and <span className="serif-italic text-sky-600">refused</span> to cut corners.
              Every single unit we touch gets the same meticulous seven-step clean —
              <span className="underline decoration-sky-400 decoration-2 underline-offset-4"> whether you're paying $120 or $5,000</span>.
            </p>

            <p className="mt-6 text-slate-600 leading-relaxed max-w-2xl">
              If we don't leave you breathing easier, we come back and re-do it for free. No fine print, no arguments.
              That's the promise — and it's why Queensland families trust us with their homes, their offices and their health.
            </p>

            {/* handwritten signature */}
            <div className="mt-8 flex items-end gap-6">
              <div>
                <div className="handwriting text-4xl text-slate-900 leading-none">James M.</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-slate-400 font-semibold">
                  Founder · PureBreeze QLD
                </div>
              </div>

              {/* small stamp */}
              <div className="tag-tilt-right border-2 border-sky-500 text-sky-600 rounded-md px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold">
                Signed & Sealed
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
