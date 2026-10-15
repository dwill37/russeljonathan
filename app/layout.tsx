import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import { business, SITE_URL } from "@/lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["700"],
  display: "swap",
});

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const title = "Russel Jonathan Balam | Tattoo Artist in Playa del Carmen";
const description =
  "Custom tattoos in Playa del Carmen by Russel Jonathan Balam: anime, color, black and grey and lettering. Rated 5.0 on Google. Book your custom tattoo on WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords: [
    "tattoo artist Playa del Carmen",
    "anime tattoo Playa del Carmen",
    "custom tattoo Playa del Carmen",
    "tattoo studio Playa del Carmen",
    "Russel Jonathan Balam",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: business.name,
    title,
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Full-color Goku Black Rosé anime tattoo by Russel Jonathan" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0b0b",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  "@id": `${SITE_URL}/#studio`,
  name: business.name,
  alternateName: [business.fullName, business.facebook.name],
  description,
  url: SITE_URL,
  image: `${SITE_URL}/og.jpg`,
  telephone: "+52 984 208 1291",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${business.address.street}, ${business.address.neighborhood}`,
    addressLocality: business.address.city,
    addressRegion: business.address.regionFull,
    postalCode: business.address.postalCode,
    addressCountry: business.address.countryCode,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: business.geo.lat,
    longitude: business.geo.lng,
  },
  hasMap: business.reviewsUrl,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    bestRating: "5",
    reviewCount: business.rating.count,
  },
  founder: { "@type": "Person", name: business.fullName, jobTitle: "Tattoo artist" },
  sameAs: [business.instagram.url, business.facebook.url],
  knowsAbout: ["Anime tattoos", "Color tattoos", "Black and grey tattoos", "Lettering tattoos", "Custom tattoo design"],
  amenityFeature: [{ "@type": "LocationFeatureSpecification", name: "LGBTQ+ friendly", value: true }],
  areaServed: "Playa del Carmen",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
