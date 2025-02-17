
import { Car } from "@/types/car";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CarGridProps {
  cars: Car[];
}

const CarGrid = ({ cars }: CarGridProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-video relative overflow-hidden">
            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold text-gray-900">
              {car.brand} {car.model}
            </h3>
            <p className="text-gray-600">{car.year}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {car.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-4 border-t flex items-center justify-between">
            <div className="text-accent font-semibold">${car.price}/hour</div>
            <Button
              onClick={() => navigate(`/cars/${car.id}`)}
              className="bg-accent hover:bg-accent-dark text-white"
            >
              View Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CarGrid;
