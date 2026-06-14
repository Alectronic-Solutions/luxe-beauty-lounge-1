"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { viewportOnce } from "@/lib/animations";

const EASE: [number, number, number, number] = [0.25, 0, 0, 1];

interface GalleryItem {
  id: number;
  label: string;
  category: string;
  aspectPct: string;
  bg: string;
  lightX: string;
  lightY: string;
  src?: string;
}

const ITEMS: GalleryItem[] = [
  { id: 1, label: "Signature Facial",  category: "Skin",        aspectPct: "133%", bg: "linear-gradient(155deg,#2e1249 0%,#1C0B2E 45%,#0e0517 100%)",   lightX: "40%", lightY: "35%", src: "/images/gallery/gallery-1.jpg" },
  { id: 2, label: "Balayage & Color",  category: "Hair",        aspectPct: "75%",  bg: "linear-gradient(145deg,#1a1010 0%,#2a1a0e 55%,#1a0c08 100%)",   lightX: "65%", lightY: "25%", src: "/images/gallery/gallery-2.jpg" },
  { id: 3, label: "Bridal Morning",    category: "Bridal",      aspectPct: "120%", bg: "linear-gradient(160deg,#8B4A2A 0%,#C8956C 40%,#A87550 100%)",   lightX: "50%", lightY: "20%", src: "/images/gallery/gallery-3.jpg" },
  { id: 4, label: "Brow Lamination",   category: "Brow & Lash", aspectPct: "100%", bg: "linear-gradient(150deg,#3d1a63 0%,#2e1249 50%,#1C0B2E 100%)",   lightX: "30%", lightY: "60%", src: "/images/gallery/gallery-4.jpg" },
  { id: 5, label: "Body Treatment",    category: "Body",        aspectPct: "145%", bg: "linear-gradient(165deg,#1a1a1a 0%,#2d1a10 50%,#120a06 100%)",   lightX: "55%", lightY: "40%", src: "/images/gallery/gallery-5.jpg" },
  { id: 6, label: "Nail Artistry",     category: "Nails",       aspectPct: "80%",  bg: "linear-gradient(135deg,#C8956C 0%,#8B4A2A 50%,#5a2e14 100%)",   lightX: "70%", lightY: "30%", src: "/images/gallery/gallery-6.jpg" },
  { id: 7, label: "Color Correction",  category: "Hair",        aspectPct: "110%", bg: "linear-gradient(155deg,#1C0B2E 0%,#3d1a2e 55%,#1a0a1a 100%)",   lightX: "45%", lightY: "45%", src: "/images/gallery/gallery-7.jpg" },
  { id: 8, label: "Lash Lift",         category: "Brow & Lash", aspectPct: "90%",  bg: "linear-gradient(140deg,#0e0517 0%,#2e1249 60%,#1C0B2E 100%)",   lightX: "60%", lightY: "20%", src: "/images/gallery/gallery-8.jpg" },
  { id: 9, label: "Gel Extensions",    category: "Nails",       aspectPct: "125%", bg: "linear-gradient(150deg,#E8C49A 0%,#C8956C 45%,#8B4A2A 100%)",   lightX: "35%", lightY: "30%", src: "/images/gallery/gallery-9.jpg" },
];

const CATEGORIES = ["All", "Skin", "Hair", "Bridal", "Brow & Lash", "Body", "Nails"] as const;
type Category = (typeof CATEGORIES)[number];

/* Per-card hover variants */
const overlayVariants: Variants = {
  rest:  { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};
const zoomVariants: Variants = {
  rest:  { scale: 1 },
  hover: { scale: 1.06, transition: { duration: 0.65, ease: EASE } },
};
const labelVariants: Variants = {
  rest:  { y: 10, opacity: 0 },
  hover: { y: 0, opacity: 1, transition: { duration: 0.3, ease: EASE } },
};
const badgeVariants: Variants = {
  rest:  { opacity: 1 },
  hover: { opacity: 0, transition: { duration: 0.2 } },
};

/* ── Individual gallery card ── */
function GalleryCard({
  item,
  index,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  onOpen: (item: GalleryItem) => void;
}) {
  const rm = useReducedMotion();

  return (
    <motion.div
      layout
      className="gallery-item mb-3 md:mb-4"
      initial={rm ? undefined : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.06, ease: EASE }}
    >
      <motion.div
        layoutId={`gallery-card-${item.id}`}
        className="relative overflow-hidden rounded-[18px] w-full cursor-zoom-in"
        style={{ paddingBottom: item.aspectPct }}
        initial="rest"
        whileHover={rm ? undefined : "hover"}
        animate="rest"
        onClick={() => onOpen(item)}
        role="button"
        aria-label={`View ${item.label} — ${item.category}`}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpen(item); }}
      >
        {/* Background: real photo or gradient fallback */}
        <motion.div
          variants={rm ? undefined : zoomVariants}
          className="absolute inset-0 will-change-transform"
          style={item.src ? undefined : { background: item.bg }}
        >
          {item.src ? (
            <Image
              src={item.src}
              alt={item.label}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover object-center"
            unoptimized
            />
          ) : (
            <>
              <div className="absolute inset-0" aria-hidden style={{ backgroundImage: `radial-gradient(ellipse at ${item.lightX} ${item.lightY},rgba(245,230,200,0.20) 0%,rgba(200,149,108,0.10) 30%,transparent 65%)` }} />
              <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "120px 120px" }} aria-hidden />
            </>
          )}
        </motion.div>

        {/* Hover overlay */}
        <motion.div
          variants={rm ? undefined : overlayVariants}
          className="absolute inset-0 flex flex-col justify-end p-5 pb-6"
          style={{ background: "linear-gradient(to top,rgba(28,11,46,0.82) 0%,rgba(28,11,46,0.30) 50%,transparent 100%)" }}
        >
          <motion.span variants={rm ? undefined : labelVariants} className="block font-body text-[0.62rem] tracking-[0.25em] uppercase text-rose-gold mb-1.5">
            {item.category}
          </motion.span>
          <motion.div variants={rm ? undefined : labelVariants} className="relative">
            <p className="font-display text-xl font-light text-ivory leading-tight">{item.label}</p>
            <span className="absolute -bottom-1 left-0 w-full h-px bg-rose-gold/70" />
          </motion.div>
          <motion.div variants={rm ? undefined : labelVariants} className="mt-3 flex items-center gap-1.5">
            <span className="font-body text-[0.7rem] tracking-widest uppercase text-ivory/60">View</span>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
              <path d="M1 5H13M9 1L13 5L9 9" stroke="rgba(245,230,200,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none" style={{ background: "linear-gradient(to top,rgba(28,11,46,0.35) 0%,transparent 100%)" }} aria-hidden />

        {/* Category badge */}
        <motion.div variants={rm ? undefined : badgeVariants} className="absolute top-4 left-4">
          <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase px-2.5 py-1 rounded-pill" style={{ background: "rgba(28,11,46,0.55)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", border: "1px solid rgba(200,149,108,0.15)", color: "rgba(245,230,200,0.7)" }}>
            {item.category}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ── Lightbox ── */
function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  return (
    <motion.div
      key="lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
      style={{ background: "rgba(28,11,46,0.88)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Lightbox: ${item.label}`}
    >
      <motion.div
        layoutId={`gallery-card-${item.id}`}
        className="relative rounded-[20px] overflow-hidden w-full max-w-2xl"
        style={{ maxHeight: "80vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full" style={{ paddingBottom: "66.67%", background: item.bg, position: "relative" }}>
          {item.src ? (
            <Image src={item.src} alt={item.label} fill sizes="80vw" className="object-cover object-center"
            unoptimized />
          ) : (
            <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(ellipse at ${item.lightX} ${item.lightY},rgba(245,230,200,0.25) 0%,rgba(200,149,108,0.12) 30%,transparent 65%)` }} />
          )}
        </div>
        <div className="bg-plum px-6 py-5 flex items-center justify-between gap-4">
          <div>
            <p className="font-body text-[0.62rem] tracking-[0.25em] uppercase text-rose-gold mb-1">{item.category}</p>
            <p className="font-display text-2xl font-light text-ivory">{item.label}</p>
          </div>
          <Link
            href="/booking"
            className="shrink-0 font-body text-[0.78rem] tracking-[0.12em] uppercase text-ivory bg-rose-gold hover:bg-rose-gold-dark rounded-pill px-5 py-2.5 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
            onClick={onClose}
          >
            Book Now
          </Link>
        </div>
      </motion.div>

      <button
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center rounded-full text-ivory/60 hover:text-ivory border border-ivory/15 hover:border-ivory/35 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-gold"
        style={{ background: "rgba(28,11,46,0.6)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </motion.div>
  );
}

/* ── Section ── */
export function GalleryPreview() {
  const [active, setActive] = useState<GalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const close = useCallback(() => setActive(null), []);

  const filtered = activeCategory === "All"
    ? ITEMS
    : ITEMS.filter((item) => item.category === activeCategory);

  return (
    <>
      <section
        className="section-py overflow-hidden relative"
        style={{ background: "#EDE8E0" }}
        aria-label="Gallery preview"
      >
        {/* Section blend — bottom fades into Testimonials champagne */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 z-10"
          style={{ background: "linear-gradient(to top, #F5E6C8 0%, transparent 100%)" }}
          aria-hidden
        />
        <div className="container-luxury">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5 }}
                className="font-body text-[0.68rem] tracking-[0.3em] uppercase text-rose-gold mb-3"
              >
                The Work
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: 0.07, ease: EASE }}
                className="font-display font-light text-plum leading-tight"
                style={{ fontSize: "clamp(2.25rem,4.5vw,4rem)" }}
              >
                A window into the craft
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.25 }}
              whileHover={{ x: 2 }}
            >
              <Link
                href="/gallery"
                className="group/gal inline-flex items-center gap-2.5 font-body text-[0.78rem] tracking-[0.14em] uppercase text-plum/60 hover:text-plum border-b border-plum/20 hover:border-plum/50 pb-0.5 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-gold"
              >
                Full gallery
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden className="transition-transform duration-200 group-hover/gal:translate-x-1">
                  <path d="M1 4H11M8 1L11 4L8 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Category filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex items-center gap-2 overflow-x-auto pb-2 mb-8"
            style={{ scrollbarWidth: "none" }}
            role="tablist"
            aria-label="Filter gallery by category"
          >
            {CATEGORIES.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  role="tab"
                  aria-selected={isActive}
                  className={`shrink-0 font-body text-[0.7rem] tracking-[0.15em] uppercase px-4 py-1.5 rounded-pill transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-gold ${
                    isActive
                      ? "bg-plum text-ivory"
                      : "text-charcoal/50 hover:text-charcoal border border-charcoal/12 hover:border-charcoal/30 bg-transparent"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </motion.div>

          {/* CSS Columns masonry with AnimatePresence for filter transitions */}
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3" style={{ columnGap: "12px" }}>
            <AnimatePresence>
              {filtered.map((item, index) => (
                <GalleryCard key={item.id} item={item} index={index} onOpen={setActive} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="font-display font-light text-plum/40 text-xl">No works in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {active && <Lightbox item={active} onClose={close} />}
      </AnimatePresence>
    </>
  );
}
