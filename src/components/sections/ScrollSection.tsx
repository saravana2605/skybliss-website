import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKYBLISS_IMAGES } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const getScrollDistance = () =>
  window.innerHeight * (window.innerWidth < 768 ? 3.5 : 4.5);

const CHAPTER_STEPS = [
  {
    range: [0, 0.33],
    num: "01",
    sub: "4th Floor, Hotel Aishwarya Grand",
    title: "Twilight\nAscent",
    desc: "Rise above the bustling streets of Pondicherry into an open-sky sanctuary where warm sea breezes and panoramic city lights greet your arrival.",
  },
  {
    range: [0.33, 0.65],
    num: "02",
    sub: "Multi-Cuisine Excellence",
    title: "Global Flavours\n& Cocktails",
    desc: "An inspired culinary journey blending North Indian delicacies, South Indian fusion, sizzling Asian woks, and handcrafted artisanal beverages.",
  },
  {
    range: [0.65, 0.82],
    num: "03",
    sub: "Music & Match Screenings",
    title: "Nightlife &\nCelebrations",
    desc: "From high-octane cricket and football match-day screenings on large screens to acoustic sessions and weekend DJ nights under the stars.",
  },
  {
    range: [0.82, 1.0],
    num: "03",
    sub: "Hotel Aishwarya Grand · Rooms & Suites",
    title: "Interior Suite\n& Sanctuary",
    desc: "Step directly from the electric rooftop atmosphere into the tranquil, refined comfort of Hotel Aishwarya Grand's premium executive suites.",
  },
];

interface Props {
  prevReady: boolean;
  onOpenReservation?: () => void;
}

export function ScrollSection({ prevReady, onOpenReservation }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const lastChapRef = useRef(-1);
  const chapNumRef = useRef<HTMLSpanElement>(null);
  const chapTitleRef = useRef<HTMLHeadingElement>(null);
  const chapSubRef = useRef<HTMLParagraphElement>(null);
  const chapDescRef = useRef<HTMLParagraphElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

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

    // Helper to draw image with smooth camera drift, zoom and crossfade
    const drawImg = (
      img: HTMLImageElement,
      alpha: number,
      scaleStart: number,
      scaleEnd: number,
      localT: number,
      focusY: number
    ) => {
      if (!img || !img.complete || img.naturalWidth === 0 || alpha <= 0.005) return;
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
    };

    // 1. Full Building (Twilight Ascent) - [0.00, 0.32]
    if (p <= 0.32 && images[0]) {
      const alpha = p > 0.22 ? 1 - (p - 0.22) / 0.10 : 1;
      const localT = p / 0.32;
      drawImg(images[0], alpha, 1.04, 1.18, localT, 0.25);
    }

    // 2. Rooftop Dining (Global Flavours) - [0.20, 0.58]
    if (p >= 0.20 && p <= 0.58 && images[1]) {
      let alpha = 1;
      if (p < 0.32) alpha = (p - 0.20) / 0.12;
      else if (p > 0.46) alpha = 1 - (p - 0.46) / 0.12;
      const localT = (p - 0.20) / 0.38;
      drawImg(images[1], alpha, 1.02, 1.15, localT, 0.42);
    }

    // 3. Entrance / Approach Interior - [0.44, 0.72]
    if (p >= 0.44 && p <= 0.72 && images[2]) {
      let alpha = 1;
      if (p < 0.56) alpha = (p - 0.44) / 0.12;
      else if (p > 0.62) alpha = 1 - (p - 0.62) / 0.10;
      const localT = (p - 0.44) / 0.28;
      drawImg(images[2], alpha, 1.03, 1.18, localT, 0.48);
    }

    // 4. Room Entrance (room.png) - [0.58, 0.86]
    if (p >= 0.58 && p <= 0.86 && images[3]) {
      let alpha = 1;
      if (p < 0.70) alpha = (p - 0.58) / 0.12;
      else if (p > 0.76) alpha = 1 - (p - 0.76) / 0.10;
      const localT = (p - 0.58) / 0.28;
      drawImg(images[3], alpha, 1.02, 1.18, localT, 0.46);
    }

    // 5. Room Interior Suite (room1.png) - [0.74, 1.00]
    if (p >= 0.74 && images[4]) {
      const alpha = p < 0.84 ? (p - 0.74) / 0.10 : 1;
      const localT = (p - 0.74) / 0.26;
      drawImg(images[4], alpha, 1.00, 1.14, localT, 0.50);
    }
  }, []);

  const syncCanvas = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    drawChapter(progressRef.current);
  }, [drawChapter]);

  // Preload chapter images & cinematic room sequence
  useEffect(() => {
    const sequenceUrls = [
      SKYBLISS_IMAGES.fullBuilding,
      SKYBLISS_IMAGES.rooftop,
      SKYBLISS_IMAGES.entrance,
      SKYBLISS_IMAGES.room,
      SKYBLISS_IMAGES.room1,
    ];
    const loaded: HTMLImageElement[] = [];
    sequenceUrls.forEach((src, idx) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (idx === 0) syncCanvas();
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

          const ci = CHAPTER_STEPS.findIndex(
            (ch) => p >= ch.range[0] && p <= ch.range[1]
          );

          if (ci !== -1 && ci !== lastChapRef.current) {
            lastChapRef.current = ci;
            const ch = CHAPTER_STEPS[ci];
            if (chapNumRef.current) chapNumRef.current.textContent = ch.num;
            if (chapSubRef.current) chapSubRef.current.textContent = ch.sub;
            if (chapDescRef.current) chapDescRef.current.textContent = ch.desc;

            if (chapTitleRef.current) {
              const el = chapTitleRef.current;
              el.style.transition = "none";
              el.style.opacity = "0";
              el.style.transform = "translateY(16px)";
              el.innerHTML = ch.title.replace("\n", "<br/>");
              requestAnimationFrame(() => {
                el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
              });
            }
          }
        },
      });
      ScrollTrigger.refresh();
    }, container);

    return () => ctx.revert();
  }, [prevReady, drawChapter]);

  return (
    <div
      ref={containerRef}
      id="experience"
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
            "linear-gradient(to top, rgba(10,10,9,0.88) 0%, rgba(10,10,9,0.15) 45%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(10,10,9,0.7) 0%, rgba(10,10,9,0.2) 45%, transparent 70%)",
        }}
      />

      {/* Top-Left Section Label */}
      <div className="absolute top-20 left-8 md:left-14">
        <div className="flex items-center gap-2">
          <span className="w-5 h-px bg-gold" />
          <p
            className="font-sans text-gold text-[10px] uppercase tracking-[0.28em] font-medium"
          >
            The Rooftop Experience
          </p>
        </div>
      </div>

      {/* Top-Right Chapter Counter */}
      <div className="absolute top-20 right-8 md:right-14 text-right">
        <span
          ref={chapNumRef}
          className="font-sans text-white/50 text-[12px] tabular-nums tracking-[0.2em]"
        >
          01
        </span>
        <span className="font-sans text-white/20 text-[12px]"> / 03</span>
      </div>

      {/* Animated Chapter Content (Bottom-Left) */}
      <div className="absolute bottom-28 md:bottom-32 left-8 md:left-14 max-w-xl">
        <p
          ref={chapSubRef}
          className="font-sans text-gold text-[11px] mb-3 uppercase tracking-[0.22em] font-medium"
        >
          4th Floor, Hotel Aishwarya Grand
        </p>
        <h2
          ref={chapTitleRef}
          className="font-serif text-white mb-4"
          style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.8rem)", lineHeight: 1.1 }}
        >
          Twilight
          <br />
          Ascent
        </h2>
        <p
          ref={chapDescRef}
          className="font-sans text-white/70 text-[13px] md:text-[14px] leading-relaxed max-w-md hidden sm:block"
        >
          Rise above the bustling streets of Pondicherry into an open-sky sanctuary where
          warm sea breezes and panoramic city lights greet your arrival.
        </p>

        {onOpenReservation && (
          <button
            type="button"
            onClick={onOpenReservation}
            className="mt-6 inline-flex items-center gap-2 font-sans text-xs text-gold border-b border-gold/40 pb-0.5 hover:text-white transition-colors"
          >
            <span>Reserve For This Experience</span>
            <span>↗</span>
          </button>
        )}
      </div>

      {/* Glass Fact Badges (Right Center) */}
      <div
        className="absolute right-8 md:right-14 flex flex-col gap-3"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        {[
          { n: "4th Fl.", label: "Hotel Aishwarya\nGrand" },
          { n: "5+", label: "Global\nCuisines" },
          { n: "100%", label: "Open-Air\nSkyline" },
        ].map((c) => (
          <div
            key={c.n}
            className="glass-light rounded-xl px-4 py-3 min-w-[130px] border border-white/15"
          >
            <p className="font-serif text-white text-xl font-semibold leading-none">{c.n}</p>
            <div className="mt-1.5 h-px w-6 bg-gold/40" />
            <p
              className="font-sans text-white/55 text-[9px] mt-1.5 leading-snug whitespace-pre-line uppercase tracking-wider"
            >
              {c.label}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom Thin Progress Bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "rgba(255,255,255,0.08)" }}
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
