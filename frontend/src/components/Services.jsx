import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Home, Building2, Wind, Layers } from "lucide-react";

const SERVICES = [
  {
    icon: <Home size={22} />,
    title: "Split System Clean",
    price: "from $165",
    image: "https://images.pexels.com/photos/8961065/pexels-photo-8961065.jpeg",
    bullets: ["Chemical coil wash", "Filter deep clean", "Fan blade sanitisation", "Drain line flush"],
  },
  {
    icon: <Layers size={22} />,
    title: "Ducted System Clean",
    price: "from $450",
    image: "https://images.pexels.com/photos/5824517/pexels-photo-5824517.jpeg",
    bullets: ["All vents & returns", "Main unit service", "Antibacterial fog", "Airflow rebalance"],
  },
  {
    icon: <Building2 size={22} />,
    title: "Commercial / Office",
    price: "from $380",
    image: "https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg",
    bullets: ["After-hours service", "Compliance report", "Multi-unit discount", "Tenant-safe chemicals"],
  },
  {
    icon: <Wind size={22} />,
    title: "Window / Portable",
    price: "from $120",
    image: "https://images.pexels.com/photos/7031717/pexels-photo-7031717.jpeg",
    bullets: ["Full strip-down", "Coil chemical clean", "Mould removal", "Refit & test"],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32 bg-sky-50" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-sky-100 px-4 py-2 mb-5 shadow-sm">
            <span className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
            <span className="text-xs font-bold tracking-widest uppercase text-sky-700">Our services</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 leading-[1.05]">
            Every system. <br /><span className="text-sky-500">Same signature shine.</span>
          </h2>
          <p className="mt-5 text-lg text-slate-600 max-w-xl">
            Transparent Queensland pricing. No hidden fees. Upfront quote before we touch a screw.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative flex flex-col rounded-3xl bg-white border border-sky-100 overflow-hidden hover:border-sky-300 btn-lift shadow-[0_6px_24px_rgba(14,165,233,0.05)]"
              data-testid={`service-card-${i}`}
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
                <div className="absolute top-3 left-3 w-11 h-11 rounded-2xl bg-white/95 backdrop-blur border border-sky-100 text-sky-600 flex items-center justify-center shadow-md">
                  {s.icon}
                </div>
              </div>

              <div className="flex flex-col flex-1 p-6">
                <h3 className="font-display text-xl font-bold tracking-tight text-slate-900">{s.title}</h3>
                <div className="mt-1 text-sm font-semibold text-sky-600">{s.price}</div>

                <ul className="mt-4 space-y-2 flex-1">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                <a
                  href="#ai-quote"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 group-hover:text-sky-700"
                  data-testid={`service-cta-${i}`}
                >
                  Get quote <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
