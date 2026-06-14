"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { assetPath } from "@/lib/assetPath";

const EASE: [number, number, number, number] = [0.25, 0, 0, 1];

const LINE_1 = ["Beauty", "that"];
const LINE_2 = ["demands", "to", "be", "noticed."];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "40%"]
  );
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "15%"]
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#100620" }}
      aria-labelledby="hero-headline"
    >
      {/* ── Background: video on desktop, photo fallback on mobile ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 will-change-transform"
        aria-hidden
      >
        {/* Static photo — always present, video overlays it on desktop */}
        <Image
          src={assetPath("/images/hero-bg.jpg")}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
            unoptimized
        />

        {/* Video loop — desktop only (autoplay unreliable on iOS) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden
        >
          <source src="/video/hero-loop.mp4" type="video/mp4" />
        </video>

        {/* Deep plum color wash — blends photo into brand palette */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(16,6,32,0.52)", mixBlendMode: "multiply" }}
        />

        {/* Left-side gradient — darkens behind the text card */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(105deg, rgba(16,6,32,0.75) 0%, rgba(16,6,32,0.35) 55%, transparent 100%)",
          }}
        />

        {/* Top vignette — navbar readability */}
        <div
          className="absolute inset-x-0 top-0 h-48"
          style={{ background: "linear-gradient(to bottom, rgba(16,6,32,0.7) 0%, transparent 100%)" }}
        />

        {/* Bottom vignette — smooth transition to next section */}
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: "linear-gradient(to top, rgba(16,6,32,0.65) 0%, transparent 100%)" }}
        />
        {/* Section blend — fades into BrandStatement ivory */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
          style={{ background: "linear-gradient(to top, #FAF7F2 0%, transparent 100%)" }}
          aria-hidden
        />

        {/* Noise grain for photographic texture */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />
      </motion.div>

      {/* ── Decorative geometry ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.9, ease: EASE }}
          className="absolute left-8 md:left-14 top-1/2 -translate-y-1/2 h-28 w-px origin-top"
          style={{ background: "linear-gradient(to bottom, transparent, #C8956C 40%, #C8956C 60%, transparent)" }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute top-28 right-8 md:right-14 w-12 h-12"
        >
          <div className="absolute top-0 right-0 w-full h-px bg-rose-gold/30" />
          <div className="absolute top-0 right-0 w-px h-full bg-rose-gold/30" />
        </motion.div>
      </div>

      {/* ── Content ── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 w-full container-luxury pt-28 pb-16 md:pt-36 md:pb-24"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="w-6 h-px bg-rose-gold" />
          <p className="font-body text-[0.7rem] tracking-[0.35em] uppercase text-rose-gold">
            Luxury Day Spa &amp; Salon
          </p>
        </motion.div>

        {/* Frosted glass card */}
        <div
          className="rounded-2xl p-6 sm:p-10 md:p-16 max-w-3xl"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px) saturate(140%)",
            WebkitBackdropFilter: "blur(20px) saturate(140%)",
            border: "1px solid rgba(200,149,108,0.15)",
            boxShadow: "0 0 0 0.5px rgba(245,230,200,0.04) inset, 0 32px 64px rgba(28,11,46,0.5)",
          }}
        >
          {/* Word-by-word headline */}
          <h1
            id="hero-headline"
            className="font-display font-light text-ivory leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}
            aria-label="Beauty that demands to be noticed."
          >
            {/* Line 1 */}
            <span className="block overflow-hidden">
              {LINE_1.map((word, i) => (
                <motion.span
                  key={word + i}
                  className="inline-block mr-[0.25em]"
                  initial={shouldReduceMotion ? false : { y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.35 + i * 0.1 }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            {/* Line 2 — "demands" gets the gradient, rest is ivory/90 */}
            <span className="block overflow-hidden mt-1">
              {LINE_2.map((word, i) => {
                const globalIndex = LINE_1.length + i;
                const isAccent = word === "demands";
                return (
                  <motion.span
                    key={word + i}
                    className="inline-block mr-[0.25em]"
                    initial={shouldReduceMotion ? false : { y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.35 + globalIndex * 0.1 }}
                    style={
                      isAccent
                        ? {
                            background: "linear-gradient(135deg, #F5E6C8 0%, #C8956C 55%, #E8D0A0 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }
                        : { color: "rgba(250,247,242,0.88)" }
                    }
                  >
                    {word}
                  </motion.span>
                );
              })}
            </span>
          </h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
            className="mt-10 mb-8 flex items-center gap-3 origin-left"
            aria-hidden
          >
            <div className="h-px w-10 bg-rose-gold/50" />
            <div className="w-1 h-1 rounded-full bg-rose-gold/60" />
          </motion.div>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15, ease: EASE }}
            className="font-body text-ivory/60 leading-[1.75] max-w-lg"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)" }}
          >
            An elevated experience for those who understand that the details
            matter, and who refuse to settle for anything less.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3, ease: EASE }}
            className="mt-10 flex flex-col sm:flex-row gap-3"
          >
            <HeroCTA href="/booking" primary>
              Reserve Your Visit
            </HeroCTA>
            <HeroCTA href="/services">
              Explore Services
            </HeroCTA>
          </motion.div>
        </div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-10 font-body text-xs tracking-[0.2em] text-ivory/28"
        >
          Westfield, NJ &nbsp;·&nbsp; By appointment
        </motion.p>
      </motion.div>

    </section>
  );
}

function HeroCTA({
  href,
  primary = false,
  children,
}: {
  href: string;
  primary?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={
        primary
          ? "btn-primary px-7 py-3.5 sm:px-8 sm:py-4 text-[0.78rem] sm:text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
          : "btn-ghost inline-flex items-center gap-2 text-[0.78rem] sm:text-sm text-ivory/80 hover:text-ivory border-ivory/30 hover:border-ivory/55 hover:bg-ivory/5 px-7 py-3.5 sm:px-8 sm:py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
      }
    >
      {children}
      {primary && (
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
          <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </Link>
  );
}
