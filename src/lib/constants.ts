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
