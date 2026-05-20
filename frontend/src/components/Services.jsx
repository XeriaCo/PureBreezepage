import React from "react";
import { motion } from "framer-motion";
import { Home, Layers, Building2, Wind } from "lucide-react";

const SERVICES = [
  {
    icon: <Home size={20} strokeWidth={1.4} />,
    title: "Split System Cleaning",
    sub: "Residential homes & apartments",
    image: "https://images.unsplash.com/photo-1631545806609-aaeed8b86259?auto=format&fit=crop&w=1200&q=85",
    bullets: ["Chemical coil wash", "Filter deep clean", "Fan blade sanitisation", "Drain line flush"],
  },
  {
    icon: <Layers size={20} strokeWidth={1.4} />,
    title: "Ducted System Cleaning",
    sub: "Whole-home ducted systems",
    image: "https://images.unsplash.com/photo-1556909114-44e3e9622c6c?auto=format&fit=crop&w=1200&q=85",
    bullets: ["All vents & returns", "Main unit service", "Antibacterial fog", "Airflow rebalance"],
  },
  {
    icon: <Building2 size={20} strokeWidth={1.4} />,
    title: "Commercial Cleaning",
    sub: "Offices, retail & hospitality",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
    bullets: ["After-hours service", "Compliance report", "Multi-unit discount", "Tenant-safe chemicals"],
  },
  {
    icon: <Wind size={20} strokeWidth={1.4} />,
    title: "Air Quality Testing",
    sub: "Pre & post-clean diagnostics",
    image: "https://images.unsplash.com/photo-1605007493699-af65834f8a00?auto=format&fit=crop&w=1200&q=85",
    bullets: ["PM 2.5 monitoring", "CFU microbial count", "VOC analysis", "Written report"],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32 bg-white" data-testid="services-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl text-[#0A2A4E] font-medium tracking-tight">
            Services <span className="text-[#7BA6D9] font-light-display">we provide.</span>
          </h2>
          <p className="mt-4 text-base text-[#5A6B82] leading-[1.7] font-light">
            Hospital-grade air conditioning cleaning for homes and businesses across Queensland.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group bg-white rounded-2xl hairline shadow-card overflow-hidden btn-lift"
              data-testid={`service-card-${i}`}
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#EEF4FB]">
                <img
                  src={s.image}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover img-luxe transition-transform duration-[1200ms] group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-7 lg:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-[#F2F7FD] flex items-center justify-center text-[#1F5AA8]">
                    {s.icon}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.26em] text-[#7BA6D9] font-medium">{s.sub}</div>
                </div>
                <h3 className="font-display text-xl text-[#0A2A4E] font-medium tracking-tight">{s.title}</h3>
                <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5">
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
        </div>

        {/* Inline CTA so users still flow to booking */}
        <div className="text-center mt-14">
          <a href="#book" className="pill pill-navy btn-lift px-7 py-4">
            Book a clean <span className="ml-2">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
