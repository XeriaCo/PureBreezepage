import React, { useEffect, useState } from "react";
import { PureBreezeLogo } from "@/components/PureBreezeLogo";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Danger Facts", href: "#danger" },
  { label: "Gallery", href: "#gallery" },
  { label: "Quote", href: "#ai-quote" },
  { label: "Book", href: "#book" },
  { label: "Contact", href: "#contact" },
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_6px_24px_rgba(14,165,233,0.08)] border-b border-sky-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <a href="#top" className="flex-shrink-0" data-testid="nav-logo-link">
          <PureBreezeLogo size={40} />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors relative group"
              data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-sky-500 transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:0490507878"
            className="text-sm font-semibold text-slate-700 hover:text-sky-600"
            data-testid="nav-phone-link"
          >
            0490 507 878
          </a>
          <Button
            onClick={() => (window.location.hash = "ai-quote")}
            className="rounded-full bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 shadow-lg shadow-sky-500/30 btn-lift"
            data-testid="nav-cta-quote"
          >
            Get Quote
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 rounded-full bg-white border border-sky-100"
          onClick={() => setOpen((o) => !o)}
          data-testid="nav-mobile-toggle"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div
          className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-sky-100 px-6 py-6 space-y-4"
          data-testid="nav-mobile-panel"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block text-base font-medium text-slate-700 hover:text-sky-600"
              data-testid={`nav-mobile-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="tel:0490507878"
            className="block text-base font-semibold text-sky-600"
            data-testid="nav-mobile-phone"
          >
            Call 0490 507 878
          </a>
          <Button
            onClick={() => { setOpen(false); window.location.hash = "ai-quote"; }}
            className="w-full rounded-full bg-sky-500 hover:bg-sky-600 text-white"
            data-testid="nav-mobile-cta"
          >
            Get Quote
          </Button>
        </div>
      )}
    </header>
  );
}
