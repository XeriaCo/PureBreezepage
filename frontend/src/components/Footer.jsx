import React from "react";
import { PureBreezeLogo } from "@/components/PureBreezeLogo";
import { Phone, Mail, MapPin } from "lucide-react";

const AREAS = [
  "Brisbane", "Gold Coast", "Sunshine Coast", "Toowoomba", "Ipswich",
  "Logan", "Redlands", "Noosa", "Caboolture", "Cairns", "Townsville", "Mackay",
];

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-white pt-20 pb-10" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="bg-white rounded-2xl p-3 inline-block">
              <PureBreezeLogo size={42} />
            </div>
            <p className="mt-5 text-sm text-slate-400 leading-relaxed max-w-xs">
              Queensland's most trusted air conditioner cleaning service.
              Breathe pure. Live better.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold tracking-widest uppercase text-sky-400 mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:0490507878" className="flex items-center gap-3 text-slate-200 hover:text-sky-400" data-testid="footer-phone">
                  <Phone size={15} /> 0490 507 878
                </a>
              </li>
              <li>
                <a href="mailto:PureBreeze@gmail.com" className="flex items-center gap-3 text-slate-200 hover:text-sky-400" data-testid="footer-email">
                  <Mail size={15} /> PureBreeze@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <MapPin size={15} /> Queensland, Australia
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold tracking-widest uppercase text-sky-400 mb-4">Service areas</h4>
            <div className="flex flex-wrap gap-2">
              {AREAS.map((a) => (
                <span
                  key={a}
                  className="text-xs px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300"
                  data-testid={`footer-area-${a.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} PureBreeze. All rights reserved. Queensland-owned.</p>
          <p className="text-xs text-slate-500">ABN · HVAC-certified · $20M Insured</p>
        </div>
      </div>
    </footer>
  );
}
