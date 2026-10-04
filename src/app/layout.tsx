import type { Metadata, Viewport } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import { FloatingBookButton } from "@/components/layout/FloatingBookButton";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { assetPath } from "@/lib/assetPath";
import { SITE_URL, canonical } from "@/lib/site";
import { CONTACT_INFO, SOCIAL_LINKS, TESTIMONIALS } from "@/lib/constants";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const OG_IMAGE = canonical("/images/og.jpg");

// Tints the mobile browser chrome to match the plum header.
export const viewport: Viewport = {
  themeColor: "#1C0B2E",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Luxe Beauty Lounge | Luxury Day Spa & Salon",
    template: "%s | Luxe Beauty Lounge",
  },
  description:
    "An elevated beauty experience crafted for those who expect the exceptional. Luxury facials, hair color, bridal packages, and more.",
  keywords: [
    "luxury salon",
    "day spa",
    "balayage",
    "bridal beauty",
    "signature facial",
    "beauty lounge",
    "Westfield NJ salon",
  ],
  alternates: {
    canonical: canonical("/"),
  },
  openGraph: {
    type: "website",
    siteName: "Luxe Beauty Lounge",
    url: canonical("/"),
    title: "Luxe Beauty Lounge | Luxury Day Spa & Salon",
    description:
      "An elevated beauty experience crafted for those who expect the exceptional.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Luxe Beauty Lounge, Luxury Day Spa & Salon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxe Beauty Lounge | Luxury Day Spa & Salon",
    description:
      "An elevated beauty experience crafted for those who expect the exceptional.",
    images: [OG_IMAGE],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "@id": canonical("/#business"),
  name: "Luxe Beauty Lounge",
  description:
    "An elevated beauty experience crafted for those who expect the exceptional. Luxury facials, hair color, bridal packages, and more.",
  image: OG_IMAGE,
  url: canonical("/"),
  telephone: "+1-555-820-4400",
  priceRange: "$$$",
  // Area only: the street address is shared privately with booked clients.
  address: {
    "@type": "PostalAddress",
    addressLocality: "Westfield",
    addressRegion: "NJ",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: CONTACT_INFO.geo.lat,
    longitude: CONTACT_INFO.geo.lng,
  },
  areaServed: CONTACT_INFO.areasServed.map((name) => ({
    "@type": "City",
    name: `${name}, NJ`,
  })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "10:00",
      closes: "16:00",
    },
  ],
  sameAs: SOCIAL_LINKS.map((s) => s.href),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    bestRating: "5",
    reviewCount: TESTIMONIALS.length,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" href={assetPath("/favicon.ico")} sizes="16x16 32x32 48x48" type="image/x-icon" />
        <link rel="shortcut icon" href={assetPath("/favicon.ico")} />
        <link rel="apple-touch-icon" href={assetPath("/favicon.png")} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased bg-ivory text-charcoal">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <MotionProvider>
          <CustomCursor />
          {children}
          <FloatingBookButton />
        </MotionProvider>
      </body>
    </html>
  );
}
