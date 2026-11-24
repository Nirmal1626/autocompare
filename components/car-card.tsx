import Link from 'next/link';
import { categoryImage, startingPrice } from '@/lib/cars';
import { inr } from '@/lib/format';
import type { Car } from '@/lib/types';

export function CarCard({ car }: { car: Car }) {
  return (
    <Link href={`/cars/${car.slug}`} className="group overflow-hidden rounded-3xl border border-line bg-white shadow-card transition hover:-translate-y-1">
      <div className="relative h-40 overflow-hidden">
        <img src={categoryImage(car.category)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0" style={{ background: `${car.paint}55` }} />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-navy">{car.category}</span>
        <span className="absolute bottom-3 left-3 text-xs font-medium text-white">Illustrative image</span>
      </div>
      <div className="space-y-2 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">{car.brand}</p>
        <h3 className="text-lg font-semibold text-navy">{car.model}</h3>
        <p className="text-sm text-navy/70">{car.fuels.join(' · ')} · {car.transmission}</p>
        <p className="text-sm font-semibold text-navy">From {inr(startingPrice(car))}</p>
      </div>
    </Link>
  );
}
