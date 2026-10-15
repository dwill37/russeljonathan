"use client";

import { InstagramLogo } from "@phosphor-icons/react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { business, styleLabels, works, type Style } from "@/lib/site";
import { GhostButton } from "./buttons";
import { Lightbox } from "./Lightbox";
import { EASE_INK, InkImage, PenHeading, type Cut } from "./motion";

type Filter = "all" | Style;

const ORDER: Style[] = ["anime", "color", "black-grey", "lettering"];
// Only show a filter if at least one photo matches it.
const FILTERS: Filter[] = ["all", ...ORDER.filter((s) => works.some((w) => w.styles.includes(s)))];

const CUT_CYCLE: Cut[] = ["diag", "left", "diagRev", "right"];

export function Gallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const visible = useMemo(
    () => (filter === "all" ? works : works.filter((w) => w.styles.includes(filter))),
    [filter],
  );

  return (
    <section id="work" aria-labelledby="work-title" className="px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <PenHeading id="work-title" className="text-[clamp(2.6rem,6vw,5rem)]">
              The work
            </PenHeading>
            <p className="mt-5 max-w-[36rem] text-lg leading-relaxed text-muted">
              Fresh pieces from the studio. Tap any photo to see it up close.
            </p>
          </div>

          <LayoutGroup id="filters">
            <div role="group" aria-label="Filter by style" className="-mx-1 flex flex-wrap gap-1.5">
              {FILTERS.map((f) => {
                const active = f === filter;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    aria-pressed={active}
                    className={`relative min-h-11 rounded-full px-4 text-[14px] font-medium transition-colors ${
                      active ? "text-accent-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full bg-accent"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative">{f === "all" ? "All" : styleLabels[f]}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        <motion.ul layout={!reduce} className="mt-12 grid grid-flow-dense grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((w, i) => {
              const big = filter === "all" && i % 7 === 0;
              return (
                <motion.li
                  key={w.src}
                  layout={!reduce}
                  initial={{ opacity: 0, scale: reduce ? 1 : 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: reduce ? 1 : 0.94 }}
                  transition={{ duration: 0.5, ease: EASE_INK }}
                  className={big ? "col-span-2 row-span-2" : ""}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    className="group relative block h-full w-full overflow-hidden rounded-[var(--radius-panel)] bg-surface-1"
                    aria-label={`View larger: ${w.alt}`}
                  >
                    <InkImage
                      src={w.src}
                      alt=""
                      width={w.w}
                      height={w.h}
                      sizes={big ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"}
                      className="aspect-[4/5] h-full w-full"
                      imgClassName="transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.05]"
                      cut={CUT_CYCLE[i % CUT_CYCLE.length]}
                      delay={(i % 4) * 0.08}
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-[var(--radius-panel)] ring-1 ring-inset ring-white/5 transition-[box-shadow] duration-300 group-hover:ring-2 group-hover:ring-accent"
                    />
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>

        <div className="mt-12 flex justify-center">
          <GhostButton href={business.instagram.url} external>
            <span className="inline-flex items-center gap-2">
              <InstagramLogo size={18} weight="bold" aria-hidden />
              See more on Instagram
            </span>
          </GhostButton>
        </div>
      </div>

      <Lightbox items={visible} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </section>
  );
}
