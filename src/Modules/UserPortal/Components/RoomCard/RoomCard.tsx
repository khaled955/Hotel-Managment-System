import { Avatar, Box, Grid, IconButton, Paper } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";
import styles from "./RoomCard.module.css"
import { RoomExplore } from "../../../../Interfaces/RoomContext.interface";
import photo1 from "../../../../assets/images/rooms/room1.jpeg"
import photo2 from "../../../../assets/images/rooms/room2.jpeg"
import photo3 from "../../../../assets/images/rooms/room3.jpeg"
import photo4 from "../../../../assets/images/rooms/room4.jpeg"
import photo5 from "../../../../assets/images/rooms/room5.jpeg"
import photo6 from "../../../../assets/images/rooms/room6.jpeg"
import photo7 from "../../../../assets/images/rooms/room7.jpeg"
import photo8 from "../../../../assets/images/rooms/room8.jpeg"
import photo9 from "../../../../assets/images/rooms/room9.png"
import photo10 from "../../../../assets/images/rooms/room10.png"
import photo11 from "../../../../assets/images/rooms/room11.png"
import useFavourites from "../../../../Hooks/useFavourites";
import { useCallback } from "react";
import { UserFavoriteProps } from "../../../../Interfaces/FavouriteContext.interface";
import useAuth from "../../../../Hooks/useAuth.hook";


const imageGallery = [photo11 ,photo10,photo9,photo8,photo7,photo6,photo5,photo4,photo3,photo2,photo1]


export default function RoomCard({room , index}:{room:RoomExplore , index:number}) {
const {favList , addRoomToFavourites , removeRoomFromFavourites} = useFavourites()
const {token} = useAuth()

const favActionBtn = useCallback(function(roomId:string)
{
const isInList =favList?.some((fav:UserFavoriteProps)=>fav.rooms.some((rom)=>rom._id === roomId))
if(isInList) removeRoomFromFavourites(roomId)
if(!isInList) addRoomToFavourites(roomId)
},[favList , removeRoomFromFavourites ,addRoomToFavourites])


  return (
    <Grid   className={styles.cardWrapper} size={{xs:12 , sm:4 , md:3 ,}} position={"relative"} sx={{borderRadius:4,overflow:"hidden"}}>
<Box className={styles.cardOverlay} component={"div"} sx={{position:"absolute",top:0,left:0,right:0,bgcolor:"black",zIndex:10,opacity:.6 ,display:"flex" ,justifyContent:"center",alignItems:"center",gap:4}}>
 {token &&  <IconButton onClick={()=>{
    favActionBtn(room._id)
  }}>
  <FavoriteIcon sx={{color:favList?.some((fav:UserFavoriteProps)=>fav.rooms.some((rom)=>rom._id === room._id))?"red":"white" , fontSize:40}}/>
  </IconButton>}

<Link to={`/room-details/${room._id}`}>
 <VisibilityIcon sx={{color:"white" , fontSize:40}}/>
  </Link>
</Box>


<Box className="discountBadge" sx={{zIndex:1000 , width:"50%",height:60 ,borderRadius:"0px 0px 0px 20px"}} component={"div"} position={"absolute"} top={0} right={0} bgcolor={"#ff498b"} color={"white"} py={2} display={"flex"} justifyContent={"center"} alignItems={"center"}>
  {`${index + 130}$ Per Night`}
</Box>



    <Paper elevation={1}>
    <Avatar src={room.images[0] || imageGallery[index]} sx={{width:"100%",objectFit:"cover" , height:300}} variant="square"  />
    
    </Paper>
    </Grid>
  );
}
