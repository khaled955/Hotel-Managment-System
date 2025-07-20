import { Box, Grid, Typography } from "@mui/material";
import RoomCard from "../../Components/RoomCard/RoomCard";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import { RoomExplore } from "../../../../Interfaces/RoomContext.interface";
import useFavourites from "../../../../Hooks/useFavourites";
import Loading from "../../../Shared/Pages/Loading/Loading";








 const breadcrumbs = [
    <Link key={"1"}  color="inherit" to="/" style={{textDecoration:"none"}}>
      HOME
    </Link>,
   
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Favourites
    </Typography>,
  ];







export default function Favourits() {
const {favList} = useFavourites()



if(!favList) return <Loading/>
  return (
      <Box component={"section"}>
    <Typography component={"h2"} textAlign={"center"} variant="h4" mb={2}>Favourite Rooms </Typography>

{/* bread crumb */}
   <Stack spacing={2} mb={3} px={5}>
      <Breadcrumbs separator="/" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>



 <Grid container spacing={3} justifyContent={"center"} px={3}>
  {favList[0].rooms.length === 0 ?<Typography component={"p"} textAlign={"center"}> No Rooms Available In Your Favourite List</Typography>:favList[0].rooms.map((room:RoomExplore , index:number)=><RoomCard key={room._id} room={room} index={index}/>
)}
   </Grid>

    </Box>

  )
}
