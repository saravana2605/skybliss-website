import { useState, useCallback } from "react";
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
import { FloatingCallButton } from "@/components/ui/FloatingCallButton";
import { ReservationModal } from "@/components/ui/ReservationModal";
import { MenuModal } from "@/components/ui/MenuModal";

export function App() {
  useLenis();

  // Global modals
  const [reservationOpen, setReservationOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpenReservation = useCallback(() => setReservationOpen(true), []);
  const handleCloseReservation = useCallback(() => setReservationOpen(false), []);
  const handleOpenMenu = useCallback(() => setMenuOpen(true), []);
  const handleCloseMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <GrainOverlay />
      <Navigation
        onOpenReservation={handleOpenReservation}
        onOpenMenu={handleOpenMenu}
      />

      <main className="relative bg-charcoal">
        {/* ── PINNED 1: Hero Section (4th floor rooftop & arrival cinematic journey) ── */}
        <HeroSection
          onOpenReservation={handleOpenReservation}
          onOpenMenu={handleOpenMenu}
        />

        {/* ── PINNED 2: Rooftop Ambiance & Atmosphere Storytelling ── */}
        <TestimonialSection />

        {/* ── PINNED 3: The Skybliss Experience Chapters (Ascent, Dining, Nightlife) ── */}
        <ScrollSection
          onOpenReservation={handleOpenReservation}
        />

        {/* ── Normal Flow Sections ── */}
        {/* Concept & Experience Pillars */}
        <AboutSection />

        {/* Rooftop Highlights & Facts */}
        <StatsSection />

        {/* Cuisine & Bar Collection */}
        <ProjectsSection
          onOpenMenu={handleOpenMenu}
          onOpenReservation={handleOpenReservation}
        />

        {/* Events, Live Music & Match-Day Screenings */}
        <ProcessSection onOpenReservation={handleOpenReservation} />

        {/* Editorial Skybliss Photography Gallery */}
        <GallerySection />

        {/* Find Your Way to Skybliss & Table Pre-Book */}
        <ContactSection />
      </main>

      <Footer
        onOpenReservation={handleOpenReservation}
        onOpenMenu={handleOpenMenu}
      />

      {/* Floating Call Action */}
      <FloatingCallButton />

      {/* Global Interactive Modals */}
      <ReservationModal
        isOpen={reservationOpen}
        onClose={handleCloseReservation}
      />
      <MenuModal
        isOpen={menuOpen}
        onClose={handleCloseMenu}
        onOpenReservation={handleOpenReservation}
      />
    </>
  );
}

export default App;

