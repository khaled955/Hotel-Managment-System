
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { ForgetProps } from "../../../../Interfaces/Authentication.interfaces";
import { Link, useNavigate } from "react-router-dom";
import loginBg from "../../../../assets/images/auth/forget-password.png";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { AUTH_URLS } from "../../../../Services/URLS";
import { UserAxiosInstance } from "../../../../Services/AxiosInstance";
import { EMAIL_VALIDATION} from "../../../../Services/Validations";

// mui imports 
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";





export default function ForgetPassword() {
  const [helperText, setHelperText] =useState("");
const navigate = useNavigate()


  const {register , handleSubmit , formState: { errors,isSubmitting},watch} = useForm<ForgetProps>({mode:"onChange"});


// forget

const forget  = useCallback( async function(userInfo:ForgetProps){
const toastId = toast.loading("Waiting....")

try {
  const options = {
    method: "POST",
    url:AUTH_URLS.FORGET_PASSWORD,
    data:userInfo
  }
  
const {data} = await UserAxiosInstance.request(options)
if(data.success){
  toast.success("Password Reset OTP Sent to Your Email")
  setTimeout(()=>{
    navigate("/auth/reset-password" ,{state:{userEmail:watch("email")}})
  },1500)
}




} catch (error) {
  if(isAxiosError(error)){
  toast.error(error.response?.data.message || " Some thing go Wrong !")
  setHelperText(error.response?.data.message || " Some thing go Wrong !")
  }
   
}finally{
  toast.dismiss(toastId)
}




} ,[navigate,watch])






 
  return (
   <>


  <Box overflow={"hidden"} component={"main"}>
{/*  text and form */}
<Grid container spacing={1}  direction="row"
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}>

 <Grid sx={{px:1}} size={{md:5, xs: 12 }}>
    {/*  header */}
<Box component={"header"}>
    <Typography component={"h3"}>Forgot password</Typography>
  <Typography component={"p"}>If you already have an account register</Typography>
  <Typography component={"span"}>You can   <Link style={{color:"red",textDecoration:"none"}} to="/auth/login"> Login here !</Link></Typography>

</Box>

{/* form */}


<Box onSubmit={handleSubmit(forget)} style={{width:"100%"}} mt={5} component={"form"}>


{/*  input for Email */}

<Box mb={2}>
    <InputLabel htmlFor="email">Email</InputLabel>
   <FormControl fullWidth variant="filled">
        <FilledInput
        {...register("email" , {required:"Email is Required",pattern:EMAIL_VALIDATION}) }
        type="email"
      />
     </FormControl>

{errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}

</Box>


      
     





{helperText && <FormHelperText sx={{textAlign:"center"}}>{helperText}</FormHelperText>
}
  <Button fullWidth sx={{display:"block",mx:"auto"}} variant="contained" type="submit" loading ={isSubmitting}>Send Email</Button>

</Box>





   </Grid>

{/*  imge */}
<Grid size={{md:5}}>
<Avatar variant="square" sx={{width:"100%" , height:"auto",objectFit:"contain"}} alt="bg-img-for-register" src={loginBg}/>
</Grid>
</Grid>



  </Box>

   </>
  )
}
