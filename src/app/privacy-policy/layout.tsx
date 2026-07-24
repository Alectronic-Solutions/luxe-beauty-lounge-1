import type { Metadata } from "next";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Luxe Beauty Lounge collects, uses, and protects the information you share with us.",
  alternates: { canonical: canonical("/privacy-policy/") },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
