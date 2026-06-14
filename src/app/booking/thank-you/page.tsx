"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const EASE: [number, number, number, number] = [0.25, 0, 0, 1];

export default function ThankYouPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ivory flex items-center justify-center px-6 py-32">
        <div className="max-w-xl w-full text-center">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mx-auto mb-8 w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "rgba(200,149,108,0.12)", border: "1px solid rgba(200,149,108,0.3)" }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
              <path d="M6 16L13 23L26 9" stroke="#C8956C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="font-display font-light text-plum leading-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
          >
            We&rsquo;ll be in touch.
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
            className="mx-auto mt-6 mb-6 flex items-center justify-center gap-3 origin-center"
            aria-hidden
          >
            <div className="h-px w-10 bg-rose-gold/50" />
            <div className="w-1 h-1 rounded-full bg-rose-gold/60" />
          </motion.div>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="font-body text-charcoal/60 leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)" }}
          >
            Your inquiry has been received. A member of our team will reach out
            within 24 hours to confirm your appointment details.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-body text-sm text-charcoal/40 mt-3"
          >
            In the meantime, feel free to explore our services or follow us on Instagram.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
            className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link
              href="/services"
              className="btn-primary px-8 py-3.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
            >
              Explore Services
            </Link>
            <Link
              href="/"
              className="btn-ghost inline-flex items-center justify-center gap-2 px-8 py-3.5 text-plum/70 hover:text-plum border-plum/20 hover:border-plum/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
