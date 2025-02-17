
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "./ImageUpload";

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

interface CarFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  register: any;
  isEdit?: boolean;
  setValue: (name: string, value: any) => void;
}

export const CarForm = ({ onSubmit, register, isEdit = false, setValue }: CarFormProps) => (
  <form onSubmit={onSubmit} className="space-y-4" id="car-form">
    <ImageUpload 
      onImageUploaded={(url) => setValue('image', url)}
    />
    <div>
      <Label htmlFor="car-brand">Brand</Label>
      <Input 
        id="car-brand"
        {...register("brand", { required: true })}
        autoComplete="off"
        aria-label="Car brand"
      />
    </div>
    <div>
      <Label htmlFor="car-model">Model</Label>
      <Input 
        id="car-model"
        {...register("model", { required: true })}
        autoComplete="off"
        aria-label="Car model"
      />
    </div>
    <div>
      <Label htmlFor="car-year">Year</Label>
      <Input
        id="car-year"
        type="number"
        min="1900"
        max={new Date().getFullYear() + 1}
        {...register("year", { 
          required: true,
          valueAsNumber: true,
          min: 1900,
          max: new Date().getFullYear() + 1
        })}
        autoComplete="off"
        aria-label="Car year"
      />
    </div>
    <div>
      <Label htmlFor="car-price">Price per hour</Label>
      <Input
        id="car-price"
        type="number"
        min="0"
        step="0.01"
        {...register("price", { 
          required: true,
          valueAsNumber: true,
          min: 0
        })}
        autoComplete="off"
        aria-label="Price per hour"
      />
    </div>
    <div>
      <Label htmlFor="car-fuel-type">Fuel Type</Label>
      <Select 
        defaultValue="petrol" 
        onValueChange={(value) => setValue('fuel_type', value)}
      >
        <SelectTrigger id="car-fuel-type" className="w-full bg-white">
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
      <Label htmlFor="car-seating">Seating Capacity</Label>
      <Input
        id="car-seating"
        type="number"
        min="1"
        max="10"
        {...register("seating_capacity", { 
          required: true,
          valueAsNumber: true,
          min: 1,
          max: 10
        })}
        autoComplete="off"
        aria-label="Seating capacity"
      />
    </div>
    <div>
      <Label htmlFor="car-transmission">Transmission</Label>
      <Select 
        defaultValue="manual" 
        onValueChange={(value) => setValue('transmission', value)}
      >
        <SelectTrigger id="car-transmission" className="w-full bg-white">
          <SelectValue placeholder="Select transmission" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="manual">Manual</SelectItem>
          <SelectItem value="automatic">Automatic</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div>
      <Label htmlFor="car-description">Description</Label>
      <Textarea 
        id="car-description"
        {...register("description")}
        autoComplete="off"
        aria-label="Car description"
      />
    </div>
    <Button type="submit" className="w-full">
      {isEdit ? "Update Car" : "Add Car"}
    </Button>
  </form>
);
