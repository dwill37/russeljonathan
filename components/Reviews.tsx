"use client";

import { Star } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { business, reviews } from "@/lib/site";
import { InkLink } from "./buttons";
import { PenHeading, staggerParent, useStaggerItem } from "./motion";

function Stars() {
  return (
    <div className="flex gap-0.5 text-accent" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} weight="fill" aria-hidden />
      ))}
    </div>
  );
}

export function Reviews() {
  const item = useStaggerItem();
  const [featured, ...rest] = reviews;

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="border-y border-hairline bg-surface-1/40 px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <PenHeading id="reviews-title" className="text-[clamp(2.6rem,6vw,5rem)]">
            5.0 on Google
          </PenHeading>
          <p className="text-[15px] text-muted sm:pb-5">Based on {business.rating.count} Google reviews.</p>
        </div>

        <motion.div
          className="mt-14 grid gap-3 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.figure
            variants={item}
            className="flex flex-col justify-between rounded-[var(--radius-panel)] border border-hairline bg-canvas p-8 sm:p-12"
          >
            <Stars />
            <blockquote className="display mt-8 text-[clamp(1.9rem,3.6vw,3.25rem)] leading-[1.05] tracking-[-0.035em]">
              <p>“{featured.text}”</p>
            </blockquote>
            <figcaption className="mt-10 text-[14px] text-muted">
              <span className="font-medium text-ink">{featured.name}</span>
              <span className="mx-2" aria-hidden>
                /
              </span>
              Google review, translated from Spanish
            </figcaption>
          </motion.figure>

          <div className="grid gap-3">
            {rest.map((r) => (
              <motion.figure
                key={r.name}
                variants={item}
                className="flex flex-col rounded-[var(--radius-panel)] border border-hairline bg-canvas p-7 sm:p-9"
              >
                <Stars />
                <blockquote className="mt-5 text-[17px] leading-relaxed text-ink/90">
                  <p>“{r.text}”</p>
                </blockquote>
                <figcaption className="mt-6 text-[14px] text-muted">
                  <span className="font-medium text-ink">{r.name}</span>
                  <span className="mx-2" aria-hidden>
                    /
                  </span>
                  Google review, translated from Spanish
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </motion.div>

        <div className="mt-10">
          <InkLink href={business.reviewsUrl} external>
            Read all {business.rating.count} reviews on Google
          </InkLink>
        </div>
      </div>
    </section>
  );
}
