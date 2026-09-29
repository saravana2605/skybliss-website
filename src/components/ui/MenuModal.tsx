import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { buildWhatsAppEnquiryUrl } from "@/lib/constants";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenReservation?: () => void;
}

const MENU_DATA = [
  {
    category: "North Indian & Tandoori",
    description: "Rich gravies, slow-cooked dal, aromatic biryanis, and flame-kissed tandoor delicacies.",
    items: [
      { name: "Tandoori Starters & Kebabs", note: "Succulent clay oven preparations with mint chutney" },
      { name: "Signature North Indian Curries", note: "Simmered gravies infused with aromatic spices" },
      { name: "Clay Oven Breads", note: "Butter Naan, Garlic Naan, Roti & Kulcha selections" },
      { name: "Fragrant Biryani Specialties", note: "Slow-dum prepared rice with roasted spices" },
    ],
  },
  {
    category: "South Indian Fusion",
    description: "Coastal spice mastery paired with contemporary culinary artistry.",
    items: [
      { name: "Coastal Seafood Delights", note: "Fresh coastal fish & prawns roasted in local spices" },
      { name: "Curry Leaf & Pepper Roasts", note: "Piquant dry roasts celebrating regional flavours" },
      { name: "Contemporary South Fusion Platters", note: "Classic regional bites with a modern rooftop twist" },
    ],
  },
  {
    category: "Chinese & Asian Wok",
    description: "High-heat wok magic with crisp vegetables, rich sauces, and savory noodles.",
    items: [
      { name: "Crispy Asian Starters", note: "Golden wontons, spring rolls & spiced tossed nibbles" },
      { name: "Chili & Garlic Glazed Specialties", note: "Sizzling woks tossed with fiery chilies & aromatics" },
      { name: "Wok Tossed Noodles & Fried Rice", note: "Hakka style, Schezwan, and chef's wok creations" },
    ],
  },
  {
    category: "Italian & Continental",
    description: "Handcrafted pasta recipes, golden crusts, and European bistro favorites.",
    items: [
      { name: "Artisanal Pasta Selections", note: "Arrabbiata, Alfredo, Creamy Pesto & Aglio e Olio" },
      { name: "Continental Starters & Fries", note: "Cheesy loaded platters, potato wedges & dips" },
      { name: "Gourmet Savory Bites", note: "Herb-crusted finger foods perfect for pairing with drinks" },
    ],
  },
  {
    category: "Small Plates & Bar Bites",
    description: "Shareable plates crafted to accompany lively drinks and conversation.",
    items: [
      { name: "Crunchy Lounge Bites", note: "Crispy salted and spiced shareables for groups" },
      { name: "Skewered Starters", note: "Tender grilled skewers with tangy house marinades" },
      { name: "Rooftop Party Platters", note: "Generous assortments for celebratory table dining" },
    ],
  },
  {
    category: "Cocktails, Spirits & Brews",
    description: "Master mixology, international spirits, cold beers, and fine wines.",
    items: [
      { name: "Signature Skybliss Cocktails", note: "House-crafted tropical & classic infusions under the stars" },
      { name: "Premium & Domestic Spirits", note: "Curated collection of whiskeys, vodkas, rums & gins" },
      { name: "Chilled Beer Selection", note: "Ice-cold lagers, draughts & craft brews" },
      { name: "Selected Wines", note: "Red, white & sparkling selections for rooftop toasts" },
    ],
  },
  {
    category: "Desserts & Sweet Endings",
    description: "The sweet finale to rooftop dining.",
    items: [
      { name: "Warm Brownies & Ice Creams", note: "Decadent chocolate served with vanilla bean scoop" },
      { name: "Fusion Dessert Delights", note: "Rich traditional textures met with contemporary flair" },
    ],
  },
];

export function MenuModal({ isOpen, onClose, onOpenReservation }: Props) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-[#141412] border border-white/20 rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl overflow-hidden max-h-[90vh] max-h-[90dvh] flex flex-col"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Menu Modal"
              className="absolute top-5 sm:top-6 right-5 sm:right-6 w-9 h-9 rounded-full glass-dark flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer z-10"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="mb-5 sm:mb-6 pr-8 flex-shrink-0">
              <span className="font-sans text-gold text-[10px] uppercase tracking-[0.24em] font-medium">
                Skybliss Rooftop Resto Lounge · 4th Floor
              </span>
              <h3 className="font-serif text-white text-2xl sm:text-3xl md:text-4xl mt-1">
                Digital Culinary Collection
              </h3>
              <p className="font-sans text-white/60 text-xs mt-1 leading-relaxed">
                Global multi-cuisine selections &amp; handcrafted spirits served daily 11:00 AM – 11:00 PM.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-white/10 flex-shrink-0 scrollbar-none">
              {MENU_DATA.map((cat, idx) => (
                <button
                  key={cat.category}
                  onClick={() => setActiveTab(idx)}
                  className={`px-4 py-1.5 rounded-full text-xs font-sans whitespace-nowrap transition-all ${
                    activeTab === idx
                      ? "bg-gold text-charcoal font-semibold shadow-md"
                      : "glass-dark text-white/70 hover:text-white"
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>

            {/* Tab Content Body */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-6">
              <div>
                <h4 className="font-serif text-white text-2xl text-gold mb-1">
                  {MENU_DATA[activeTab].category}
                </h4>
                <p className="font-sans text-white/60 text-xs leading-relaxed mb-6">
                  {MENU_DATA[activeTab].description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MENU_DATA[activeTab].items.map((item) => (
                    <div
                      key={item.name}
                      className="p-5 rounded-2xl glass-dark border border-white/10 hover:border-gold/40 transition-colors"
                    >
                      <h5 className="font-serif text-white text-lg">{item.name}</h5>
                      <p className="font-sans text-white/55 text-xs mt-1.5 leading-relaxed">
                        {item.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-center mt-6">
                <p className="font-sans text-white/60 text-xs leading-relaxed">
                  Looking for the day's special preparations, seasonal catch, or custom group platters?
                  <br />
                  Connect directly with our hospitality team for today's menu card.
                </p>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <a
                    href={buildWhatsAppEnquiryUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#25D366] text-black font-sans text-xs font-semibold hover:brightness-105"
                  >
                    <span>Request Today's Menu on WhatsApp</span>
                    ↗
                  </a>
                  {onOpenReservation && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenReservation();
                      }}
                      className="px-5 py-2 rounded-full glass-light text-white font-sans text-xs font-medium hover:border-gold"
                    >
                      Pre-Book a Table
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
