import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import {
  ArrowLeft,
  Car,
  Fuel,
  Gauge,
  Users,
  Calendar as CalendarIcon,
  Clock,
  CarFront,
  Power,
} from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/components/Navbar";

const mockCar = {
  id: "1",
  brand: "BMW",
  model: "M3",
  year: 2023,
  price: 75,
  image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80",
  images: [
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80",
  ],
  features: ["Leather Seats", "GPS Navigation", "Bluetooth", "Parking Sensors", "Backup Camera"],
  fuelType: "Petrol",
  seatingCapacity: 5,
  transmission: "Automatic",
  specs: {
    engine: "3.0L Twin-Turbo Inline-6",
    power: "473 hp",
    topSpeed: "250 km/h",
    acceleration: "0-60 mph in 3.8s",
    fuelEfficiency: "19/25 mpg",
  },
  description: "Experience the thrill of driving with the BMW M3, featuring a powerful twin-turbo engine and premium interior comfort.",
  availability: {
    available: true,
  },
};

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  hours: z.number().min(1, "Minimum rental duration is 1 hour"),
});

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      hours: 1,
    },
  });

  const onSubmit = (data: z.infer<typeof bookingSchema>) => {
    toast({
      title: "Booking Submitted!",
      description: "We'll contact you shortly to confirm your reservation.",
    });
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-16 pb-20">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/cars")}
          className="flex items-center gap-2 text-gray-600 hover:text-accent mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Cars
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Carousel className="w-full">
              <CarouselContent>
                {mockCar.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-video relative rounded-xl overflow-hidden">
                      <img
                        src={image}
                        alt={`${mockCar.brand} ${mockCar.model}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {mockCar.brand} {mockCar.model} {mockCar.year}
              </h1>
              <p className="text-xl text-accent font-semibold">
                ${mockCar.price}/hour
              </p>
            </div>

            <p className="text-gray-600">{mockCar.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <CarFront className="h-5 w-5 text-accent" />
                <span>{mockCar.specs.engine}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Power className="h-5 w-5 text-accent" />
                <span>{mockCar.specs.power}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Gauge className="h-5 w-5 text-accent" />
                <span>{mockCar.specs.topSpeed}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Fuel className="h-5 w-5 text-accent" />
                <span>{mockCar.fuelType}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="h-5 w-5 text-accent" />
                <span>{mockCar.seatingCapacity} seats</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-5 w-5 text-accent" />
                <span>{mockCar.transmission}</span>
              </div>
            </div>

            <Card className="border-accent/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {mockCar.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600">
                      <div className="h-2 w-2 rounded-full bg-accent" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Sheet open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <SheetTrigger asChild>
                <Button className="w-full bg-accent hover:bg-accent-dark text-white">
                  Book Now
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[90vw] sm:max-w-[540px] overflow-y-auto h-full">
                <SheetHeader>
                  <SheetTitle>Book Your Ride</SheetTitle>
                  <SheetDescription>
                    Please fill in your details to book this car.
                  </SheetDescription>
                </SheetHeader>
                <div className="h-[calc(100vh-180px)] overflow-y-auto pb-20">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 234 567 8900" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="hours"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rental Duration (hours)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className="space-y-2">
                        <FormLabel>Start Date</FormLabel>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          className="rounded-md border w-full"
                          disabled={(date) => date < new Date()}
                        />
                      </div>
                      <div className="sticky bottom-0 bg-white py-4 border-t mt-6">
                        <Button type="submit" className="w-full bg-accent hover:bg-accent-dark">
                          Confirm Booking
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </SheetContent>
            </Sheet>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
