
import { Box, Button, Dialog, FormHelperText, Grid, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import SaveIcon from '@mui/icons-material/Save';
import { CreateFacilitieProps, CreateNewFacilitieProps } from "../../../../Interfaces/Facilities.interface";







export default function FacilitiesFormCard({ open, onClose ,title ,handleCreateNewFacilitie,error , selectedFacilitie ,handleUpdateCurrentFacilitie}: CreateNewFacilitieProps) {
const {register , handleSubmit , formState:{errors , isSubmitting} , reset} = useForm<CreateFacilitieProps>({mode:"onChange"})



// reset default values when Edit

useEffect(()=>{
  if (selectedFacilitie) {
    reset({
      name: selectedFacilitie.name,
      
    });
  }




},[reset,selectedFacilitie])








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
  if(!selectedFacilitie) handleCreateNewFacilitie(data)
    if(selectedFacilitie) handleUpdateCurrentFacilitie(data , selectedFacilitie._id)
})}>



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

variant="outlined" placeholder="Facility Name" fullWidth type="text"
{...register("name" ,{ required:"Name Is Required",pattern:{
    value:/^[a-zA-Z]{3,}?$/,
    message:"Name Must Be More Than 2 Character"

}})}
/>
{errors.name && <FormHelperText>{errors.name.message}</FormHelperText>}
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
          {title === "Update Facility" ? "Update" : "Save"}
        </Button>

</Box>

</Box>
 </Box>
 </Grid>
      </Grid>
    </Dialog>
  )
}
