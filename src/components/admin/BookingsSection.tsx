
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Trash2 } from "lucide-react";
import { useState } from "react";
import { useBookings } from "@/hooks/use-bookings";

export const BookingsSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { bookings, deleteBooking } = useBookings();

  return (
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
                        {new Date(booking.start_date).toLocaleDateString()}
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
                  <span className="font-medium">${booking.total_price}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
