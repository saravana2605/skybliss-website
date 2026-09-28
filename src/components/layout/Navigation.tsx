import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE, NAV_LINKS, buildWhatsAppEnquiryUrl } from "@/lib/constants";

interface NavigationProps {
  onOpenReservation?: () => void;
  onOpenMenu?: () => void;
}

export function Navigation({ onOpenReservation, onOpenMenu }: NavigationProps) {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (label: string, href: string) => {
    setActive(label);
    setMobileOpen(false);

    if (label === "Menu" && onOpenMenu) {
      onOpenMenu();
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenReservation) {
      onOpenReservation();
    } else {
      const el = document.querySelector("#contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300"
        aria-label="Skybliss Navigation"
      >
        <div
          className={`relative flex items-center justify-between px-5 md:px-10 pt-4 md:pt-6 transition-all duration-300 ${
            scrolled ? "pb-3" : "pb-0"
          }`}
        >
          {/* ── Left: Skybliss Logo Mark ── */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("Home", "#hero");
            }}
            aria-label="Skybliss Rooftop Resto Lounge"
            className="pointer-events-auto flex items-center gap-3 group"
          >
            <div className="relative w-11 h-11 md:w-12 md:h-12 rounded-full overflow-hidden border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.3)] bg-charcoal transition-all duration-300 group-hover:scale-105 group-hover:border-gold/60">
              <img
                src="/images/skybliss/logo.png"
                alt="Skybliss Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="font-serif text-white text-[15px] tracking-[0.14em] leading-tight font-medium group-hover:text-gold transition-colors">
                SKYBLISS
              </span>
              <span className="font-sans text-white/50 text-[9px] uppercase tracking-[0.22em] leading-tight">
                Rooftop Resto Lounge
              </span>
            </div>
          </a>

          {/* ── Centre: Glass pill nav (Desktop) ── */}
          <div className="hidden md:flex pointer-events-auto absolute left-1/2 -translate-x-1/2 glass-dark items-center gap-1 p-1.5 rounded-full border border-white/15">
            {NAV_LINKS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.label, item.href)}
                className="relative px-3.5 lg:px-4 py-1.5 rounded-full text-[12px] font-sans font-medium cursor-pointer transition-colors duration-200 whitespace-nowrap"
                style={{
                  color: active === item.label ? "#111110" : "rgba(255,255,255,0.75)",
                  letterSpacing: "0.03em",
                }}
              >
                {active === item.label && (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.96)",
                      boxShadow: "0 2px 14px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,1)",
                    }}
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>

          {/* ── Right: Instagram + WhatsApp + Booking CTA ── */}
          <div className="pointer-events-auto flex items-center gap-2.5 z-10">
            {/* Instagram link */}
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Skybliss Instagram @skybliss2024"
              className="glass-dark w-9 h-9 hidden sm:flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:border-gold/50"
              title="Follow @skybliss2024"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-white/80"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* WhatsApp direct */}
            <a
              href={buildWhatsAppEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Skybliss"
              className="glass-dark w-9 h-9 hidden sm:flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:border-[#25D366]/50"
              title="Chat on WhatsApp"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-[#25D366]"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>

            {/* Book a Table CTA */}
            <motion.button
              type="button"
              onClick={handleBooking}
              className="glass-white flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full text-[12px] font-sans font-semibold text-charcoal shadow-lg"
              style={{ letterSpacing: "0.04em" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
            >
              <span className="hidden sm:inline">Book a Table</span>
              <span className="sm:hidden">Book</span>
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0"
                style={{
                  background: "#111110",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                ↗
              </span>
            </motion.button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden glass-dark w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full border border-white/20"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-4 h-0.5 bg-white origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-4 h-0.5 bg-white"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-4 h-0.5 bg-white origin-center"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Navigation Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl md:hidden flex flex-col justify-between p-8 pt-24"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 pb-6 border-b border-white/10">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gold/40">
                  <img
                    src="/images/skybliss/logo.png"
                    alt="Skybliss Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-white text-xl tracking-wider">SKYBLISS</h3>
                  <p className="font-sans text-white/50 text-[10px] tracking-[0.2em] uppercase">
                    Rooftop Resto Lounge
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {NAV_LINKS.map((item, idx) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    onClick={() => handleNavClick(item.label, item.href)}
                    className="text-left font-serif text-2xl text-white/90 hover:text-gold transition-colors py-1 flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <span className="text-sm text-gold/60">0{idx + 1}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={handleBooking}
                className="w-full py-3.5 rounded-full bg-gold text-charcoal font-sans font-semibold text-center text-sm tracking-wide shadow-lg"
              >
                Book a Table Now
              </button>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={buildWhatsAppEnquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 rounded-full border border-[#25D366]/40 text-[#25D366] font-sans text-xs text-center flex items-center justify-center gap-2"
                >
                  <span>WhatsApp</span>
                  ↗
                </a>
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 rounded-full border border-white/20 text-white font-sans text-xs text-center flex items-center justify-center gap-2"
                >
                  <span>Instagram</span>
                  ↗
                </a>
              </div>

              <p className="font-sans text-white/40 text-[11px] text-center mt-2 leading-relaxed">
                4th Floor, Hotel Aishwarya Grand, Pondicherry
                <br />
                Daily 11:00 AM – 11:00 PM
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
