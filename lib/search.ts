import { getCar } from './cars';
import { distanceTo, getDealership, serves } from './dealerships';
import { offers } from './offers';
import type { LocationId, Offer, SortKey } from './types';

export type OfferRow = Offer & {
  dealershipName: string;
  city: string;
  inArea: boolean;
  distanceKm: number;
  withinBudget: boolean;
};

export function rowsFor(carSlug: string, locationId: LocationId, budget: number): OfferRow[] {
  return offers
    .filter((offer) => offer.carSlug === carSlug)
    .map((offer) => {
      const dealer = getDealership(offer.dealershipSlug);
      return {
        ...offer,
        dealershipName: dealer?.name ?? offer.dealershipSlug,
        city: dealer?.city ?? '',
        inArea: dealer ? serves(dealer, locationId) : false,
        distanceKm: distanceTo(locationId, offer.dealershipSlug),
        withinBudget: offer.offerPrice <= budget,
      };
    });
}

export function sortRows(rows: OfferRow[], sort: SortKey) {
  const copy = [...rows];
  if (sort === 'discount') copy.sort((a, b) => b.discount - a.discount || a.offerPrice - b.offerPrice);
  else if (sort === 'nearest') copy.sort((a, b) => a.distanceKm - b.distanceKm || a.offerPrice - b.offerPrice);
  else copy.sort((a, b) => a.offerPrice - b.offerPrice);
  return copy;
}

export function pickVariant(carSlug: string, locationId: LocationId, budget: number, requested?: string) {
  const variants = getCar(carSlug)?.variants ?? [];
  if (requested && variants.some((variant) => variant.name === requested)) return requested;
  const priced = rowsFor(carSlug, locationId, budget);
  const affordable = variants.find((variant) =>
    priced.some((row) => row.variant === variant.name && row.inArea && row.withinBudget),
  );
  return affordable?.name ?? variants[0]?.name ?? '';
}

export function comparisonFor(
  carSlug: string,
  locationId: LocationId,
  budget: number,
  requestedVariant: string | undefined,
  sort: SortKey,
) {
  const variant = pickVariant(carSlug, locationId, budget, requestedVariant);
  const rows = sortRows(
    rowsFor(carSlug, locationId, budget).filter((row) => row.variant === variant),
    sort,
  );
  const matches = rows.filter((row) => row.inArea && row.withinBudget);
  const cheapest = [...matches].sort((a, b) => a.offerPrice - b.offerPrice)[0] ?? null;
  return { rows, matches, cheapest, variant };
}

export function inventoryForDealer(dealershipSlug: string) {
  const byCar = new Map<string, Offer>();
  offers
    .filter((offer) => offer.dealershipSlug === dealershipSlug)
    .forEach((offer) => {
      const current = byCar.get(offer.carSlug);
      if (!current || offer.offerPrice < current.offerPrice) byCar.set(offer.carSlug, offer);
    });
  return Array.from(byCar.values());
}

export function isLocationId(value: string): value is LocationId {
  return ['delhi', 'noida', 'greater-noida', 'ghaziabad', 'gurugram', 'faridabad'].includes(value);
}

export function isSort(value: string): value is SortKey {
  return value === 'price' || value === 'discount' || value === 'nearest';
}
