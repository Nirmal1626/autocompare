import type { Location } from './types';

export const locations: Location[] = [
  { id: 'delhi', name: 'Delhi' },
  { id: 'noida', name: 'Noida' },
  { id: 'greater-noida', name: 'Greater Noida' },
  { id: 'ghaziabad', name: 'Ghaziabad' },
  { id: 'gurugram', name: 'Gurugram' },
  { id: 'faridabad', name: 'Faridabad' },
];

export const budgets = [
  800000, 1000000, 1200000, 1500000, 1800000, 2000000, 2400000, 3000000, 4000000,
];

export function locationName(id: string) {
  return locations.find((location) => location.id === id)?.name ?? 'Delhi NCR';
}
