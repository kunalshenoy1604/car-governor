
import { useState } from "react";
import Navbar from "@/components/Navbar";
import CarFilter from "@/components/CarFilter";
import CarGrid from "@/components/CarGrid";
import { Car } from "@/types/car";

// Mock data for initial development
const mockCars: Car[] = [
  {
    id: "1",
    brand: "BMW",
    model: "M3",
    year: 2023,
    price: 75,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80",
    features: ["Automatic", "Leather Seats", "GPS"],
    fuelType: "Petrol",
    seatingCapacity: 5,
    transmission: "Automatic",
  },
  {
    id: "2",
    brand: "Mercedes",
    model: "C-Class",
    year: 2023,
    price: 65,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80",
    features: ["Automatic", "Sunroof", "Bluetooth"],
    fuelType: "Diesel",
    seatingCapacity: 5,
    transmission: "Automatic",
  },
];

const Cars = () => {
  const [filteredCars, setFilteredCars] = useState<Car[]>(mockCars);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-8">Available Cars</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <CarFilter onFilterChange={setFilteredCars} cars={mockCars} />
          <div className="lg:col-span-3">
            <CarGrid cars={filteredCars} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cars;
