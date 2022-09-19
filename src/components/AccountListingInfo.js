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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import redactkit from 'redactkit';
import UpdateListingForm from '../forms/UpdateListingForm';




const AccountListingInfo = ({listing, ...props}) => {
  const [updateListingFormOpen, setUpdateListingFormOpen] = useState(false);
  const [processingListingForm, setProcessingListingForm] = useState(false);

  console.log(listing);
  
  const handleListingFormOpen = () => {
    if (listing) {
      setUpdateListingFormOpen(true);
    }
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: "100%", height: "100%", overflow: 'auto', whiteSpace: 'normal' }}>
      <Grid container>
        <Grid item xs={12} sx={{ mb: 3 }}>
          <Stack direction="row" alignItems="flex-start" justifyContent="flex-end" sx={{ mb: -4.5 }}>
            <Button
              variant="contained"
              size="small"
              onClick={handleListingFormOpen}
              sx={{  
                font: '24px VT323',
                fontWeight: 'bold',
                color: '#FFFFFF',
                textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
                border: '3px solid #CC0000',
                height: '36px',
                background: '#CC0000',
                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
                mr: 2.5, 
                '&:hover': { 
                  color: '#FFFFFF',
                  background: '#CC0000',
                  border: '3px solid #CC0000',
                  transform: 'scale(1.05)',
                  boxShadow: 'rgba(204, 0, 0, 0.19) 0px 10px 20px, rgba(204, 0, 0, 0.23) 0px 6px 6px;',
                }
              }}
            >
              Edit Listing
            </Button>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Stack direction="row" spacing={1} sx={{ pb: 1.5 }}>
              <Typography sx={{ font: '40px VT323', color: '#696969', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                Status: 
              </Typography>
              <Typography sx={{ font: '40px VT323', color: '#CC0000', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                {listing?.active ? "Active" : "Inactive"}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-evenly" spacing={2}>
            <Stack direction="column" alignItems="center" spacing={1}>
              <Stack direction="row" spacing={1} sx={{ pb: 0.25 }}>
                <Typography sx={{ font: '30px VT323', color: '#696969', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Residence: 
                </Typography>
                <Typography sx={{ font: '32px VT323', color: '#CC0000', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  {listing?.residence?.name}
                </Typography>
              </Stack>
              <ListingImages residence={listing?.residence?.id} />
              <Stack direction="row" spacing={1} sx={{ pt: 1, pb: 1 }}>
                <Typography sx={{ font: '28px VT323', color: '#696969', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Address:
                </Typography>
                <Stack direction="column" spacing={0.25}>
                  <Typography sx={{ font: '30px VT323', color: '#CC0000', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                    {listing?.residence?.address} 
                  </Typography>
                  <Typography sx={{ font: '30px VT323', color: '#CC0000', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                    {listing?.residence?.city}, {listing?.residence?.state} {listing?.residence?.zip_code} 
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack direction="column" alignItems="flex-start" justifyContent="flex-start" spacing={1.25} sx={{ pt: 10 }}>
              <Stack direction="row" spacing={1}>
                <Typography sx={{ font: '28px VT323', color: '#696969', fontWeight: 'bold', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Arrival Date:
                </Typography>
                <Typography sx={{ font: '28px VT323', color: '#CC0000', fontWeight: 'bold', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  {listing?.arrival_date} 
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ pb: 1 }}>
                <Typography sx={{ font: '28px VT323', color: '#696969', fontWeight: 'bold', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Departure Date:
                </Typography>
                <Typography sx={{ font: '28px VT323', color: '#CC0000', fontWeight: 'bold', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  {listing?.departure_date} 
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography sx={{ font: '28px VT323', color: '#696969', fontWeight: 'bold', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Arrival Time:
                </Typography>
                <Typography sx={{ font: '28px VT323', color: '#CC0000', fontWeight: 'bold', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  {listing?.arrival_time} 
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ pb: 1 }}>
                <Typography sx={{ font: '28px VT323', color: '#696969', fontWeight: 'bold', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Departure Time:
                </Typography>
                <Typography sx={{ font: '28px VT323', color: '#CC0000', fontWeight: 'bold', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  {listing?.departure_time} 
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ pb: 2 }}>
                <Typography sx={{ font: '28px VT323', color: '#696969', fontWeight: 'bold', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Duration:
                </Typography>
                <Typography sx={{ font: '28px VT323', color: '#CC0000', fontWeight: 'bold', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  {listing?.duration} Days
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="column" alignItems="flex-start" justifyContent="center" spacing={2} sx={{ pt: 10 }}>
              <Stack direction="row" spacing={1}>
                <Typography sx={{ font: '28px VT323', color: '#696969', fontWeight: 'bold', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Pet Policy:
                </Typography>
                <Typography sx={{ font: '28px VT323', color: '#CC0000', fontWeight: 'bold', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  {listing?.residence?.pets} 
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography sx={{ font: '28px VT323', color: '#696969', fontWeight: 'bold', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Smoking Policy:
                </Typography>
                <Typography sx={{ font: '28px VT323', color: '#CC0000', fontWeight: 'bold', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  {listing?.residence?.smoking} 
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography sx={{ font: '28px VT323', color: '#696969', fontWeight: 'bold', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Party Policy:
                </Typography>
                <Typography sx={{ font: '28px VT323', color: '#CC0000', fontWeight: 'bold', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  {listing?.residence?.party} 
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography sx={{ font: '28px VT323', color: '#696969', fontWeight: 'bold', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Cleaning Policy:
                </Typography>
                <Typography sx={{ font: '28px VT323', color: '#CC0000', fontWeight: 'bold', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  {listing?.residence?.cleaning} 
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography sx={{ font: '28px VT323', color: '#696969', fontWeight: 'bold', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Linens & Towels:
                </Typography>
                <Typography sx={{ font: '28px VT323', color: '#CC0000', fontWeight: 'bold', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  {listing?.residence?.linens} 
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <UpdateListingForm
        listing={listing}
        updateListingFormOpen={updateListingFormOpen} 
        setUpdateListingFormOpen={setUpdateListingFormOpen}
        processingListingForm={processingListingForm}
        setProcessingListingForm={setProcessingListingForm}
      />
    </Box>
  );
};

export default AccountListingInfo;
