export interface RoomFacility {
  _id: string;
  name: string;
}

export interface RoomCreator {
  _id: string;
  userName: string;
}

export interface RoomProps {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: RoomFacility[];
  createdBy: RoomCreator | string
  images: string[];
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}



export interface RowRoooom {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
createdBy:string;
createdAt: string; // ISO date



}

export interface RoomFormData {
  roomNumber: string;
  price: string;
  capacity: string;
  discount: string;
  facilities: string[]; // Array of facility IDs
    imgs: (string | File)[];

}






export interface RoomDetailsProps{
    open:boolean;
    room:RoomProps;
    onClose:()=>void;
}




export interface RoomFacilities{
    name:string;
    _id:string;
}