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

    // Real-time error clearing: remove error state once the field becomes valid
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
    // Open WhatsApp only after successful validation
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="relative bg-black py-28 md:py-40 px-8 md:px-14 overflow-hidden border-t border-white/[0.08]"
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
              Location &amp; Inquiries
            </p>
          </motion.div>

          <motion.h2
            className="font-serif text-white font-normal"
            style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.8rem)", lineHeight: 1.1 }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1 }}
          >
            Find Your Way to
            <br />
            <em style={{ color: "#c9a96e" }}>Skybliss.</em>
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
                4th Floor, Hotel Aishwarya Grand,
                <br />
                No.147, Villianur Main Road, Kamban Nagar,
                <br />
                Reddiarpalayam, Puducherry - 605010
              </p>
            </div>

            {/* Phone numbers */}
            <div className="border-t border-white/[0.14] py-5">
              <p
                className="font-sans text-gold text-[9px] mb-2 uppercase tracking-[0.22em] font-medium"
              >
                Direct Phone Lines
              </p>
              <div className="flex flex-col gap-1.5 font-sans text-white/90 text-[15px]">
                <a
                  href={`tel:${SITE.phones[0].raw}`}
                  className="hover:text-gold transition-colors inline-flex items-center gap-2"
                >
                  <span>{SITE.phones[0].display}</span>
                  <span className="text-[11px] text-gold/70 font-sans uppercase">Primary</span>
                </a>
                <a
                  href={`tel:${SITE.phones[1].raw}`}
                  className="hover:text-gold transition-colors inline-flex items-center gap-2"
                >
                  <span>{SITE.phones[1].display}</span>
                  <span className="text-[11px] text-white/40 font-sans uppercase">Secondary</span>
                </a>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="border-t border-white/[0.14] py-5">
              <p
                className="font-sans text-gold text-[9px] mb-2 uppercase tracking-[0.22em] font-medium"
              >
                Opening Hours
              </p>
              <p className="font-sans text-white/90 text-[15px]">
                11:00 AM – 11:00 PM
                <span className="text-white/50 text-xs ml-2">Daily</span>
              </p>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-3 mt-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <a
              href={`tel:${SITE.phones[0].raw}`}
              className="glass-dark px-5 py-2.5 rounded-full text-xs font-sans font-medium text-white hover:border-gold transition-all"
            >
              📞 Call Now
            </a>
            <a
              href={buildWhatsAppEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-dark px-5 py-2.5 rounded-full text-xs font-sans font-medium text-[#25D366] hover:border-[#25D366] transition-all flex items-center gap-1.5"
            >
              <span>💬 WhatsApp Us</span>
              ↗
            </a>
            <a
              href={SITE.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-dark px-5 py-2.5 rounded-full text-xs font-sans font-medium text-white/90 hover:border-gold transition-all flex items-center gap-1.5"
            >
              <span>📍 Get Directions</span>
              ↗
            </a>
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-dark px-5 py-2.5 rounded-full text-xs font-sans font-medium text-white/90 hover:border-gold transition-all flex items-center gap-1.5"
            >
              <span>📷 @skybliss2024</span>
              ↗
            </a>
          </motion.div>
        </div>

        {/* ── Right Column: Pre-Book / Reservation Form ───────────────────── */}
        <motion.div
          id="reservation"
          initial={{ opacity: 0, x: 28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.22 }}
          className="glass-dark p-8 md:p-10 rounded-3xl border border-white/15 shadow-2xl relative"
        >
          <div className="mb-8">
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
            <div className="flex flex-col items-center justify-center text-center py-10">
              <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold text-2xl mb-4">
                ✓
              </div>
              <h4 className="font-serif text-white text-2xl mb-2">Request Ready</h4>
              <p className="font-sans text-white/70 text-sm max-w-sm leading-relaxed mb-6">
                Your pre-booking summary has been generated for WhatsApp. If the chat window did
                not open automatically, click the button below to send your request to Skybliss.
              </p>

              <a
                href={generatedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-8 rounded-full bg-[#25D366] text-black font-sans font-semibold text-sm shadow-xl flex items-center gap-2 hover:brightness-105 transition-all"
              >
                <span>Send via WhatsApp (+91 82200 58152)</span>
                ↗
              </a>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 text-xs text-white/50 hover:text-white underline underline-offset-4"
              >
                Modify Reservation Details
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6" suppressHydrationWarning>
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                    className={`bg-transparent border-b py-2.5 text-white font-sans text-[14px] outline-none transition-colors placeholder-white/25 ${
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
                    className={`bg-transparent border-b py-2.5 text-white font-sans text-[14px] outline-none transition-colors placeholder-white/25 ${
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                      className={`px-3.5 py-1.5 rounded-full font-sans text-xs transition-all ${
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
                  Direct connection with Skybliss desk at +91 82200 58152 for instant confirmation.
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
