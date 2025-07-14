import { Box, Button, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { AdmineAxiosInstance } from "../../../../Services/AxiosInstance";
import { FACILITES_URLS } from "../../../../Services/URLS";
import Loading from "../../../Shared/Pages/Loading/Loading";
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useAuth from "../../../../Hooks/useAuth.hook";
import { useNavigate } from "react-router-dom";
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ActionBtn from "../../../Shared/Components/ActionBtn/ActionBtn";
import DeleteModal from "../../../Shared/Components/DeleteModal/DeleteModal";
import { CreateFacilitieProps, FacilitieRow, FacilitiesProps } from "../../../../Interfaces/Facilities.interface";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FacilitiesDetails from "../../Components/FacilitiesDetails/FacilitiesDetails";
import FacilitiesFormCard from "../../Components/FacilitiesFormCard/FacilitiesFormCard";





const paginationModel = { page: 0, pageSize: 5 };

export default function Facilities() {
const [facilitiesList , setFacilitiesList] = useState<FacilitiesProps[] | null>(null)
const [selectedFacilitie, setSelectedFacilitie] = useState<FacilitiesProps | null>(null);
const [showFacilitieDetails , setShowFacilitieDetails] = useState(false)
const [facilitieFormTitle , setFacilitieFormTitle] = useState< string | null>(null)
const [showFacilitieCardForm , setShowFacilitieCardForm] = useState(false)
const [errorMessage , setErrorMessage] = useState< string | null>(null)
const[showDeletModal , setShowDeletModal] = useState(false)
const [isLoading , setIsLoading] = useState(false)
const navigate = useNavigate()
const {isUser,token} = useAuth()






const rows = useMemo(function(){
  
  return facilitiesList?.map((facilitie:FacilitiesProps)=>{
    return {_id:facilitie._id ,name:facilitie.name,createdBy:facilitie.createdBy.userName,createdAt:facilitie.createdAt


}
  })
},[facilitiesList])






const columns :GridColDef[]= useMemo(function(){
  return [
   
  { field: 'name' , headerName: 'Name' ,headerAlign:"center" ,flex:1,align:"center" ,  renderHeader: () => (
    <Box display="flex" alignItems="center" gap={1}>
      <BedroomParentIcon color="primary" />
      <Typography fontWeight="bold"> Facility Name</Typography>
    </Box>
  ),},



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



  {  field: 'Actions',headerName: 'Actions',headerAlign:"center", flex:1,align:"center" , renderCell:()=> <ActionBtn onView={handleShowFacilitiesDetails} onEdit={handleEditFacilitie} onDelete={handleClickOpenDeletModal}/>,
 sortable:false,filterable:false,
},


]
} ,[]);


// fetch Facilities
const fetchFacilities = useCallback( async function fetchAdds(){

  try {
    const {data} = await AdmineAxiosInstance.get(FACILITES_URLS.GET_FACILITES)
    console.log(data)
if(data.success){
  setFacilitiesList(data.data.facilities)
  
}

  } catch (error) {
    if(isAxiosError(error))toast.error(error.response?.data.message || "Some Thing Go Wrong")
  }


},[])


// create new facilitie

const handleCreateNewFacilitie = useCallback( async function(dataInfo:CreateFacilitieProps){
const toastId = toast.loading("Waiting....")
try {

const options = {
    method:"POST",
    url:FACILITES_URLS.ADD_FACILITES,
    data:dataInfo
}

    const {data} = await AdmineAxiosInstance.request(options)
    if(data.success){
        toast.success( data.message ||"Facility Created Successfully !")
        setErrorMessage(null)
        fetchFacilities()
        setTimeout(()=>{
          setShowFacilitieCardForm(false)
        },1500)
    }
} catch (error) {
    if(isAxiosError(error)){
        toast.error(error.response?.data.message || " Some thing Go Wrong !")
        setErrorMessage(error.response?.data.message || " Some thing Go Wrong !")
    }
}finally{
    toast.dismiss(toastId)
}




},[fetchFacilities])


// update current Facilitie 

const handleUpdateFacilitie = useCallback( async function(dataInfo:CreateFacilitieProps,addId:string){

if(dataInfo.name === selectedFacilitie?.name){
  toast("No Data Change")
  setTimeout(()=>{
    setShowFacilitieCardForm(false)

  },1000)
  return ;
}

const toastId = toast.loading("Waiting....")
try {

const options = {
    method:"PUT",
    url:FACILITES_URLS.EDIT_FACILITES(addId),
    data:dataInfo
}

    const {data} = await AdmineAxiosInstance.request(options)
    if(data.success){
        toast.success( data.message ||"Facility Updated Successfully !")
        setErrorMessage(null)
        fetchFacilities()
        setTimeout(()=>{
          setShowFacilitieCardForm(false)
        },1500)
    }
} catch (error) {
    if(isAxiosError(error)){
        toast.error(error.response?.data.message || " Some thing Go Wrong !")
        setErrorMessage(error.response?.data.message || " Some thing Go Wrong !")
    }
}finally{
    toast.dismiss(toastId)
}




},[fetchFacilities,selectedFacilitie?.name])



// Delete Current Faciliti
const handleDeleteCurrentFacilitie = useCallback( async function(addId:string){

const toastId = toast.loading("Deleting Add UnderProcessing....")
setIsLoading(true)
try {

const options = {
    method:"DELETE",
    url:FACILITES_URLS.DELETE_FACILITES(addId),
}

    const {data} = await AdmineAxiosInstance.request(options)
    if(data.success){
        toast.success( data.message ||"Facilitie Deleted Successfully !")
        fetchFacilities()
        setTimeout(()=>{
          setShowDeletModal(false)
        },1500)
    }
} catch (error) {
    if(isAxiosError(error)){
        toast.error(error.response?.data.message || " Some thing Go Wrong !")
        setErrorMessage(error.response?.data.message || " Some thing Go Wrong !")
    }
}finally{
    toast.dismiss(toastId)
    setIsLoading(false)
}




},[fetchFacilities])









useEffect(()=>{


if( token && !isUser ){
fetchFacilities()
}else{
  navigate("/home")
}
},[isUser,navigate,token,fetchFacilities])

















function handleShowFacilitiesDetails(){
  setShowFacilitieDetails(true)
}


function handleEditFacilitie(){
  setShowFacilitieCardForm(true)
  setFacilitieFormTitle("Update Facility")
}

function handleShowFacilitieCardForm(){
  setShowFacilitieCardForm(true)
  setFacilitieFormTitle("Add New Facilitie")
}



  const handleClickOpenDeletModal = () => {
    setShowDeletModal(true);
  };











if(!facilitiesList) return<Loading/>


  return (
    <Box component={"section"} overflow={"hidden"}>
      {/* header */}
     <Grid container justifyContent={"space-between"} flexWrap={"wrap"} spacing={3}>

<Grid>
 <Box component={"header"}>
        <Typography variant="h4" component={"h2"}> Facilities Table Details</Typography>
        <Typography component={"span"}>You can check all details</Typography>
      </Box>
</Grid>


<Grid>
<Button onClick={handleShowFacilitieCardForm} variant="contained"> Add New Facility</Button>

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
        onRowClick={(params) => setSelectedFacilitie(params.row)}
        sx={{ border: 0, textAlign: "center",width:"100%" }}
      />
    </Paper>
  </Grid>
</Grid>


{/* Book Details Pop Up */}

{showFacilitieDetails &&  selectedFacilitie && <FacilitiesDetails
  open={!!selectedFacilitie}
   facility={selectedFacilitie as FacilitieRow}
  onClose={() =>{
 setShowFacilitieDetails(false)
    setSelectedFacilitie(null)
  } 
  }
/>}



{/*  Facilitie Form Card for add and update */}

{showFacilitieCardForm && facilitieFormTitle && <FacilitiesFormCard open={showFacilitieCardForm} title={facilitieFormTitle} handleCreateNewFacilitie={handleCreateNewFacilitie} handleUpdateCurrentFacilitie={handleUpdateFacilitie} selectedFacilitie={selectedFacilitie!} error={errorMessage} onClose={()=>{
  setShowFacilitieCardForm(false)
  setFacilitieFormTitle(null)
  setSelectedFacilitie(null)
}}/>}



{/*  Delet Model */}
{showDeletModal && selectedFacilitie && <DeleteModal 
message="Are you sure you want to delete this Facilitie?" 
currentData={selectedFacilitie}
onDelete={handleDeleteCurrentFacilitie}
loading={isLoading}
 open={showDeletModal}
  onClose={()=>{
  setShowDeletModal(false)
  setSelectedFacilitie(null)
}}/>
}





    </Box>
  )
}
