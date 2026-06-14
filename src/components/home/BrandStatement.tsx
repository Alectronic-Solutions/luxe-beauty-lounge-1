"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { viewportOnce } from "@/lib/animations";

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 32, skewY: 1 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      duration: 0.75,
      delay: i * 0.12,
      ease: [0.25, 0, 0, 1] as [number, number, number, number],
    },
  }),
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: 0.55 + i * 0.14,
      ease: [0.25, 0, 0, 1] as [number, number, number, number],
    },
  }),
};

/* Animated counter that counts up once when it enters the viewport */
function CountUp({
  target,
  suffix = "",
  duration = 1800,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const rm = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (rm) { setCount(target); return; }

    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration, rm]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const STATS = [
  { num: 12, suffix: "+", label: "Years of craft" },
  { num: 800, suffix: "+", label: "Clients served" },
  { num: 6, suffix: "", label: "Signature services" },
] as const;

const PILLARS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M3 17c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    title: "Individual focus",
    body: "Your face, your hair, your life. Every service starts with genuine listening.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M10 2l1.47 5.53H17l-4.47 3.25 1.71 5.22L10 12.56l-4.24 3.44 1.71-5.22L3 7.53h5.53L10 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    ),
    title: "Exacting standards",
    body: "Certifications renewed annually. Product knowledge updated every season.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M4 10h12M10 4v12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <rect x="2" y="2" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    title: "Nothing formulaic",
    body: "No menu-driven protocols. What works for one client may not work for another.",
  },
] as const;

export function BrandStatement() {
  const rm = useReducedMotion();

  const wordProps = (i: number) =>
    rm
      ? {}
      : {
          custom: i,
          variants: wordVariants,
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: viewportOnce,
        };

  const lineProps = (i: number) =>
    rm
      ? {}
      : {
          custom: i,
          variants: lineVariants,
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: viewportOnce,
        };

  return (
    <section
      className="relative bg-ivory overflow-hidden section-py"
      aria-label="Brand philosophy"
      style={{ position: "relative" }}
    >
      {/* Faint background watermark */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.025]"
        aria-hidden
      >
        <span
          className="font-display font-light text-plum select-none"
          style={{ fontSize: "clamp(14rem, 35vw, 28rem)", lineHeight: 1 }}
        >
          L
        </span>
      </div>

      {/* Section blend — bottom fades into ServicesGrid warm bg */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 z-10"
        style={{ background: "linear-gradient(to top, #F0EBE0 0%, transparent 100%)" }}
        aria-hidden
      />

      <div className="container-luxury relative">
        {/* Eyebrow row */}
        <motion.div
          initial={rm ? undefined : { opacity: 0, y: 16 }}
          whileInView={rm ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex items-center justify-center gap-5 mb-8"
        >
          <motion.div
            initial={rm ? undefined : { scaleX: 0 }}
            whileInView={rm ? undefined : { scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="h-px w-16 bg-gradient-to-r from-transparent to-rose-gold/60 origin-right"
          />
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="text-rose-gold flex-none"
            aria-hidden
          >
            <path
              d="M9 1L10.47 6.53H16.18L11.35 9.97L12.82 15.5L9 12.06L5.18 15.5L6.65 9.97L1.82 6.53H7.53L9 1Z"
              fill="currentColor"
              fillOpacity="0.9"
            />
          </svg>
          <span className="font-body text-[0.68rem] tracking-[0.32em] uppercase text-rose-gold">
            Our Philosophy
          </span>
          <motion.div
            initial={rm ? undefined : { scaleX: 0 }}
            whileInView={rm ? undefined : { scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="h-px w-16 bg-gradient-to-l from-transparent to-rose-gold/60 origin-left"
          />
        </motion.div>

        {/* Main statement */}
        <div className="text-center max-w-5xl mx-auto">
          <h2
            className="font-display font-light leading-[1.08] text-plum"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)" }}
          >
            <span className="block overflow-hidden pb-1">
              <motion.span className="inline-block" {...wordProps(0)}>
                We believe beauty
              </motion.span>{" "}
              <motion.span className="inline-block" {...wordProps(1)}>
                is not a transformation.
              </motion.span>
            </span>

            <span className="block overflow-hidden mt-1">
              <motion.span
                className="inline-block italic"
                {...wordProps(2)}
                style={{
                  background:
                    "linear-gradient(120deg, #C8956C 0%, #E8C49A 45%, #C8956C 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                It is a revelation.
              </motion.span>
            </span>
          </h2>

          {/* Sub-copy */}
          <motion.p
            {...lineProps(0)}
            className="mt-6 mx-auto max-w-2xl font-body font-light leading-[1.85] text-charcoal/60"
            style={{ fontSize: "clamp(1rem, 1.4vw, 1.125rem)" }}
          >
            Every service begins with listening. We study your skin, your hair, your life
            and then we work with extraordinary precision to show you what was always there.
            No masks. No artifice.{" "}
            <em className="not-italic text-charcoal/90 font-normal">
              Just you, more fully realized.
            </em>
          </motion.p>

          {/* Three pillars */}
          <motion.div
            {...lineProps(1)}
            className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-3xl mx-auto"
          >
            {PILLARS.map((p) => (
              <motion.div
                key={p.title}
                whileHover={rm ? undefined : { y: -4, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } }}
                className="group flex flex-col gap-3 p-5 rounded-[18px] transition-all duration-300 hover:bg-champagne/40 cursor-default"
                style={{ border: "1px solid transparent" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.border = "1px solid rgba(200,149,108,0.18)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(28,11,46,0.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.border = "1px solid transparent"; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-rose-gold bg-rose-gold/10 group-hover:bg-rose-gold/22 transition-colors duration-300 group-hover:scale-110" style={{ transition: "background 300ms,transform 220ms" }}>
                  {p.icon}
                </div>
                <p className="font-display font-light text-plum text-lg leading-tight">{p.title}</p>
                <p className="font-body text-[0.82rem] text-charcoal/55 leading-[1.7]">{p.body}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Animated stats */}
          <motion.div
            {...lineProps(2)}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-0"
          >
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex sm:contents items-center gap-8 sm:gap-0">
                <div className="text-center px-10">
                  <p
                    className="font-display font-light text-plum"
                    style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                  >
                    <CountUp target={stat.num} suffix={stat.suffix} />
                  </p>
                  <p className="font-body text-xs tracking-[0.18em] uppercase text-charcoal/40 mt-1">
                    {stat.label}
                  </p>
                </div>
                {i < 2 && (
                  <div className="hidden sm:block w-px h-10 bg-champagne-dark" aria-hidden />
                )}
              </div>
            ))}
          </motion.div>

          {/* Ornamental rule */}
          <motion.div
            {...lineProps(3)}
            className="mt-10 flex items-center justify-center gap-6"
            aria-hidden
          >
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-champagne-dark" />
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-rose-gold/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-rose-gold/70" />
              <div className="w-1 h-1 rounded-full bg-rose-gold/40" />
            </div>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-champagne-dark" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
