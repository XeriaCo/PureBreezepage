import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

// MOCKUP CORE
import Benefits from "@/components/Benefits";
import ProcessSteps from "@/components/ProcessSteps";
import BreatheDifference from "@/components/BreatheDifference";
import TrustedQueensland from "@/components/TrustedQueensland";
import BeforeAfter from "@/components/BeforeAfter";
import CtaBanner from "@/components/CtaBanner";

// SUPPORTING
import Services from "@/components/Services";
import BookingCalendar from "@/components/BookingCalendar";
import ScaryFacts from "@/components/ScaryFacts";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import FoundersNote from "@/components/FoundersNote";
import SuburbsMarquee from "@/components/SuburbsMarquee";
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
        {/* Mockup-aligned flow */}
        <Hero />
        <Benefits />
        <ProcessSteps />
        <BreatheDifference />
        <TrustedQueensland />
        <BeforeAfter />
        <CtaBanner />

        {/* Supporting sections */}
        <Services />
        <BookingCalendar />
        <ScaryFacts />
        <WhyChooseUs />
        <Testimonials />
        <FoundersNote />
        <SuburbsMarquee />
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
