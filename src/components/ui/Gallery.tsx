"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { GALLERY_ITEMS } from "@/lib/constants";
import { assetPath } from "@/lib/assetPath";
import { useFocusTrap } from "@/lib/useFocusTrap";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export type GalleryItem = (typeof GALLERY_ITEMS)[number];

/** Gallery category → the service id it books, for the lightbox CTA. */
const CATEGORY_SERVICE: Record<GalleryItem["category"], string> = {
  Skin: "signature-facial",
  Hair: "balayage-color",
  Bridal: "bridal-packages",
  "Brow & Lash": "brow-lash",
  Body: "body-treatments",
  Nails: "nail-artistry",
};

/* ── Tile ─────────────────────────────────────────────────────── */

export function GalleryTile({
  item,
  onOpen,
  sizes = "(max-width: 1024px) 50vw, 33vw",
}: {
  item: GalleryItem;
  onOpen: (item: GalleryItem) => void;
  sizes?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-label={`View ${item.label}, ${item.category}`}
      className="group relative block w-full overflow-hidden rounded-[14px] sm:rounded-[18px] cursor-zoom-in bg-plum/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-gold"
    >
      <Image
        src={assetPath(item.src)}
        alt={item.label}
        width={item.width}
        height={item.height}
        sizes={sizes}
        unoptimized
        className="block w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />

      {/* Category badge (hover devices: fades out as the overlay comes in) */}
      <span
        className="absolute top-3 left-3 sm:top-4 sm:left-4 font-body text-[0.58rem] sm:text-[0.6rem] tracking-[0.2em] uppercase px-2.5 py-1 rounded-pill transition-opacity duration-300 group-hover:opacity-0 [@media(hover:none)]:hidden"
        style={{
          background: "rgba(28,11,46,0.55)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          border: "1px solid rgba(200,149,108,0.15)",
          color: "rgba(245,230,200,0.8)",
        }}
      >
        {item.category}
      </span>

      {/* Caption: on hover for mouse users, always visible on touch screens */}
      <span
        className="absolute inset-0 flex flex-col justify-end p-3 sm:p-5 text-left opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(to top,rgba(28,11,46,0.8) 0%,rgba(28,11,46,0.25) 45%,transparent 70%)" }}
      >
        <span className="block font-body text-[0.56rem] sm:text-[0.62rem] tracking-[0.22em] uppercase text-rose-gold-light mb-1">
          {item.category}
        </span>
        <span className="block font-display text-[0.95rem] sm:text-xl font-light text-ivory leading-tight">
          {item.label}
        </span>
      </span>
    </button>
  );
}

/* ── Lightbox ─────────────────────────────────────────────────── */

export function GalleryLightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: readonly GalleryItem[];
  /** Index into `items`, or null when closed */
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  return (
    <AnimatePresence>
      {index !== null && items[index] && (
        <LightboxDialog
          key="lightbox"
          items={items}
          index={index}
          onClose={onClose}
          onIndexChange={onIndexChange}
        />
      )}
    </AnimatePresence>
  );
}

function LightboxDialog({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: readonly GalleryItem[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const item = items[index];
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;

  // Focus trap + Escape to close; focus returns to the tile that opened it.
  useFocusTrap(dialogRef, true, onClose);

  // Keep the latest handlers for the key listener without re-binding.
  const nav = useRef({ hasPrev, hasNext, index, onIndexChange });
  nav.current = { hasPrev, hasNext, index, onIndexChange };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const n = nav.current;
      if (e.key === "ArrowLeft" && n.hasPrev) n.onIndexChange(n.index - 1);
      if (e.key === "ArrowRight" && n.hasNext) n.onIndexChange(n.index + 1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const go = (dir: -1 | 1) => {
    if (dir === -1 && hasPrev) onIndexChange(index - 1);
    if (dir === 1 && hasNext) onIndexChange(index + 1);
  };

  return (
    <motion.div
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.label}, image ${index + 1} of ${items.length}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-8 outline-none"
      style={{ background: "rgba(16,6,32,0.93)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-[18px] sm:rounded-[20px] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 50) go(dx > 0 ? -1 : 1);
        }}
      >
        {/* Image stage: object-contain so portrait shots are never cropped */}
        <div className="relative w-full bg-plum-900" style={{ height: "min(68svh, 760px)" }}>
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="absolute inset-0"
            >
              <Image
                src={assetPath(item.src)}
                alt={item.label}
                fill
                sizes="(max-width: 800px) 100vw, 768px"
                unoptimized
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>

          <LightboxArrow dir="prev" disabled={!hasPrev} onClick={() => go(-1)} />
          <LightboxArrow dir="next" disabled={!hasNext} onClick={() => go(1)} />
        </div>

        {/* Info bar */}
        <div className="bg-plum px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-rose-gold mb-1">
              {item.category}
              <span className="text-ivory/40 ml-2 tracking-[0.12em]">
                {index + 1} / {items.length}
              </span>
            </p>
            <p className="font-display text-xl sm:text-2xl font-light text-ivory leading-tight truncate">
              {item.label}
            </p>
          </div>
          <Link
            href={`/booking?service=${CATEGORY_SERVICE[item.category]}`}
            onClick={onClose}
            className="btn-primary shrink-0 px-5 py-3 text-[0.72rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
          >
            Book this
          </Link>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute top-3 right-3 sm:top-6 sm:right-6 w-11 h-11 flex items-center justify-center rounded-full text-ivory/70 hover:text-ivory border border-ivory/15 hover:border-ivory/40 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-gold"
        style={{ background: "rgba(28,11,46,0.6)" }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </motion.div>
  );
}

function LightboxArrow({
  dir,
  disabled,
  onClick,
}: {
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous image" : "Next image"}
      className={`absolute top-1/2 -translate-y-1/2 ${dir === "prev" ? "left-2 sm:left-3" : "right-2 sm:right-3"} w-11 h-11 flex items-center justify-center rounded-full text-ivory/80 hover:text-ivory disabled:opacity-0 disabled:pointer-events-none transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-gold`}
      style={{ background: "rgba(28,11,46,0.55)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
    >
      <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden>
        <path
          d={dir === "prev" ? "M8 2L2 8L8 14" : "M2 2L8 8L2 14"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
