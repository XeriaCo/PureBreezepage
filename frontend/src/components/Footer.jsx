import React from "react";
import { PureBreezeLogo } from "@/components/PureBreezeLogo";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

const AREAS = [
  "Brisbane", "Gold Coast", "Sunshine Coast", "Toowoomba", "Ipswich",
  "Logan", "Redlands", "Noosa", "Caboolture", "Cairns", "Townsville", "Mackay",
];

const NAV = [
  { label: "Services",  href: "#services" },
  { label: "Process",   href: "#process"  },
  { label: "Gallery",   href: "#gallery"  },
  { label: "Reviews",   href: "#reviews"  },
  { label: "Contact",   href: "#contact"  },
];

export default function Footer() {
  return (
    <footer className="relative bg-navy-deep text-white pt-28 pb-12" data-testid="site-footer">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">

        {/* Top — large signoff */}
        <div className="grid lg:grid-cols-12 gap-12 pb-20 border-b border-white/10">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-10">
              <PureBreezeLogo size={36} variant="dark" />
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl text-white tracking-tight">PureBreeze</span>
                <span className="text-[10px] tracking-luxe text-white/50 uppercase mt-0.5">Air · Curated</span>
              </div>
            </div>
            <h3 className="font-display text-4xl sm:text-5xl text-white font-light leading-[1.1] tracking-tight max-w-2xl">
              The quiet art of
              <br />
              <span className="serif-italic text-[#7BA6D9]">pristine air,</span> across Queensland.
            </h3>

            <a
              href="tel:0490507878"
              className="mt-10 inline-flex items-center gap-3 text-white border-b border-white/30 pb-2 hover:border-white transition-colors group"
            >
              <Phone size={14} strokeWidth={1.4} />
              <span className="font-display text-2xl font-light">0490 507 878</span>
              <ArrowUpRight size={16} strokeWidth={1.4} className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-10">
            <div>
              <div className="eyebrow text-white/70 mb-6">Navigate</div>
              <ul className="space-y-4">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="text-sm text-white/85 hover:text-white link-underline">{n.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="eyebrow text-white/70 mb-6">Contact</div>
              <ul className="space-y-4 text-sm">
                <li>
                  <a href="mailto:PureBreeze@gmail.com" className="flex items-start gap-2 text-white/85 hover:text-white" data-testid="footer-email">
                    <Mail size={13} strokeWidth={1.4} className="mt-1 flex-shrink-0" />
                    PureBreeze@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-2 text-white/85">
                  <MapPin size={13} strokeWidth={1.4} className="mt-1 flex-shrink-0" />
                  Queensland, Australia
                </li>
                <li>
                  <a href="tel:0490507878" className="flex items-start gap-2 text-white/85 hover:text-white" data-testid="footer-phone">
                    <Phone size={13} strokeWidth={1.4} className="mt-1 flex-shrink-0" />
                    0490 507 878
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Service areas */}
        <div className="py-12 border-b border-white/10">
          <div className="eyebrow text-white/70 mb-6">Service Areas</div>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {AREAS.map((a) => (
              <span
                key={a}
                className="text-sm text-white/80 font-light"
                data-testid={`footer-area-${a.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {a}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50 font-light">© {new Date().getFullYear()} PureBreeze · All rights reserved · Queensland-owned</p>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/50">HVAC-certified · $20M Insured</p>
        </div>
      </div>
    </footer>
  );
}
