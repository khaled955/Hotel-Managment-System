import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FACILITES_URLS, ROOMS_URLS } from "../../../../Services/URLS"
import { AdmineAxiosInstance } from "../../../../Services/AxiosInstance"
import { useLocation, useNavigate } from "react-router-dom"
import { isAxiosError } from "axios"
import { Controller, useForm } from "react-hook-form"
import { Box, Button, FilledInput, FormHelperText, Grid, TextField, Typography } from "@mui/material"
import { RoomFacilities, RoomFormData } from "../../../../Interfaces/Rooms.interface"
import useAuth from "../../../../Hooks/useAuth.hook"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ImagePreviewGallery from "../ImagePreviewGallery/ImagePreviewGallery"








const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};




export default function RoomFormCard() {
  const[facilitiesList , setFacilitiesList]= useState<RoomFacilities[]| []>([])
const [errorMessage , setErrorMessage] = useState(null)
const {state:{title,selectedRoom}} = useLocation()
const [selectedFacilityIds, setSelectedFacilityIds] = useState<string[]>([]);
const [imges, setImges] = useState<(File | string)[]>([]);
const [defaultImages, setDefaultImages] = useState<string[]>([]);

const navigate = useNavigate()
const {register , handleSubmit , formState:{errors,isSubmitting},control , setValue , trigger} = useForm<RoomFormData>({"mode":"onChange" , defaultValues:{
  capacity:selectedRoom?.capacity , price:selectedRoom?.price,roomNumber:selectedRoom?.roomNumber,discount:selectedRoom?.discount,

}})
const{isUser ,token} = useAuth()




const handleDataBeforeSent = useCallback(function(data:RoomFormData){

const finalData = new FormData()
finalData.append("roomNumber" , data.roomNumber)
finalData.append("price", data.price)
finalData.append("capacity" , data.capacity)
finalData.append("discount" , data.discount)

  selectedFacilityIds.forEach((id) => {
    finalData.append("facilities", id);
  });

 imges.forEach((img) => {
  if (img instanceof File) finalData.append("imgs", img);
});




return finalData
},[imges ,selectedFacilityIds])




const handleCreateNewRoom = useCallback( async function(dataInfo:RoomFormData){
const toastId = toast.loading("Waiting....")

const finalForm = handleDataBeforeSent(dataInfo)

try {

const options = {
    method:"POST",
    url:ROOMS_URLS.CREATE_ROOM,
    data:finalForm
}

    const {data} = await AdmineAxiosInstance.request(options)
    if(data.success){
        toast.success( data.message ||"Room Created Successfully !")
        setErrorMessage(null)
        setTimeout(()=>{
          navigate(-1)
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




},[navigate , handleDataBeforeSent])




const handleUpdateRoom = useCallback( async function(dataInfo:RoomFormData,addId:string){

  const finalForm = handleDataBeforeSent(dataInfo)


const toastId = toast.loading("Updating UnderProcessing....")
try {

const options = {
    method:"PUT",
    url:ROOMS_URLS.UPDATE_ROOM(addId),
    data:finalForm
}

    const {data} = await AdmineAxiosInstance.request(options)
    if(data.success){
        toast.success( data.message ||"Room Updated Successfully !")
        setErrorMessage(null)
        setTimeout(()=>{
          navigate(-1)
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




},[navigate , handleDataBeforeSent])





// fetch facilities
const fetchFacilities = useCallback( async function fetchFacilities(){


    try {
 const {data} = await AdmineAxiosInstance.get(FACILITES_URLS.GET_FACILITES)
 setFacilitiesList(data.data.facilities)
      
    } catch (error) {
       if(isAxiosError(error))toast.error(error.response?.data.message || "some thing go wrong !")
    }
  }
,[])








useEffect(()=>{

if( token && !isUser ){
fetchFacilities()
}else{
  navigate("/home")
}
},[isUser,navigate,token,fetchFacilities])












// setting default values for imges
useEffect(() => {
  if (selectedRoom?.images && selectedRoom.images.length > 0) {
    setDefaultImages(selectedRoom.images); // these are strings (URLs)
    setImges(selectedRoom.images);
    setValue("imgs", selectedRoom.images , { shouldValidate: true }); // ✅ this fixes the validation issue
    trigger("imgs"); // ✅ Trigger validation after setting default values

  }
}, [selectedRoom,setValue , trigger]);









// set default values for facilities in update
useEffect(() => {
  if (selectedRoom && selectedRoom.facilities) {
    const defaultFacilityIds = selectedRoom.facilities.map((f: RoomFacilities | string) =>
      typeof f === "string" ? f : f._id
    );
    setSelectedFacilityIds(defaultFacilityIds);
setValue("facilities", defaultFacilityIds, { shouldValidate: true });
trigger("facilities");




  }
}, [selectedRoom , setValue , trigger]);














  return (
   <Box component={"section"}>
    <Box component={"header"} p={3}>
      <Typography component={"h3"} variant="h4">{title}</Typography>
      <Typography>You can check all details</Typography>
    </Box>

    {/* form */}
    <Box component={"form"} onSubmit={handleSubmit((data)=>{
      if(!selectedRoom) handleCreateNewRoom(data)
        if(selectedRoom)handleUpdateRoom(data , selectedRoom._id)
    })}>

     <Grid container justifyContent={"center"} spacing={3}>
   {/* Room Number first row */}
      <Grid size={{xs:12,md:9}}>
       <Box>
        <TextField
        {...register("roomNumber",{required:"Room Number Is Required",pattern:{
          value:/^[1-9][0-9]{0,3}$/,
          message:"Room Number Must Be Greater Than Zero And max Character Is 4 Digits"
        }})}
        variant="filled"  placeholder="Room Number" type="number" fullWidth helperText={errors.roomNumber?.message}/>
       </Box>
      </Grid>

{/* Second row */}
      <Grid container size={{  xs:12,md:9}} spacing={2} justifyContent={"center"}>
        {/* price */}
      <Grid size={{ xs:12,md:6}}>
   <Box>
        <TextField
        {...register("price" , {required:"Price Is Required",pattern:{
            value:/^[1-9][0-9]{0,}$/,
          message:"Room Number Must Be Greater Than Zero"
        }})}
        variant="filled"  placeholder="Price" type="number" fullWidth helperText={errors.price?.message}/>
       </Box>

      </Grid >

       {/*  Capacity */}
      <Grid size={{ xs:12, md:6}}>
           <Box>
        <TextField
        {...register("capacity" , {required:"Capacity Is Required",pattern:{
            value:/^[1-9][0-9]?$/,
          message:"Capacity Must Be Greater Than Zero And One Or Two Digits "
        }})}
        
        variant="filled"  placeholder="Capacity" type="number" fullWidth helperText={errors.capacity?.message}/>
       </Box>

      </Grid>
      </Grid>


{/* third row */}
<Grid container size={{  xs:12,md:9}} spacing={2} justifyContent={"center"}>
        {/* Discount */}
      <Grid size={{ xs:12,md:6}}>
   <Box>
        <TextField 
        
        {...register("discount",{
          valueAsNumber:true,
          required:"Discount Is Required" , min:{
            value:0,
            message:"Discount Must Be Start From Zero"
          },max:{
            value:100,
            message:"Discount Cant Be Greater Than 100"
          }
        })}
        
        variant="filled"  placeholder="Discount" type="number" fullWidth helperText={errors.discount?.message}/>
       </Box>
      
      </Grid >

       {/*  Facilities */}
      <Grid size={{ xs:12, md:6}}>
          <div>
    

<Controller
  name="facilities"
  control={control}
  defaultValue={selectedFacilityIds}
  rules={{
    required: "Facility is required",
    validate: (value) => value.length >= 2 || "You must choose at least two facility",
  }}
  render={({ field }) => (
    <FormControl sx={{ m: 1, width: "100%" }}>
      <Select
        multiple
        displayEmpty
        value={field.value}
        onChange={(event) => {
          const {
            target: { value },
          } = event;
          field.onChange(typeof value === 'string' ? value.split(',') : value);
          setSelectedFacilityIds(typeof value === 'string' ? value.split(',') : value);
        }}
        input={<FilledInput />}
        renderValue={(selected) => {
          if (selected.length === 0) return <em>Facilities</em>;
          const selectedNames = facilitiesList
            .filter(f => selectedFacilityIds.includes(f._id))
            .map(f => f.name);
          return selectedNames.join(', ');
        }}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem disabled value="">
          <em>Facilities</em>
        </MenuItem>
        {facilitiesList.map((facility: RoomFacilities) => (
          <MenuItem key={facility._id} value={facility._id}>
            <Checkbox checked={selectedFacilityIds.includes(facility._id)} />
            <ListItemText primary={facility.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )}
/>



    </div>
    {errors.facilities && <FormHelperText>{errors.facilities.message}</FormHelperText>}
      </Grid>

      </Grid>

{/*  row of file input */}
<Grid size={{xs:12 , md:9}}>
  <Box>

<Controller
  name="imgs"
  control={control}
  rules={{
    validate: () => {
      // allow either new images or default ones
      if (imges.length === 0) return "You must upload at least one image";
      return true;
    },
  }}
  render={() => (
    <Box>
      <Button
        fullWidth
        component="label"
        variant="outlined"
        startIcon={<CloudUploadIcon />}
      >
        Upload Images
        <VisuallyHiddenInput
          type="file"
          multiple
          onChange={(event) => {
            if (event.target.files?.length) {
              const files = Array.from(event.target.files);
              const newImages = [...imges, ...files];
              setImges(newImages);
              setValue("imgs", newImages, { shouldValidate: true }); // ✅ update form state
            }
          }}
        />
      </Button>
      {errors.imgs &&(
        <FormHelperText>{errors.imgs.message}</FormHelperText>
      )}
    </Box>
  )}
/>




   </Box>
</Grid>
<Grid size={{xs:12 , md:9}} justifyContent={"center"} textAlign={"center"}>
  {errorMessage && <FormHelperText sx={{textAlign:"center" ,fontSize:16}}>{errorMessage}</FormHelperText>}

  <ImagePreviewGallery
  images={imges}
  setImages={setImges}
  defaultImages={defaultImages}
  onRemove={(index) => {
    const updatedImages = imges.filter((_, i) => i !== index);
  setImges(updatedImages);
  setValue("imgs", updatedImages, { shouldValidate: true }); // ✅ this ensures the form revalidates after delete

  
  
  }}
    
/>

</Grid>
<Grid container size={{xs:12 ,md:9}} justifyContent={"space-between"}>
   <Button onClick={()=>{navigate(-1)}} disabled={isSubmitting} variant="outlined" color="error">cancel</Button>
 <Button loading={isSubmitting} type="submit" variant="contained">Submite</Button>
</Grid>
     </Grid>

     

    </Box>
   </Box>
  )
}




