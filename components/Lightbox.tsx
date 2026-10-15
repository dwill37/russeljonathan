"use client";

import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { styleLabels, type Work } from "@/lib/site";
import { EASE_OUT } from "./motion";

export function Lightbox({
  items: works,
  index,
  onClose,
  onChange,
}: {
  items: Work[];
  index: number | null;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);
  const isOpen = index !== null;

  useEffect(() => {
    if (!isOpen) return;
    opener.current = document.activeElement;
    closeRef.current?.focus();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [isOpen]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % works.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + works.length) % works.length);
      if (e.key === "Tab" && dialogRef.current) {
        // Keep focus inside the dialog.
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose, onChange, works.length]);

  const work = index !== null ? works[index] ?? null : null;

  return (
    <AnimatePresence>
      {work && index !== null && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Tattoo photo viewer"
          className="fixed inset-0 z-50 flex items-center justify-center overscroll-contain bg-canvas/95 p-4 backdrop-blur-md sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={work.src}
              className="relative flex max-h-full w-full max-w-[min(90vw,780px)] flex-col items-center"
              initial={{ opacity: 0, scale: reduce ? 1 : 0.94, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={work.src}
                alt={work.alt}
                width={work.w}
                height={work.h}
                sizes="(min-width: 800px) 780px, 90vw"
                className="h-auto max-h-[78dvh] w-auto rounded-[var(--radius-panel)] object-contain"
              />
              <figcaption className="mt-4 text-center text-[14px] text-muted">
                <span className="text-ink">{work.styles.map((s) => styleLabels[s]).join(" / ")}</span>
                <span className="mx-2" aria-hidden>
                  /
                </span>
                {index + 1} of {works.length}
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close viewer"
            className="absolute right-3 top-3 grid size-12 place-items-center rounded-full border border-hairline bg-surface-1 text-ink transition-colors hover:border-accent sm:right-6 sm:top-6"
          >
            <X size={20} weight="bold" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange((index - 1 + works.length) % works.length);
            }}
            aria-label="Previous photo"
            className="absolute bottom-6 left-4 grid size-12 place-items-center rounded-full border border-hairline bg-surface-1 text-ink transition-colors hover:border-accent sm:bottom-auto sm:left-6 sm:top-1/2 sm:-translate-y-1/2"
          >
            <CaretLeft size={20} weight="bold" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange((index + 1) % works.length);
            }}
            aria-label="Next photo"
            className="absolute bottom-6 right-4 grid size-12 place-items-center rounded-full border border-hairline bg-surface-1 text-ink transition-colors hover:border-accent sm:bottom-auto sm:right-6 sm:top-1/2 sm:-translate-y-1/2"
          >
            <CaretRight size={20} weight="bold" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
