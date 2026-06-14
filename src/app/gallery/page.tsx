"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VP = { once: true, amount: 0.08 } as const;

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

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1,  label: "Signature Facial",             category: "Skin",        aspectPct: "133%", bg: "linear-gradient(155deg,#2e1249 0%,#1C0B2E 45%,#0e0517 100%)",   lightX: "40%", lightY: "35%", src: "/images/gallery/gallery-1.jpg" },
  { id: 2,  label: "Balayage Transformation",       category: "Hair",        aspectPct: "75%",  bg: "linear-gradient(145deg,#1a1010 0%,#2a1a0e 55%,#1a0c08 100%)",   lightX: "65%", lightY: "25%", src: "/images/gallery/gallery-2.jpg" },
  { id: 3,  label: "Bridal Morning Prep",           category: "Bridal",      aspectPct: "120%", bg: "linear-gradient(160deg,#8B4A2A 0%,#C8956C 40%,#A87550 100%)",   lightX: "50%", lightY: "20%", src: "/images/gallery/gallery-3.jpg" },
  { id: 4,  label: "Brow Lamination",               category: "Brow & Lash", aspectPct: "100%", bg: "linear-gradient(150deg,#3d1a63 0%,#2e1249 50%,#1C0B2E 100%)",   lightX: "30%", lightY: "60%", src: "/images/gallery/gallery-4.jpg" },
  { id: 5,  label: "Body Wrap Treatment",           category: "Body",        aspectPct: "145%", bg: "linear-gradient(165deg,#1a1a1a 0%,#2d1a10 50%,#120a06 100%)",   lightX: "55%", lightY: "40%", src: "/images/gallery/gallery-5.jpg" },
  { id: 6,  label: "Gel Extension Set",             category: "Nails",       aspectPct: "80%",  bg: "linear-gradient(135deg,#C8956C 0%,#8B4A2A 50%,#5a2e14 100%)",   lightX: "70%", lightY: "30%", src: "/images/gallery/gallery-6.jpg" },
  { id: 7,  label: "Color Correction",              category: "Hair",        aspectPct: "110%", bg: "linear-gradient(155deg,#1C0B2E 0%,#3d1a2e 55%,#1a0a1a 100%)",   lightX: "45%", lightY: "45%", src: "/images/gallery/gallery-7.jpg" },
  { id: 8,  label: "Lash Lift & Tint",              category: "Brow & Lash", aspectPct: "90%",  bg: "linear-gradient(140deg,#0e0517 0%,#2e1249 60%,#1C0B2E 100%)",   lightX: "60%", lightY: "20%", src: "/images/gallery/gallery-8.jpg" },
  { id: 9,  label: "Hard Gel Extensions",           category: "Nails",       aspectPct: "125%", bg: "linear-gradient(150deg,#E8C49A 0%,#C8956C 45%,#8B4A2A 100%)",   lightX: "35%", lightY: "30%", src: "/images/gallery/gallery-9.jpg" },
  { id: 10, label: "Bridal Party Styling",          category: "Bridal",      aspectPct: "80%",  bg: "linear-gradient(145deg,#C8956C 0%,#A87550 50%,#6d3a22 100%)",   lightX: "55%", lightY: "50%", src: "/images/gallery/gallery-3.jpg" },
  { id: 11, label: "Radiance Facial Protocol",      category: "Skin",        aspectPct: "115%", bg: "linear-gradient(160deg,#2e1249 0%,#1C0B2E 40%,#100620 100%)",   lightX: "45%", lightY: "30%", src: "/images/gallery/gallery-1.jpg" },
  { id: 12, label: "Balayage, Warm Brunette",       category: "Hair",        aspectPct: "95%",  bg: "linear-gradient(145deg,#3d1a1a 0%,#2a1208 55%,#1a0c04 100%)",   lightX: "60%", lightY: "35%", src: "/images/gallery/gallery-2.jpg" },
];

const CATEGORIES = ["All", "Skin", "Hair", "Bridal", "Brow & Lash", "Body", "Nails"] as const;
type Category = (typeof CATEGORIES)[number];

/* ── Lightbox ── */
function Lightbox({
  item,
  items,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem;
  items: GalleryItem[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const currentIndex = items.findIndex((i) => i.id === item.id);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12"
      style={{ background: "rgba(16,6,32,0.92)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing: ${item.label}`}
    >
      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="relative rounded-[20px] overflow-hidden w-full max-w-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="w-full relative" style={{ paddingBottom: "66.67%", background: item.bg }}>
            {item.src && <Image src={item.src} alt={item.label} fill sizes="80vw" className="object-cover object-center"
            unoptimized />}
            {!item.src && <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(ellipse at ${item.lightX} ${item.lightY},rgba(245,230,200,0.25) 0%,rgba(200,149,108,0.12) 30%,transparent 65%)` }} />}

            {/* Prev / Next arrow overlays */}
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              aria-label="Previous image"
              disabled={currentIndex === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full text-ivory/60 hover:text-ivory disabled:opacity-20 transition-all duration-200"
              style={{ background: "rgba(28,11,46,0.55)", backdropFilter: "blur(6px)" }}
            >
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden>
                <path d="M8 2L2 8L8 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              aria-label="Next image"
              disabled={currentIndex === items.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full text-ivory/60 hover:text-ivory disabled:opacity-20 transition-all duration-200"
              style={{ background: "rgba(28,11,46,0.55)", backdropFilter: "blur(6px)" }}
            >
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden>
                <path d="M2 2L8 8L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Info bar */}
          <div className="bg-plum px-6 py-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-body text-[0.62rem] tracking-[0.25em] uppercase text-rose-gold mb-1">{item.category}</p>
              <p className="font-display text-2xl font-light text-ivory leading-tight">{item.label}</p>
              <p className="font-body text-[0.7rem] text-ivory/30 mt-1">{currentIndex + 1} of {items.length}</p>
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
      </AnimatePresence>

      {/* Close button */}
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

export default function GalleryPage() {
  const rm = useReducedMotion();
  const rv = rm ? undefined : "visible";
  const rh = rm ? undefined : "hidden";
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filtered = activeCategory === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((i) => i.category === activeCategory);

  const openLightbox = useCallback((item: GalleryItem) => setLightboxItem(item), []);
  const closeLightbox = useCallback(() => setLightboxItem(null), []);

  const gotoPrev = useCallback(() => {
    if (!lightboxItem) return;
    const idx = filtered.findIndex((i) => i.id === lightboxItem.id);
    if (idx > 0) setLightboxItem(filtered[idx - 1]);
  }, [lightboxItem, filtered]);

  const gotoNext = useCallback(() => {
    if (!lightboxItem) return;
    const idx = filtered.findIndex((i) => i.id === lightboxItem.id);
    if (idx < filtered.length - 1) setLightboxItem(filtered[idx + 1]);
  }, [lightboxItem, filtered]);

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Portfolio"
          title="Work that speaks for itself."
          subtitle="Every image represents a real client and a real result. Nothing staged, nothing filtered beyond standard colour correction."
        />

        {/* ── Sticky category nav ── */}
        <nav
          className="sticky z-30 border-b"
          style={{ top: "calc(var(--bar-h, 0px) + 72px)", background: "rgba(250,247,242,0.94)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderColor: "rgba(232,208,160,0.4)" }}
          aria-label="Filter by category"
        >
          <div className="container-luxury">
            <div className="flex items-center gap-1.5 overflow-x-auto py-4" style={{ scrollbarWidth: "none" }}>
              {CATEGORIES.map((cat) => {
                const isActive = cat === activeCategory;
                const count = cat === "All" ? GALLERY_ITEMS.length : GALLERY_ITEMS.filter((i) => i.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={isActive}
                    className={`shrink-0 font-body text-[0.7rem] tracking-[0.15em] uppercase px-4 py-1.5 rounded-pill transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-gold ${
                      isActive
                        ? "bg-plum text-ivory"
                        : "text-charcoal/50 hover:text-charcoal border border-charcoal/10 hover:border-charcoal/25 bg-transparent"
                    }`}
                  >
                    {cat}
                    <span className={`ml-1.5 text-[0.62rem] ${isActive ? "text-ivory/50" : "text-charcoal/30"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* ── Masonry grid ── */}
        <section className="section-py" style={{ background: "#EDE8E0" }}>
          <div className="container-luxury">
            <motion.div
              layout
              className="columns-1 sm:columns-2 lg:columns-3"
              style={{ columnGap: "12px" }}
            >
              <AnimatePresence>
                {filtered.map((item, i) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={rh ? undefined : { opacity: 0, scale: 0.97, y: 14 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45, delay: (i % 3) * 0.05, ease: EASE }}
                    className="gallery-item mb-3"
                  >
                    <button
                      className="group relative overflow-hidden rounded-[18px] w-full cursor-pointer block focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-gold"
                      style={{ paddingBottom: item.aspectPct }}
                      aria-label={`View ${item.label} — ${item.category}`}
                      onClick={() => openLightbox(item)}
                    >
                      <div
                        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        style={item.src ? undefined : { background: item.bg }}
                      >
                        {item.src ? (
                          <Image src={item.src} alt={item.label} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover object-center"
            unoptimized />
                        ) : (
                          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(ellipse at ${item.lightX} ${item.lightY},rgba(245,230,200,0.20) 0%,rgba(200,149,108,0.10) 30%,transparent 65%)` }} />
                        )}
                      </div>

                      {/* Rest-state badge */}
                      <div className="absolute top-4 left-4 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                        <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase px-2.5 py-1 rounded-pill" style={{ background: "rgba(28,11,46,0.55)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", border: "1px solid rgba(200,149,108,0.15)", color: "rgba(245,230,200,0.7)" }}>
                          {item.category}
                        </span>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 pb-6" style={{ background: "linear-gradient(to top,rgba(28,11,46,0.82) 0%,rgba(28,11,46,0.30) 50%,transparent 100%)" }}>
                        <span className="block font-body text-[0.62rem] tracking-[0.25em] uppercase text-rose-gold mb-1.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{item.category}</span>
                        <p className="font-display text-xl font-light text-ivory leading-tight translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-[40ms]">{item.label}</p>
                        <p className="font-body text-[0.68rem] uppercase tracking-[0.14em] text-ivory/50 mt-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-[60ms]">Click to enlarge</p>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none" style={{ background: "linear-gradient(to top,rgba(28,11,46,0.35) 0%,transparent 100%)" }} aria-hidden />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="font-display font-light text-plum/40 text-2xl">No works in this category yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* ── Closing ── */}
        <motion.section
          initial={rh ? { opacity: 0 } : undefined}
          whileInView={rv ? { opacity: 1 } : undefined}
          viewport={VP}
          transition={{ duration: 0.6 }}
          className="section-py-sm text-center"
          style={{ background: "#FAF7F2" }}
        >
          <div className="container-luxury max-w-2xl mx-auto">
            <p className="font-display text-xl font-light italic text-plum/70">&ldquo;Real work. Real clients. Real results.&rdquo;</p>
            <p className="font-body text-sm text-charcoal/40 mt-4 leading-relaxed">
              All work shown is produced in-house by the Luxe Beauty Lounge team.
            </p>
            <motion.div whileHover={rm ? undefined : { scale: 1.03 }} whileTap={rm ? undefined : { scale: 0.97 }} style={{ display: "inline-flex" }} className="mt-8">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2.5 font-body text-[0.8rem] tracking-[0.12em] uppercase text-ivory bg-rose-gold hover:bg-rose-gold-dark rounded-pill px-8 py-4 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
              >
                Book Your Session
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox
            item={lightboxItem}
            items={filtered}
            onClose={closeLightbox}
            onPrev={gotoPrev}
            onNext={gotoNext}
          />
        )}
      </AnimatePresence>
    </>
  );
}
