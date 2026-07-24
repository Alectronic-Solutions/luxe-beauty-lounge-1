import type { Metadata } from "next";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A visual portfolio of work by Luxe Beauty Lounge: skin, hair, nails, and bridal.",
  alternates: { canonical: canonical("/gallery/") },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
