
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Filter, Plus } from "lucide-react";
import { useState } from "react";
import { useCars } from "@/hooks/use-cars";
import { useIsMobile } from "@/hooks/use-mobile";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CarForm } from "./CarForm";
import { CarCard } from "./CarCard";

type CarFormData = {
  brand: string;
  model: string;
  year: number;
  price: number;
  image: string;
  fuel_type: string;
  seating_capacity: number;
  transmission: string;
  description?: string;
};

export const CarsSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const isMobile = useIsMobile();
  const { cars, addCar, updateCar, deleteCar } = useCars();

  const { register: registerAdd, handleSubmit: handleSubmitAdd, reset: resetAdd, setValue: setAddValue } = useForm<CarFormData>({
    defaultValues: {
      year: new Date().getFullYear(),
      price: 0,
      seating_capacity: 5,
      fuel_type: 'petrol',
      transmission: 'manual'
    }
  });
  
  const { register: registerEdit, handleSubmit: handleSubmitEdit, reset: resetEdit, setValue } = useForm<CarFormData>();

  const onAddSubmit = async (data: CarFormData) => {
    try {
      await addCar.mutateAsync({
        ...data,
        features: [],
        images: [],
        available: true,
      });
      toast.success("Car added successfully");
      setIsAddSheetOpen(false);
      resetAdd();
    } catch (error) {
      toast.error("Failed to add car");
    }
  };

  const onEditSubmit = async (data: CarFormData) => {
    if (!selectedCar) return;
    try {
      await updateCar.mutateAsync({
        id: selectedCar.id,
        ...data,
      });
      toast.success("Car updated successfully");
      setIsEditSheetOpen(false);
      setSelectedCar(null);
    } catch (error) {
      toast.error("Failed to update car");
    }
  };

  const handleEdit = (car: any) => {
    setSelectedCar(car);
    Object.keys(car).forEach((key) => {
      if (key in car) {
        setValue(key as keyof CarFormData, car[key]);
      }
    });
    setIsEditSheetOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await deleteCar.mutateAsync(id);
        toast.success("Car deleted successfully");
      } catch (error) {
        toast.error("Failed to delete car");
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search cars..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
          id="car-search"
          aria-label="Search cars"
        />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Filter cars">
              <Filter className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side={isMobile ? "bottom" : "right"} className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filter Cars</SheetTitle>
              <SheetDescription>
                Filter your car listings by various criteria.
              </SheetDescription>
            </SheetHeader>
            {/* Filter options will be implemented later */}
          </SheetContent>
        </Sheet>
        <Button 
          size="icon" 
          onClick={() => setIsAddSheetOpen(true)}
          aria-label="Add new car"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4">
        {cars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
        <SheetContent 
          side={isMobile ? "bottom" : "right"} 
          className="overflow-y-auto"
        >
          <SheetHeader>
            <SheetTitle>Add New Car</SheetTitle>
            <SheetDescription>
              Fill in the details to add a new car to your fleet.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-8rem)] px-1">
            <CarForm 
              onSubmit={handleSubmitAdd(onAddSubmit)} 
              register={registerAdd} 
              setValue={setAddValue}
            />
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent 
          side={isMobile ? "bottom" : "right"} 
          className="overflow-y-auto"
        >
          <SheetHeader>
            <SheetTitle>Edit Car</SheetTitle>
            <SheetDescription>
              Modify the details of your existing car.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-8rem)] px-1">
            <CarForm
              onSubmit={handleSubmitEdit(onEditSubmit)}
              register={registerEdit}
              isEdit={true}
              setValue={setValue}
            />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};
