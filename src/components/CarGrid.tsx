
import { Car } from "@/types/car";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Fuel, Users, Gauge } from "lucide-react";

interface CarGridProps {
  cars: Car[];
}

const CarGrid = ({ cars }: CarGridProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {cars.map((car, index) => (
        <motion.div
          key={car.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-accent/10">
            <div className="aspect-video relative overflow-hidden">
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <CardContent className="p-4 md:p-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                {car.brand} {car.model}
              </h3>
              <p className="text-gray-600 mb-4">{car.year}</p>
              <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4">
                <div className="flex items-center gap-1 md:gap-2 text-gray-600 text-sm md:text-base">
                  <Fuel className="h-4 w-4 md:h-5 md:w-5 text-accent" />
                  <span>{car.fuelType}</span>
                </div>
                <div className="flex items-center gap-1 md:gap-2 text-gray-600 text-sm md:text-base">
                  <Users className="h-4 w-4 md:h-5 md:w-5 text-accent" />
                  <span>{car.seatingCapacity}</span>
                </div>
                <div className="flex items-center gap-1 md:gap-2 text-gray-600 text-sm md:text-base">
                  <Gauge className="h-4 w-4 md:h-5 md:w-5 text-accent" />
                  <span>{car.transmission}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 md:p-6 border-t border-accent/10 bg-gradient-to-r from-accent/5 to-accent-dark/5">
              <div className="text-xl md:text-2xl font-bold text-accent">
                ${car.price}<span className="text-xs md:text-sm font-normal text-gray-600">/hour</span>
              </div>
              <Button
                onClick={() => navigate(`/cars/${car.id}`)}
                className="ml-auto bg-accent hover:bg-accent-dark text-white transition-all duration-300 transform hover:translate-x-1 group text-sm md:text-base"
              >
                View Details
                <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default CarGrid;
