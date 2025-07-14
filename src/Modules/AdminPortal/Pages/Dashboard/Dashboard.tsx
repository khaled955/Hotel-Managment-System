import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Divider, Typography } from '@mui/material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import BuildIcon from '@mui/icons-material/Build';
import CampaignIcon from '@mui/icons-material/Campaign';
import Charts from '../../Components/Charts/Charts';



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
  return (
   <Box>
     <Box sx={{ flexGrow: 1 }}>
      {/*  Card Box */}
      <Grid container justifyContent={"center"} spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Item >
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={1}>
                <Box>
                  <Typography variant='h3' component={"p"}> 100</Typography>
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
                  <Typography variant='h3' component={"p"}> 70</Typography>
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
                  <Typography variant='h3' component={"p"}> 120</Typography>
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
      <Charts/>
    </Box>
   </Box>
  )
}


<CampaignIcon />
