import { cars } from './cars';
import { dealerships } from './dealerships';
import type { Offer } from './types';

const dealerTerms: Record<string, { cut: number; days: number }> = {
  'delhi-premium-motors': { cut: 28000, days: 21 },
  'ncr-auto-hub': { cut: 64000, days: 14 },
  'noida-car-gallery': { cut: 81000, days: 18 },
  'gurgaon-motors': { cut: 47000, days: 10 },
  'capital-wheels': { cut: 112000, days: 25 },
};

function extraCut(carSlug: string, dealerSlug: string) {
  const seed = Array.from(carSlug + dealerSlug).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return (seed % 6) * 8000;
}

// Independent of the discount so "lowest price" and "highest discount" can rank dealers differently.
function listAdjust(carSlug: string, dealerSlug: string) {
  const seed = Array.from(dealerSlug + '|' + carSlug).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return (seed % 5) * 15000;
}

function buildOffers(): Offer[] {
  const rows: Offer[] = [];
  cars.forEach((car) => {
    dealerships.forEach((dealer) => {
      const terms = dealerTerms[dealer.slug];
      car.variants.forEach((variant) => {
        const discount = Math.min(terms.cut + extraCut(car.slug, dealer.slug), Math.round(variant.price * 0.08));
        const originalPrice = variant.price + listAdjust(car.slug, dealer.slug);
        rows.push({
          id: `${dealer.slug}-${car.slug}-${variant.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          carSlug: car.slug,
          dealershipSlug: dealer.slug,
          variant: variant.name,
          fuel: variant.fuel,
          transmission: variant.transmission,
          originalPrice,
          offerPrice: originalPrice - discount,
          discount,
          deliveryDays: terms.days,
        });
      });
    });
  });
  return rows;
}

export const offers: Offer[] = buildOffers();

export function offersForCar(carSlug: string) {
  return offers.filter((offer) => offer.carSlug === carSlug);
}
