import React, { Fragment, useEffect, useState, useContext, useMemo, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import redactkit from 'redactkit';
import ListingImages from '../components/ListingImages';
import ResidenceSwapImages from '../../components/swaps/ResidenceSwapImages';
import ResidenceDisplay from '../../components/swaps/ResidenceDisplay';
import SwapContractResidenceDisplay from '../users/SwapContractResidenceDisplay';
import SwapContractResidenceImages from '../users/SwapContractResidenceImages';




const SwapContractResidenceInfo = ({swap, ...props}) => {
  const [residenceOpen, setResidenceOpen] = useState(false);

  const handleResidenceOpen = (event, residence) => {
    if (residence?.id) {
      setResidenceOpen(residence);
    }
  };

  const handleResidenceClose = () => {
    setResidenceOpen(false);
  };



  return (
    <React.Fragment>
      <Divider />
      <Grid container>
        <Grid item xs={12}>
          <Typography align="center" sx={{ font: '30px VT323', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', mt: 1 }}>
            Contract Residences Information
          </Typography>
        </Grid>
        <Grid item xs={5} sx={{ mt: 2, ml: 4 }}>
          <Typography align="center" sx={{ font: '28px VT323', color: '#CC0000', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)', mb: 1 }}>
            Residence Bid 
          </Typography>
          <Stack direction="column" alignItems="center" spacing={1} sx={{ mb: 3 }}>
            <SwapContractResidenceImages residence_id={swap?.residence_bid?.id} />
            <Stack direction="row" justifyContent="center" sx={{ pt: 0.5, pb: 1 }}>
              <Button
                variant="contained"
                size="small"
                onClick={(event) => handleResidenceOpen(event, swap?.residence_bid)}
                sx={{  
                  font: '24px VT323',
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
                  height: '36px',
                  border: '3px solid #CC0000',
                  background: '#CC0000',
                  boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
                  m: "auto",
                  '&:hover': { 
                    color: '#FFFFFF',
                    background: '#CC0000',
                    border: '3px solid #CC0000',
                    transform: 'scale(1.05)',
                    boxShadow: 'rgba(204, 0, 0, 0.19) 0px 10px 20px, rgba(204, 0, 0, 0.23) 0px 6px 6px;',
                  }
                }}
              >
                View Residence
              </Button>
            </Stack>
            <Stack direction="column" alignItems="flex-start" spacing={1} sx={{ m: 3 }}>
              <Stack direction="row" spacing={1}>
                <Typography sx={{ font: '24px VT323', color: '#696969', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Address: 
                </Typography>
                <Stack direction="column" spacing={0.25}>
                  <Typography sx={{ font: '24px VT323', color: '#CC0000', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                    {swap?.residence_bid?.address}
                  </Typography>
                  <Typography sx={{ font: '24px VT323', color: '#CC0000', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                    {swap?.residence_bid?.city}, {swap?.residence_bid?.state} {swap?.residence_bid?.zip_code}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs>
          <Stack direction="column" alignItems="center" sx={{ mt: 12 }}>
            <SwapHorizIcon sx={{ color: '#696969', height: 125, width: 125, opacity: '0.5' }} />
          </Stack>
        </Grid>
        <Grid item xs={5} sx={{ mt: 2, mr: 4 }}>
          <Typography align="center" sx={{ font: '28px VT323', color: '#CC0000', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)', mb: 1 }}>
            Residence Ask 
          </Typography>
          <Stack direction="column" alignItems="center" spacing={1} sx={{ mb: 3 }}>
            <SwapContractResidenceImages residence_id={swap?.residence_ask?.id} />
            <Stack direction="row" justifyContent="center" sx={{ pt: 0.5, pb: 1 }}>
              <Button
                variant="contained"
                size="small"
                onClick={(event) => handleResidenceOpen(event, swap?.residence_ask)}
                sx={{  
                  font: '24px VT323',
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
                  height: '36px',
                  border: '3px solid #CC0000',
                  background: '#CC0000',
                  boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
                  m: "auto",
                  '&:hover': { 
                    color: '#FFFFFF',
                    background: '#CC0000',
                    border: '3px solid #CC0000',
                    transform: 'scale(1.05)',
                    boxShadow: 'rgba(204, 0, 0, 0.19) 0px 10px 20px, rgba(204, 0, 0, 0.23) 0px 6px 6px;',
                  }
                }}
              >
                View Residence
              </Button>
            </Stack>
            <Stack direction="column" alignItems="flex-start" spacing={1} sx={{ m: 3 }}>
              <Stack direction="row" spacing={1}>
                <Typography sx={{ font: '24px VT323', color: '#696969', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Address: 
                </Typography>
                <Stack direction="column" spacing={0.25}>
                  <Typography sx={{ font: '24px VT323', color: '#CC0000', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                    {swap?.residence_ask?.address}
                  </Typography>
                  <Typography sx={{ font: '24px VT323', color: '#CC0000', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                    {swap?.residence_ask?.city}, {swap?.residence_ask?.state} {swap?.residence_ask?.zip_code}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <Dialog open={residenceOpen} onClose={handleResidenceClose} fullWidth maxWidth='xl'>
        <DialogTitle>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography sx={{ font: '34px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)' }}>
              Residence Profile
            </Typography>
            <IconButton onClick={handleResidenceClose}>
              <CloseIcon sx={{ height: 30, width: 30, color: "#CC0000", m: -1, '&:hover': { transform: 'scale(1.1)' } }} />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', m: 1 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <SwapContractResidenceDisplay residence={residenceOpen} />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
                <ResidenceSwapImages residence_pk={residenceOpen?.id} />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default SwapContractResidenceInfo;
