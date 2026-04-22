import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

// ---------- PROBLEM ----------
import ScaryFacts from "@/components/ScaryFacts";

// ---------- SOLUTION ----------
import Benefits from "@/components/Benefits";
import ProcessSteps from "@/components/ProcessSteps";
import Gallery from "@/components/Gallery";

// ---------- CONVERT ----------
import AIQuote from "@/components/AIQuote";

// ---------- SECONDARY ----------
import Services from "@/components/Services";
import BookingCalendar from "@/components/BookingCalendar";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsCounter from "@/components/StatsCounter";
import Testimonials from "@/components/Testimonials";
import FoundersNote from "@/components/FoundersNote";
import SuburbsMarquee from "@/components/SuburbsMarquee";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// ---------- Chrome ----------
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";

export default function LandingPage() {
  return (
    <div data-testid="landing-page" className="bg-white text-slate-900 overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <main>
        {/* 1. Hook */}
        <Hero />

        {/* 2. Problem */}
        <ScaryFacts />

        {/* 3. Solution */}
        <Benefits />
        <ProcessSteps />
        <Gallery />

        {/* 4. Convert */}
        <AIQuote />

        {/* 5. Secondary info */}
        <Services />
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
    </div>
  );
}
