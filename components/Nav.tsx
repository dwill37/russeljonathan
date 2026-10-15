"use client";

import { List, X, WhatsappLogo } from "@phosphor-icons/react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { navLinks, waLink, BOOK_MESSAGE } from "@/lib/site";
import { WhatsAppButton } from "./buttons";
import { Wordmark } from "./Wordmark";
import { EASE_OUT } from "./motion";

export function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const menuButton = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const nextSolid = y > 24;
    if (nextSolid !== solid) setSolid(nextSolid);
    // Tuck the bar away while reading downward, bring it back on any upward scroll.
    const nextHidden = !reduce && y > 640 && y > prev + 4;
    const nextShown = y < prev - 4 || y < 640;
    if (nextHidden && !hidden) setHidden(true);
    else if (nextShown && hidden) setHidden(false);
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => document.querySelector<HTMLElement>("#mobile-menu a")?.focus(), 50);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-40"
        initial={false}
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease: EASE_OUT }}
      >
        <div
          className={`transition-[background-color,border-color,backdrop-filter] duration-500 ${
            solid || open
              ? "border-b border-hairline bg-canvas/85 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <nav
            aria-label="Main"
            className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6 lg:h-[72px] lg:px-10"
          >
            <a href="#top" translate="no" className="flex items-center gap-2.5 text-ink" aria-label="Tattoo Russel Jonathan, back to top">
              <span className="rounded-full border border-hairline px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
                Tattoo
              </span>
              <Wordmark className="h-7 w-auto lg:h-8" />
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group relative px-3 py-2 text-[14px] font-medium text-muted transition-colors hover:text-ink"
                  >
                    {l.label}
                    <span
                      aria-hidden
                      className="absolute inset-x-3 bottom-1 h-[2px] origin-left scale-x-0 rounded-full bg-accent transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <WhatsAppButton className="!min-h-10 !px-5 !text-[14px]" />
              </div>
              <button
                ref={menuButton}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="grid size-11 place-items-center rounded-full border border-hairline bg-surface-1 text-ink lg:hidden"
              >
                {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[35] flex flex-col overscroll-contain bg-canvas px-4 pb-10 pt-24 sm:px-6 lg:hidden"
            initial={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
            animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
            exit={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
            transition={{ duration: reduce ? 0 : 0.55, ease: [0.77, 0, 0.18, 1] }}
          >
            <motion.ul
              className="flex flex-col gap-1"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}
            >
              {navLinks.map((l) => (
                <motion.li
                  key={l.href}
                  variants={{
                    hidden: { opacity: 0, y: reduce ? 0 : 16 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
                  }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display block py-2 text-5xl text-ink transition-colors active:text-accent"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <a
              href={waLink(BOOK_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-accent px-8 text-base font-medium text-accent-ink"
            >
              <WhatsappLogo size={20} weight="fill" aria-hidden />
              Book on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
