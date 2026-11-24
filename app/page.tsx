import Link from 'next/link';
import { ArrowRight, BadgeCheck, MapPinned, Scale } from 'lucide-react';
import { CarCard } from '@/components/car-card';
import { SearchForm } from '@/components/search-form';
import { cars, categories, categoryImage } from '@/lib/cars';

const featured = ['mahindra-xuv700', 'hyundai-creta', 'honda-city', 'maruti-swift']
  .map((slug) => cars.find((car) => car.slug === slug))
  .filter((car): car is NonNullable<typeof car> => Boolean(car));

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-navy text-white">
        <img src="/vice-night.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#120814] via-[#120814]/70 to-[#120814]/15" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Delhi NCR · Demo prototype</p>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight md:text-6xl">Find Your Dream Car at the Best Price.</h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-white/80">
              Compare car prices from multiple dealerships across Delhi NCR and make a smarter buying decision.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/80">
              <span className="inline-flex items-center gap-2"><Scale size={16} /> Five fictional dealers</span>
              <span className="inline-flex items-center gap-2"><MapPinned size={16} /> Six NCR cities</span>
              <span className="inline-flex items-center gap-2"><BadgeCheck size={16} /> Prices marked as demo</span>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-5 text-navy shadow-card md:p-6">
            <p className="text-sm font-semibold text-navy">Search illustrative offers</p>
            <p className="mb-4 mt-1 text-sm text-navy/60">Results update from the demo catalogue. Nothing here is a live quotation.</p>
            <SearchForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Categories</p>
            <h2 className="mt-2 text-3xl font-semibold text-navy">Shop by body style</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {categories.map((category) => (
            <Link key={category} href={`/explore?category=${category}`} className="group relative h-48 overflow-hidden rounded-3xl">
              <img src={categoryImage(category)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div>
                  <p className="text-xl font-semibold">{category}</p>
                  <p className="text-sm text-white/80">{cars.filter((car) => car.category === category).length} models</p>
                </div>
                <ArrowRight size={18} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Featured</p>
            <h2 className="mt-2 text-3xl font-semibold text-navy">Cars people start with</h2>
          </div>
          <Link href="/explore" className="hidden text-sm font-semibold text-accent md:inline">See all 20 models</Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((car) => (
            <CarCard key={car.slug} car={car} />
          ))}
        </div>
      </section>
    </div>
  );
}
