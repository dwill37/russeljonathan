import { Artist } from "@/components/Artist";
import { Faq } from "@/components/Faq";
import { faqJsonLd } from "@/lib/faq";
import { FinalCta } from "@/components/FinalCta";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Nav } from "@/components/Nav";
import { Reviews } from "@/components/Reviews";
import { Styles } from "@/components/Styles";
import { Visit } from "@/components/Visit";
import { WhyChoose } from "@/components/WhyChoose";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-full bg-accent px-5 py-3 font-medium text-accent-ink focus:translate-y-0"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <WhyChoose />
        <Gallery />
        <Styles />
        <Artist />
        <Reviews />
        <HowItWorks />
        <Visit />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
