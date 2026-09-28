// ─── Skybliss Brand Constants ───────────────────────────────────────────────

export const SITE = {
  name: "Skybliss Rooftop Resto Lounge",
  shortName: "Skybliss",
  tagline: "Where exceptional dining meets breathtaking views.",
  headline: "Experience Pondicherry From Above.",
  location: "4th Floor, Hotel Aishwarya Grand",
  address: "4th Floor, Hotel Aishwarya Grand, No.147, Villianur Main Road, Kamban Nagar, Reddiarpalayam, Puducherry - 605010",
  landmark: "Hotel Aishwarya Grand, Villianur Main Road, Reddiarpalayam",
  city: "Puducherry",
  pincode: "605010",
  phones: [
    { display: "+91 82200 58152", raw: "+918220058152" },
    { display: "+91 90435 55561", raw: "+919043555561" },
  ],
  primaryPhone: "+91 82200 58152",
  whatsappNumber: "918220058152",
  hours: "11:00 AM – 11:00 PM Daily",
  instagramHandle: "@skybliss2024",
  instagramUrl: "https://www.instagram.com/skybliss2024/",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Aishwarya+Grand+Villianur+Main+Road+Reddiarpalayam+Puducherry+605010",
};

// ─── Hero Scroll Phrases ───────────────────────────────────────────────────
export const HERO_PHRASES = [
  { text: "Experience\nPondicherry\nFrom Above.", start: 0, end: 0.24 },
  { text: "Where exceptional dining\nmeets breathtaking views.", start: 0.27, end: 0.50 },
  { text: "Global flavours.\nCrafted cocktails.\nElectric nights.", start: 0.53, end: 0.76 },
  { text: "Skybliss.\nRooftop Resto Lounge.", start: 0.79, end: 1 },
];

// ─── Hero Quick Stat Badges ────────────────────────────────────────────────
export const HERO_STATS = [
  { value: "4th Fl.", label: "Hotel Aishwarya\nGrand" },
  { value: "Open-Air", label: "Panoramic\nRooftop" },
  { value: "11–11", label: "Daily Service\n11 AM – 11 PM" },
];

// ─── Skybliss Uploaded Images ──────────────────────────────────────────────
export const SKYBLISS_IMAGES = {
  logo: "/images/skybliss/logo.png",
  fullBuilding: "/images/skybliss/full-building.png",
  entrance: "/images/skybliss/entrance.png",
  rooftop: "/images/skybliss/rooftop.png",
  waitinghall: "/images/skybliss/waitinghall.png",
  room: "/images/skybliss/room.png",
  room1: "/images/skybliss/room1.png",
};

// ─── Navigation Links ──────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Experience", href: "#experience" },
  { label: "Menu", href: "#menu" },
  { label: "Events", href: "#events" },
  { label: "Ambiance", href: "#ambiance" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

// ─── Experience Chapters (Scroll Section) ──────────────────────────────────
export const EXPERIENCE_CHAPTERS = [
  {
    range: [0, 0.33] as [number, number],
    label: "01",
    title: "Twilight\nAscent",
    sub: "4th Floor, Hotel Aishwarya Grand",
    description:
      "Rise above the bustling streets of Pondicherry into an open-sky sanctuary where warm sea breezes and panoramic city lights greet your arrival.",
    image: SKYBLISS_IMAGES.fullBuilding,
  },
  {
    range: [0.34, 0.66] as [number, number],
    label: "02",
    title: "Global Flavours\n& Cocktails",
    sub: "Multi-Cuisine Excellence",
    description:
      "An inspired culinary journey blending North Indian delicacies, South Indian fusion, sizzling Asian woks, and handcrafted artisanal beverages.",
    image: SKYBLISS_IMAGES.rooftop,
  },
  {
    range: [0.67, 1] as [number, number],
    label: "03",
    title: "Nightlife &\nCelebrations",
    sub: "Music & Match Screenings",
    description:
      "From high-octane cricket and football match-day screenings on large screens to acoustic sessions and weekend DJ nights under the stars.",
    image: SKYBLISS_IMAGES.entrance,
  },
];

// ─── Culinary & Beverage Menu Categories ───────────────────────────────────
export interface MenuCategory {
  id: string;
  name: string;
  tagline: string;
  type: "food" | "beverage";
  description: string;
  highlights: string[];
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "north-indian",
    name: "North Indian & Tandoori",
    tagline: "Clay oven mastery & rich heritage gravies",
    type: "food",
    description:
      "Aromatic gravies, slow-simmered curries, and smokey tandoor delights crafted to perfection.",
    highlights: ["Tandoori Starters", "Signature Curries", "Artisan Naans & Rotis", "Slow-Cooked Biryanis"],
  },
  {
    id: "south-indian-fusion",
    name: "South Indian Fusion",
    tagline: "Coastal spice meets contemporary flair",
    type: "food",
    description:
      "Innovative regional twists celebrating local coastal spices, fresh coastal seafood, and modern culinary interpretations.",
    highlights: ["Coastal Seafood Bites", "Curry Leaf Infusions", "Pepper Roasts", "Fusion Platters"],
  },
  {
    id: "chinese-asian",
    name: "Chinese & Asian",
    tagline: "Wok-tossed perfection & vibrant balance",
    type: "food",
    description:
      "High-heat wok preparations bursting with bold garlic, chili, and sweet-savory glazes.",
    highlights: ["Crispy Appetizers", "Wok Tossed Noodles", "Fried Rice Specialties", "Chili Glazed Starters"],
  },
  {
    id: "italian",
    name: "Italian & Continental",
    tagline: "Handcrafted pastas & oven-baked classics",
    type: "food",
    description:
      "Silky pasta dishes, golden crusts, creamy risottos, and gourmet continental bar delicacies.",
    highlights: ["Artisanal Pastas", "Cheesy Starters", "Continental Bites", "Herb-Crusted Platters"],
  },
  {
    id: "starters-bites",
    name: "Small Plates & Bar Bites",
    tagline: "Perfect companions for rooftop drinks",
    type: "food",
    description:
      "Crisp, shareable savory plates designed for group grazing and casual evening conversations.",
    highlights: ["Crunchy Nibbles", "Gourmet Sliders & Fries", "Spicy Skewers", "Loaded Platters"],
  },
  {
    id: "cocktails-spirits",
    name: "Cocktails & Spirits",
    tagline: "Raise the night under the stars",
    type: "beverage",
    description:
      "Expertly mixed signature concoctions, top-shelf spirits, domestic choices, and chilled brews.",
    highlights: ["Signature Rooftop Cocktails", "Premium Spirits", "Domestic Spirits", "Chilled Beers & Wine"],
  },
  {
    id: "desserts",
    name: "Desserts & Delicacies",
    tagline: "The sweet finale to rooftop dining",
    type: "food",
    description:
      "Indulgent sweet treats, velvety mousses, and decadent endings to a memorable night.",
    highlights: ["Classic Delights", "Warm Brownies", "Fusion Sweets", "Ice Cream Specialties"],
  },
];

// ─── Events & Nightlife Offerings ──────────────────────────────────────────
export const EVENTS_HIGHLIGHTS = [
  {
    num: "01",
    title: "Live Music Sessions",
    sub: "Acoustic & Vocal Evenings",
    body: "Unwind under the open night sky with soulful melodies and soothing acoustic performances that set the ideal mood for conversation and dining.",
  },
  {
    num: "02",
    title: "DJ Nights & Beats",
    sub: "Weekend Nightlife Energy",
    body: "As the night matures, our rooftop transitions into Pondicherry's premier lounge vibe with high-tempo sets and vibrant rhythm.",
  },
  {
    num: "03",
    title: "Match-Day Screenings",
    sub: "Cricket & Football on Big Screens",
    body: "Cheer for your favourite teams during high-stakes cricket tournaments and international football clashes projected live on large screens.",
  },
  {
    num: "04",
    title: "Group Celebrations",
    sub: "Birthdays & Milestones",
    body: "Host birthdays, anniversaries, and reunions with customized group dining, personalized hospitality, and breathtaking rooftop backdrops.",
  },
  {
    num: "05",
    title: "Corporate Lounging",
    sub: "After-Hours & Team Mixers",
    body: "A polished open-air ambiance suitable for corporate mixers, client dinners, and team unwind sessions with curated multi-cuisine platters.",
  },
  {
    num: "06",
    title: "Open-Air Socials",
    sub: "City Skyline Conversations",
    body: "Generous seating arrangements, gentle night breezes, and warm glowing lighting that make every get-together naturally memorable.",
  },
];

// ─── Ambiance Highlights ───────────────────────────────────────────────────
export const AMBIANCE_PILLARS = [
  {
    num: "01",
    title: "Open-Air Rooftop Seating",
    body: "Dine directly beneath the Pondicherry sky. Feel the gentle coastal evening breeze while enjoying unhindered skyline views.",
  },
  {
    num: "02",
    title: "Panoramic City Views",
    body: "Positioned on the 4th floor of Hotel Aishwarya Grand, offering an elevated perspective of the vibrant city lights below.",
  },
  {
    num: "03",
    title: "Dedicated Bar & Lounge",
    body: "A stylish beverage counter serving signature cocktails, cold beers, and fine spirits crafted by passionate mixologists.",
  },
  {
    num: "04",
    title: "Casual & Trendy Atmosphere",
    body: "Designed with modern comfort in mind — plush seating, ambient mood lighting, and dedicated space for music and celebration.",
  },
];

// ─── Gallery Showcase Items (Using Only Uploaded Assets) ───────────────────
export const GALLERY_ITEMS = [
  {
    id: "rooftop-lounge",
    title: "Open-Air Rooftop Resto Lounge",
    category: "Rooftop Dining",
    src: SKYBLISS_IMAGES.rooftop,
    description: "The crown jewel of Skybliss — open-sky dining, ambient lights, and city panoramas.",
    aspect: "portrait",
    featured: true,
  },
  {
    id: "grand-entrance",
    title: "Grand Ground Arrival",
    category: "Arrival & Entrance",
    src: SKYBLISS_IMAGES.entrance,
    description: "Warm architectural lighting welcoming guests to Hotel Aishwarya Grand.",
    aspect: "landscape",
    featured: false,
  },
  {
    id: "exterior-facade",
    title: "Hotel Aishwarya Grand & Rooftop",
    category: "Architecture & Vantage",
    src: SKYBLISS_IMAGES.fullBuilding,
    description: "The 4th floor rooftop perch overlooking Villianur Main Road.",
    aspect: "landscape",
    featured: true,
  },
  {
    id: "waiting-hall",
    title: "Lobby & Reception Lounge",
    category: "Hospitality & Arrival",
    src: SKYBLISS_IMAGES.waitinghall,
    description: "Elegantly appointed reception and lounge space for seamless hospitality.",
    aspect: "landscape",
    featured: false,
  },
  {
    id: "luxury-room-1",
    title: "Executive Suite",
    category: "Hospitality",
    src: SKYBLISS_IMAGES.room1,
    description: "Premium accommodations at Hotel Aishwarya Grand for extended stays.",
    aspect: "landscape",
    featured: false,
  },
  {
    id: "luxury-room",
    title: "Deluxe Suite",
    category: "Hospitality",
    src: SKYBLISS_IMAGES.room,
    description: "Contemporary comfort and serene hospitality beneath the rooftop lounge.",
    aspect: "landscape",
    featured: false,
  },
];

// ─── Key Stats / Facts ─────────────────────────────────────────────────────
export const STATS = [
  { value: 4, suffix: "th", label: "Floor Rooftop Vantage", decimals: 0 },
  { value: 5, suffix: "+", label: "Global Cuisines", decimals: 0 },
  { value: 100, suffix: "%", label: "Open-Air Skyline", decimals: 0 },
  { value: 12, suffix: "h", label: "Daily Service 11am–11pm", decimals: 0 },
];

// ─── WhatsApp Helper Function ──────────────────────────────────────────────
export interface ReservationData {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  specialRequest?: string;
}

export function buildWhatsAppReservationUrl(data: ReservationData): string {
  const text =
`Skybliss Rooftop Resto Lounge - Pre-Booking Request

Name: ${data.name.trim()}
Phone: ${data.phone.trim()}
Date: ${data.date}
Preferred Time: ${data.time}
Guests: ${data.guests}
Special Request: ${data.specialRequest?.trim() || "None"}

Please confirm the table reservation.`;

  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function buildWhatsAppEnquiryUrl(): string {
  const text = "Hello Skybliss Rooftop Resto Lounge, I would like to enquire about a table reservation.";
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
