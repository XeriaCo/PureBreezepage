import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { CheckCircle2, Phone, Mail, ArrowLeft, CalendarDays, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SLOT_META = {
  morning:   { label: "Morning",   time: "7am – 11am" },
  midday:    { label: "Midday",    time: "11am – 2pm" },
  afternoon: { label: "Afternoon", time: "2pm – 5pm"  },
};

export default function ThankYou() {
  const location = useLocation();
  const { state, pathname } = location;
  const isContact  = pathname.startsWith("/contact-received") || pathname.startsWith("/contact-thanks");
  const isBooking  = state?.kind === "booking";
  const kind       = state?.kind || (isContact ? "contact" : "request");   // "booking" | "callback" | "request"
  const refId      = state?.reference;
  const bookingDate= state?.booking_date;
  const slot       = state?.time_slot;
  const phone      = state?.phone;
  const name       = state?.name;

  useEffect(() => {
    document.title = isContact ? "Message received · PureBreeze" : "Request received · PureBreeze";
    // Fire any analytics conversion event here (gtag/fbq) safely
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: isContact ? "contact_form_submitted" : "quote_request_received",
        request_kind: kind,
        reference: refId || null,
      });
      if (typeof window.gtag === "function") {
        window.gtag("event", "conversion", {
          send_to: "AW-XXX/YYY",
          transaction_id: refId || "",
        });
      }
    }
  }, [kind, refId, isContact]);

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
            <div className="mx-auto w-14 h-14 rounded-full bg-[#0A2A4E] text-white flex items-center justify-center mb-8">
              <CheckCircle2 size={22} strokeWidth={1.4} />
            </div>

            <span className="eyebrow">{isContact ? "Message received" : "Request received"}</span>

            <h1 className="mt-4 font-display text-4xl sm:text-5xl text-[#0A2A4E] font-medium tracking-tight leading-[1.1]">
              {name ? `Thank you, ${name}.` : "Thank you."}
              <br />
              <span className="text-[#7BA6D9] font-light-display">
                {isContact ? "We've received your message." : "We'll be in touch shortly."}
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-[#5A6B82] leading-[1.7] font-light max-w-md mx-auto">
              {kind === "booking"
                ? "Your reservation has been received. A PureBreeze technician will call to confirm your time slot within one business hour."
                : isContact
                  ? "Your message has been received. A member of the PureBreeze team will respond within one business hour during office hours."
                  : "Your request has been received. We will call you within one business hour to confirm your details and schedule your service."}
            </p>

            {refId && (
              <div className="mt-8 inline-flex flex-col gap-3 p-6 bg-[#F2F7FD] rounded-xl text-left min-w-[280px]">
                <div className="text-[10px] uppercase tracking-[0.24em] text-[#1F5AA8] font-medium">Reference</div>
                <div className="font-mono text-lg text-[#0A2A4E] font-medium tracking-wider">{refId.slice(0, 8).toUpperCase()}</div>

                {bookingDate && (
                  <div className="flex items-center gap-3 text-sm text-[#0A2A4E] font-light mt-2 pt-3 border-t border-[#DCE7F3]">
                    <CalendarDays size={14} strokeWidth={1.4} className="text-[#1F5AA8]" />
                    <span>{format(new Date(bookingDate), "EEEE, d MMMM yyyy")}</span>
                  </div>
                )}
                {slot && SLOT_META[slot] && (
                  <div className="flex items-center gap-3 text-sm text-[#0A2A4E] font-light">
                    <Clock size={14} strokeWidth={1.4} className="text-[#1F5AA8]" />
                    <span>{SLOT_META[slot].label} · {SLOT_META[slot].time}</span>
                  </div>
                )}
              </div>
            )}

            {phone && (
              <p className="mt-6 text-sm text-[#5A6B82] font-light">
                We will call <span className="text-[#0A2A4E] font-medium">{phone}</span>.
              </p>
            )}

            <div className="mt-10 pt-8 border-t border-[#E5ECF4]">
              <div className="eyebrow-light mb-4">In the meantime</div>
              <div className="grid sm:grid-cols-2 gap-3 max-w-md mx-auto">
                <a
                  href="tel:0490205298"
                  className="flex items-center justify-center gap-2 pill pill-navy btn-lift"
                  data-testid="thankyou-call"
                >
                  <Phone size={14} strokeWidth={1.5} />
                  0490 205 298
                </a>
                <a
                  href="mailto:hello@purebreeze.com.au"
                  className="flex items-center justify-center gap-2 pill pill-outline btn-lift"
                  data-testid="thankyou-email"
                >
                  <Mail size={14} strokeWidth={1.5} />
                  Email us
                </a>
              </div>
            </div>

            <Link
              to="/"
              className="mt-10 inline-flex items-center gap-2 text-sm text-[#5A6B82] hover:text-[#1F5AA8] font-light"
              data-testid="thankyou-back"
            >
              <ArrowLeft size={13} strokeWidth={1.5} />
              Back to homepage
            </Link>
          </motion.div>

          <p className="text-center text-xs text-[#8597AE] mt-8 font-light">
            Office hours: Mon–Sat 7am–6pm · Queensland-wide
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
