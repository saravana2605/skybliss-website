import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { EXPERIENCE_CHAPTERS, SKYBLISS_IMAGES, SITE } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const getScrollDistance = () =>
  window.innerHeight * (window.innerWidth < 768 ? 3.5 : 4.5);

interface Props {
  prevReady: boolean;
  onOpenReservation?: () => void;
}

export function ScrollSection({ prevReady, onOpenReservation }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const barRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const [activeChapIndex, setActiveChapIndex] = useState(0);

  const drawChapter = useCallback((p: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    if (cw === 0 || ch === 0) return;

    ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = "#0c0c0b";
    ctx.fillRect(0, 0, cw, ch);

    const images = imagesRef.current;
    if (images.length === 0) return;

    // Find any available loaded image as resilient fallback
    const fallbackImg = images.find((im) => im && im.complete && im.naturalWidth > 0);

    // Helper to draw image with smooth camera drift, zoom and crossfade
    const drawImg = (
      img: HTMLImageElement,
      alpha: number,
      scaleStart: number,
      scaleEnd: number,
      localT: number,
      focusY: number
    ) => {
      if (!img || !img.complete || img.naturalWidth === 0 || alpha <= 0.005) return false;
      ctx.save();
      ctx.globalAlpha = Math.min(1, Math.max(0, alpha));

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const baseScale = Math.max(cw / iw, ch / ih);
      const clampedT = Math.min(1, Math.max(0, localT));
      const zoom = scaleStart + (scaleEnd - scaleStart) * clampedT;
      const s = baseScale * zoom;

      const drawW = iw * s;
      const drawH = ih * s;

      const targetX = iw * 0.5 * s;
      const targetY = ih * focusY * s;

      let dx = cw * 0.5 - targetX;
      let dy = ch * 0.5 - targetY - 25 * clampedT;

      dx = Math.min(0, Math.max(cw - drawW, dx));
      dy = Math.min(0, Math.max(ch - drawH, dy));

      ctx.drawImage(img, dx, dy, drawW, drawH);
      ctx.restore();
      return true;
    };

    // Layered Crossfade Strategy:
    // Base layer is ALWAYS drawn at alpha=1, incoming layer fades in on top
    if (p < 0.20) {
      // Chapter 1 (Full Building Twilight)
      const localT = p / 0.20;
      const drawn = images[0] ? drawImg(images[0], 1, 1.04, 1.16, localT, 0.30) : false;
      if (!drawn && fallbackImg) drawImg(fallbackImg, 1, 1.04, 1.16, localT, 0.30);
    } else if (p < 0.28) {
      // Transition Chapter 1 -> Chapter 2 (Dining 1)
      const localT0 = 1;
      const localT1 = (p - 0.20) / 0.24;
      const alpha1 = (p - 0.20) / 0.08;

      const drawn0 = images[0] ? drawImg(images[0], 1, 1.16, 1.16, localT0, 0.30) : false;
      if (!drawn0 && fallbackImg) drawImg(fallbackImg, 1, 1.16, 1.16, localT0, 0.30);

      if (images[1]) drawImg(images[1], alpha1, 1.02, 1.14, localT1, 0.45);
    } else if (p < 0.44) {
      // Chapter 2 (Dining 1 & Ambiance)
      const localT = (p - 0.20) / 0.24;
      const drawn = images[1] ? drawImg(images[1], 1, 1.02, 1.14, localT, 0.45) : false;
      if (!drawn && fallbackImg) drawImg(fallbackImg, 1, 1.02, 1.14, localT, 0.45);
    } else if (p < 0.54) {
      // Transition Chapter 2 -> Chapter 3 (Reception)
      const localT1 = 1;
      const localT3 = (p - 0.44) / 0.24;
      const alpha3 = (p - 0.44) / 0.10;

      const drawn1 = images[1] ? drawImg(images[1], 1, 1.14, 1.14, localT1, 0.45) : false;
      if (!drawn1 && fallbackImg) drawImg(fallbackImg, 1, 1.14, 1.14, localT1, 0.45);

      if (images[3]) drawImg(images[3], alpha3, 1.02, 1.15, localT3, 0.48);
    } else if (p < 0.68) {
      // Chapter 3 (Grand Reception)
      const localT = (p - 0.44) / 0.24;
      const drawn = images[3] ? drawImg(images[3], 1, 1.02, 1.15, localT, 0.48) : false;
      if (!drawn && fallbackImg) drawImg(fallbackImg, 1, 1.02, 1.15, localT, 0.48);
    } else if (p < 0.78) {
      // Transition Chapter 3 -> Chapter 4 (Room 2 Suite)
      const localT3 = 1;
      const localT4 = (p - 0.68) / 0.32;
      const alpha4 = (p - 0.68) / 0.10;

      const drawn3 = images[3] ? drawImg(images[3], 1, 1.15, 1.15, localT3, 0.48) : false;
      if (!drawn3 && fallbackImg) drawImg(fallbackImg, 1, 1.15, 1.15, localT3, 0.48);

      if (images[4]) drawImg(images[4], alpha4, 1.00, 1.14, localT4, 0.50);
    } else {
      // Chapter 4 (Executive Suite)
      const localT = (p - 0.68) / 0.32;
      const drawn = images[4] ? drawImg(images[4], 1, 1.00, 1.14, localT, 0.50) : false;
      if (!drawn && fallbackImg) drawImg(fallbackImg, 1, 1.00, 1.14, localT, 0.50);
    }
  }, []);

  const syncCanvas = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    drawChapter(progressRef.current);
  }, [drawChapter]);

  // Preload chapter images
  useEffect(() => {
    const sequenceUrls = [
      SKYBLISS_IMAGES.fullBuildingMain,
      SKYBLISS_IMAGES.dining1,
      SKYBLISS_IMAGES.dining,
      SKYBLISS_IMAGES.reception,
      SKYBLISS_IMAGES.room2,
    ];
    const loaded: HTMLImageElement[] = [];
    let count = 0;
    sequenceUrls.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        count++;
        if (count === sequenceUrls.length) {
          syncCanvas();
          ScrollTrigger.refresh();
        } else if (count === 1) {
          syncCanvas();
        }
      };
      img.onerror = () => {
        count++;
      };
      loaded.push(img);
    });
    imagesRef.current = loaded;
  }, [syncCanvas]);

  useEffect(() => {
    syncCanvas();
    window.addEventListener("resize", syncCanvas);
    return () => window.removeEventListener("resize", syncCanvas);
  }, [syncCanvas]);

  useEffect(() => {
    if (!prevReady) return;
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${getScrollDistance()}`,
        pin: true,
        scrub: 0.5,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate(self) {
          const p = self.progress;
          progressRef.current = p;
          drawChapter(p);

          if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;

          const ci = EXPERIENCE_CHAPTERS.findIndex(
            (ch) => p >= ch.range[0] && p <= ch.range[1]
          );

          if (ci !== -1) {
            setActiveChapIndex(ci);
          }
        },
      });
      ScrollTrigger.refresh();
    }, container);

    return () => ctx.revert();
  }, [prevReady, drawChapter]);

  const currentChapter = EXPERIENCE_CHAPTERS[activeChapIndex] || EXPERIENCE_CHAPTERS[0];

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenReservation) {
      onOpenReservation();
    } else {
      const el = document.querySelector("#contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      id="experience"
      className="relative w-full overflow-hidden bg-charcoal select-none"
      style={{ height: "100vh" }}
    >
      {/* ── Persistent Underlying Photograph (Prevents any black screen flash) ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={SKYBLISS_IMAGES.fullBuildingMain}
          alt="Skybliss Experience"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
        />
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full z-10"
        aria-hidden="true"
      />

      {/* Cinematic Dark Vignettes for Typographic Contrast */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,9,0.92) 0%, rgba(10,10,9,0.3) 45%, rgba(10,10,9,0.7) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(10,10,9,0.85) 0%, rgba(10,10,9,0.3) 50%, rgba(10,10,9,0.7) 100%)",
        }}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          TOP LABELS & PROGRESS COUNTER
      ══════════════════════════════════════════════════════════════════════ */}
      {/* Top-Left Section Eyebrow */}
      <div className="absolute top-16 sm:top-20 left-5 sm:left-8 md:left-14 z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`chap-eyebrow-${activeChapIndex}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <span className="w-5 h-px bg-gold" />
            <p className="font-sans text-gold text-[9px] sm:text-[10px] uppercase tracking-[0.28em] font-medium">
              {currentChapter.eyebrow}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Top-Right Chapter Counter */}
      <div className="absolute top-16 sm:top-20 right-5 sm:right-8 md:right-14 text-right z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`chap-counter-${activeChapIndex}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3 }}
            className="flex items-baseline justify-end gap-1"
          >
            <span className="font-sans text-gold font-bold text-sm sm:text-base tabular-nums tracking-[0.2em]">
              {currentChapter.label}
            </span>
            <span className="font-sans text-white/30 text-[11px] sm:text-[12px]"> / 04</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          BOTTOM-LEFT EDITORIAL STORYTELLING CONTENT
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="absolute bottom-16 sm:bottom-24 md:bottom-28 left-5 sm:left-8 md:left-14 right-5 sm:right-auto max-w-xl z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`chap-body-${activeChapIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="font-sans text-gold text-[10px] sm:text-[11px] mb-2 uppercase tracking-[0.22em] font-medium">
              {currentChapter.sub}
            </p>
            <h2
              className="font-serif text-white mb-3 sm:mb-4"
              style={{ fontSize: "clamp(1.9rem, 4.4vw, 4.4rem)", lineHeight: 1.08 }}
            >
              {currentChapter.title.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="font-sans text-white/75 text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed max-w-md">
              {currentChapter.description}
            </p>

            {/* Interactive CTA */}
            <div className="mt-4 sm:mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={handleCtaClick}
                className="glass-white inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full font-sans text-xs font-semibold text-charcoal shadow-lg hover:scale-105 transition-transform cursor-pointer"
              >
                <span>{currentChapter.ctaText}</span>
                <span>↗</span>
              </button>

              <a
                href={`https://wa.me/${SITE.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-dark hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-sans text-xs text-white/90 border border-white/15 hover:border-gold/50 transition-colors"
              >
                <span>WhatsApp Enquiry</span>
              </a>
            </div>

            {/* Mobile Compact Stats Row */}
            <div className="md:hidden grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10">
              {currentChapter.stats.map((st, i) => (
                <div key={i} className="glass-dark rounded-xl px-2 py-1.5 border border-white/10 text-center">
                  <p className="font-serif text-white text-xs font-semibold">{st.n}</p>
                  <p className="font-sans text-white/50 text-[8px] uppercase tracking-wider truncate mt-0.5">
                    {st.label.replace("\n", " ")}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          RIGHT-SIDE STACKED STATS CARDS (Desktop Only)
      ══════════════════════════════════════════════════════════════════════ */}
      <div
        className="hidden md:flex absolute right-8 md:right-14 flex-col gap-3.5 z-20 pointer-events-none"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`chap-stats-stack-${activeChapIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col gap-3"
          >
            {currentChapter.stats.map((c, i) => (
              <motion.div
                key={`${activeChapIndex}-${c.n}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="glass-light rounded-2xl px-5 py-3.5 min-w-[155px] border border-white/20 backdrop-blur-md shadow-xl"
              >
                <p className="font-serif text-white text-2xl font-semibold leading-none">{c.n}</p>
                <div className="mt-2 h-px w-7 bg-gold/50" />
                <p
                  className="font-sans text-white/65 text-[10px] mt-2 leading-snug whitespace-pre-line uppercase tracking-wider"
                >
                  {c.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Thin Progress Bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px z-30"
        style={{ background: "rgba(255,255,255,0.1)" }}
      >
        <div
          ref={barRef}
          className="h-full origin-left"
          style={{
            background: "linear-gradient(to right, #a8854f, #c9a96e, #f5e4be)",
            transform: "scaleX(0)",
            transition: "none",
          }}
        />
      </div>
    </div>
  );
}
