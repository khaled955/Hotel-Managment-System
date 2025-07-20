export interface DashboardStats {
  ads: number;
  bookings: {
    pending: number;
    completed: number;
  };
  facilities: number;
  rooms: number;
  users: {
    user: number;
    admin: number;
  };
}