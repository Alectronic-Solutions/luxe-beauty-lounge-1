"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { SERVICES } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VP = { once: true, amount: 0.15 } as const;

const SERVICE_BG: Record<string, string> = {
  "signature-facial":  "linear-gradient(145deg,#1C0B2E 0%,#2E1249 50%,#1C0B2E 100%)",
  "balayage-color":    "linear-gradient(145deg,#1a1a1a 0%,#2d2020 55%,#1a1210 100%)",
  "bridal-packages":   "linear-gradient(145deg,#8B4A2A 0%,#C8956C 45%,#A87550 100%)",
  "brow-lash":         "linear-gradient(145deg,#2e1249 0%,#1C0B2E 60%,#0e0517 100%)",
  "body-treatments":   "linear-gradient(145deg,#2a1a0e 0%,#1a1008 60%,#0d0804 100%)",
  "nail-artistry":     "linear-gradient(145deg,#8B4A2A 0%,#C8956C 50%,#E8C49A 100%)",
};

const PROCESS_STEPS = [
  { num: "01", label: "Consultation", body: "Every visit starts here. We listen before we touch." },
  { num: "02", label: "Assessment",   body: "We read your skin, hair, or both — before deciding anything." },
  { num: "03", label: "Treatment",    body: "Executed with precision, unhurried, and entirely focused on you." },
  { num: "04", label: "Aftercare",    body: "You leave with a plan, not just results from a single session." },
];

// Shared stagger container
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function ServicesPage() {
  const rm = useReducedMotion();
  const featured = SERVICES.find((s) => s.featured)!;
  const rest     = SERVICES.filter((s) => !s.featured);

  const rv = rm ? undefined : "visible";
  const rh = rm ? undefined : "hidden";

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Our Offerings"
          title={<>Every service, crafted to<br className="hidden sm:block" /> an exacting standard.</>}
          subtitle="We offer fewer services than most salons — deliberately. The ones we do, we do better than anyone."
        />

        {/* ── Featured: Signature Facial ── */}
        <section className="section-py" style={{ background: "#FAF7F2" }}>
          <div className="container-luxury">
            <motion.div
              initial={rh ? { opacity: 0, y: 32 } : undefined}
              whileInView={rv ? { opacity: 1, y: 0 } : undefined}
              viewport={VP}
              transition={{ duration: 0.7, ease: EASE }}
              id={featured.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[24px] overflow-hidden"
              style={{ boxShadow: "0 24px 64px rgba(28,11,46,0.14)" }}
            >
              <div
                className="relative p-10 md:p-14 flex flex-col justify-between min-h-[420px] overflow-hidden"
                style={{ background: SERVICE_BG[featured.id] }}
              >
                {/* Real photo behind the gradient */}
                <Image
                  src="/images/services-facial.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                  aria-hidden
            unoptimized
                />
                {/* Plum gradient overlay so text stays readable */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(145deg,rgba(28,11,46,0.82) 0%,rgba(46,18,73,0.70) 50%,rgba(28,11,46,0.78) 100%)" }} aria-hidden />
                <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full opacity-30 pointer-events-none" style={{ background: "radial-gradient(circle,#C8956C 0%,transparent 70%)", filter: "blur(36px)" }} aria-hidden />
                <div className="relative z-10">
                  <span className="font-body text-[0.62rem] tracking-[0.28em] uppercase text-rose-gold/80">
                    {featured.category} &nbsp;·&nbsp; Featured
                  </span>
                  <h2 className="font-display font-light text-ivory mt-4 leading-tight" style={{ fontSize: "clamp(2rem,4vw,3.25rem)" }}>
                    {featured.name}
                  </h2>
                  <p className="font-display italic text-rose-gold/70 mt-2" style={{ fontSize: "clamp(1rem,1.5vw,1.2rem)" }}>
                    {featured.tagline}
                  </p>
                </div>
                <div className="relative z-10 mt-10">
                  <p className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-ivory/35 mb-1">Starting from</p>
                  <p className="font-display font-light text-champagne" style={{ fontSize: "clamp(1.75rem,3vw,2.5rem)" }}>{featured.priceFrom}</p>
                  <p className="font-body text-xs text-ivory/40 mt-1">{featured.duration}</p>
                </div>
              </div>

              <div className="p-10 md:p-14 bg-ivory flex flex-col justify-between">
                <div className="space-y-5 text-charcoal/65 leading-[1.8]" style={{ fontSize: "clamp(0.875rem,1.1vw,1rem)" }}>
                  <p>{featured.description}</p>
                  <p>This treatment begins with a comprehensive skin assessment, followed by a tailored protocol using pharmaceutical-grade actives. Deep cleanse, exfoliation, extractions, mask, and a lymphatic facial massage are standard — everything else is specific to you.</p>
                  <p>Results are visible from the first session. With regular monthly visits, clients report sustained improvements in texture, tone, and luminosity that no topical routine alone can achieve.</p>
                </div>
                <motion.div whileHover={rm ? undefined : { x: 3 }} transition={{ duration: 0.2 }} className="self-start mt-10">
                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-2.5 font-body text-[0.8rem] tracking-[0.12em] uppercase text-ivory bg-rose-gold hover:bg-rose-gold-dark rounded-pill px-8 py-4 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
                  >
                    Book This Service
                    <motion.svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden animate={rm ? undefined : { x: [0, 3, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}><path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></motion.svg>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Process strip ── */}
        <section className="section-py-sm" style={{ background: "#F0EBE0" }}>
          <div className="container-luxury">
            <motion.p
              initial={rh ? { opacity: 0 } : undefined}
              whileInView={rv ? { opacity: 1 } : undefined}
              viewport={VP}
              transition={{ duration: 0.5 }}
              className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-rose-gold mb-10 text-center"
            >
              How Every Visit Works
            </motion.p>
            <motion.div
              variants={rm ? undefined : container}
              initial={rh}
              whileInView={rv}
              viewport={VP}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            >
              {PROCESS_STEPS.map((step) => (
                <motion.div key={step.num} variants={rm ? undefined : item} className="flex flex-col gap-3">
                  <span className="font-display font-light text-rose-gold/50" style={{ fontSize: "2.25rem", lineHeight: 1 }}>{step.num}</span>
                  <div className="h-px w-8 bg-rose-gold/30" />
                  <h3 className="font-display font-light text-plum text-xl">{step.label}</h3>
                  <p className="font-body text-sm text-charcoal/55 leading-relaxed">{step.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Full service menu ── */}
        <section className="section-py" style={{ background: "#FAF7F2" }}>
          <div className="container-luxury">
            <motion.div
              initial={rh ? { opacity: 0, y: 20 } : undefined}
              whileInView={rv ? { opacity: 1, y: 0 } : undefined}
              viewport={VP}
              transition={{ duration: 0.55, ease: EASE }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
            >
              <div>
                <p className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-rose-gold mb-3">Full Menu</p>
                <h2 className="font-display font-light text-plum" style={{ fontSize: "clamp(1.75rem,3.5vw,2.75rem)" }}>All Services</h2>
              </div>
              <p className="font-body text-sm text-charcoal/45 max-w-xs leading-relaxed">All services include a complimentary consultation.</p>
            </motion.div>

            <motion.div
              variants={rm ? undefined : container}
              initial={rh}
              whileInView={rv}
              viewport={VP}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {rest.map((s) => (
                <motion.article
                  key={s.id}
                  variants={rm ? undefined : item}
                  id={s.id}
                  className="group relative rounded-[20px] overflow-hidden"
                  style={{ boxShadow: "0 2px 8px rgba(28,11,46,0.06)" }}
                  whileHover={rm ? undefined : { y: -3, boxShadow: "0 8px 24px rgba(28,11,46,0.12)" }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="absolute left-0 inset-y-0 w-1.5" style={{ background: SERVICE_BG[s.id] }} aria-hidden />
                  <div className="ml-1.5 p-7 md:p-8 bg-ivory flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="font-body text-[0.62rem] tracking-[0.24em] uppercase text-rose-gold">{s.category}</span>
                        <h3 className="font-display font-light text-plum mt-1.5 leading-tight" style={{ fontSize: "clamp(1.3rem,2vw,1.75rem)" }}>{s.name}</h3>
                        <p className="font-display italic text-charcoal/40 mt-1" style={{ fontSize: "clamp(0.875rem,1.1vw,1rem)" }}>{s.tagline}</p>
                      </div>
                      <div className="text-right shrink-0 pt-0.5">
                        <p className="font-display font-light text-plum" style={{ fontSize: "clamp(1.35rem,2vw,1.75rem)" }}>{s.priceFrom}</p>
                        <p className="font-body text-xs text-charcoal/35 mt-1">{s.duration}</p>
                      </div>
                    </div>
                    <p className="font-body text-sm text-charcoal/60 leading-[1.75]">{s.description}</p>
                    <div className="flex items-center justify-between pt-1">
                      <Link
                        href="/booking"
                        className="group/link inline-flex items-center gap-2 font-body text-[0.75rem] tracking-[0.15em] uppercase text-rose-gold hover:text-rose-gold-dark transition-colors duration-300 border-b border-rose-gold/25 hover:border-rose-gold/60 pb-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-gold"
                      >
                        Inquire
                        <svg width="11" height="8" viewBox="0 0 11 8" fill="none" aria-hidden className="transition-transform duration-200 group-hover/link:translate-x-1"><path d="M1 4H10M7 1L10 4L7 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Closing CTA ── */}
        <motion.section
          initial={rh ? { opacity: 0 } : undefined}
          whileInView={rv ? { opacity: 1 } : undefined}
          viewport={VP}
          transition={{ duration: 0.6 }}
          className="section-py-sm text-center"
          style={{ background: "#1C0B2E" }}
        >
          <div className="container-luxury max-w-xl mx-auto">
            <p className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-rose-gold mb-4">Ready?</p>
            <h2 className="font-display font-light text-ivory mb-8" style={{ fontSize: "clamp(1.75rem,3.5vw,2.75rem)" }}>Your appointment is waiting.</h2>
            <motion.div whileHover={rm ? undefined : { scale: 1.03 }} whileTap={rm ? undefined : { scale: 0.97 }} style={{ display: "inline-flex" }}>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2.5 font-body text-[0.82rem] tracking-[0.12em] uppercase text-ivory bg-rose-gold hover:bg-rose-gold-dark rounded-pill px-10 py-4 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
              >
                Reserve a Visit
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}
