import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A visual portfolio of work by Luxe Beauty Lounge — skin, hair, nails, and bridal.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
