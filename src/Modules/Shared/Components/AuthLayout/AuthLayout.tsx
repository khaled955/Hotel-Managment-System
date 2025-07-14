import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
    <Box p={2}>

<Typography fontWeight={700} fontSize={30} mb={3} component={"h1"}> <Typography fontSize={"inherit"} component={"span"} sx={{color:"blue"}}>Stay</Typography>cation</Typography>
      <Outlet/>



    </Box>
    
    
    
    </>
      
  )
}
