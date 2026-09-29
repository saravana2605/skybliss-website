import { useRef, useState, type FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { SITE, buildWhatsAppReservationUrl, buildWhatsAppEnquiryUrl } from "@/lib/constants";
import {
  cleanPhoneNumber,
  isValidIndianPhone,
  validateReservationForm,
  type FormErrors,
  type ReservationFormData,
} from "@/lib/validation";

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const [formData, setFormData] = useState<ReservationFormData>({
    name: "",
    phone: "",
    date: "",
    time: "07:30 PM",
    guests: "2 Guests",
    specialRequest: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string>("");

  const updateField = (field: keyof ReservationFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Real-time error clearing
    if (errors[field as keyof FormErrors]) {
      setErrors((prevErrors) => {
        const next = { ...prevErrors };
        if (field === "name" && value.trim()) {
          delete next.name;
        } else if (field === "phone" && isValidIndianPhone(value)) {
          delete next.phone;
        } else if (field === "date" && value.trim()) {
          delete next.date;
        } else if (field === "time" && value.trim()) {
          delete next.time;
        } else if (field === "guests" && value.trim()) {
          delete next.guests;
        }
        return next;
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateReservationForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const url = buildWhatsAppReservationUrl(formData);
    setGeneratedUrl(url);
    setSubmitted(true);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="relative bg-black py-20 sm:py-28 md:py-40 px-5 sm:px-8 md:px-14 overflow-hidden border-t border-white/[0.08]"
    >
      {/* Background watermark */}
      <span
        className="absolute right-0 bottom-0 font-serif text-white select-none pointer-events-none leading-none"
        style={{
          fontSize: "clamp(6rem, 16vw, 20rem)",
          opacity: 0.03,
          lineHeight: 1,
          letterSpacing: "0.1em",
        }}
        aria-hidden
      >
        SKYBLISS
      </span>

      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24">
        {/* ── Left Column: Contact & Location Details ───────────────────────── */}
        <div>
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="w-6 h-px bg-gold" />
            <p
              className="font-sans text-gold text-[10px] uppercase tracking-[0.28em] font-medium"
            >
              At Hotel Aishwarya Grand
            </p>
          </motion.div>

          <motion.h2
            className="font-serif text-white font-normal"
            style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.8rem)", lineHeight: 1.1 }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1 }}
          >
            Your Rooftop Destination
            <br />
            <em style={{ color: "#c9a96e" }}>in Puducherry.</em>
          </motion.h2>

          <motion.div
            className="mt-8 h-px w-16 bg-gold"
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.28 }}
          />

          {/* Details list */}
          <motion.div
            className="mt-10 flex flex-col gap-0"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.38 }}
          >
            {/* Address */}
            <div className="border-t border-white/[0.14] py-5">
              <p
                className="font-sans text-gold text-[9px] mb-2 uppercase tracking-[0.22em] font-medium"
              >
                Address
              </p>
              <p className="font-sans text-white/90 text-[14px] md:text-[15px] leading-relaxed">
                {SITE.address}
              </p>
            </div>

            {/* Contact numbers & Email */}
            <div className="border-t border-white/[0.14] py-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p
                    className="font-sans text-gold text-[9px] mb-2 uppercase tracking-[0.22em] font-medium"
                  >
                    Direct Contact Desk
                  </p>
                  <a
                    href={`tel:${SITE.phoneRaw}`}
                    className="font-sans text-white/90 text-[15px] hover:text-gold transition-colors inline-flex items-center gap-2"
                  >
                    <span>{SITE.phone}</span>
                    <span className="text-[10px] text-gold/80 font-sans uppercase font-medium bg-gold/10 px-2 py-0.5 rounded border border-gold/30">
                      Call
                    </span>
                  </a>
                </div>

                <div>
                  <p
                    className="font-sans text-gold text-[9px] mb-2 uppercase tracking-[0.22em] font-medium"
                  >
                    Email Desk
                  </p>
                  <a
                    href={SITE.emailUrl}
                    className="font-sans text-white/90 text-[14px] hover:text-gold transition-colors inline-flex items-center gap-2 break-all"
                  >
                    <span>{SITE.email}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Opening Hours & WhatsApp */}
            <div className="border-t border-white/[0.14] py-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p
                    className="font-sans text-gold text-[9px] mb-2 uppercase tracking-[0.22em] font-medium"
                  >
                    Opening Hours
                  </p>
                  <p className="font-sans text-white/90 text-[15px]">
                    {SITE.hours}
                  </p>
                </div>
                <div>
                  <p
                    className="font-sans text-gold text-[9px] mb-2 uppercase tracking-[0.22em] font-medium"
                  >
                    WhatsApp Reservation Desk
                  </p>
                  <a
                    href={buildWhatsAppEnquiryUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[#25D366] text-[15px] hover:brightness-110 transition-colors inline-flex items-center gap-2 font-medium"
                  >
                    <span>{SITE.whatsappDisplay}</span>
                    <span className="text-xs">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Premium Hospitality Contact & Location Action Suite ── */}
          <motion.div
            className="mt-8 flex flex-col gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.45 }}
          >
            {/* 1. Featured Location & Night Map Visual Card */}
            <a
              href={SITE.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get Directions to Skybliss Rooftop Resto Lounge on Google Maps"
              className="group relative block overflow-hidden rounded-2xl border border-gold/30 bg-[#0d0e11] p-4 sm:p-5 transition-all duration-500 hover:border-gold hover:shadow-[0_12px_35px_rgba(201,169,110,0.18)] hover:-translate-y-0.5 active:scale-[0.99]"
            >
              {/* Ambient night glow gradient behind map */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.07] via-transparent to-black pointer-events-none" />

              {/* Stylized Dark Luxury Restaurant Map Canvas */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden rounded-xl bg-[#090a0d] border border-white/[0.08]">
                {/* SVG Night Grid & Road Map Visual */}
                <svg
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  viewBox="0 0 400 200"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <radialGradient id="skybliss-beacon-glow" cx="62%" cy="46%" r="50%">
                      <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.45" />
                      <stop offset="40%" stopColor="#c9a96e" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#c9a96e" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="road-gold-glow" x1="0%" y1="100%" x2="62%" y2="46%">
                      <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.2" />
                      <stop offset="70%" stopColor="#c9a96e" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#f5e6c8" stopOpacity="1" />
                    </linearGradient>
                    <pattern id="night-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.5" />
                    </pattern>
                  </defs>

                  {/* Night Grid pattern */}
                  <rect width="100%" height="100%" fill="#0a0b0e" />
                  <rect width="100%" height="100%" fill="url(#night-grid)" />

                  {/* Ambient glow centered on Skybliss */}
                  <circle cx="248" cy="92" r="90" fill="url(#skybliss-beacon-glow)" />

                  {/* Muted Secondary City Roads */}
                  <path d="M-20 40 Q 120 70, 200 45 T 420 30" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="4" />
                  <path d="M-20 160 Q 150 140, 280 170 T 420 150" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="3" />
                  <path d="M 120 -20 Q 135 90, 110 220" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="3.5" />
                  <path d="M 340 -20 Q 325 110, 350 220" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="3.5" />
                  <path d="M 60 120 L 248 92 L 380 110" fill="none" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="2.5" />

                  {/* Primary Arterial: Villianur Main Road */}
                  <path
                    d="M -20 115 C 80 110, 160 102, 248 92 C 310 85, 370 75, 420 68"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.18)"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  {/* Glowing Route to Skybliss */}
                  <path
                    d="M 15 113 C 90 108, 170 101, 248 92"
                    fill="none"
                    stroke="url(#road-gold-glow)"
                    strokeWidth="3.5"
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                  />

                  {/* Road Label: Villianur Main Road */}
                  <text x="58" y="98" fill="rgba(201, 169, 110, 0.65)" fontSize="7" fontFamily="sans-serif" letterSpacing="0.18em" fontWeight="600" transform="rotate(-3 58 98)">
                    VILLIANUR MAIN ROAD
                  </text>
                  <text x="290" y="74" fill="rgba(255, 255, 255, 0.35)" fontSize="6.5" fontFamily="sans-serif" letterSpacing="0.14em">
                    REDDIARPALAYAM
                  </text>

                  {/* Start Point / "You are here" indicator */}
                  <g transform="translate(25, 113)">
                    <circle r="4" fill="#c9a96e" opacity="0.4" />
                    <circle r="2" fill="#fff" />
                    <text x="8" y="3" fill="rgba(255,255,255,0.7)" fontSize="6" fontFamily="sans-serif" letterSpacing="0.1em">
                      YOU ARE HERE
                    </text>
                  </g>

                  {/* Animated radar rings at Skybliss Pin */}
                  <circle cx="248" cy="92" r="18" fill="none" stroke="#c9a96e" strokeWidth="1" opacity="0.35" className="animate-ping" style={{ transformOrigin: "248px 92px", animationDuration: "3s" }} />
                  <circle cx="248" cy="92" r="8" fill="none" stroke="#c9a96e" strokeWidth="1.5" opacity="0.7" />

                  {/* Premium Location Pin at Skybliss */}
                  <g transform="translate(248, 92)">
                    <path
                      d="M 0 0 C -4 -4, -7 -9, -7 -13 A 7 7 0 1 1 7 -13 C 7 -9, 4 -4, 0 0 Z"
                      fill="#c9a96e"
                      filter="drop-shadow(0 2px 6px rgba(201,169,110,0.6))"
                    />
                    <circle cx="0" cy="-13" r="2.8" fill="#000" />
                    <circle cx="0" cy="-13" r="1.4" fill="#c9a96e" />
                  </g>
                </svg>

                {/* Floating Skybliss Rooftop Badge over Map */}
                <div className="absolute top-2.5 right-2.5 bg-black/85 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-gold/40 shadow-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  <span className="font-sans text-[10px] text-white font-medium tracking-wide">
                    4th Floor · Skybliss
                  </span>
                </div>

                {/* Live Route Callout Pill */}
                <div className="absolute bottom-2.5 left-2.5 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5">
                  <span className="font-sans text-[9px] text-white/60 tracking-wider uppercase">Destination</span>
                  <span className="font-sans text-[9px] text-gold font-medium">Hotel Aishwarya Grand</span>
                </div>
              </div>

              {/* Card Footer Bar / Direct CTA */}
              <div className="mt-3.5 flex items-center justify-between gap-3 px-1">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-colors duration-300 shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-sm font-semibold text-white group-hover:text-gold transition-colors">
                        Get Directions
                      </span>
                      <span className="text-[10px] font-sans px-1.5 py-0.5 rounded bg-gold/20 text-gold uppercase tracking-wider font-semibold">
                        Google Maps
                      </span>
                    </div>
                    <p className="font-sans text-xs text-white/60 line-clamp-1">
                      {SITE.address}
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/70 group-hover:text-gold group-hover:border-gold/40 group-hover:translate-x-0.5 transition-all shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </div>
            </a>

            {/* 2. Grid of Quick Hospitality Actions (Call Desk, WhatsApp Us, Email Us, Instagram) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {/* Call Now */}
              <a
                href={`tel:${SITE.phoneRaw}`}
                aria-label="Call Skybliss Direct Phone"
                className="group relative flex flex-col items-start justify-center p-3.5 sm:p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-gold/40 transition-all duration-300 active:scale-[0.98]"
              >
                <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-colors duration-300 shrink-0 mb-2">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <span className="font-sans text-xs font-semibold text-white group-hover:text-gold transition-colors block">
                  Call Desk
                </span>
                <span className="font-sans text-[10px] text-white/50 block tracking-tight truncate w-full">
                  {SITE.phone}
                </span>
              </a>

              {/* WhatsApp Us */}
              <a
                href={buildWhatsAppEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Skybliss on WhatsApp"
                className="group relative flex flex-col items-start justify-center p-3.5 sm:p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-[#25D366]/50 transition-all duration-300 active:scale-[0.98]"
              >
                <div className="w-8 h-8 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-black transition-colors duration-300 shrink-0 mb-2">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.05-1.08l-.29-.17-3.01.79.8-2.93-.19-.3a8.216 8.216 0 01-1.26-4.37c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29z" />
                  </svg>
                </div>
                <span className="font-sans text-xs font-semibold text-white group-hover:text-[#25D366] transition-colors block">
                  WhatsApp
                </span>
                <span className="font-sans text-[10px] text-white/50 block tracking-tight truncate w-full">
                  {SITE.whatsappDisplay}
                </span>
              </a>

              {/* Email Us */}
              <a
                href={SITE.emailUrl}
                aria-label="Email Skybliss"
                className="group relative flex flex-col items-start justify-center p-3.5 sm:p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-gold/40 transition-all duration-300 active:scale-[0.98]"
              >
                <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-colors duration-300 shrink-0 mb-2">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <span className="font-sans text-xs font-semibold text-white group-hover:text-gold transition-colors block">
                  Email
                </span>
                <span className="font-sans text-[10px] text-white/50 block tracking-tight truncate w-full">
                  {SITE.email}
                </span>
              </a>

              {/* Instagram */}
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Skybliss on Instagram"
                className="group relative flex flex-col items-start justify-center p-3.5 sm:p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-[#E1306C]/50 transition-all duration-300 active:scale-[0.98]"
              >
                <div className="w-8 h-8 rounded-full bg-[#E1306C]/10 border border-[#E1306C]/30 flex items-center justify-center text-[#E1306C] group-hover:bg-[#E1306C] group-hover:text-white transition-colors duration-300 shrink-0 mb-2">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
                  </svg>
                </div>
                <span className="font-sans text-xs font-semibold text-white group-hover:text-[#E1306C] transition-colors block">
                  Instagram
                </span>
                <span className="font-sans text-[10px] text-white/50 block tracking-tight truncate w-full">
                  {SITE.instagramHandle}
                </span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── Right Column: Pre-Book / Reservation Form ───────────────────── */}
        <motion.div
          id="reservation"
          initial={{ opacity: 0, x: 28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.22 }}
          className="glass-dark p-6 sm:p-8 md:p-10 rounded-3xl border border-white/15 shadow-2xl relative"
        >
          <div className="mb-6 sm:mb-8">
            <span className="font-sans text-gold text-[10px] uppercase tracking-[0.24em] font-medium">
              Direct WhatsApp Reservation
            </span>
            <h3 className="font-serif text-white text-2xl md:text-3xl mt-1">
              Pre-Book a Table
            </h3>
            <p className="font-sans text-white/60 text-xs mt-1.5 leading-relaxed">
              Fill in your reservation preferences. Your details will be formatted into an
              official booking request sent directly to the Skybliss WhatsApp desk for swift confirmation.
            </p>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-8 sm:py-10">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold text-2xl mb-4">
                ✓
              </div>
              <h4 className="font-serif text-white text-xl sm:text-2xl mb-2">Request Ready</h4>
              <p className="font-sans text-white/70 text-xs sm:text-sm max-w-sm leading-relaxed mb-6">
                Your pre-booking summary has been generated for WhatsApp. If the chat window did
                not open automatically, click the button below to send your request to Skybliss.
              </p>

              <a
                href={generatedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 sm:px-8 rounded-full bg-[#25D366] text-black font-sans font-semibold text-xs sm:text-sm shadow-xl flex items-center gap-2 hover:brightness-105 transition-all cursor-pointer"
              >
                <span>Send via WhatsApp ({SITE.whatsappDisplay})</span>
                ↗
              </a>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 text-xs text-white/50 hover:text-white underline underline-offset-4 cursor-pointer"
              >
                Modify Reservation Details
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 sm:gap-6" suppressHydrationWarning>
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="res-name"
                    className="font-sans text-white/60 text-[10px] uppercase tracking-[0.16em]"
                  >
                    Your Name *
                  </label>
                  <input
                    id="res-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className={`bg-transparent border-b py-2 sm:py-2.5 text-white font-sans text-[14px] outline-none transition-colors placeholder-white/25 ${
                      errors.name
                        ? "border-red-500 focus:border-red-400"
                        : "border-white/20 focus:border-gold"
                    }`}
                    placeholder="Enter full name"
                  />
                  {errors.name && (
                    <p className="font-sans text-red-400 text-[11px] mt-0.5">{errors.name}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="res-phone"
                    className="font-sans text-white/60 text-[10px] uppercase tracking-[0.16em]"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="res-phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    pattern="[0-9]*"
                    value={formData.phone}
                    onChange={(e) => {
                      updateField("phone", cleanPhoneNumber(e.target.value));
                    }}
                    className={`bg-transparent border-b py-2 sm:py-2.5 text-white font-sans text-[14px] outline-none transition-colors placeholder-white/25 ${
                      errors.phone
                        ? "border-red-500 focus:border-red-400"
                        : "border-white/20 focus:border-gold"
                    }`}
                    placeholder="Enter 10-digit mobile number"
                  />
                  {errors.phone && (
                    <p className="font-sans text-red-400 text-[11px] mt-0.5">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="res-date"
                    className="font-sans text-white/60 text-[10px] uppercase tracking-[0.16em]"
                  >
                    Date *
                  </label>
                  <input
                    id="res-date"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.date}
                    onChange={(e) => updateField("date", e.target.value)}
                    className={`bg-transparent border-b py-2 text-white font-sans text-[13px] outline-none transition-colors [color-scheme:dark] ${
                      errors.date
                        ? "border-red-500 focus:border-red-400"
                        : "border-white/20 focus:border-gold"
                    }`}
                  />
                  {errors.date && (
                    <p className="font-sans text-red-400 text-[11px] mt-0.5">{errors.date}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="res-time"
                    className="font-sans text-white/60 text-[10px] uppercase tracking-[0.16em]"
                  >
                    Preferred Time *
                  </label>
                  <select
                    id="res-time"
                    value={formData.time}
                    onChange={(e) => updateField("time", e.target.value)}
                    className={`bg-[#121210] border-b py-2.5 text-white font-sans text-[13px] outline-none transition-colors cursor-pointer ${
                      errors.time
                        ? "border-red-500 focus:border-red-400"
                        : "border-white/20 focus:border-gold"
                    }`}
                  >
                    <option value="">Select a time</option>
                    <option value="12:00 PM">12:00 PM (Lunch)</option>
                    <option value="01:30 PM">01:30 PM (Lunch)</option>
                    <option value="06:00 PM">06:00 PM (Sunset Hour)</option>
                    <option value="07:30 PM">07:30 PM (Dinner & Skyline)</option>
                    <option value="08:30 PM">08:30 PM (Nightlife & Music)</option>
                    <option value="09:30 PM">09:30 PM (Late Night Lounging)</option>
                  </select>
                  {errors.time && (
                    <p className="font-sans text-red-400 text-[11px] mt-0.5">{errors.time}</p>
                  )}
                </div>
              </div>

              {/* Guests Count */}
              <div className="flex flex-col gap-2">
                <label className="font-sans text-white/60 text-[10px] uppercase tracking-[0.16em]">
                  Number of Guests *
                </label>
                <div className="flex flex-wrap gap-2">
                  {["2 Guests", "3-4 Guests", "5-8 Guests", "9+ Large Group"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => updateField("guests", g)}
                      className={`px-3.5 py-1.5 rounded-full font-sans text-xs transition-all cursor-pointer ${
                        formData.guests === g
                          ? "bg-gold text-charcoal font-semibold shadow-md"
                          : errors.guests
                          ? "glass-dark text-white/70 border border-red-500 hover:text-white"
                          : "glass-dark text-white/70 hover:text-white"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                {errors.guests && (
                  <p className="font-sans text-red-400 text-[11px] mt-0.5">{errors.guests}</p>
                )}
              </div>

              {/* Special Request */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="res-request"
                  className="font-sans text-white/60 text-[10px] uppercase tracking-[0.16em]"
                >
                  Special Requests / Occasion
                </label>
                <textarea
                  id="res-request"
                  rows={3}
                  value={formData.specialRequest}
                  onChange={(e) => updateField("specialRequest", e.target.value)}
                  placeholder="e.g. Birthday celebration, candlelit rooftop corner table, match screening..."
                  className="bg-transparent border-b border-white/20 py-2 text-white font-sans text-[13px] outline-none focus:border-gold transition-colors placeholder-white/25 resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 py-3.5 rounded-full font-sans font-semibold text-charcoal text-sm shadow-xl cursor-pointer"
                  style={{ background: "#c9a96e" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                >
                  <span>Pre-Book Now via WhatsApp</span>
                  <span className="w-6 h-6 rounded-full bg-charcoal text-white flex items-center justify-center text-xs">
                    ↗
                  </span>
                </motion.button>
                <p className="font-sans text-white/40 text-[10px] text-center mt-3">
                  Direct connection with Skybliss desk at {SITE.whatsappDisplay} for instant confirmation.
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
