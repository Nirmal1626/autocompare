import type { Dealership, LocationId } from './types';

export const dealerships: Dealership[] = [
  {
    slug: 'delhi-premium-motors',
    name: 'Delhi Premium Motors',
    city: 'Delhi',
    areas: ['delhi', 'ghaziabad'],
    address: 'Plot 12, Moti Nagar Commercial Belt, Delhi 110015',
    phone: '+91 11 4000 1101',
    hours: '10:00–19:00, Monday to Saturday',
    summary: 'A fictional west-Delhi showroom used only in this demo. Quotes favour exchange bonuses on higher variants.',
  },
  {
    slug: 'ncr-auto-hub',
    name: 'NCR Auto Hub',
    city: 'Ghaziabad',
    areas: ['ghaziabad', 'delhi', 'noida'],
    address: 'NH-9 Auto Mile, Sahibabad, Ghaziabad 201005',
    phone: '+91 120 400 2202',
    hours: '10:00–20:00, all week',
    summary: 'A fictional multi-brand yard on the Delhi–Ghaziabad corridor. It serves shoppers from Delhi and Noida in this demo.',
  },
  {
    slug: 'noida-car-gallery',
    name: 'Noida Car Gallery',
    city: 'Noida',
    areas: ['noida', 'greater-noida'],
    address: 'Sector 18 Market Road, Noida 201301',
    phone: '+91 120 400 3303',
    hours: '10:30–19:30, Monday to Sunday',
    summary: 'A fictional Noida showroom that also covers Greater Noida in this prototype.',
  },
  {
    slug: 'gurgaon-motors',
    name: 'Gurgaon Motors',
    city: 'Gurugram',
    areas: ['gurugram', 'faridabad'],
    address: 'Golf Course Extension, Gurugram 122002',
    phone: '+91 124 400 4404',
    hours: '10:00–19:00, Monday to Saturday',
    summary: 'A fictional Gurugram outlet with the shortest demo delivery windows.',
  },
  {
    slug: 'capital-wheels',
    name: 'Capital Wheels',
    city: 'Faridabad',
    areas: ['faridabad', 'greater-noida'],
    address: 'Sector 12 Main, Faridabad 121007',
    phone: '+91 129 400 5505',
    hours: '10:00–18:30, Monday to Saturday',
    summary: 'A fictional Faridabad dealer with the steepest demo discounts and longer waiting periods.',
  },
];

const distanceKm: Record<LocationId, Record<string, number>> = {
  delhi: {
    'delhi-premium-motors': 6,
    'ncr-auto-hub': 18,
    'noida-car-gallery': 22,
    'gurgaon-motors': 28,
    'capital-wheels': 32,
  },
  noida: {
    'noida-car-gallery': 4,
    'ncr-auto-hub': 14,
    'delhi-premium-motors': 24,
    'capital-wheels': 26,
    'gurgaon-motors': 34,
  },
  'greater-noida': {
    'noida-car-gallery': 16,
    'capital-wheels': 22,
    'ncr-auto-hub': 30,
    'delhi-premium-motors': 42,
    'gurgaon-motors': 48,
  },
  ghaziabad: {
    'ncr-auto-hub': 5,
    'delhi-premium-motors': 16,
    'noida-car-gallery': 20,
    'capital-wheels': 38,
    'gurgaon-motors': 46,
  },
  gurugram: {
    'gurgaon-motors': 5,
    'capital-wheels': 24,
    'delhi-premium-motors': 27,
    'noida-car-gallery': 36,
    'ncr-auto-hub': 44,
  },
  faridabad: {
    'capital-wheels': 4,
    'gurgaon-motors': 22,
    'delhi-premium-motors': 30,
    'noida-car-gallery': 28,
    'ncr-auto-hub': 40,
  },
};

export function getDealership(slug: string) {
  return dealerships.find((dealer) => dealer.slug === slug);
}

export function serves(dealer: Dealership, locationId: LocationId) {
  return dealer.areas.includes(locationId);
}

export function distanceTo(locationId: LocationId, dealershipSlug: string) {
  return distanceKm[locationId][dealershipSlug] ?? 50;
}
