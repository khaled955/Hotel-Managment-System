import { Box, Button, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { AdmineAxiosInstance } from "../../../../Services/AxiosInstance";
import { ROOMS_URLS } from "../../../../Services/URLS";
import Loading from "../../../Shared/Pages/Loading/Loading";
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useAuth from "../../../../Hooks/useAuth.hook";
import { useNavigate } from "react-router-dom";
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ActionBtn from "../../../Shared/Components/ActionBtn/ActionBtn";
import DeleteModal from "../../../Shared/Components/DeleteModal/DeleteModal";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RoomDetails from "../../../UserPortal/Pages/RoomDetails/RoomDetails";
import { RoomProps} from "../../../../Interfaces/Rooms.interface";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DiscountIcon from '@mui/icons-material/Discount';





const paginationModel = { page: 0, pageSize: 5 };

export default function Rooms() {
const [roomsList , setRoomsList] = useState<RoomProps[] | null>(null)
const [selectedRoom, setSelectedRoom] = useState<RoomProps | null>(null);
const [showRoomDetails , setShowRoomDetails] = useState(false)
const[showDeletModal , setShowDeletModal] = useState(false)
const [isLoading , setIsLoading] = useState(false)
const navigate = useNavigate()
const {isUser,token} = useAuth()






const rows = useMemo(function(){
  
  return roomsList?.map((room:RoomProps)=>{
    return {_id:room._id ,roomNumber:room.roomNumber,createdBy:room.createdBy.userName,createdAt:room.createdAt,
      capacity:room.capacity,discount:room.discount,price:room.price,
      // hidden data
      images:room.images , facilities:room.facilities


}
  })
},[roomsList])




 const handleEditRoom = useCallback(function (){
    navigate("/dashboard/room-form",{state:{title:"Update New Room",selectedRoom:selectedRoom}})

},[navigate,selectedRoom])

 const handleShowRoomDetails = useCallback(function (){
  setShowRoomDetails(true)
},[]
 )


const handleNavigateToCreateNewRoom = useCallback(function (){
  navigate("/dashboard/room-form",{state:{title:"Add New Room"}})
},[navigate]
)


const columns :GridColDef[]= useMemo(function(){
  return [
   
  { field: 'roomNumber' , headerName: 'roomNumber' ,headerAlign:"center" ,flex:1,align:"center" ,  renderHeader: () => (
    <Box display="flex" alignItems="center" gap={1}>
      <BedroomParentIcon color="primary" />
      <Typography fontWeight="bold"> Room Number</Typography>
    </Box>
  ),},

  { field: 'price' , headerName: 'Price' ,headerAlign:"center",flex:1,align:"center" ,renderHeader:()=>{
  return <Box display="flex" alignItems="center" gap={1}>
      <MonetizationOnIcon color="primary" />
      <Typography fontWeight="bold">Cost</Typography>
    </Box>
  } , renderCell:(params)=>params.row.price + " $"},



  { field: 'discount', headerName: 'Discount' ,headerAlign:"center",flex:1,align:"center" , renderHeader:()=>{
     return <Box display="flex" alignItems="center" gap={1}>
      <DiscountIcon color="primary" />
      <Typography fontWeight="bold">Discount</Typography>
    </Box>
  } , renderCell:(params)=>params.row.discount + "%" },




  { field: 'capacity' , headerName: 'capacity' ,headerAlign:"center",flex:1,align:"center" ,renderHeader:()=>{
  return <Box display="flex" alignItems="center" gap={1}>
      <AccountCircleIcon color="primary" />
      <Typography fontWeight="bold">Capacity</Typography>
    </Box>
  } },



  { field: 'createdBy' , headerName: 'createdBy' ,headerAlign:"center",flex:1,align:"center" ,renderHeader:()=>{
  return <Box display="flex" alignItems="center" gap={1}>
      <AccountCircleIcon color="primary" />
      <Typography fontWeight="bold">CreatedBy</Typography>
    </Box>
  } },


   {field: 'createdAt',headerName: 'Date',headerAlign:"center", flex:1,align:"center" , renderHeader:()=>{
 return <Box display="flex" alignItems="center" gap={1}>
      <DateRangeIcon color="primary" />
      <Typography fontWeight="bold">Date</Typography>
    </Box>

   } , renderCell:(params)=>new Date(params.row.createdAt).toLocaleDateString()},



  {  field: 'Actions',headerName: 'Actions',headerAlign:"center", flex:1,align:"center" , renderCell:()=> <ActionBtn onView={handleShowRoomDetails} onEdit={handleEditRoom} onDelete={handleClickOpenDeletModal}/>,
 sortable:false,filterable:false,
},


]
} ,[handleEditRoom ,handleShowRoomDetails]);


// fetch Rooms
const fetchRooms = useCallback( async function(){

  try {
    const {data} = await AdmineAxiosInstance.get(ROOMS_URLS.GET_ALL_ROOMS_FILTERED(1,100))
    console.log(data)
if(data.success){
  setRoomsList(data.data.rooms)
  
}

  } catch (error) {
    if(isAxiosError(error))toast.error(error.response?.data.message || "Some Thing Go Wrong")
  }


},[])






// Delete Current Room
const handleDeleteCurrentRoom = useCallback( async function(addId:string){

const toastId = toast.loading("Deleting Room UnderProcessing....")
setIsLoading(true)
try {

const options = {
    method:"DELETE",
    url:ROOMS_URLS.DELETE_ROOMS(addId),
}

    const {data} = await AdmineAxiosInstance.request(options)
    if(data.success){
        toast.success( data.message ||"Room Deleted Successfully !")
        fetchRooms()
        setTimeout(()=>{
          setShowDeletModal(false)
        },1500)
    }
} catch (error) {
    if(isAxiosError(error)){
        toast.error(error.response?.data.message || " Some thing Go Wrong !")
    }
}finally{
    toast.dismiss(toastId)
    setIsLoading(false)
}




},[fetchRooms])









useEffect(()=>{


if( token && !isUser ){
fetchRooms()
}else{
  navigate("/home")
}
},[isUser,navigate,token,fetchRooms])



















  const handleClickOpenDeletModal = () => {
    setShowDeletModal(true);
  };











if(!roomsList) return<Loading/>


  return (
    <Box component={"section"} overflow={"hidden"}>
      {/* header */}
     <Grid container justifyContent={"space-between"} flexWrap={"wrap"} spacing={3}>

<Grid>
 <Box component={"header"}>
        <Typography variant="h4" component={"h2"}> Rooms Table Details</Typography>
        <Typography component={"span"}>You can check all details</Typography>
      </Box>
</Grid>


<Grid>
<Button onClick={handleNavigateToCreateNewRoom} variant="contained"> Add New Room</Button>

</Grid>

     </Grid>
    


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
        onRowClick={(params) => setSelectedRoom(params.row)}
        sx={{ border: 0, textAlign: "center",width:"100%" }}
      />
    </Paper>
  </Grid>
</Grid>


{/* Book Details Pop Up */}

{showRoomDetails &&  selectedRoom && <RoomDetails
  open={!!selectedRoom}
   room={selectedRoom as RoomProps}
  onClose={() =>{
 setShowRoomDetails(false)
    setSelectedRoom(null)
  } 
  }
/>}







{/*  Delet Model */}
{showDeletModal && selectedRoom && <DeleteModal 
message="Are you sure you want to delete this Facilitie?" 
currentData={selectedRoom as RoomProps}
onDelete={handleDeleteCurrentRoom}
loading={isLoading}
 open={showDeletModal}
  onClose={()=>{
  setShowDeletModal(false)
  setSelectedRoom(null)
}}/>
}





    </Box>
  )
}
