"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useReducedMotion } from "framer-motion";

export function CustomCursor() {
  const rm = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Spring lag — 80ms feel
  const x = useSpring(rawX, { stiffness: 500, damping: 40, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (rm) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onHoverIn = (e: MouseEvent) => {
      const el = e.target as Element;
      if (el.closest("a,button,[role=button]")) setHovering(true);
    };
    const onHoverOut = (e: MouseEvent) => {
      const el = e.target as Element;
      if (el.closest("a,button,[role=button]")) setHovering(false);
    };

    window.addEventListener("mousemove",  onMove,    { passive: true });
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseover",  onHoverIn,  { passive: true });
    window.addEventListener("mouseout",   onHoverOut, { passive: true });

    // Hide native cursor sitewide
    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseover",  onHoverIn);
      window.removeEventListener("mouseout",   onHoverOut);
      document.documentElement.style.cursor = "";
    };
  }, [rm, rawX, rawY, visible]);

  // Don't render on touch/reduced-motion
  if (rm) return null;

  return (
    <>
      {/* Outer ring — slow follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        aria-hidden
      >
        <motion.div
          animate={{
            width:  hovering ? 36 : clicking ? 14 : 28,
            height: hovering ? 36 : clicking ? 14 : 28,
            opacity: hovering ? 0.5 : 0.25,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="rounded-full border border-rose-gold"
        />
      </motion.div>

      {/* Inner dot — tight spring, instant */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: rawX,
          y: rawY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        aria-hidden
      >
        <motion.div
          animate={{
            width:  clicking ? 5 : 8,
            height: clicking ? 5 : 8,
            opacity: hovering ? 0.9 : 1,
          }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          className="rounded-full bg-rose-gold"
        />
      </motion.div>
    </>
  );
}
