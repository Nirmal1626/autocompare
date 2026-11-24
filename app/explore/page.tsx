import Link from 'next/link';
import { CarCard } from '@/components/car-card';
import { brands, cars, categories } from '@/lib/cars';
import type { Category } from '@/lib/types';

export default function ExplorePage({
  searchParams,
}: {
  searchParams: { category?: string; brand?: string };
}) {
  const category = categories.includes(searchParams.category as Category) ? (searchParams.category as Category) : '';
  const brand = brands.includes(searchParams.brand ?? '') ? searchParams.brand ?? '' : '';
  const list = cars.filter((car) => (!category || car.category === category) && (!brand || car.brand === brand));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Catalogue</p>
      <h1 className="mt-2 text-4xl font-semibold text-navy">Explore cars</h1>
      <p className="mt-3 max-w-2xl text-navy/70">Twenty popular models with illustrative ex-showroom prices. Open a car to see every demo dealership quote.</p>

      <div className="mt-8 flex flex-wrap gap-2">
        <Filter href="/explore" active={!category && !brand}>All</Filter>
        {categories.map((item) => (
          <Filter key={item} href={`/explore?category=${item}`} active={category === item}>{item}</Filter>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {brands.map((item) => (
          <Filter key={item} href={`/explore?brand=${encodeURIComponent(item)}${category ? `&category=${category}` : ''}`} active={brand === item}>
            {item}
          </Filter>
        ))}
      </div>

      <p className="mt-8 text-sm text-navy/60">{list.length} models</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((car) => (
          <CarCard key={car.slug} car={car} />
        ))}
      </div>
    </div>
  );
}

function Filter({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} className={`rounded-full px-3 py-1.5 text-sm font-medium ${active ? 'bg-navy text-white' : 'bg-white text-navy ring-1 ring-line'}`}>
      {children}
    </Link>
  );
}
