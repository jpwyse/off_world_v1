import React, { Fragment, useEffect, useState, useContext, useMemo, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
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
import redactkit from 'redactkit';



const SwapContractMemberInfo = ({bidder, asker, ...props}) => {
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: "100%"}}>
        <Grid container>
          <Grid item xs={12}>
            <Typography align="center" sx={{ font: '30px VT323', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', m: 1 }}>
              Contract Members Information
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ mt: 2 }}>
            <Typography align="center" sx={{ font: '28px VT323', color: '#696969', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)', mb: 1.5 }}>
              Bidder Info 
            </Typography>
            <Stack direction="column" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Avatar sx={{ bgcolor: '#696969', height: 100, width: 100, mb: 0.5, opacity: '0.8' }} />
              <Stack direction="row" spacing={1}>
                <Typography sx={{ font: '24px VT323', color: '#696969', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Full Name: 
                </Typography>
                <Typography sx={{ font: '24px VT323', color: '#CC0000', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  {bidder?.first_name} {bidder?.last_name}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography sx={{ font: '24px VT323', color: '#696969', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Username: 
                </Typography>
                <Typography sx={{ font: '24px VT323', color: '#CC0000', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  @{bidder?.username}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography sx={{ font: '24px VT323', color: '#696969', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Email: 
                </Typography>
                <Typography sx={{ font: '24px VT323', color: '#CC0000', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  {bidder?.email}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography sx={{ font: '24px VT323', color: '#696969', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Phone: 
                </Typography>
                <Typography sx={{ font: '24px VT323', color: '#CC0000', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  {bidder?.phone}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={6} sx={{ mt: 2 }}>
            <Typography align="center" sx={{ font: '28px VT323', color: '#696969', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)', mb: 1.5 }}>
              Asker Info 
            </Typography>
            <Stack direction="column" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Avatar sx={{ bgcolor: '#696969', height: 100, width: 100, mb: 0.5, opacity: '0.8' }} />
              <Stack direction="row" spacing={1}>
                <Typography sx={{ font: '24px VT323', color: '#696969', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Full Name: 
                </Typography>
                <Typography sx={{ font: '24px VT323', color: '#CC0000', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  {asker?.first_name} {asker?.last_name}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography sx={{ font: '24px VT323', color: '#696969', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Username: 
                </Typography>
                <Typography sx={{ font: '24px VT323', color: '#CC0000', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  @{asker?.username}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography sx={{ font: '24px VT323', color: '#696969', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Email: 
                </Typography>
                <Typography sx={{ font: '24px VT323', color: '#CC0000', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  {asker?.email}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography sx={{ font: '24px VT323', color: '#696969', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Phone: 
                </Typography>
                <Typography sx={{ font: '24px VT323', color: '#CC0000', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  {asker?.phone}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default SwapContractMemberInfo;
