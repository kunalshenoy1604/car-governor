
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
import { motion } from "framer-motion";

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

    const filtered = cars.filter((car) => {
      return Object.entries(newFilters).every(([filterKey, filterValue]) => {
        if (!filterValue) return true;
        return car[filterKey as keyof Car] === filterValue;
      });
    });

    onFilterChange(filtered);
  };

  return (
    <Card className="backdrop-blur-sm bg-white/80 border-accent/10">
      <CardContent className="p-4 md:p-6 space-y-4 md:space-y-6">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-2">
            <Label className="text-gray-900 font-semibold">Brand</Label>
            <Select onValueChange={(value) => handleFilterChange("brand", value)}>
              <SelectTrigger className="w-full bg-white border-accent/20 hover:border-accent focus:border-accent">
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
            <Label className="text-gray-900 font-semibold">Fuel Type</Label>
            <Select onValueChange={(value) => handleFilterChange("fuelType", value)}>
              <SelectTrigger className="w-full bg-white border-accent/20 hover:border-accent focus:border-accent">
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
            <Label className="text-gray-900 font-semibold">Transmission</Label>
            <Select onValueChange={(value) => handleFilterChange("transmission", value)}>
              <SelectTrigger className="w-full bg-white border-accent/20 hover:border-accent focus:border-accent">
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
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default CarFilter;
