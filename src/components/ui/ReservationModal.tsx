import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE, buildWhatsAppReservationUrl } from "@/lib/constants";
import {
  cleanPhoneNumber,
  isValidIndianPhone,
  validateReservationForm,
  type FormErrors,
  type ReservationFormData,
} from "@/lib/validation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ReservationModal({ isOpen, onClose }: Props) {
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
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleClose = () => {
    setSubmitted(false);
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#141412] border border-white/20 rounded-3xl p-5 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] max-h-[90dvh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close Reservation Modal"
              className="absolute top-5 sm:top-6 right-5 sm:right-6 w-9 h-9 rounded-full glass-dark flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer z-20"
            >
              ✕
            </button>

            <div className="mb-5 sm:mb-6 pr-8">
              <span className="font-sans text-gold text-[10px] uppercase tracking-[0.24em] font-medium">
                Skybliss Rooftop Resto Lounge
              </span>
              <h3 className="font-serif text-white text-2xl sm:text-3xl mt-1">
                Book a Table
              </h3>
              <p className="font-sans text-white/60 text-xs mt-1 leading-relaxed">
                4th Floor, Hotel Aishwarya Grand · Daily 11:00 AM – 12:00 AM
              </p>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-6 sm:py-8">
                <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold text-2xl mb-4">
                  ✓
                </div>
                <h4 className="font-serif text-white text-xl sm:text-2xl mb-2">Request Ready</h4>
                <p className="font-sans text-white/70 text-xs max-w-sm leading-relaxed mb-6">
                  Your reservation request has been prepared for WhatsApp ({SITE.whatsappDisplay}).
                  Click below if the chat didn't open.
                </p>

                <a
                  href={generatedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-full bg-[#25D366] text-black font-sans font-semibold text-sm shadow-xl flex items-center justify-center gap-2 hover:brightness-105 transition-all cursor-pointer"
                >
                  <span>Open WhatsApp Booking</span>
                  ↗
                </a>

                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-5 text-xs text-white/50 hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  Close &amp; Return to Website
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="modal-name"
                    className="font-sans text-white/60 text-[10px] uppercase tracking-[0.16em]"
                  >
                    Your Name *
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className={`bg-transparent border-b py-2 text-white font-sans text-sm outline-none transition-colors placeholder-white/20 ${
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
                    htmlFor="modal-phone"
                    className="font-sans text-white/60 text-[10px] uppercase tracking-[0.16em]"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    pattern="[0-9]*"
                    value={formData.phone}
                    onChange={(e) => {
                      updateField("phone", cleanPhoneNumber(e.target.value));
                    }}
                    className={`bg-transparent border-b py-2 text-white font-sans text-sm outline-none transition-colors placeholder-white/20 ${
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="modal-date"
                      className="font-sans text-white/60 text-[10px] uppercase tracking-[0.16em]"
                    >
                      Date *
                    </label>
                    <input
                      id="modal-date"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.date}
                      onChange={(e) => updateField("date", e.target.value)}
                      className={`bg-transparent border-b py-2 text-white font-sans text-xs outline-none transition-colors [color-scheme:dark] ${
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
                      htmlFor="modal-time"
                      className="font-sans text-white/60 text-[10px] uppercase tracking-[0.16em]"
                    >
                      Time *
                    </label>
                    <select
                      id="modal-time"
                      value={formData.time}
                      onChange={(e) => updateField("time", e.target.value)}
                      className={`bg-[#121210] border-b py-2 text-white font-sans text-xs outline-none transition-colors ${
                        errors.time
                          ? "border-red-500 focus:border-red-400"
                          : "border-white/20 focus:border-gold"
                      }`}
                    >
                      <option value="">Select time</option>
                      <option value="12:00 PM">12:00 PM (Lunch)</option>
                      <option value="01:30 PM">01:30 PM (Lunch)</option>
                      <option value="06:00 PM">06:00 PM (Sunset)</option>
                      <option value="07:30 PM">07:30 PM (Dinner)</option>
                      <option value="08:30 PM">08:30 PM (Nightlife)</option>
                      <option value="09:30 PM">09:30 PM (Late Lounge)</option>
                    </select>
                    {errors.time && (
                      <p className="font-sans text-red-400 text-[11px] mt-0.5">{errors.time}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-sans text-white/60 text-[10px] uppercase tracking-[0.16em]">
                    Number of Guests *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["2 Guests", "3-4 Guests", "5-8 Guests", "9+ Group"].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => updateField("guests", g)}
                        className={`px-3 py-1 rounded-full text-xs font-sans transition-all ${
                          formData.guests === g
                            ? "bg-gold text-charcoal font-semibold"
                            : errors.guests
                            ? "glass-dark text-white/70 border border-red-500"
                            : "glass-dark text-white/70"
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

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="modal-request"
                    className="font-sans text-white/60 text-[10px] uppercase tracking-[0.16em]"
                  >
                    Special Request (Optional)
                  </label>
                  <input
                    id="modal-request"
                    type="text"
                    value={formData.specialRequest}
                    onChange={(e) => updateField("specialRequest", e.target.value)}
                    placeholder="e.g. Skyline view table, celebration..."
                    className="bg-transparent border-b border-white/20 py-2 text-white font-sans text-xs outline-none focus:border-gold transition-colors placeholder-white/20"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full py-3.5 rounded-full bg-gold text-charcoal font-sans font-semibold text-sm shadow-xl flex items-center justify-center gap-2 hover:brightness-105 transition-all"
                >
                  <span>Pre-Book via WhatsApp</span>
                  <span className="w-5 h-5 rounded-full bg-charcoal text-white flex items-center justify-center text-xs">
                    ↗
                  </span>
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
