import React from "react";
import { motion } from "framer-motion";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  { q: "How often should I have my system cleaned?",
    a: "At minimum every twelve months for residential split systems in Queensland's humid climate. Homes with pets, allergies, or coastal salt air benefit from a six-month interval." },
  { q: "How long does a service take?",
    a: "A standard split system takes 45–75 minutes. Ducted systems require two to four hours depending on size. We confirm an exact window before arriving." },
  { q: "Do you service my area?",
    a: "Yes — we cover all of South-East Queensland including Brisbane, Gold Coast, Sunshine Coast, Toowoomba, Ipswich, Logan, Redlands and surrounding suburbs." },
  { q: "Are the chemicals safe for children and pets?",
    a: "Absolutely. We use hospital-grade, biodegradable sanitisers that are non-toxic once dry. The room is safe to re-enter immediately after service." },
  { q: "What if there's an issue you cannot resolve?",
    a: "We'll identify it, explain it in plain language, and charge only for the service. We never recommend repairs that aren't necessary." },
  { q: "How soon can you arrive?",
    a: "Same-day bookings across South-East Queensland if reserved before midday. Live morning, midday and afternoon slots are visible on our calendar." },
];

export default function FAQ() {
  return (
    <section className="relative py-32 lg:py-40 bg-white" data-testid="faq-section">
      <div className="max-w-[1000px] mx-auto px-6 sm:px-8 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-12 h-px bg-[#1F5AA8]" />
            <span className="eyebrow">Frequently Asked</span>
            <span className="w-12 h-px bg-[#1F5AA8]" />
          </div>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-[#0A2A4E] leading-[1.0] tracking-tight">
            Questions,
            <br />
            <span className="serif-italic text-[#1F5AA8]">considered.</span>
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="mt-12 space-y-0">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-t border-[#E5ECF4] last:border-b"
              data-testid={`faq-item-${i}`}
            >
              <AccordionTrigger className="text-left font-display text-xl sm:text-2xl text-[#0A2A4E] hover:no-underline hover:text-[#1F5AA8] transition-colors py-8 font-normal tracking-tight">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-[#5A6B82] text-base sm:text-lg leading-[1.75] pb-8 font-light max-w-[60ch]">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
