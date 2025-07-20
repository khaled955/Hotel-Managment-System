import { Box, Grid, Paper, Typography } from "@mui/material";
import photo from "../../../../assets/images/profile.jpg"
import StarIcon from '@mui/icons-material/Star';
import { Review } from "../../../../Interfaces/RoomReviews.interfaces";
export default function ReviewsCard({revInfo}:{revInfo:Review}) {
  return (
    <Box component={"section"} my={8}>
     <Paper>
           <Grid py={6} container textAlign={"center"} spacing={3} alignItems={"center"}>
           <Grid size={{xs:12 , md:6}} display={"flex"} justifyContent={"center"}>
            <Box borderRadius={"50%"} src={ revInfo.user.profileImage ||photo} width={"150px"} component={"img"} alt="profile-photo"/>
           </Grid>
           <Grid size={{xs:12 , md:6}}>
            <Typography variant="h6" sx={{textTransform:"capitalize"}} component={"h5"}>{revInfo.user.userName}</Typography>
            <Box>
                <Box>
                    <Typography component={"span"}><StarIcon sx={{color:"yellow"}}/>
                    <StarIcon sx={{color:"yellow"}}/><StarIcon sx={{color:"yellow"}}/>
                    <StarIcon sx={{color:"yellow"}}/>
                    </Typography>
                <Typography>{revInfo.rating}</Typography>
                </Box>
                <Typography component={"p"}>{revInfo.review}</Typography>
            </Box>
           </Grid>


        </Grid>
      
     </Paper>
    </Box>
  )
}
