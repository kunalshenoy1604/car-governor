
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBookings } from "@/hooks/use-bookings";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Car, Calendar, Clock } from "lucide-react";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { bookings, isLoading: bookingsLoading } = useBookings();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading || bookingsLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                Active Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">
                {bookings.filter(b => b.status === 'active').length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-accent" />
                Total Hours Booked
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">
                {bookings.reduce((acc, b) => acc + b.duration, 0)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Car className="h-5 w-5 text-accent" />
                Cars Rented
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">
                {new Set(bookings.map(b => b.car_id)).size}
              </p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mt-12 mb-6">Recent Bookings</h2>
        <div className="grid gap-6">
          {bookings.slice(0, 5).map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <img
                    src={booking.car.image}
                    alt={`${booking.car.brand} ${booking.car.model}`}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{`${booking.car.brand} ${booking.car.model}`}</h3>
                    <p className="text-gray-600">
                      {new Date(booking.start_date).toLocaleDateString()} • {booking.duration} hours
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Status: <span className="capitalize">{booking.status}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-lg">${booking.total_price}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
