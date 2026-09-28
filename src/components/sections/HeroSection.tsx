import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useSkyblissHeroSequence } from "@/hooks/useImageSequence";
import { Preloader } from "@/components/ui/Preloader";
import { SITE, HERO_PHRASES, HERO_STATS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_MULTIPLIER = 7;

interface HeroProps {
  onReady?: () => void;
  onOpenReservation?: () => void;
  onOpenMenu?: () => void;
}

export function HeroSection({ onReady, onOpenReservation, onOpenMenu }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameNumRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef(0);

  const [preloaderDone, setPreloaderDone] = useState(false);
  const [activeTag, setActiveTag] = useState(0);

  const { loadProgress, isLoaded, drawFrame } = useSkyblissHeroSequence(canvasRef);

  // Resize canvas to match screen dimensions
  const syncCanvas = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    drawFrame(progressRef.current);
  }, [drawFrame]);

  useEffect(() => {
    syncCanvas();
    window.addEventListener("resize", syncCanvas);
    return () => window.removeEventListener("resize", syncCanvas);
  }, [syncCanvas]);

  // ScrollTrigger pinned canvas animation
  useEffect(() => {
    if (!preloaderDone) return;
    const container = containerRef.current;
    if (!container) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobileView = window.innerWidth < 768;

    if (isReduced || isMobileView) {
      onReady?.();
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${window.innerHeight * SCROLL_MULTIPLIER}`,
        pin: true,
        scrub: 0.5,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate(self) {
          const p = self.progress;
          progressRef.current = p;

          drawFrame(p);

          if (frameNumRef.current) {
            const frameNum = Math.min(100, Math.max(1, Math.round(p * 99) + 1));
            frameNumRef.current.textContent = String(frameNum).padStart(3, "0");
          }

          const bar = document.getElementById("hero-progress");
          if (bar) bar.style.transform = `scaleX(${p})`;

          const ti = HERO_PHRASES.findIndex((t) => p >= t.start && p <= t.end);
          if (ti !== -1) setActiveTag(ti);
        },
      });
    }, container);

    ScrollTrigger.refresh();
    onReady?.();

    return () => ctx.revert();
  }, [preloaderDone, drawFrame, onReady]);

  // Entrance animation once preloader finishes
  useEffect(() => {
    if (!preloaderDone) return;
    gsap.fromTo(
      ".hu",
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.08 }
    );
  }, [preloaderDone]);

  const handleBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenReservation) {
      onOpenReservation();
    } else {
      const el = document.querySelector("#contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenMenu) {
      onOpenMenu();
    } else {
      const el = document.querySelector("#menu");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {!preloaderDone && (
        <Preloader
          progress={loadProgress}
          isComplete={isLoaded}
          onDone={() => setPreloaderDone(true)}
        />
      )}

      <div
        ref={containerRef}
        id="hero"
        className="relative w-full overflow-hidden bg-charcoal h-screen"
      >
        {/* ── Desktop Canvas Engine ── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full"
          role="img"
          aria-label="Skybliss Rooftop Resto Lounge — Cinematic scroll experience"
        />

        {/* ── Mobile Static Image Fallback (Active on small screens) ── */}
        <div className="absolute inset-0 md:hidden z-0">
          <img
            src="/images/skybliss/rooftop.png"
            alt="Skybliss Rooftop Resto Lounge"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
          />
        </div>

        {/* Cinematic Vignettes */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,9,0.88) 0%, rgba(10,10,9,0.2) 45%, transparent 75%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(10,10,9,0.65) 0%, rgba(10,10,9,0.15) 45%, transparent 70%)",
          }}
        />

        {/* ── Desktop Top-Left: Location & Floor Badge ── */}
        <div
          className="hu hidden md:block absolute top-24 left-8 md:left-14 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="font-sans text-gold text-[9px] uppercase tracking-[0.24em] font-medium">
              4th Floor Vantage
            </span>
          </div>
          <p
            className="font-sans text-white/60 text-[11px] leading-relaxed max-w-[200px]"
            style={{ letterSpacing: "0.03em" }}
          >
            Hotel Aishwarya Grand
            <br />
            Villianur Main Road
            <br />
            Puducherry
          </p>
        </div>

        {/* ── Desktop Top-Right: Hours & Atmosphere ── */}
        <div
          className="hu hidden md:block absolute top-24 right-8 md:right-14 text-right pointer-events-none"
          style={{ opacity: 0 }}
        >
          <p className="font-sans text-gold text-[9px] uppercase tracking-[0.24em] mb-1 font-medium">
            Open Daily
          </p>
          <p
            className="font-sans text-white/70 text-[11px] leading-relaxed max-w-[150px]"
            style={{ letterSpacing: "0.03em" }}
          >
            11:00 AM – 11:00 PM
            <br />
            <span className="text-white/40">Dining · Drinks · Music</span>
          </p>
        </div>

        {/* ── Desktop Right: Floating Glass Feature Cards ── */}
        <div
          className="hu hidden md:flex absolute right-8 md:right-14 flex-col gap-3 pointer-events-none"
          style={{ opacity: 0, bottom: "calc(50% - 90px)" }}
        >
          {HERO_STATS.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.7, ease: "easeOut" }}
              className="glass-light rounded-2xl px-5 py-3.5 min-w-[150px] border border-white/20"
            >
              <p className="font-serif text-white text-[1.75rem] font-semibold leading-none">
                {s.value}
              </p>
              <div className="mt-2 h-px w-8 bg-gold/50" />
              <p
                className="font-sans text-white/60 text-[10px] mt-2 leading-snug whitespace-pre-line"
                style={{ letterSpacing: "0.05em" }}
              >
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Desktop Bottom-Left: Scroll-Synced Tagline ── */}
        <div
          className="hu hidden md:block absolute bottom-28 md:bottom-32 left-8 md:left-14 pointer-events-none max-w-2xl"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-px bg-gold" />
            <p className="font-sans text-gold text-[10px] uppercase tracking-[0.24em]">
              Skybliss Rooftop Resto Lounge
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTag}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              {HERO_PHRASES[activeTag]?.text.split("\n").map((line, i) => (
                <p
                  key={i}
                  className="font-serif text-white"
                  style={{
                    fontSize: "clamp(2rem, 3.4vw, 4.2rem)",
                    lineHeight: 1.12,
                    fontStyle: i === 1 && activeTag === 0 ? "italic" : "normal",
                    opacity: i === 0 ? 1 : 0.85,
                  }}
                >
                  {line}
                </p>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Desktop Bottom-Center: Triple Action Buttons ── */}
        <div
          className="hu hidden md:flex absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-auto items-center gap-3 z-20"
          style={{ opacity: 0 }}
        >
          {/* Primary CTA: Book a Table */}
          <motion.button
            type="button"
            onClick={handleBooking}
            className="glass-white flex items-center gap-3 pl-6 pr-2 py-2 rounded-full font-sans font-semibold text-charcoal text-[13px] shadow-2xl cursor-pointer"
            style={{ letterSpacing: "0.04em" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <span>Book a Table</span>
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white"
              style={{
                background: "#111110",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              ↗
            </span>
          </motion.button>

          {/* Secondary CTA: View Menu */}
          <motion.button
            type="button"
            onClick={handleMenuClick}
            className="glass-dark flex items-center gap-2 px-5 py-3 rounded-full font-sans font-medium text-white text-[12px] border border-white/20 hover:border-gold/60 transition-colors cursor-pointer"
            style={{ letterSpacing: "0.04em" }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>View Menu</span>
          </motion.button>

          {/* Third CTA: Get Directions */}
          <motion.a
            href={SITE.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-dark flex items-center gap-2 px-5 py-3 rounded-full font-sans font-medium text-white/90 text-[12px] border border-white/20 hover:border-gold/60 transition-colors"
            style={{ letterSpacing: "0.04em" }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Get Directions</span>
            <span className="text-gold text-xs">↗</span>
          </motion.a>
        </div>

        {/* ── Desktop Bottom-Right: Live Frame Counter ── */}
        <div
          className="hu hidden md:flex absolute bottom-20 right-8 md:right-14 items-baseline gap-1 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <span
            ref={frameNumRef}
            className="font-sans text-white/70 text-xs tabular-nums"
            style={{ letterSpacing: "0.12em" }}
          >
            001
          </span>
          <span className="font-sans text-white/30 text-[9px]">/ 100</span>
        </div>

        {/* ── Mobile Layout Overlay (Mobile screens only) ── */}
        <div className="md:hidden absolute inset-0 z-20 flex flex-col justify-between pt-24 pb-8 px-6">
          <div className="pt-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-dark mb-4 border border-gold/30">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <p className="text-gold text-[10px] font-sans uppercase tracking-[0.2em]">
                4th Floor · Hotel Aishwarya Grand
              </p>
            </div>
            <h1 className="font-serif text-white text-3xl sm:text-4xl leading-tight font-normal">
              Experience
              <br />
              <em className="text-gold not-italic">Pondicherry</em>
              <br />
              From Above.
            </h1>
            <p className="font-sans text-white/80 text-xs mt-3 leading-relaxed max-w-xs">
              Where exceptional dining meets breathtaking views. An open-roof resto lounge
              combining global multi-cuisine, drinks, and city nightlife.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={handleBooking}
              className="w-full py-3 rounded-full bg-gold text-charcoal font-sans font-semibold text-center text-xs shadow-xl flex items-center justify-center gap-2"
            >
              <span>Book a Table</span>
              <span className="w-5 h-5 rounded-full bg-charcoal text-white flex items-center justify-center text-[10px]">
                ↗
              </span>
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleMenuClick}
                className="py-2.5 rounded-full glass-dark text-white font-sans text-xs text-center border border-white/20"
              >
                View Menu
              </button>
              <a
                href={SITE.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 rounded-full glass-dark text-white font-sans text-xs text-center border border-white/20 flex items-center justify-center gap-1"
              >
                <span>Directions</span>
                ↗
              </a>
            </div>

            <div className="flex items-center justify-between text-[10px] text-white/50 font-sans pt-2 border-t border-white/10 mt-1">
              <span>Daily 11 AM – 11 PM</span>
              <span>+91 82200 58152</span>
            </div>
          </div>
        </div>

        {/* ── Bottom Ticker: Looping Skybliss Strip ── */}
        <div
          className="absolute left-0 right-0 overflow-hidden pointer-events-none"
          style={{
            bottom: "1px",
            height: "36px",
            background: "rgba(0,0,0,0.6)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            className="flex items-center h-full"
            style={{ animation: "hero-ticker 34s linear infinite", width: "max-content" }}
          >
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center">
                {[
                  { text: "Skybliss Rooftop Resto Lounge", accent: true },
                  { text: "Open-Air Skyline Dining", accent: false },
                  { text: "Global Multi-Cuisine", accent: false },
                  { text: "Signature Cocktails & Spirits", accent: true },
                  { text: "Live Music & DJ Nights", accent: false },
                  { text: "Big-Screen Match Screenings", accent: true },
                  { text: "4th Floor Hotel Aishwarya Grand", accent: false },
                  { text: "Puducherry's Premier Rooftop", accent: false },
                  { text: "Pre-Book Your Table", accent: true },
                  { text: "Daily 11:00 AM – 11:00 PM", accent: false },
                ].map((item, j) => (
                  <span key={`${copy}-${j}`} className="flex items-center">
                    <span
                      className="font-sans whitespace-nowrap px-7 text-[10px] uppercase"
                      style={{
                        letterSpacing: "0.22em",
                        color: item.accent ? "#c9a96e" : "rgba(255,255,255,0.6)",
                        fontWeight: item.accent ? 500 : 400,
                      }}
                    >
                      {item.text}
                    </span>
                    <span
                      style={{
                        color: "rgba(201,169,110,0.5)",
                        fontSize: "6px",
                        flexShrink: 0,
                      }}
                    >
                      ◆
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom Edge: Thin Progress Line ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <div
            id="hero-progress"
            className="h-full origin-left"
            style={{
              background: "linear-gradient(to right, #a8854f, #c9a96e, #f5e4be)",
              transform: "scaleX(0)",
              transition: "none",
            }}
          />
        </div>
      </div>
    </>
  );
}
