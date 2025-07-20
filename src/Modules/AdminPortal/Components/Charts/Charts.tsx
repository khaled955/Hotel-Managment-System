import { Box, Grid } from "@mui/material";
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useMemo, useState } from "react";
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart';
import { DashboardStats } from "../../../../Interfaces/Dashboard.interfaces";






export default function Charts({dashboard}:{dashboard:DashboardStats}) {
  const [isHidden, setIsHidden] =useState(false);
  const [skipAnimation] =useState(false);
  const [radius] = useState(50);


// function for left side chart
  const Toggle =useMemo(function(){
    return  (
    <FormControlLabel
      checked={isHidden}
      control={<Checkbox onChange={(event) => setIsHidden(event.target.checked)} />}
      label="hide the legend"
      labelPlacement="end"
      sx={{ margin: 'auto' }}
    />
  );
  },[isHidden])



const series =useMemo(function(){
  return  [
  {
    data: [
      { id: 0, value: dashboard.bookings.completed || 0, label: 'Complete' },
      { id: 1, value: dashboard.bookings.pending || 0, label: 'Pending' },
    ],
  },
];
},[dashboard.bookings.completed ,dashboard.bookings.pending])








  return (
    <Box>

<Grid container justifyContent={"center"} spacing={2}>

  {/*  Left chart */}
        <Grid size={{ xs: 12, md: 5 }}>
            <Box  p={1}>
       <Stack>
      {Toggle}
      <PieChart series={series} hideLegend={isHidden}   sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          filter: 'drop-shadow(1px 1px 2px black)',

          animationName: 'animate-pie-arc-label',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDirection: 'alternate',

          '@keyframes animate-pie-arc-label': {
            '0%': { fill: 'red' },
            '33%': { fill: 'orange' },
            '66%': { fill: 'violet' },
            '100%': { fill: 'red' },
          },
        },
        [`& .${pieArcLabelClasses.root}.${pieArcLabelClasses.animate}`]: {
          animationDuration: '50s',
        },
      }} />
    </Stack>
          </Box>
        </Grid>


{/*  Right chart */}
        <Grid size={{ xs: 12, md: 5 }}>
            <Box  p={1}>
                
                




                    <PieChart
        height={300}
        width={300}
        series={[
          {
            data: [
    { id: 0, value: dashboard.users.user || 0, label: 'Users' },
    { id: 1, value: dashboard.users.admin || 0, label: 'Admins' },
  ],
            innerRadius: radius,
            arcLabel: (params) => params.label ?? '',
            arcLabelMinAngle: 20,
          },
        ]}
        skipAnimation={skipAnimation}
      />
          </Box>
        </Grid>
      



      </Grid>
    </Box>
  )
}




