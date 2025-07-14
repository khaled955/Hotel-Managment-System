export interface PortalAddsHomeProps {
  _id: string;
  isActive: boolean;
  room: {
    _id: string;
    roomNumber: string;
    price: number;
    capacity: number;
    discount: number;
    facilities: string[]; // assuming facilities are just IDs
    createdBy: string;
    images: string[]; // if you later include more structure, change accordingly
    createdAt: string;
    updatedAt: string;
  };
  createdBy: {
    _id: string;
    userName: string;
  };
  createdAt: string;
  updatedAt: string;
}