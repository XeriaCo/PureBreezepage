import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Home, Building2, Wind, Layers } from "lucide-react";

const SERVICES = [
  {
    num: "01",
    icon: <Home size={18} />,
    title: "Split System Clean",
    price: 165,
    time: "~60 min",
    image: "https://static.prod-images.emergentagent.com/jobs/b709f5ab-53d0-4ea5-b4b8-9d180465e97f/images/92a2813178e78b5d984a568c8656e0b699106225dacea72c8bca9f4819eb04eb.png",
    bullets: ["Chemical coil wash", "Filter deep clean", "Fan blade sanitisation", "Drain line flush"],
    popular: true,
  },
  {
    num: "02",
    icon: <Layers size={18} />,
    title: "Ducted System Clean",
    price: 450,
    time: "~3 hrs",
    image: "https://images.pexels.com/photos/5824517/pexels-photo-5824517.jpeg",
    bullets: ["All vents & returns", "Main unit service", "Antibacterial fog", "Airflow rebalance"],
  },
  {
    num: "03",
    icon: <Building2 size={18} />,
    title: "Commercial / Office",
    price: 380,
    time: "~2.5 hrs",
    image: "https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg",
    bullets: ["After-hours service", "Compliance report", "Multi-unit discount", "Tenant-safe chemicals"],
  },
  {
    num: "04",
    icon: <Wind size={18} />,
    title: "Window / Portable",
    price: 120,
    time: "~45 min",
    image: "https://images.pexels.com/photos/7031717/pexels-photo-7031717.jpeg",
    bullets: ["Full strip-down", "Coil chemical clean", "Mould removal", "Refit & test"],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32 bg-sky-50/70" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial header */}
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-xs tracking-widest uppercase text-slate-500">§ 02</span>
              <span className="h-px w-10 bg-slate-300" />
              <span className="font-mono text-xs tracking-widest uppercase text-slate-500">Services & pricing</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 leading-[1.02]">
              One signature clean. <br />
              <span className="serif-italic text-sky-600">Four ways</span> to deliver it.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-slate-600 leading-relaxed border-l-2 border-sky-300 pl-5 text-base sm:text-lg max-w-md">
              Transparent Queensland pricing. No hidden fees, no upsells. The price you see is the price you pay —
              with an on-site check before we touch a screw.
            </p>
          </div>
        </div>

        {/* Editorial bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {SERVICES.map((s, i) => {
            // 12-col layout: 01 and 04 span 7; 02 and 03 span 5 (asymmetric)
            const span = i === 0 ? "lg:col-span-7" : i === 1 ? "lg:col-span-5" : i === 2 ? "lg:col-span-5" : "lg:col-span-7";
            return (
              <motion.a
                href="#ai-quote"
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className={`group relative flex flex-col sm:flex-row rounded-3xl bg-white border border-sky-100 overflow-hidden hover:border-sky-300 btn-lift shadow-[0_10px_30px_-15px_rgba(14,165,233,0.15)] ${span}`}
                data-testid={`service-card-${i}`}
              >
                {/* image panel */}
                <div className="relative sm:w-5/12 h-44 sm:h-auto sm:min-h-[260px] overflow-hidden bg-slate-100 flex-shrink-0">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900/10 to-transparent" />

                  {/* huge editorial number */}
                  <div className="absolute top-3 left-4 font-display font-black text-white text-6xl leading-none tracking-tighter mix-blend-overlay opacity-80 select-none">
                    {s.num}
                  </div>

                  {s.popular && (
                    <div className="absolute top-4 right-4 tag-tilt-right bg-sky-500 text-white text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded">
                      Most booked
                    </div>
                  )}
                </div>

                {/* content panel */}
                <div className="flex flex-col flex-1 p-6 sm:p-7">
                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">{s.icon}</span>
                    <span className="text-xs uppercase tracking-widest font-semibold">{s.time}</span>
                  </div>

                  <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-slate-900">
                    {s.title}
                  </h3>

                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-xs text-slate-500">from</span>
                    <span className="font-display text-4xl font-black text-slate-900 tracking-tighter">${s.price}</span>
                    <span className="text-sm text-slate-500">AUD</span>
                  </div>

                  <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-sky-500 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-5 flex items-center justify-between">
                    <span
                      className="inline-flex items-center gap-1 text-sm font-semibold text-sky-600 group-hover:text-sky-700 hand-underline"
                      data-testid={`service-cta-${i}`}
                    >
                      Get quote
                    </span>
                    <span className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-sky-500 group-hover:text-white text-slate-700 flex items-center justify-center transition-colors">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
