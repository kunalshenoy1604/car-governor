
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Filter, Plus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCars } from "@/hooks/use-cars";
import { useIsMobile } from "@/hooks/use-mobile";

export const CarsSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useIsMobile();
  const { cars, deleteCar } = useCars();

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search cars..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side={isMobile ? "bottom" : "right"}>
            <SheetHeader>
              <SheetTitle>Filter Cars</SheetTitle>
            </SheetHeader>
            {/* Filter options go here */}
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side={isMobile ? "bottom" : "right"}>
            <SheetHeader>
              <SheetTitle>Add New Car</SheetTitle>
            </SheetHeader>
            {/* Add car form goes here */}
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid gap-4">
        {cars.map((car) => (
          <Card key={car.id}>
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
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteCar.mutate(car.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
