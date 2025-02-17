
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";

interface CarCardProps {
  car: {
    id: string;
    brand: string;
    model: string;
    price: number;
    image: string;
  };
  onEdit: (car: any) => void;
  onDelete: (id: string) => void;
}

export const CarCard = ({ car, onEdit, onDelete }: CarCardProps) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex gap-4">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{`${car.brand} ${car.model}`}</h3>
              <p className="text-sm text-gray-600">${car.price}/hour</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => onEdit(car)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(car.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
