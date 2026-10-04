"use client";

import { MotionConfig } from "framer-motion";

/**
 * Site-wide reduced-motion handling. With reducedMotion="user", Framer Motion
 * skips transform/layout animation for visitors who prefer reduced motion but
 * still runs opacity fades, so whileInView reveals always finish.
 *
 * Don't toggle `initial` / `whileInView` on useReducedMotion() in components:
 * the server renders the hidden state, and if the client then drops the
 * animation props, the element stays at opacity 0.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
