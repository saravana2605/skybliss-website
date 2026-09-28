import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  progress: number;
  isComplete: boolean;
  onDone: () => void;
}

export function Preloader({ progress, isComplete, onDone }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      ".pl-element",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.1, ease: "power2.out", stagger: 0.12, delay: 0.05 }
    );
  }, []);

  useEffect(() => {
    if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
  }, [progress]);

  useEffect(() => {
    if (!isComplete) return;
    gsap
      .timeline({ onComplete: onDone })
      .to(barRef.current, { scaleX: 1, duration: 0.25 })
      .to(rootRef.current, { opacity: 0, duration: 0.65, ease: "power2.inOut" }, "+=0.2");
  }, [isComplete, onDone]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black"
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        {/* Subtle emblem container */}
        <div className="pl-element w-16 h-16 rounded-full overflow-hidden border border-gold/30 shadow-[0_0_30px_rgba(201,169,110,0.2)]">
          <img
            src="/images/skybliss/logo.png"
            alt="Skybliss Logo"
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="pl-element flex flex-col items-center">
          <p
            className="font-sans text-gold/80 text-[10px] uppercase tracking-[0.32em] mb-2"
          >
            Puducherry
          </p>
          <h1
            className="font-serif text-white tracking-[0.24em]"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)", lineHeight: 1.1 }}
          >
            SKYBLISS
          </h1>
          <p
            className="font-sans text-white/50 text-[10px] md:text-[11px] uppercase tracking-[0.26em] mt-2"
          >
            Rooftop Resto Lounge
          </p>
        </div>

        {/* Gold progress bar */}
        <div
          className="pl-element relative mt-2"
          style={{ width: "160px", height: "1px", background: "rgba(255,255,255,0.12)" }}
        >
          <div
            ref={barRef}
            className="absolute inset-0 origin-left"
            style={{
              background: "linear-gradient(to right, #a8854f, #c9a96e, #f5e4be)",
              transform: "scaleX(0)",
              transition: "transform 0.12s ease-out",
            }}
          />
        </div>

        <p className="pl-element font-sans text-white/30 text-[9px] uppercase tracking-[0.2em]">
          Elevating Your Evening
        </p>
      </div>
    </div>
  );
}
