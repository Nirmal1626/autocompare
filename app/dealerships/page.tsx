import Link from 'next/link';
import { Clock, MapPin, Phone } from 'lucide-react';
import { cars } from '@/lib/cars';
import { dealerships } from '@/lib/dealerships';
import { locationName } from '@/lib/locations';

export const metadata = {
  title: 'Dealerships — AutoCompare',
  description: 'Five fictional Delhi NCR dealerships used in the AutoCompare demo.',
};

export default function DealershipsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Delhi NCR</p>
      <h1 className="mt-2 text-4xl font-semibold text-navy">Dealerships</h1>
      <p className="mt-3 max-w-2xl text-navy/70">
        These five showrooms are fictional. Each one stocks the same twenty demo cars at a different illustrative price, so a search can rank real differences.
      </p>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {dealerships.map((dealer) => (
          <article key={dealer.slug} className="rounded-3xl border border-line bg-white p-6 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Demo dealership</p>
            <h2 className="mt-2 text-2xl font-semibold text-navy">{dealer.name}</h2>
            <p className="mt-3 text-sm leading-6 text-navy/70">{dealer.summary}</p>
            <dl className="mt-5 space-y-2 text-sm text-navy/80">
              <div className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-accent" /><dd>{dealer.address}</dd></div>
              <div className="flex gap-2"><Phone size={16} className="mt-0.5 shrink-0 text-accent" /><dd>Demo number {dealer.phone}</dd></div>
              <div className="flex gap-2"><Clock size={16} className="mt-0.5 shrink-0 text-accent" /><dd>{dealer.hours}</dd></div>
            </dl>
            <p className="mt-4 text-sm text-navy/60">
              Covers {dealer.areas.map((area) => locationName(area)).join(', ')} · {cars.length} models in the demo inventory
            </p>
            <Link href={`/dealerships/${dealer.slug}`} className="btn-primary mt-5 h-10">
              View dealership
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
