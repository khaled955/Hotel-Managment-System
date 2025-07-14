import { Avatar, Box, Grid, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { AdmineAxiosInstance } from "../../../../Services/AxiosInstance";
import { GET_ALL_USERS_BY_ADMINE } from "../../../../Services/URLS";
import { User } from "../../../../Interfaces/Users.interface";
import Loading from "../../../Shared/Pages/Loading/Loading";
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import UserDetails from "./UserDetails";
import useAuth from "../../../../Hooks/useAuth.hook";
import { useNavigate } from "react-router-dom";
import ViewActionsBtn from "../../../Shared/Components/ViewActionBtn/ViewActionsBtn";













const paginationModel = { page: 0, pageSize: 5 };








export default function Users() {
const [userList , setUserList] = useState<User[] | null>(null)
const [selectedUser, setSelectedUser] = useState<User | null>(null);
const [showUserDetails , setShowUserDetails] = useState(false)
const navigate = useNavigate()
const {isUser,token} = useAuth()






const rows = useMemo(function(){
  return userList?.map((user:User)=>{
    return {_id:user._id ,userName:user.userName ,email:user.email ,phoneNumber:user.phoneNumber ,country:user.country ,role:user.role,profileImage:user.profileImage}
  })
},[userList])



const columns :GridColDef[]= useMemo(function(){
  return [
    { field: 'profileImage', headerName: 'Avatar',description: 'This column has a imge and is not sortable.',
    sortable: false,headerAlign:"center",flex:1,align:"center",
      renderCell: (params:GridRenderCellParams) => (
         <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Avatar
        alt={params.row.userName}
        src={params.row.profileImage || undefined}
        sx={{ width: 40, height: 40 }}
      />
    </Box>
    ), filterable:false},
  { field: 'userName' , headerName: 'UserName' ,headerAlign:"center",flex:1,align:"center"},
  { field: 'email', headerName: 'Email' ,headerAlign:"center",flex:1,align:"center"},
  { field: 'phoneNumber', headerName: 'PhoneNumber' ,headerAlign:"center",flex:1,align:"center"},
  {  field: 'country',headerName: 'Country',headerAlign:"center", flex:1,align:"center"},
   {field: 'role',headerName: 'Role',headerAlign:"center", flex:1,align:"center" , type:"singleSelect",valueOptions: ["user","admin"]},
  {  field: 'Actions',headerName: 'Actions',headerAlign:"center", flex:1,align:"center" , renderCell:()=> <ViewActionsBtn onShow={handleShowUserDetails}/>,
   sortable:false,filterable:false,
},



]
} ,[]);




useEffect(()=>{
async function fetchUsers(){

  try {
    const {data} = await AdmineAxiosInstance.get(GET_ALL_USERS_BY_ADMINE(50,1))
if(data.success){
  setUserList(data.data.users)
}

  } catch (error) {
    if(isAxiosError(error))toast.error(error.response?.data.message || "Some Thing Go Wrong")
  }


}

if( token && !isUser ){
fetchUsers()
}else{
  navigate("/home")
}
},[isUser,navigate,token])















if(!userList) return<Loading/>



function handleShowUserDetails(){
  setShowUserDetails(true)
}









  return (
    <Box component={"section"} overflow={"hidden"}>
      {/* header */}
      <Box component={"header"}>
        <Typography variant="h4" component={"h2"}> User Table Details</Typography>
        <Typography component={"span"}>You can check all details</Typography>
      </Box>
    


{/*  users table */}


<Grid container justifyContent={"center"}>
  <Grid size={{sm:12 , md:10}}>
    <Paper sx={{ width: '100%', mt: 8, textAlign: "center" }}>
      <DataGrid
      
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        getRowId={rows=>rows._id}
        onRowClick={(params) => setSelectedUser(params.row)}
        sx={{ border: 0, textAlign: "center",width:"100%" }}
      />
    </Paper>
  </Grid>
</Grid>


{/*  user Card Details Pop Up */}

{showUserDetails && <UserDetails
  open={!!selectedUser}
  user={selectedUser as User}
  onClose={() =>{
 setShowUserDetails(false)
    setSelectedUser(null)
  } 
  }
/>}

    </Box>
  )
}
