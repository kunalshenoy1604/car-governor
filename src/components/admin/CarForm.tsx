
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
  <form onSubmit={onSubmit} className="space-y-4">
    <ImageUpload 
      onImageUploaded={(url) => setValue('image', url)}
    />
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
      <Label htmlFor="fuel_type">Fuel Type</Label>
      <Select defaultValue="petrol" onValueChange={(value) => setValue('fuel_type', value)}>
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="Select fuel type" />
        </SelectTrigger>
        <SelectContent className="bg-white">
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
      <Select defaultValue="manual" onValueChange={(value) => setValue('transmission', value)}>
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="Select transmission" />
        </SelectTrigger>
        <SelectContent className="bg-white">
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
