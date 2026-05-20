import React, { useEffect, useState } from "react";
import { PureBreezeLogo } from "@/components/PureBreezeLogo";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Dangers",  href: "#danger"   },
  { label: "Benefits", href: "#benefits" },
  { label: "Services", href: "#services" },
  { label: "Process",  href: "#process"  },
  { label: "Gallery",  href: "#gallery"  },
  { label: "About",    href: "#about"    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="main-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-[#E5ECF4]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10 h-20 grid grid-cols-3 items-center">

        {/* Logo */}
        <a href="#top" className="flex items-center gap-2" data-testid="nav-logo-link">
          <PureBreezeLogo size={28} />
          <span className="font-display text-lg text-[#0A2A4E] font-medium tracking-tight">PureBreeze</span>
        </a>

        {/* Centred nav */}
        <nav className="hidden lg:flex items-center justify-center gap-8">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium text-[#0A2A4E] hover:text-[#1F5AA8] transition-colors"
              data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center justify-end">
          <a
            href="#book"
            className="pill pill-navy btn-lift"
            data-testid="nav-cta-quote"
          >
            Book a clean <span className="ml-1.5">→</span>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="lg:hidden p-2 text-[#0A2A4E] justify-self-end col-start-3"
          onClick={() => setOpen((o) => !o)}
          data-testid="nav-mobile-toggle"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {open && (
        <div
          className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-[#E5ECF4] px-6 py-7 space-y-5"
          data-testid="nav-mobile-panel"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block text-[15px] font-medium text-[#0A2A4E]"
              data-testid={`nav-mobile-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {item.label}
            </a>
          ))}
          <div className="divider-hair my-5" />
          <a href="tel:0490507878" className="block text-base font-medium text-[#1F5AA8]" data-testid="nav-mobile-phone">
            0490 507 878
          </a>
          <a
            href="#book"
            onClick={() => setOpen(false)}
            className="pill pill-navy w-full"
            data-testid="nav-mobile-cta"
          >
            Book a clean <span className="ml-1.5">→</span>
          </a>
        </div>
      )}
    </header>
  );
}
