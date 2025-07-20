export interface RoomDetailsProp {
  _id: string;
  roomNumber: string;
  capacity: number;
  discount: number;
  price: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  images: string[];
  createdBy: {
    _id: string;
    userName: string;
  }}