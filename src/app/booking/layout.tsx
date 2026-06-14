import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Visit",
  description:
    "Reserve your appointment at Luxe Beauty Lounge. We respond within one business day to confirm and discuss your visit.",
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
