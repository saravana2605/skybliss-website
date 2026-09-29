import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { GALLERY_ITEMS, type GalleryItem } from "@/lib/constants";

const CATEGORIES = ["All", "Rooftop & Dining", "Cuisine", "Hospitality & Suites"] as const;
type Category = (typeof CATEGORIES)[number];

export function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section
      ref={ref}
      id="gallery"
      className="relative bg-black py-20 sm:py-28 md:py-40 px-5 sm:px-8 md:px-14 border-t border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6">
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
                Visual Gallery
              </p>
            </motion.div>
            <motion.h2
              className="font-serif text-white font-normal"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 5rem)", lineHeight: 1.1 }}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.08 }}
            >
              The Skybliss
              <br />
              <em style={{ color: "#c9a96e" }}>Perspective.</em>
            </motion.h2>
          </div>

          <motion.p
            className="font-sans text-white/60 text-xs md:text-sm max-w-sm leading-relaxed"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
          >
            A visual curation of our 4th-floor open-roof resto lounge, signature multi-cuisine dining,
            illuminated arrival, and contemporary hospitality at Hotel Aishwarya Grand.
          </motion.p>
        </div>

        {/* ── Category Filter Buttons ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-12 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-5 py-2 rounded-full font-sans text-xs transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-gold text-charcoal font-semibold shadow-lg"
                  : "glass-dark text-white/70 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Editorial Gallery Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 md:gap-6">
          {filteredItems.map((item, i) => {
            // Asymmetric editorial spans:
            let colSpan = "lg:col-span-6";
            let heightClass = "h-72 sm:h-80 md:h-[340px]";

            if (i % 6 === 0) {
              colSpan = "lg:col-span-7";
              heightClass = "h-80 sm:h-96 md:h-[400px]";
            } else if (i % 6 === 1) {
              colSpan = "lg:col-span-5";
              heightClass = "h-80 sm:h-96 md:h-[400px]";
            } else if (i % 6 === 2) {
              colSpan = "lg:col-span-4";
              heightClass = "h-72 sm:h-80 md:h-[320px]";
            } else if (i % 6 === 3) {
              colSpan = "lg:col-span-4";
              heightClass = "h-72 sm:h-80 md:h-[320px]";
            } else if (i % 6 === 4) {
              colSpan = "lg:col-span-4";
              heightClass = "h-72 sm:h-80 md:h-[320px]";
            } else if (i % 6 === 5) {
              colSpan = "lg:col-span-12";
              heightClass = "h-80 sm:h-96 md:h-[420px]";
            }

            return (
              <motion.div
                key={item.id}
                layout
                onClick={() => setSelectedImage(item)}
                className={`relative group cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-[#121210] ${colSpan} ${heightClass}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.05 * (i % 6) }}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Ambient dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

                {/* Info Overlay */}
                <div className="absolute inset-0 p-5 sm:p-6 md:p-7 flex flex-col justify-between pointer-events-none">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-sans text-gold bg-black/60 border border-gold/30 backdrop-blur-md uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="w-8 h-8 rounded-full glass-dark flex items-center justify-center text-white/70 text-xs group-hover:text-gold group-hover:scale-110 transition-all duration-300">
                      ↗
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-white text-lg sm:text-xl md:text-2xl group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-white/70 text-xs mt-1 sm:mt-1.5 max-w-md line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-12 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] max-h-[90dvh] flex flex-col bg-[#141412] rounded-3xl overflow-hidden border border-white/20 shadow-2xl cursor-default"
            >
              <div className="relative w-full h-[55vh] sm:h-[60vh] md:h-[68vh] bg-black">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-5 sm:p-6 md:p-8 flex items-center justify-between border-t border-white/10 bg-[#121210]">
                <div>
                  <span className="font-sans text-gold text-[10px] uppercase tracking-[0.2em] font-medium">
                    {selectedImage.category}
                  </span>
                  <h3 className="font-serif text-white text-lg sm:text-xl md:text-2xl mt-0.5">
                    {selectedImage.title}
                  </h3>
                  <p className="font-sans text-white/60 text-xs mt-1">
                    {selectedImage.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  aria-label="Close Lightbox"
                  className="glass-light w-10 h-10 rounded-full flex items-center justify-center text-white text-sm hover:scale-105 transition-transform flex-shrink-0 ml-4 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
