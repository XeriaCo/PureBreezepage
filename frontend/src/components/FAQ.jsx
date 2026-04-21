import React from "react";
import { motion } from "framer-motion";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  { q: "How often should I get my AC cleaned?",
    a: "At minimum every 12 months for residential split systems in Queensland's humid climate. Homes with pets, allergies, or coastal salt air should consider every 6 months." },
  { q: "How long does a clean take?",
    a: "A standard split system takes 45–75 minutes. Ducted systems take 2–4 hours depending on size. We always give you an exact window before arriving." },
  { q: "Do you service my area?",
    a: "Yes — we cover all of South-East Queensland including Brisbane, Gold Coast, Sunshine Coast, Toowoomba, Ipswich, Logan, Redlands and surrounding suburbs." },
  { q: "Are your chemicals safe for kids and pets?",
    a: "Absolutely. We use hospital-grade, biodegradable sanitisers that are non-toxic once dry. The area is safe to re-enter immediately after cleaning." },
  { q: "What if my unit has a problem you can't fix?",
    a: "We'll identify it, explain it in plain English, and only charge for the clean. We never upsell repairs you don't need." },
  { q: "How accurate is the AI quote?",
    a: "The AI quote is an estimate based on visible dirtiness from your photo. The final on-site price is usually within 10–15% of the AI range and is always confirmed before work begins." },
];

export default function FAQ() {
  return (
    <section className="relative py-24 lg:py-32 bg-sky-50" data-testid="faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-sky-100 px-4 py-2 mb-5 shadow-sm">
            <span className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
            <span className="text-xs font-bold tracking-widest uppercase text-sky-700">FAQ</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tighter text-slate-900 leading-[1.05]">
            Questions? <span className="text-sky-500">We've got answers.</span>
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="mt-12 space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-2xl bg-white border border-sky-100 px-5 data-[state=open]:shadow-md"
              data-testid={`faq-item-${i}`}
            >
              <AccordionTrigger className="text-left font-display text-base sm:text-lg font-semibold text-slate-900 hover:no-underline py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 text-sm sm:text-base leading-relaxed pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
