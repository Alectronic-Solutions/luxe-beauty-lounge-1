"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ThankYouModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-plum/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.93, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-6 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-md rounded-2xl p-10 text-center relative"
              style={{
                background: "#FAF7F2",
                boxShadow: "0 32px 80px rgba(28,11,46,0.35)",
              }}
            >
              {/* Close */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-charcoal/30 hover:text-charcoal/70 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold rounded-full"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {/* Check icon */}
              <div
                className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "rgba(200,149,108,0.12)", border: "1px solid rgba(200,149,108,0.3)" }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
                  <path d="M5 14L11 20L23 8" stroke="#C8956C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h2 id="modal-title" className="font-display font-light text-plum leading-tight" style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)" }}>
                Thank you!
              </h2>

              <div className="mx-auto my-4 flex items-center justify-center gap-2" aria-hidden>
                <div className="h-px w-8 bg-rose-gold/40" />
                <div className="w-1 h-1 rounded-full bg-rose-gold/50" />
              </div>

              <p className="font-body text-charcoal/60 leading-relaxed text-[0.95rem]">
                Your submission has been received. We&rsquo;ll be in touch within one business day to confirm your appointment.
              </p>

              <button
                onClick={onClose}
                className="mt-8 btn-primary px-8 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
