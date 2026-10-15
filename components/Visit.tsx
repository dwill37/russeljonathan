import { MapPin, Clock, Phone, Compass } from "@phosphor-icons/react/dist/ssr";
import { business, photos } from "@/lib/site";
import { GhostButton } from "./buttons";
import { InkImage, PenHeading, Reveal } from "./motion";

export function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <PenHeading id="visit-title" className="text-[clamp(2.6rem,6vw,5rem)]">
          Visit the studio
        </PenHeading>

        <div className="mt-14 grid gap-3 lg:grid-cols-[minmax(0,4fr)_minmax(0,5fr)_minmax(0,3fr)]">
          <Reveal className="flex flex-col rounded-[var(--radius-panel)] border border-hairline bg-surface-1/60 p-7 sm:p-9 lg:order-1">
            <dl className="grid gap-7 text-[15px]">
              <div className="flex gap-4">
                <dt>
                  <MapPin size={22} weight="duotone" className="mt-0.5 text-accent" aria-hidden />
                  <span className="sr-only">Address</span>
                </dt>
                <dd>
                  <address className="not-italic leading-relaxed text-ink">
                    {business.address.street}
                    <br />
                    {business.address.neighborhood}, {business.address.postalCode}
                    <br />
                    {business.address.city}, {business.address.region}, {business.address.country}
                  </address>
                  <p className="mt-2 text-[13px] text-muted">Plus code: {business.plusCode}</p>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt>
                  <Clock size={22} weight="duotone" className="mt-0.5 text-accent" aria-hidden />
                  <span className="sr-only">Hours</span>
                </dt>
                <dd className="leading-relaxed">
                  <span className="text-ink">Flexible scheduling</span>
                  <br />
                  <span className="text-muted">Message on WhatsApp to book your slot.</span>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt>
                  <Phone size={22} weight="duotone" className="mt-0.5 text-accent" aria-hidden />
                  <span className="sr-only">Phone and WhatsApp</span>
                </dt>
                <dd>
                  <a href={business.phoneHref} className="text-ink underline decoration-hairline underline-offset-4 transition-colors hover:decoration-accent">
                    {business.phoneDisplay}
                  </a>
                  <p className="mt-1 text-[13px] text-muted">Phone and WhatsApp</p>
                </dd>
              </div>
            </dl>
            <div className="mt-auto pt-10">
              <GhostButton href={business.directionsUrl} external>
                <span className="inline-flex items-center gap-2">
                  <Compass size={18} weight="bold" aria-hidden />
                  Get directions
                </span>
              </GhostButton>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative min-h-[360px] overflow-hidden rounded-[var(--radius-panel)] border border-hairline bg-surface-1 lg:order-2 lg:min-h-[520px]">
            <iframe
              title="Map showing Tattoo Russel Jonathan on Calle 30 Nte, Gonzalo Guerrero, Playa del Carmen"
              src={business.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="map-ink absolute inset-0 h-full w-full border-0"
            />
          </Reveal>

          <InkImage
            src={photos.storefront.src}
            alt={photos.storefront.alt}
            fill
            sizes="(min-width: 1024px) 25vw, 100vw"
            className="aspect-[4/3] rounded-[var(--radius-panel)] sm:aspect-[16/9] lg:order-3 lg:aspect-auto"
            cut="right"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}
