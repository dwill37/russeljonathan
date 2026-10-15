import type { ReactNode } from "react";
import { business, waLink, BOOK_MESSAGE } from "./site";

const linkClass = "text-ink underline decoration-accent decoration-2 underline-offset-4";

export const faqs: { q: string; a: ReactNode; plain: string }[] = [
  {
    q: "How do I book?",
    plain: `Send a message on WhatsApp (${business.phoneDisplay}) or a DM on Instagram (${business.instagram.handle}) with your idea and any references.`,
    a: (
      <>
        Send me a message on{" "}
        <a className={linkClass} href={waLink(BOOK_MESSAGE)} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>{" "}
        ({business.phoneDisplay}) or a DM on{" "}
        <a className={linkClass} href={business.instagram.url} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>{" "}
        ({business.instagram.handle}). Share your idea and any references, and we&apos;ll take it from there.
      </>
    ),
  },
  {
    q: "Can you create a custom design?",
    plain: "Yes. Russel offers custom work and personalized designs built around your idea.",
    a: (
      <>
        Yes. Custom work and personalized designs are what I do: we start from your idea and I draw the piece around it.
        Clients say the final result was exactly what they wanted.
      </>
    ),
  },
  {
    q: "What styles do you do?",
    plain: "Anime, color, black and grey, and lettering.",
    a: <>Anime, color, black and grey, and lettering. Check the gallery above to see each style on skin.</>,
  },
  {
    q: "What are your hours?",
    plain: "Scheduling is flexible. Message on WhatsApp to book a slot that suits you.",
    a: (
      <>
        My schedule is flexible. Message me on{" "}
        <a className={linkClass} href={waLink(BOOK_MESSAGE)} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>{" "}
        and we&apos;ll find a slot that suits you.
      </>
    ),
  },
  {
    q: "Is the studio LGBTQ+ friendly?",
    plain: "Yes. The studio is LGBTQ+ friendly and everyone is welcome.",
    a: <>Yes. The studio is LGBTQ+ friendly, and everyone is welcome.</>,
  },
];

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.plain },
  })),
};

