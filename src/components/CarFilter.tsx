
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Car, FilterOptions } from "@/types/car";

interface CarFilterProps {
  cars: Car[];
  onFilterChange: (filteredCars: Car[]) => void;
}

const CarFilter = ({ cars, onFilterChange }: CarFilterProps) => {
  const [filters, setFilters] = useState<FilterOptions>({});

  const uniqueBrands = Array.from(new Set(cars.map((car) => car.brand)));
  const uniqueFuelTypes = Array.from(new Set(cars.map((car) => car.fuelType)));
  const uniqueTransmissions = Array.from(new Set(cars.map((car) => car.transmission)));

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Apply filters
    const filtered = cars.filter((car) => {
      return Object.entries(newFilters).every(([filterKey, filterValue]) => {
        if (!filterValue) return true;
        return car[filterKey as keyof Car] === filterValue;
      });
    });

    onFilterChange(filtered);
  };

  return (
    <Card className="p-4">
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Brand</Label>
          <Select onValueChange={(value) => handleFilterChange("brand", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent>
              {uniqueBrands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Fuel Type</Label>
          <Select onValueChange={(value) => handleFilterChange("fuelType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Fuel Types" />
            </SelectTrigger>
            <SelectContent>
              {uniqueFuelTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Transmission</Label>
          <Select onValueChange={(value) => handleFilterChange("transmission", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Transmissions" />
            </SelectTrigger>
            <SelectContent>
              {uniqueTransmissions.map((transmission) => (
                <SelectItem key={transmission} value={transmission}>
                  {transmission}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarFilter;
