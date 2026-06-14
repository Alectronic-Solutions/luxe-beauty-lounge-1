"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    // Run once on mount so non-hero pages start solid immediately
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled ? "nav-solid" : "bg-transparent"
        }`}
        style={{ top: "var(--bar-h, 0px)" }}
      >
        <nav
          className="container-luxury h-[72px] flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            className="group flex items-center gap-3 focus-visible:outline-none"
            aria-label="Luxe Beauty Lounge — home"
          >
            <Image
              src="/images/logo.png"
              alt="Luxe Beauty Lounge"
              width={52}
              height={52}
              unoptimized
              className="h-12 w-auto drop-shadow-md"
            />
            <div className="flex flex-col leading-none">
              <span className="font-display text-[1.25rem] font-light tracking-[0.06em] text-ivory group-hover:text-champagne transition-colors duration-300">
                Luxe Beauty
              </span>
              <span className="font-body text-[0.6rem] tracking-[0.28em] uppercase text-rose-gold/80 mt-0.5">
                Lounge
              </span>
            </div>
          </Link>

          {/* ── Desktop links ── */}
          <ul className="hidden md:flex items-center gap-10" role="list">
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`group relative font-body text-[0.8125rem] tracking-[0.12em] uppercase transition-colors duration-300 ${
                      active
                        ? "text-rose-gold"
                        : "text-ivory/75 hover:text-ivory"
                    }`}
                  >
                    {label}
                    {/* Underline — always rendered, width animated via CSS */}
                    <span
                      aria-hidden
                      className={`absolute -bottom-1.5 left-0 h-px bg-rose-gold origin-left transition-transform duration-300 ease-out w-full ${
                        active
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Book Now CTA ── */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="tel:+15558204400"
              className="hidden lg:block font-body text-[0.75rem] tracking-widest text-ivory/50 hover:text-ivory/80 transition-colors duration-300"
            >
              (555) 820-4400
            </a>
            <Link
              href="/booking"
              className="btn-primary px-6 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
            >
              Book Now
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden relative z-50 flex flex-col justify-center gap-[5px] w-10 h-10 -mr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold rounded"
          >
            <motion.span
              animate={
                menuOpen
                  ? { rotate: 45, y: 7, backgroundColor: "#FAF7F2" }
                  : { rotate: 0, y: 0, backgroundColor: "#FAF7F2" }
              }
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="block h-px w-6 mx-auto rounded-full origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block h-px w-4 mx-auto rounded-full bg-ivory/60 origin-center"
            />
            <motion.span
              animate={
                menuOpen
                  ? { rotate: -45, y: -7, backgroundColor: "#FAF7F2" }
                  : { rotate: 0, y: 0, backgroundColor: "#FAF7F2" }
              }
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="block h-px w-6 mx-auto rounded-full origin-center"
            />
          </button>
        </nav>
      </motion.header>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-40 flex flex-col bg-plum md:hidden overflow-y-auto"
            style={{ top: "calc(var(--bar-h, 0px) + 72px)" }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Subtle glow accents */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
              <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-20"
                style={{ background: "radial-gradient(circle, #C8956C 0%, transparent 70%)" }} />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-15"
                style={{ background: "radial-gradient(circle, #F5E6C8 0%, transparent 70%)" }} />
            </div>

            {/* Nav links */}
            <div className="relative flex flex-col items-center justify-center flex-1 gap-1 px-8 py-10">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full text-center"
                >
                  <Link
                    href={href}
                    className={`block font-display font-light py-3 border-b border-ivory/8 transition-colors duration-200 ${
                      pathname === href ? "text-rose-gold" : "text-ivory hover:text-champagne"
                    }`}
                    style={{ fontSize: "clamp(1.6rem, 7vw, 2.2rem)" }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 + NAV_LINKS.length * 0.06 + 0.04 }}
                className="mt-8"
              >
                <Link
                  href="/booking"
                  className="btn-primary px-9 py-3.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                >
                  Reserve Your Visit
                </Link>
              </motion.div>
            </div>

            {/* Footer row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="relative px-8 py-6 flex justify-between items-center border-t border-ivory/10"
              style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))" }}
            >
              <p className="font-body text-xs text-ivory/40 tracking-widest">
                (555) 820-4400
              </p>
              <Image
                src="/images/logo.png"
                alt="Luxe Beauty Lounge"
                width={36}
                height={36}
                unoptimized
                className="h-9 w-auto opacity-30"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
