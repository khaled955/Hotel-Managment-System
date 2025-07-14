export interface User {
  _id: string;
  userName: string;
  email: string;
  phoneNumber: number;
  country: string;
  role: string;
  profileImage: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}







export interface  UserCardProps {
  open: boolean;
  onClose: () => void;
  user: {
    _id: string;
    userName: string;
    email: string;
    phoneNumber: number;
    country: string;
    role: string;
    profileImage: string;
  };
};


