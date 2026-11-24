import Link from 'next/link';
import { startingPrice } from '@/lib/cars';
import { inr } from '@/lib/format';
import { carImage } from '@/lib/photos';
import type { Car } from '@/lib/types';

export function CarCard({ car }: { car: Car }) {
  return (
    <Link href={`/cars/${car.slug}`} className="group overflow-hidden rounded-3xl border border-line bg-white shadow-card transition hover:-translate-y-1">
      <div className="relative h-44 overflow-hidden">
        <img src={carImage(car.slug)} alt={car.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#ff2e97]/30 via-transparent to-[#3ef0e0]/20" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#120814]/75 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-[#120814]/80 px-2.5 py-1 text-xs font-semibold text-white ring-1 ring-[#ff2e97]/50">{car.category}</span>
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
