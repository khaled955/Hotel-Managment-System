import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { AdmineAxiosInstance } from "../../../../Services/AxiosInstance";
import { ADMIN_BOOKINGS_URLS } from "../../../../Services/URLS";
import Loading from "../../../Shared/Pages/Loading/Loading";
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useAuth from "../../../../Hooks/useAuth.hook";
import { useNavigate } from "react-router-dom";
import ListBookingDetails from "../../Components/ListBookingDetails/ListBookingDetails";
import { Booking} from "../../../../Interfaces/Booking.interface";
import ViewActionsBtn from "../../../Shared/Components/ViewActionBtn/ViewActionsBtn";













const paginationModel = { page: 0, pageSize: 5 };








export default function ListBooking() {
const [bookingList , setbookingList] = useState<Booking[] | null>(null)
const [selectedBook, setSelectedBook] = useState<Booking | null>(null);
const [showBookDetails , setShowBookDetails] = useState(false)
const navigate = useNavigate()
const {isUser,token} = useAuth()






const rows = useMemo(function(){
  return bookingList?.map((book:Booking)=>{
    return {_id:book._id ,roomNumber:book.room?.roomNumber || "NAN",totalPrice:book.totalPrice ,startDate:book.startDate ,endDate
:book.endDate ,userName:book?.user?.userName,status:book.status}
  })
},[bookingList])


console.log(rows)




const columns :GridColDef[]= useMemo(function(){
  return [
   
  { field: 'roomNumber' , headerName: 'RoomNumber' ,headerAlign:"center",flex:1,align:"center"},
  { field: 'status' , headerName: 'Status' ,headerAlign:"center",flex:1,align:"center"},
  { field: 'totalPrice', headerName: 'Price' ,headerAlign:"center",flex:1,align:"center"},
  { field: 'startDate', headerName: 'startDate' ,headerAlign:"center",flex:1,align:"center"},
  {  field: 'endDate',headerName: 'EndDate',headerAlign:"center", flex:1,align:"center"},
   {field: 'userName',headerName: 'UserName',headerAlign:"center", flex:1,align:"center" , type:"singleSelect",valueOptions: ["user","admin"]},
  {  field: 'Actions',headerName: 'Actions',headerAlign:"center", flex:1,align:"center" , renderCell:()=> <ViewActionsBtn onShow={handleShowBookingDetails}/> ,
sortable:false,filterable:false,
},



]
} ,[]);




useEffect(()=>{
async function fetchBooking(){

  try {
    const {data} = await AdmineAxiosInstance.get(ADMIN_BOOKINGS_URLS.GET_ALL_BOOKINGS(100,1))
    console.log(data)
if(data.success){
  setbookingList(data.data.booking)
}

  } catch (error) {
    if(isAxiosError(error))toast.error(error.response?.data.message || "Some Thing Go Wrong")
  }


}

if( token && !isUser ){
fetchBooking()
}else{
  navigate("/home")
}
},[isUser,navigate,token])














if(!bookingList) return<Loading/>



function handleShowBookingDetails(){
  setShowBookDetails(true)
}









  return (
    <Box component={"section"} overflow={"hidden"}>
      {/* header */}
      <Box component={"header"}>
        <Typography variant="h4" component={"h2"}> Booking Table Details</Typography>
        <Typography component={"span"}>You can check all details</Typography>
      </Box>
    


{/*  Booking table */}


<Grid container justifyContent={"center"}>
  <Grid size={{sm:12 , md:10}}>
    <Paper sx={{ width: '100%', mt: 8, textAlign: "center" }}>
      <DataGrid
      
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        getRowId={rows=>rows._id}
        onRowClick={(params) => setSelectedBook(params.row)}
        sx={{ border: 0, textAlign: "center",width:"100%" }}
      />
    </Paper>
  </Grid>
</Grid>


{/* Book Details Pop Up */}

{showBookDetails &&  selectedBook && <ListBookingDetails
  open={!!selectedBook}
   booking={selectedBook}
  onClose={() =>{
 setShowBookDetails(false)
    setSelectedBook(null)
  } 
  }
/>}



    </Box>
  )
}
