"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";

export const EASE_INK = [0.77, 0, 0.18, 1] as const;
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/* ---------- Simple fade-up on view ---------- */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "p" | "article";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduce ? 0.4 : 0.8, delay: reduce ? 0 : delay, ease: EASE_OUT }}
    >
      {children}
    </Comp>
  );
}

/* ---------- Stagger container + item ---------- */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export function useStaggerItem(): Variants {
  const reduce = useReducedMotion();
  return {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.4 : 0.8, ease: EASE_OUT } },
  };
}

/* ---------- Heading unmasked like a pen stroke, with an accent stroke drawn under it ---------- */
export function PenHeading({
  children,
  className = "",
  as = "h2",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: "h2" | "h3";
  id?: string;
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      id={id}
      className={`display relative inline-block pb-4 ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
    >
      <motion.span
        className="block"
        variants={{
          hidden: reduce ? { opacity: 0 } : { clipPath: "inset(0% 100% 0% 0%)" },
          show: reduce
            ? { opacity: 1, transition: { duration: 0.4 } }
            : { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1, ease: EASE_INK } },
        }}
      >
        {children}
      </motion.span>
      <svg
        aria-hidden
        className="absolute -bottom-0.5 left-0 h-3 w-[min(9rem,60%)] overflow-visible"
        viewBox="0 0 160 12"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M2 8 C 40 2, 90 12, 158 4"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="3"
          strokeLinecap="round"
          variants={{
            hidden: { pathLength: reduce ? 1 : 0, opacity: reduce ? 0 : 1 },
            show: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: reduce ? 0.4 : 0.7, delay: reduce ? 0 : 0.75, ease: EASE_OUT },
            },
          }}
        />
      </svg>
    </Comp>
  );
}

/* ---------- Photo revealed by a diagonal panel cut, black and grey blooming into color ---------- */
const CUTS = {
  left: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
  right: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
  diag: "polygon(70% 0%, 70% 0%, 30% 100%, 30% 100%)",
  diagRev: "polygon(30% 0%, 30% 0%, 70% 100%, 70% 100%)",
} as const;

export type Cut = keyof typeof CUTS;

export function InkImage({
  src,
  alt,
  width,
  height,
  sizes,
  className = "",
  imgClassName = "",
  cut = "diag",
  delay = 0,
  fill = false,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes: string;
  className?: string;
  imgClassName?: string;
  cut?: Cut;
  delay?: number;
  fill?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const shown = reduce || inView;

  // The observed wrapper is never clipped: IntersectionObserver ignores fully clipped targets.
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className={fill ? "absolute inset-0" : "h-full w-full"}
        initial={false}
        animate={{ clipPath: shown ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" : CUTS[cut] }}
        transition={{ duration: reduce ? 0 : 0.95, delay: reduce ? 0 : delay, ease: EASE_INK }}
        style={{ clipPath: reduce ? undefined : CUTS[cut] }}
      >
        <motion.div
          className="h-full w-full"
          initial={false}
          animate={{ filter: shown ? "grayscale(0)" : "grayscale(1)" }}
          transition={{ duration: reduce ? 0 : 1.3, delay: reduce ? 0 : delay + 0.55, ease: "easeOut" }}
          style={{ filter: reduce ? undefined : "grayscale(1)" }}
        >
          {fill ? (
            <Image src={src} alt={alt} fill sizes={sizes} className={`object-cover ${imgClassName}`} />
          ) : (
            <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className={`h-full w-full object-cover ${imgClassName}`} />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ---------- Count-up numbers ---------- */
export function CountUp({
  to,
  decimals = 0,
  suffix = "",
  thousands = false,
  className,
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  thousands?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const value = useMotionValue(0);
  const text = useTransform(value, (v) => {
    const fixed = v.toFixed(decimals);
    return (thousands ? Number(fixed).toLocaleString("en-US") : fixed) + suffix;
  });
  const final = (thousands ? to.toLocaleString("en-US") : to.toFixed(decimals)) + suffix;

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      value.set(to);
      return;
    }
    const controls = animate(value, to, { duration: 1.8, ease: EASE_OUT });
    return () => controls.stop();
  }, [inView, reduce, to, value]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{final}</span>
      <motion.span aria-hidden>{text}</motion.span>
    </span>
  );
}
