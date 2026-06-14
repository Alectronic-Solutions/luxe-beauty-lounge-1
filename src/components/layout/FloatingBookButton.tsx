"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export function FloatingBookButton() {
  const pathname = usePathname();
  const rm = useReducedMotion();
  const [visible, setVisible] = useState(false);

  // Show after scrolling 120px, hide on booking page
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isBookingPage = pathname === "/booking" || pathname === "/booking/";
  const show = visible && !isBookingPage;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={rm ? undefined : { opacity: 0, y: 16, scale: 0.92 }}
          animate={rm ? undefined : { opacity: 1, y: 0, scale: 1 }}
          exit={rm ? undefined : { opacity: 0, y: 12, scale: 0.94 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 inset-x-0 flex justify-center z-40 md:hidden pointer-events-none"
          style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))" }}
          aria-hidden={!show}
        >
          <motion.div
            whileHover={rm ? undefined : { scale: 1.04 }}
            whileTap={rm ? undefined : { scale: 0.96 }}
            className="pointer-events-auto"
          >
            <Link
              href="/booking"
              className="btn-primary px-8 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
              aria-label="Book an appointment"
              style={{ fontSize: "0.82rem", letterSpacing: "0.1em" }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
                <path d="M6.5 1L7.47 4.53H11.09L8.31 6.47L9.28 10L6.5 8.06L3.72 10L4.69 6.47L1.91 4.53H5.53L6.5 1Z" fill="currentColor" fillOpacity="0.9" />
              </svg>
              Book Now
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
