import type { Metadata } from "next";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thanks for reaching out to Luxe Beauty Lounge.",
  alternates: { canonical: canonical("/booking/thank-you/") },
  // Confirmation page — not useful in search results.
  robots: { index: false, follow: true },
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
