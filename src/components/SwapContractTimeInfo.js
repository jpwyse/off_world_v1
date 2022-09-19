import React, { Fragment, useEffect, useState, useContext, useMemo, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import api from '../utils/axios/api';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import redactkit from 'redactkit';


const SwapContractTimeInfo = ({contract, ...props}) => {
  

  return (
    <React.Fragment>
      <Divider />
      <Typography align="center" sx={{ font: '30px VT323', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', m: 1 }}>
        Contract Schedule Information
      </Typography>
      <Stack direction="row" alignItems="flex-start" justifyContent="space-around" sx={{ mt: 3, mb: 2.5 }}>
        <Stack direction="column" alignItems="baseline" justifyContent="flex-start" spacing={1}>
          <Stack direction='row' alignItems="baseline" spacing={1}>
            <Typography sx={{ font: '24px VT323', fontWeight: 'bold', color: '#696969', textShadow: '4px 3px 4px rgba(0,0,0,0.3)' }}>
              Arrival Date: 
            </Typography>
            <Typography sx={{ font: '24px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '4px 3px 3px rgba(0,0,0,0.3)' }}>
              {contract?.swap?.listing?.arrival_date} 
            </Typography>
          </Stack>
          <Stack direction='row' alignItems="baseline" spacing={1}>
            <Typography sx={{ font: '24px VT323', fontWeight: 'bold', color: '#696969', textShadow: '4px 3px 4px rgba(0,0,0,0.3)' }}>
              Departure Date: 
            </Typography>
            <Typography sx={{ font: '24px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '4px 3px 3px rgba(0,0,0,0.3)' }}>
              {contract?.swap?.listing?.departure_date} 
            </Typography>
          </Stack>
        </Stack>        
        <Stack direction="column" alignItems="baseline" justifyContent="flex-start" spacing={1}>
          <Stack direction='row' alignItems="baseline" spacing={1}>
            <Typography sx={{ font: '24px VT323', fontWeight: 'bold', color: '#696969', textShadow: '4px 3px 4px rgba(0,0,0,0.3)' }}>
              Arrival Time: 
            </Typography>
            <Typography sx={{ font: '24px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '4px 3px 3px rgba(0,0,0,0.3)' }}>
              {contract?.swap?.listing?.arrival_time} 
            </Typography>
          </Stack>
          <Stack direction='row' alignItems="baseline" spacing={1}>
            <Typography sx={{ font: '24px VT323', fontWeight: 'bold', color: '#696969', textShadow: '4px 3px 4px rgba(0,0,0,0.3)' }}>
              Departure Time: 
            </Typography>
            <Typography sx={{ font: '24px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '4px 3px 3px rgba(0,0,0,0.3)' }}>
              {contract?.swap?.listing?.departure_time} 
            </Typography>
          </Stack>
        </Stack>        
       <Stack direction="column" alignItems="baseline" justifyContent="flex-start" spacing={1}>
          <Stack direction='row' alignItems="baseline" spacing={1}>
            <Typography sx={{ font: '24px VT323', fontWeight: 'bold', color: '#696969', textShadow: '4px 3px 4px rgba(0,0,0,0.3)' }}>
              Duration:  
            </Typography>
            <Typography sx={{ font: '24px VT323', fontWeight: 'bold', color: '#D73B3E', textShadow: '4px 3px 3px rgba(0,0,0,0.3)' }}>
              {contract?.swap?.listing?.duration} Days  
            </Typography>
          </Stack>
          <Stack direction='row' alignItems="baseline" spacing={1}>
            <Typography sx={{ font: '24px VT323', fontWeight: 'bold', color: '#696969', textShadow: '4px 3px 4px rgba(0,0,0,0.3)' }}>
              Days 'till start:  
            </Typography>
            <Typography sx={{ font: '24px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '4px 3px 3px rgba(0,0,0,0.3)' }}>
              {contract?.days_to_start} Days
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Divider />
    </React.Fragment>
  );
};

export default SwapContractTimeInfo;
