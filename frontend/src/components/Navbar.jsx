import React, { useEffect, useState } from "react";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { PureBreezeLogo } from "@/components/PureBreezeLogo";

const NAV = [
  { label: "Services",       href: "#services" },
  { label: "How it works",   href: "#process"  },
  { label: "Why PureBreeze", href: "#danger"   },
  { label: "Reviews",        href: "#reviews"  },
  { label: "Contact",        href: "#contact"  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Top-of-page state has white text (over dark hero); scrolled state has navy text on white glass
  const textColor = scrolled ? "text-[#0A2A4E]" : "text-white";
  const hoverColor = scrolled ? "hover:text-[#1F5AA8]" : "hover:text-[#BFD4EE]";

  return (
    <header
      data-testid="main-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-[#E5ECF4]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1380px] mx-auto px-6 sm:px-8 lg:px-10 h-20 flex items-center justify-between gap-6">

        {/* Brand lockup */}
        <a href="#top" className="flex items-center flex-shrink-0" data-testid="nav-logo" aria-label="PureBreeze home">
          <PureBreezeLogo size={38} showWordmark showTagline variant={scrolled ? "light" : "dark"} />
        </a>

        {/* Centred links */}
        <nav className="hidden lg:flex items-center gap-8" data-testid="nav-links">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`text-[11px] uppercase tracking-[0.18em] font-medium transition-colors ${textColor} ${hoverColor}`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* Phone + CTA */}
        <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
          <a href="tel:0490205298" className="flex items-center gap-3 group" data-testid="nav-phone">
            <Phone size={16} strokeWidth={1.5} className={`${textColor} transition-colors`} />
            <span className="leading-tight">
              <span className={`block text-[13px] font-semibold ${textColor}`}>0490 205 298</span>
              <span className={`block text-[10px] mt-0.5 ${scrolled ? "text-[#8597AE]" : "text-white/55"}`}>Call for a quote</span>
            </span>
          </a>
          <a
            href="#book"
            className="pill bg-[#1F5AA8] text-white hover:bg-[#2E6FBF] btn-lift px-6 py-3.5 text-[11px] uppercase tracking-[0.16em]"
            data-testid="nav-cta"
          >
            Book a clean <ArrowRight size={13} strokeWidth={1.8} className="ml-2" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className={`lg:hidden p-2 transition-colors ${textColor}`}
          onClick={() => setOpen((o) => !o)}
          data-testid="nav-mobile-toggle"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-[#E5ECF4] px-6 py-6 space-y-1 shadow-luxe" data-testid="nav-mobile-menu">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-[12px] uppercase tracking-[0.18em] text-[#0A2A4E] font-medium border-b border-[#F2F7FD]"
            >
              {n.label}
            </a>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <a href="tel:0490205298" className="flex items-center gap-2.5 text-sm text-[#0A2A4E] font-semibold">
              <Phone size={14} strokeWidth={1.6} /> 0490 205 298
              <span className="text-[10px] text-[#8597AE] font-normal">Call for a quote</span>
            </a>
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="pill bg-[#1F5AA8] text-white px-6 py-3.5 text-[11px] uppercase tracking-[0.16em] justify-center"
            >
              Book a clean <ArrowRight size={13} strokeWidth={1.8} className="ml-2" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
