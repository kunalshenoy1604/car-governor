
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
