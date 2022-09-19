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




const SwapBidsInfo = ({swap, index, ...props}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  

  const handleCancleBid = () => {
    if (swap) {
      api.get(`api/swaps/cancel_bid/${swap?.id}`)
      .then((response) => {
        console.log(response.data);
        let successMsg = "Your swap bid has successfully been retracted.";
        enqueueSnackbar(successMsg, {
          variant: 'success',
          preventDuplicate: true,
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
        }); 
      })
      .catch((error) => {
        console.log(error.response);
        let errMsg = error.response?.data?.detail;
        enqueueSnackbar(errMsg, {
          variant: 'error',
          preventDuplicate: true,
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
        }); 
      });
    }
  };

  const handleViewContract = () => {
    props.setExpanded("contracts");
  };

  
  return (
    <React.Fragment>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: -1 , mb: 1 }}>
        <Typography sx={{ font: '30px VT323', color: '#CC0000', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
          Swap Bid #{index}
        </Typography>
        <Stack direction="row" alignItems="baseline" spacing={1}>
          {swap?.status === "Pending" ?
            <Button
              id="void"
              name="void"
              variant="contained"
              size="small"
              onClick={handleCancleBid} 
              sx={{  
                font: '30px VT323',
                fontWeight: 'bold',
                color: '#FFFFFF',
                textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
                height: '36px',
                border: '3px solid #CC0000',
                background: '#CC0000',
                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;', 
                mr: 1,
                my: 1,
                pb: 1,
                '&:hover': { 
                  color: '#FFFFFF',
                  background: '#CC0000',
                  border: '3px solid #CC0000',
                  transform: 'scale(1.05)',
                  boxShadow: 'rgba(204, 0, 0, 0.19) 0px 10px 20px, rgba(204, 0, 0, 0.23) 0px 6px 6px;',
                }
              }}
            >
              Retract Bid
            </Button>
          :
            null
          }
          {swap?.status === "Accepted" ?
            <Button
              id="void"
              name="void"
              variant="contained"
              size="small"
              onClick={handleViewContract} 
              sx={{  
                font: '30px VT323',
                fontWeight: 'bold',
                color: '#FFFFFF',
                textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
                height: '36px',
                border: '3px solid #CC0000',
                background: '#CC0000',
                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;', 
                mr: 1,
                my: 1,
                pb: 1,
                '&:hover': { 
                  color: '#FFFFFF',
                  background: '#CC0000',
                  border: '3px solid #CC0000',
                  transform: 'scale(1.05)',
                  boxShadow: 'rgba(204, 0, 0, 0.19) 0px 10px 20px, rgba(204, 0, 0, 0.23) 0px 6px 6px;',
                }
              }}
            >
              View Contract
            </Button>
          :
            null
          }
        </Stack>
      </Stack>
      <Divider />
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mt: 2 }}>
        <Typography sx={{ font: '26px VT323', fontWeight: 'bold', color: '#696969', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
          Status:
        </Typography>
        <Typography sx={{ font: '26px VT323', fontWeight: 'bold', color: '#CC0000', fontStyle: 'oblique', textShadow: '2px 3px 3px rgba(0,0,0,0.3)' }}>
          {swap?.status}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="flex-start" justifyContent="space-around" sx={{ mt: 2, mb: 2 }}>
        <Stack direction="column" alignItems="baseline" justifyContent="flex-start" spacing={1}>
          <Stack direction='row' alignItems="baseline" spacing={1}>
            <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
              Bidder:
            </Typography>
            <Typography sx={{ font: '24px VT323', color: '#CC0000', textShadow: '2px 3px 3px rgba(0,0,0,0.3)' }}>
              {swap?.bidder?.first_name} {swap?.bidder?.last_name} 
            </Typography>
          </Stack>
          <Stack direction='row' alignItems="baseline" spacing={1}>
            <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
              Asker:
            </Typography>
            <Typography sx={{ font: '24px VT323', color: '#CC0000', textShadow: '2px 3px 3px rgba(0,0,0,0.3)' }}>
              {swap?.asker?.first_name} {swap?.asker?.last_name}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="column" alignItems="baseline" justifyContent="flex-start" spacing={1}>
          <Stack direction='row' alignItems="baseline" spacing={1}>
            <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
              Residence Bid:  
            </Typography>
            <Typography sx={{ font: '24px VT323', color: '#CC0000', textShadow: '2px 3px 3px rgba(0,0,0,0.3)' }}>
              {swap?.residence_bid?.name}  
            </Typography>
          </Stack>
          <Stack direction='row' alignItems="baseline" spacing={1}>
            <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
              Residence Ask:  
            </Typography>
            <Typography sx={{ font: '24px VT323', color: '#CC0000', textShadow: '2px 3px 3px rgba(0,0,0,0.3)' }}>
              {swap?.residence_ask?.name}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="column" alignItems="baseline" justifyContent="flex-start" spacing={1}>
          <Stack direction='row' alignItems="baseline" spacing={1}>
            <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
              Arrival Date: 
            </Typography>
            <Typography sx={{ font: '24px VT323', color: '#CC0000', textShadow: '2px 3px 3px rgba(0,0,0,0.3)' }}>
              {swap?.listing?.arrival_date} 
            </Typography>
          </Stack>
          <Stack direction='row' alignItems="baseline" spacing={1}>
            <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
              Departure Date: 
            </Typography>
            <Typography sx={{ font: '24px VT323', color: '#CC0000', textShadow: '2px 3px 3px rgba(0,0,0,0.3)' }}>
              {swap?.listing?.arrival_date} 
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </React.Fragment>
  );
};

export default SwapBidsInfo;
