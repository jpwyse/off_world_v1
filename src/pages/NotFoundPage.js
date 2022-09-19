import React from "react";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "@fontsource/vt323";


const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', background: '#FAF0E6', pt: 20, pb: 50 }}>
      <Typography align='center' sx={{ font: '256px VT323', fontWeight: 'bold', textDecoration: 'underline', color: '#D73B3E', textShadow: '5px 5px 0px rgba(0,0,0,0.3)', mb: 5 }}>
        404
      </Typography>
      <Typography align='center' sx={{ font: '52px VT323', fontWeight: 'bold', color: '#D73B3E', textShadow: '4px 4px 0px rgba(0,0,0,0.2)', mb: 4 }}>
        Don't blame me man, I'm just the messenger... 
      </Typography>
      <Button
        variant="contained"
        size="small"
        onClick={() => navigate("../app/exchange", { replace: true })}
        sx={{  
          font: '48px VT323',
          fontWeight: 'bold',
          color: '#FAF0E6',
          textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
          border: '3px solid #D73B3E',
          height: '60px',
          background: '#D73B3E',
          boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
          mt: 4, 
          '&:hover': { 
            color: '#B2BEB5',
            background: '#D73B3E',
            border: '3px solid #D73B3E',
            transform: 'scale(1.05)',
            boxShadow: 'rgba(105, 105, 105, 0.19) 0px 10px 20px, rgba(105, 105, 105, 0.23) 0px 6px 6px;',
          }
        }}
      >
        Salvation
      </Button>
    </Box>
  );
};

export default NotFoundPage;
