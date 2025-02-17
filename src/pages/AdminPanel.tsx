import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/use-auth";
import { useCars } from "@/hooks/use-cars";
import { useBookings } from "@/hooks/use-bookings";
import { useUsers } from "@/hooks/use-users";
import { useNavigate } from "react-router-dom";
import {
  Car,
  Users,
  Calendar,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  ChevronRight,
  BarChart3,
  LogOut,
} from "lucide-react";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  
  const { profile, isAdmin, signOut, loading: authLoading } = useAuth();
  const { cars, isLoading: carsLoading, addCar, updateCar, deleteCar } = useCars();
  const { bookings, isLoading: bookingsLoading, updateBooking, deleteBooking } = useBookings();
  const { users, isLoading: usersLoading, updateUser, deleteUser } = useUsers();

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/');
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
    }
  }, [authLoading, isAdmin, navigate]);

  if (authLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  const renderOverview = () => (
    <div className="grid grid-cols-1 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-accent/10 space-y-2">
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">Available Cars</span>
              </div>
              <p className="text-2xl font-bold">{cars.length}</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/10 space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">Today's Bookings</span>
              </div>
              <p className="text-2xl font-bold">{bookings.length}</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/10 space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">Active Users</span>
              </div>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/10 space-y-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">Revenue</span>
              </div>
              <p className="text-2xl font-bold">$2.5k</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings.slice(0, 3).map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={booking.car.image}
                    alt={`${booking.car.brand} ${booking.car.model}`}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium">{`${booking.car.brand} ${booking.car.model}`}</p>
                    <p className="text-sm text-gray-600">{new Date(booking.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCars = () => (
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

  const renderBookings = () => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search bookings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <img
                      src={booking.car.image}
                      alt={`${booking.car.brand} ${booking.car.model}`}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{`${booking.car.brand} ${booking.car.model}`}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(booking.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteBooking.mutate(booking.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Duration: {booking.duration}h</span>
                  <span className="font-medium">${booking.totalPrice}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-600">{user.phone}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteUser.mutate(user.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button variant="ghost" size="icon" onClick={signOut}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full grid grid-cols-4 h-auto p-1">
            <TabsTrigger value="overview" className="py-2 px-3">
              <BarChart3 className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="cars" className="py-2 px-3">
              <Car className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Cars</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="py-2 px-3">
              <Calendar className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="py-2 px-3">
              <Users className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Users</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">{renderOverview()}</TabsContent>
          <TabsContent value="cars">{renderCars()}</TabsContent>
          <TabsContent value="bookings">{renderBookings()}</TabsContent>
          <TabsContent value="users">{renderUsers()}</TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPanel;
