import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, MapPin, Phone } from 'lucide-react';
import { cars, startingPrice } from '@/lib/cars';
import { carImage } from '@/lib/photos';
import { dealerships, getDealership } from '@/lib/dealerships';
import { inr } from '@/lib/format';
import { locationName } from '@/lib/locations';
import { offers } from '@/lib/offers';

export function generateStaticParams() {
  return dealerships.map((dealer) => ({ slug: dealer.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const dealer = getDealership(params.slug);
  return {
    title: dealer ? `${dealer.name} — AutoCompare` : 'Dealership — AutoCompare',
    description: dealer ? `Fictional profile and demo offers for ${dealer.name}.` : undefined,
  };
}

export default function DealershipPage({ params }: { params: { slug: string } }) {
  const dealer = getDealership(params.slug);
  if (!dealer) notFound();

  const stock = cars.map((car) => ({
    car,
    quotes: offers
      .filter((offer) => offer.dealershipSlug === dealer.slug && offer.carSlug === car.slug)
      .sort((a, b) => a.offerPrice - b.offerPrice),
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Demo dealership</p>
      <h1 className="mt-2 text-4xl font-semibold text-navy">{dealer.name}</h1>
      <p className="mt-3 max-w-2xl text-navy/70">{dealer.summary}</p>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl border border-line bg-white p-6 shadow-card">
          <h2 className="text-lg font-semibold text-navy">Location</h2>
          <p className="mt-3 flex gap-2 text-sm text-navy/80"><MapPin size={16} className="mt-0.5 shrink-0 text-accent" />{dealer.address}</p>
          <p className="mt-2 flex gap-2 text-sm text-navy/80"><Clock size={16} className="mt-0.5 shrink-0 text-accent" />{dealer.hours}</p>
          <p className="mt-4 text-sm text-navy/60">
            Listed as serving {dealer.areas.map((area) => locationName(area)).join(' and ')}. Distances on comparison pages are a fixed demo table, not live navigation.
          </p>
        </section>
        <section id="contact" className="scroll-mt-24 rounded-3xl bg-navy p-6 text-white">
          <h2 className="text-lg font-semibold">Contact</h2>
          <p className="mt-2 text-sm leading-6 text-white/70">
            This phone number is fictional. It is printed so the contact action has a destination. It does not reach a real dealership.
          </p>
          <a href={`tel:${dealer.phone.replace(/\s/g, '')}`} className="btn mt-5 bg-white text-navy hover:bg-mist">
            <Phone size={16} /> {dealer.phone}
          </a>
        </section>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-navy">Available cars and offers</h2>
        <p className="mt-1 text-sm text-navy/60">Every model in the prototype, with this showroom’s illustrative variant prices.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {stock.map(({ car, quotes }) => {
            const lead = quotes[0];
            if (!lead) return null;
            return (
              <article key={car.slug} className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
                <div className="relative h-40">
                  <img src={carImage(car.slug)} alt={car.name} className="h-full w-full object-cover" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#ff2e97]/30 via-transparent to-[#3ef0e0]/20" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#120814]/70 to-transparent" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">{car.brand} · {car.category}</p>
                  <h3 className="mt-1 text-xl font-semibold text-navy">{car.name}</h3>
                  <p className="mt-1 text-sm text-navy/60">Catalogue from {inr(startingPrice(car))}</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {quotes.map((quote) => (
                      <li key={quote.id} className="flex items-center justify-between gap-3 border-t border-line pt-2">
                        <span className="text-navy/80">{quote.variant}</span>
                        <span className="text-right">
                          <span className="block font-semibold text-navy">{inr(quote.offerPrice)}</span>
                          <span className="text-xs text-emerald-800">{inr(quote.discount)} off</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href={`/cars/${car.slug}?dealer=${dealer.slug}&variant=${encodeURIComponent(lead.variant)}`} className="btn-ghost h-10">
                      View Details
                    </Link>
                    <Link href={`/compare?car=${car.slug}&location=${dealer.areas[0]}&budget=4000000&variant=${encodeURIComponent(lead.variant)}&sort=price`} className="btn-primary h-10">
                      Compare prices
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
