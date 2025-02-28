
export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  image: string;
  features: string[];
  fuelType: string;
  seatingCapacity: number;
  transmission: string;
  images: string[];
  specs: {
    engine: string;
    power: string;
    topSpeed: string;
    acceleration: string;
    fuelEfficiency: string;
  };
  description: string;
  availability: {
    available: boolean;
    nextAvailable?: string;
  };
}

export interface FilterOptions {
  brand?: string;
  fuelType?: string;
  seatingCapacity?: number;
  transmission?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}
