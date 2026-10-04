"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function FloatingBookButton() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [covered, setCovered] = useState(false);

  // Show after scrolling 120px, hide on booking page
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Get out of the way when a booking form or the footer is on screen, so the
  // pill never sits on top of form fields, links, or the submit button.
  useEffect(() => {
    const targets = document.querySelectorAll("[data-hide-float], footer");
    if (!targets.length) return;
    const onScreen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? onScreen.add(e.target) : onScreen.delete(e.target)));
      setCovered(onScreen.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => {
      io.disconnect();
      setCovered(false);
    };
  }, [pathname]);

  const isBookingPage = pathname.startsWith("/booking");
  const show = visible && !covered && !isBookingPage;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.94 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 inset-x-0 flex justify-center z-40 lg:hidden pointer-events-none"
          style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))" }}
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
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
