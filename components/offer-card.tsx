import Link from 'next/link';
import { Clock, MapPin, Tag } from 'lucide-react';
import { getCar } from '@/lib/cars';
import { inr } from '@/lib/format';
import type { OfferRow } from '@/lib/search';

export function OfferCard({
  row,
  cheapest,
  location,
  budget,
}: {
  row: OfferRow;
  cheapest?: boolean;
  location?: string;
  budget?: number;
}) {
  const model = getCar(row.carSlug)?.name ?? row.carSlug;
  const details = new URLSearchParams({ variant: row.variant, dealer: row.dealershipSlug });
  if (location) details.set('location', location);
  if (budget) details.set('budget', String(budget));

  return (
    <article className={`rounded-3xl border bg-white p-5 shadow-card ${cheapest ? 'border-emerald-600' : 'border-line'}`}>
      {cheapest && <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-emerald-800">Cheapest in your area</p>}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-navy">{row.dealershipName}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-navy/60">
            <MapPin size={14} /> {row.city} · {row.distanceKm} km from your search
          </p>
          <p className="mt-2 text-sm font-medium text-navy">{model}</p>
        </div>
        <p className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-navy">{row.variant}</p>
      </div>
      <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
        <div>
          <dt className="text-navy/50">Illustrative price</dt>
          <dd className="font-medium text-navy/40 line-through">{inr(row.originalPrice)}</dd>
        </div>
        <div>
          <dt className="text-navy/50">Offer</dt>
          <dd className="text-lg font-semibold text-navy">{inr(row.offerPrice)}</dd>
        </div>
        <div>
          <dt className="flex items-center gap-1 text-navy/50"><Tag size={12} /> Discount</dt>
          <dd className="font-semibold text-emerald-800">{inr(row.discount)}</dd>
        </div>
      </dl>
      <p className="mt-4 flex items-center gap-1 text-sm text-navy/70">
        <Clock size={14} /> Estimated delivery {row.deliveryDays} days
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Link href={`/cars/${row.carSlug}?${details.toString()}`} className="btn-ghost h-10">
          View Details
        </Link>
        <Link href={`/dealerships/${row.dealershipSlug}#contact`} className="btn-primary h-10">
          Contact Dealership
        </Link>
      </div>
    </article>
  );
}
