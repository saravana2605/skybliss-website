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
      className="relative bg-black py-20 sm:py-28 md:py-40 px-5 sm:px-8 md:px-14 overflow-hidden border-t border-white/[0.08]"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="mb-14 md:mb-20 max-w-2xl">
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
              Nights At Skybliss
            </p>
          </motion.div>

          <motion.h2
            className="font-serif text-white font-normal"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 5rem)", lineHeight: 1.1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1 }}
          >
            Good Food. Great Drinks.
            <br />
            <em style={{ color: "#c9a96e" }}>Better Vibes.</em>
          </motion.h2>

          <motion.p
            className="font-sans text-white/75 text-[14px] leading-relaxed mt-5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Enjoy lively evenings with music, drinks, rooftop views and an atmosphere made for friends,
            celebrations and late-night conversations. From live music and DJ nights to match screenings
            and group gatherings, Skybliss brings energy to every evening.
          </motion.p>
        </div>

        {/* ── Steps grid ──────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-0 border-t border-l border-white/[0.14]">
          {EVENTS_HIGHLIGHTS.map((s, i) => (
            <motion.div
              key={s.num}
              className="border-b border-r border-white/[0.14] p-6 sm:p-8 md:p-10 group hover:bg-white/[0.04] transition-colors duration-300 flex flex-col justify-between"
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
                    className="font-sans text-[11px] text-gold/80 hover:text-white transition-colors uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Reserve For {s.title}</span>
                    <span>↗</span>
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* ── Cinematic Feature Banner: Live & Celebrate ── */}
        <motion.div
          className="relative mt-12 sm:mt-16 rounded-3xl overflow-hidden border border-white/15 h-64 sm:h-80 md:h-96 group"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <img
            src="/images/skybliss/rooftop.png"
            alt="Live & Celebrate at Skybliss Rooftop"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
          <div className="absolute inset-0 p-6 sm:p-10 md:p-14 flex flex-col justify-between max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-5 h-px bg-gold" />
              <p className="font-sans text-gold text-[10px] uppercase tracking-[0.26em] font-medium">
                Live &amp; Celebrate
              </p>
            </div>

            <div>
              <h3 className="font-serif text-white text-2xl sm:text-3xl md:text-4xl font-normal leading-tight">
                Make the Evening Yours.
              </h3>
              <p className="font-sans text-white/75 text-xs sm:text-sm mt-3 leading-relaxed max-w-md">
                From live music and DJ nights to celebrations and group gatherings, Skybliss brings
                unmatched energy and skyline views to every evening in Pondicherry.
              </p>

              {onOpenReservation && (
                <button
                  type="button"
                  onClick={onOpenReservation}
                  className="mt-5 sm:mt-6 glass-white inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full font-sans text-xs font-semibold text-charcoal shadow-xl hover:scale-105 transition-transform cursor-pointer"
                >
                  <span>Plan Your Celebration</span>
                  <span>↗</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
