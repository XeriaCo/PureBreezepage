import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, ArrowLeft, CheckCircle2, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PHONE_DIGITS  = "0490507878";
const PHONE_DISPLAY = "0490 507 878";

export default function CallRequested() {
  const [dialed, setDialed] = useState(false);

  useEffect(() => {
    document.title = "Requesting your call · PureBreeze";

    // Fire analytics conversion
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "call_requested", phone: PHONE_DIGITS });
      if (typeof window.gtag === "function") {
        window.gtag("event", "conversion", { send_to: "AW-XXX/ZZZ" });
      }
    }

    // Auto-launch the dialer after a short delay so the pixel fires first
    const t = setTimeout(() => {
      try { window.location.href = `tel:${PHONE_DIGITS}`; } catch (e) {}
      setDialed(true);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-white text-[#0E1B2E] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 bg-aurora">
        <div className="max-w-[760px] mx-auto px-6 sm:px-8 lg:px-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-2xl shadow-luxe-lg hairline p-10 lg:p-14 text-center"
          >
            <div className="relative mx-auto w-16 h-16 mb-8">
              <span className="absolute inset-0 rounded-full bg-[#7BA6D9]/50 animate-ping" />
              <div className="relative w-16 h-16 rounded-full bg-[#0A2A4E] text-white flex items-center justify-center">
                <Phone size={24} strokeWidth={1.4} />
              </div>
            </div>

            <span className="eyebrow">{dialed ? "Call requested" : "Connecting you now"}</span>

            <h1 className="mt-4 font-display text-4xl sm:text-5xl text-[#0A2A4E] font-medium tracking-tight leading-[1.1]">
              {dialed ? "We're on the line." : "Opening your dialer…"}
              <br />
              <span className="text-[#7BA6D9] font-light-display">{PHONE_DISPLAY}</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-[#5A6B82] leading-[1.7] font-light max-w-md mx-auto">
              {dialed
                ? "If your phone didn't open automatically, tap the button below to call us now. A PureBreeze technician will pick up — we answer our own phones."
                : "If your phone doesn't open automatically in a moment, tap the button below."}
            </p>

            <a
              href={`tel:${PHONE_DIGITS}`}
              className="mt-10 inline-flex items-center gap-3 pill pill-navy btn-lift px-8 py-4 text-base"
              data-testid="call-requested-dial"
            >
              <Phone size={16} strokeWidth={1.5} />
              Call {PHONE_DISPLAY}
            </a>

            <div className="mt-10 pt-8 border-t border-[#E5ECF4] grid sm:grid-cols-2 gap-4 text-left max-w-md mx-auto">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} strokeWidth={1.5} className="text-[#1F5AA8] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm text-[#0A2A4E] font-medium">Real people</div>
                  <div className="text-[12px] text-[#8597AE] font-light mt-0.5">We answer our own phones — no menus.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={16} strokeWidth={1.5} className="text-[#1F5AA8] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm text-[#0A2A4E] font-medium">Same-day service</div>
                  <div className="text-[12px] text-[#8597AE] font-light mt-0.5">Mon–Sat · 7am – 6pm · QLD-wide.</div>
                </div>
              </div>
            </div>

            <Link
              to="/"
              className="mt-10 inline-flex items-center gap-2 text-sm text-[#5A6B82] hover:text-[#1F5AA8] font-light"
              data-testid="call-requested-back"
            >
              <ArrowLeft size={13} strokeWidth={1.5} />
              Back to homepage
            </Link>
          </motion.div>

          <p className="text-center text-xs text-[#8597AE] mt-8 font-light">
            Outside office hours? Leave a voicemail and we'll return your call first thing.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
