"use client";

import { motion, useReducedMotion } from "framer-motion";
import { wordmark } from "@/lib/wordmark";
import { EASE_INK } from "./motion";

/**
 * "Russel Jonathan" in script. With `draw`, each glyph is traced stroke by stroke
 * like hand lettering, then filled with ink.
 */
export function Wordmark({
  draw = false,
  className = "",
  title = "Russel Jonathan",
}: {
  draw?: boolean;
  className?: string;
  title?: string;
}) {
  const reduce = useReducedMotion();
  const animated = draw && !reduce;

  return (
    <svg viewBox={wordmark.viewBox} className={className} role="img" aria-label={title}>
      {wordmark.paths.map((d, i) =>
        animated ? (
          <motion.path
            key={i}
            d={d}
            stroke="currentColor"
            strokeWidth={0.9}
            strokeLinejoin="round"
            initial={{ pathLength: 0, fillOpacity: 0, strokeOpacity: 1 }}
            animate={{ pathLength: 1, fillOpacity: 1, strokeOpacity: 0 }}
            transition={{
              pathLength: { duration: 0.85, delay: 0.05 + i * 0.07, ease: EASE_INK },
              fillOpacity: { duration: 0.5, delay: 0.6 + i * 0.07, ease: "easeOut" },
              strokeOpacity: { duration: 0.4, delay: 1.0 + i * 0.07 },
            }}
            fill="currentColor"
          />
        ) : (
          <path key={i} d={d} fill="currentColor" />
        ),
      )}
    </svg>
  );
}
