import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
  Grid,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect } from "react"
import useAuth from "../../../../Hooks/useAuth.hook"
import { useNavigate } from "react-router-dom"
import avatar from "../../../../assets/images/profile.jpg"
import Loading from "../Loading/Loading";

export default function Profile() {
  const{token,userInfo , getUserInformation} = useAuth()
const navigate = useNavigate()
  const theme = useTheme();


useEffect(()=>{
if(!token){
  navigate("/")
return ;

}

getUserInformation()

},[token , navigate , getUserInformation])
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if(!userInfo) return <Loading/>
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={isMobile ? 2 : 4}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          boxShadow: 6,
          borderRadius: 4,
          background: "#fdfdfd",
        }}
      >
        <CardContent>
          {/* Header with Avatar */}
          <Box textAlign="center" mb={3}>
            <Avatar
              src={userInfo?.profileImage || avatar}
              alt={userInfo.userName}
              sx={{
                width: isMobile ? 80 : 100,
                height: isMobile ? 80 : 100,
                margin: "auto",
                border: "2px solid #1976d2",
              }}
            />
            <Typography variant={isMobile ? "h6" : "h5"} mt={2} fontWeight={600}>
              {userInfo.userName}
            </Typography>
            <Chip
              label={userInfo.role.toUpperCase()}
              color={userInfo.role === "admin" ? "error" : "primary"}
              variant="outlined"
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>

          <Divider />

          {/* Info Grid */}
          <Grid container spacing={2} mt={1} textAlign={"center"}>
            <Grid size={{xs:12 , sm:6}}>
              <Typography variant="subtitle2" color="text.secondary">
                Email
              </Typography>
              <Typography>{userInfo.email}</Typography>
            </Grid>

            <Grid size={{xs:12 , sm:6}}>
              <Typography variant="subtitle2" color="text.secondary">
                Phone
              </Typography>
              <Typography>{userInfo.phoneNumber}</Typography>
            </Grid>

            <Grid size={{xs:12 , md:6}}>
              <Typography variant="subtitle2" color="text.secondary">
                Country
              </Typography>
              <Typography>{userInfo.country}</Typography>
            </Grid>

            <Grid size={{xs:12 , md:6}}>
              <Typography variant="subtitle2" color="text.secondary">
                Member Since
              </Typography>
              <Typography>{new Date(userInfo.createdAt).toLocaleString()}</Typography>
            </Grid>

            <Grid size={{xs:12}}>
              <Typography variant="subtitle2" color="text.secondary">
                Last Updated
              </Typography>
              <Typography>{new Date(userInfo.updatedAt).toLocaleString()}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}




