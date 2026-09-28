import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { SKYBLISS_IMAGES } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const getScrollDistance = () => window.innerHeight * (window.innerWidth < 768 ? 0.6 : 0.85);

interface Props {
  prevReady: boolean;
  onReady?: () => void;
}

export function TestimonialSection({ prevReady, onReady }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const barRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Load Rooftop image for the ambient pinned canvas
  useEffect(() => {
    const img = new Image();
    img.src = SKYBLISS_IMAGES.rooftop;
    img.onload = () => {
      imageRef.current = img;
      syncCanvas();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const zoom = 1.05 + 0.12 * p;
    const finalScale = baseScale * zoom;

    const drawW = iw * finalScale;
    const drawH = ih * finalScale;

    // Keep the rooftop seating and skyline centered
    const targetX = iw * 0.5 * finalScale;
    const targetY = ih * 0.45 * finalScale;

    let dx = cw * 0.5 - targetX;
    let dy = ch * 0.5 - targetY - 30 * p;

    dx = Math.min(0, Math.max(cw - drawW, dx));
    dy = Math.min(0, Math.max(ch - drawH, dy));

    ctx.drawImage(img, dx, dy, drawW, drawH);
  }, []);

  const syncCanvas = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    drawAmbiance(progressRef.current);
  }, [drawAmbiance]);

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
          drawAmbiance(p);
          if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
        },
      });
      ScrollTrigger.refresh();
      onReady?.();
    }, container);

    return () => ctx.revert();
  }, [prevReady, drawAmbiance, onReady]);

  return (
    <div
      ref={containerRef}
      id="ambiance"
      className="relative w-full overflow-hidden bg-charcoal"
      style={{ height: "100vh" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full"
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
      <div className="absolute top-20 left-8 md:left-14">
        <div className="flex items-center gap-2">
          <span className="w-5 h-px bg-gold" />
          <p
            className="font-sans text-gold text-[10px] uppercase tracking-[0.28em] font-medium"
          >
            The Rooftop Atmosphere
          </p>
        </div>
      </div>

      {/* Subtle quote watermark */}
      <span
        className="absolute left-8 md:left-14 top-24 font-serif text-white/[0.04] select-none pointer-events-none leading-none"
        style={{ fontSize: "clamp(8rem, 18vw, 22rem)", lineHeight: 0.8 }}
        aria-hidden
      >
        “
      </span>

      {/* Central Statement */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 md:px-20 text-center z-10">
        <motion.p
          className="font-sans text-gold text-[11px] uppercase tracking-[0.3em] mb-4 font-semibold"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Above The City · Beyond The Ordinary
        </motion.p>

        <blockquote
          className="font-serif text-white max-w-4xl"
          style={{ fontSize: "clamp(1.7rem, 3.2vw, 3.4rem)", lineHeight: 1.25 }}
        >
          “Skybliss brings together open-air dining, panoramic city lights,{" "}
          <em className="text-gold not-italic">global multi-cuisine,</em> and an electric nightlife
          energy in one destination.”
        </blockquote>

        <div className="mt-8 h-px w-16 bg-gold mx-auto" />

        <div className="mt-6 flex flex-col items-center">
          <p className="font-sans text-white text-[15px] font-medium tracking-wide">
            Skybliss Rooftop Resto Lounge
          </p>
          <p
            className="font-sans text-white/50 text-[11px] mt-1 tracking-[0.14em] uppercase"
          >
            4th Floor, Hotel Aishwarya Grand · Puducherry
          </p>
        </div>

        {/* Feature Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {[
            "Open Rooftop Seating",
            "Panoramic City Views",
            "Signature Cocktail Bar",
            "Casual & Trendy Vibe",
          ].map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full text-[11px] font-sans text-white/80 glass-dark border border-white/15"
            >
              {tag}
            </span>
          ))}
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
