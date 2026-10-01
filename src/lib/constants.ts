// ─── Skybliss Brand Constants ───────────────────────────────────────────────

export const SITE = {
  name: "Skybliss Rooftop Resto Lounge",
  shortName: "Skybliss",
  tagline: "Where exceptional dining meets breathtaking views.",
  headline: "Experience Pondicherry From Above.",
  location: "4th Floor, Hotel Aishwarya Grand",
  address: "4th Floor, Hotel Aishwarya Grand, No.147, Villianur Main Rd, Kamban Nagar, Reddiarpalayam, Puducherry, 605010",
  landmark: "Hotel Aishwarya Grand, Villianur Main Road, Reddiarpalayam",
  city: "Puducherry",
  pincode: "605010",
  phone: "+91 95852 25420",
  phoneRaw: "+919585225420",
  whatsappNumber: "919843614081",
  whatsappDisplay: "+91 98436 14081",
  email: "skyblissresto@gmail.com",
  emailUrl: "mailto:skyblissresto@gmail.com",
  hours: "11:00 AM – 12:00 AM Daily",
  instagramHandle: "@skybliss2024",
  instagramUrl: "https://www.instagram.com/skybliss2024/",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Aishwarya+Grand+Villianur+Main+Road+Reddiarpalayam+Puducherry+605010",
};

// ─── Hero Scroll Stages (3-Stage Cinematic Storytelling) ───────────────────
export interface HeroStage {
  step: string;
  progressText: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaText: string;
  ctaAction: "reservation" | "menu" | "directions";
  stats: Array<{
    value: string;
    label: string;
  }>;
}

export const HERO_STAGES: HeroStage[] = [
  {
    step: "01",
    progressText: "01 / 03",
    eyebrow: "04TH FLOOR, HOTEL AISHWARYA GRAND",
    title: "Twilight\nAscent",
    description:
      "Rise above the bustling streets of Pondicherry into an open-sky sanctuary where warm coastal breezes and panoramic city lights greet your arrival.",
    ctaText: "Book a Table",
    ctaAction: "reservation",
    stats: [
      { value: "4th Fl.", label: "Hotel Aishwarya\nGrand" },
      { value: "100%", label: "Open-Air\nSkyline" },
      { value: "11–12", label: "Daily Service\n11 AM – 12 AM" },
    ],
  },
  {
    step: "02",
    progressText: "02 / 03",
    eyebrow: "MULTI-CUISINE DINING & BAR",
    title: "Rooftop Dining\n& Cocktails",
    description:
      "An inspired culinary journey blending North Indian tandoori gravies, sizzling Asian woks, coastal fusion, and handcrafted signature cocktails under starlit skies.",
    ctaText: "Explore Menu",
    ctaAction: "menu",
    stats: [
      { value: "6+", label: "Global\nCuisines & Bar" },
      { value: "Craft", label: "Signature\nCocktails" },
      { value: "Live", label: "DJ & Music\nNights" },
    ],
  },
  {
    step: "03",
    progressText: "03 / 03",
    eyebrow: "PREMIER SKYLINE LOUNGE",
    title: "Panoramic Skyline\n& Electric Nights",
    description:
      "From golden sunset dining to late-night DJ beats and live match screenings, experience Pondicherry's premier open-roof resto lounge from above.",
    ctaText: "Reserve Your Table",
    ctaAction: "reservation",
    stats: [
      { value: "Top", label: "Pondicherry\nResto Lounge" },
      { value: "Big Screen", label: "Match-Day\nScreenings" },
      { value: "Valet", label: "Parking &\nEasy Arrival" },
    ],
  },
];

// ─── Hero Scroll Phrases (Legacy / Secondary Reference) ────────────────────
export const HERO_PHRASES = [
  { text: "Experience\nPondicherry\nFrom Above.", start: 0, end: 0.33 },
  { text: "Where exceptional dining\nmeets breathtaking views.", start: 0.34, end: 0.67 },
  { text: "Global flavours.\nCrafted cocktails.\nElectric nights.", start: 0.68, end: 1 },
];

// ─── Hero Quick Stat Badges ────────────────────────────────────────────────
export const HERO_STATS = HERO_STAGES[0].stats;


// ─── Skybliss Master Image Catalog ─────────────────────────────────────────
export const SKYBLISS_IMAGES = {
  logo: "/images/skybliss/logo.png",
  logoMark: "/images/skybliss/logo-mark.png",
  // Architecture & Vantage
  fullBuildingMain: "/images/skybliss/full buildingmain.png",
  fullBuilding: "/images/skybliss/full-building.png",
  skyblissTop: "/images/skybliss/skybliss.png",
  rooftop: "/images/skybliss/rooftop.png",
  // Dining & Ambiance
  dining: "/images/skybliss/dining.png",
  dining1: "/images/skybliss/dining1.png",
  diningView: "/images/skybliss/dining-view.jpeg",
  diningNight: "/images/skybliss/dining-night.jpeg",
  diningTables: "/images/skybliss/dining-tables.jpeg",
  // Hospitality & Arrival
  entrance: "/images/skybliss/entrance.png",
  reception: "/images/skybliss/reception.png",
  waitinghall: "/images/skybliss/waitinghall.png",
  // Suites & Accommodation
  room: "/images/skybliss/room.png",
  room1: "/images/skybliss/room1.png",
  room2: "/images/skybliss/room2.png",
  roomExecutive: "/images/skybliss/room-executive.jpeg",
  roomDeluxe: "/images/skybliss/room-deluxe.jpeg",
  roomSuite: "/images/skybliss/room-suite.jpeg",
  // Culinary Delights
  dish: "/images/skybliss/dish.png",
  eggrice: "/images/skybliss/eggrice.png",
  noodles: "/images/skybliss/noodles.png",
  salad: "/images/skybliss/salad.png",
  food: "/images/skybliss/food.png",
  food1: "/images/skybliss/food1.png",
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
export interface ExperienceChapter {
  range: [number, number];
  label: string;
  eyebrow: string;
  title: string;
  sub: string;
  description: string;
  ctaText: string;
  image: string;
  stats: Array<{ n: string; label: string }>;
}

export const EXPERIENCE_CHAPTERS: ExperienceChapter[] = [
  {
    range: [0, 0.28],
    label: "01",
    eyebrow: "THE ROOFTOP DESTINATION",
    title: "Twilight\nAscent",
    sub: "4th Floor, Hotel Aishwarya Grand",
    description:
      "Rise above the bustling streets of Pondicherry into an open-sky sanctuary where warm sea breezes and panoramic city lights greet your arrival.",
    ctaText: "Reserve For Twilight",
    image: SKYBLISS_IMAGES.fullBuildingMain,
    stats: [
      { n: "4th Fl.", label: "Hotel Aishwarya\nGrand" },
      { n: "100%", label: "Open-Air\nSkyline" },
      { n: "11–12", label: "Daily Service\n11 AM – 12 AM" },
    ],
  },
  {
    range: [0.28, 0.54],
    label: "02",
    eyebrow: "THE DINING EXPERIENCE",
    title: "Dine Above\nthe City",
    sub: "Multi-Cuisine Dining & Ambiance",
    description:
      "Settle into an elegant rooftop setting where beautifully presented food, warm hospitality and city views come together for long evenings.",
    ctaText: "Explore Dining",
    image: SKYBLISS_IMAGES.dining1,
    stats: [
      { n: "6+", label: "Global\nCuisines & Bar" },
      { n: "Craft", label: "Signature\nCocktails" },
      { n: "Ambient", label: "Evening\nMood Lighting" },
    ],
  },
  {
    range: [0.54, 0.78],
    label: "03",
    eyebrow: "THE ARRIVAL",
    title: "A Warm Welcome\nAwaits",
    sub: "Illuminated Reception & Hospitality",
    description:
      "Your Skybliss experience begins at Hotel Aishwarya Grand, where a warm arrival leads you toward an elevated rooftop dining experience.",
    ctaText: "Discover Skybliss",
    image: SKYBLISS_IMAGES.reception,
    stats: [
      { n: "Arrival", label: "Illuminated\nLobby Reception" },
      { n: "Valet", label: "Convenient\nParking Driveway" },
      { n: "Elevator", label: "Direct 4th Fl.\nRooftop Access" },
    ],
  },
  {
    range: [0.78, 1.0],
    label: "04",
    eyebrow: "HOTEL AISHWARYA GRAND",
    title: "Stay in\nComfort",
    sub: "Contemporary Suites & Living",
    description:
      "Comfortable spaces and thoughtful hospitality at Hotel Aishwarya Grand, perfectly complementing your Skybliss rooftop experience.",
    ctaText: "Explore the Stay",
    image: SKYBLISS_IMAGES.room2,
    stats: [
      { n: "Suites", label: "Contemporary\nLiving Comfort" },
      { n: "Quiet", label: "Tranquil\nGuest Haven" },
      { n: "Seamless", label: "Dine & Stay\nConvenience" },
    ],
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
  image: string;
  badge: string;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "north-indian",
    name: "North Indian & Tandoori",
    tagline: "Clay oven mastery & rich heritage gravies",
    type: "food",
    description:
      "Aromatic gravies, slow-simmered curries, and smokey tandoor delights crafted to perfection with roasted spices.",
    highlights: ["Tandoori Starters", "Signature Curries", "Artisan Naans & Rotis", "Slow-Cooked Biryanis"],
    image: SKYBLISS_IMAGES.dish,
    badge: "Chef's Signature",
  },
  {
    id: "chinese-asian",
    name: "Chinese & Asian Wok",
    tagline: "Wok-tossed perfection & vibrant balance",
    type: "food",
    description:
      "High-heat wok preparations bursting with bold garlic, fiery chili, crunchy garden vegetables, and sweet-savory glazes.",
    highlights: ["Wok Tossed Noodles", "Egg & Chicken Fried Rice", "Crispy Appetizers", "Chili Glazed Starters"],
    image: SKYBLISS_IMAGES.noodles,
    badge: "Lounge Favourite",
  },
  {
    id: "starters-bites",
    name: "Small Plates & Bar Bites",
    tagline: "Perfect companions for rooftop drinks",
    type: "food",
    description:
      "Crisp, shareable savory plates and sizzling platters designed for group grazing and casual evening conversations.",
    highlights: ["Sizzling Platters", "Gourmet Sliders & Fries", "Spicy Skewers", "Loaded Finger Food"],
    image: SKYBLISS_IMAGES.food,
    badge: "Popular Shareable",
  },
  {
    id: "south-indian-fusion",
    name: "Coastal & South Fusion",
    tagline: "Coastal spice meets contemporary flair",
    type: "food",
    description:
      "Innovative regional twists celebrating local coastal spices, fresh coastal seafood, and modern culinary interpretations.",
    highlights: ["Coastal Seafood Bites", "Curry Leaf Infusions", "Pepper Roasts", "Fusion Platters"],
    image: SKYBLISS_IMAGES.food1,
    badge: "Regional Fusion",
  },
  {
    id: "salads-continental",
    name: "Fresh Greens & Continental",
    tagline: "Gourmet salads & European bistro classics",
    type: "food",
    description:
      "Crisp garden-fresh salads, herb-crusted starters, artisanal pasta delicacies, and refreshing appetizers.",
    highlights: ["Artisanal Salads", "Silky Pastas", "Cheesy Starters", "Continental Platters"],
    image: SKYBLISS_IMAGES.salad,
    badge: "Fresh & Crisp",
  },
  {
    id: "cocktails-spirits",
    name: "Cocktails & Fine Spirits",
    tagline: "Raise the night under the stars",
    type: "beverage",
    description:
      "Expertly mixed signature concoctions, top-shelf spirits, domestic choices, chilled brews, and fine wine selections.",
    highlights: ["Signature Rooftop Cocktails", "Premium Whiskeys", "Crafted Mocktails", "Chilled Beers & Wine"],
    image: SKYBLISS_IMAGES.dining1,
    badge: "Bar Selection",
  },
];

// ─── Featured Food Highlights Showcase Strip ──────────────────────────────
export const FEATURED_FOOD_ITEMS = [
  {
    title: "Signature Claypot Gravy",
    category: "North Indian Specialty",
    image: SKYBLISS_IMAGES.dish,
    tag: "Signature Gravy",
  },
  {
    title: "Wok-Tossed Gourmet Noodles",
    category: "Asian Kitchen",
    image: SKYBLISS_IMAGES.noodles,
    tag: "High-Heat Wok",
  },
  {
    title: "Sizzling Wok Special Rice",
    category: "Chef's Wok Course",
    image: SKYBLISS_IMAGES.eggrice,
    tag: "Aromatic Rice",
  },
  {
    title: "Gourmet Starter Platter",
    category: "Bar Bites & Shareables",
    image: SKYBLISS_IMAGES.food,
    tag: "Crispy Delight",
  },
  {
    title: "Artisanal Fresh Salad",
    category: "Fresh Greens & Appetizers",
    image: SKYBLISS_IMAGES.salad,
    tag: "Garden Fresh",
  },
  {
    title: "Sizzler Fusion Platter",
    category: "Continental & Fusion",
    image: SKYBLISS_IMAGES.food1,
    tag: "Sizzling Hot",
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

// ─── Gallery Showcase Items (Comprehensive Curated Catalog) ────────────────
export interface GalleryItem {
  id: string;
  title: string;
  category: "Rooftop & Dining" | "Cuisine" | "Hospitality & Suites";
  src: string;
  description: string;
  aspect: "landscape" | "portrait";
  featured?: boolean;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  // ── Rooftop & Dining ────────────────────────────
  {
    id: "skybliss-top-view",
    title: "Skybliss Panoramic Top View",
    category: "Rooftop & Dining",
    src: SKYBLISS_IMAGES.skyblissTop,
    description: "Panoramic rooftop vantage overlooking Pondicherry city lights beneath the open sky.",
    aspect: "landscape",
    featured: true,
  },
  {
    id: "rooftop-lounge-dining",
    title: "Open-Air Rooftop Resto Lounge",
    category: "Rooftop & Dining",
    src: SKYBLISS_IMAGES.rooftop,
    description: "The crown jewel of Skybliss — open-sky dining, ambient lights, and starlit seating.",
    aspect: "portrait",
    featured: true,
  },
  {
    id: "ambient-dining-tables",
    title: "Ambient Lounge & Dining Seating",
    category: "Rooftop & Dining",
    src: SKYBLISS_IMAGES.dining1,
    description: "Sophisticated covered dining arrangements designed for comfortable group and family dinners.",
    aspect: "landscape",
    featured: false,
  },
  {
    id: "resto-atmosphere",
    title: "Skybliss Dining Ambiance",
    category: "Rooftop & Dining",
    src: SKYBLISS_IMAGES.dining,
    description: "Intimate table settings with warm mood lighting and premium table service.",
    aspect: "landscape",
    featured: false,
  },
  {
    id: "dining-terrace-view",
    title: "Skyline Terrace Dining",
    category: "Rooftop & Dining",
    src: SKYBLISS_IMAGES.diningView,
    description: "Breathtaking open terrace seating offering open-air refreshments and skyline breezes.",
    aspect: "landscape",
    featured: false,
  },
  {
    id: "dining-evening-lights",
    title: "Evening Starlit Dining & Lights",
    category: "Rooftop & Dining",
    src: SKYBLISS_IMAGES.diningNight,
    description: "Vibrant night ambiance with warm glowing lanterns, cocktails, and city lights.",
    aspect: "landscape",
    featured: false,
  },
  {
    id: "dining-table-service",
    title: "Rooftop Table Hospitality",
    category: "Rooftop & Dining",
    src: SKYBLISS_IMAGES.diningTables,
    description: "Dedicated hospitality and culinary presentation for memorable dinner outings.",
    aspect: "landscape",
    featured: false,
  },

  // ── Cuisine & Signature Dishes ──────────────────
  {
    id: "signature-curry-dish",
    title: "Signature Chef's Claypot Gravy",
    category: "Cuisine",
    src: SKYBLISS_IMAGES.dish,
    description: "Richly spiced claypot gravies and slow-simmered curries with roasted aromatic spices.",
    aspect: "landscape",
    featured: true,
  },
  {
    id: "wok-noodles-dish",
    title: "Wok-Tossed Gourmet Noodles",
    category: "Cuisine",
    src: SKYBLISS_IMAGES.noodles,
    description: "High-heat wok noodles tossed with fresh vegetables and chef's signature spicy sauces.",
    aspect: "portrait",
    featured: false,
  },
  {
    id: "sizzling-egg-rice",
    title: "Sizzling Wok Fried Rice",
    category: "Cuisine",
    src: SKYBLISS_IMAGES.eggrice,
    description: "Fragrant seasoned rice stir-fried with farm fresh eggs, garden vegetables, and herbs.",
    aspect: "portrait",
    featured: false,
  },
  {
    id: "fresh-garden-salad",
    title: "Artisanal Fresh Salad Platter",
    category: "Cuisine",
    src: SKYBLISS_IMAGES.salad,
    description: "Garden-fresh crispy salad platter with premium vinaigrette dressing.",
    aspect: "landscape",
    featured: false,
  },
  {
    id: "gourmet-small-plates",
    title: "Gourmet Lounge Starters Platter",
    category: "Cuisine",
    src: SKYBLISS_IMAGES.food,
    description: "Crispy appetizer bites paired with dipping sauces for cocktail snacking.",
    aspect: "landscape",
    featured: false,
  },
  {
    id: "sizzler-fusion-plate",
    title: "Multi-Cuisine Sizzler Specialty",
    category: "Cuisine",
    src: SKYBLISS_IMAGES.food1,
    description: "Hot sizzling fusion platter crafted for vibrant evening celebrations.",
    aspect: "landscape",
    featured: false,
  },

  // ── Hospitality & Suites ────────────────────────
  {
    id: "grand-facade-main",
    title: "Hotel Aishwarya Grand & Skybliss",
    category: "Hospitality & Suites",
    src: SKYBLISS_IMAGES.fullBuildingMain,
    description: "The 4th floor rooftop landmark positioned prominently on Villianur Main Road.",
    aspect: "portrait",
    featured: true,
  },
  {
    id: "executive-suite-room2",
    title: "Executive Luxury Suite",
    category: "Hospitality & Suites",
    src: SKYBLISS_IMAGES.room2,
    description: "Contemporary comfort and serene hospitality beneath the rooftop lounge.",
    aspect: "landscape",
    featured: false,
  },
  {
    id: "deluxe-suite-room",
    title: "Deluxe Comfort Suite",
    category: "Hospitality & Suites",
    src: SKYBLISS_IMAGES.room,
    description: "Spacious boutique accommodations for seamless stay-and-dine visits.",
    aspect: "landscape",
    featured: false,
  },
  {
    id: "premium-king-room1",
    title: "Premium King Suite",
    category: "Hospitality & Suites",
    src: SKYBLISS_IMAGES.room1,
    description: "Refined hotel room interiors equipped with modern luxury amenities.",
    aspect: "landscape",
    featured: false,
  },
  {
    id: "contemporary-suite",
    title: "Modern Hospitality Room",
    category: "Hospitality & Suites",
    src: SKYBLISS_IMAGES.roomExecutive,
    description: "Elegantly finished guest bedrooms with premium bedding and peaceful ambiance.",
    aspect: "landscape",
    featured: false,
  },
  {
    id: "hotel-grand-deluxe",
    title: "Contemporary Hotel Suite",
    category: "Hospitality & Suites",
    src: SKYBLISS_IMAGES.roomDeluxe,
    description: "Tranquil living space and comfortable hospitality at Hotel Aishwarya Grand.",
    aspect: "landscape",
    featured: false,
  },
  {
    id: "grand-sanctuary-suite",
    title: "Grand Executive Sanctuary",
    category: "Hospitality & Suites",
    src: SKYBLISS_IMAGES.roomSuite,
    description: "Comfortable resting space just an elevator ride down from the 4th-floor resto lounge.",
    aspect: "landscape",
    featured: false,
  },
  {
    id: "grand-reception-lobby",
    title: "Grand Reception & Hospitality",
    category: "Hospitality & Suites",
    src: SKYBLISS_IMAGES.reception,
    description: "Warm, illuminated reception lobby welcoming guests to Hotel Aishwarya Grand.",
    aspect: "landscape",
    featured: false,
  },
  {
    id: "grand-entrance-portico",
    title: "Illuminated Arrival Portico",
    category: "Hospitality & Suites",
    src: SKYBLISS_IMAGES.entrance,
    description: "Evening entrance architecture with dedicated valet and guest arrival driveway.",
    aspect: "landscape",
    featured: false,
  },
  {
    id: "waiting-hall-lounge",
    title: "Lobby & Waiting Lounge",
    category: "Hospitality & Suites",
    src: SKYBLISS_IMAGES.waitinghall,
    description: "Elegantly appointed reception and lounge space for seamless hospitality.",
    aspect: "landscape",
    featured: false,
  },
];

// ─── Key Stats / Facts ─────────────────────────────────────────────────────
export const STATS = [
  { value: 4, suffix: "th", label: "Floor Rooftop Vantage", decimals: 0 },
  { value: 6, suffix: "+", label: "Global Cuisines & Bar", decimals: 0 },
  { value: 100, suffix: "%", label: "Open-Air Skyline", decimals: 0 },
  { value: 13, suffix: "h", label: "Daily Service 11am–12am", decimals: 0 },
];

// ─── WhatsApp & Communication Helpers ──────────────────────────────────────
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
`Skybliss Rooftop Resto Lounge - Table Reservation Request

Name: ${data.name.trim()}
Contact: ${data.phone.trim()}
Date: ${data.date}
Preferred Time: ${data.time}
Guests: ${data.guests}
Special Request: ${data.specialRequest?.trim() || "None"}

Please confirm table availability and booking for Skybliss Rooftop Resto Lounge.`;

  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function buildWhatsAppEnquiryUrl(): string {
  const text = "Hello Skybliss Rooftop Resto Lounge, I would like to enquire about table reservation and rooftop dining.";
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
