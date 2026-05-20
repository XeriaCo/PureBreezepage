import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    title: "Split System Cleaning",
    subtitle: "Residential homes",
    price: 165,
    time: "60 minutes",
    image: "https://images.unsplash.com/photo-1631545806609-aaeed8b86259?auto=format&fit=crop&w=1200&q=85",
    bullets: ["Chemical coil wash", "Filter deep clean", "Fan blade sanitisation", "Drain line flush"],
    featured: true,
  },
  {
    title: "Ducted System Cleaning",
    subtitle: "Whole-home systems",
    price: 450,
    time: "3 hours",
    image: "https://images.unsplash.com/photo-1556909114-44e3e9622c6c?auto=format&fit=crop&w=1200&q=85",
    bullets: ["All vents & returns", "Main unit service", "Antibacterial fog", "Airflow rebalance"],
  },
  {
    title: "Commercial AC Cleaning",
    subtitle: "Offices & retail",
    price: 380,
    time: "2.5 hours",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
    bullets: ["After-hours service", "Compliance report", "Multi-unit discount", "Tenant-safe chemicals"],
  },
  {
    title: "Air Quality Testing",
    subtitle: "Pre & post-clean",
    price: 120,
    time: "45 minutes",
    image: "https://images.unsplash.com/photo-1605007493699-af65834f8a00?auto=format&fit=crop&w=1200&q=85",
    bullets: ["PM 2.5 monitoring", "CFU microbial count", "VOC analysis", "Detailed report"],
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
            Services &amp; <span className="text-[#7BA6D9] font-light-display">pricing.</span>
          </h2>
          <p className="mt-4 text-base text-[#5A6B82] leading-[1.7] font-light">
            Transparent Queensland pricing. No upsells. On-site inspection precedes every service.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((s, i) => (
            <motion.a
              href="#book"
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group block bg-white rounded-2xl hairline shadow-card btn-lift overflow-hidden"
              data-testid={`service-card-${i}`}
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#EEF4FB]">
                <img
                  src={s.image}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover img-luxe transition-transform duration-[1200ms] group-hover:scale-105"
                  loading="lazy"
                />
                {s.featured && (
                  <div className="absolute top-4 left-4 bg-white text-[#0A2A4E] text-[10px] uppercase tracking-[0.22em] font-medium px-3 py-1.5 rounded-full shadow-card">
                    Most booked
                  </div>
                )}
              </div>

              <div className="p-7 lg:p-8">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.26em] text-[#7BA6D9] font-medium mb-2">{s.subtitle}</div>
                    <h3 className="font-display text-xl text-[#0A2A4E] font-medium tracking-tight">{s.title}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-[#8597AE]">from</div>
                    <div className="font-display text-2xl text-[#0A2A4E] font-medium mt-1">${s.price}</div>
                  </div>
                </div>

                <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 mb-6 mt-5 pt-5 border-t border-[#E5ECF4]">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[12px] text-[#5A6B82] font-light">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[#1F5AA8] flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#8597AE] font-light tracking-wide">{s.time}</span>
                  <span className="inline-flex items-center gap-2 text-[12px] font-medium text-[#0A2A4E] group-hover:text-[#1F5AA8] transition-colors">
                    Reserve
                    <ArrowUpRight size={13} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
