"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { assetPath } from "@/lib/assetPath";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { HERO_VIDEOS } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.25, 0, 0, 1];

const LINE_1 = ["Beauty", "that"];
const LINE_2 = ["demands", "to", "be", "noticed."];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeVideo, setActiveVideo] = useState(0);
  // Videos are only mounted after this flips true, so the poster photo is the
  // LCP, and we never autoplay under reduced-motion or Data Saver.
  const [allowVideo, setAllowVideo] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    setAllowVideo(true);
  }, [shouldReduceMotion]);

  // Restart a clip from the top when it becomes active (not on pause/resume).
  useEffect(() => {
    if (!allowVideo) return;
    const active = videoRefs.current[activeVideo];
    if (active) active.currentTime = 0;
  }, [activeVideo, allowVideo]);

  // Play the active clip and pause the rest; respect the pause control.
  useEffect(() => {
    if (!allowVideo) return;
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === activeVideo && !paused) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeVideo, allowVideo, paused]);

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
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      style={{ background: "#100620" }}
      aria-labelledby="hero-headline"
    >
      {/* ── Background photo with parallax ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 will-change-transform"
        aria-hidden
      >
        {/* Static photo background */}
        <Image
          src={assetPath("/images/hero-bg.webp")}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          unoptimized
        />

        {/* Video crossfade, mounted only when motion is allowed (not under
            reduced-motion / Data Saver). The poster photo above is the LCP. */}
        {allowVideo && (
          <div className="absolute inset-0" aria-hidden>
            {HERO_VIDEOS.map((src, i) => (
              <motion.video
                key={src}
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                autoPlay
                muted
                playsInline
                poster={assetPath("/images/hero-bg.webp")}
                preload={i === 0 ? "auto" : "none"}
                onEnded={() =>
                  setActiveVideo((prev) => (prev + 1) % HERO_VIDEOS.length)
                }
                className="absolute inset-0 w-full h-full object-cover object-center"
                animate={{ opacity: i === activeVideo ? 1 : 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 1.2,
                  ease: EASE,
                }}
              >
                <source src={assetPath(src)} type="video/mp4" />
              </motion.video>
            ))}
          </div>
        )}

        {/* Deep plum color wash, blends photo into brand palette */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(16,6,32,0.52)", mixBlendMode: "multiply" }}
        />

        {/* Left-side gradient, darkens behind the text card */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(105deg, rgba(16,6,32,0.75) 0%, rgba(16,6,32,0.35) 55%, transparent 100%)",
          }}
        />

        {/* Top vignette, navbar readability */}
        <div
          className="absolute inset-x-0 top-0 h-48"
          style={{ background: "linear-gradient(to bottom, rgba(16,6,32,0.7) 0%, transparent 100%)" }}
        />

        {/* Bottom vignette, smooth transition to next section */}
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: "linear-gradient(to top, rgba(16,6,32,0.65) 0%, transparent 100%)" }}
        />
        {/* Section blend, fades into BrandStatement ivory */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
          style={{ background: "linear-gradient(to top, #FAF7F2 0%, transparent 100%)" }}
          aria-hidden
        />

        {/* Noise grain for photographic texture */}
        <NoiseOverlay />
      </motion.div>

      {/* ── Decorative geometry ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.9, ease: EASE }}
          className="absolute hidden md:block left-14 top-1/2 -translate-y-1/2 h-28 w-px origin-top"
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
        // paddingTop clears the fixed header (announcement + nav) at any size
        style={{ opacity: contentOpacity, y: contentY, paddingTop: "calc(var(--nav-h, 72px) + 1.5rem)" }}
        className="relative z-10 w-full container-luxury pb-20 md:pb-24"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="flex items-center gap-4 mb-8 sm:mb-12"
        >
          <div className="w-6 h-px bg-rose-gold" />
          <p className="font-body text-[0.7rem] tracking-[0.35em] uppercase text-rose-gold">
            Luxury Day Spa &amp; Salon
          </p>
        </motion.div>

        {/* Frosted glass card */}
        <div
          className="rounded-2xl p-5 sm:p-10 md:p-16 max-w-3xl"
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
            style={{ fontSize: "clamp(2.25rem, 12vw, 6rem)" }}
            aria-label="Beauty that demands to be noticed."
          >
            {/* Line 1 */}
            <span className="block overflow-hidden">
              {LINE_1.map((word, i) => (
                <motion.span
                  key={word + i}
                  className="inline-block mr-[0.25em]"
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.35 + i * 0.1 }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            {/* Line 2, "demands" gets the gradient, rest is ivory/90 */}
            <span className="block overflow-hidden mt-1">
              {LINE_2.map((word, i) => {
                const globalIndex = LINE_1.length + i;
                const isAccent = word === "demands";
                return (
                  <motion.span
                    key={word + i}
                    className="inline-block mr-[0.25em]"
                    initial={{ y: 60, opacity: 0 }}
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
            className="mt-6 mb-6 sm:mt-10 sm:mb-8 flex items-center gap-3 origin-left"
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
            className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3"
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
          className="mt-6 sm:mt-10 font-body text-xs tracking-[0.2em] text-ivory/55"
        >
          Westfield, NJ &nbsp;·&nbsp; By appointment
        </motion.p>
      </motion.div>

      {/* Pause/play control for the auto-playing background video (WCAG 2.2.2) */}
      {allowVideo && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? "Play background video" : "Pause background video"}
          className="absolute bottom-5 right-5 z-20 flex items-center justify-center w-10 h-10 rounded-full text-ivory/80 hover:text-ivory border border-ivory/25 hover:border-ivory/50 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
          style={{ background: "rgba(16,6,32,0.45)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
        >
          {paused ? (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden>
              <path d="M1 1l10 6-10 6z" />
            </svg>
          ) : (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden>
              <rect x="1" y="1" width="3.5" height="12" rx="1" />
              <rect x="7.5" y="1" width="3.5" height="12" rx="1" />
            </svg>
          )}
        </button>
      )}

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
          ? "btn-primary justify-center px-7 py-3.5 sm:px-8 sm:py-4 text-[0.78rem] sm:text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
          : "btn-ghost inline-flex items-center justify-center gap-2 text-[0.78rem] sm:text-sm text-ivory/80 hover:text-ivory border-ivory/30 hover:border-ivory/55 hover:bg-ivory/5 px-7 py-3.5 sm:px-8 sm:py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
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
