import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import { FloatingBookButton } from "@/components/layout/FloatingBookButton";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { assetPath } from "@/lib/assetPath";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://luxebeautylounge.com"),
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
  ],
  openGraph: {
    type: "website",
    siteName: "Luxe Beauty Lounge",
    title: "Luxe Beauty Lounge | Luxury Day Spa & Salon",
    description:
      "An elevated beauty experience crafted for those who expect the exceptional.",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Luxe Beauty Lounge — Luxury Day Spa & Salon",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "Luxe Beauty Lounge",
  description:
    "An elevated beauty experience crafted for those who expect the exceptional. Luxury facials, hair color, bridal packages, and more.",
  image: "https://luxebeautylounge.com/images/hero-bg.jpg",
  url: "https://luxebeautylounge.com",
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Westfield",
    addressRegion: "NJ",
    addressCountry: "US",
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
        <CustomCursor />
        {children}
        <FloatingBookButton />
      </body>
    </html>
  );
}
