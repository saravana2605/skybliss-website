import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EVENTS_HIGHLIGHTS } from "@/lib/constants";

interface Props {
  onOpenReservation?: () => void;
}

export function ProcessSection({ onOpenReservation }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      id="events"
      className="relative bg-black py-28 md:py-40 px-8 md:px-14 overflow-hidden border-t border-white/[0.08]"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="mb-16 md:mb-20 max-w-2xl">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="w-6 h-px bg-gold" />
            <p
              className="font-sans text-gold text-[10px] uppercase tracking-[0.28em] font-medium"
            >
              Events &amp; Nightlife
            </p>
          </motion.div>

          <motion.h2
            className="font-serif text-white font-normal"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 5rem)", lineHeight: 1.1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1 }}
          >
            Where the Night
            <br />
            <em style={{ color: "#c9a96e" }}>Comes Alive.</em>
          </motion.h2>

          <motion.p
            className="font-sans text-white/70 text-[14px] leading-relaxed mt-5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From high-stakes cricket and football tournament screenings on large screens to
            soulful acoustic performances, vibrant DJ sets, and private milestones under the
            stars.
          </motion.p>
        </div>

        {/* ── Steps grid ──────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-0 border-t border-l border-white/[0.14]">
          {EVENTS_HIGHLIGHTS.map((s, i) => (
            <motion.div
              key={s.num}
              className="border-b border-r border-white/[0.14] p-8 md:p-10 group hover:bg-white/[0.04] transition-colors duration-300 flex flex-col justify-between"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.65,
                delay: 0.08 + (i % 3) * 0.1 + Math.floor(i / 3) * 0.15,
              }}
            >
              <div>
                {/* Top row */}
                <div className="flex items-center justify-between mb-7">
                  <span
                    className="font-sans text-gold text-[11px] font-semibold"
                    style={{ letterSpacing: "0.24em" }}
                  >
                    {s.num}
                  </span>
                  <span
                    className="font-sans text-white/50 text-[10px] uppercase"
                    style={{ letterSpacing: "0.16em" }}
                  >
                    {s.sub}
                  </span>
                </div>

                <h3 className="font-serif text-white text-2xl md:text-[1.75rem] mb-4 leading-tight group-hover:text-gold transition-colors">
                  {s.title}
                </h3>

                <div className="w-8 h-px bg-gold mb-5 transition-all duration-300 group-hover:w-16" />

                <p className="font-sans text-white/65 text-[13px] leading-[1.85]">
                  {s.body}
                </p>
              </div>

              {onOpenReservation && (
                <div className="pt-6 mt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={onOpenReservation}
                    className="font-sans text-[11px] text-gold/80 hover:text-white transition-colors uppercase tracking-wider inline-flex items-center gap-1.5"
                  >
                    <span>Reserve For {s.title}</span>
                    <span>↗</span>
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
