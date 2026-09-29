import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";

export function FloatingCallButton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed z-40 bottom-[18px] right-4 sm:bottom-6 sm:right-6 pointer-events-auto select-none"
    >
      <motion.a
        id="floating-call-btn"
        href={`tel:${SITE.phoneRaw}`}
        aria-label={`Call Skybliss Rooftop Resto Lounge at ${SITE.phone}`}
        className="group relative flex items-center gap-2.5 sm:gap-3 pl-3 pr-4 sm:pl-3.5 sm:pr-5 py-2.5 sm:py-3 rounded-full bg-[#161614]/95 backdrop-blur-2xl border border-gold/45 hover:border-gold text-ivory shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_20px_rgba(201,169,110,0.18)] hover:shadow-[0_12px_44px_rgba(0,0,0,0.75),0_0_28px_rgba(201,169,110,0.35)] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.18 }}
      >
        {/* Subtle gold brand indicator pulse background */}
        <span
          className="absolute inset-0 rounded-full bg-gradient-to-r from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          aria-hidden="true"
        />

        {/* Branded Phone Icon Badge */}
        <span
          className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 border border-gold/60 flex items-center justify-center text-sm sm:text-base group-hover:bg-gold group-hover:text-charcoal transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] flex-shrink-0"
          aria-hidden="true"
        >
          📞
        </span>

        {/* Typography & Brand Details */}
        <div className="relative flex flex-col text-left">
          <span className="font-sans text-[11px] sm:text-[12px] font-semibold tracking-[0.06em] text-ivory group-hover:text-gold transition-colors leading-tight">
            Call Skybliss
          </span>
          <span className="font-sans text-[9px] sm:text-[10px] text-gold/80 tracking-wider font-medium leading-tight hidden xs:inline sm:inline">
            {SITE.phone}
          </span>
        </div>

        {/* Micro action arrow */}
        <span
          className="relative ml-0.5 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white/70 text-[10px] group-hover:bg-gold/20 group-hover:text-gold transition-all flex-shrink-0"
          aria-hidden="true"
        >
          ↗
        </span>
      </motion.a>
    </motion.div>
  );
}
