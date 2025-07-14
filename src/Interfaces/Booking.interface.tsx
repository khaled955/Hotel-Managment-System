export interface Booking {
  _id: string;
  createdAt: string; // ISO date string
  updatedAt: string;
  startDate: string;
  endDate: string;
  status: "pending" | "confirmed" | "cancelled" | string;
  totalPrice: number;
  room?: {
    _id: string;
    roomNumber?: string;
  };
  user?: {
    _id: string;
    userName?: string;
  };
}






export interface BookingDetailsProps {
  open: boolean;
  onClose: () => void;
  booking:BookingRow ;
};





export interface BookingRow {
  _id: string;
  roomNumber?: string;
  startDate?: string;    // ISO date string
  endDate?: string;      // ISO date string
  status?: "pending" | "confirmed" | "cancelled" | string;
  totalPrice?: number;
  userName?: string;
}

