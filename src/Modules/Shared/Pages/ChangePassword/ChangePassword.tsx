
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ChangePasswordProps } from "../../../../Interfaces/Authentication.interfaces";
import { Navigate, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { AUTH_URLS } from "../../../../Services/URLS";
import { UserAxiosInstance } from "../../../../Services/AxiosInstance";
import { PASSWORD_VALIDATION } from "../../../../Services/Validations";


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
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import useAuth from "../../../../Hooks/useAuth.hook";






export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [helperText, setHelperText] =useState("");
const{token} = useAuth()
const navigate = useNavigate()





  










  const {register , handleSubmit , watch , formState: { errors,isSubmitting} ,trigger} = useForm<ChangePasswordProps>({mode:"onChange",});










  // handle confirmed password when password change
  useEffect(() => {



    const subscription = watch((_, { name }) => {
      if (name === "newPassword") trigger("confirmPassword");
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);


  // handle prevent newpassword and oldpassword to be the same
  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name === "oldPassword") trigger("newPassword");
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);















// create New user

const handleChangePassword  = useCallback( async function(userInfo:ChangePasswordProps){
const toastId = toast.loading("Waiting....")

try {
  const options = {
    method: "POST",
    url:AUTH_URLS.CHANGE_PASSWORD,
    data:userInfo
  }
  
const {data} = await UserAxiosInstance.request(options)


if(data.success){
  toast.success( data.message ||"Password Changed Successfully")
  setHelperText("")
setTimeout(()=>{
  navigate("/")
},1500)
}



} catch (error) {
  if(isAxiosError(error)){
     console.log(error)
  toast.error(error.response?.data.message || " Some thing go Wrong !")
  setHelperText(error.response?.data.message || " Some thing go Wrong !")
  }
   
}finally{
  toast.dismiss(toastId)
}




} ,[navigate])



// handle functions for password input

const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  // handle function for confirmed password
const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };




// handle functions for oldpassword input

const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);

  const handleMouseDownOldPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpOldPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };







if(!token ) return <Navigate to="/"/>

 
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
    <Typography component={"h3"}>Change Password</Typography>

</Box>

{/* form */}


<Box onSubmit={handleSubmit(handleChangePassword)} style={{width:"100%"}} mt={5} component={"form"}>


{/* input for old password */}

   <Box mb={2}>
                 <InputLabel htmlFor="filled-adornment-oldpassword">Old Password</InputLabel>
        <FormControl fullWidth sx={{ mt: 1}} variant="filled">
          <FilledInput
          {...register("oldPassword",{required:"OldPassword is Required",pattern:PASSWORD_VALIDATION})}
            id="filled-adornment-oldpassword"
            type={showOldPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showOldPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowOldPassword}
                  onMouseDown={handleMouseDownOldPassword}
                  onMouseUp={handleMouseUpOldPassword}
                  edge="end"
                >
                  {showOldPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        {errors.oldPassword && <FormHelperText>{errors.oldPassword.message}</FormHelperText>}

         </Box>

      {/* new password input */}
         <Box mb={2}>
                 <InputLabel htmlFor="filled-adornment-password">New Password</InputLabel>
        <FormControl fullWidth sx={{ mt: 1}} variant="filled">
          <FilledInput
          {...register("newPassword",{required:"New Password is Required",pattern:PASSWORD_VALIDATION,validate:(value)=> value !== watch("oldPassword")|| "New Password should be different from Old Password"})}
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

        {errors.newPassword && <FormHelperText>{errors.newPassword.message}</FormHelperText>}

         </Box>

    
    {/*  confirmed new password input */}
  <Box mb={2}>
   <InputLabel htmlFor="filled-adornment-confirmedpassword">Confirm New Password</InputLabel>

    <FormControl fullWidth sx={{ mt: 1}} variant="filled">
          <FilledInput
{...register("confirmPassword" , {required:"Confirmed Password Is Required" , validate:(value)=> value === watch("newPassword") || "Passwords do not match"}) }

            id="filled-adornment-confirmedpassword"
            type={showConfirmPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showConfirmPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                  onMouseUp={handleMouseUpConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        {errors.confirmPassword && <FormHelperText>{errors.confirmPassword.message}</FormHelperText>}

  </Box>




{helperText && <FormHelperText sx={{textAlign:"center"}}>{helperText}</FormHelperText>
}
  <Button fullWidth sx={{display:"block",mx:"auto"}} variant="contained" type="submit" loading ={isSubmitting}>Change</Button>

</Box>





   </Grid>


</Grid>



  </Box>

   </>
  )
}
