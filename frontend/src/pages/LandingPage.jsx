import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

// PROBLEM
import ScaryFacts from "@/components/ScaryFacts";
// SOLUTION
import Benefits from "@/components/Benefits";
import ProcessSteps from "@/components/ProcessSteps";
import Gallery from "@/components/Gallery";
// CONVERT
import BookingCalendar from "@/components/BookingCalendar";
// SECONDARY
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsCounter from "@/components/StatsCounter";
import Testimonials from "@/components/Testimonials";
import FoundersNote from "@/components/FoundersNote";
import SuburbsMarquee from "@/components/SuburbsMarquee";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Chrome
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
        <Benefits />
        <ProcessSteps />
        <Gallery />
        <Services />
        <ScaryFacts />
        <BookingCalendar />
        <WhyChooseUs />
        <StatsCounter />
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
