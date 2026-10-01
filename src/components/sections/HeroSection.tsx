import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useSkyblissHeroSequence } from "@/hooks/useImageSequence";
import { Preloader } from "@/components/ui/Preloader";
import { SITE, HERO_STAGES, SKYBLISS_IMAGES } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onReady?: () => void;
  onOpenReservation?: () => void;
  onOpenMenu?: () => void;
}

export function HeroSection({ onReady, onOpenReservation, onOpenMenu }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  const [preloaderDone, setPreloaderDone] = useState(false);
  const [activeStage, setActiveStage] = useState(0);

  const { loadProgress, isLoaded, drawFrame } = useSkyblissHeroSequence(canvasRef);
  const drawFrameRef = useRef(drawFrame);
  drawFrameRef.current = drawFrame;

  // Resize canvas to match screen dimensions
  const syncCanvas = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    drawFrameRef.current(progressRef.current);
  }, []);

  useEffect(() => {
    syncCanvas();
    window.addEventListener("resize", syncCanvas);
    return () => window.removeEventListener("resize", syncCanvas);
  }, [syncCanvas]);

  // ScrollTrigger pinned canvas animation with responsive storytelling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      onReady?.();
      return;
    }

    const scrollDistance = () =>
      window.innerHeight * (window.innerWidth < 768 ? 3.5 : 5.0);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${scrollDistance()}`,
        pin: true,
        scrub: 0.5,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate(self) {
          const p = self.progress;
          progressRef.current = p;

          // Draw the synchronized image stage on canvas
          drawFrameRef.current(p);

          // Update thin bottom progress bar
          const bar = document.getElementById("hero-progress");
          if (bar) bar.style.transform = `scaleX(${p})`;

          // Synchronize the 3 storytelling stages:
          // Stage 0 (01/03): p in [0, 0.36)
          // Stage 1 (02/03): p in [0.36, 0.71)
          // Stage 2 (03/03): p in [0.71, 1.0]
          const stageIdx = p < 0.36 ? 0 : p < 0.71 ? 1 : 2;
          setActiveStage((prev) => (prev !== stageIdx ? stageIdx : prev));
        },
      });
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      onReady?.();
    }, container);

    return () => ctx.revert();
  }, [onReady]);

  // Entrance animation once preloader finishes
  useEffect(() => {
    if (!preloaderDone) return;
    gsap.fromTo(
      ".hu",
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.08 }
    );
  }, [preloaderDone]);

  const currentStage = HERO_STAGES[activeStage] || HERO_STAGES[0];

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

  const handleCtaClick = (e: React.MouseEvent) => {
    if (currentStage.ctaAction === "menu") {
      handleMenuClick(e);
    } else {
      handleBooking(e);
    }
  };

  const heroImages = [
    SKYBLISS_IMAGES.fullBuildingMain,
    SKYBLISS_IMAGES.dining1,
    SKYBLISS_IMAGES.skyblissTop,
  ];

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
        className="relative w-full overflow-hidden bg-charcoal h-screen select-none"
      >
        {/* ── Persistent Multi-Stage Photography (Guarantees zero black screen at all times) ── */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {heroImages.map((src, idx) => {
            const isActive = activeStage === idx;
            return (
              <img
                key={src}
                src={src}
                alt="Skybliss Rooftop Resto Lounge — Hotel Aishwarya Grand"
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "scale(1.04)" : "scale(1)",
                  transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  zIndex: isActive ? 2 : 1,
                }}
                loading="eager"
                fetchPriority={idx === 0 ? "high" : "auto"}
              />
            );
          })}
        </div>

        {/* ── Desktop & Interactive Canvas Engine ── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full z-10"
          role="img"
          aria-label="Skybliss Rooftop Resto Lounge — Cinematic scroll experience"
        />


        {/* Cinematic Dark Vignettes for Crisp Typographic Legibility */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,9,0.92) 0%, rgba(10,10,9,0.45) 40%, rgba(10,10,9,0.15) 65%, rgba(10,10,9,0.7) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(10,10,9,0.85) 0%, rgba(10,10,9,0.35) 50%, rgba(10,10,9,0.7) 100%)",
          }}
        />

        {/* ══════════════════════════════════════════════════════════════════════
            DESKTOP LAYOUT (md and above)
        ══════════════════════════════════════════════════════════════════════ */}

        {/* ── Desktop Top-Left: Small Section Label / Eyebrow Badge ── */}
        <div
          className="hu hidden md:block absolute top-20 left-8 md:left-14 pointer-events-none z-20"
          style={{ opacity: 0 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage.eyebrow}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="font-sans text-gold text-[10px] uppercase tracking-[0.24em] font-semibold">
                {currentStage.eyebrow}
              </span>
            </motion.div>
          </AnimatePresence>

          <p
            className="font-sans text-white/60 text-[11px] leading-relaxed mt-2"
            style={{ letterSpacing: "0.03em" }}
          >
            Hotel Aishwarya Grand · Villianur Main Road · Puducherry
          </p>
        </div>

        {/* ── Desktop Top-Right: 01 / 03 Progress Indicator ── */}
        <div
          className="hu hidden md:flex absolute top-20 right-8 md:right-14 items-center gap-4 z-20 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <div className="text-right">
            <p className="font-sans text-gold text-[9px] uppercase tracking-[0.24em] font-medium mb-0.5">
              Experience Stage
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.progressText}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.35 }}
                className="flex items-baseline justify-end gap-1"
              >
                <span className="font-sans text-white text-lg font-bold tabular-nums tracking-widest text-gold-glow">
                  {currentStage.step}
                </span>
                <span className="font-sans text-white/30 text-xs">/ 03</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Stepper Dots */}
          <div className="flex flex-col gap-1.5 pl-3 border-l border-white/15">
            {[0, 1, 2].map((idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                  activeStage === idx
                    ? "bg-gold scale-125 shadow-[0_0_8px_#c9a96e]"
                    : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Desktop Right-Side: Stacked Information & Stat Cards ── */}
        <div
          className="hu hidden md:flex absolute right-8 md:right-14 flex-col gap-3.5 z-20 pointer-events-none"
          style={{ opacity: 0, top: "48%", transform: "translateY(-50%)" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`stats-group-${activeStage}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col gap-3"
            >
              {currentStage.stats.map((s, i) => (
                <motion.div
                  key={`${activeStage}-${s.value}-${i}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="glass-light rounded-2xl px-5 py-3.5 min-w-[160px] border border-white/20 backdrop-blur-md shadow-xl"
                >
                  <p className="font-serif text-white text-[1.65rem] font-semibold leading-none">
                    {s.value}
                  </p>
                  <div className="mt-2 h-px w-7 bg-gold/50" />
                  <p
                    className="font-sans text-white/65 text-[10px] mt-2 leading-snug whitespace-pre-line uppercase"
                    style={{ letterSpacing: "0.06em" }}
                  >
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Desktop Left-Side: Synchronized Storytelling (Heading, Paragraph, CTA) ── */}
        <div
          className="hu hidden md:block absolute bottom-24 md:bottom-28 left-8 md:left-14 pointer-events-none max-w-2xl z-20"
          style={{ opacity: 0 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`stage-content-${activeStage}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              {/* Eyebrow Accent Strip */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-5 h-px bg-gold" />
                <p className="font-sans text-gold text-[10px] uppercase tracking-[0.26em] font-medium">
                  {currentStage.eyebrow}
                </p>
              </div>

              {/* Main Editorial Large Heading */}
              <h1
                className="font-serif text-white font-normal mb-4"
                style={{
                  fontSize: "clamp(2.2rem, 4.2vw, 4.6rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.01em",
                }}
              >
                {currentStage.title.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h1>

              {/* Descriptive Paragraph */}
              <p className="font-sans text-white/75 text-[13px] md:text-[14px] leading-relaxed max-w-lg mb-6">
                {currentStage.description}
              </p>

              {/* Desktop Interactive CTAs */}
              <div className="flex items-center gap-3 pointer-events-auto">
                <motion.button
                  type="button"
                  onClick={handleCtaClick}
                  className="glass-white flex items-center gap-3 pl-6 pr-2 py-2.5 rounded-full font-sans font-semibold text-charcoal text-[13px] shadow-2xl cursor-pointer"
                  style={{ letterSpacing: "0.04em" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>{currentStage.ctaText}</span>
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

                <motion.a
                  href={SITE.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-dark flex items-center gap-2 px-5 py-3 rounded-full font-sans font-medium text-white/90 text-[12px] border border-white/20 hover:border-gold/60 transition-colors"
                  style={{ letterSpacing: "0.04em" }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>Directions</span>
                  <span className="text-gold text-xs">↗</span>
                </motion.a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            MOBILE RESPONSIVE STORYTELLING OVERLAY (Screens < 768px)
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="md:hidden absolute inset-0 z-20 flex flex-col justify-between pt-16 sm:pt-20 pb-12 sm:pb-14 px-4 sm:px-6">
          {/* Top Row: Section Label + Progress 01 / 03 */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-dark border border-gold/30">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <p className="text-gold text-[9px] font-sans uppercase tracking-[0.16em] font-medium truncate max-w-[200px]">
                {currentStage.eyebrow}
              </p>
            </div>

            <div className="flex items-center gap-1 glass-dark px-2.5 py-1 rounded-full border border-white/15">
              <span className="font-sans text-gold font-bold text-xs tabular-nums">
                {currentStage.step}
              </span>
              <span className="font-sans text-white/40 text-[10px]">/ 03</span>
            </div>
          </div>

          {/* Center/Lower Storytelling Block */}
          <div className="py-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mobile-stage-${activeStage}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="font-serif text-white text-2xl sm:text-3xl leading-tight font-normal mb-2">
                  {currentStage.title.split("\n").map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </h1>
                <p className="font-sans text-white/80 text-[11px] sm:text-xs leading-relaxed max-w-sm">
                  {currentStage.description}
                </p>

                {/* Mobile Compact Stats Row */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-white/10">
                  {currentStage.stats.map((st, i) => (
                    <div key={i} className="glass-dark rounded-xl px-2 py-1.5 border border-white/10 text-center">
                      <p className="font-serif text-white text-xs font-semibold">{st.value}</p>
                      <p className="font-sans text-white/50 text-[8px] uppercase tracking-wider truncate mt-0.5">
                        {st.label.replace("\n", " ")}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Action CTAs */}
          <div className="flex flex-col gap-2 pb-1">
            <button
              type="button"
              onClick={handleCtaClick}
              className="w-full py-2.5 sm:py-3 rounded-full bg-gold text-charcoal font-sans font-semibold text-center text-xs shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{currentStage.ctaText}</span>
              <span className="w-5 h-5 rounded-full bg-charcoal text-white flex items-center justify-center text-[10px]">
                ↗
              </span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleMenuClick}
                className="py-2 rounded-full glass-dark text-white font-sans text-xs text-center border border-white/20 cursor-pointer"
              >
                View Menu
              </button>
              <a
                href={SITE.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 rounded-full glass-dark text-white font-sans text-xs text-center border border-white/20 flex items-center justify-center gap-1"
              >
                <span>Directions</span>
                ↗
              </a>
            </div>

            <div className="flex items-center justify-between text-[10px] text-white/50 font-sans pt-1 border-t border-white/10 mt-0.5">
              <span>Daily 11 AM – 12 AM</span>
              <a href={`tel:${SITE.phoneRaw}`} className="hover:text-gold transition-colors">
                {SITE.phone}
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom Ticker: Looping Skybliss Strip ── */}
        <div
          className="absolute left-0 right-0 overflow-hidden pointer-events-none z-20"
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
                  { text: "Daily 11:00 AM – 12:00 AM", accent: false },
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
          className="absolute bottom-0 left-0 right-0 h-px z-30"
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
