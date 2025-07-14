import { Box, Grid, Typography } from "@mui/material";
import MostPopularAddsCard from "../MostPopularAddsCard/MostPopularAddsCard";
import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { UserAxiosInstance } from "../../../../Services/AxiosInstance";
import { PortalAddsHomeProps } from "../../../../Interfaces/PortalAdds.interface";
import { ADS_URLS } from "../../../../Services/URLS";
import Loading from "../../../Shared/Pages/Loading/Loading";
import React from "react";



export default function MostPopularAdds() {
const [addsList , setAddsList] = useState<PortalAddsHomeProps[] | null>(null)


useEffect(()=>{

async function fetchAdds(){

  try {
    
    const {data} = await UserAxiosInstance.get(ADS_URLS.GET_ALL_ADS)
    setAddsList(data.data.ads)
  } catch (error) {
    if(isAxiosError(error)) toast.error(error.response?.data.message || "Some Thing go Wrong")
  }
}


fetchAdds()
},[])


if(!addsList) return <Loading/>

  return (
   <Box my={5}>
<Typography component={"h2"} variant="h6" mb={3}>Most Popular Adds</Typography>

{addsList.length > 0 ? <Grid container spacing={3} justifyContent={"center"}>
  {addsList.sort((a,b)=> Number(a.createdAt) - Number(b.createdAt)).slice(0,3).map((add,index:number)=><React.Fragment key={add._id}>
    <MostPopularAddsCard add={add} index={index} />
  </React.Fragment>)}
</Grid> :<Typography textAlign={"center"} fontWeight={"900"}> No Adds Available Now </Typography>}
   </Box>
  )
}
