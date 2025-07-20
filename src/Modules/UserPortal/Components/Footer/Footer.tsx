import { Grid, Typography } from "@mui/material";

export default function Footer() {
  return (
     <Grid textAlign={"center"} mt={5} borderTop={"1px solid #f9f9f9"} px={2} py={3} container spacing={3} justifyContent={"space-between"}>
<Grid size={{xs:12 ,sm: 6 , md:3}}>
<Typography component={"h2"} variant="h5"> <Typography variant="h5" component={"span"} color="primary"> Stay</Typography> cation.  </Typography>
<Typography color="#9e9e9e" fontSize={12} component={"p"}>We kaboom your beauty holiday
instantly and memorable.</Typography>
</Grid>
<Grid size={{xs:12 ,sm: 6 , md:3}}>
  <Typography component={"h2"} variant="h5">For Beginners  </Typography>
<Typography color="#9e9e9e" fontSize={12} component={"p"}>New Account</Typography>
<Typography color="#9e9e9e" fontSize={12} component={"p"}>Start Booking a Room</Typography>
<Typography color="#9e9e9e" fontSize={12} component={"p"}>Use Payments</Typography>
</Grid>
<Grid size={{xs:12 ,sm: 6 , md:3}}>
  <Typography component={"h2"} variant="h5">Explore Us  </Typography>
<Typography color="#9e9e9e" fontSize={12} component={"p"}>Our Careers</Typography>
<Typography color="#9e9e9e" fontSize={12} component={"p"}>Privacy</Typography>
<Typography color="#9e9e9e" fontSize={12} component={"p"}>Terms & Conditions</Typography>
</Grid>
<Grid size={{xs:12 ,sm: 6 , md:3}}>
    <Typography component={"h2"} variant="h5">Connect Us  </Typography>
<Typography color="#9e9e9e" fontSize={12} component={"p"}>support@staycation.id</Typography>
<Typography color="#9e9e9e" fontSize={12} component={"p"}>021 - 2208 - 1996</Typography>
<Typography color="#9e9e9e" fontSize={12} component={"p"}>Staycation, Kemang, Jakarta</Typography>
</Grid>




    </Grid>
  )
}
