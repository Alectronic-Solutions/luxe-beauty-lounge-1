"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { GalleryTile, GalleryLightbox } from "@/components/ui/Gallery";
import { GALLERY_ITEMS, GALLERY_CATEGORIES } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VP = { once: true, amount: 0.08 } as const;

type Category = (typeof GALLERY_CATEGORIES)[number];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((i) => i.category === activeCategory);

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <PageHeader
          eyebrow="Portfolio"
          title="Work that speaks for itself."
          subtitle="Every image is our own work. Nothing staged, nothing filtered beyond standard colour correction."
        />

        {/* ── Sticky category filter ── */}
        <nav
          className="sticky z-30 border-b"
          style={{ top: "var(--nav-h, 72px)", background: "rgba(250,247,242,0.94)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderColor: "rgba(232,208,160,0.4)" }}
          aria-label="Filter gallery by category"
        >
          <div className="container-luxury">
            {/* Edge-to-edge scroll on phones so chips never get clipped by the gutter */}
            <div
              className="flex items-center gap-2 overflow-x-auto py-3 sm:py-4 -mx-6 px-6 sm:mx-0 sm:px-0"
              style={{ scrollbarWidth: "none" }}
            >
              {GALLERY_CATEGORIES.map((cat) => {
                const isActive = cat === activeCategory;
                const count = cat === "All" ? GALLERY_ITEMS.length : GALLERY_ITEMS.filter((i) => i.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={isActive}
                    className={`shrink-0 font-body text-[0.7rem] tracking-[0.15em] uppercase px-4 py-2.5 rounded-pill transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-gold ${
                      isActive
                        ? "bg-plum text-ivory"
                        : "text-charcoal/70 hover:text-charcoal border border-charcoal/10 hover:border-charcoal/25 bg-transparent"
                    }`}
                  >
                    {cat}
                    <span className={`ml-1.5 text-[0.62rem] ${isActive ? "text-ivory/60" : "text-charcoal/50"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* ── Masonry grid ── */}
        <section className="section-py" style={{ background: "#EDE8E0" }} aria-label="Gallery">
          <div className="container-luxury">
            <p className="sr-only" aria-live="polite">
              Showing {filtered.length} {filtered.length === 1 ? "image" : "images"}
              {activeCategory === "All" ? "" : ` in ${activeCategory}`}
            </p>
            <div className="columns-2 lg:columns-3 gap-3 md:gap-4">
              <AnimatePresence initial={false} mode="popLayout">
                {filtered.map((item, i) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="gallery-item mb-3 md:mb-4"
                  >
                    <GalleryTile item={item} onOpen={() => setOpenIndex(i)} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ── Closing ── */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP}
          transition={{ duration: 0.6 }}
          className="section-py-sm text-center"
          style={{ background: "#FAF7F2" }}
        >
          <div className="container-luxury max-w-2xl mx-auto">
            <p className="font-display text-xl font-light italic text-plum/70">&ldquo;Real work. Real clients. Real results.&rdquo;</p>
            <p className="font-body text-sm text-charcoal/65 mt-4 leading-relaxed">
              All work shown is produced in-house by the Luxe Beauty Lounge team.
            </p>
            <Link
              href="/booking"
              className="btn-primary mt-8 px-8 py-4 text-[0.8rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
            >
              Book Your Session
            </Link>
          </div>
        </motion.section>
      </main>
      <Footer />

      <GalleryLightbox
        items={filtered}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </>
  );
}
