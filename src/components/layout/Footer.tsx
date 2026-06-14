"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS, SERVICES, CONTACT_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { ThankYouModal } from "@/components/ui/ThankYouModal";

/* Social SVG icons */
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function PinterestIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.03-2.83.19-.77 1.26-5.33 1.26-5.33s-.32-.64-.32-1.59c0-1.49.87-2.6 1.94-2.6.92 0 1.36.69 1.36 1.51 0 .92-.59 2.3-.89 3.58-.25 1.07.53 1.94 1.58 1.94 1.9 0 3.17-2.44 3.17-5.33 0-2.19-1.47-3.83-4.14-3.83-3.02 0-4.91 2.26-4.91 4.78 0 .87.26 1.48.66 1.95.18.22.21.3.14.55-.07.27-.23.92-.3 1.18-.1.36-.4.49-.73.36C5.9 14.81 5 13.29 5 11.48 5 8.37 7.58 5 12.36 5c3.9 0 6.47 2.84 6.47 5.88 0 4.04-2.24 7.07-5.51 7.07-1.1 0-2.14-.59-2.5-1.25l-.68 2.63c-.25.95-.91 2.14-1.35 2.86.02.01.04.02.06.02.96.29 1.97.45 3.02.45 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
  );
}

const ICON_MAP: Record<string, React.FC> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  pinterest: PinterestIcon,
};

export function Footer() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
    <footer className="relative bg-plum overflow-hidden" aria-label="Site footer">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.05] rounded-full"
        style={{ background: "radial-gradient(circle,#C8956C 0%,transparent 70%)", filter: "blur(80px)", transform: "translate(30%,-30%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] opacity-[0.04] rounded-full"
        style={{ background: "radial-gradient(circle,#F5E6C8 0%,transparent 70%)", filter: "blur(80px)", transform: "translate(-30%,30%)" }}
        aria-hidden
      />

      {/* Top gradient rule */}
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(to right,transparent 0%,rgba(200,149,108,0.35) 30%,rgba(200,149,108,0.35) 70%,transparent 100%)" }}
        aria-hidden
      />

      {/* Newsletter strip */}
      <div
        className="relative"
        style={{ borderBottom: "1px solid rgba(200,149,108,0.1)" }}
      >
        <div className="container-luxury py-10 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-display font-light text-ivory text-xl md:text-2xl leading-tight">
                Stay in the know.{" "}
                <span className="italic text-rose-gold">Seasonal updates, first access.</span>
              </p>
              <p className="font-body text-sm text-ivory/40 mt-1.5">No noise. Just what matters. Unsubscribe any time.</p>
            </div>
            <form
              className="flex-shrink-0 w-full md:w-auto"
              aria-label="Newsletter signup"
              onSubmit={(e) => { e.preventDefault(); setModalOpen(true); }}
            >
              <div className="flex gap-0 rounded-pill overflow-hidden border border-ivory/12 focus-within:border-rose-gold/50 transition-colors duration-300 w-full md:w-[360px]">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  aria-label="Email address for newsletter"
                  className="flex-1 min-w-0 bg-transparent px-5 py-3 font-body text-sm text-ivory placeholder:text-ivory/25 outline-none"
                />
                <button
                  type="submit"
                  className="btn-primary shrink-0 text-[0.75rem] px-5 py-3 rounded-none rounded-r-pill focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne"
                  style={{ borderRadius: "0 9999px 9999px 0" }}
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container-luxury py-14 md:py-18 pb-28 md:pb-16">
        {/* ── 4-column grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-14 border-b border-ivory/[0.07]">

          {/* Col 1: Logo + tagline + social */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="group inline-flex items-baseline gap-0 mb-5 focus-visible:outline-none"
              aria-label="Luxe Beauty Lounge home"
            >
              <span className="font-display text-[1.6rem] font-light tracking-[0.03em] text-ivory group-hover:text-champagne transition-colors duration-300">
                Luxe
              </span>
              <span className="mx-2 self-stretch w-px bg-rose-gold/50 translate-y-[3px]" aria-hidden />
              <span className="font-display text-[1.6rem] font-light italic tracking-[0.02em] text-rose-gold group-hover:text-champagne transition-colors duration-300">
                Beauty
              </span>
            </Link>

            <p className="font-body text-[0.82rem] text-ivory/50 leading-[1.75] max-w-[220px]">
              An elevated beauty experience crafted for those who expect the exceptional.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-7">
              {SOCIAL_LINKS.map(({ label, href, icon }) => {
                const Icon = ICON_MAP[icon];
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow on ${label}`}
                    className="flex items-center justify-center w-12 h-12 rounded-full text-ivory/40 hover:text-rose-gold border border-ivory/10 hover:border-rose-gold/30 transition-all duration-300 hover:scale-105"
                    style={{ transition: "color 300ms,border-color 300ms,transform 200ms" }}
                  >
                    {Icon && <Icon />}
                  </a>
                );
              })}
            </div>

            {/* Rating indicator */}
            <div className="flex items-center gap-2 mt-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill="#C8956C" aria-hidden>
                  <path d="M5 1l.96 2.96H9.1L6.52 5.72l.95 2.96L5 6.9l-2.47 1.78.95-2.96L.9 3.96H4.04L5 1Z" />
                </svg>
              ))}
              <span className="font-body text-[0.68rem] text-ivory/55 tracking-wide ml-1">5.0 avg rating</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <p className="font-body text-[0.62rem] tracking-[0.28em] uppercase text-rose-gold/70 mb-5">
              Navigate
            </p>
            <ul className="space-y-3" role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-2 font-body text-[0.85rem] text-ivory/55 hover:text-ivory transition-colors duration-300"
                  >
                    <span className="w-3 h-px bg-rose-gold/0 group-hover:bg-rose-gold/70 transition-all duration-300 group-hover:w-4" aria-hidden />
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/booking"
                  className="group inline-flex items-center gap-2 font-body text-[0.85rem] text-rose-gold hover:text-rose-gold-light transition-colors duration-300 mt-1"
                >
                  <span className="w-3 h-px bg-rose-gold/50 group-hover:bg-rose-gold transition-all duration-300 group-hover:w-4" aria-hidden />
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <p className="font-body text-[0.62rem] tracking-[0.28em] uppercase text-rose-gold/70 mb-5">
              Services
            </p>
            <ul className="space-y-3" role="list">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services#${s.id}`}
                    className="group inline-flex items-center gap-2 font-body text-[0.85rem] text-ivory/55 hover:text-ivory transition-colors duration-300"
                  >
                    <span className="w-3 h-px bg-rose-gold/0 group-hover:bg-rose-gold/70 transition-all duration-300 group-hover:w-4" aria-hidden />
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact + hours */}
          <div>
            <p className="font-body text-[0.62rem] tracking-[0.28em] uppercase text-rose-gold/70 mb-5">
              Find Us
            </p>

            <address className="not-italic space-y-4 font-body text-[0.85rem] text-ivory/55">
              <div className="leading-relaxed">
                <p>{CONTACT_INFO.address}</p>
                <p>{CONTACT_INFO.city}</p>
              </div>
              <div>
                <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-ivory transition-colors duration-300">
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-ivory transition-colors duration-300 break-all">
                  {CONTACT_INFO.email}
                </a>
              </div>
            </address>

            {/* Hours */}
            <div className="mt-6 pt-5 border-t border-ivory/[0.07] space-y-1.5 font-body text-[0.78rem] text-ivory/60 leading-relaxed">
              <p>{CONTACT_INFO.hours.weekday}</p>
              <p>{CONTACT_INFO.hours.saturday}</p>
              <p>{CONTACT_INFO.hours.sunday}</p>
              <p className="text-ivory/40">Closed Mondays</p>
            </div>
          </div>

        </div>

        {/* Back to top */}
        <div className="pt-8 flex justify-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 font-body text-[0.72rem] tracking-[0.18em] uppercase text-ivory/50 hover:text-rose-gold transition-colors duration-300 focus-visible:outline-none focus-visible:text-rose-gold"
            aria-label="Back to top"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden
            >
              <path d="M7 11V3M3 6l4-4 4 4" />
            </svg>
            Back to top
          </button>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[0.72rem]">
          <p className="text-ivory/50 tracking-wide">
            &copy; {new Date().getFullYear()} Luxe Beauty Lounge. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-ivory/40">
            <Link href="/privacy-policy" className="hover:text-ivory/70 transition-colors duration-300">Privacy Policy</Link>
            <span aria-hidden>·</span>
            <Link href="/terms-of-service" className="hover:text-ivory/70 transition-colors duration-300">Terms of Service</Link>
          </div>

          <p className="text-ivory/40">
            Portfolio demo by{" "}
            <a href="https://alectronicsolutions.com" target="_blank" rel="noopener noreferrer" className="text-ivory/55 hover:text-champagne/80 transition-colors duration-300">
              Alectronic Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
    <ThankYouModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
