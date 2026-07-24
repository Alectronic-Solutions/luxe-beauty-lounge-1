export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Booking", href: "/booking" },
] as const;

export const SERVICES = [
  {
    id: "signature-facial",
    name: "Signature Facial",
    tagline: "The definitive skin ritual",
    description:
      "A bespoke 90-minute treatment addressing your skin's exact needs. We assess, then address: clinical actives and high-touch technique, precisely calibrated.",
    duration: "90 min",
    priceFrom: "$185",
    featured: true,
    category: "Skin",
  },
  {
    id: "balayage-color",
    name: "Balayage & Color",
    tagline: "Lived-in luminosity",
    description:
      "Hand-painted dimension that moves the way your hair does. From sun-kissed to richly saturated, no two results alike.",
    duration: "2–4 hrs",
    priceFrom: "$220",
    featured: false,
    category: "Hair",
  },
  {
    id: "bridal-packages",
    name: "Bridal Packages",
    tagline: "Your most important day, perfected",
    description:
      "Full-service bridal suites for the bride and her party. Trial runs, morning-of prep, and on-site options available.",
    duration: "Custom",
    priceFrom: "$350",
    featured: false,
    category: "Event",
  },
  {
    id: "brow-lash",
    name: "Brow & Lash Artistry",
    tagline: "Frame everything",
    description:
      "Precision brow mapping, tinting, and lamination. Lash lifts and tints that open the eye without a single strip.",
    duration: "45–75 min",
    priceFrom: "$75",
    featured: false,
    category: "Detail",
  },
  {
    id: "body-treatments",
    name: "Body Treatments",
    tagline: "Head to toe, reconsidered",
    description:
      "Exfoliating wraps, firming treatments, and targeted massage protocols. Skin that looks as good as it feels.",
    duration: "60–90 min",
    priceFrom: "$130",
    featured: false,
    category: "Body",
  },
  {
    id: "nail-artistry",
    name: "Nail Artistry",
    tagline: "The finishing touch",
    description:
      "Gel, hard gel extensions, and nail art by artists who take the craft seriously. Not an afterthought. An art form.",
    duration: "60–120 min",
    priceFrom: "$65",
    featured: false,
    category: "Nails",
  },
] as const;

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Margot L.",
    location: "Westfield, NJ",
    service: "Signature Facial",
    quote:
      "I've been to spas across three continents. Luxe Beauty Lounge is where I actually unwind. The Signature Facial changed my skin and my mornings.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya S.",
    location: "Summit, NJ",
    service: "Bridal Package",
    quote:
      "They did my wedding hair and makeup and six of my bridesmaids, all in one morning, flawlessly. The attention to each of us individually was remarkable.",
    rating: 5,
  },
  {
    id: 3,
    name: "Christine M.",
    location: "Scotch Plains, NJ",
    service: "Balayage & Color",
    quote:
      "Finally a colorist who listened. My hair looked better than the Pinterest photo I brought in. That never happens.",
    rating: 5,
  },
  {
    id: 4,
    name: "Adaeze O.",
    location: "Maplewood, NJ",
    service: "Brow & Lash",
    quote:
      "The brow lamination was so precise I thought I'd walked out with microblading. Three weeks later, still perfect. I won't go anywhere else.",
    rating: 5,
  },
  {
    id: 5,
    name: "Rachel T.",
    location: "Short Hills, NJ",
    service: "Body Treatment",
    quote:
      "I booked the firming wrap on a whim before a vacation. My skin looked airbrushed for two weeks. I've since rescheduled every six weeks.",
    rating: 5,
  },
  {
    id: 6,
    name: "Danielle K.",
    location: "Cranford, NJ",
    service: "Nail Artistry",
    quote:
      "Hard gel extensions that actually lasted, and looked architectural, not tacky. The nail artist treated each nail like a canvas. Genuinely stunned.",
    rating: 5,
  },
] as const;

export const GALLERY_ITEMS = [
  { id: 1, label: "Signature Facial",  category: "Skin",        aspectPct: "133%", bg: "linear-gradient(155deg,#2e1249 0%,#1C0B2E 45%,#0e0517 100%)",   lightX: "40%", lightY: "35%", src: "/images/gallery/gallery-1.webp" },
  { id: 2, label: "Balayage & Color",  category: "Hair",        aspectPct: "75%",  bg: "linear-gradient(145deg,#1a1010 0%,#2a1a0e 55%,#1a0c08 100%)",   lightX: "65%", lightY: "25%", src: "/images/gallery/gallery-2.webp" },
  { id: 3, label: "Bridal Morning",    category: "Bridal",      aspectPct: "120%", bg: "linear-gradient(160deg,#8B4A2A 0%,#C8956C 40%,#A87550 100%)",   lightX: "50%", lightY: "20%", src: "/images/gallery/gallery-3.webp" },
  { id: 4, label: "Brow Lamination",   category: "Brow & Lash", aspectPct: "100%", bg: "linear-gradient(150deg,#3d1a63 0%,#2e1249 50%,#1C0B2E 100%)",   lightX: "30%", lightY: "60%", src: "/images/gallery/gallery-4.webp" },
  { id: 5, label: "Body Treatment",    category: "Body",        aspectPct: "145%", bg: "linear-gradient(165deg,#1a1a1a 0%,#2d1a10 50%,#120a06 100%)",   lightX: "55%", lightY: "40%", src: "/images/gallery/gallery-5.webp" },
  { id: 6, label: "Nail Artistry",     category: "Nails",       aspectPct: "80%",  bg: "linear-gradient(135deg,#C8956C 0%,#8B4A2A 50%,#5a2e14 100%)",   lightX: "70%", lightY: "30%", src: "/images/gallery/gallery-6.webp" },
  { id: 7, label: "Color Correction",  category: "Hair",        aspectPct: "110%", bg: "linear-gradient(155deg,#1C0B2E 0%,#3d1a2e 55%,#1a0a1a 100%)",   lightX: "45%", lightY: "45%", src: "/images/gallery/gallery-7.webp" },
  { id: 8, label: "Lash Lift",         category: "Brow & Lash", aspectPct: "90%",  bg: "linear-gradient(140deg,#0e0517 0%,#2e1249 60%,#1C0B2E 100%)",   lightX: "60%", lightY: "20%", src: "/images/gallery/gallery-8.webp" },
  { id: 9, label: "Gel Extensions",    category: "Nails",       aspectPct: "125%", bg: "linear-gradient(150deg,#E8C49A 0%,#C8956C 45%,#8B4A2A 100%)",   lightX: "35%", lightY: "30%", src: "/images/gallery/gallery-9.webp" },
] as const;

export const TEAM = [
  { name: "Isabelle Laurent",    role: "Founder & Creative Director",  specialty: "Advanced Skin Treatments",        years: "12+ yrs",  bg: "linear-gradient(155deg,#2e1249 0%,#1C0B2E 50%,#0e0517 100%)",  src: "/images/team/team-1.webp" },
  { name: "Maelle Fontaine",     role: "Senior Colorist",              specialty: "Balayage & Color Correction",     years: "9 yrs",    bg: "linear-gradient(145deg,#1a1010 0%,#2d2020 55%,#1a1210 100%)",  src: "/images/team/team-2.webp" },
  { name: "Suki Nakamura",       role: "Brow & Lash Artist",           specialty: "Brow Architecture & Lash Lifting",years: "7 yrs",   bg: "linear-gradient(145deg,#2e1249 0%,#1C0B2E 60%,#0e0517 100%)",  src: "/images/team/team-3.webp" },
  { name: "Dominique Castillo",  role: "Nail Artist",                  specialty: "Gel & Hard Gel Extensions",       years: "6 yrs",   bg: "linear-gradient(135deg,#8B4A2A 0%,#C8956C 50%,#E8C49A 100%)",  src: "/images/team/team-4.webp" },
  { name: "Rania Khalil",        role: "Body & Wellness Specialist",   specialty: "Wraps, Firming & Lymphatics",     years: "5 yrs",   bg: "linear-gradient(145deg,#2a1a0e 0%,#1a1008 60%,#0d0804 100%)",  src: "/images/team/team-5.webp" },
  { name: "Celine Moreau",       role: "Skin Therapist",               specialty: "Chemical Peels & Acne Protocols", years: "4 yrs",   bg: "linear-gradient(155deg,#2e1249 0%,#3d1a2e 55%,#1a0a1a 100%)",  src: "/images/team/team-6.webp" },
] as const;

// Self-hosted, compressed loops (see public/videos/). Kept as basePath-relative
// paths, the Hero wraps each in assetPath() so they resolve under the deploy
// subpath. Previously these were hot-linked from pexels.com, which added ~8 MB
// of uncacheable third-party traffic on the critical path.
export const HERO_VIDEOS = [
  "/videos/hero-1.mp4",
  "/videos/hero-2.mp4",
  "/videos/hero-3.mp4",
] as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com", icon: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com", icon: "facebook" },
  { label: "Pinterest", href: "https://www.pinterest.com", icon: "pinterest" },
] as const;

export const CONTACT_INFO = {
  phone: "(555) 820-4400",
  email: "hello@luxebeautylounge.com",
  address: "142 Meridian Avenue, Suite 200",
  city: "Westfield, NJ 07090",
  hours: {
    weekday: "Tue–Fri: 9am – 7pm",
    saturday: "Saturday: 9am – 6pm",
    sunday: "Sunday: 10am – 4pm",
  },
} as const;
