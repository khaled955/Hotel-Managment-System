import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useNavigate, useParams } from "react-router-dom";
import photo1 from "../../../../assets/images/roomdetails/big.png"
import photo2 from "../../../../assets/images/roomdetails/Rectangle 6.png"
import photo3 from "../../../../assets/images/roomdetails/small.png"
import wifi from "../../../../assets/images/facilities/ic_wifi.png"
import bedroom from "../../../../assets/images/facilities/ic_bedroom.png"
import pathroom from "../../../../assets/images/facilities/ic_bathroom.png"
import dining from "../../../../assets/images/facilities/ic_diningroom.png"
import kulkas from "../../../../assets/images/facilities/ic_kulkas.png"
import tv from "../../../../assets/images/facilities/ic_tv.png"
import ac from "../../../../assets/images/facilities/ic_ac.png"
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { useCallback, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { UserAxiosInstance } from "../../../../Services/AxiosInstance";
import { GET_ROOM_REVIEWS, PORTAL_BOOKING_ROOM, ROOMS_URLS } from "../../../../Services/URLS";
import { RoomDetailsProp } from "../../../../Interfaces/RoomDetails.interface";
import Loading from "../../../Shared/Pages/Loading/Loading";
import ReviewsCard from "../../Components/ReviewsCard/ReviewsCard";
import { Review } from "../../../../Interfaces/RoomReviews.interfaces";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay } from 'swiper/modules';
import useAuth from "../../../../Hooks/useAuth.hook";
import RatingRoom from "../../Components/RatingRom/RatingRoom";
import Cooments from "../../Components/Comments/Cooments";






  const breadcrumbs = [
    <Link key={"1"}  color="inherit" to="/" style={{textDecoration:"none"}}>
      HOME
    </Link>,
   
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Room Details
    </Typography>,
  ];





export default function UserRoomDetails() {
 const [value, setValue] = useState<DateRange<Dayjs>>([null , null]);
  const [capacityNumber , setCapacityNumber] = useState(1)
  const [errorMessage , setErrorMessage] = useState<string | null>(null)
  
  const [roomDetails , setRoomDetails] = useState<RoomDetailsProp | null>(null)
   const[isLoading , setIsLoading] = useState(false)
   const [reviews , setReviews] = useState<Review[]| []>([])
   const navigate = useNavigate()
 const {id} = useParams()
const {token , isUser} = useAuth()


useEffect(()=>{

async function fetchRoom(){
  if(!id) {
    return navigate("/")
  } ;
  try {
    const {data} = await UserAxiosInstance.get(ROOMS_URLS.GET_ROOM(id))
    setRoomDetails(data.data.room)
  } catch (error) {
    if(isAxiosError(error)) toast.error(error.response?.data.message || "Some thing go wrong ")
  }

}

fetchRoom()

},[id , navigate])



// fetch reviews
useEffect(()=>{
  if(!token) return;
  async function fetchReviews(){
try {
  
  const{data} = await UserAxiosInstance.get(GET_ROOM_REVIEWS(id!))
  setReviews(data.data.roomReviews)
} catch (error) {
  if(isAxiosError(error))toast.error(error.response?.data.message || "Some thing Go Wrong !")
}

  }

  fetchReviews()
},[id,token])






const handlePaymentRoom = useCallback( async function(e: React.FormEvent<HTMLFormElement>){
  e.preventDefault()
  if(!token){
    toast("You Must Login First")
    return;
  }

    if (!roomDetails || !value[0] || !value[1]) {
    setErrorMessage("Please choose a valid date range.");
    return;
  }

 const sDate = value[0].format("YYYY-MM-DD");
  const eDate = value[1].format("YYYY-MM-DD");


      const toastId = toast.loading("Waiting.....")
    try {
     
          setIsLoading(true)
        const options = {
          method:"POST",
          url:PORTAL_BOOKING_ROOM,
          data:{
            "startDate":sDate,
            "endDate": eDate,
            "room": roomDetails._id,
            "totalPrice": roomDetails.price * capacityNumber
          }
        }
       
        const {data} = await UserAxiosInstance(options)

                 if(data.success){
                 toast.success(data.message)
                     setErrorMessage(null)
                                  
                     setTimeout(() => {
                    navigate("/checkout" , {state:{bookingId:data.data.booking._id ,userId:data.data.booking.user}})
                 }, 1500);
                 
}

              
    } catch (error) {
      if(isAxiosError(error)){
       toast.error(error?.response?.data.message || "Some thing go wrong ")
       setErrorMessage(error?.response?.data.message || "Some thing go wrong ")

      }
    }finally{
      setIsLoading(false)
      toast.dismiss(toastId)
    }

},[roomDetails  , capacityNumber ,navigate,value , token])














if(!roomDetails) return <Loading/>
  return (
   <Box component={"section"} py={3}>
    {/* Header */}
    <Box component={"header"} sx={{display:"flex" , flexWrap:"wrap"}}>

<Box width={"40%"}>
    <Stack spacing={2} mb={3} px={5}>
      <Breadcrumbs separator="/" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>

</Box>
<Box>
  <Typography component={"h2"} variant="h5"> Village Angga</Typography>
  <Typography color="#9e9e9e" textAlign={"center"} component={"p"}> Bogor, Indonesia</Typography>
</Box>

    </Box>

    {/* Img */}
    <Box component={"section"} my={5} px={3}>
     <Grid container spacing={3} justifyContent={"center"}>
      <Grid size={{xs:12 , md:6}}>
        <Box component={"img"} alt="room name" src={photo1} width={"100%"}/>
      </Grid>
      <Grid container flexDirection={"column"} spacing={3} size={{xs:12 , md:5}}>
              <Grid size={{xs:12}}>
               <Box component={"img"} alt="room name" src={photo2} width={"100%"}/>
              </Grid>
              <Grid size={{xs:12}}>
               <Box component={"img"} alt="room name" src={photo3} width={"100%"}/>
              </Grid>

      </Grid>
     </Grid>
    </Box>

{/* body */}

<Box component={"section"} px={4}>
<Grid container spacing={3} justifyContent={"center"}>
  {/* left side */}
<Grid size={{xs:12 , md:6}}>
<Typography color="#9e9e9e" component={"p"} mb={3}>
Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.
</Typography>
<Typography color="#9e9e9e" component={"p"} mb={3}>
Such trends saw the demise of the soul-infused techno that typified the original Detroit sound. Robert Hood has noted that he and Daniel Bell both realized something was missing from techno in the post-rave era.
</Typography>
<Typography color="#9e9e9e" component={"p"} mb={3}>
Design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The national agency for design: enabling Singapore to use design for economic growth and to make lives better.
</Typography>

{/* facilities container */}
<Box textAlign={"center"} sx={{display:"flex" , alignItems:"center" , flexWrap:"wrap" , gap:"30px"}}>

<Box>
  <Box src={wifi} component={"img"} alt="facilities" width={"30px"}/>
  <Box>
    <Typography component={"span"} mr={1}>10</Typography>
  <Typography color="#9e9e9e" component={"span"}>mbp/s</Typography>
  </Box>
</Box>
<Box>
  <Box src={tv} component={"img"} alt="facilities" width={"30px"}/>
  <Box>
    <Typography component={"span"} mr={1}>4</Typography>
  <Typography color="#9e9e9e" component={"span"}>Television</Typography>
  </Box>
</Box>
<Box>
  <Box src={bedroom} component={"img"} alt="facilities" width={"30px"}/>
  <Box>
    <Typography component={"span"} mr={1}>6</Typography>
  <Typography color="#9e9e9e" component={"span"}>Beadroom</Typography>
  </Box>
</Box>
<Box>
  <Box src={ac} component={"img"} alt="facilities" width={"30px"}/>
  <Box>
    <Typography component={"span"} mr={1}>5</Typography>
  <Typography color="#9e9e9e" component={"span"}>Conditioner</Typography>
  </Box>
</Box>
<Box>
  <Box src={kulkas} component={"img"} alt="facilities" width={"30px"}/>
  <Box>
    <Typography component={"span"} mr={1}>6</Typography>
  <Typography color="#9e9e9e" component={"span"}>Refrigator</Typography>
  </Box>
</Box>
<Box>
  <Box src={pathroom} component={"img"} alt="facilities" width={"30px"}/>
  <Box>
    <Typography component={"span"} mr={1}>3</Typography>
  <Typography color="#9e9e9e" component={"span"}>Pathroom</Typography>
  </Box>
</Box>
<Box>
  <Box src={dining} component={"img"} alt="facilities" width={"30px"}/>
  <Box>
    <Typography component={"span"} mr={1}>2</Typography>
  <Typography color="#9e9e9e" component={"span"}>Dining Room</Typography>
  </Box>
</Box>


</Box>
</Grid>


{/* right side for booking */}
<Grid size={{xs:10 , md:6}}>
  <Box border={"1px solid #39c"} borderRadius={"5px"} p={5} sx={{display:"flex" , flexDirection:"column" , alignItems:"center"}}>

<Typography component={"h3"} mb={3} variant="h5">Start Booking</Typography>
<Box>
  <Typography component={"span"} variant="h6" color="#1ABC9C">{roomDetails.price}$ </Typography>
<Typography component={"span"} variant="h6" color="#B0B0B0">per night</Typography>
</Box>
<Typography fontSize={"12px"} component={"p"} variant="h6" color="#FF1612" mb={8}>Discount 20% Off </Typography>


{/*  form of booking details */}


<Box onSubmit={(e)=>{
    handlePaymentRoom(e)
}} component={"form"} textAlign={"center"}>
  <Typography component={"label"}> Pick A Date</Typography>
   <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangePicker']}>
       
          <DateRangePicker
        
          format="YYYY-MM-DD"
            value={value}
            minDate={dayjs()}
            onChange={(newValue) => setValue(newValue)}
          />
      </DemoContainer>
    </LocalizationProvider>

<Box component={"footer"} display={"flex"} gap={1} mt={1}>
<Button  onClick={()=>{setCapacityNumber((current)=>current -1)}} disabled={capacityNumber === 1 || isLoading} color="warning" variant="contained"  sx={{fontSize:"30px" ,fontWeight:700}}>-</Button>
    <TextField
      sx={{
    '& .MuiInputBase-input': {
      textAlign: 'center', // Center the input text
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ccc', // default border
      },
      '&:hover fieldset': {
        borderColor: '#1976d2', // your custom hover color
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1976d2', // focused state border color
      },
    },
  }}
    
    
     fullWidth value={capacityNumber}></TextField>
<Button disabled={isLoading} variant="contained" onClick={()=> setCapacityNumber((current)=> current + 1)} sx={{fontSize:"30px" ,fontWeight:700}}>+</Button>

</Box>






    <Typography mt={4} component={"p"} color="#B0B0B0"> You Will Pay <Typography component={"span"} color="#152C5B"> {roomDetails.price * capacityNumber} $ USD</Typography> Per 
    <Typography component={"span"} color="#152C5B"> {capacityNumber} Persone</Typography>
    </Typography>

    {errorMessage && <Typography mt={4} component={"p"} color="#B0B0B0">{errorMessage}</Typography>}
   <Button disabled={isLoading} type="submit" variant="contained" sx={{mt:"6px"}}>Continue Book</Button>
</Box>


</Box>
</Grid>

</Grid>
</Box>

{/* rating and comment */}

<Box component={"section"} px={3} mt={4} border={"1px solid #39c"} borderRadius={"5px"}>
<Grid container spacing={2}>



  {/* rating */}
  <Grid size={{xs:12 , md:6}}>
    {/* rate  from mui */}
      { token && id &&  isUser &&<RatingRoom roomId={id}/>}

{reviews.length > 0 && <Box className="reviews-container" component={"div"}>
  <Swiper  spaceBetween={20}
        modules={[Autoplay]}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          300: { slidesPerView: 1 },
          600: { slidesPerView: 1 },
          900: { slidesPerView: 1 },
          1000: { slidesPerView: 1 },
          1200: { slidesPerView: 1 },
        }}>
    {reviews.sort((a:Review , b:Review)=> Number(a.createdAt) - Number(b.createdAt)).map((rev:Review)=> <SwiperSlide key={rev._id}>
        <ReviewsCard revInfo={rev}/>
    </SwiperSlide>)}
  </Swiper>

</Box>}
  </Grid>

  {/* comment */}
  <Grid size={{ xs:12 , md:6}} py={3}>
{ isUser && token &&id && <Cooments roomId={id}/>}
  </Grid>
</Grid>
</Box>


   </Box>
  )
}
