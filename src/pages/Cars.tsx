import { useState } from "react";
import Navbar from "@/components/Navbar";
import CarFilter from "@/components/CarFilter";
import CarGrid from "@/components/CarGrid";
import { Car } from "@/types/car";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Filter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
  const isMobile = useIsMobile();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const FilterSection = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <CarFilter onFilterChange={setFilteredCars} cars={mockCars} />
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-16 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-accent-dark/10 rounded-3xl blur-3xl" />
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-4 mt-8 relative">
                Available Cars
              </h1>
              <p className="text-lg md:text-xl text-gray-600 relative">
                Find your perfect ride with our premium selection
              </p>
            </div>
            {isMobile && (
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <button className="p-2 rounded-lg bg-accent text-white hover:bg-accent-dark transition-colors">
                    <Filter size={24} />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <div className="py-6">
                    <FilterSection />
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {!isMobile && <FilterSection />}
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
