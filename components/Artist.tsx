"use client";

import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { business, photos } from "@/lib/site";
import { InkLink } from "./buttons";
import { InkImage, PenHeading, Reveal } from "./motion";

export function Artist() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const yFront = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [120, -100]);

  return (
    <section ref={ref} id="artist" aria-labelledby="artist-title" className="overflow-hidden px-4 py-24 sm:px-6 lg:px-10 lg:py-36">
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-24">
        {/* Photo stack with parallax */}
        <div className="relative mx-auto w-full max-w-[560px] pb-24 pr-10 sm:pb-28 sm:pr-20 lg:mx-0">
          <motion.div style={{ y: yBack }}>
            <InkImage
              src={photos.portrait.src}
              alt={photos.portrait.alt}
              width={photos.portrait.w}
              height={photos.portrait.h}
              sizes="(min-width: 1024px) 460px, 85vw"
              className="aspect-[4/5] w-full rounded-[var(--radius-panel)]"
              cut="left"
            />
          </motion.div>
          <motion.div style={{ y: yFront }} className="absolute bottom-0 right-0 w-[46%] sm:w-[42%]">
            <InkImage
              src={photos.atWork.src}
              alt={photos.atWork.alt}
              width={photos.atWork.w}
              height={photos.atWork.h}
              sizes="(min-width: 1024px) 240px, 40vw"
              className="aspect-[3/4] w-full rounded-[var(--radius-panel)] border-4 border-canvas"
              cut="diagRev"
              delay={0.25}
            />
          </motion.div>
        </div>

        <div>
          <PenHeading id="artist-title" className="text-[clamp(2.6rem,6vw,5rem)]">
            Meet Russel
          </PenHeading>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-relaxed text-ink sm:text-2xl">
              I&apos;m Russel Jonathan Balam, a tattoo artist in Playa del Carmen.
            </p>
            <p className="mt-5 max-w-[34rem] text-lg leading-relaxed text-muted">
              I do professional, custom work with personalized designs. Anime heroes, loud color, soft black and grey or a
              name in script: you bring the idea, I draw it for you.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 grid max-w-[30rem] grid-cols-3 gap-6 border-t border-hairline pt-8">
            <div>
              <p className="display text-4xl">5.0</p>
              <p className="mt-1 text-[13px] text-muted">on Google</p>
            </div>
            <div>
              <p className="display text-4xl">3.2K</p>
              <p className="mt-1 text-[13px] text-muted">on Facebook</p>
            </div>
            <div>
              <p className="display text-4xl">1,484</p>
              <p className="mt-1 text-[13px] text-muted">on Instagram</p>
            </div>
          </Reveal>

          <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-[15px]">
            <InkLink href={business.instagram.url} external>
              <span className="inline-flex items-center gap-2">
                <InstagramLogo size={18} aria-hidden /> {business.instagram.handle}
              </span>
            </InkLink>
            <InkLink href={business.facebook.url} external>
              <span className="inline-flex items-center gap-2">
                <FacebookLogo size={18} aria-hidden /> {business.facebook.name}
              </span>
            </InkLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
