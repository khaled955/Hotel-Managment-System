export interface BookingListProps {
  _id: string;
  startDate: string; // or Date if you plan to parse it
  endDate: string;   // or Date if you plan to parse it
  totalPrice: number;
  user: {
    _id: string;
  };
  room: string; // could be string or an object if populated
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'; // restrict to known statuses
  createdAt: string; // or Date
  updatedAt: string; // or Date
  stripeChargeId: string;
}