import type { Metadata } from "next";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Luxe Beauty Lounge, founded on the belief that luxury is a standard, not an exception.",
  alternates: { canonical: canonical("/about/") },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
