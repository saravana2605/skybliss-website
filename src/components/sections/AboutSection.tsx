import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SITE, SKYBLISS_IMAGES, AMBIANCE_PILLARS } from "@/lib/constants";
import { LocationMapVisual } from "@/components/ui/LocationMapVisual";

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      id="about"
      className="relative bg-black overflow-hidden py-20 sm:py-32 md:py-44 px-5 sm:px-8 md:px-14 border-t border-white/[0.08]"
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
              Dining &amp; Ambience
            </p>
          </motion.div>

          <motion.h2
            className="font-serif text-white font-normal"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5.2rem)", lineHeight: 1.08 }}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          >
            Made for
            <br />
            <em style={{ color: "#c9a96e" }}>Long Evenings.</em>
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
            Relax into beautifully designed spaces, warm lighting and a dining atmosphere
            made for conversations, celebrations and memorable evenings.
          </motion.p>

          <motion.p
            className="font-sans text-white/60 text-[14px] leading-[1.85] mt-5 max-w-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.42 }}
          >
            Settle into an elegant rooftop setting where beautifully presented food, warm
            hospitality and panoramic city views come together beneath the open Pondicherry sky.
          </motion.p>

          {/* Visual card */}
          <motion.div
            className="relative mt-10 rounded-2xl overflow-hidden border border-white/15 h-64 md:h-72 max-w-lg group"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.48 }}
          >
            <img
              src={SKYBLISS_IMAGES.dining}
              alt="Skybliss Rooftop Resto Lounge Dining"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <div>
                <span className="font-sans text-gold text-[9px] uppercase tracking-[0.2em] font-semibold">
                  The Dining Experience
                </span>
                <p className="font-serif text-white text-lg mt-0.5">
                  Dine Above the City
                </p>
              </div>
              <a
                href="#menu"
                className="glass-white px-3.5 py-1.5 rounded-full text-[11px] font-sans font-semibold text-charcoal shadow-lg hover:scale-105 transition-transform inline-flex items-center gap-1"
              >
                <span>Explore Dining</span>
                <span>↗</span>
              </a>
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

          {/* Location note badge with footer map visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="group relative overflow-hidden rounded-2xl border border-gold/30 bg-[#0d0e11] p-4 sm:p-5 transition-all duration-500 hover:border-gold hover:shadow-[0_12px_35px_rgba(201,169,110,0.18)] mt-4"
          >
            {/* Ambient night glow gradient behind map */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.07] via-transparent to-black pointer-events-none" />

            {/* Same map visual as footer */}
            <a
              href={SITE.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Hotel Aishwarya Grand on Google Maps"
              className="block relative overflow-hidden rounded-xl"
            >
              <LocationMapVisual mapHeightClass="h-44 sm:h-48" />
            </a>

            {/* Location Information */}
            <div className="relative z-10 mt-4 pt-1 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0 text-gold text-lg group-hover:bg-gold group-hover:text-black transition-colors duration-300">
                📍
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-serif text-white text-base font-medium group-hover:text-gold transition-colors">
                  Hotel Aishwarya Grand
                </h4>
                <p className="font-sans text-white/60 text-xs mt-1 leading-relaxed">
                  {SITE.address}
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3">
                  <span className="font-sans text-gold text-[11px] font-medium">
                    Daily 11:00 AM – 12:00 AM
                  </span>
                  <span className="text-white/20">·</span>
                  <a
                    href={SITE.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-white/80 hover:text-white text-[11px] underline underline-offset-4 inline-flex items-center gap-1 transition-colors"
                  >
                    <span>View Map</span>
                    <span>↗</span>
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
