import Link from 'next/link';
import { inr } from '@/lib/format';
import type { OfferRow } from '@/lib/search';

export function ComparisonTable({
  rows,
  cheapestId,
}: {
  rows: OfferRow[];
  cheapestId?: string;
}) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {rows.map((row) => {
          const cheapest = row.id === cheapestId;
          return (
            <article
              key={`${row.id}-side`}
              className={`rounded-3xl border bg-white p-4 shadow-card ${cheapest ? 'border-emerald-600' : 'border-line'}`}
            >
              {cheapest && <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-800">Lowest in area</p>}
              <Link href={`/dealerships/${row.dealershipSlug}`} className="font-semibold text-navy hover:text-accent">
                {row.dealershipName}
              </Link>
              <p className="text-sm text-navy/60">{row.city}</p>
              <p className="mt-4 text-xs uppercase tracking-wide text-navy/45">Illustrative price</p>
              <p className="text-sm text-navy/40 line-through">{inr(row.originalPrice)}</p>
              <p className="mt-2 text-xs uppercase tracking-wide text-navy/45">Dealer offer</p>
              <p className="text-lg font-semibold text-navy">{inr(row.offerPrice)}</p>
              {!row.withinBudget && <p className="text-xs font-medium text-red-700">Above budget</p>}
              <dl className="mt-3 space-y-1 text-sm text-navy/75">
                <div className="flex justify-between gap-2"><dt>Discount</dt><dd className="font-semibold text-emerald-800">{inr(row.discount)}</dd></div>
                <div className="flex justify-between gap-2"><dt>Delivery</dt><dd>{row.deliveryDays} days</dd></div>
                <div className="flex justify-between gap-2"><dt>Distance</dt><dd>{row.distanceKm} km</dd></div>
              </dl>
              <p className="mt-3 text-xs font-medium text-navy/60">{row.inArea ? 'Covers your city' : 'Elsewhere in NCR'}</p>
            </article>
          );
        })}
      </div>
    <div className="overflow-x-auto rounded-3xl border border-line bg-white shadow-card">
      <table className="min-w-[860px] w-full border-collapse text-left text-sm">
        <thead className="bg-mist text-xs uppercase tracking-wide text-navy/60">
          <tr>
            <th className="px-4 py-3 font-semibold">Dealership</th>
            <th className="px-4 py-3 font-semibold">Illustrative price</th>
            <th className="px-4 py-3 font-semibold">Offer</th>
            <th className="px-4 py-3 font-semibold">Discount</th>
            <th className="px-4 py-3 font-semibold">Delivery</th>
            <th className="px-4 py-3 font-semibold">Distance</th>
            <th className="px-4 py-3 font-semibold">Area</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const cheapest = row.id === cheapestId;
            return (
              <tr key={row.id} className={cheapest ? 'bg-emerald-50' : 'border-t border-line'}>
                <td className="px-4 py-4">
                  <Link href={`/dealerships/${row.dealershipSlug}`} className="font-semibold text-navy hover:text-accent">
                    {row.dealershipName}
                  </Link>
                  <p className="text-navy/60">{row.city}</p>
                  {cheapest && <p className="mt-1 text-xs font-semibold text-emerald-800">Lowest offer in your area</p>}
                </td>
                <td className="px-4 py-4 text-navy/50 line-through">{inr(row.originalPrice)}</td>
                <td className="px-4 py-4 font-semibold text-navy">
                  {inr(row.offerPrice)}
                  {!row.withinBudget && <p className="text-xs font-medium text-red-700">Above budget</p>}
                </td>
                <td className="px-4 py-4 text-emerald-800">{inr(row.discount)}</td>
                <td className="px-4 py-4">{row.deliveryDays} days</td>
                <td className="px-4 py-4">{row.distanceKm} km</td>
                <td className="px-4 py-4">{row.inArea ? 'In selected area' : 'Elsewhere in NCR'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  );
}
