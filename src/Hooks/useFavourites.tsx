import { useContext } from "react";
import { FavouriteContext } from "../Context/Favourite.context";

export default function useFavourites(){


return useContext(FavouriteContext)!

}