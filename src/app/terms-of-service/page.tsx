"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const SECTIONS = [
  {
    title: "Acceptance of Terms",
    body: `By accessing or using the Luxe Beauty Lounge website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.`,
  },
  {
    title: "Services & Appointments",
    body: `Submitting a booking inquiry through our website does not guarantee an appointment. All appointments are confirmed directly by our team via phone or email. We reserve the right to decline any booking request at our discretion.`,
  },
  {
    title: "Cancellation Policy",
    body: `We kindly ask for at least 24 hours' notice for cancellations or rescheduling. Late cancellations or no-shows may be subject to a cancellation fee. Please contact us as soon as possible if you need to change your appointment.`,
  },
  {
    title: "Pricing",
    body: `Prices displayed on this website are starting prices and subject to change based on hair length, service complexity, and other factors assessed during your consultation. Final pricing will always be confirmed before services begin.`,
  },
  {
    title: "Intellectual Property",
    body: `All content on this website — including text, images, graphics, logos, and design — is the property of Luxe Beauty Lounge and is protected by applicable copyright and trademark laws. You may not reproduce, distribute, or use any content without our express written permission.`,
  },
  {
    title: "Disclaimer of Warranties",
    body: `This website and its content are provided on an "as is" basis without warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.`,
  },
  {
    title: "Limitation of Liability",
    body: `To the fullest extent permitted by law, Luxe Beauty Lounge shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use of this website or our services.`,
  },
  {
    title: "Third-Party Links",
    body: `Our website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.`,
  },
  {
    title: "Governing Law",
    body: `These Terms of Service shall be governed by and construed in accordance with the laws of the State of New Jersey, without regard to its conflict of law provisions.`,
  },
  {
    title: "Changes to These Terms",
    body: `We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after any changes constitutes your acceptance of the new terms.`,
  },
  {
    title: "Contact Us",
    body: `If you have any questions about these Terms of Service, please contact us at hello@luxebeautylounge.com or call (555) 820-4400.`,
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VP = { once: true, amount: 0.1 } as const;

export default function TermsOfServicePage() {
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
              Terms of Service
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
            Please read these Terms of Service carefully before using the Luxe Beauty Lounge website
            or booking our services. These terms govern your use of our website and your relationship with us.
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
                className="border-b border-charcoal/8 pb-10 last:border-0"
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
            <Link href="/privacy-policy" className="font-body text-sm text-charcoal/40 hover:text-charcoal/70 transition-colors duration-300">
              ← Privacy Policy
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
