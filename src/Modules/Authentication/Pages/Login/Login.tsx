import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { LoginProps } from "../../../../Interfaces/Authentication.interfaces";
import { Link, useNavigate } from "react-router-dom";
import loginBg from "../../../../assets/images/auth/login.png";
import useAuth from "../../../../Hooks/useAuth.hook";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { AUTH_URLS } from "../../../../Services/URLS";
import { UserAxiosInstance } from "../../../../Services/AxiosInstance";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "../../../../Services/Validations";
import Cookies from "js-cookie";







// mui imports 
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";





export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [helperText, setHelperText] =useState("");
const navigate = useNavigate()
const {setToken} = useAuth()





  










  const {register , handleSubmit , formState: { errors,isSubmitting}} = useForm<LoginProps>({mode:"onChange"});















// login

const login  = useCallback( async function(userInfo:LoginProps){
const toastId = toast.loading("Waiting....")

try {
  const options = {
    method: "POST",
    url:AUTH_URLS.LOGIN,
    data:userInfo
  }
  



 
const {data} = await UserAxiosInstance.request(options)
if(data.success){
  Cookies.set("HOTELCOOKIE" , data.data.token , {expires:7})
  setToken(data.data.token)
  toast.success( data.message || "login Successfully")
  setHelperText("")
if(data.user.role === "admin"){
  navigate("/dashboard")
} else{
  navigate("/")
}


}



} catch (error) {
  if(isAxiosError(error)){
  toast.error(error.response?.data.message || " Some thing go Wrong !")
  setHelperText(error.response?.data.message || " Some thing go Wrong !")
  }
   
}finally{
  toast.dismiss(toastId)
}




} ,[navigate,setToken])



// handle functions for password input

const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };




 
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
    <Typography component={"h3"}>Sign in</Typography>
  <Typography component={"p"}>If you don’t have an account register</Typography>
  <Typography component={"span"}>You can   <Link style={{color:"red",textDecoration:"none"}} to="/auth/register"> Register here !</Link></Typography>

</Box>

{/* form */}


<Box onSubmit={handleSubmit(login)} style={{width:"100%"}} mt={5} component={"form"}>


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


      
      {/*  password input */}
         <Box mb={2}>
                 <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
        <FormControl fullWidth sx={{ mt: 1}} variant="filled">
          <FilledInput
          {...register("password",{required:"Password is Required",pattern:PASSWORD_VALIDATION})}
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}

         </Box>

    <Link style={{display:"block" , marginLeft:"auto", textDecoration:"none" , width:"fit-content",marginBottom:10}} to="/auth/forget-password">Forget Password ?</Link>




{helperText && <FormHelperText sx={{textAlign:"center"}}>{helperText}</FormHelperText>
}
  <Button  fullWidth={true} sx={{display:"block",mx:"auto" ,mb:"10px"}} variant="contained" type="submit" loading ={isSubmitting}>Login</Button>


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
