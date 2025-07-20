export interface Comment {
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
  comment: string;
  createdAt: string; // or Date if parsed
  updatedAt: string; // or Date if parsed
}
