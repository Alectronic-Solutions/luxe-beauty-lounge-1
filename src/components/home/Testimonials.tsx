"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import { viewportOnce } from "@/lib/animations";

/* Five rose-gold filled stars */
function Stars() {
  return (
    <div className="flex items-center gap-[3px]" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M6 1L7.18 4.18H10.56L7.88 6.1L8.99 9.28L6 7.32L3.01 9.28L4.12 6.1L1.44 4.18H4.82L6 1Z" fill="#C8956C" />
        </svg>
      ))}
    </div>
  );
}

type Testimonial = (typeof TESTIMONIALS)[number];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="flex-none w-[280px] xs:w-[300px] sm:w-[340px] md:w-[360px] bg-ivory rounded-[18px] p-5 sm:p-6 flex flex-col gap-4 transition-transform duration-300 hover:-translate-y-1.5"
      style={{
        boxShadow: "0 2px 12px rgba(28,11,46,0.07), 0 8px 28px rgba(28,11,46,0.05)",
        border: "1px solid rgba(245,230,200,0.6)",
      }}
      aria-label={`Testimonial from ${t.name}`}
    >
      <Stars />

      <blockquote className="relative">
        <span className="absolute -top-2 -left-1 font-display text-rose-gold/20 leading-none select-none" style={{ fontSize: "3.5rem", lineHeight: 1 }} aria-hidden>&ldquo;</span>
        <p
          className="font-display font-light text-plum leading-[1.65] relative z-10"
          style={{ fontSize: "clamp(0.95rem,1.2vw,1.05rem)" }}
        >
          {t.quote}&rdquo;
        </p>
      </blockquote>

      <footer className="mt-auto pt-4 border-t border-champagne-dark/40 flex items-center justify-between gap-3">
        <div>
          <p className="font-body font-medium text-charcoal text-sm leading-tight">{t.name}</p>
          <p className="font-body text-[0.7rem] text-charcoal/40 mt-0.5">{t.location}</p>
        </div>
        <span
          className="shrink-0 font-body text-[0.58rem] tracking-[0.18em] uppercase px-2.5 py-1 rounded-pill text-rose-gold"
          style={{ background: "rgba(200,149,108,0.10)", border: "1px solid rgba(200,149,108,0.22)" }}
        >
          {t.service}
        </span>
      </footer>
    </div>
  );
}

// Split testimonials into two rows for the marquee
const ROW_A = [...TESTIMONIALS].slice(0, 3);
const ROW_B = [...TESTIMONIALS].slice(3);

// Duplicate for seamless loop
const TRACK_A = [...ROW_A, ...ROW_A];
const TRACK_B = [...ROW_B, ...ROW_B];

export function Testimonials() {
  const rm = useReducedMotion();

  return (
    <section
      className="section-py overflow-hidden relative"
      style={{ background: "#F5E6C8" }}
      aria-label="Client testimonials"
    >
      {/* Section blend — fades into TrustStrip deep plum */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 z-10"
        style={{ background: "linear-gradient(to top, #1C0B2E 0%, transparent 100%)" }}
        aria-hidden
      />
      {/* Section header */}
      <div className="container-luxury mb-8 text-center">
        <motion.p
          initial={rm ? undefined : { opacity: 0, y: 14 }}
          whileInView={rm ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className="font-body text-[0.68rem] tracking-[0.3em] uppercase text-rose-gold mb-3"
        >
          What Clients Say
        </motion.p>
        <motion.h2
          initial={rm ? undefined : { opacity: 0, y: 20 }}
          whileInView={rm ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, delay: 0.07, ease: [0.25, 0, 0, 1] }}
          className="font-display font-light text-plum leading-tight"
          style={{ fontSize: "clamp(2.25rem,4.5vw,4rem)" }}
        >
          Words that mean more than five stars
        </motion.h2>
        <motion.p
          initial={rm ? undefined : { opacity: 0, y: 16 }}
          whileInView={rm ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.55, delay: 0.17 }}
          className="mt-4 font-body font-light text-charcoal/55 text-sm tracking-wide"
        >
          Real words from clients we know by name.
        </motion.p>
      </div>

      {/* Marquee wrapper — hover pauses both rows */}
      <motion.div
        initial={rm ? undefined : { opacity: 0 }}
        whileInView={rm ? undefined : { opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="marquee-wrapper flex flex-col gap-4 select-none"
        aria-hidden={rm ? undefined : "true"}
      >
        {/* Row A — scrolls left */}
        <div className="overflow-hidden">
          <div className={`marquee-track ${rm ? "" : "marquee-left"}`}>
            {TRACK_A.map((t, i) => (
              <TestimonialCard key={`a-${t.id}-${i}`} t={t} />
            ))}
          </div>
        </div>

        {/* Row B — scrolls right */}
        <div className="overflow-hidden">
          <div className={`marquee-track ${rm ? "" : "marquee-right"}`}>
            {TRACK_B.map((t, i) => (
              <TestimonialCard key={`b-${t.id}-${i}`} t={t} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Accessible static fallback — only shown to screen readers / reduced-motion */}
      <div className={`container-luxury mt-10 ${rm ? "" : "sr-only"}`} aria-live="polite">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} t={t} />
          ))}
        </div>
      </div>

      <div className="container-luxury mt-8 text-center">
        <motion.p
          initial={rm ? undefined : { opacity: 0 }}
          whileInView={rm ? undefined : { opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.5 }}
          className="font-body text-sm text-charcoal/45 tracking-wide"
        >
          Join{" "}
          <span className="text-charcoal/70 font-medium">800+ clients</span>{" "}
          who trust us with their most important looks.
        </motion.p>
      </div>
    </section>
  );
}
