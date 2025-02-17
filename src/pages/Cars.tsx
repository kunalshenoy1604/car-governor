
import { useState } from "react";
import Navbar from "@/components/Navbar";
import CarFilter from "@/components/CarFilter";
import CarGrid from "@/components/CarGrid";
import { Car } from "@/types/car";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-accent-dark/10 rounded-3xl blur-3xl" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4 mt-8 relative">
            Available Cars
          </h1>
          <p className="text-xl text-gray-600 mb-8 relative">
            Find your perfect ride with our premium selection
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CarFilter onFilterChange={setFilteredCars} cars={mockCars} />
          </motion.div>
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <CarGrid cars={filteredCars} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cars;
