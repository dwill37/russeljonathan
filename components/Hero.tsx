"use client";

import { Star } from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { business, photos } from "@/lib/site";
import { GhostButton, WhatsAppButton } from "./buttons";
import { Wordmark } from "./Wordmark";

const HEADLINE = ["Custom", "tattoos,", "drawn", "for", "you", "in", "Playa", "del", "Carmen."];
const ACCENT_FROM = 2;
const ACCENT_TO = 4;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);

  return (
    <section ref={ref} id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[100dvh] overflow-hidden">
      {/* Photo panel: full-bleed on mobile, diagonal manga panel on desktop */}
      <div className="absolute inset-0 -z-10 lg:left-auto lg:w-[62%]">
        <motion.div className="absolute inset-0" style={{ y, scale }}>
          <div className="hero-panel absolute inset-0">
            <div className="hero-bloom absolute inset-0">
              <Image
                src={photos.hero.src}
                alt={photos.hero.alt}
                fill
                priority
                fetchPriority="high"
                sizes="(min-width: 1024px) 62vw, 100vw"
                className="object-cover object-[50%_40%]"
              />
            </div>
          </div>
        </motion.div>
        {/* Legibility scrims (functional, not decorative) */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-canvas/85 to-transparent" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-canvas from-25% via-canvas/70 via-55% to-canvas/0 lg:hidden" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-canvas to-transparent lg:block" />
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line
            className="hero-slash"
            x1="22"
            y1="0"
            x2="0"
            y2="100"
            stroke="var(--color-accent)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <motion.div
        style={{ y: textY }}
        className="mx-auto flex w-full max-w-[1400px] flex-col justify-end px-4 pb-14 pt-28 sm:px-6 lg:justify-center lg:px-10 lg:pb-20 lg:pt-24"
      >
        <div className="max-w-[44rem]">
          <div aria-hidden className="mb-6 text-ink lg:mb-8">
            <Wordmark draw className="h-auto w-[min(78vw,400px)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]" />
          </div>

          <h1
            id="hero-title"
            className="display text-[clamp(2.6rem,7.2vw,5.25rem)] text-ink [text-shadow:0_2px_24px_rgba(12,11,11,0.55)]"
          >
            {HEADLINE.map((w, i) => (
              <span key={i}>
                <span className="hero-word">
                  <span
                    style={{ "--i": i } as CSSProperties}
                    className={i >= ACCENT_FROM && i <= ACCENT_TO ? "text-accent" : undefined}
                  >
                    {w}
                  </span>
                </span>
                {i < HEADLINE.length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          <p
            className="hero-rise mt-6 max-w-[34rem] text-lg leading-relaxed text-ink/85 sm:text-xl"
            style={{ "--i": 0 } as CSSProperties}
          >
            Anime, color, black and grey and lettering. Bring me your idea and I&apos;ll draw a piece made only for you.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="hero-rise" style={{ "--i": 1 } as CSSProperties}>
              <WhatsAppButton size="lg" className="w-full sm:w-auto" />
            </div>
            <div className="hero-rise" style={{ "--i": 2 } as CSSProperties}>
              <GhostButton href="#work" className="!min-h-14 w-full !px-8 sm:w-auto">
                See the work
              </GhostButton>
            </div>
          </div>

          <ul className="mt-8 flex flex-wrap items-center gap-2.5" aria-label="Highlights">
            <li className="hero-rise" style={{ "--i": 3 } as CSSProperties}>
              <a
                href={business.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-hairline bg-canvas/70 px-3.5 text-[13px] font-medium text-ink backdrop-blur transition-colors hover:border-accent"
              >
                <span>5.0</span>
                <Star size={14} weight="fill" className="text-accent" aria-hidden />
                <span className="text-muted">on Google</span>
                <span className="sr-only">(rating from 17 Google reviews, opens Google Maps)</span>
              </a>
            </li>
            <li
              className="hero-rise inline-flex min-h-9 items-center gap-2 rounded-full border border-hairline bg-canvas/70 px-3.5 text-[13px] font-medium text-ink backdrop-blur"
              style={{ "--i": 4 } as CSSProperties}
            >
              <span
                aria-hidden
                className="h-2.5 w-4 rounded-[2px] bg-[linear-gradient(to_bottom,#e40303_0_16.6%,#ff8c00_16.6%_33.3%,#ffed00_33.3%_50%,#008026_50%_66.6%,#004dff_66.6%_83.3%,#750787_83.3%)]"
              />
              LGBTQ+ friendly
            </li>
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
