import React from "react";
import { motion } from "framer-motion";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { fadeUp, viewportOnce, EASE } from "@/lib/anim";

const FAQS = [
  { q: "How often should I have my system cleaned?",         a: "At minimum every twelve months for residential split systems in Queensland's humid climate. Homes with pets, allergies, or coastal salt air benefit from a six-month interval." },
  { q: "How long does a service take?",                       a: "A standard split system takes 45–75 minutes. Ducted systems require two to four hours depending on size. We confirm an exact window before arriving." },
  { q: "Do you service my area?",                             a: "Yes — we cover all of South-East Queensland including Brisbane, Gold Coast, Sunshine Coast, Toowoomba, Ipswich, Logan, Redlands and surrounding suburbs." },
  { q: "Are the chemicals safe for children and pets?",       a: "Absolutely. We use hospital-grade, biodegradable sanitisers that are non-toxic once dry. The room is safe to re-enter immediately after service." },
  { q: "What if there's an issue you cannot resolve?",        a: "We'll identify it, explain it in plain language, and charge only for the service. We never recommend repairs that aren't necessary." },
  { q: "How soon can you arrive?",                            a: "Same-day bookings across South-East Queensland if reserved before midday. Live morning, midday and afternoon slots are visible on our calendar." },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative py-24 lg:py-32 bg-white" data-testid="faq-section">
      <div className="max-w-[900px] mx-auto px-6 sm:px-8 lg:px-10">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center mb-12 lg:mb-14"
        >
          <div className="mb-5 inline-flex items-center gap-3">
            <span className="w-8 h-px bg-[#7BA6D9]" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#7BA6D9] font-medium">Good to know</span>
            <span className="w-8 h-px bg-[#7BA6D9]" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-[#0A2A4E] font-medium tracking-tight">
            Frequently <span className="text-[#7BA6D9] font-light-display">asked.</span>
          </h2>
          <p className="mt-5 text-base text-[#5A6B82] font-light">
            Everything most customers want to know before they book.
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-0">
          {FAQS.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
            >
              <AccordionItem
                value={`item-${i}`}
                className="border-t border-[#E5ECF4] last:border-b"
                data-testid={`faq-item-${i}`}
              >
                <AccordionTrigger className="text-left font-display text-base sm:text-lg text-[#0A2A4E] hover:no-underline hover:text-[#1F5AA8] transition-colors py-6 font-medium tracking-tight">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#5A6B82] text-sm sm:text-[15px] leading-[1.75] pb-6 font-light max-w-[62ch]">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 text-center text-sm text-[#8597AE] font-light"
        >
          Still curious? Call us on <a href="tel:0490205298" className="text-[#1F5AA8] font-medium hover:underline">0490 205 298</a> — we answer our own phones.
        </motion.p>
      </div>
    </section>
  );
}
