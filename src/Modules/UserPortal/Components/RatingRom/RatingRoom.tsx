import { Box, Button, TextField, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { CREATE_ROOM_RATING } from "../../../../Services/URLS";
import { UserAxiosInstance } from "../../../../Services/AxiosInstance";


const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};


function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}






export default function RatingRoom({roomId}:{roomId:string}) {
const [ratevalue, setRateValue] = useState<number | null>(2);
  const [hover, setHover] = useState(-1);
const {register , handleSubmit , formState:{errors,isSubmitting} } = useForm<{review:string }>({mode:"onChange"})
const [errorMessage , setErrorMessage] = useState(null)



const handleRating = useCallback( async function(dataInfo:{review:string}){
const toastId = toast.loading("Waiting.....")

try {
  const options = {
    url:CREATE_ROOM_RATING,
    method:"POST",
    data:{
      roomId  ,
    rating: ratevalue  ,
    review: dataInfo.review ,
    }
  }


const {data} = await UserAxiosInstance.request(options)
toast.success(data.message || "Review Added Successfully")
   setErrorMessage(null)
  
} catch (error) {
  if(isAxiosError(error)){
    toast.error(error.response?.data.message || "Error")
    setErrorMessage(error.response?.data.message || "Error")
  }
}finally{
  toast.dismiss(toastId)
}
},[roomId ,ratevalue])



  return (
    <Box component={"form"} onSubmit={handleSubmit(handleRating)}>
        <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }} py={2}>
      <Rating
        name="hover-feedback"
        value={ratevalue}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(_, newValue) => {
          setRateValue(newValue);
        }}
        onChangeActive={(_, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {ratevalue !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : ratevalue]}</Box>
      )}
    </Box>



    <Box component={"div"} display={"flex"} flexDirection={"column"}>
<Typography component={"label"} htmlFor="rateMsg"> Write Your Message </Typography>
   <TextField
   {...register("review" ,{required:"Comment Is Required",pattern:{
    value:/^[a-zA-Z][a-zA-Z0-9]{3,}/,
    message:"Please enter a valid message Not Less than 4 characters and should start with a letter",
   }})}
          id="rateMsg"
          helperText={errors.review?.message}
          multiline
          maxRows={4}
          sx={{width:"70%"}}
        />
        {errorMessage && <Typography component={"p"} color={"red"}>{errorMessage}</Typography>}
        <Button loading={isSubmitting} type="submit" sx={{my:"12px" , width:"fit-content"}} variant="contained">Rate</Button>
    </Box>
    </Box>
  )
}
