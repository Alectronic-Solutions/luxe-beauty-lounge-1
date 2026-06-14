"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { Variants } from "framer-motion";
import { assetPath } from "@/lib/assetPath";
import Link from "next/link";
import { viewportOnce } from "@/lib/animations";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const textStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.15 },
  },
};

const textChild: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

export function AboutPreview() {
  const rm = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden section-py"
      aria-label="About Luxe Beauty Lounge"
      style={{ background: "#FAF7F2" }}
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-champagne-dark/60 to-transparent" aria-hidden />

      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 xl:gap-20 items-start">

          {/* ═══ LEFT — Editorial text ═══ */}
          <motion.div
            variants={rm ? undefined : textStagger}
            initial={rm ? undefined : "hidden"}
            whileInView={rm ? undefined : "visible"}
            viewport={viewportOnce}
            className="lg:max-w-[560px]"
          >
            {/* Eyebrow */}
            <motion.p
              variants={rm ? undefined : textChild}
              className="font-body text-[0.68rem] tracking-[0.32em] uppercase text-rose-gold mb-8"
            >
              Our Story
            </motion.p>

            {/* Headline */}
            <motion.h2
              variants={rm ? undefined : textChild}
              className="font-display font-light text-plum leading-[1.07] text-balance"
              style={{ fontSize: "clamp(2.25rem, 4.5vw, 4rem)" }}
            >
              Built on the belief that luxury is a standard,
              <span className="italic text-rose-gold"> not an exception.</span>
            </motion.h2>

            {/* Body copy with drop cap */}
            <motion.div
              variants={rm ? undefined : textChild}
              className="mt-7 space-y-4 text-charcoal/65 leading-[1.8] font-light"
              style={{ fontSize: "clamp(0.9rem, 1.1vw, 1rem)" }}
            >
              <p className="relative">
                {/*
                  Drop-cap: large decorative "I" floats left.
                  aria-hidden on the visual initial; the real letter
                  stays in the text flow via sr-only span.
                */}
                <span
                  aria-hidden
                  className="float-left font-display font-light text-rose-gold leading-[0.8] select-none mr-2 mt-1"
                  style={{ fontSize: "clamp(4.5rem, 7vw, 6rem)" }}
                >
                  I
                </span>
                <span className="sr-only">I</span>sabelle Laurent spent a decade working in
                destination spas and editorial beauty before opening Luxe Beauty Lounge in
                2013. Her vision was simple: bring the craft and discretion of a private
                atelier to a neighborhood that deserved it.
              </p>

              <p>
                Every practitioner on our team has been individually selected and trained
                to Isabelle&apos;s exacting standards. We don&apos;t offer every service.
                We offer the ones we do exceptionally well.
              </p>

              <p>
                The result is a space where nothing is hurried, nothing is formulaic, and
                every client leaves having received something that was made specifically
                for them.
              </p>
            </motion.div>

            {/* Pull quote */}
            <motion.blockquote
              variants={rm ? undefined : textChild}
              className="mt-7 pl-5 border-l-2 border-rose-gold/50"
            >
              <p
                className="font-display italic text-plum/70 leading-snug"
                style={{ fontSize: "clamp(1.0625rem, 1.5vw, 1.125rem)" }}
              >
                &ldquo;Offer fewer things than you could, and do every one of them better
                than anyone else.&rdquo;
              </p>
              <footer className="mt-3 font-body text-xs tracking-[0.18em] uppercase text-charcoal/40">
                — Isabelle Laurent, Founder
              </footer>
            </motion.blockquote>

            {/* CTA row */}
            <motion.div
              variants={rm ? undefined : textChild}
              className="mt-7 flex flex-wrap items-center gap-5"
            >
              <Link
                href="/about"
                className="btn-ghost text-[0.8rem] text-plum border-plum/25 hover:border-plum/55 hover:bg-plum/5 px-7 py-3.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-gold"
              >
                Our Full Story
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden>
                  <path d="M1 4H11M8 1L11 4L8 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/booking"
                className="btn-primary px-7 py-3.5 text-[0.8rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-gold"
              >
                Book a Visit
              </Link>
            </motion.div>
          </motion.div>

          {/* ═══ RIGHT — Image with rose-gold border treatment ═══ */}
          <motion.div
            initial={rm ? undefined : { opacity: 0, x: 40 }}
            whileInView={rm ? undefined : { opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="relative lg:sticky lg:top-32 w-full lg:w-[380px] xl:w-[420px] shrink-0"
          >
            {/* Offset decorative shadow-frame behind the image */}
            <div
              className="absolute inset-0 rounded-[28px] translate-x-4 translate-y-4 pointer-events-none"
              style={{
                background:
                  "linear-gradient(145deg, rgba(200,149,108,0.28) 0%, rgba(200,149,108,0.06) 100%)",
                border: "1px solid rgba(200,149,108,0.22)",
              }}
              aria-hidden
            />

            {/* Main image frame with rose-gold ring */}
            <div
              className="relative rounded-[24px] overflow-hidden"
              style={{
                boxShadow: `
                  0 0 0 1px rgba(200,149,108,0.55),
                  0 0 0 4px rgba(200,149,108,0.07),
                  0 24px 48px rgba(28,11,46,0.18),
                  0 4px 12px rgba(28,11,46,0.1)
                `,
              }}
            >
              {/* Founder portrait */}
              <div className="aspect-[3/4] w-full relative">
                <Image
                  src={assetPath("/images/about-founder.jpg")}
                  alt="Isabelle Laurent, Founder and Creative Director of Luxe Beauty Lounge"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover object-top"
            unoptimized
                />

                {/* Name plate gradient */}
                <div
                  className="absolute bottom-0 inset-x-0 p-6"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(28,11,46,0.88) 0%, rgba(28,11,46,0.4) 65%, transparent 100%)",
                  }}
                >
                  <p className="font-display text-lg font-light text-ivory leading-tight">
                    Isabelle Laurent
                  </p>
                  <p className="font-body text-[0.72rem] tracking-[0.16em] uppercase text-champagne/55 mt-1">
                    Founder &amp; Creative Director
                  </p>
                </div>
              </div>
            </div>

            {/* Floating stats chip — bottom-left overflow */}
            <motion.div
              initial={rm ? undefined : { opacity: 0, y: 16, x: -8 }}
              whileInView={rm ? undefined : { opacity: 1, y: 0, x: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
              className="absolute -bottom-6 -left-6 rounded-[14px] py-4 px-5 z-10"
              style={{
                background: "rgba(28,11,46,0.92)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(200,149,108,0.22)",
                boxShadow: "0 8px 24px rgba(28,11,46,0.35)",
              }}
            >
              <p
                className="font-display font-light text-ivory leading-none"
                style={{ fontSize: "1.9rem" }}
              >
                12+
              </p>
              <p className="font-body text-[0.68rem] text-ivory/50 mt-1.5 leading-snug max-w-[110px]">
                Years of mastery in luxury beauty
              </p>
            </motion.div>

            {/* Corner bracket accent — top right of frame */}
            <motion.div
              initial={rm ? undefined : { opacity: 0, scale: 0.8 }}
              whileInView={rm ? undefined : { opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute -top-5 -right-5 w-14 h-14 pointer-events-none"
              aria-hidden
            >
              <div className="absolute top-0 right-0 w-full h-px bg-rose-gold/50" />
              <div className="absolute top-0 right-0 w-px h-full bg-rose-gold/50" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-rose-gold translate-x-[3px] -translate-y-[3px]" />
            </motion.div>
          </motion.div>

        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-champagne-dark/60 to-transparent" aria-hidden />
      {/* Section blend — fades into GalleryPreview warm bg */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{ background: "linear-gradient(to top, #EDE8E0 0%, transparent 100%)" }}
        aria-hidden
      />
    </section>
  );
}
