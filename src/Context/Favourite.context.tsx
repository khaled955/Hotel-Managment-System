import { isAxiosError } from "axios";
import { createContext, ReactNode, useCallback,  useState } from "react";
import toast from "react-hot-toast";
import { UserAxiosInstance } from "../Services/AxiosInstance";
import { FAVORITE_ROOMS } from "../Services/URLS";
import { UserFavoriteProps, UserFavouritesContextProps } from "../Interfaces/FavouriteContext.interface";

// eslint-disable-next-line react-refresh/only-export-components
export const FavouriteContext = createContext<UserFavouritesContextProps | null>(null)

export default function FavouriteContextProvider({children}:{children:ReactNode}){
const [favList , setFavList] = useState<UserFavoriteProps[] | null>(null)


const getAllFavourites = useCallback( async function(){
try {
    const {data} = await UserAxiosInstance.get(FAVORITE_ROOMS.GET_ALL)
    if(data.success){
        setFavList(data.data.favoriteRooms)
    }
} catch (error) {
    if(isAxiosError(error))toast.error(error.response?.data.message || "Some thing go wrong!")
}
},[])


const addRoomToFavourites = useCallback( async function(roomId:string){
    const toastId = toast.loading("Adding Room Under Processing")
try {
 const options ={
    url:FAVORITE_ROOMS.ADD_Fav,
    method:"POST",
    data:{
        roomId,
    }
 }


    const {data} = await UserAxiosInstance.request(options)
    if(data.success){
        toast.success(data.message || "Rome Added Successfully")
             getAllFavourites()

    }
} catch (error) {
    if(isAxiosError(error))toast.error(error.response?.data.message || "Some thing go wrong!")
}finally{
    toast.dismiss(toastId)
}


},[getAllFavourites])




const removeRoomFromFavourites = useCallback( async function(roomId:string){
    const toastId = toast.loading("Remove Room Under Processing")
try {
 const options ={
    url:FAVORITE_ROOMS.DELETE_Fav(roomId),
    method:"DELETE",
    data:{
        roomId,
    }
 }


    const {data} = await UserAxiosInstance.request(options)

    if(data.success){
  toast.success(data.message || "Rome Deleted Successfully")
    getAllFavourites()

    }
} catch (error) {
    if(isAxiosError(error))toast.error(error.response?.data.message || "Some thing go wrong!")
}
finally{
    toast.dismiss(toastId)
}
},[getAllFavourites])





    return <FavouriteContext.Provider value={{favList ,getAllFavourites,addRoomToFavourites,removeRoomFromFavourites}}>
        {children}
    </FavouriteContext.Provider>
}