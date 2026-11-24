import type { ReactNode } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Fuel, Gauge, Settings2, Users } from 'lucide-react';
import { ComparisonTable } from '@/components/comparison-table';
import { OfferCard } from '@/components/offer-card';
import { cars, categoryImage, getCar, startingPrice } from '@/lib/cars';
import { dealerships, getDealership } from '@/lib/dealerships';
import { inr, lakhLabel } from '@/lib/format';
import { budgets, locationName, locations } from '@/lib/locations';
import { comparisonFor, isLocationId } from '@/lib/search';
import type { LocationId } from '@/lib/types';

export function generateStaticParams() {
  return cars.map((car) => ({ slug: car.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const car = getCar(params.slug);
  return {
    title: car ? `${car.name} — AutoCompare` : 'Car — AutoCompare',
    description: car ? `Illustrative ${car.name} offers from fictional Delhi NCR dealerships.` : undefined,
  };
}

export default function CarPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { location?: string; budget?: string; variant?: string; dealer?: string };
}) {
  const car = getCar(params.slug);
  if (!car) notFound();

  const location: LocationId = searchParams.location && isLocationId(searchParams.location) ? searchParams.location : 'noida';
  const parsedBudget = Number(searchParams.budget);
  const budget = Number.isFinite(parsedBudget) && parsedBudget > 0 ? parsedBudget : 2400000;
  const result = comparisonFor(car.slug, location, budget, searchParams.variant, 'price');
  const openedFrom = searchParams.dealer ? getDealership(searchParams.dealer) : undefined;

  function href(next: { location?: LocationId; budget?: number; variant?: string }) {
    const query = new URLSearchParams({
      location: next.location ?? location,
      budget: String(next.budget ?? budget),
      variant: next.variant ?? result.variant,
    });
    if (openedFrom) query.set('dealer', openedFrom.slug);
    return `/cars/${car!.slug}?${query.toString()}`;
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-navy text-white">
        <img src={categoryImage(car.category)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0" style={{ background: `${car.paint}88` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#120814] via-[#2a0d28]/80 to-[#120814]/25" />
        <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">{car.brand} · {car.category} · Illustrative image</p>
            <h1 className="mt-3 text-4xl font-semibold md:text-5xl">{car.name}</h1>
            <p className="mt-4 max-w-xl text-white/80">{car.summary}</p>
            <p className="mt-6 text-sm text-white/70">Starting illustrative price</p>
            <p className="text-3xl font-semibold">{inr(startingPrice(car))}</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/20 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">Demo data</p>
            <p className="mt-2 text-sm leading-6 text-white/80">
              Specifications and prices are sample figures for this prototype. They are not manufacturer or showroom quotations.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-12">
        {openedFrom && (
          <p className="rounded-2xl bg-white px-5 py-4 text-sm text-navy ring-1 ring-line">
            Opened from <Link href={`/dealerships/${openedFrom.slug}`} className="font-semibold text-accent">{openedFrom.name}</Link> in {openedFrom.city}. Their quote for {result.variant} is in the comparison below.
          </p>
        )}

        <section>
          <h2 className="text-2xl font-semibold text-navy">Specifications</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Spec icon={<Fuel size={16} />} label="Fuel" value={car.fuels.join(', ')} />
            <Spec icon={<Settings2 size={16} />} label="Transmission" value={car.transmission} />
            <Spec icon={<Users size={16} />} label="Seats" value={String(car.seats)} />
            <Spec icon={<Gauge size={16} />} label="Mileage" value={car.mileage} />
          </div>
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-4 ring-1 ring-line">
              <dt className="text-xs font-semibold uppercase tracking-wide text-navy/50">Engine</dt>
              <dd className="mt-1 font-medium text-navy">{car.engine}</dd>
            </div>
            <div className="rounded-2xl bg-white p-4 ring-1 ring-line">
              <dt className="text-xs font-semibold uppercase tracking-wide text-navy/50">Power</dt>
              <dd className="mt-1 font-medium text-navy">{car.power}</dd>
            </div>
          </dl>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-navy">Available variants</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {car.variants.map((variant) => {
              const selected = variant.name === result.variant;
              return (
                <Link
                  key={variant.name}
                  href={href({ variant: variant.name })}
                  className={`rounded-3xl border bg-white p-5 shadow-card ${selected ? 'border-accent' : 'border-line'}`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">{selected ? 'Comparing' : 'Select to compare'}</p>
                  <h3 className="mt-2 text-lg font-semibold text-navy">{variant.name}</h3>
                  <p className="mt-1 text-sm text-navy/70">{variant.fuel} · {variant.transmission}</p>
                  <p className="mt-3 font-semibold text-navy">{inr(variant.price)}</p>
                  <p className="text-xs text-navy/50">Illustrative list price</p>
                </Link>
              );
            })}
          </div>
        </section>

        <section>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-navy">Dealership offers</h2>
              <p className="mt-1 text-sm text-navy/60">
                {result.variant} in {locationName(location)} · budget {inr(budget)}
              </p>
            </div>
            <Link href={`/compare?car=${car.slug}&location=${location}&budget=${budget}&variant=${encodeURIComponent(result.variant)}&sort=price`} className="text-sm font-semibold text-accent">
              Open full comparison
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {locations.map((item) => (
              <Link key={item.id} href={href({ location: item.id })} className={`rounded-full px-3 py-1.5 text-sm font-medium ${location === item.id ? 'bg-accent text-white' : 'bg-white text-navy ring-1 ring-line'}`}>
                {item.name}
              </Link>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {budgets.map((amount) => (
              <Link key={amount} href={href({ budget: amount })} className={`rounded-full px-3 py-1.5 text-sm font-medium ${budget === amount ? 'bg-accent text-white' : 'bg-white text-navy ring-1 ring-line'}`}>
                {lakhLabel(amount)}
              </Link>
            ))}
          </div>

          {result.matches.length > 0 ? (
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {result.matches.map((row) => (
                <OfferCard key={row.id} row={row} cheapest={row.id === result.cheapest?.id} location={location} budget={budget} />
              ))}
            </div>
          ) : (
            <p className="mt-6 rounded-2xl bg-white p-5 text-sm text-navy/70 ring-1 ring-line">
              No dealership covering {locationName(location)} has {result.variant} inside {inr(budget)}. Raise the budget or pick another variant. Every demo quote is still in the table.
            </p>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-navy">Price comparison</h2>
          <p className="mb-4 mt-1 text-sm text-navy/60">All five fictional dealerships for {result.variant}. The highlighted offer is the lowest one that covers {locationName(location)} and fits the budget.</p>
          <ComparisonTable rows={result.rows} cheapestId={result.cheapest?.id} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-navy">Dealer information</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {dealerships.map((dealer) => {
              const quote = result.rows.find((row) => row.dealershipSlug === dealer.slug);
              return (
                <article key={dealer.slug} className="rounded-3xl border border-line bg-white p-5 shadow-card">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-navy">{dealer.name}</h3>
                      <p className="text-sm text-navy/60">{dealer.city}</p>
                    </div>
                    {quote && <p className="text-sm font-semibold text-navy">{inr(quote.offerPrice)}</p>}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-navy/70">{dealer.summary}</p>
                  <p className="mt-3 text-sm text-navy/80">{dealer.address}</p>
                  <p className="mt-1 text-sm text-navy/60">Demo line {dealer.phone}</p>
                  <Link href={`/dealerships/${dealer.slug}`} className="mt-4 inline-flex text-sm font-semibold text-accent">
                    View dealership
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

function Spec({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-line">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-navy/50">{icon}{label}</p>
      <p className="mt-2 font-medium text-navy">{value}</p>
    </div>
  );
}
