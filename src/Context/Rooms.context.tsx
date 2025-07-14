/* eslint-disable react-refresh/only-export-components */
import { isAxiosError } from "axios";
import { createContext, ReactNode, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { UserAxiosInstance } from "../Services/AxiosInstance";
import { ALL_EXPLORE_ROOMS_URLS } from "../Services/URLS";
import { RoomContextType, RoomExplore } from "../Interfaces/RoomContext.interface";

 export const RoomContext = createContext<RoomContextType | null>(null)

export default function RoomContextProvider({children}:{children:ReactNode}){
const [startDate , setStartDate] = useState<string>("")
const [endDate , setEndDate] = useState< string>("")
const [capacity , setCapacity] = useState< number>(0)
const [exploreErrorMessage , setExploreErrorMessage] = useState<string | null>(null)
const[exploreRoomsList , setExlporeRoomsList] = useState<RoomExplore[]| null>(null)
const[isLoading , setIsLoading] = useState(false)
const getAllExploreRooms= useCallback(async function(){
setIsLoading(true)
try {
    const {data} = await UserAxiosInstance.get(ALL_EXPLORE_ROOMS_URLS.GET_ALL_ROOMS_FILTER(1,50,startDate,endDate,capacity))
 
    if(data.success){
 setExlporeRoomsList(data.data.rooms)
       setExploreErrorMessage(null)
    }

   
    
} catch (error) {
    if(isAxiosError(error)){
toast.error(error.response?.data.message)
setExploreErrorMessage(error.response?.data.message || "Some Thing Go Wrong")

    }
        
}finally{
setIsLoading(false)
}




},[capacity,startDate,endDate])





return <RoomContext.Provider value={{startDate,endDate,capacity , getAllExploreRooms,exploreErrorMessage,exploreRoomsList , isLoading ,setCapacity,setEndDate,setStartDate,setExploreErrorMessage}}>
{children}
</RoomContext.Provider>
}