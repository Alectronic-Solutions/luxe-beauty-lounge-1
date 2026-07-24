import type { Metadata } from "next";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Visit",
  description:
    "Reserve your appointment at Luxe Beauty Lounge. We respond within one business day to confirm and discuss your visit.",
  alternates: { canonical: canonical("/booking/") },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
