
export interface Booking {
  id: string;
  carId: string;
  userId: string;
  startDate: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalPrice: number;
  car: {
    brand: string;
    model: string;
    year: number;
    image: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  bookings: Booking[];
}
