import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MENU_CATEGORIES } from "@/lib/constants";

interface Props {
  onOpenMenu?: () => void;
  onOpenReservation?: () => void;
}

export function ProjectsSection({ onOpenMenu, onOpenReservation }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      id="menu"
      className="relative bg-black py-28 md:py-40 px-8 md:px-14 border-t border-white/[0.08]"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div>
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
                Cuisine &amp; Spirits
              </p>
            </motion.div>
            <motion.h2
              className="font-serif text-white font-normal"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 5rem)", lineHeight: 1.1 }}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.08 }}
            >
              Global Flavours.
              <br />
              <em style={{ color: "#c9a96e" }}>Rooftop Energy.</em>
            </motion.h2>
          </div>

          <div className="flex items-center gap-4">
            {onOpenMenu && (
              <motion.button
                type="button"
                onClick={onOpenMenu}
                className="glass-light flex items-center gap-2 px-6 py-3 rounded-full font-sans text-[12px] text-white border border-white/20 hover:border-gold transition-colors"
                style={{ letterSpacing: "0.08em" }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.25 }}
                whileHover={{ scale: 1.03 }}
              >
                <span>View Full Menu</span>
                <span className="text-gold text-xs">↗</span>
              </motion.button>
            )}
            {onOpenReservation && (
              <motion.button
                type="button"
                onClick={onOpenReservation}
                className="glass-white hidden sm:flex items-center gap-2 px-6 py-3 rounded-full font-sans text-[12px] font-semibold text-charcoal shadow-lg"
                style={{ letterSpacing: "0.08em" }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.03 }}
              >
                <span>Pre-Book Table</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Bento card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {MENU_CATEGORIES.map((cat, i) => {
            const isFeatured = i === 0 || i === 5;
            const isHovered = hovered === cat.id;

            return (
              <motion.div
                key={cat.id}
                onClick={onOpenMenu}
                className={`relative group cursor-pointer rounded-2xl ${
                  isFeatured ? "md:col-span-2" : ""
                }`}
                style={{
                  background: isHovered
                    ? "rgba(201,169,110,0.06)"
                    : "rgba(255,255,255,0.03)",
                  border: isHovered
                    ? "1px solid rgba(201,169,110,0.35)"
                    : "1px solid rgba(255,255,255,0.08)",
                  minHeight: isFeatured ? 340 : 280,
                  transition: "background 0.35s ease, border-color 0.35s ease",
                }}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.08 }}
                onMouseEnter={() => setHovered(cat.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className={`p-7 ${
                    isFeatured ? "md:p-10" : "md:p-8"
                  } h-full flex flex-col justify-between`}
                >
                  {/* Top row: Number + Tag */}
                  <div className="flex items-start justify-between">
                    <span
                      className="font-sans text-gold text-[10px] uppercase font-medium"
                      style={{ letterSpacing: "0.26em" }}
                    >
                      {String(i + 1).padStart(2, "0")} ·{" "}
                      {cat.type === "beverage" ? "Bar Selection" : "Kitchen"}
                    </span>
                    <motion.div
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 text-xs group-hover:border-gold/50 group-hover:text-gold"
                      animate={{ rotate: isHovered ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      ↗
                    </motion.div>
                  </div>

                  {/* Middle: Content */}
                  <div className="my-4">
                    <motion.div
                      className="h-px bg-gold mb-4 origin-left"
                      animate={{
                        width: isHovered
                          ? isFeatured
                            ? 60
                            : 40
                          : isFeatured
                          ? 32
                          : 20,
                      }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    />

                    <h3
                      className="font-serif text-white mb-2 transition-colors duration-300 group-hover:text-gold"
                      style={{
                        fontSize: isFeatured
                          ? "clamp(1.75rem, 2.8vw, 2.8rem)"
                          : "clamp(1.25rem, 2vw, 1.8rem)",
                        lineHeight: 1.15,
                      }}
                    >
                      {cat.name}
                    </h3>

                    <p
                      className="font-sans text-gold/80 text-[11px] uppercase tracking-wider mb-3"
                    >
                      {cat.tagline}
                    </p>

                    <p className="font-sans text-white/65 text-[13px] leading-relaxed max-w-lg">
                      {cat.description}
                    </p>
                  </div>

                  {/* Bottom: Highlight pills */}
                  <div className="flex items-center gap-2 flex-wrap pt-2">
                    {cat.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-2.5 py-1 rounded-full font-sans text-[10px] border border-white/10 text-white/70 bg-white/[0.02]"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
