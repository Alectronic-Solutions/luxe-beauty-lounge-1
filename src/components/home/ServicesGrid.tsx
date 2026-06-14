"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { staggerContainer, viewportOnce } from "@/lib/animations";
import { assetPath } from "@/lib/assetPath";

const EASE: [number, number, number, number] = [0.25, 0, 0, 1];

/* Per-service visual design tokens */
const SERVICE_THEME: Record<
  string,
  {
    bg: string;
    accent: string;
    icon: React.ReactNode;
    photo: string;
    photoOpacity?: number;
  }
> = {
  "signature-facial": {
    bg: "linear-gradient(145deg, rgba(28,11,46,0.82) 0%, rgba(46,18,73,0.75) 50%, rgba(28,11,46,0.88) 100%)",
    accent: "#C8956C",
    photo: assetPath("/images/services-signature-facial.jpg"),
    photoOpacity: 0.55,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="9" r="4" stroke="rgba(245,230,200,0.5)" strokeWidth="1.2" />
        <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="rgba(245,230,200,0.3)" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="rgba(200,149,108,0.35)" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  "balayage-color": {
    bg: "linear-gradient(145deg, rgba(26,26,26,0.78) 0%, rgba(45,32,32,0.72) 55%, rgba(26,18,16,0.85) 100%)",
    accent: "#E8C49A",
    photo: assetPath("/images/services-balayage.jpg"),
    photoOpacity: 0.5,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 20C4 20 6 14 8 11C10 8 12 6 14 5C16 4 18 4.5 19 6C20 7.5 19.5 10 17 12C15 14 12 15 10 17C8 19 8 21 8 21" stroke="rgba(245,230,200,0.45)" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M9 11.5C11 9.5 14 8.5 16 9" stroke="rgba(200,149,108,0.5)" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  "bridal-packages": {
    bg: "linear-gradient(145deg, rgba(200,149,108,0.72) 0%, rgba(168,117,80,0.78) 40%, rgba(80,40,20,0.88) 100%)",
    accent: "#FAF7F2",
    photo: assetPath("/images/services-bridal.jpg"),
    photoOpacity: 0.45,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 2L13.5 8H20L14.5 11.5L16.5 18L12 14L7.5 18L9.5 11.5L4 8H10.5L12 2Z" stroke="rgba(250,247,242,0.6)" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    ),
  },
  "brow-lash": {
    bg: "linear-gradient(145deg, rgba(46,18,73,0.80) 0%, rgba(28,11,46,0.82) 60%, rgba(14,5,23,0.90) 100%)",
    accent: "#F5E6C8",
    photo: assetPath("/images/services-brow-lash.jpg"),
    photoOpacity: 0.45,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M3 9C7 6 11 6 15 8C19 10 21 9 21 9" stroke="rgba(245,230,200,0.5)" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M6 14C6 14 8 11.5 12 11.5C16 11.5 18 14 18 14" stroke="rgba(200,149,108,0.5)" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="12" cy="14" r="1.5" fill="rgba(200,149,108,0.4)" />
      </svg>
    ),
  },
  "body-treatments": {
    bg: "linear-gradient(145deg, rgba(42,26,14,0.75) 0%, rgba(26,16,8,0.80) 60%, rgba(13,8,4,0.90) 100%)",
    accent: "#C8956C",
    photo: assetPath("/images/services-body-treatments.jpg"),
    photoOpacity: 0.5,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 4C12 4 8 6 7 10C6 14 8 16 8 16C8 16 10 18 12 18C14 18 16 16 16 16C16 16 18 14 17 10C16 6 12 4 12 4Z" stroke="rgba(245,230,200,0.45)" strokeWidth="1.2" />
        <path d="M12 8v4" stroke="rgba(200,149,108,0.5)" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  "nail-artistry": {
    bg: "linear-gradient(145deg, rgba(139,74,42,0.75) 0%, rgba(200,149,108,0.70) 50%, rgba(100,60,30,0.88) 100%)",
    accent: "#FAF7F2",
    photo: assetPath("/images/services-nail-artistry.jpg"),
    photoOpacity: 0.5,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M8 20C8 20 7 15 9 11C11 7 14 6 16 7C18 8 18 11 16 14C14 17 10 18 8 20Z" stroke="rgba(250,247,242,0.6)" strokeWidth="1.2" />
        <path d="M11 14C12.5 12 15 11 16 11.5" stroke="rgba(250,247,242,0.35)" strokeWidth="0.9" strokeLinecap="round" />
      </svg>
    ),
  },
};

/* ── Small Service Card ── */
function ServiceCard({
  service,
  index,
  fixedHeight = "clamp(160px, 22vw, 220px)",
  fullWidth = false,
}: {
  service: (typeof SERVICES)[number];
  index: number;
  fixedHeight?: string;
  fullWidth?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const theme = SERVICE_THEME[service.id];
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.55,
            delay: index * 0.08,
            ease: EASE,
          },
        },
      } satisfies Variants}
      className={fullWidth ? "w-full" : ""}
    >
      <Link
        href={`/services#${service.id}`}
        className="group block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-gold rounded-card"
        aria-label={`${service.name} — ${service.tagline}. From ${service.priceFrom}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <article
          className="relative rounded-card overflow-hidden flex flex-col justify-between p-6"
          style={{ height: fixedHeight }}
        >
          {/* Photo layer */}
          <Image
            src={theme.photo}
            alt=""
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            style={{ opacity: theme.photoOpacity ?? 0.5 }}
            aria-hidden
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{ background: theme.bg }} aria-hidden />
          {/* Glow orb */}
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : hovered
                ? { opacity: 0.4, scale: 1.2 }
                : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute -top-8 -right-8 w-36 h-36 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${theme.accent} 0%, transparent 70%)`,
              filter: "blur(24px)",
            }}
            aria-hidden
          />

          {/* Top section */}
          <div className="relative z-10 flex items-start justify-between gap-2">
            <div>
              <span className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-champagne/65">
                {service.category}
              </span>
              <h3
                className="font-display font-light text-ivory mt-1.5 leading-tight"
                style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.75rem)" }}
              >
                {service.name}
              </h3>
            </div>
            <div className="shrink-0 mt-0.5 text-ivory/20 group-hover:text-ivory/40 transition-colors duration-300">
              {theme.icon}
            </div>
          </div>

          {/* Hover reveal — both states always in DOM, no layout shift */}
          <div className="relative z-10 flex-1">
            {/* Tagline — fades out on hover */}
            <p
              className="font-display italic text-ivory/65 text-sm mt-2 transition-opacity duration-200"
              style={{ opacity: hovered ? 0 : 1 }}
              aria-hidden={hovered}
            >
              {service.tagline}
            </p>
            {/* Expanded — fades + slides in on hover, absolute so it doesn't push layout */}
            <div
              className="absolute bottom-0 left-0 right-0 transition-all duration-300"
              style={{
                opacity: hovered ? 1 : 0,
                transform: hovered ? "translateY(0)" : (shouldReduceMotion ? "translateY(0)" : "translateY(10px)"),
                pointerEvents: hovered ? "auto" : "none",
              }}
              aria-hidden={!hovered}
            >
              <p className="font-body text-[0.8rem] text-ivory/75 leading-relaxed mb-3">
                {service.description}
              </p>
              <div className="flex items-center justify-between">
                <p
                  className="font-display font-light text-champagne"
                  style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}
                >
                  {service.priceFrom}
                </p>
                <span className="font-body text-[0.7rem] text-ivory/65 tracking-wider">
                  {service.duration}
                </span>
              </div>
            </div>
          </div>

          {/* Hover border */}
          <motion.div
            animate={hovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-card pointer-events-none"
            style={{
              boxShadow: `inset 0 0 0 1px rgba(200,149,108,0.2)`,
            }}
            aria-hidden
          />
        </article>
      </Link>
    </motion.div>
  );
}

/* ── Main export ── */
export function ServicesGrid() {
  const rest = SERVICES.slice(1);

  return (
    <section
      className="section-py relative overflow-hidden"
      aria-label="Services"
      style={{ background: "#F0EBE0" }}
    >
      {/* Section blend — bottom fades into AboutPreview ivory */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 z-20"
        style={{ background: "linear-gradient(to top, #FAF7F2 0%, transparent 100%)" }}
        aria-hidden
      />
      {/* Marble texture — very subtle, tinted out by the ivory overlay */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <Image
          src={assetPath("/images/services-hero.jpg")}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.07] mix-blend-multiply"
            unoptimized
        />
      </div>
      <div className="container-luxury relative z-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5 }}
              className="font-body text-[0.7rem] tracking-[0.3em] uppercase text-rose-gold mb-3"
            >
              What We Do
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.25, 0, 0, 1] }}
              className="font-display font-light text-plum text-balance leading-[1.0]"
              style={{ fontSize: "clamp(2.25rem, 4.5vw, 4rem)" }}
            >
              Services designed for
              <br className="hidden md:block" />
              {" "}discerning taste
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.3 }}
            whileHover={{ x: 2 }}
          >
            <Link
              href="/services"
              className="group/svc inline-flex items-center gap-2 font-body text-[0.78rem] tracking-[0.14em] uppercase text-plum/80 hover:text-plum border-b border-plum/30 hover:border-plum/60 pb-0.5 transition-all duration-300"
            >
              Full service menu
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden className="transition-transform duration-200 group-hover/svc:translate-x-1">
                <path d="M1 4H11M8 1L11 4L8 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/*
          MOBILE: featured full-width tall, then 2-col grid of 5 equal cards
          DESKTOP: bento — featured 2×2 top-left, 2 cards top-right, 3 cards bottom row
        */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          style={{ gridTemplateRows: "auto" }}
        >
          {/* Featured — full width on mobile, 2×2 on desktop */}
          <div className="col-span-2 md:col-span-2 md:row-span-2">
            <Link
              href="/services#signature-facial"
              className="group block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-gold rounded-card-lg"
              aria-label={`${SERVICES[0].name} — ${SERVICES[0].tagline}. From ${SERVICES[0].priceFrom}`}
            >
              <article className="relative rounded-card-lg overflow-hidden flex flex-col justify-between p-7 md:p-10"
                style={{ height: "100%", minHeight: "clamp(260px, 50vw, 520px)" }}
              >
                <Image
                  src={SERVICE_THEME["signature-facial"].photo}
                  alt=""
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  style={{ opacity: SERVICE_THEME["signature-facial"].photoOpacity ?? 0.5 }}
                  aria-hidden
                />
                <div className="absolute inset-0" style={{ background: SERVICE_THEME["signature-facial"].bg }} aria-hidden />
                <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full pointer-events-none transition-all duration-700 group-hover:scale-125 group-hover:opacity-30 opacity-15"
                  style={{ background: "radial-gradient(circle,#C8956C 0%,transparent 70%)", filter: "blur(40px)" }} aria-hidden />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity duration-700"
                  style={{ background: "radial-gradient(circle,#F5E6C8 0%,transparent 70%)", filter: "blur(48px)" }} aria-hidden />
                <div className="flex items-start justify-between relative z-10">
                  <div>
                    <span className="font-body text-[0.65rem] tracking-[0.28em] uppercase text-rose-gold/80">{SERVICES[0].category}</span>
                    <div className="mt-1"><span className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-champagne/65">Featured Service</span></div>
                  </div>
                  <span className="font-body text-[0.7rem] tracking-wider text-ivory/65 border border-ivory/25 rounded-pill px-3 py-1">{SERVICES[0].duration}</span>
                </div>
                <div className="relative z-10 mt-3 text-ivory/20">{SERVICE_THEME["signature-facial"].icon}</div>
                <div className="relative z-10 flex-1 flex flex-col justify-center py-4">
                  <h3 className="font-display font-light italic text-ivory leading-[1.0]" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
                    {SERVICES[0].name}
                  </h3>
                  <p className="font-display italic text-rose-gold/80 mt-1.5" style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.25rem)" }}>
                    {SERVICES[0].tagline}
                  </p>
                  <p className="mt-4 font-body font-light text-ivory/60 leading-[1.75] max-w-md hidden sm:block" style={{ fontSize: "clamp(0.875rem, 1.1vw, 1rem)" }}>
                    {SERVICES[0].description}
                  </p>
                </div>
                <div className="relative z-10 flex items-end justify-between pt-5 border-t border-ivory/10">
                  <div>
                    <p className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-ivory/60 mb-1">Starting from</p>
                    <p className="font-display font-light text-champagne" style={{ fontSize: "clamp(1.35rem, 2.5vw, 2rem)" }}>{SERVICES[0].priceFrom}</p>
                  </div>
                  <div className="flex items-center gap-2 text-ivory/50 group-hover:text-ivory transition-colors duration-300">
                    <span className="font-body text-sm tracking-wider hidden sm:inline">Book now</span>
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
                      <path d="M1 6H15M10 1L15 6L10 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-card-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(200,149,108,0.25), 0 0 60px rgba(200,149,108,0.08)" }} aria-hidden />
                <div className="absolute inset-0 rounded-card-lg overflow-hidden pointer-events-none" aria-hidden>
                  <div className="featured-shimmer absolute inset-y-0 w-1/3" style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(245,230,200,0.06) 50%, transparent 100%)",
                    transform: "skewX(-12deg)",
                  }} />
                </div>
              </article>
            </Link>
          </div>

          {/* Cards B & C — right column top two on desktop, 2-col on mobile */}
          <ServiceCard service={rest[0]} index={0} fixedHeight="clamp(160px, 25vw, 250px)" />
          <ServiceCard service={rest[1]} index={1} fixedHeight="clamp(160px, 25vw, 250px)" />

          {/* Bottom row — 3 equal cards on desktop, 2-col + full-width on mobile */}
          <ServiceCard service={rest[2]} index={2} fixedHeight="clamp(160px, 22vw, 220px)" />
          <ServiceCard service={rest[3]} index={3} fixedHeight="clamp(160px, 22vw, 220px)" />
          <div className="col-span-2 md:col-span-1">
            <ServiceCard service={rest[4]} index={4} fixedHeight="clamp(160px, 22vw, 220px)" fullWidth />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center font-body text-xs tracking-[0.15em] text-charcoal/35 uppercase"
        >
          All services include a complimentary consultation
        </motion.p>
      </div>
    </section>
  );
}
