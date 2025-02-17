
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Calendar, Users, BarChart3, ChevronRight } from "lucide-react";
import { useBookings } from "@/hooks/use-bookings";
import { useCars } from "@/hooks/use-cars";
import { useUsers } from "@/hooks/use-users";

export const OverviewSection = () => {
  const { cars } = useCars();
  const { bookings } = useBookings();
  const { users } = useUsers();

  return (
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
                    <p className="text-sm text-gray-600">
                      {new Date(booking.start_date).toLocaleDateString()}
                    </p>
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
};
