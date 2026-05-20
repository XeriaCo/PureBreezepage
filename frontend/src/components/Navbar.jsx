import React, { useEffect, useState } from "react";
import { PureBreezeLogo } from "@/components/PureBreezeLogo";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

const NAV = [
  { label: "Services",  href: "#services" },
  { label: "Process",   href: "#process"  },
  { label: "Gallery",   href: "#gallery"  },
  { label: "Reviews",   href: "#reviews"  },
  { label: "Contact",   href: "#contact"  },
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
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 h-20 sm:h-24 flex items-center justify-between">
        <a href="#top" className="flex-shrink-0 flex items-center gap-3" data-testid="nav-logo-link">
          <PureBreezeLogo size={36} />
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-xl text-[#0A2A4E] tracking-tight">PureBreeze</span>
            <span className="text-[10px] tracking-luxe text-[#5A6B82] uppercase mt-0.5">Air · Curated</span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium uppercase tracking-[0.18em] text-[#0A2A4E] link-underline"
              data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <a
            href="tel:0490507878"
            className="flex items-center gap-2 text-sm font-medium text-[#0A2A4E] hover:text-[#1F5AA8] transition-colors"
            data-testid="nav-phone-link"
          >
            <Phone size={14} strokeWidth={1.6} />
            0490 507 878
          </a>
          <Button
            onClick={() => (window.location.hash = "book")}
            className="rounded-none bg-[#0A2A4E] hover:bg-[#061A33] text-white px-7 py-6 text-[12px] uppercase tracking-[0.22em] font-medium btn-lift border-0"
            data-testid="nav-cta-quote"
          >
            Book a Service
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden p-3 text-[#0A2A4E] hover:bg-[#F2F7FD] rounded-full transition-colors"
          onClick={() => setOpen((o) => !o)}
          data-testid="nav-mobile-toggle"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {open && (
        <div
          className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-[#E5ECF4] px-6 py-8 space-y-5"
          data-testid="nav-mobile-panel"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block text-[15px] font-medium uppercase tracking-[0.2em] text-[#0A2A4E]"
              data-testid={`nav-mobile-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {item.label}
            </a>
          ))}
          <div className="divider-hair my-6" />
          <a
            href="tel:0490507878"
            className="block text-base font-medium text-[#1F5AA8]"
            data-testid="nav-mobile-phone"
          >
            0490 507 878
          </a>
          <Button
            onClick={() => { setOpen(false); window.location.hash = "book"; }}
            className="w-full rounded-none bg-[#0A2A4E] hover:bg-[#061A33] text-white py-6 text-[12px] uppercase tracking-[0.22em] font-medium"
            data-testid="nav-mobile-cta"
          >
            Book a Service
          </Button>
        </div>
      )}
    </header>
  );
}
