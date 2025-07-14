import { useContext } from "react";
import { RoomContext } from "../Context/Rooms.context";

export default function useExploreRooms(){



return  useContext(RoomContext)!


}