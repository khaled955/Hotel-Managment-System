import { Box, Button, Dialog, FormHelperText, Grid, IconButton, TextField, Typography } from "@mui/material";
import { AddsRoom, CreateAddProps, CreateNewAddProps } from "../../../../Interfaces/Adds.interface";
import CloseIcon from "@mui/icons-material/Close";
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { AdmineAxiosInstance } from "../../../../Services/AxiosInstance";
import { ROOMS_URLS } from "../../../../Services/URLS";
import { useForm } from "react-hook-form";
import SaveIcon from '@mui/icons-material/Save';
import { Controller } from "react-hook-form";







export default function AddsFormCard({ open, onClose ,title ,handleCreateNewAdd,error , selectedAdd ,handleUpdateCurrentAdd}: CreateNewAddProps) {
const [rooms , setRooms] = useState<AddsRoom[] | []>([])
const {register , handleSubmit , formState:{errors , isSubmitting}, control , reset} = useForm<CreateAddProps>({mode:"onChange"})



useEffect(()=>{

async function fetchRooms(){
    try {
        const {data} =  await AdmineAxiosInstance.get(ROOMS_URLS.GET_ALL_ROOMS_FILTERED(1,50))
        setRooms(data.data.rooms)
    } catch (error) {
        if(isAxiosError(error))
            toast.error(error.response?.data.message || " Some thing Go Wrong !")
    }
}

fetchRooms()

},[])


// reset default values when Edit

useEffect(()=>{
  if (selectedAdd) {
    reset({
      discount: selectedAdd.discount,
      isActive: selectedAdd.isActive?"true" :"false",
      room: selectedAdd.roomId,
    });
  }




},[reset,selectedAdd])








  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    
    >
      <Grid container>
        <Grid size={{ xs:12}}>

<Box sx={{ position: "relative" , width:"100%"}}>

        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "background.paper",
            boxShadow: 1,
            "&:hover": { bgcolor: "error.main", color: "#fff" }
          }}
        >
          <CloseIcon />
        </IconButton>
<Typography p={3} component={"h3"} variant="h4"> {title}</Typography>
{/*  Form Start */}
<Box component={"form"} p={3} noValidate  autoComplete="off" onSubmit={handleSubmit((data)=>{
  if(!selectedAdd) handleCreateNewAdd(data)
    if(selectedAdd) handleUpdateCurrentAdd(data , selectedAdd._id)
})}>

{/* Room Select */}
{title === "Add New Add" && <Box mb={2}>

<Controller
  name="room"
  control={control}
  rules={{ required: "Room Number is required" }}
  render={({ field }) => (
    <Select
      {...field}
      placeholder="Select Room Number"
      value={field.value || ""}
      onChange={(_, value) => field.onChange(value)}
      indicator={<KeyboardArrowDown />}
      slotProps={{
        listbox: {
          sx: {
            zIndex: 1500,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 3,
            mt: 0.5,
            maxHeight: 300,
            overflowY: 'auto',
          },
        },
      }}
      sx={{
        width: "100%",
        [`& .${selectClasses.indicator}`]: {
          transition: '0.2s',
          [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
          },
        },
      }}
    >
      {rooms.map((room) => (
        <Option key={room._id} value={room._id}>
          {room.roomNumber}
        </Option>
      ))}
    </Select>
  )}
/>
{errors.room && <FormHelperText >{errors.room?.message}</FormHelperText>
}



</Box>}

{/*  Discount */}
<Box mb={2}>
<TextField
  sx={{
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#f0f4f8',
      },
    },
  }}

variant="outlined" placeholder="Discound" fullWidth type="number"
{...register("discount" ,{ required:"Discount Is Required",pattern:{
    value:/^[1-9][0-9]?$/,
    message:"Discount Must Be More Than 0 and 1 or 2 Character"

}})}
/>
{errors.discount && <FormHelperText>{errors.discount.message}</FormHelperText>}
</Box>

{/*  Status */}

<Box mb={2}>
<Controller
  name="isActive"
  control={control}
  rules={{ required: "Status is required" }}
  render={({ field }) => (
    <Select
      {...field}
      placeholder="Select Status"
      value={field.value ?? ""}
      onChange={(_, value) => field.onChange(value)}
      indicator={<KeyboardArrowDown />}
      slotProps={{
        listbox: {
          sx: {
            zIndex: 1500,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 3,
            mt: 0.5,
            maxHeight: 300,
            overflowY: 'auto',
          },
        },
      }}
      sx={{
        width: "100%",
        [`& .${selectClasses.indicator}`]: {
          transition: '0.2s',
          [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
          },
        },
      }}
    >
      <Option value={"true"}>Active</Option>
      <Option value={"false"}>In Active</Option>
    </Select>
  )}
/>
{errors.isActive &&<FormHelperText>{errors.isActive?.message}</FormHelperText>
}
</Box>


{/* Error Message */}
<Box>
    {error && <FormHelperText>{error}</FormHelperText>}
</Box>


<Box component={"footer"} display={"flex"} justifyContent={"end"} alignItems={"center"}>
    


  <Button
  type="submit"
          loading ={isSubmitting}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          {title === "Update Add" ? "Update" : "Save"}
        </Button>

</Box>

</Box>
 </Box>
 </Grid>
      </Grid>
    </Dialog>
  )
}
