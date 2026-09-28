import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { GALLERY_ITEMS } from "@/lib/constants";

export function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [selectedImage, setSelectedImage] = useState<(typeof GALLERY_ITEMS)[0] | null>(null);

  return (
    <section
      ref={ref}
      id="gallery"
      className="relative bg-black py-28 md:py-40 px-8 md:px-14 border-t border-white/[0.08] overflow-hidden"
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
            A visual curation of our 4th-floor open-roof resto lounge, illuminated arrival,
            and contemporary hospitality at Hotel Aishwarya Grand.
          </motion.p>
        </div>

        {/* Editorial Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {GALLERY_ITEMS.map((item, i) => {
            // Editorial layout spans:
            // 0: Rooftop (Portrait) -> 5 cols, tall
            // 1: Entrance -> 7 cols
            // 2: Full building -> 7 cols
            // 3: Waiting hall -> 5 cols
            // 4: Room 1 -> 6 cols
            // 5: Room -> 6 cols
            let colSpan = "md:col-span-6";
            let heightClass = "h-80 md:h-[460px]";

            if (i === 0) {
              colSpan = "md:col-span-5 md:row-span-2";
              heightClass = "h-96 md:h-full min-h-[500px]";
            } else if (i === 1) {
              colSpan = "md:col-span-7";
              heightClass = "h-72 md:h-[320px]";
            } else if (i === 2) {
              colSpan = "md:col-span-7";
              heightClass = "h-72 md:h-[320px]";
            } else if (i === 3) {
              colSpan = "md:col-span-5";
              heightClass = "h-72 md:h-[320px]";
            } else if (i === 4 || i === 5) {
              colSpan = "md:col-span-6";
              heightClass = "h-72 md:h-[340px]";
            }

            return (
              <motion.div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className={`relative group cursor-pointer rounded-2xl overflow-hidden border border-white/10 ${colSpan} ${heightClass}`}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.08 }}
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
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between pointer-events-none">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-sans text-gold bg-black/60 border border-gold/30 backdrop-blur-md uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="w-8 h-8 rounded-full glass-dark flex items-center justify-center text-white/70 text-xs group-hover:text-gold group-hover:scale-110 transition-all duration-300">
                      ↗
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-white text-xl md:text-2xl group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-white/70 text-xs mt-1.5 max-w-md line-clamp-2">
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
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-[#141412] rounded-3xl overflow-hidden border border-white/20 shadow-2xl cursor-default"
            >
              <div className="relative w-full h-[60vh] md:h-[68vh] bg-black">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 md:p-8 flex items-center justify-between border-t border-white/10 bg-[#121210]">
                <div>
                  <span className="font-sans text-gold text-[10px] uppercase tracking-[0.2em] font-medium">
                    {selectedImage.category}
                  </span>
                  <h3 className="font-serif text-white text-xl md:text-2xl mt-0.5">
                    {selectedImage.title}
                  </h3>
                  <p className="font-sans text-white/60 text-xs mt-1">
                    {selectedImage.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="glass-light w-10 h-10 rounded-full flex items-center justify-center text-white text-sm hover:scale-105 transition-transform"
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
