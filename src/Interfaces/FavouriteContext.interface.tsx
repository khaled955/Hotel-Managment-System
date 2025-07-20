import { RoomExplore } from "./RoomContext.interface";





export interface UserFavoriteProps {
  _id: string;
  rooms: RoomExplore[];
  user: {
    _id: string;
    userName: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UserRoomPortal {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: string[]; // Array of facility IDs
  createdBy: string; // Creator's user ID
  images: string[]; // Array of image URLs
  createdAt: string;
  updatedAt: string;
}






export interface UserFavouritesContextProps{
favList:UserFavoriteProps[] | null;
getAllFavourites:()=>Promise<void>;
addRoomToFavourites:(roomId:string)=>Promise<void>;
removeRoomFromFavourites:(roomId:string)=>Promise<void>;
}