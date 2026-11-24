'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { brands, carsByBrand } from '@/lib/cars';
import { budgets, locations } from '@/lib/locations';
import { lakhLabel } from '@/lib/format';
import type { LocationId } from '@/lib/types';

type Props = {
  initial?: {
    brand?: string;
    car?: string;
    location?: string;
    budget?: number;
  };
  compact?: boolean;
};

export function SearchForm({ initial, compact }: Props) {
  const router = useRouter();
  const [brand, setBrand] = useState(initial?.brand ?? '');
  const [car, setCar] = useState(initial?.car ?? '');
  const [location, setLocation] = useState(initial?.location ?? 'noida');
  const [budget, setBudget] = useState(String(initial?.budget ?? 2400000));
  const [error, setError] = useState('');

  const models = useMemo(() => carsByBrand(brand || undefined), [brand]);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!car || !location || !budget) {
      setError('Choose a model, a Delhi NCR location, and a maximum budget.');
      return;
    }
    const params = new URLSearchParams({
      car,
      location,
      budget,
      sort: 'price',
    });
    if (brand) params.set('brand', brand);
    router.push(`/compare?${params.toString()}`);
  }

  return (
    <form onSubmit={submit} className={compact ? 'grid gap-3' : 'grid gap-4'}>
      <div className={compact ? 'grid gap-3 md:grid-cols-2' : 'grid gap-3 sm:grid-cols-2'}>
        <label className="field">
          Select car brand
          <select
            value={brand}
            onChange={(event) => {
              setBrand(event.target.value);
              setCar('');
            }}
          >
            <option value="">All brands</option>
            {brands.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          Select car model
          <select value={car} onChange={(event) => setCar(event.target.value)} required>
            <option value="">Choose a model</option>
            {models.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          Select location
          <select value={location} onChange={(event) => setLocation(event.target.value as LocationId)}>
            {locations.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          Maximum budget
          <select value={budget} onChange={(event) => setBudget(event.target.value)}>
            {budgets.map((amount) => (
              <option key={amount} value={amount}>
                {lakhLabel(amount)}
              </option>
            ))}
          </select>
        </label>
      </div>
      {error && <p className="text-sm font-medium text-red-700">{error}</p>}
      <button type="submit" className="btn-primary w-full sm:w-auto">
        <Search size={16} /> Search Offers
      </button>
    </form>
  );
}
