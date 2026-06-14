import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore the full Luxe Beauty Lounge menu — signature facials, balayage, bridal packages, brow & lash artistry, body treatments, and nail artistry.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
