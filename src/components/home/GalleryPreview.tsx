"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { viewportOnce } from "@/lib/animations";
import { GALLERY_ITEMS } from "@/lib/constants";
import { GalleryTile, GalleryLightbox } from "@/components/ui/Gallery";

const EASE: [number, number, number, number] = [0.25, 0, 0, 1];

// Curated for the home page: one of each discipline, ordered so the two
// masonry columns on phones (and three on desktop) balance visually.
const PREVIEW_IDS = [1, 4, 3, 6, 2, 5] as const;
const PREVIEW = PREVIEW_IDS.map((id) => GALLERY_ITEMS.find((g) => g.id === id)!);

export function GalleryPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="section-py overflow-hidden relative"
      style={{ background: "#EDE8E0" }}
      aria-labelledby="gallery-preview-heading"
    >
      {/* Section blend, bottom fades into Testimonials champagne */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 z-10"
        style={{ background: "linear-gradient(to top, #F5E6C8 0%, transparent 100%)" }}
        aria-hidden
      />
      <div className="container-luxury relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8 md:mb-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5 }}
              className="font-body text-[0.68rem] tracking-[0.3em] uppercase text-rose-gold-deep mb-3"
            >
              The Work
            </motion.p>
            <motion.h2
              id="gallery-preview-heading"
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
          >
            <Link
              href="/gallery"
              className="group/gal inline-flex items-center gap-2.5 py-1 font-body text-[0.78rem] tracking-[0.14em] uppercase text-plum/70 hover:text-plum border-b border-plum/20 hover:border-plum/50 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-gold"
            >
              Full gallery
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden className="transition-transform duration-200 group-hover/gal:translate-x-1">
                <path d="M1 4H11M8 1L11 4L8 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Masonry: CSS columns, 2 on phones, 3 from lg */}
        <div className="columns-2 lg:columns-3 gap-3 md:gap-4">
          {PREVIEW.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: EASE }}
              className="gallery-item mb-3 md:mb-4"
            >
              <GalleryTile item={item} onOpen={() => setOpenIndex(i)} />
            </motion.div>
          ))}
        </div>
      </div>

      <GalleryLightbox
        items={PREVIEW}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </section>
  );
}
