import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MENU_CATEGORIES, FEATURED_FOOD_ITEMS } from "@/lib/constants";

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
      className="relative bg-black py-20 sm:py-28 md:py-40 px-5 sm:px-8 md:px-14 border-t border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-20 gap-6">
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
                From The Kitchen
              </p>
            </motion.div>
            <motion.h2
              className="font-serif text-white font-normal"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 5rem)", lineHeight: 1.1 }}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.08 }}
            >
              Flavours Worth
              <br />
              <em style={{ color: "#c9a96e" }}>Coming Back For.</em>
            </motion.h2>
            <motion.p
              className="font-sans text-white/70 text-xs sm:text-sm mt-3.5 max-w-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.16 }}
            >
              Explore a selection of vibrant dishes inspired by Indian favourites and global flavours,
              prepared fresh for the Skybliss rooftop table.
            </motion.p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            {onOpenMenu && (
              <motion.button
                type="button"
                onClick={onOpenMenu}
                className="glass-light flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-sans text-[12px] text-white border border-white/20 hover:border-gold transition-colors cursor-pointer"
                style={{ letterSpacing: "0.08em" }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.25 }}
                whileHover={{ scale: 1.03 }}
              >
                <span>Digital Menu</span>
                <span className="text-gold text-xs">↗</span>
              </motion.button>
            )}
            {onOpenReservation && (
              <motion.button
                type="button"
                onClick={onOpenReservation}
                className="glass-white flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-sans text-[12px] font-semibold text-charcoal shadow-lg cursor-pointer"
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

        {/* ── Editorial Food Showcase Ribbon ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="font-sans text-gold text-[10px] uppercase tracking-[0.24em] font-medium">
              Chef&apos;s Culinary Gallery
            </p>
            <span className="font-sans text-white/40 text-[11px]">Swipe to explore</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {FEATURED_FOOD_ITEMS.map((item, idx) => (
              <motion.div
                key={item.title}
                onClick={onOpenMenu}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#121210] h-48 sm:h-56 cursor-pointer"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-sans text-gold bg-black/60 border border-gold/30 backdrop-blur-md">
                    0{idx + 1}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-3 right-3">
                  <span className="font-sans text-[9px] uppercase tracking-wider text-gold/80 block">
                    {item.tag}
                  </span>
                  <p className="font-serif text-white text-xs sm:text-sm leading-tight mt-0.5 line-clamp-1 group-hover:text-gold transition-colors">
                    {item.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Master Bento Menu Categories Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {MENU_CATEGORIES.map((cat, i) => {
            const isFeatured = i === 0 || i === 5;
            const isHovered = hovered === cat.id;

            return (
              <motion.div
                key={cat.id}
                onClick={onOpenMenu}
                className={`relative group cursor-pointer rounded-2xl overflow-hidden border ${
                  isFeatured ? "md:col-span-2" : ""
                }`}
                style={{
                  minHeight: isFeatured ? 360 : 300,
                  borderColor: isHovered ? "rgba(201,169,110,0.4)" : "rgba(255,255,255,0.12)",
                  transition: "border-color 0.35s ease",
                }}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.08 }}
                onMouseEnter={() => setHovered(cat.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Background Food Photography */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Heavy dark gradient overlay for text readability */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(12,12,11,0.96) 0%, rgba(12,12,11,0.85) 55%, rgba(12,12,11,0.65) 100%)",
                    }}
                  />
                </div>

                {/* Card Content Overlay */}
                <div
                  className={`relative z-10 p-5 sm:p-7 ${
                    isFeatured ? "md:p-9" : "md:p-7"
                  } h-full flex flex-col justify-between`}
                >
                  {/* Top row: Category Badge & Arrow */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans text-gold bg-black/60 border border-gold/30 backdrop-blur-md uppercase tracking-wider font-medium">
                        {cat.badge}
                      </span>
                      <span
                        className="font-sans text-white/50 text-[10px] uppercase hidden sm:inline"
                        style={{ letterSpacing: "0.2em" }}
                      >
                        {cat.type === "beverage" ? "Bar Selection" : "Kitchen"}
                      </span>
                    </div>

                    <motion.div
                      className="w-8 h-8 rounded-full border border-white/20 glass-dark flex items-center justify-center text-white/70 text-xs group-hover:border-gold/50 group-hover:text-gold"
                      animate={{ rotate: isHovered ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      ↗
                    </motion.div>
                  </div>

                  {/* Middle: Title, Tagline, Description */}
                  <div className="my-4">
                    <motion.div
                      className="h-px bg-gold mb-3 sm:mb-4 origin-left"
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
                      className="font-serif text-white mb-1.5 transition-colors duration-300 group-hover:text-gold"
                      style={{
                        fontSize: isFeatured
                          ? "clamp(1.75rem, 2.8vw, 2.6rem)"
                          : "clamp(1.3rem, 2vw, 1.8rem)",
                        lineHeight: 1.15,
                      }}
                    >
                      {cat.name}
                    </h3>

                    <p
                      className="font-sans text-gold/90 text-[11px] uppercase tracking-wider mb-2.5 font-medium"
                    >
                      {cat.tagline}
                    </p>

                    <p className="font-sans text-white/75 text-[13px] leading-relaxed max-w-lg">
                      {cat.description}
                    </p>
                  </div>

                  {/* Bottom: Highlight pills */}
                  <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-white/[0.08]">
                    {cat.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-2.5 py-1 rounded-full font-sans text-[10px] border border-white/15 text-white/80 bg-black/40 backdrop-blur-sm"
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
