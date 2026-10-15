import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { business, navLinks } from "@/lib/site";
import { Wordmark } from "./Wordmark";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="px-4 pb-28 pt-20 sm:px-6 lg:px-10 lg:pb-12">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,3fr)_minmax(0,4fr)]">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">Tattoo</span>
          <Wordmark className="mt-2 h-auto w-[min(70vw,300px)] text-ink" />
          <p className="mt-6 max-w-[32ch] text-[15px] leading-relaxed text-muted">
            Custom tattoos by Russel Jonathan Balam in Playa del Carmen. Anime, color, black and grey and lettering.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-[15px]">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-muted transition-colors hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-[15px] leading-relaxed">
          <address className="not-italic text-muted">
            {business.address.street}
            <br />
            {business.address.neighborhood}, {business.address.postalCode} {business.address.city}, {business.address.region}, {business.address.country}
          </address>
          <a href={business.phoneHref} className="mt-4 inline-block text-ink underline decoration-hairline underline-offset-4 hover:decoration-accent">
            {business.phoneDisplay}
          </a>
          <p className="mt-3 text-muted">LGBTQ+ friendly</p>
          <div className="mt-6 flex gap-2">
            <a
              href={business.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram (opens in a new tab)"
              className="grid size-11 place-items-center rounded-full border border-hairline text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <InstagramLogo size={20} aria-hidden />
            </a>
            <a
              href={business.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook (opens in a new tab)"
              className="grid size-11 place-items-center rounded-full border border-hairline text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <FacebookLogo size={20} aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1400px] flex-col gap-2 border-t border-hairline pt-6 text-[13px] text-muted sm:flex-row sm:justify-between">
        <p>© {year} {business.name}. All rights reserved.</p>
        <p>Playa del Carmen, Quintana Roo, Mexico</p>
      </div>
    </footer>
  );
}
