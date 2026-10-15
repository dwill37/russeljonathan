"use client";

import { motion } from "framer-motion";
import { business } from "@/lib/site";
import { CountUp, PenHeading, staggerParent, useStaggerItem } from "./motion";

const highlights = [
  {
    title: "Truly custom designs",
    text: "Your idea, drawn from scratch for your body. Clients say the result was “exactly what I wanted.”",
    source: "Facebook + Google reviews",
  },
  {
    title: "High-quality work",
    text: "“Quality” is the word clients use most in their Google reviews. One calls the designs “simply perfect.”",
    source: "Google reviews",
  },
  {
    title: "A clean, beautiful studio",
    text: "Reviewers describe the place as “very clean and beautiful.” Sit back and focus on your piece.",
    source: "Google reviews",
  },
  {
    title: "Flexible scheduling",
    text: "No rigid timetable. Message me on WhatsApp and we’ll find a slot that suits you.",
    source: "Facebook",
  },
];

const stats = [
  { node: <CountUp to={3.2} decimals={1} suffix="K" />, label: "followers on Facebook" },
  { node: <CountUp to={business.instagram.followers} thousands />, label: "followers on Instagram" },
  { node: <CountUp to={business.instagram.posts} />, label: "posts on Instagram" },
  { node: <CountUp to={5} decimals={1} />, label: "rating on Google, 17 reviews" },
];

export function WhyChoose() {
  const item = useStaggerItem();
  return (
    <section aria-labelledby="why-title" className="relative px-4 py-24 sm:px-6 lg:px-10 lg:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <PenHeading id="why-title" className="text-[clamp(2.4rem,5vw,4.25rem)]">
            Why clients keep coming back
          </PenHeading>
          <p className="mt-6 max-w-[30rem] text-lg leading-relaxed text-muted">
            Loyal clients return for every new tattoo. Here is what they mention most.
          </p>
        </div>

        <motion.ul
          className="grid gap-px overflow-hidden rounded-[var(--radius-panel)] bg-hairline sm:grid-cols-2"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {highlights.map((h) => (
            <motion.li
              key={h.title}
              variants={item}
              className="group relative flex flex-col bg-canvas p-7 transition-colors duration-500 hover:bg-surface-1 sm:p-9"
            >
              <span
                aria-hidden
                className="mb-10 h-[3px] w-10 origin-left rounded-full bg-accent transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-x-[2.2]"
              />
              <h3 className="display text-[1.9rem] leading-[1.05]">{h.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{h.text}</p>
              <p className="mt-auto pt-8 text-[12px] font-medium text-muted/80">Source: {h.source}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <div className="mx-auto mt-20 max-w-[1400px] border-t border-hairline pt-12 lg:mt-28">
        <h3 className="sr-only">Social proof</h3>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-2">
              <dt className="text-[14px] text-muted">{s.label}</dt>
              <dd className="display text-[clamp(3rem,7vw,5.5rem)] tabular-nums text-ink">{s.node}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
