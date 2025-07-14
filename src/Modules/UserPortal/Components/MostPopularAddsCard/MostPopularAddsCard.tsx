import { Avatar, Box, Grid, IconButton, Paper } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";
import styles from "./MostPopularAddsCard.module.css"
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
import { PortalAddsHomeProps } from "../../../../Interfaces/PortalAdds.interface";


const imageGallery = [photo11 ,photo10,photo9,photo8,photo7,photo6,photo5,photo4,photo3,photo2,photo1]


export default function MostPopularAddsCard({add , index}:{add:PortalAddsHomeProps , index:number}) {

  return (
    <Grid    className={styles.cardWrapper} size={{xs:12 , sm:12 , md:3}} position={"relative"} sx={{borderRadius:4,overflow:"hidden"}}>
<Box className={styles.cardOverlay} component={"div"} sx={{position:"absolute",top:0,left:0,right:0,bgcolor:"black",zIndex:10,opacity:.3 ,display:"flex" ,justifyContent:"center",alignItems:"center",gap:4}}>
  <IconButton>
  <FavoriteIcon sx={{color:"white" , fontSize:40}}/>
  </IconButton>

<Link to={`/room-details/${add.room._id}`}>
 <VisibilityIcon sx={{color:"white" , fontSize:40}}/>
  </Link>
</Box>


<Box className="discountBadge" sx={{zIndex:1000 , width:"50%",height:60 ,borderRadius:"0px 0px 0px 20px"}} component={"div"} position={"absolute"} top={0} right={0} bgcolor={"#ff498b"} color={"white"} py={2} display={"flex"} justifyContent={"center"} alignItems={"center"}>
  {`${index + 130}$ Per Night`}
</Box>



    <Paper elevation={1}>
    <Avatar src={add.room.images[0] || imageGallery[index]} sx={{width:"100%",objectFit:"cover" , height:300}} variant="square"  />
    
    </Paper>
    </Grid>
  );
}
