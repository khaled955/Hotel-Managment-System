import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Divider, Typography } from '@mui/material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import BuildIcon from '@mui/icons-material/Build';
import CampaignIcon from '@mui/icons-material/Campaign';
import Charts from '../../Components/Charts/Charts';
import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import useAuth from '../../../../Hooks/useAuth.hook';
import { AdmineAxiosInstance } from '../../../../Services/AxiosInstance';
import { DASHBOARD_URLS } from '../../../../Services/URLS';
import Loading from '../../../Shared/Pages/Loading/Loading';
import { DashboardStats } from '../../../../Interfaces/Dashboard.interfaces';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));



export default function Dashboard() {
const {token , isUser} = useAuth()
const [dashboardData , setDashboardData] = useState<DashboardStats | null>(null)

useEffect(()=>{
  async function fetchData(){

try {
  const {data} = await AdmineAxiosInstance.get(DASHBOARD_URLS.CHART)
  setDashboardData(data.data)
} catch (error) {
  if(isAxiosError(error))toast.error(error.response?.data.message || "Some thing Go Wrong!")
}


  }

if(token && !isUser)  fetchData()

},[isUser , token])


if(!dashboardData) return <Loading/>
  return (
   <Box>
     <Box sx={{ flexGrow: 1 }}>
      {/*  Card Box */}
      <Grid container justifyContent={"center"} spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Item >
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={1}>
                <Box>
                  <Typography variant='h3' component={"p"}> {dashboardData.rooms}</Typography>
                  <Typography variant='h4' component={"span"}> Rooms</Typography>
                </Box>
                <Box>
                <MeetingRoomIcon color='info' fontSize='large' />
                </Box>
          </Box>
          </Item>
        </Grid>

        
        <Grid size={{ xs: 12, md: 3 }}>
            <Item >
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={1}>
                <Box>
                  <Typography variant='h3' component={"p"}> {dashboardData.facilities}</Typography>
                  <Typography variant='h4' component={"span"}> Facilities</Typography>
                </Box>
                <Box>
                <BuildIcon color='info' fontSize='large' />
                </Box>
          </Box>
          </Item>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
           <Item >
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={1}>
                <Box>
                  <Typography variant='h3' component={"p"}> {dashboardData.ads}</Typography>
                  <Typography variant='h4' component={"span"}> Ads</Typography>
                </Box>
                <Box>
                <CampaignIcon color='info' fontSize='large' />
                </Box>
          </Box>
          </Item>
        </Grid>
      
      </Grid>

      <Divider sx={{mt:10}}/>

      {/*  Charts */}
      <Charts dashboard={dashboardData}/>
    </Box>
   </Box>
  )
}


<CampaignIcon />
