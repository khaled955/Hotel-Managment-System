import { Box, Grid } from "@mui/material";
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useMemo, useState } from "react";
import { mobileAndDesktopOS, valueFormatter } from './WebUsageStats';
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart';






export default function Charts() {
  const [isHidden, setIsHidden] =useState(false);
  const [skipAnimation] =useState(false);
  const [itemNb] =useState(2);
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
      { id: 0, value: 10, label: 'Complete' },
      { id: 1, value: 15, label: 'Pending' },
    ],
  },
];
},[])








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
            data: mobileAndDesktopOS.slice(0, itemNb),
            innerRadius: radius,
            arcLabel: (params) => params.label ?? '',
            arcLabelMinAngle: 20,
            valueFormatter,
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




