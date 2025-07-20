import { useEffect, useState } from "react"
import photo1 from "../../../../assets/images/rooms/room1.jpeg"
import photo2 from "../../../../assets/images/rooms/room2.jpeg"
import photo3 from "../../../../assets/images/rooms/room3.jpeg"
import photo4 from "../../../../assets/images/rooms/room4.jpeg"
import photo5 from "../../../../assets/images/rooms/room5.jpeg"
import photo6 from "../../../../assets/images/rooms/room6.jpeg"
import photo7 from "../../../../assets/images/rooms/room7.jpeg"
import photo8 from "../../../../assets/images/rooms/room8.jpeg"
import { BookingListProps } from "../../../../Interfaces/Booking.interfaces"
import { isAxiosError } from "axios"
import toast from "react-hot-toast"
import { UserAxiosInstance } from "../../../../Services/AxiosInstance"
import { PORTAL_BOOKING_LIST } from "../../../../Services/URLS"
import Loading from "../../../Shared/Pages/Loading/Loading"
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"



const imgList = [photo1 , photo2 , photo3 , photo4 , photo5 , photo7 , photo6 , photo8,
  photo1 , photo2 , photo3 , photo4 , photo5 , photo7 , photo6 , photo8,photo1 , photo2 , photo3 , photo4 , photo5 , photo7 , photo6 , photo8
]





export default function BookingListDetails() {
const [bookingList , setBookingList] = useState<BookingListProps[] | null>(null)
const navigate = useNavigate()

useEffect(()=>{

async function fetchBookingData(){

try {
  
   const {data} = await  UserAxiosInstance.get(PORTAL_BOOKING_LIST)
if(data.success){
setBookingList(data.data.myBooking)

}
} catch (error) {
   if(isAxiosError(error)) toast.error(error.response?.data.message || " Some Thing Go Wrong!")
}


}

fetchBookingData()
},[])


if(!bookingList) return <Loading/>
  return (
    <Box component={"section"} p={5}>
      <Typography fontWeight={700} color="#39c" component={"h2"} variant="h4"> Booking List Details</Typography>
      <Divider/>
      <Grid container spacing={3} mt={6}>
       {bookingList.length > 0 ? bookingList.map((book:BookingListProps,index:number)=> <Grid key={book._id} size={{xs:12}}>
          <Paper  sx={{ p:2}} >
           <Grid container spacing={3} justifyContent={"space-between"} alignItems={"center"}>
             <Grid size={{xs:12 , sm:4}}>
               <Box className="img-container" component={"div"}>
            <Box component={"img"} src={imgList[index]} width={"100%"} borderRadius={5} alt="img-room"/>
          </Box>
             </Grid>
             <Grid size={{xs:12 , sm:8}}>
              <Box className="text-box" display={"flex"} justifyContent={"space-between"} alignItems={"center"} flexWrap={"wrap"}>
                <Box component={"div"}>
                <Typography variant="h6" component={"h5"}> Start Date</Typography>
                 <Typography component={"span"}>{new Date(book.startDate).toLocaleDateString()}</Typography>
                </Box>

                   <Box component={"div"}>
                <Typography variant="h6" component={"h5"}> End Date</Typography>
                 <Typography component={"span"}>{new Date(book.endDate).toLocaleDateString()}</Typography>
                </Box>

             <Box component={"div"}>
                <Typography variant="h6" component={"h5"}> Total Price</Typography>
                 <Typography component={"span"}>{book.totalPrice} $</Typography>
                </Box>

                 <Box component={"div"}>
                <Typography variant="h6" component={"h5"}>Status</Typography>
                 <Typography component={"span"}>{book.status}</Typography>
                </Box>

          </Box>
             </Grid>



           </Grid>

          </Paper>
        </Grid>)
        
       
       :<Typography component={"p"} bgcolor={"39c"} borderRadius={5} p={6}> Your CheckOut List Is Empty You Can Add Now Rooms To Ypur List <Button onClick={()=>{
            navigate("/")
       }} variant="contained">Go Home</Button></Typography>}
      </Grid>
    </Box>
  )
}

