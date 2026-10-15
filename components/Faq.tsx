"use client";

import { Plus } from "@phosphor-icons/react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { useId, useState, type ReactNode } from "react";
import { faqs } from "@/lib/faq";
import { EASE_OUT, PenHeading } from "./motion";

function Item({ q, a, open, onToggle }: { q: string; a: ReactNode; open: boolean; onToggle: () => void }) {
  const id = useId();
  const reduce = useReducedMotion();
  return (
    <motion.li layout={reduce ? false : "position"} className="border-b border-hairline">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          className="group flex w-full items-center justify-between gap-6 py-7 text-left"
        >
          <span className={`display text-[clamp(1.4rem,2.6vw,2rem)] leading-tight transition-colors ${open ? "text-accent" : "text-ink group-hover:text-accent"}`}>
            {q}
          </span>
          <motion.span
            aria-hidden
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className={`grid size-11 shrink-0 place-items-center rounded-full border transition-colors ${
              open ? "border-accent bg-accent text-accent-ink" : "border-hairline text-ink"
            }`}
          >
            <Plus size={18} weight="bold" />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            initial={{ opacity: 0, y: reduce ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            <p className="max-w-[60ch] pb-8 pr-14 text-[17px] leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" aria-labelledby="faq-title" className="px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <PenHeading id="faq-title" className="text-[clamp(2.6rem,6vw,5rem)]">
            Questions
          </PenHeading>
        </div>
        <LayoutGroup>
          <ul className="border-t border-hairline">
            {faqs.map((f, i) => (
              <Item key={f.q} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            ))}
          </ul>
        </LayoutGroup>
      </div>
    </section>
  );
}
