"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { styleCards } from "@/lib/site";
import { WhatsAppButton } from "./buttons";
import { PenHeading, staggerParent, useStaggerItem } from "./motion";

const layout: Record<string, { card: string; media: string; sizes: string }> = {
  anime: {
    card: "lg:col-start-1 lg:row-span-2 lg:row-start-1",
    media: "aspect-[4/5] lg:aspect-auto lg:flex-1",
    sizes: "(min-width: 1024px) 40vw, 100vw",
  },
  color: { card: "lg:col-start-2 lg:row-start-1", media: "aspect-[4/3]", sizes: "(min-width: 1024px) 30vw, 100vw" },
  "black-grey": { card: "lg:col-start-3 lg:row-start-1", media: "aspect-[4/3]", sizes: "(min-width: 1024px) 30vw, 100vw" },
  lettering: {
    card: "lg:col-span-2 lg:col-start-2 lg:row-start-2 lg:grid lg:grid-cols-2",
    media: "aspect-[4/3] lg:aspect-auto lg:h-full",
    sizes: "(min-width: 1024px) 30vw, 100vw",
  },
};

export function Styles() {
  const item = useStaggerItem();
  return (
    <section id="styles" aria-labelledby="styles-title" className="bg-surface-1/40 px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-5 text-[12px] font-medium uppercase tracking-[0.2em] text-accent">Anime / Color / Black and grey / Lettering</p>
        <PenHeading id="styles-title" className="max-w-[18ch] text-[clamp(2.6rem,6vw,5rem)]">
          Four styles, one steady hand
        </PenHeading>

        <motion.ul
          className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr] lg:grid-rows-[auto_auto]"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {styleCards.map((s) => {
            const l = layout[s.id];
            return (
              <motion.li
                key={s.id}
                variants={item}
                className={`ink-hover group flex flex-col overflow-hidden rounded-[var(--radius-panel)] border border-hairline bg-canvas ${l.card}`}
              >
                <div className={`relative overflow-hidden ${l.media}`}>
                  <Image
                    src={s.photo.src}
                    alt={s.photo.alt}
                    fill
                    sizes={l.sizes}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h3 className="display text-[2.1rem] leading-none">{s.title}</h3>
                  <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-muted">{s.text}</p>
                  <div className="mt-auto pt-7">
                    <WhatsAppButton message={`Hi Russel! I'd like a quote for ${s.id === "anime" ? "an" : "a"} ${s.title.toLowerCase()} tattoo. Here's my idea:`}>
                      Ask for a quote
                    </WhatsAppButton>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
