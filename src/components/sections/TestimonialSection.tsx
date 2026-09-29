import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { SKYBLISS_IMAGES } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const getScrollDistance = () => window.innerHeight * (window.innerWidth < 768 ? 0.6 : 0.85);

interface Props {
  onReady?: () => void;
}

export function TestimonialSection({ onReady }: Props = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const barRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const drawAmbiance = useCallback((p: number) => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    if (cw === 0 || ch === 0) return;

    ctx.clearRect(0, 0, cw, ch);

    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Smooth subtle camera drift and zoom
    const baseScale = Math.max(cw / iw, ch / ih);
    const zoom = 1.04 + 0.14 * p;
    const finalScale = baseScale * zoom;

    const drawW = iw * finalScale;
    const drawH = ih * finalScale;

    // Center on the panoramic rooftop seating and Pondicherry city skyline
    const targetX = iw * 0.5 * finalScale;
    const targetY = ih * 0.50 * finalScale;

    let dx = cw * 0.5 - targetX;
    let dy = ch * 0.5 - targetY - 30 * p;

    dx = Math.min(0, Math.max(cw - drawW, dx));
    dy = Math.min(0, Math.max(ch - drawH, dy));

    ctx.drawImage(img, dx, dy, drawW, drawH);
  }, []);

  const drawAmbianceRef = useRef(drawAmbiance);
  drawAmbianceRef.current = drawAmbiance;

  const syncCanvas = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    drawAmbianceRef.current(progressRef.current);
  }, []);

  // Load Skybliss Panoramic Top View image for the ambient pinned canvas
  useEffect(() => {
    const img = new Image();
    img.src = SKYBLISS_IMAGES.skyblissTop;
    if (img.complete && img.naturalWidth > 0) {
      imageRef.current = img;
      syncCanvas();
    } else {
      img.onload = () => {
        imageRef.current = img;
        syncCanvas();
      };
    }
  }, [syncCanvas]);

  useEffect(() => {
    syncCanvas();
    window.addEventListener("resize", syncCanvas);
    return () => window.removeEventListener("resize", syncCanvas);
  }, [syncCanvas]);

  useEffect(() => {
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
          drawAmbianceRef.current(p);
          if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
        },
      });
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      onReady?.();
    }, container);

    return () => ctx.revert();
  }, [onReady]);

  return (
    <div
      ref={containerRef}
      id="ambiance"
      className="relative w-full overflow-hidden bg-charcoal"
      style={{ height: "100vh" }}
    >
      {/* ── Persistent Underlying Rooftop Photograph ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={SKYBLISS_IMAGES.skyblissTop}
          alt="Skybliss Rooftop Atmosphere"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
        />
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full z-10"
        aria-hidden="true"
      />

      {/* Cinematic Vignettes */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,9,0.7) 0%, rgba(10,10,9,0.5) 45%, rgba(10,10,9,0.85) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 25%, rgba(10,10,9,0.65) 100%)",
        }}
      />

      {/* Top Label */}
      <div className="absolute top-16 sm:top-20 left-5 sm:left-8 md:left-14">
        <div className="flex items-center gap-2">
          <span className="w-5 h-px bg-gold" />
          <p
            className="font-sans text-gold text-[9px] sm:text-[10px] uppercase tracking-[0.28em] font-medium"
          >
            The Rooftop Atmosphere
          </p>
        </div>
      </div>

      {/* Subtle quote watermark */}
      <span
        className="absolute left-5 sm:left-8 md:left-14 top-20 sm:top-24 font-serif text-white/[0.04] select-none pointer-events-none leading-none"
        style={{ fontSize: "clamp(6rem, 18vw, 22rem)", lineHeight: 0.8 }}
        aria-hidden
      >
        “
      </span>

      {/* Central Statement */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-5 sm:px-8 md:px-20 text-center z-10">
        <motion.div
          className="flex items-center gap-2 mb-3 sm:mb-4"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-5 h-px bg-gold" />
          <p className="font-sans text-gold text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-semibold">
            The Rooftop Experience
          </p>
          <span className="w-5 h-px bg-gold" />
        </motion.div>

        <motion.h2
          className="font-serif text-white max-w-4xl font-normal"
          style={{ fontSize: "clamp(2rem, 4.5vw, 4.8rem)", lineHeight: 1.12 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1 }}
        >
          Above the City.
          <br />
          <em className="text-gold not-italic">Beyond Ordinary.</em>
        </motion.h2>

        <motion.p
          className="font-sans text-white/80 text-[13px] sm:text-[15px] max-w-xl mt-4 sm:mt-5 leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Open-air dining, panoramic views and an atmosphere designed for evenings that stay with you.
        </motion.p>

        <div className="mt-5 sm:mt-6 h-px w-16 bg-gold mx-auto" />

        <div className="mt-3 sm:mt-4 flex flex-col items-center">
          <p className="font-sans text-white text-[12px] sm:text-[14px] font-medium tracking-wide">
            Skybliss Rooftop Resto Lounge
          </p>
          <p
            className="font-sans text-white/50 text-[10px] sm:text-[11px] mt-0.5 tracking-[0.14em] uppercase"
          >
            4th Floor, Hotel Aishwarya Grand · Puducherry
          </p>
        </div>

        {/* Feature Badges */}
        <div className="mt-5 sm:mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
          {[
            "Open Rooftop Seating",
            "Panoramic City Views",
            "Signature Cocktail Bar",
            "Casual & Trendy Vibe",
          ].map((tag) => (
            <span
              key={tag}
              className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-sans text-white/80 glass-dark border border-white/15"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Interactive Experience CTA */}
        <div className="mt-6 sm:mt-8 flex items-center gap-3">
          <a
            href="#experience"
            className="glass-white flex items-center gap-2.5 px-6 py-2.5 rounded-full font-sans text-xs font-semibold text-charcoal shadow-xl hover:scale-105 transition-transform"
          >
            <span>Experience Skybliss</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* Bottom Ticker */}
      <div
        className="absolute left-0 right-0 overflow-hidden pointer-events-none"
        style={{
          bottom: "1px",
          height: "38px",
          background: "rgba(0,0,0,0.5)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="flex items-center h-full"
          style={{ animation: "hero-ticker 32s linear infinite", width: "max-content" }}
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {[
                { text: "Breathtaking Skyline Views", accent: true },
                { text: "Open Rooftop Seating", accent: false },
                { text: "Live DJ & Music Sessions", accent: false },
                { text: "Match Screenings On Big Screen", accent: true },
                { text: "Group Dining & Celebrations", accent: false },
                { text: "Crafted Cocktails & Bar Bites", accent: false },
                { text: "Open Daily 11 AM – 11 PM", accent: true },
              ].map((item, j) => (
                <span key={`${copy}-${j}`} className="flex items-center">
                  <span
                    className="font-sans whitespace-nowrap px-7 text-[10px] uppercase"
                    style={{
                      letterSpacing: "0.22em",
                      color: item.accent ? "#c9a96e" : "rgba(255,255,255,0.55)",
                      fontWeight: item.accent ? 500 : 400,
                    }}
                  >
                    {item.text}
                  </span>
                  <span
                    style={{
                      color: "rgba(201,169,110,0.45)",
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

      {/* Bottom Edge Progress */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
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
