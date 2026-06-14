"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface PageHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  /** Extra content rendered below subtitle, e.g. stats or CTA */
  children?: React.ReactNode;
}

export function PageHeader({ eyebrow, title, subtitle, children }: PageHeaderProps) {
  const rm = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#1C0B2E", paddingTop: "clamp(7rem,14vw,11rem)", paddingBottom: "clamp(3.5rem,7vw,5.5rem)" }}
      aria-label="Page header"
    >
      {/* Ambient mesh — lightweight version of hero blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.09]"
          style={{ background: "radial-gradient(circle, #C8956C 0%, transparent 70%)", filter: "blur(72px)" }}
        />
        <div
          className="absolute -bottom-1/3 -left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #F5E6C8 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />
      </div>

      {/* Left accent rule */}
      <motion.div
        initial={rm ? undefined : { scaleY: 0, opacity: 0 }}
        animate={rm ? undefined : { scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        className="pointer-events-none absolute left-8 md:left-14 top-1/2 -translate-y-1/2 h-20 w-px origin-top"
        style={{ background: "linear-gradient(to bottom, transparent, #C8956C 40%, #C8956C 60%, transparent)" }}
        aria-hidden
      />

      <div className="container-luxury relative">
        <motion.p
          initial={rm ? undefined : { opacity: 0, y: 14 }}
          animate={rm ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-body text-[0.68rem] tracking-[0.32em] uppercase text-rose-gold mb-5 flex items-center gap-3"
        >
          <span className="w-5 h-px bg-rose-gold/60" aria-hidden />
          {eyebrow}
        </motion.p>

        <motion.h1
          initial={rm ? undefined : { opacity: 0, y: 28 }}
          animate={rm ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: EASE }}
          className="font-display font-light text-ivory text-balance max-w-3xl"
          style={{ fontSize: "clamp(2.25rem, 5.5vw, 5rem)", lineHeight: 1.06, letterSpacing: "-0.015em" }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={rm ? undefined : { opacity: 0, y: 18 }}
            animate={rm ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 font-body font-light text-ivory/55 leading-[1.8] max-w-xl"
            style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)" }}
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={rm ? undefined : { opacity: 0, y: 14 }}
            animate={rm ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.5 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Bottom fade into next section */}
      <div
        className="pointer-events-none absolute bottom-0 inset-x-0 h-16"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(28,11,46,0.25))" }}
        aria-hidden
      />
    </section>
  );
}
