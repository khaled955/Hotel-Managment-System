import { Button } from "@mui/material";
import { Box } from "@mui/system";
import VisibilityIcon from '@mui/icons-material/Visibility';
export default function ViewActionsBtn({onShow}:{onShow:()=>void}) {
  return (
   <Box sx={{width:"100%",display:"flex" , justifyContent:"center",alignItems:"center"}}>
<Button onClick={onShow}>
    <VisibilityIcon/>
</Button>
   </Box>
  )
}
