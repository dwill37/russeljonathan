// Every fact here comes from the business's public profiles.
// GMB = Google Business Profile, IG = Instagram, FB = Facebook.

// Set NEXT_PUBLIC_SITE_URL to the live domain when deploying.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const business = {
  name: "Tattoo Russel Jonathan", // GMB
  wordmark: "Russel Jonathan",
  fullName: "Russel Jonathan Balam", // FB page "Tattoo Jonathan Balam" + IG name
  phoneDisplay: "+52 984 208 1291", // GMB, confirmed by IG + FB WhatsApp links
  phoneHref: "tel:+529842081291",
  whatsapp: "529842081291",
  address: {
    street: "Calle 30 Nte, between Av. 30 and Av. 25", // GMB + IG
    neighborhood: "Gonzalo Guerrero",
    postalCode: "77710",
    city: "Playa del Carmen",
    region: "Q.R.",
    regionFull: "Quintana Roo",
    country: "Mexico",
    countryCode: "MX",
  },
  plusCode: "JWPH+74 Playa del Carmen, Quintana Roo, Mexico", // GMB
  // Decoded from the full plus code 76GJJWPH+74
  geo: { lat: 20.6356875, lng: -87.0721875 },
  rating: { value: 5.0, count: 17 }, // GMB
  instagram: { url: "https://www.instagram.com/russel_jonathan_/", handle: "@russel_jonathan_", followers: 1484, posts: 141 },
  facebook: { url: "https://www.facebook.com/tattoojonathanbalam", name: "Tattoo Jonathan Balam", followers: 3200 },
  reviewsUrl: "https://www.google.com/maps/search/?api=1&query=Tattoo+Russel+Jonathan+Playa+del+Carmen",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=20.6356875%2C-87.0721875",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=JWPH%2B74%20Playa%20del%20Carmen%2C%20Quintana%20Roo&z=17&output=embed",
} as const;

export const fullAddress = `${business.address.street}, ${business.address.neighborhood}, ${business.address.postalCode} ${business.address.city}, ${business.address.region}, ${business.address.country}`;

export function waLink(message = "Hi Russel! I'd like a quote for a tattoo. Here's my idea:") {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const BOOK_MESSAGE = "Hi Russel! I'd like to book a tattoo. Here's my idea:";

export type Style = "anime" | "color" | "black-grey" | "lettering";

export const styleLabels: Record<Style, string> = {
  anime: "Anime",
  color: "Color",
  "black-grey": "Black and grey",
  lettering: "Lettering",
};

export type Work = {
  src: string;
  alt: string;
  w: number;
  h: number;
  styles: Style[];
};

const img = (name: string) => `/images/${name}.jpg`;

export const works: Work[] = [
  { src: img("zoro-one-piece-anime-color"), w: 1080, h: 1350, styles: ["anime", "color"], alt: "Full-color One Piece tattoo of Zoro with his swords on an upper arm" },
  { src: img("nezuko-anime-black-grey"), w: 609, h: 812, styles: ["anime", "black-grey"], alt: "Black and grey Demon Slayer tattoo of Nezuko with her bamboo muzzle on a thigh" },
  { src: img("chameleon-color"), w: 768, h: 960, styles: ["color"], alt: "Bright color tattoo of a turquoise and lime chameleon on a branch on a calf" },
  { src: img("fernanda-script-lettering"), w: 609, h: 812, styles: ["lettering"], alt: "Script lettering tattoo spelling Fernanda across a forearm" },
  { src: img("calcifer-anime-color"), w: 652, h: 812, styles: ["anime", "color"], alt: "Color tattoo of Calcifer, the fire spirit from Howl's Moving Castle, on a leg" },
  { src: img("jaguar-black-grey"), w: 750, h: 932, styles: ["black-grey"], alt: "Realistic black and grey jaguar tattoo with green eyes on a forearm" },
  { src: img("goku-black-rose-anime-color"), w: 1016, h: 1016, styles: ["anime", "color"], alt: "Dragon Ball tattoo of Goku Black with pink Rose hair in full color on a forearm" },
  { src: img("psalm-lettering-black-grey"), w: 676, h: 676, styles: ["lettering", "black-grey"], alt: "Black and grey forearm piece with a Spanish psalm in blackletter above a glowing cross" },
  { src: img("bulma-anime-black-grey"), w: 775, h: 1354, styles: ["anime", "black-grey"], alt: "Black and grey Dragon Ball tattoo of Bulma in a bunny outfit with a red bow tie" },
  { src: img("deadpool-unicorn-color"), w: 720, h: 960, styles: ["color"], alt: "Color tattoo of Deadpool riding a pink unicorn on a thigh" },
  { src: img("manga-eyes-anime-panels"), w: 676, h: 676, styles: ["anime", "black-grey"], alt: "Anime eyes tattoo laid out as stacked manga panels with a touch of red on a forearm" },
  { src: img("clown-girl-black-grey"), w: 1028, h: 1016, styles: ["black-grey"], alt: "Black and grey portrait tattoo of a woman in clown makeup on a forearm" },
  { src: img("chibi-goku-anime-color"), w: 813, h: 1016, styles: ["anime", "color"], alt: "Color chibi tattoo of Super Saiyan 4 Goku on a forearm" },
  { src: img("rose-name-lettering-color"), w: 843, h: 1016, styles: ["lettering", "color"], alt: "Red rose tattoo with the name Alaikary in fine script along the stem" },
  { src: img("spartan-helmet-color"), w: 1016, h: 1016, styles: ["color"], alt: "Spartan helmet tattoo with red watercolor splashes on a calf" },
  { src: img("mandala-dotwork-black-grey"), w: 825, h: 960, styles: ["black-grey"], alt: "Dotwork mandala tattoo in black ink on a forearm" },
  { src: img("bart-color"), w: 609, h: 812, styles: ["color"], alt: "Color tattoo of Bart Simpson with sunglasses on a calf" },
  { src: img("tiger-fine-line-black-grey"), w: 768, h: 960, styles: ["black-grey"], alt: "Fine line black tiger tattoo prowling down a thigh" },
  { src: img("muriel-eustace-color"), w: 650, h: 812, styles: ["color"], alt: "Matching color tattoos of Muriel and Eustace from Courage the Cowardly Dog on two wrists" },
  { src: img("kawaii-corn-color"), w: 650, h: 812, styles: ["color"], alt: "Small kawaii corn cob tattoo with a smiling face on an ankle" },
  { src: img("spider-black-grey"), w: 1063, h: 1016, styles: ["black-grey"], alt: "Black ink spider tattoo hanging from a thread on the back of a knee" },
  { src: img("sombrero-worm-color"), w: 651, h: 812, styles: ["color"], alt: "Color cartoon tattoo of a worm wearing a sombrero on a forearm" },
];

export const photos = {
  hero: { src: img("goku-black-rose-anime-color"), w: 1016, h: 1016, alt: "Dragon Ball tattoo of Goku Black with pink Rose hair in full color, by Russel Jonathan" },
  portrait: { src: img("russel-jonathan-portrait"), w: 903, h: 1354, alt: "Russel Jonathan Balam sketching a tattoo design with a stylus" },
  atWork: { src: img("russel-jonathan-at-work"), w: 576, h: 1032, alt: "Gloved hands tattooing a black and grey piece on a client's arm in the studio" },
  storefront: { src: img("studio-storefront"), w: 762, h: 1016, alt: "Studio entrance with a tall black and white TATTOO sign and a glass door" },
};

export const styleCards: { id: Style; title: string; text: string; photo: Work }[] = [
  {
    id: "anime",
    title: "Anime",
    text: "The characters you grew up with, from shonen heroes to Ghibli spirits. Clean lines, sharp expressions and the energy of the original panels.",
    photo: works.find((w) => w.src.includes("manga-eyes"))!,
  },
  {
    id: "color",
    title: "Color",
    text: "Bold, saturated pieces with clear outlines that read well from across the room. Characters, creatures and anything that wants to be loud.",
    photo: works.find((w) => w.src.includes("chameleon"))!,
  },
  {
    id: "black-grey",
    title: "Black and grey",
    text: "Soft gradients and deep blacks for portraits, animals and pieces with a timeless feel.",
    photo: works.find((w) => w.src.includes("jaguar"))!,
  },
  {
    id: "lettering",
    title: "Lettering",
    text: "Names, dates and words that matter, in flowing script or heavy blackletter, laid out to follow the shape of your body.",
    photo: works.find((w) => w.src.includes("fernanda"))!,
  },
];

export const reviews = [
  {
    name: "Adam R.",
    text: "Excellent service, a very talented tattoo artist. I'm very happy with the result; it was exactly what I wanted.",
  },
  {
    name: "Vianey H.",
    text: "I highly recommend them. Their service is excellent and their work is unquestionably high quality. Their designs are simply perfect.",
  },
  {
    name: "Crucita C.",
    text: "For me, he's without a doubt the best. The place is very clean and beautiful. He's the only tattoo artist who has ever tattooed me, and I'll keep coming back for all my tattoos. I recommend him 100%!",
  },
];

export const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#styles", label: "Styles" },
  { href: "#artist", label: "Artist" },
  { href: "#reviews", label: "Reviews" },
  { href: "#visit", label: "Visit" },
  { href: "#faq", label: "FAQ" },
];
