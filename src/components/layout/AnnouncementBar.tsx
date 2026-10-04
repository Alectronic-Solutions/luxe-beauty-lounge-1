"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const LS_KEY = "lbl-announcement-dismissed-v2";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    try {
      if (localStorage.getItem(LS_KEY) === "true") setDismissed(true);
    } catch {
      /* storage blocked (private mode), just show the bar */
    }
  }, []);

  function dismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(LS_KEY, "true");
    } catch {
      /* ignore */
    }
  }

  return (
    <AnimatePresence initial={false}>
      {!dismissed && (
        <motion.div
          key="announcement"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
          style={{ background: "linear-gradient(90deg, #1C0B2E 0%, #2e1249 35%, #1C0B2E 70%, #2a1a3e 100%)" }}
        >
          <div className="relative flex items-center justify-center gap-3 px-8 sm:px-10 py-2.5">
            {/* Subtle shimmer line */}
            <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(200,149,108,0.35) 50%, transparent 100%)" }} aria-hidden />

            {/* Dot ornament */}
            <div className="hidden sm:flex items-center gap-1.5" aria-hidden>
              <div className="w-1 h-1 rounded-full bg-rose-gold/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-rose-gold/60" />
              <div className="w-1 h-1 rounded-full bg-rose-gold/40" />
            </div>

            <p className="font-body text-[0.72rem] leading-snug tracking-[0.08em] sm:tracking-[0.14em] text-ivory/75 text-center pr-6 sm:pr-0">
              <span className="text-champagne/90 font-medium">Bridal season:</span>
              {" "}Now booking consultations for next year&apos;s weddings.{" "}
              <Link
                href="/booking"
                className="underline underline-offset-2 text-rose-gold hover:text-champagne transition-colors duration-200 decoration-rose-gold/40 hover:decoration-champagne/60"
              >
                Reserve yours
              </Link>
            </p>

            <div className="hidden sm:flex items-center gap-1.5" aria-hidden>
              <div className="w-1 h-1 rounded-full bg-rose-gold/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-rose-gold/60" />
              <div className="w-1 h-1 rounded-full bg-rose-gold/40" />
            </div>

            {/* Dismiss */}
            <button
              onClick={dismiss}
              aria-label="Dismiss announcement"
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-ivory/55 hover:text-ivory/70 transition-colors duration-200 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-rose-gold"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
