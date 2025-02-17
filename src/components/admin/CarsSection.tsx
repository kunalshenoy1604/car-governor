
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Filter, Plus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCars } from "@/hooks/use-cars";
import { useIsMobile } from "@/hooks/use-mobile";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  const { register: registerAdd, handleSubmit: handleSubmitAdd, reset: resetAdd } = useForm<CarFormData>();
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

  const CarForm = ({ onSubmit, register, isEdit = false }: any) => (
    <form onSubmit={onSubmit} className="space-y-4 pt-4">
      <div>
        <Label htmlFor="brand">Brand</Label>
        <Input id="brand" {...register("brand", { required: true })} />
      </div>
      <div>
        <Label htmlFor="model">Model</Label>
        <Input id="model" {...register("model", { required: true })} />
      </div>
      <div>
        <Label htmlFor="year">Year</Label>
        <Input
          id="year"
          type="number"
          {...register("year", { required: true, valueAsNumber: true })}
        />
      </div>
      <div>
        <Label htmlFor="price">Price per hour</Label>
        <Input
          id="price"
          type="number"
          {...register("price", { required: true, valueAsNumber: true })}
        />
      </div>
      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input id="image" {...register("image", { required: true })} />
      </div>
      <div>
        <Label htmlFor="fuel_type">Fuel Type</Label>
        <Select defaultValue="petrol" {...register("fuel_type", { required: true })}>
          <SelectTrigger>
            <SelectValue placeholder="Select fuel type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="petrol">Petrol</SelectItem>
            <SelectItem value="diesel">Diesel</SelectItem>
            <SelectItem value="electric">Electric</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="seating_capacity">Seating Capacity</Label>
        <Input
          id="seating_capacity"
          type="number"
          {...register("seating_capacity", { required: true, valueAsNumber: true })}
        />
      </div>
      <div>
        <Label htmlFor="transmission">Transmission</Label>
        <Select defaultValue="manual" {...register("transmission", { required: true })}>
          <SelectTrigger>
            <SelectValue placeholder="Select transmission" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="manual">Manual</SelectItem>
            <SelectItem value="automatic">Automatic</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} />
      </div>
      <Button type="submit" className="w-full">
        {isEdit ? "Update Car" : "Add Car"}
      </Button>
    </form>
  );

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
            {/* Filter options will be implemented later */}
          </SheetContent>
        </Sheet>
        <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
          <SheetTrigger asChild>
            <Button size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side={isMobile ? "bottom" : "right"}>
            <SheetHeader>
              <SheetTitle>Add New Car</SheetTitle>
            </SheetHeader>
            <CarForm onSubmit={handleSubmitAdd(onAddSubmit)} register={registerAdd} />
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
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(car)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(car.id)}
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

      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent side={isMobile ? "bottom" : "right"}>
          <SheetHeader>
            <SheetTitle>Edit Car</SheetTitle>
          </SheetHeader>
          <CarForm
            onSubmit={handleSubmitEdit(onEditSubmit)}
            register={registerEdit}
            isEdit={true}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};
