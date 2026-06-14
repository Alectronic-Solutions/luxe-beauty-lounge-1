"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { CONTACT_INFO, SERVICES } from "@/lib/constants";
import { ThankYouModal } from "@/components/ui/ThankYouModal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VP = { once: true, amount: 0.15 } as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const ChevronSvg = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="absolute right-0 bottom-3.5 pointer-events-none text-charcoal/30" aria-hidden>
    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FAQS = [
  { q: "Do you take walk-ins?",             answer: "We are an appointment-only salon. This allows us to give every client our full, undivided attention from the moment you arrive." },
  { q: "How far in advance should I book?", answer: "Most services can be booked 1 to 2 weeks out. Bridal packages and colour corrections should be scheduled 4 to 8 weeks ahead to ensure we can accommodate your full party and timeline." },
  { q: "What is your cancellation policy?", answer: "We ask for 24 hours notice for single services and 48 hours for bridal or extended appointments. Late cancellations may be subject to a booking fee of up to 50% of the service value." },
  { q: "Do you offer gift cards?",          answer: "Yes. Digital and physical gift cards are available in any amount. Contact us by phone or email to arrange, and we will have them ready within 24 hours." },
  { q: "What should I bring?",              answer: "Just yourself. If you have inspiration images for a hair or nail appointment, those are always welcome. For skin treatments, arrive with a clean face if possible, though we can take care of that too." },
  { q: "Do you accommodate sensitive skin?", answer: "Absolutely. Our Signature Facial begins with a detailed skin assessment, and every product we use can be adjusted to your skin's specific sensitivities. We keep comprehensive client notes so every visit builds on the last." },
];

/* ── FAQ Accordion Item ── */
function FaqItem({ faq, isOpen, onToggle, index }: { faq: typeof FAQS[number]; isOpen: boolean; onToggle: () => void; index: number }) {
  const rm = useReducedMotion();

  return (
    <motion.div
      variants={rm ? undefined : item}
      className="border-b border-ivory/[0.08]"
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-gold"
      >
        <div className="flex items-start gap-4">
          <span
            className="font-display font-light mt-0.5 shrink-0"
            style={{ fontSize: "1.1rem", color: "rgba(200,149,108,0.4)", lineHeight: 1.4 }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="font-display font-light text-ivory group-hover:text-champagne transition-colors duration-200" style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", lineHeight: 1.4 }}>
            {faq.q}
          </p>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="shrink-0 mt-1.5 w-5 h-5 flex items-center justify-center rounded-full border border-ivory/15 text-ivory/40 group-hover:border-rose-gold/40 group-hover:text-rose-gold transition-colors duration-200"
          aria-hidden
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M4 1v6M1 4h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm text-ivory/55 leading-[1.8] pb-6 pl-9 max-w-2xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function BookingPage() {
  const rm = useReducedMotion();
  const rv = rm ? undefined : "visible";
  const rh = rm ? undefined : "hidden";
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Reservations"
          title="Your visit starts with a conversation."
          subtitle="Send us a message and we'll respond within one business day to confirm availability and discuss what you're looking for."
        />

        {/* ── Main form section ── */}
        <section className="section-py" style={{ background: "#FAF7F2" }}>
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[360px_1fr] gap-10 xl:gap-20 items-start">

              {/* ── Left: contact info ── */}
              <motion.div
                variants={rm ? undefined : container}
                initial={rh}
                whileInView={rv}
                viewport={VP}
                className="lg:sticky lg:top-32 space-y-8"
              >
                <motion.div variants={rm ? undefined : item}>
                  <h2 className="font-display font-light text-plum mb-6" style={{ fontSize: "clamp(1.5rem,2.5vw,2rem)" }}>Find us</h2>
                  <address className="not-italic space-y-6 font-body text-sm text-charcoal/65 leading-relaxed">
                    <div>
                      <p className="font-body text-[0.6rem] tracking-[0.28em] uppercase text-rose-gold mb-2">Address</p>
                      <p>{CONTACT_INFO.address}</p>
                      <p>{CONTACT_INFO.city}</p>
                    </div>
                    <div>
                      <p className="font-body text-[0.6rem] tracking-[0.28em] uppercase text-rose-gold mb-2">Phone</p>
                      <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-plum transition-colors duration-300">{CONTACT_INFO.phone}</a>
                    </div>
                    <div>
                      <p className="font-body text-[0.6rem] tracking-[0.28em] uppercase text-rose-gold mb-2">Email</p>
                      <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-plum transition-colors duration-300 break-all">{CONTACT_INFO.email}</a>
                    </div>
                    <div>
                      <p className="font-body text-[0.6rem] tracking-[0.28em] uppercase text-rose-gold mb-2">Hours</p>
                      <div className="space-y-1">
                        <p>{CONTACT_INFO.hours.weekday}</p>
                        <p>{CONTACT_INFO.hours.saturday}</p>
                        <p>{CONTACT_INFO.hours.sunday}</p>
                        <p className="text-charcoal/35 text-xs mt-1">Closed Mondays</p>
                      </div>
                    </div>
                  </address>
                </motion.div>

                {/* Premium location card */}
                <motion.div
                  variants={rm ? undefined : item}
                  className="rounded-[20px] overflow-hidden"
                  style={{ boxShadow: "0 4px 24px rgba(28,11,46,0.12), 0 1px 4px rgba(28,11,46,0.06)" }}
                >
                  {/* Decorative map illustration */}
                  <div className="relative h-48 overflow-hidden" style={{ background: "linear-gradient(145deg,#1C0B2E 0%,#2e1249 55%,#1a0a2a 100%)" }}>
                    {/* Abstract street grid */}
                    <svg className="absolute inset-0 w-full h-full opacity-[0.12]" aria-hidden>
                      <defs>
                        <pattern id="bk-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#C8956C" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#bk-grid)" />
                    </svg>
                    {/* Diagonal accent streets */}
                    <svg className="absolute inset-0 w-full h-full opacity-[0.08]" aria-hidden>
                      <line x1="0" y1="80" x2="100%" y2="40" stroke="#F5E6C8" strokeWidth="1.5" />
                      <line x1="0" y1="130" x2="100%" y2="90" stroke="#F5E6C8" strokeWidth="1" />
                      <line x1="40%" y1="0" x2="60%" y2="100%" stroke="#F5E6C8" strokeWidth="1" />
                    </svg>
                    {/* Glow */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full opacity-30" style={{ background: "radial-gradient(circle,#C8956C 0%,transparent 70%)", filter: "blur(16px)" }} aria-hidden />
                    </div>
                    {/* Pin */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#C8956C", boxShadow: "0 0 0 4px rgba(200,149,108,0.25), 0 4px 16px rgba(200,149,108,0.5)" }}>
                          <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden>
                            <path d="M7 0C3.13 0 0 3.13 0 7C0 12.25 7 18 7 18C7 18 14 12.25 14 7C14 3.13 10.87 0 7 0ZM7 9.5C5.62 9.5 4.5 8.38 4.5 7C4.5 5.62 5.62 4.5 7 4.5C8.38 4.5 9.5 5.62 9.5 7C9.5 8.38 8.38 9.5 7 9.5Z" fill="#FAF7F2" />
                          </svg>
                        </div>
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full opacity-30" style={{ background: "#C8956C", filter: "blur(3px)" }} aria-hidden />
                      </div>
                      <div className="text-center mt-1">
                        <p className="font-display font-light text-ivory text-[0.9rem] leading-tight">Luxe Beauty Lounge</p>
                        <p className="font-body text-[0.65rem] text-ivory/50 tracking-wide mt-0.5">Meridian Ave · Westfield, NJ</p>
                      </div>
                    </div>
                    {/* Corner accent dots */}
                    <div className="absolute top-3 right-3 flex gap-1" aria-hidden>
                      <div className="w-1 h-1 rounded-full bg-rose-gold/40" />
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-gold/60" />
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="bg-ivory px-5 py-4 flex items-center justify-between gap-3 border-t border-champagne-dark/30">
                    <div>
                      <p className="font-body text-[0.72rem] text-charcoal/60">{CONTACT_INFO.address}</p>
                      <p className="font-body text-[0.72rem] text-charcoal/40">{CONTACT_INFO.city}</p>
                    </div>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(CONTACT_INFO.address + " " + CONTACT_INFO.city)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 font-body text-[0.65rem] tracking-[0.14em] uppercase text-rose-gold hover:text-plum transition-colors duration-300 flex items-center gap-1.5"
                      aria-label="Get directions (opens Google Maps)"
                    >
                      Directions
                      <svg width="10" height="7" viewBox="0 0 10 7" fill="none" aria-hidden>
                        <path d="M1 3.5H9M6 1L9 3.5L6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </motion.div>

                {/* Quick response promise */}
                <motion.div
                  variants={rm ? undefined : item}
                  className="rounded-[16px] p-5 flex items-start gap-4"
                  style={{ background: "rgba(200,149,108,0.08)", border: "1px solid rgba(200,149,108,0.18)" }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-rose-gold shrink-0 mt-0.5" style={{ background: "rgba(200,149,108,0.12)" }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.1" />
                      <path d="M7 4v3.5l2 2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-body text-[0.75rem] font-medium text-charcoal tracking-wide">Response within 24 hours</p>
                    <p className="font-body text-[0.72rem] text-charcoal/50 mt-0.5 leading-snug">We personally review every inquiry and follow up by phone or email.</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* ── Right: form ── */}
              <motion.div
                initial={rh ? { opacity: 0, y: 32 } : undefined}
                whileInView={rv ? { opacity: 1, y: 0 } : undefined}
                viewport={VP}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              >
                <p className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-rose-gold mb-8">Inquiry Form</p>
                <form noValidate className="space-y-8" onSubmit={(e) => { e.preventDefault(); setModalOpen(true); }}>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="pg-name" className="block font-body text-[0.6rem] tracking-[0.28em] uppercase text-charcoal/40 mb-3">Full Name *</label>
                      <input id="pg-name" type="text" name="name" required autoComplete="name" placeholder="Your full name" className="w-full bg-transparent border-0 border-b border-charcoal/15 focus:border-rose-gold outline-none py-2.5 font-body text-[0.9375rem] text-charcoal placeholder:text-charcoal/25 transition-colors duration-300" />
                    </div>
                    <div>
                      <label htmlFor="pg-phone" className="block font-body text-[0.6rem] tracking-[0.28em] uppercase text-charcoal/40 mb-3">Phone</label>
                      <input id="pg-phone" type="tel" name="phone" autoComplete="tel" placeholder="(555) 000-0000" className="w-full bg-transparent border-0 border-b border-charcoal/15 focus:border-rose-gold outline-none py-2.5 font-body text-[0.9375rem] text-charcoal placeholder:text-charcoal/25 transition-colors duration-300" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="pg-email" className="block font-body text-[0.6rem] tracking-[0.28em] uppercase text-charcoal/40 mb-3">Email Address *</label>
                    <input id="pg-email" type="email" name="email" required autoComplete="email" placeholder="your@email.com" className="w-full bg-transparent border-0 border-b border-charcoal/15 focus:border-rose-gold outline-none py-2.5 font-body text-[0.9375rem] text-charcoal placeholder:text-charcoal/25 transition-colors duration-300" />
                  </div>

                  <div>
                    <label htmlFor="pg-service" className="block font-body text-[0.6rem] tracking-[0.28em] uppercase text-charcoal/40 mb-3">Service of Interest</label>
                    <div className="relative">
                      <select id="pg-service" name="service" className="w-full bg-transparent border-0 border-b border-charcoal/15 focus:border-rose-gold outline-none py-2.5 font-body text-[0.9375rem] text-charcoal/70 appearance-none cursor-pointer transition-colors duration-300 pr-5">
                        <option value="">Select a service</option>
                        {SERVICES.map((s) => (<option key={s.id} value={s.name}>{s.name}</option>))}
                        <option value="Not sure yet">Not sure yet, I&apos;d like a consultation</option>
                      </select>
                      <ChevronSvg />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="pg-timing" className="block font-body text-[0.6rem] tracking-[0.28em] uppercase text-charcoal/40 mb-3">Preferred Days / Times</label>
                    <input id="pg-timing" type="text" name="preferred_time" placeholder="e.g. Weekday mornings, Saturday afternoons" className="w-full bg-transparent border-0 border-b border-charcoal/15 focus:border-rose-gold outline-none py-2.5 font-body text-[0.9375rem] text-charcoal placeholder:text-charcoal/25 transition-colors duration-300" />
                  </div>

                  <div>
                    <label htmlFor="pg-message" className="block font-body text-[0.6rem] tracking-[0.28em] uppercase text-charcoal/40 mb-3">Anything else we should know?</label>
                    <textarea id="pg-message" name="message" rows={4} placeholder="Skin concerns, hair history, questions..." className="w-full bg-transparent border-0 border-b border-charcoal/15 focus:border-rose-gold outline-none py-2.5 font-body text-[0.9375rem] text-charcoal placeholder:text-charcoal/25 transition-colors duration-300 resize-none leading-[1.7]" />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn-primary w-full py-4 justify-center text-[0.85rem] tracking-[0.12em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
                    >
                      Send Inquiry
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none" className="inline-block ml-2" aria-hidden>
                        <path d="M1 5H11M7 1L11 5L7 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <p className="text-center font-body text-xs text-charcoal/30 mt-4 tracking-wide">We respond to all inquiries within one business day.</p>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FAQ accordion ── */}
        <section className="section-py" style={{ background: "#1C0B2E" }}>
          <div className="container-luxury max-w-3xl mx-auto">
            <motion.div initial={rh ? { opacity: 0, y: 20 } : undefined} whileInView={rv ? { opacity: 1, y: 0 } : undefined} viewport={VP} transition={{ duration: 0.55 }}>
              <p className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-rose-gold mb-4">Good to Know</p>
              <h2 className="font-display font-light text-ivory mb-12" style={{ fontSize: "clamp(1.75rem,3.5vw,2.5rem)" }}>Frequently asked questions</h2>
            </motion.div>
            <motion.div
              variants={rm ? undefined : container}
              initial={rh}
              whileInView={rv}
              viewport={VP}
            >
              {FAQS.map((faq, i) => (
                <FaqItem
                  key={faq.q}
                  faq={faq}
                  index={i}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </motion.div>

            {/* Closing note */}
            <motion.p
              initial={rh ? { opacity: 0 } : undefined}
              whileInView={rv ? { opacity: 1 } : undefined}
              viewport={VP}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-12 font-body text-sm text-ivory/30 text-center leading-relaxed"
            >
              Still have questions? Call us at{" "}
              <a href={`tel:${CONTACT_INFO.phone}`} className="text-ivory/50 hover:text-ivory transition-colors duration-200">
                {CONTACT_INFO.phone}
              </a>
            </motion.p>
          </div>
        </section>
      </main>
      <Footer />
      <ThankYouModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
