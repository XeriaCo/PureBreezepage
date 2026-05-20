import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    num: "I",
    title: "Split System",
    subtitle: "Residential",
    price: 165,
    time: "60 minutes",
    image: "https://images.unsplash.com/photo-1631545806609-aaeed8b86259?auto=format&fit=crop&w=1200&q=85",
    bullets: ["Chemical coil wash", "Filter deep clean", "Fan blade sanitisation", "Drain line flush"],
    featured: true,
  },
  {
    num: "II",
    title: "Ducted System",
    subtitle: "Whole-home",
    price: 450,
    time: "3 hours",
    image: "https://images.unsplash.com/photo-1556909114-44e3e9622c6c?auto=format&fit=crop&w=1200&q=85",
    bullets: ["All vents & returns", "Main unit service", "Antibacterial fog", "Airflow rebalance"],
  },
  {
    num: "III",
    title: "Commercial",
    subtitle: "Offices & retail",
    price: 380,
    time: "2.5 hours",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
    bullets: ["After-hours service", "Compliance report", "Multi-unit discount", "Tenant-safe chemicals"],
  },
  {
    num: "IV",
    title: "Window & Portable",
    subtitle: "Single rooms",
    price: 120,
    time: "45 minutes",
    image: "https://images.unsplash.com/photo-1605007493699-af65834f8a00?auto=format&fit=crop&w=1200&q=85",
    bullets: ["Full strip-down", "Coil chemical clean", "Mould removal", "Refit & test"],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-32 lg:py-40 bg-glacier" data-testid="services-section">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">

        <div className="grid lg:grid-cols-12 gap-12 items-end mb-20">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-px bg-[#1F5AA8]" />
              <span className="eyebrow">Services · Pricing</span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-[#0A2A4E] leading-[1.0] tracking-tight">
              One signature clean.
              <br />
              <span className="serif-italic text-[#1F5AA8]">Four ways</span> to deliver it.
            </h2>
          </div>
          <p className="lg:col-span-5 text-lg text-[#5A6B82] leading-[1.75] font-light">
            Transparent Queensland pricing — no upsells, no surprises.
            An on-site inspection precedes every service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES.map((s, i) => (
            <motion.a
              href="#book"
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group block bg-white hairline shadow-luxe btn-lift overflow-hidden"
              data-testid={`service-card-${i}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#EEF4FB]">
                <img
                  src={s.image}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover img-luxe transition-transform duration-[1400ms] group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2A4E]/40 via-transparent to-transparent" />
                {s.featured && (
                  <div className="absolute top-5 right-5 bg-white text-[#0A2A4E] text-[10px] uppercase tracking-[0.24em] font-medium px-3 py-1.5">
                    Most Requested
                  </div>
                )}
                <div className="absolute bottom-5 left-6 font-display text-white/95 text-[2.6rem] leading-none font-light">
                  {s.num}
                </div>
              </div>

              <div className="p-8 lg:p-10">
                <div className="flex items-baseline justify-between mb-5">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.28em] text-[#7BA6D9] font-medium mb-2">{s.subtitle}</div>
                    <h3 className="font-display text-3xl text-[#0A2A4E] font-normal tracking-tight">{s.title}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-[0.24em] text-[#8597AE] mb-1">from</div>
                    <div className="font-display text-3xl font-light text-[#0A2A4E]">${s.price}</div>
                  </div>
                </div>

                <div className="divider-hair my-6" />

                <ul className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[13px] text-[#5A6B82] font-light">
                      <span className="mt-1.5 w-1 h-1 bg-[#1F5AA8] flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-[#8597AE]">{s.time}</span>
                  <span
                    className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] font-medium text-[#0A2A4E] group-hover:text-[#1F5AA8] transition-colors"
                    data-testid={`service-cta-${i}`}
                  >
                    Reserve
                    <ArrowUpRight size={14} strokeWidth={1.4} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
