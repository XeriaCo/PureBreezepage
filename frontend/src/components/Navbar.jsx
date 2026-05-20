import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Services",     href: "#services" },
  { label: "How it works", href: "#process"  },
  { label: "Book",         href: "#book"     },
  { label: "Reviews",      href: "#reviews"  },
  { label: "Contact",      href: "#contact"  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Top-of-page state has white text (over hero image); scrolled state has navy text on white
  const textColor = scrolled ? "text-[#0A2A4E]" : "text-white";
  const ctaClass  = scrolled
    ? "bg-[#0A2A4E] text-white hover:bg-[#061A33]"
    : "bg-white text-[#0A2A4E] hover:bg-[#F2F7FD]";

  return (
    <header
      data-testid="main-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-[#E5ECF4]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-10 h-20 flex items-center justify-between">

        {/* Empty left spacer so centred nav stays centred — also doubles as the mobile menu slot */}
        <div className="flex items-center w-32">
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

        {/* Centred nav */}
        <nav className="hidden lg:flex items-center justify-center gap-9">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[12px] font-medium tracking-[0.2em] uppercase transition-colors ${textColor} hover:opacity-80`}
              data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center justify-end w-32">
          <a
            href="#book"
            className={`pill ${ctaClass} btn-lift transition-all`}
            data-testid="nav-cta-quote"
          >
            Book a clean <span className="ml-1.5">→</span>
          </a>
        </div>

        {/* Mobile CTA */}
        <div className="lg:hidden flex items-center w-32 justify-end">
          <a
            href="#book"
            className={`pill ${ctaClass} text-[11px] px-4 py-2`}
            data-testid="nav-cta-quote-mobile"
          >
            Book →
          </a>
        </div>
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
          <a href="tel:0490205298" className="block text-base font-medium text-[#1F5AA8]" data-testid="nav-mobile-phone">
            0490 205 298
          </a>
        </div>
      )}
    </header>
  );
}
