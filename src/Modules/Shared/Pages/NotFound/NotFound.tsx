import { Box, Button, Grid} from "@mui/material";
import photo from "../../../../assets/images/notfound.jpeg"
import { useNavigate } from "react-router-dom";
export default function NotFound() {
  const navigate = useNavigate()
  return (
    <Box component={"section"} p={6} textAlign={"center"}>
      <Grid container justifyContent={"center"}>
         <Grid size={{xs:12 , md:8}}>
          <Box width={"100%"} component={"img"} src={photo} alt="not-found"/>
          <Button onClick={()=>{ navigate("/")}} variant="contained"> Go To Home</Button>
         </Grid>
      </Grid>
    </Box>
  )
}
