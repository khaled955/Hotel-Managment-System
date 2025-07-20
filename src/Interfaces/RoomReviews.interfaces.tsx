export interface Review {
  _id: string;
  room: {
    _id: string;
    roomNumber: string;
  };
  user: {
    _id: string;
    userName: string;
    profileImage: string;
  };
  rating: number;
  review: string;
  createdAt: string; // or Date if you're parsing it
  updatedAt: string; // or Date if you're parsing it
}
