import React from "react";
import { PureBreezeLogo } from "@/components/PureBreezeLogo";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const COLS = [
  {
    title: "Services",
    items: [
      { label: "Split System Cleaning",  href: "#services" },
      { label: "Ducted System Cleaning", href: "#services" },
      { label: "Commercial AC Cleaning", href: "#services" },
      { label: "Air Quality Testing",    href: "#services" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About Us",   href: "#about"   },
      { label: "Our Process",href: "#process" },
      { label: "Gallery",    href: "#gallery" },
      { label: "Contact Us", href: "#contact" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Dangers of Dirty Air", href: "#danger"   },
      { label: "Benefits of Clean Air",href: "#benefits" },
      { label: "FAQs",                 href: "#faq"      },
      { label: "Care Tips",            href: "#about"    },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-white border-t border-[#E5ECF4] pt-16 pb-10" data-testid="site-footer">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10">

        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <a href="#top" className="inline-block mb-5">
              <PureBreezeLogo size={44} showWordmark showTagline />
            </a>
            <p className="text-[13px] text-[#5A6B82] leading-[1.7] font-light max-w-xs">
              Hospital-grade air cleaning for homes and businesses across
              Queensland. Cleaner air. Better living.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white border border-[#DCE7F3] flex items-center justify-center text-[#0A2A4E] hover:bg-[#F2F7FD] transition-colors">
                <Facebook size={14} strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white border border-[#DCE7F3] flex items-center justify-center text-[#0A2A4E] hover:bg-[#F2F7FD] transition-colors">
                <Instagram size={14} strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="Twitter" className="w-8 h-8 rounded-full bg-white border border-[#DCE7F3] flex items-center justify-center text-[#0A2A4E] hover:bg-[#F2F7FD] transition-colors">
                <Twitter size={14} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <div className="text-[11px] uppercase tracking-[0.24em] text-[#0A2A4E] font-medium mb-5">{col.title}</div>
              <ul className="space-y-3">
                {col.items.map((it) => (
                  <li key={it.label}>
                    <a href={it.href} className="text-[13px] text-[#5A6B82] hover:text-[#1F5AA8] font-light transition-colors">{it.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.24em] text-[#0A2A4E] font-medium mb-5">Contact</div>
            <ul className="space-y-3">
              <li>
                <a href="tel:0490507878" className="flex items-center gap-2.5 text-[13px] text-[#5A6B82] hover:text-[#1F5AA8] font-light" data-testid="footer-phone">
                  <Phone size={13} strokeWidth={1.5} className="text-[#1F5AA8]" />
                  0490 507 878
                </a>
              </li>
              <li>
                <a href="mailto:hello@purebreeze.com.au" className="flex items-center gap-2.5 text-[13px] text-[#5A6B82] hover:text-[#1F5AA8] font-light" data-testid="footer-email">
                  <Mail size={13} strokeWidth={1.5} className="text-[#1F5AA8]" />
                  hello@purebreeze.com.au
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-[13px] text-[#5A6B82] font-light">
                <MapPin size={13} strokeWidth={1.5} className="text-[#1F5AA8]" />
                Brisbane, QLD
              </li>
            </ul>

            <a
              href="#book"
              className="pill pill-navy mt-6 w-full px-5 py-2.5 text-[12px]"
            >
              Book a clean <span className="ml-1.5">→</span>
            </a>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-[#E5ECF4] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#8597AE] font-light">© {new Date().getFullYear()} PureBreeze. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[11px] text-[#8597AE] font-light hover:text-[#0A2A4E]">Privacy Policy</a>
            <a href="#" className="text-[11px] text-[#8597AE] font-light hover:text-[#0A2A4E]">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
