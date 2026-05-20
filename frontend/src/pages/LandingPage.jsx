import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

// CORE — services + booking + contact prioritised
import Services from "@/components/Services";
import ProcessSteps from "@/components/ProcessSteps";
import BookingCalendar from "@/components/BookingCalendar";
import BeforeAfter from "@/components/BeforeAfter";
import ScaryFacts from "@/components/ScaryFacts";
import CtaBanner from "@/components/CtaBanner";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// CHROME
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import ClickToCall from "@/components/ClickToCall";
import LiveChat from "@/components/LiveChat";

export default function LandingPage() {
  return (
    <div data-testid="landing-page" className="bg-white text-[#0E1B2E] overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <ProcessSteps />
        <BookingCalendar />
        <BeforeAfter />
        <ScaryFacts />
        <CtaBanner />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />

      <ScrollToTop />
      <ClickToCall />
      <LiveChat />
    </div>
  );
}
