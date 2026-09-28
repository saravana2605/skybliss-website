import { SITE, NAV_LINKS, buildWhatsAppEnquiryUrl } from "@/lib/constants";

interface Props {
  onOpenReservation?: () => void;
  onOpenMenu?: () => void;
}

export function Footer({ onOpenReservation, onOpenMenu }: Props) {
  const handleNavClick = (e: React.MouseEvent, label: string, href: string) => {
    e.preventDefault();
    if (label === "Menu" && onOpenMenu) {
      onOpenMenu();
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-black text-white pt-24 pb-12 px-8 md:px-14 border-t border-white/[0.12] overflow-hidden">
      {/* Background Watermark */}
      <span
        className="absolute left-1/2 -translate-x-1/2 bottom-0 font-serif text-white select-none pointer-events-none text-center"
        style={{
          fontSize: "clamp(5rem, 14vw, 16rem)",
          opacity: 0.02,
          lineHeight: 0.9,
          whiteSpace: "nowrap",
          letterSpacing: "0.12em",
        }}
        aria-hidden
      >
        SKYBLISS
      </span>

      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16 border-b border-white/[0.1]">
          {/* Brand Info (Cols 1-5) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gold/40 shadow-lg">
                <img
                  src="/images/skybliss/logo.png"
                  alt="Skybliss Logo"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif text-white text-xl tracking-wider">
                  SKYBLISS
                </h3>
                <p className="font-sans text-gold/80 text-[10px] tracking-[0.24em] uppercase">
                  Rooftop Resto Lounge
                </p>
              </div>
            </div>

            <p className="font-serif text-white/90 text-xl md:text-2xl leading-snug italic max-w-sm">
              “{SITE.tagline}”
            </p>

            <p className="font-sans text-white/60 text-xs leading-relaxed max-w-sm">
              An open-roof resto lounge combining global multi-cuisine dining, handcrafted
              beverages, city views, sports screenings, and Pondicherry's premier rooftop social atmosphere.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-dark px-4 py-2 rounded-full text-xs font-sans text-white/90 hover:border-gold transition-colors inline-flex items-center gap-1.5"
              >
                <span>Instagram: {SITE.instagramHandle}</span>
                ↗
              </a>
              <a
                href={buildWhatsAppEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-dark px-4 py-2 rounded-full text-xs font-sans text-[#25D366] hover:border-[#25D366] transition-colors inline-flex items-center gap-1.5"
              >
                <span>WhatsApp</span>
                ↗
              </a>
            </div>
          </div>

          {/* Quick Navigation (Cols 6-8) */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <p className="font-sans text-gold text-[10px] uppercase tracking-[0.24em] font-medium">
              Navigation
            </p>
            <ul className="flex flex-col gap-2.5 font-sans text-sm text-white/70">
              {NAV_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.label, item.href)}
                    className="hover:text-gold transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              {onOpenReservation && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenReservation}
                    className="hover:text-gold text-gold font-medium transition-colors text-left"
                  >
                    Pre-Book a Table ↗
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Visit & Contact (Cols 9-12) */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <p className="font-sans text-gold text-[10px] uppercase tracking-[0.24em] font-medium">
              Visit Us
            </p>
            <div className="font-sans text-white/70 text-xs leading-relaxed space-y-2">
              <p className="text-white font-medium text-sm">
                4th Floor, Hotel Aishwarya Grand
              </p>
              <p>
                No.147, Villianur Main Road, Kamban Nagar,
                <br />
                Reddiarpalayam, Puducherry - 605010
              </p>
              <p className="pt-2 text-white/90">
                <span className="text-gold font-medium">Opening Hours:</span> 11:00 AM – 11:00 PM Daily
              </p>
              <p className="text-white/90">
                <span className="text-gold font-medium">Phone:</span>{" "}
                <a href={`tel:${SITE.phones[0].raw}`} className="hover:text-gold">
                  {SITE.phones[0].display}
                </a>{" "}
                /{" "}
                <a href={`tel:${SITE.phones[1].raw}`} className="hover:text-gold">
                  {SITE.phones[1].display}
                </a>
              </p>
            </div>

            <div className="pt-3">
              <a
                href={SITE.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-sans text-gold border-b border-gold/40 pb-1 hover:text-white hover:border-white transition-colors"
              >
                <span>Get Directions on Google Maps</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 font-sans gap-4">
          <p>© Skybliss Rooftop Resto Lounge. All rights reserved.</p>
          <p>Hotel Aishwarya Grand · 4th Floor · Puducherry - 605010</p>
        </div>
      </div>
    </footer>
  );
}
