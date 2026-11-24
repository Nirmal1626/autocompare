export type Category = 'SUV' | 'Sedan' | 'Hatchback';

export type Transmission = 'Manual' | 'Automatic';

export type Variant = {
  name: string;
  fuel: string;
  transmission: Transmission;
  price: number;
};

export type Car = {
  slug: string;
  name: string;
  brand: string;
  model: string;
  category: Category;
  fuels: string[];
  transmission: string;
  paint: string;
  seats: number;
  engine: string;
  power: string;
  mileage: string;
  summary: string;
  variants: Variant[];
};

export type LocationId =
  | 'delhi'
  | 'noida'
  | 'greater-noida'
  | 'ghaziabad'
  | 'gurugram'
  | 'faridabad';

export type Location = {
  id: LocationId;
  name: string;
};

export type Dealership = {
  slug: string;
  name: string;
  city: string;
  areas: LocationId[];
  address: string;
  phone: string;
  hours: string;
  summary: string;
};

export type Offer = {
  id: string;
  carSlug: string;
  dealershipSlug: string;
  variant: string;
  fuel: string;
  transmission: Transmission;
  originalPrice: number;
  offerPrice: number;
  discount: number;
  deliveryDays: number;
};

export type SortKey = 'price' | 'discount' | 'nearest';
