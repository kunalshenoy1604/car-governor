
import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  Car,
  User,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
} from "lucide-react";
import { UserProfile, Booking } from "@/types/booking";
import Navbar from "@/components/Navbar";
import { format } from "date-fns";

// Mock data for development
const mockProfile: UserProfile = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 234 567 8900",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
  bookings: [
    {
      id: "1",
      carId: "1",
      userId: "1",
      startDate: "2024-03-15T10:00:00",
      duration: 4,
      status: "confirmed",
      totalPrice: 300,
      car: {
        brand: "BMW",
        model: "M3",
        year: 2023,
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80",
      },
    },
    {
      id: "2",
      carId: "2",
      userId: "1",
      startDate: "2024-03-20T14:00:00",
      duration: 2,
      status: "pending",
      totalPrice: 130,
      car: {
        brand: "Mercedes",
        model: "C-Class",
        year: 2023,
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80",
      },
    },
  ],
};

const UserDashboard = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleProfileUpdate = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleBookingCancel = (bookingId: string) => {
    const updatedBookings = profile.bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: "cancelled" as const } : booking
    );
    setProfile({ ...profile, bookings: updatedBookings });
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled successfully.",
    });
  };

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">My Dashboard</h1>
          
          <Tabs defaultValue="bookings" className="space-y-6">
            <TabsList>
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="space-y-4">
              {profile.bookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden">
                          <img
                            src={booking.car.image}
                            alt={`${booking.car.brand} ${booking.car.model}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-semibold">
                                {booking.car.brand} {booking.car.model} {booking.car.year}
                              </h3>
                              <p className={`text-sm font-medium ${getStatusColor(booking.status)} capitalize`}>
                                {booking.status}
                              </p>
                            </div>
                            <p className="text-xl font-bold text-accent">
                              ${booking.totalPrice}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="h-4 w-4 text-accent" />
                              <span className="text-sm">
                                {format(new Date(booking.startDate), "PPP")}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="h-4 w-4 text-accent" />
                              <span className="text-sm">{booking.duration} hours</span>
                            </div>
                          </div>
                          {booking.status === "pending" && (
                            <Button
                              variant="outline"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleBookingCancel(booking.id)}
                            >
                              Cancel Booking
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={profile.avatar} />
                      <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {!isEditing && (
                      <Button onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label>Full Name</Label>
                      {isEditing ? (
                        <Input
                          value={editedProfile.name}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, name: e.target.value })
                          }
                        />
                      ) : (
                        <p className="text-gray-600">{profile.name}</p>
                      )}
                    </div>
                    
                    <div className="grid gap-2">
                      <Label>Email</Label>
                      {isEditing ? (
                        <Input
                          type="email"
                          value={editedProfile.email}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, email: e.target.value })
                          }
                        />
                      ) : (
                        <p className="text-gray-600">{profile.email}</p>
                      )}
                    </div>
                    
                    <div className="grid gap-2">
                      <Label>Phone Number</Label>
                      {isEditing ? (
                        <Input
                          value={editedProfile.phone}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, phone: e.target.value })
                          }
                        />
                      ) : (
                        <p className="text-gray-600">{profile.phone}</p>
                      )}
                    </div>
                    
                    {isEditing && (
                      <div className="flex gap-4 mt-4">
                        <Button onClick={handleProfileUpdate} className="bg-accent hover:bg-accent-dark">
                          Save Changes
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsEditing(false);
                            setEditedProfile(profile);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;
