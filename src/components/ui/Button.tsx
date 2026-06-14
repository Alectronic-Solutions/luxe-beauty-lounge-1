"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: ComponentPropsWithoutRef<"button">["onClick"];
  "aria-label"?: string;
}

const base =
  "inline-flex items-center justify-center font-body font-medium tracking-wide transition-all duration-300 rounded-pill focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-gold disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-rose-gold text-ivory hover:bg-rose-gold-dark active:scale-[0.98]",
  secondary:
    "bg-champagne text-plum hover:bg-champagne-dark active:scale-[0.98]",
  ghost:
    "bg-transparent text-ivory border border-ivory/40 hover:bg-ivory/10 active:scale-[0.98]",
  outline:
    "bg-transparent text-plum border border-plum/30 hover:bg-plum/5 active:scale-[0.98]",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-5 py-2",
  md: "text-sm px-7 py-3",
  lg: "text-base px-9 py-4",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  children,
  className = "",
  type = "button",
  disabled,
  onClick,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{ display: "inline-flex" }}
      >
        <Link
          href={href}
          className={classes}
          aria-label={ariaLabel}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
