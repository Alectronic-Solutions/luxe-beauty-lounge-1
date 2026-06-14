"use client";

import { motion, useReducedMotion } from "framer-motion";
import { viewportOnce } from "@/lib/animations";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const BADGES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <path d="M14 2L16.47 9.53H24.5L18.02 13.97L20.49 21.5L14 17.06L7.51 21.5L9.98 13.97L3.5 9.53H11.53L14 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
      </svg>
    ),
    label: "Top Rated",
    sub: "Westfield, NJ 2024",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.3" />
        <path d="M9 14l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Appointment Only",
    sub: "Undivided attention, always",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <path d="M14 3C14 3 6 7 6 14.5C6 18.64 9.36 22 13.5 22C15.78 22 17.83 21.02 19.26 19.45" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M14 3C14 3 22 7 22 14.5C22 16.3 21.58 18 20.83 19.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="14" cy="13" r="3" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    label: "Clinical-Grade",
    sub: "Pharmaceutical actives only",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <path d="M4 8h20M4 14h14M4 20h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    label: "800+ Clients",
    sub: "And a waitlist to prove it",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <path d="M14 4v20M4 14h20" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.3" />
        <path d="M9 9C9 9 11 13 14 13C17 13 19 9 19 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    label: "Annual Training",
    sub: "Every practitioner, every year",
  },
] as const;

export function TrustStrip() {
  const rm = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#1C0B2E" }}
      aria-label="Why choose Luxe Beauty Lounge"
    >
      {/* Subtle ambient glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] opacity-[0.05]"
        style={{ background: "radial-gradient(ellipse,#C8956C 0%,transparent 70%)", filter: "blur(40px)" }}
        aria-hidden
      />

      {/* Top blend — overlaps Testimonials champagne fade */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16 z-10"
        style={{ background: "linear-gradient(to bottom, rgba(245,230,200,0.12) 0%, transparent 100%)" }}
        aria-hidden
      />

      <div className="container-luxury py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
          {BADGES.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={rm ? undefined : { opacity: 0, y: 24 }}
              whileInView={rm ? undefined : { opacity: 1, y: 0 }}
              whileHover={rm ? undefined : { y: -5, transition: { duration: 0.22, ease: EASE } }}
              viewport={viewportOnce}
              transition={{ duration: 0.55, delay: i * 0.09, ease: EASE }}
              className="flex flex-col items-center gap-3 text-center group cursor-default"
            >
              <motion.div
                whileHover={rm ? undefined : { scale: 1.1, transition: { duration: 0.22 } }}
                className="w-14 h-14 rounded-full flex items-center justify-center text-rose-gold transition-colors duration-300 border border-rose-gold/15 group-hover:border-rose-gold/40"
                style={{ background: "rgba(200,149,108,0.08)" }}
              >
                {badge.icon}
              </motion.div>
              <div>
                <p className="font-display font-light text-ivory text-[1rem] leading-tight group-hover:text-champagne transition-colors duration-300">{badge.label}</p>
                <p className="font-body text-[0.7rem] text-ivory/50 group-hover:text-ivory/75 mt-0.5 leading-snug transition-colors duration-300">{badge.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom rule */}
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(to right,transparent 0%,rgba(200,149,108,0.18) 30%,rgba(200,149,108,0.18) 70%,transparent 100%)" }}
        aria-hidden
      />
    </section>
  );
}
