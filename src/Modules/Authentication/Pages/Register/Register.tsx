import { countries } from "countries-list";
import { useCallback, useEffect, useState } from "react";
import { useForm ,Controller } from "react-hook-form";
import { RegisterProps } from "../../../../Interfaces/Authentication.interfaces";
import { Link, useNavigate } from "react-router-dom";
import loginBg from "../../../../assets/images/auth/register.png";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { AUTH_URLS } from "../../../../Services/URLS";
import { UserAxiosInstance } from "../../../../Services/AxiosInstance";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION, PHONE_NUMBER, USER_NAME } from "../../../../Services/Validations";


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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import ButtonBase from "@mui/material/ButtonBase";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";




const countriesList = Object.values(countries)
  .map((country) => ({ Countryname: country.name, countryPhone: country.phone[0] }))
  .sort((a, b) => a.Countryname.localeCompare(b.Countryname));


export default function Register() {
  const [phonePrefix, SetphonePrefix] = useState<string | number>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);
  const [helperText, setHelperText] =useState("");
const navigate = useNavigate()






  










  const {register , handleSubmit , watch , formState: { errors,isSubmitting} ,trigger ,   control,} = useForm<RegisterProps>({mode:"onChange",defaultValues:{
    country:"",
  }});




  // setting phone number prefix
  const selectedCountry = watch("country");

  const handleChangePrefix = useCallback(() => {
    const phone = countriesList.find((pre) => pre.Countryname === selectedCountry);
    SetphonePrefix(phone ? phone.countryPhone : "");
  }, [selectedCountry]);


  useEffect(() => {
    handleChangePrefix();
  }, [selectedCountry, handleChangePrefix]);






  // handle confirmed password when password change
  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name === "password") trigger("confirmPassword");
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);




// convert data into form data before submite

const convertDataIntoFormData = useCallback( function(data:RegisterProps){

const convertedData = new FormData()
convertedData.append("userName" , data.userName)
convertedData.append("email" , data.email)
convertedData.append("password" , data.password)
convertedData.append("confirmPassword" , data.confirmPassword)
convertedData.append("phoneNumber" , data.phoneNumber)
convertedData.append("country" , data.country)
convertedData.append("role" , "user")
if(data.profileImage){
  convertedData.append("profileImage" , data.profileImage)

}


return convertedData
},[])




// create New user

const createNewUser  = useCallback( async function(userInfo:RegisterProps){
const toastId = toast.loading("Waiting....")

const dataConverted = convertDataIntoFormData(userInfo)
try {
  const options = {
    method: "POST",
    url:AUTH_URLS.REGISTER,
    data:dataConverted
  }
  
const {data} = await UserAxiosInstance.request(options)


if(data.success){
  toast.success("User Created Successfully")
  setHelperText("")
setTimeout(()=>{
  navigate("/auth/login")
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




} ,[convertDataIntoFormData,navigate])



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
    <Typography component={"h3"}>Sign up</Typography>
  <Typography component={"p"}>If you already have an account register</Typography>
  <Typography component={"span"}>You can   <Link style={{color:"red",textDecoration:"none"}} to="/auth/login"> Login here !</Link></Typography>

</Box>

{/* form */}


<Box onSubmit={handleSubmit(createNewUser)} style={{width:"100%"}} mt={5} component={"form"}>


{/*  input for Avatar Input */}

<Box sx={{ textAlign:"center",mb:"10px"}}>
  <ButtonBase
  
      component="label"
      role={undefined}
      tabIndex={-1} // prevent label from tab focus
      aria-label="Avatar image"
      sx={{
        borderRadius: '40px',
        '&:has(:focus-visible)': {
          outline: '2px solid',
          outlineOffset: '2px',
        },
      }}
    >
      <Avatar sx={{width:80 , height:80}} alt="Upload new avatar" src={avatarSrc} />
     
<Controller
  name="profileImage"
  control={control}
  rules={{ required: "Profile image is required" }}
  render={({ field: { onChange, ref, name } }) => (
    <input
    
      name={name}
      ref={ref}
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          setAvatarSrc(URL.createObjectURL(file)); // preview
          onChange(file); // set in react-hook-form
        }
      }}
      style={{
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        whiteSpace: 'nowrap',
        width: '1px',
      }}
    />
  )}
/>




    </ButtonBase>
</Box>
    {errors.profileImage && <FormHelperText sx={{textAlign:"center"}}>{errors.profileImage.message}</FormHelperText>}


 
    {/*  input for user name */}

<Box mb={2}>
    <InputLabel htmlFor="component-filled">Name</InputLabel>
   <FormControl fullWidth variant="filled">
    
        <FilledInput
        
        {...register("userName",{required:"User Name is Required",pattern:USER_NAME})}
        id="component-filled" />
     </FormControl>

{errors.userName && <FormHelperText>{errors.userName.message}</FormHelperText>}

</Box>

{/*  input for Phone Number */}

<Box mb={2}>
    <InputLabel htmlFor="phone-number">Phone Number</InputLabel>
   <FormControl fullWidth variant="filled">
        <FilledInput
        {...register("phoneNumber",{ required:"Phone Number is Required",pattern:PHONE_NUMBER})}
        startAdornment={
            <InputAdornment position="start">
              <Box component={"span"}>{phonePrefix}</Box>
            </InputAdornment>
          } type="tel"  id="phone-number" />
     </FormControl>
{errors.phoneNumber && <FormHelperText>{errors.phoneNumber.message}</FormHelperText>}

</Box>




{/*  input for country */}
<Box mb={2}>
    <InputLabel id="demo-simple-select-label">Country</InputLabel>

  <FormControl fullWidth>
  <Controller
  name="country"
  control={control}
  rules={{ required: "Country is required" }}
  render={({ field }) => (
    <Select
      {...field}
      fullWidth
      displayEmpty
      variant="filled"
    >
      <MenuItem value="" disabled>Select your country</MenuItem>
      {countriesList.map((country) => (
        <MenuItem key={country.Countryname} value={country.Countryname}>
          {country.Countryname}
        </MenuItem>
      ))}
    </Select>
  )}
/>



</FormControl>

{errors.country && <FormHelperText>{errors.country.message}</FormHelperText>}

</Box>



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

    
    {/*  confirmed password input */}
  <Box mb={2}>
   <InputLabel htmlFor="filled-adornment-confirmedpassword">Confirm Password</InputLabel>

    <FormControl fullWidth sx={{ mt: 1}} variant="filled">
          <FilledInput
{...register("confirmPassword" , {required:"Confirmed Password Is Required" , validate:(value)=> value === watch("password") || "Passwords do not match"}) }

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
  <Button sx={{display:"block",mx:"auto"}} variant="contained" type="submit" loading ={isSubmitting}>Register</Button>

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
