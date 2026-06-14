"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { assetPath } from "@/lib/assetPath";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VP = { once: true, amount: 0.15 } as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const VALUES = [
  { num: "01", title: "Precision",     body: "We don't rush. Every service is given the time it deserves, and every detail is attended to — because the details are what make the difference." },
  { num: "02", title: "Discretion",    body: "Our space is calm by design. We attract clients who value quiet focus over social buzz, and we protect that environment fiercely." },
  { num: "03", title: "Education",     body: "Our team holds continued certifications and trains annually with the world's leading product houses. Expertise isn't optional here — it's foundational." },
  { num: "04", title: "Individuality", body: "There is no standard protocol. Every client receives a consultation, and every treatment is built around what they actually need — not what's easiest to deliver." },
];

const TEAM = [
  { name: "Isabelle Laurent",    role: "Founder & Creative Director",  specialty: "Advanced Skin Treatments",        years: "12+ yrs",  bg: "linear-gradient(155deg,#2e1249 0%,#1C0B2E 50%,#0e0517 100%)",  src: assetPath("/images/team/team-1.jpg") },
  { name: "Maelle Fontaine",     role: "Senior Colorist",              specialty: "Balayage & Color Correction",     years: "9 yrs",    bg: "linear-gradient(145deg,#1a1010 0%,#2d2020 55%,#1a1210 100%)",  src: assetPath("/images/team/team-2.jpg") },
  { name: "Suki Nakamura",       role: "Brow & Lash Artist",           specialty: "Brow Architecture & Lash Lifting",years: "7 yrs",   bg: "linear-gradient(145deg,#2e1249 0%,#1C0B2E 60%,#0e0517 100%)",  src: assetPath("/images/team/team-3.jpg") },
  { name: "Dominique Castillo",  role: "Nail Artist",                  specialty: "Gel & Hard Gel Extensions",       years: "6 yrs",   bg: "linear-gradient(135deg,#8B4A2A 0%,#C8956C 50%,#E8C49A 100%)",  src: assetPath("/images/team/team-4.jpg") },
  { name: "Rania Khalil",        role: "Body & Wellness Specialist",   specialty: "Wraps, Firming & Lymphatics",     years: "5 yrs",   bg: "linear-gradient(145deg,#2a1a0e 0%,#1a1008 60%,#0d0804 100%)",  src: assetPath("/images/team/team-5.jpg") },
  { name: "Celine Moreau",       role: "Skin Therapist",               specialty: "Chemical Peels & Acne Protocols", years: "4 yrs",   bg: "linear-gradient(155deg,#2e1249 0%,#3d1a2e 55%,#1a0a1a 100%)",  src: assetPath("/images/team/team-6.jpg") },
];

export default function AboutPage() {
  const rm = useReducedMotion();
  const rv = rm ? undefined : "visible";
  const rh = rm ? undefined : "hidden";

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Our Story"
          title={<>Built with intention.<span className="italic text-rose-gold"> Run with conviction.</span></>}
          subtitle="Luxe Beauty Lounge is not the largest salon in Westfield. It's the most deliberate one."
        />

        {/* ── Founder story ── */}
        <section className="section-py" style={{ background: "#FAF7F2" }}>
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 xl:gap-20 items-start">

              {/* Portrait */}
              <motion.div
                initial={rh ? { opacity: 0, x: -32 } : undefined}
                whileInView={rv ? { opacity: 1, x: 0 } : undefined}
                viewport={VP}
                transition={{ duration: 0.75, ease: EASE }}
                className="relative w-full lg:w-[400px] xl:w-[440px] shrink-0"
              >
                <div className="absolute inset-0 rounded-[28px] translate-x-4 translate-y-4 pointer-events-none" style={{ background: "linear-gradient(145deg,rgba(200,149,108,0.28) 0%,rgba(200,149,108,0.06) 100%)", border: "1px solid rgba(200,149,108,0.22)" }} aria-hidden />
                <div className="relative rounded-[24px] overflow-hidden" style={{ boxShadow: "0 0 0 1px rgba(200,149,108,0.55), 0 0 0 4px rgba(200,149,108,0.07), 0 24px 48px rgba(28,11,46,0.18)" }}>
                  <div className="aspect-[3/4] w-full relative">
                    <Image
                      src={assetPath("/images/about-founder.jpg")}
                      alt="Isabelle Laurent, Founder and Creative Director of Luxe Beauty Lounge"
                      fill
                      sizes="(max-width: 1024px) 100vw, 440px"
                      className="object-cover object-top"
                      priority
            unoptimized
                    />
                    <div className="absolute bottom-0 inset-x-0 p-6" style={{ background: "linear-gradient(to top,rgba(28,11,46,0.92) 0%,rgba(28,11,46,0.5) 60%,transparent 100%)" }}>
                      <p className="font-display text-lg font-light text-ivory">Isabelle Laurent</p>
                      <p className="font-body text-[0.72rem] tracking-[0.16em] uppercase text-champagne/55 mt-1">Founder &amp; Creative Director</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 rounded-[14px] py-4 px-5 z-10" style={{ background: "rgba(28,11,46,0.92)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(200,149,108,0.22)", boxShadow: "0 8px 24px rgba(28,11,46,0.35)" }}>
                  <p className="font-display font-light text-ivory leading-none" style={{ fontSize: "1.9rem" }}>12+</p>
                  <p className="font-body text-[0.68rem] text-ivory/50 mt-1.5 leading-snug max-w-[110px]">Years of mastery in luxury beauty</p>
                </div>
                <div className="absolute -top-5 -right-5 w-14 h-14 pointer-events-none" aria-hidden>
                  <div className="absolute top-0 right-0 w-full h-px bg-rose-gold/50" />
                  <div className="absolute top-0 right-0 w-px h-full bg-rose-gold/50" />
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-rose-gold translate-x-[3px] -translate-y-[3px]" />
                </div>
              </motion.div>

              {/* Text column */}
              <motion.div
                variants={rm ? undefined : container}
                initial={rh}
                whileInView={rv}
                viewport={VP}
                className="lg:pt-2"
              >
                <motion.p variants={rm ? undefined : item} className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-rose-gold mb-6">The Founder</motion.p>
                <motion.h2 variants={rm ? undefined : item} className="font-display font-light text-plum text-balance leading-tight mb-8" style={{ fontSize: "clamp(1.75rem,3vw,2.75rem)" }}>
                  The lounge that Westfield didn&apos;t know it needed.
                </motion.h2>
                <motion.div variants={rm ? undefined : item} className="space-y-5 font-body font-light text-charcoal/65 leading-[1.8]" style={{ fontSize: "clamp(0.9rem,1.1vw,1rem)" }}>
                  <p>
                    <span aria-hidden className="float-left font-display font-light text-rose-gold leading-[0.8] select-none mr-2 mt-1" style={{ fontSize: "clamp(4rem,6vw,5.5rem)" }}>I</span>
                    <span className="sr-only">I</span>sabelle Laurent spent eleven years working across New York and Paris — first as a facialist at a destination resort in the Hudson Valley, then as creative director for a luxury cosmetics house in Saint-Germain. She understood, intimately, what made a beauty experience truly elevated: it wasn&apos;t the product. It was the practitioner&apos;s attention.
                  </p>
                  <p>When she returned to New Jersey to be closer to family, she noticed that the suburb she grew up in had everything — except a place that took beauty seriously. Not as performance, not as trend, but as craft.</p>
                  <p>Luxe Beauty Lounge opened in 2013 in a converted Victorian brownstone on Meridian Avenue. The waiting list began the third week. Today, the team has grown to eight practitioners — each hand-selected and trained to Isabelle&apos;s specifications — and the list hasn&apos;t gotten shorter.</p>
                </motion.div>
                <motion.blockquote variants={rm ? undefined : item} className="mt-10 pl-5 border-l-2 border-rose-gold/50">
                  <p className="font-display italic text-plum/65 leading-snug" style={{ fontSize: "clamp(1.1rem,1.8vw,1.3rem)" }}>
                    &ldquo;Offer fewer things than you could, and do every one of them better than anyone else.&rdquo;
                  </p>
                  <footer className="mt-3 font-body text-xs tracking-[0.18em] uppercase text-charcoal/40">— Isabelle Laurent</footer>
                </motion.blockquote>
                <motion.div variants={rm ? undefined : item} whileHover={rm ? undefined : { x: 3 }} transition={{ duration: 0.2 }}>
                  <Link
                    href="/booking"
                    className="mt-10 inline-flex items-center gap-2.5 font-body text-[0.8rem] tracking-[0.12em] uppercase text-plum border border-plum/25 hover:border-plum/60 hover:bg-plum/5 rounded-pill px-7 py-3.5 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-gold"
                  >
                    Book a Visit
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden className="transition-transform duration-200 group-hover:translate-x-1"><path d="M1 4H11M8 1L11 4L8 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Stats strip ── */}
        <section className="section-py-sm" style={{ background: "#F5E6C8" }}>
          <div className="container-luxury">
            <motion.div
              variants={rm ? undefined : container}
              initial={rh}
              whileInView={rv}
              viewport={VP}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-champagne-dark/40"
            >
              {[
                { num: "2013", label: "Year founded" },
                { num: "800+", label: "Clients served" },
                { num: "8",    label: "Expert practitioners" },
                { num: "12+",  label: "Years of mastery" },
              ].map((s, i) => (
                <motion.div key={s.label} variants={rm ? undefined : item} className={`text-center ${i !== 0 ? "md:pl-8" : ""}`}>
                  <p className="font-display font-light text-plum" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>{s.num}</p>
                  <p className="font-body text-xs tracking-[0.18em] uppercase text-charcoal/50 mt-2">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="section-py" style={{ background: "#1C0B2E" }}>
          <div className="container-luxury">
            <motion.div initial={rh ? { opacity: 0, y: 20 } : undefined} whileInView={rv ? { opacity: 1, y: 0 } : undefined} viewport={VP} transition={{ duration: 0.55 }}>
              <p className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-rose-gold mb-4">What We Stand For</p>
              <h2 className="font-display font-light text-ivory text-balance mb-16 max-w-lg" style={{ fontSize: "clamp(1.75rem,3.5vw,2.75rem)" }}>
                Four things we refuse to compromise on.
              </h2>
            </motion.div>
            <motion.div
              variants={rm ? undefined : container}
              initial={rh}
              whileInView={rv}
              viewport={VP}
              className="grid grid-cols-1 md:grid-cols-2 gap-0"
            >
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.title}
                  variants={rm ? undefined : item}
                  className={`border-ivory/[0.07] p-8 md:p-10 ${i % 2 === 0 ? "md:border-r" : ""} ${i < 2 ? "border-b" : ""}`}
                  style={{ borderStyle: "solid" }}
                >
                  <span className="font-display font-light text-rose-gold/40" style={{ fontSize: "2.5rem", lineHeight: 1 }}>{v.num}</span>
                  <h3 className="font-display font-light text-ivory mt-4 mb-4" style={{ fontSize: "clamp(1.25rem,2vw,1.75rem)" }}>{v.title}</h3>
                  <p className="font-body text-sm text-ivory/55 leading-[1.8]">{v.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Team ── */}
        <section className="section-py" style={{ background: "#FAF7F2" }}>
          <div className="container-luxury">
            <motion.div initial={rh ? { opacity: 0, y: 20 } : undefined} whileInView={rv ? { opacity: 1, y: 0 } : undefined} viewport={VP} transition={{ duration: 0.55 }}>
              <p className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-rose-gold mb-4">The Team</p>
              <h2 className="font-display font-light text-plum mb-12" style={{ fontSize: "clamp(1.75rem,3.5vw,2.75rem)" }}>Eight hands we trust with yours.</h2>
            </motion.div>
            <motion.div
              variants={rm ? undefined : { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              initial={rh}
              whileInView={rv}
              viewport={VP}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {TEAM.map((member) => (
                <motion.div
                  key={member.name}
                  variants={rm ? undefined : item}
                  whileHover={rm ? undefined : { y: -5, boxShadow: "0 12px 32px rgba(28,11,46,0.15)" }}
                  transition={{ duration: 0.25 }}
                  className="group rounded-[20px] overflow-hidden"
                  style={{ boxShadow: "0 2px 8px rgba(28,11,46,0.07)" }}
                >
                  {/* Portrait */}
                  <div className="aspect-[4/5] relative overflow-hidden" style={{ background: member.bg }}>
                    <Image
                      src={member.src}
                      alt={`${member.name}, ${member.role}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            unoptimized
                    />
                    {/* Years badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="font-body text-[0.6rem] tracking-[0.18em] uppercase px-2.5 py-1 rounded-pill" style={{ background: "rgba(28,11,46,0.55)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", border: "1px solid rgba(200,149,108,0.2)", color: "rgba(245,230,200,0.65)" }}>
                        {member.years}
                      </span>
                    </div>
                  </div>
                  {/* Card footer */}
                  <div className="p-5 bg-ivory border-t border-champagne-dark/30">
                    <p className="font-display text-[1.1rem] font-light text-plum leading-tight">{member.name}</p>
                    <p className="font-body text-[0.7rem] text-rose-gold tracking-[0.1em] mt-1">{member.role}</p>
                    <div className="mt-3 pt-3 border-t border-champagne-dark/50 flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-rose-gold/50 shrink-0" aria-hidden />
                      <p className="font-body text-[0.72rem] text-charcoal/50 leading-snug">{member.specialty}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <motion.section
          initial={rh ? { opacity: 0 } : undefined}
          whileInView={rv ? { opacity: 1 } : undefined}
          viewport={VP}
          transition={{ duration: 0.6 }}
          className="section-py-sm text-center"
          style={{ background: "#F5E6C8" }}
        >
          <div className="container-luxury max-w-xl mx-auto">
            <h2 className="font-display font-light text-plum mb-8" style={{ fontSize: "clamp(1.75rem,3.5vw,2.75rem)" }}>Ready to experience the difference?</h2>
            <motion.div whileHover={rm ? undefined : { scale: 1.03 }} whileTap={rm ? undefined : { scale: 0.97 }} style={{ display: "inline-flex" }}>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2.5 font-body text-[0.82rem] tracking-[0.12em] uppercase text-ivory bg-rose-gold hover:bg-rose-gold-dark rounded-pill px-10 py-4 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
              >
                Book a Visit
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}
