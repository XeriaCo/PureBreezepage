import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsCounter from "@/components/StatsCounter";
import ScaryFacts from "@/components/ScaryFacts";
import Benefits from "@/components/Benefits";
import FoundersNote from "@/components/FoundersNote";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import ProcessSteps from "@/components/ProcessSteps";
import AIQuote from "@/components/AIQuote";
import BookingCalendar from "@/components/BookingCalendar";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import SuburbsMarquee from "@/components/SuburbsMarquee";

export default function LandingPage() {
  return (
    <div data-testid="landing-page" className="bg-white text-slate-900 overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <StatsCounter />
        <ScaryFacts />
        <Benefits />
        <FoundersNote />
        <Services />
        <ProcessSteps />
        <Gallery />
        <AIQuote />
        <BookingCalendar />
        <WhyChooseUs />
        <Testimonials />
        <SuburbsMarquee />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
