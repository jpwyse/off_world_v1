import React from "react";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import "@fontsource/vt323";
import Ellipsis from '../elements/Ellipsis';


const Loading = () => {  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} >
        <Typography sx={{ font: '146px VT323', color: '#000000'}}>
          Loading
        </Typography>
        <div>
          <Ellipsis sx={{ font: '146px VT323', color: '#000000'}} />
        </div>
      </Stack>
    </Box>
  );
};
export default Loading;
