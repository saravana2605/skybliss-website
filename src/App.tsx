import { useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { Navigation } from "@/components/layout/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { ScrollSection } from "@/components/sections/ScrollSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { ReservationModal } from "@/components/ui/ReservationModal";
import { MenuModal } from "@/components/ui/MenuModal";

export function App() {
  useLenis();

  // Each pinned section must be initialized AFTER the previous pin's spacer is registered in the DOM
  const [heroReady, setHeroReady] = useState(false);
  const [testimonialReady, setTestimonialReady] = useState(false);

  // Global modals
  const [reservationOpen, setReservationOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <GrainOverlay />
      <Navigation
        onOpenReservation={() => setReservationOpen(true)}
        onOpenMenu={() => setMenuOpen(true)}
      />

      <main className="relative bg-charcoal">
        {/* ── PINNED 1: Hero Section (4th floor rooftop & arrival cinematic journey) ── */}
        <HeroSection
          onReady={() => setHeroReady(true)}
          onOpenReservation={() => setReservationOpen(true)}
          onOpenMenu={() => setMenuOpen(true)}
        />

        {/* ── PINNED 2: Rooftop Ambiance & Atmosphere Storytelling ── */}
        <TestimonialSection
          prevReady={heroReady}
          onReady={() => setTestimonialReady(true)}
        />

        {/* ── PINNED 3: The Skybliss Experience Chapters (Ascent, Dining, Nightlife) ── */}
        <ScrollSection
          prevReady={testimonialReady}
          onOpenReservation={() => setReservationOpen(true)}
        />

        {/* ── Normal Flow Sections ── */}
        {/* Concept & Experience Pillars */}
        <AboutSection />

        {/* Rooftop Highlights & Facts */}
        <StatsSection />

        {/* Cuisine & Bar Collection */}
        <ProjectsSection
          onOpenMenu={() => setMenuOpen(true)}
          onOpenReservation={() => setReservationOpen(true)}
        />

        {/* Events, Live Music & Match-Day Screenings */}
        <ProcessSection onOpenReservation={() => setReservationOpen(true)} />

        {/* Editorial Skybliss Photography Gallery */}
        <GallerySection />

        {/* Find Your Way to Skybliss & Table Pre-Book */}
        <ContactSection />
      </main>

      <Footer
        onOpenReservation={() => setReservationOpen(true)}
        onOpenMenu={() => setMenuOpen(true)}
      />

      {/* Global Interactive Modals */}
      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />
      <MenuModal
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenReservation={() => setReservationOpen(true)}
      />
    </>
  );
}

export default App;
