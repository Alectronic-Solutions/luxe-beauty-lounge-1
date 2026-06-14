"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const SECTIONS = [
  {
    title: "Information We Collect",
    body: `When you submit a booking inquiry or contact form on our website, we collect the information you provide — such as your name, email address, phone number, and any notes about the services you're interested in. We do not collect payment information through this website.`,
  },
  {
    title: "How We Use Your Information",
    body: `We use the information you provide solely to respond to your inquiry, confirm appointments, and communicate with you about our services. We do not sell, rent, or share your personal information with third parties for marketing purposes.`,
  },
  {
    title: "Email Communications",
    body: `If you subscribe to our newsletter, we will send you periodic updates about seasonal promotions, new services, and first-access offers. You may unsubscribe at any time by clicking the unsubscribe link in any email we send you.`,
  },
  {
    title: "Cookies",
    body: `Our website may use cookies to improve your browsing experience. These are small text files stored on your device. You can disable cookies through your browser settings; however, some features of the site may not function correctly without them.`,
  },
  {
    title: "Third-Party Services",
    body: `Our website is hosted on Cloudflare Pages. Any contact forms use client-side validation only and do not transmit data to third-party processors. Our website is hosted on Cloudflare Pages.`,
  },
  {
    title: "Data Security",
    body: `We take reasonable precautions to protect your information. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of data transmitted through our website.`,
  },
  {
    title: "Your Rights",
    body: `You may request access to, correction of, or deletion of any personal information we hold about you by contacting us at hello@luxebeautylounge.com. We will respond to your request within a reasonable timeframe.`,
  },
  {
    title: "Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Your continued use of the website after any changes constitutes acceptance of the revised policy.`,
  },
  {
    title: "Contact Us",
    body: `If you have any questions about this Privacy Policy, please contact us at hello@luxebeautylounge.com or call (555) 820-4400.`,
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VP = { once: true, amount: 0.1 } as const;

export default function PrivacyPolicyPage() {
  const rm = useReducedMotion();

  return (
    <>
      <Navbar />
      <main className="bg-ivory min-h-screen">
        {/* Hero header */}
        <div className="relative pt-40 pb-20 overflow-hidden" style={{ background: "#1C0B2E" }}>
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-[0.08]"
            style={{ background: "radial-gradient(ellipse,#C8956C 0%,transparent 70%)", filter: "blur(60px)" }}
            aria-hidden
          />
          <div className="container-luxury max-w-3xl">
            <motion.p
              initial={rm ? undefined : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="font-body text-[0.68rem] tracking-[0.3em] uppercase text-rose-gold mb-4"
            >
              Legal
            </motion.p>
            <motion.h1
              initial={rm ? undefined : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
              className="font-display font-light text-ivory leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              initial={rm ? undefined : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-body text-sm text-ivory/35 mt-4"
            >
              Effective date: June 2026
            </motion.p>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(to right,transparent,rgba(200,149,108,0.25),transparent)" }} aria-hidden />
        </div>

        <div className="container-luxury max-w-3xl py-20">
          {/* Intro */}
          <motion.p
            initial={rm ? undefined : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-body text-charcoal/65 leading-[1.85] mb-14"
            style={{ fontSize: "1.0625rem" }}
          >
            Luxe Beauty Lounge (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy.
            This policy explains how we collect, use, and safeguard the information you provide when you visit our website or contact us.
          </motion.p>

          {/* Sections */}
          <div className="space-y-10">
            {SECTIONS.map((s, i) => (
              <motion.div
                key={i}
                initial={rm ? undefined : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.55, delay: 0.04 * (i % 4), ease: EASE }}
                className="group border-b border-charcoal/8 pb-10 last:border-0"
              >
                <div className="flex items-start gap-4 mb-3">
                  <span className="font-display font-light text-rose-gold/40 leading-none mt-1" style={{ fontSize: "1.1rem" }}>{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="font-display font-light text-plum" style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)" }}>{s.title}</h2>
                </div>
                <p className="font-body text-charcoal/60 leading-[1.85] pl-10">{s.body}</p>
              </motion.div>
            ))}
          </div>

          {/* Back link */}
          <motion.div
            initial={rm ? undefined : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VP}
            transition={{ duration: 0.5 }}
            className="mt-16 pt-8 border-t border-charcoal/10 flex items-center justify-between"
          >
            <Link href="/" className="group inline-flex items-center gap-2 font-body text-sm text-rose-gold hover:text-plum transition-colors duration-300">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden className="transition-transform duration-200 group-hover:-translate-x-1">
                <path d="M11 4H1M4 7L1 4L4 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Home
            </Link>
            <Link href="/terms-of-service" className="font-body text-sm text-charcoal/40 hover:text-charcoal/70 transition-colors duration-300">
              Terms of Service →
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
