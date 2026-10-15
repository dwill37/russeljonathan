"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import { waLink, BOOK_MESSAGE } from "@/lib/site";

/** Always visible on mobile; smaller and quieter on desktop. Enters after the hero intro. */
export function FloatingWhatsApp() {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={waLink(BOOK_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book on WhatsApp (opens WhatsApp)"
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-30 grid size-14 place-items-center rounded-full bg-accent text-accent-ink shadow-[0_10px_30px_rgba(240,73,43,0.35)] lg:size-12 lg:bg-surface-2 lg:text-ink lg:shadow-[0_10px_30px_rgba(0,0,0,0.45)] lg:ring-1 lg:ring-hairline lg:hover:bg-accent lg:hover:text-accent-ink"
      initial={{ opacity: 0, scale: reduce ? 1 : 0.6, y: reduce ? 0 : 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: reduce ? 0.3 : 2.4, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={reduce ? undefined : { scale: 1.08 }}
      whileTap={reduce ? undefined : { scale: 0.94 }}
    >
      <WhatsappLogo size={28} weight="fill" aria-hidden />
    </motion.a>
  );
}
