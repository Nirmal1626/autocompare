import Link from 'next/link';
import { ComparisonTable } from '@/components/comparison-table';
import { OfferCard } from '@/components/offer-card';
import { SearchForm } from '@/components/search-form';
import { getCar } from '@/lib/cars';
import { inr } from '@/lib/format';
import { locationName } from '@/lib/locations';
import { comparisonFor, isLocationId, isSort } from '@/lib/search';
import type { LocationId, SortKey } from '@/lib/types';

const sorts: { id: SortKey; label: string }[] = [
  { id: 'price', label: 'Lowest price' },
  { id: 'discount', label: 'Highest discount' },
  { id: 'nearest', label: 'Nearest dealership' },
];

export default function ComparePage({
  searchParams,
}: {
  searchParams: { car?: string; location?: string; budget?: string; sort?: string; variant?: string; brand?: string };
}) {
  const car = searchParams.car ? getCar(searchParams.car) : undefined;
  const location = searchParams.location && isLocationId(searchParams.location) ? searchParams.location : undefined;
  const budget = Number(searchParams.budget);
  const sort: SortKey = searchParams.sort && isSort(searchParams.sort) ? searchParams.sort : 'price';
  const ready = Boolean(car && location && Number.isFinite(budget) && budget > 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Compare</p>
      <h1 className="mt-2 text-4xl font-semibold text-navy">Compare prices</h1>
      <p className="mt-3 max-w-2xl text-navy/70">
        Offers in the cards are limited to dealerships that cover your city and fit the budget. The table still lines up all five demo dealerships for the same variant.
      </p>
      <div className="mt-8 rounded-3xl border border-line bg-white p-5 shadow-card">
        <SearchForm
          initial={{
            brand: searchParams.brand || car?.brand,
            car: car?.slug,
            location,
            budget: Number.isFinite(budget) ? budget : 2400000,
          }}
          compact
        />
      </div>

      {!ready && (
        <p className="mt-8 rounded-2xl bg-white p-6 text-navy/70 ring-1 ring-line">
          Choose a model, a city in Delhi NCR, and a maximum budget to see offers.
        </p>
      )}

      {ready && car && location && <Results carSlug={car.slug} carName={car.name} location={location} budget={budget} sort={sort} variant={searchParams.variant} />}
    </div>
  );
}

function Results({
  carSlug,
  carName,
  location,
  budget,
  sort,
  variant,
}: {
  carSlug: string;
  carName: string;
  location: LocationId;
  budget: number;
  sort: SortKey;
  variant?: string;
}) {
  const result = comparisonFor(carSlug, location, budget, variant, sort);
  const car = getCar(carSlug);
  const query = (next: { sort?: SortKey; variant?: string }) => {
    const params = new URLSearchParams({
      car: carSlug,
      location,
      budget: String(budget),
      sort: next.sort ?? sort,
      variant: next.variant ?? result.variant,
    });
    return `/compare?${params.toString()}`;
  };

  return (
    <div className="mt-10 space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-navy">{carName} in {locationName(location)}</h2>
          <p className="mt-1 text-sm text-navy/60">Budget {inr(budget)} · Variant {result.variant} · Demo prices</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {sorts.map((item) => (
            <Link key={item.id} href={query({ sort: item.id })} className={`rounded-full px-3 py-1.5 text-sm font-medium ${sort === item.id ? 'bg-navy text-white' : 'bg-white text-navy ring-1 ring-line'}`}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {result.cheapest ? (
        <div className="rounded-3xl bg-navy px-6 py-5 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">Lowest available offer</p>
          <p className="mt-2 text-2xl font-semibold">
            {result.cheapest.dealershipName} · {inr(result.cheapest.offerPrice)}
          </p>
          <p className="mt-1 text-sm text-white/70">
            {result.cheapest.variant} · {inr(result.cheapest.discount)} off the illustrative list price · {result.cheapest.deliveryDays} day delivery
          </p>
        </div>
      ) : (
        <div className="rounded-3xl bg-white px-6 py-5 text-navy ring-1 ring-line">
          No dealership covering {locationName(location)} has this variant inside the budget. The table below still shows every demo quote.
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {car?.variants.map((item) => (
          <Link key={item.name} href={query({ variant: item.name })} className={`rounded-full px-3 py-1.5 text-sm font-medium ${result.variant === item.name ? 'bg-accent text-white' : 'bg-white text-navy ring-1 ring-line'}`}>
            {item.name} · {inr(item.price)}
          </Link>
        ))}
      </div>

      {result.matches.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {result.matches.map((row) => (
            <OfferCard key={row.id} row={row} cheapest={row.id === result.cheapest?.id} location={location} budget={budget} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-navy/60">Try a higher budget or another variant to see offers in this city.</p>
      )}

      <div>
        <h3 className="text-xl font-semibold text-navy">All five dealerships</h3>
        <p className="mb-4 mt-1 text-sm text-navy/60">Same variant, sorted by your selected order. Rows outside the city or over budget stay visible so the comparison is complete.</p>
        <ComparisonTable rows={result.rows} cheapestId={result.cheapest?.id} />
      </div>
    </div>
  );
}
