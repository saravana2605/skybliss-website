import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SKYBLISS_IMAGES, AMBIANCE_PILLARS } from "@/lib/constants";

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      id="about"
      className="relative bg-black overflow-hidden py-32 md:py-44 px-8 md:px-14 border-t border-white/[0.08]"
    >
      {/* Background Watermark */}
      <span
        className="absolute right-0 top-12 font-serif text-white select-none pointer-events-none"
        style={{ fontSize: "clamp(6rem, 16vw, 20rem)", opacity: 0.03, lineHeight: 1 }}
        aria-hidden
      >
        SKYBLISS
      </span>

      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-start">
        {/* ── Left column ───────────────────────────────────────────── */}
        <div>
          {/* Gold pill label */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="w-6 h-px bg-gold" />
            <p
              className="font-sans text-gold text-[10px] uppercase tracking-[0.28em] font-medium"
            >
              The Skybliss Concept
            </p>
          </motion.div>

          <motion.h2
            className="font-serif text-white font-normal"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5.2rem)", lineHeight: 1.08 }}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          >
            Above the City.
            <br />
            <em style={{ color: "#c9a96e" }}>Beyond the Ordinary.</em>
          </motion.h2>

          <motion.div
            className="mt-8 h-px w-20 bg-gold"
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.24 }}
          />

          <motion.p
            className="font-sans text-white/85 text-[15px] leading-[1.85] mt-8 max-w-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.32 }}
          >
            Skybliss Rooftop Resto Lounge brings together open-air dining, panoramic city
            views, global flavours, premium beverages, and an energetic nightlife atmosphere in
            one elevated destination in Pondicherry.
          </motion.p>

          <motion.p
            className="font-sans text-white/60 text-[14px] leading-[1.85] mt-5 max-w-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.42 }}
          >
            Perched on the 4th floor of Hotel Aishwarya Grand on Villianur Main Road, Skybliss
            offers an open-roof haven where cooling evening breezes meet sizzling culinary
            creations, signature cocktails, and live sports screenings.
          </motion.p>

          {/* Visual card */}
          <motion.div
            className="relative mt-10 rounded-2xl overflow-hidden border border-white/15 h-64 md:h-72 max-w-lg group"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.48 }}
          >
            <img
              src={SKYBLISS_IMAGES.rooftop}
              alt="Skybliss Rooftop Resto Lounge Dining"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5">
              <span className="font-sans text-gold text-[9px] uppercase tracking-[0.2em] font-semibold">
                4th Floor Vantage
              </span>
              <p className="font-serif text-white text-lg mt-0.5">
                Open-Air Dining Beneath The Stars
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Right column — pillars ─────────────────────────────────── */}
        <div className="flex flex-col gap-0 md:pt-16">
          {AMBIANCE_PILLARS.map((p, i) => (
            <motion.div
              key={p.num}
              className="border-t border-white/[0.12] pt-7 pb-8 group"
              initial={{ opacity: 0, x: 28 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.22 + i * 0.12 }}
            >
              <div className="flex items-center justify-between mb-4">
                <p
                  className="font-sans text-gold text-[10px] font-medium"
                  style={{ letterSpacing: "0.26em" }}
                >
                  {p.num}
                </p>
                <span className="w-4 h-px bg-white/20 group-hover:w-8 group-hover:bg-gold transition-all duration-300" />
              </div>
              <h3 className="font-serif text-white text-xl md:text-2xl mb-3 group-hover:text-gold transition-colors">
                {p.title}
              </h3>
              <p className="font-sans text-white/65 text-[14px] leading-[1.8]">{p.body}</p>
            </motion.div>
          ))}

          {/* Location note badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="glass-dark rounded-2xl p-6 border border-gold/25 mt-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0 text-gold text-lg">
                📍
              </div>
              <div>
                <h4 className="font-serif text-white text-base">Hotel Aishwarya Grand</h4>
                <p className="font-sans text-white/60 text-xs mt-1 leading-relaxed">
                  No.147, Villianur Main Road, Kamban Nagar, Reddiarpalayam, Puducherry - 605010
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="font-sans text-gold text-[11px] font-medium">
                    Daily 11:00 AM – 11:00 PM
                  </span>
                  <span className="text-white/20">·</span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Hotel+Aishwarya+Grand+Villianur+Main+Road+Reddiarpalayam+Puducherry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-white/80 hover:text-white text-[11px] underline underline-offset-4"
                  >
                    View Map ↗
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
