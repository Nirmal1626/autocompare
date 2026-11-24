import Link from 'next/link';
import { cars } from '@/lib/cars';
import { dealerships } from '@/lib/dealerships';
import { locations } from '@/lib/locations';

export const metadata = {
  title: 'About Us — AutoCompare',
  description: 'What the AutoCompare Delhi NCR price-comparison prototype includes.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">About us</p>
      <h1 className="mt-2 text-4xl font-semibold text-navy">A clearer way to shop the same car.</h1>
      <p className="mt-4 text-lg leading-8 text-navy/75">
        AutoCompare is a frontend prototype of a car price comparison platform for Delhi NCR. A shopper picks a model, a city, and a maximum budget, then sees how fictional dealerships price that car differently.
      </p>

      <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-navy">
        Every price, discount, phone number, address, and delivery estimate in this app is sample data. Nothing here is a live showroom quotation or an official manufacturer price.
      </div>

      <section className="mt-10 space-y-3 text-navy/80">
        <h2 className="text-2xl font-semibold text-navy">What you can do</h2>
        <p>The catalogue has {cars.length} popular Indian models across SUVs, sedans, and hatchbacks. Each model has fuel types, transmissions, and three variants with an illustrative starting price.</p>
        <p>
          {dealerships.map((dealer) => dealer.name).join(', ')} are invented showrooms. They cover {locations.map((location) => location.name).join(', ')}. The same variant is cheaper at one outlet than another, so the comparison has something to rank.
        </p>
        <p>Search results list only the outlets that cover the chosen city and fit the budget. A table beside those cards still lines up all five dealerships. Sort by lowest price, highest discount, or nearest showroom. The nearest order uses a fixed kilometre table, not a map.</p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-navy">Built to grow into a real service</h2>
        <p className="mt-3 text-navy/80">
          Cars, cities, dealerships, and offers live in TypeScript files under <code className="rounded bg-white px-1.5 py-0.5 text-sm ring-1 ring-line">lib/</code>. Pages read those files through small helpers. A later version can replace the helpers with API calls without redesigning the screens.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/explore" className="btn-primary">Explore Cars</Link>
          <Link href="/compare" className="btn-ghost">Compare Prices</Link>
          <Link href="/dealerships" className="btn-ghost">Dealerships</Link>
        </div>
      </section>
    </div>
  );
}
