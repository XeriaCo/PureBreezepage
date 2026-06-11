import React from "react";
import { motion } from "framer-motion";
import { Home, Layers, Building2, Wind, ArrowRight } from "lucide-react";
import { fadeUp, stagger, viewportOnce, EASE } from "@/lib/anim";

const SERVICES = [
  {
    icon: <Home size={20} strokeWidth={1.4} />,
    title: "Split System Cleaning",
    sub: "Residential homes & apartments",
    desc: "A full strip-down chemical clean that removes mould, biofilm and dust from deep inside the unit — not just the filters.",
    image: "https://images.unsplash.com/photo-1631545806609-aaeed8b86259?auto=format&fit=crop&w=1200&q=85",
    bullets: ["Chemical coil wash", "Filter deep clean", "Fan blade sanitisation", "Drain line flush"],
  },
  {
    icon: <Layers size={20} strokeWidth={1.4} />,
    title: "Ducted System Cleaning",
    sub: "Whole-home ducted systems",
    desc: "Every vent, every return, the main unit and the ductwork itself — finished with an antibacterial fog through the entire run.",
    image: "https://images.unsplash.com/photo-1556909114-44e3e9622c6c?auto=format&fit=crop&w=1200&q=85",
    bullets: ["All vents & returns", "Main unit service", "Antibacterial fog", "Airflow rebalance"],
  },
  {
    icon: <Building2 size={20} strokeWidth={1.4} />,
    title: "Commercial Cleaning",
    sub: "Offices, retail & hospitality",
    desc: "After-hours servicing with written compliance reporting, so your team and customers walk into clean air every morning.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
    bullets: ["After-hours service", "Compliance report", "Multi-unit discount", "Tenant-safe chemicals"],
  },
  {
    icon: <Wind size={20} strokeWidth={1.4} />,
    title: "Air Quality Testing",
    sub: "Pre & post-clean diagnostics",
    desc: "Laboratory-grade measurement before and after the clean — so the improvement isn't a promise, it's a number on a report.",
    image: "https://images.unsplash.com/photo-1605007493699-af65834f8a00?auto=format&fit=crop&w=1200&q=85",
    bullets: ["PM 2.5 monitoring", "CFU microbial count", "VOC analysis", "Written report"],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-36 bg-white" data-testid="services-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center max-w-2xl mx-auto mb-16 lg:mb-20"
        >
          <div className="mb-5 inline-flex items-center gap-3">
            <span className="w-8 h-px bg-[#7BA6D9]" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#7BA6D9] font-medium">Our services</span>
            <span className="w-8 h-px bg-[#7BA6D9]" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-[#0A2A4E] font-medium tracking-tight">
            Services <span className="text-[#7BA6D9] font-light-display">we provide.</span>
          </h2>
          <p className="mt-5 text-base text-[#5A6B82] leading-[1.7] font-light">
            Hospital-grade air conditioning cleaning for homes and businesses across Queensland —
            measured, documented, and guaranteed.
          </p>
        </motion.div>

        <motion.div
          variants={stagger(0.05, 0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              className="group bg-white rounded-2xl hairline shadow-card overflow-hidden card-hover"
              data-testid={`service-card-${i}`}
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#EEF4FB]">
                <img
                  src={s.image}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover img-luxe transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061A33]/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <span className="inline-flex items-center gap-2 text-white text-xs font-medium tracking-wide">
                    Book this service <ArrowRight size={12} strokeWidth={1.8} />
                  </span>
                </div>
              </div>
              <div className="p-7 lg:p-9">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-[#F2F7FD] flex items-center justify-center text-[#1F5AA8] transition-all duration-500 group-hover:bg-[#1F5AA8] group-hover:text-white">
                    {s.icon}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.26em] text-[#7BA6D9] font-medium">{s.sub}</div>
                </div>
                <h3 className="font-display text-xl text-[#0A2A4E] font-medium tracking-tight">{s.title}</h3>
                <p className="mt-3 text-[13px] text-[#5A6B82] leading-[1.7] font-light">{s.desc}</p>
                <ul className="mt-5 pt-5 border-t border-[#EEF3FA] grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[12px] text-[#5A6B82] font-light">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[#1F5AA8] flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Inline CTA so users still flow to booking */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mt-16"
        >
          <a href="#book" className="group pill pill-navy btn-lift px-7 py-4">
            Book a clean <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
