"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { WhatsAppButton } from "./buttons";
import { EASE_INK } from "./motion";

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const clip = useTransform(
    scrollYProgress,
    [0, 1],
    reduce
      ? ["polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"]
      : ["polygon(8% 18%, 100% 0%, 92% 82%, 0% 100%)", "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"],
  );

  return (
    <section ref={ref} aria-labelledby="cta-title" className="px-2 py-6 sm:px-4">
      <motion.div
        style={{ clipPath: clip }}
        className="relative mx-auto max-w-[1600px] overflow-hidden rounded-[var(--radius-panel)] bg-accent px-6 py-24 text-accent-ink sm:px-12 lg:px-20 lg:py-36"
      >
        <motion.h2
          id="cta-title"
          className="display max-w-[16ch] text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.92]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Clip lives on the inner span: a fully clipped element never reports as in view. */}
          <motion.span
            className="block"
            variants={{
              hidden: { clipPath: reduce ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)" },
              show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, ease: EASE_INK } },
            }}
          >
            Got an idea? Let&apos;s put it on skin.
          </motion.span>
        </motion.h2>
        <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-accent-ink sm:text-xl">
          Send me your idea or a reference photo. I&apos;ll come back with a custom design and a quote.
        </p>
        <div className="mt-10">
          <WhatsAppButton size="lg" className="!bg-accent-ink !text-ink hover:!bg-[#2a1210]" />
        </div>
      </motion.div>
    </section>
  );
}
