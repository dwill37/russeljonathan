"use client";

import { ChatCircleText, PencilSimpleLine, CalendarCheck } from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { business, waLink, BOOK_MESSAGE } from "@/lib/site";
import { PenHeading, Reveal } from "./motion";

const steps = [
  {
    icon: ChatCircleText,
    title: "Send your idea",
    body: (
      <>
        Message me on{" "}
        <a className="text-ink underline decoration-accent decoration-2 underline-offset-4" href={waLink(BOOK_MESSAGE)} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>{" "}
        or send an{" "}
        <a className="text-ink underline decoration-accent decoration-2 underline-offset-4" href={business.instagram.url} target="_blank" rel="noopener noreferrer">
          Instagram DM
        </a>{" "}
        with your idea or a reference.
      </>
    ),
  },
  {
    icon: PencilSimpleLine,
    title: "Get your design and quote",
    body: <>I turn your idea into a custom design and send you a quote for it.</>,
  },
  {
    icon: CalendarCheck,
    title: "Book your slot",
    body: <>Pick a time that suits you and come to the studio in Gonzalo Guerrero.</>,
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const raw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const progress = useSpring(raw, { stiffness: 90, damping: 24, restDelta: 0.001 });
  const length = reduce ? 1 : progress;

  return (
    <section ref={ref} aria-labelledby="how-title" className="px-4 py-24 sm:px-6 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <PenHeading id="how-title" className="text-[clamp(2.6rem,6vw,5rem)]">
          How it works
        </PenHeading>

        <div className="relative mt-16 lg:mt-24">
          {/* Needle path: horizontal on desktop */}
          <svg
            aria-hidden
            className="pointer-events-none absolute left-0 top-[27px] hidden h-10 w-full lg:block"
            viewBox="0 0 1000 40"
            preserveAspectRatio="none"
          >
            <path d="M0 20 C 120 2, 220 38, 333 20 S 560 2, 666 20 S 880 38, 1000 20" fill="none" stroke="var(--color-hairline)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeDasharray="2 8" />
            <motion.path
              d="M0 20 C 120 2, 220 38, 333 20 S 560 2, 666 20 S 880 38, 1000 20"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: length }}
            />
          </svg>
          {/* Vertical on mobile */}
          <svg
            aria-hidden
            className="pointer-events-none absolute left-4 top-6 h-[calc(100%-3rem)] w-6 lg:hidden"
            viewBox="0 0 24 1000"
            preserveAspectRatio="none"
          >
            <path d="M12 0 C 2 160, 22 330, 12 500 S 2 840, 12 1000" fill="none" stroke="var(--color-hairline)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeDasharray="2 8" />
            <motion.path
              d="M12 0 C 2 160, 22 330, 12 500 S 2 840, 12 1000"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: length }}
            />
          </svg>

          <ol className="relative grid gap-14 lg:grid-cols-3 lg:gap-10">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal as="li" key={s.title} delay={i * 0.12} className="flex gap-6 lg:flex-col">
                  <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full border border-hairline bg-canvas text-accent">
                    <Icon size={24} weight="duotone" aria-hidden />
                  </span>
                  <div>
                    <h3 className="display text-[1.9rem] leading-[1.05] lg:mt-8">
                      <span className="sr-only">Step {i + 1}: </span>
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-[30ch] text-[16px] leading-relaxed text-muted">{s.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
