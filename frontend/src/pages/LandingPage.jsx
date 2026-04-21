import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScaryFacts from "@/components/ScaryFacts";
import Benefits from "@/components/Benefits";
import Services from "@/components/Services";
import AIQuote from "@/components/AIQuote";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <div data-testid="landing-page" className="bg-white text-slate-900 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <ScaryFacts />
        <Benefits />
        <Services />
        <AIQuote />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
