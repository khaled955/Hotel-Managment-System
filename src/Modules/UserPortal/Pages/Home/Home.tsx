import {Grid } from "@mui/material";
import HeaderHomeXplore from "../../Components/HeaderHomeXplore/HeaderHomeXplore";
import MostPopularAdds from "../../Components/MostPopularAdds/MostPopularAdds";
import useExploreRooms from "../../../../Hooks/useExploreRoom.hook";
import { useEffect } from "react";
import useAuth from "../../../../Hooks/useAuth.hook";
import { useNavigate } from "react-router-dom";
import HousesBackyard from "../../Components/HousesBackyard/HousesBackyard";

export default function Home() {
const{setCapacity , setEndDate , setStartDate}= useExploreRooms()
const{token , isUser}= useAuth()
const navigate = useNavigate()


useEffect(()=>{
    if(token && !isUser){
     navigate("/dashboard")
      return 
    } 

},[isUser,navigate,token])



//  return inital valu of context in first render
  useEffect(()=>{
    setCapacity(0)
    setEndDate("")
    setStartDate("")
  },[setCapacity , setEndDate , setStartDate])
  return (
    <Grid container spacing={2} justifyContent={"center"} overflow={"hidden"} px={1} py={3}>
      <Grid size={{xs:12}} px={1}>
<HeaderHomeXplore/>
      <MostPopularAdds/>
      <HousesBackyard/>

      </Grid>
    </Grid>
  )
}
