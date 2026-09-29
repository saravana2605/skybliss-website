import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { STATS } from "@/lib/constants";

function Counter({
  target,
  suffix,
  decimals,
}: {
  target: number;
  suffix: string;
  decimals: number;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = Date.now();
    const tick = () => {
      const t = Math.min((Date.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(parseFloat((target * ease).toFixed(decimals)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, decimals]);

  return (
    <span ref={ref}>
      {decimals > 0 ? val.toFixed(decimals) : Math.round(val)}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="relative bg-black border-t border-b border-white/[0.12] py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-14 overflow-hidden">
      {/* Skybliss watermark */}
      <span
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 font-serif text-white select-none pointer-events-none flex items-center"
        style={{
          fontSize: "clamp(5rem, 16vw, 18rem)",
          opacity: 0.03,
          whiteSpace: "nowrap",
          lineHeight: 1,
          letterSpacing: "0.1em",
        }}
        aria-hidden
      >
        SKYBLISS
      </span>

      <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 relative z-10">
        {STATS.map((s, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center md:border-r border-white/[0.12] last:border-0 md:px-10 py-3 sm:py-4"
          >
            <p
              className="font-serif text-white"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 5.5rem)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              <Counter target={s.value} suffix={s.suffix} decimals={s.decimals} />
            </p>
            <div className="w-6 h-px bg-gold my-3 sm:my-4" />
            <p
              className="font-sans text-white/70 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.2em]"
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
