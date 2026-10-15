"use client";

import { WhatsappLogo, ArrowUpRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { waLink, BOOK_MESSAGE } from "@/lib/site";

const base =
  "group relative inline-flex min-h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 text-[15px] font-medium tracking-[-0.01em] transition-colors";

function useLift() {
  const reduce = useReducedMotion();
  return reduce
    ? {}
    : {
        whileHover: { y: -2 },
        whileTap: { scale: 0.97, y: 0 },
        transition: { type: "spring" as const, stiffness: 400, damping: 22 },
      };
}

/** Primary booking CTA. Opens WhatsApp with a pre-filled message. */
export function WhatsAppButton({
  message = BOOK_MESSAGE,
  children = "Book on WhatsApp",
  className = "",
  size = "md",
}: {
  message?: string;
  children?: ReactNode;
  className?: string;
  size?: "md" | "lg";
}) {
  const lift = useLift();
  return (
    <motion.a
      {...lift}
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} bg-accent text-accent-ink hover:bg-[#ff5a3c] ${size === "lg" ? "min-h-14 px-8 text-base" : ""} ${className}`}
    >
      <WhatsappLogo size={20} weight="fill" aria-hidden />
      <span>{children}</span>
      <span className="sr-only">(opens WhatsApp)</span>
    </motion.a>
  );
}

/** Secondary pill: charcoal with an accent underline drawn on hover. */
export function GhostButton({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const lift = useLift();
  return (
    <motion.a
      {...lift}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} border border-hairline bg-surface-1/80 text-ink backdrop-blur hover:bg-surface-2 ${className}`}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-accent transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
      </span>
      {external && <ArrowUpRight size={16} weight="bold" aria-hidden />}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </motion.a>
  );
}

/** Inline text link with drawn accent underline. */
export function InkLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative inline-flex items-center gap-1.5 font-medium text-ink ${className}`}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-0.5 left-0 h-px w-full bg-muted/50"
        />
        <span
          aria-hidden
          className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
      </span>
      {external && <ArrowUpRight size={15} weight="bold" aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}
