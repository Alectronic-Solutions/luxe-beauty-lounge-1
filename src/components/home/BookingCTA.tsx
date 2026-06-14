"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { CONTACT_INFO, SERVICES } from "@/lib/constants";
import { ThankYouModal } from "@/components/ui/ThankYouModal";
import { viewportOnce } from "@/lib/animations";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const leftStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const leftChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* ── Floating label field wrapper ── */
function FloatField({
  label,
  id,
  hasValue,
  children,
}: {
  label: string;
  id: string;
  hasValue?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`field-float${hasValue ? " has-value" : ""}`}>
      {children}
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

/* ── Custom select chevron ── */
const SelectChevron = () => (
  <svg
    width="10"
    height="6"
    viewBox="0 0 10 6"
    fill="none"
    className="absolute right-0 bottom-3 pointer-events-none text-ivory/35"
    aria-hidden
  >
    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function BookingCTA() {
  const rm = useReducedMotion();
  const [serviceVal, setServiceVal] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
    <section
      className="relative overflow-hidden section-py"
      style={{ background: "#1C0B2E" }}
      aria-label="Book an appointment"
    >
      {/* Ambient glow — keeps it from feeling flat */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #C8956C 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #F5E6C8 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden
      />

      <div className="container-luxury relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-start">

          {/* ═══════════════════════════════════════
              LEFT — Editorial text + contact info
          ═══════════════════════════════════════ */}
          <motion.div
            variants={rm ? undefined : leftStagger}
            initial={rm ? undefined : "hidden"}
            whileInView={rm ? undefined : "visible"}
            viewport={viewportOnce}
          >
            {/* Eyebrow */}
            <motion.p
              variants={rm ? undefined : leftChild}
              className="font-body text-[0.68rem] tracking-[0.32em] uppercase text-rose-gold mb-6"
            >
              Reserve Your Visit
            </motion.p>

            {/* Headline */}
            <motion.h2
              variants={rm ? undefined : leftChild}
              className="font-display font-light text-ivory leading-[1.06] text-balance"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Your next chapter{" "}
              <span className="italic text-rose-gold">begins here.</span>
            </motion.h2>

            {/* Supporting text */}
            <motion.p
              variants={rm ? undefined : leftChild}
              className="mt-6 font-body font-light text-ivory/55 leading-[1.8] max-w-md"
              style={{ fontSize: "clamp(0.9rem, 1.1vw, 1rem)" }}
            >
              Send us a message and we&apos;ll reach out within one business day
              to confirm your appointment and answer any questions.
            </motion.p>

            {/* ── Large italic pull quote ── */}
            <motion.p
              variants={rm ? undefined : leftChild}
              className="mt-10 font-display italic leading-snug text-ivory/25"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
              aria-hidden
            >
              &ldquo;The details are never small.&rdquo;
            </motion.p>

            {/* ── Contact info — two-row layout ── */}
            <motion.div
              variants={rm ? undefined : leftChild}
              className="mt-12"
            >
              {/* Thin top rule */}
              <div className="h-px bg-ivory/10 mb-8" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {/* Phone */}
                <div>
                  <p className="font-body text-[0.6rem] tracking-[0.28em] uppercase text-rose-gold mb-2">
                    Phone
                  </p>
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="font-body text-sm text-ivory/65 hover:text-ivory transition-colors duration-300"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>

                {/* Email */}
                <div>
                  <p className="font-body text-[0.6rem] tracking-[0.28em] uppercase text-rose-gold mb-2">
                    Email
                  </p>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="font-body text-sm text-ivory/65 hover:text-ivory transition-colors duration-300 break-all"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>

                {/* Address */}
                <div>
                  <p className="font-body text-[0.6rem] tracking-[0.28em] uppercase text-rose-gold mb-2">
                    Location
                  </p>
                  <address className="not-italic font-body text-sm text-ivory/65 leading-relaxed">
                    {CONTACT_INFO.address}
                    <br />
                    {CONTACT_INFO.city}
                  </address>
                </div>

                {/* Hours */}
                <div>
                  <p className="font-body text-[0.6rem] tracking-[0.28em] uppercase text-rose-gold mb-2">
                    Hours
                  </p>
                  <div className="font-body text-sm text-ivory/65 leading-relaxed space-y-0.5">
                    <p>{CONTACT_INFO.hours.weekday}</p>
                    <p>{CONTACT_INFO.hours.saturday}</p>
                    <p>{CONTACT_INFO.hours.sunday}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ═══════════════════════════════════════
              RIGHT — Form
          ═══════════════════════════════════════ */}
          <motion.div
            initial={rm ? undefined : { opacity: 0, y: 32 }}
            whileInView={rm ? undefined : { opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.75, delay: 0.2, ease: EASE }}
          >
            {/* Subtle inset card — slightly lighter plum to lift from bg */}
            <div
              className="rounded-[24px] p-8 lg:p-10"
              style={{
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(200,149,108,0.14)",
                boxShadow: "inset 0 1px 0 rgba(245,230,200,0.05)",
              }}
            >
              {/* Form heading */}
              <p className="font-body text-[0.68rem] tracking-[0.28em] uppercase text-ivory/35 mb-8">
                Inquiry Form
              </p>

              <form
                noValidate
                className="space-y-7"
                onSubmit={(e) => { e.preventDefault(); setModalOpen(true); }}
              >

                {/* Name + Phone — 2-col */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <FloatField label="Name *" id="b-name">
                    <input id="b-name" type="text" name="name" required autoComplete="name" placeholder=" " />
                  </FloatField>
                  <FloatField label="Phone" id="b-phone">
                    <input id="b-phone" type="tel" name="phone" autoComplete="tel" placeholder=" " />
                  </FloatField>
                </div>

                {/* Email */}
                <FloatField label="Email Address *" id="b-email">
                  <input id="b-email" type="email" name="email" required autoComplete="email" placeholder=" " />
                </FloatField>

                {/* Service select — needs has-value class when chosen */}
                <FloatField label="Service of Interest" id="b-service" hasValue={!!serviceVal}>
                  <div className="relative">
                    <select
                      id="b-service"
                      name="service"
                      value={serviceVal}
                      onChange={(e) => setServiceVal(e.target.value)}
                      className="pr-6"
                    >
                      <option value="" disabled />
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                      <option value="Not sure yet">Not sure yet, I&apos;d like a consultation</option>
                    </select>
                    <SelectChevron />
                  </div>
                </FloatField>

                {/* Preferred timing */}
                <FloatField label="Preferred Days / Times" id="b-timing">
                  <input id="b-timing" type="text" name="preferred_time" placeholder=" " />
                </FloatField>

                {/* Message */}
                <FloatField label="Message" id="b-message">
                  <textarea id="b-message" name="message" rows={3} placeholder=" " style={{ lineHeight: "1.7", resize: "none" }} />
                </FloatField>

                {/* Thin rule before submit */}
                <div className="h-px bg-ivory/8 mt-2" />

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-primary w-full py-4 justify-center text-[0.85rem] tracking-[0.12em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                >
                  Send Inquiry
                  <span className="ml-2" aria-hidden>→</span>
                </button>

                <p className="text-center font-body text-[0.7rem] text-ivory/25 tracking-wide">
                  We respond to all inquiries within one business day.
                </p>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
    <ThankYouModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
