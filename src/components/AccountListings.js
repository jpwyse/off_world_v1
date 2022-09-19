import React, { Fragment, useEffect, useState, useContext, useMemo, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import api from '../utils/axios/api';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import AccountListingInfo from '../users/ListingInfo';




const AccountListings = (props) => {
  const user = useSelector(state => state.auth.user);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [userListings, setUserListings] = useState(null);
  const [listingUpdate, setListingUpdate] = useState(false);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        const response = await api.get(`api/listings/retrieve/${user?.id}`);
        setUserListings(response.data);
      } catch (error) {
        console.log('error', error.response);
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
      }
    };
    if (user?.id) {
      fetchUserListings();
    }
  }, [user]);

  

  const handleListingUpdate = (listing) => {
    setListingUpdate(listing);
    setOpen(true);
  };



  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: "100%", bgcolor: 'background.paper' }}>
      <Stack direction="row" alignItems="flex-end" justifyContent="space-between" sx={{ mt: 0, mb: 0 }}>
        <Typography sx={{ font: '40px VT323', color: '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', m: 1, mb: 1 }}>
          LISTINGS
        </Typography>
      </Stack>
      <Divider />
      {userListings?.map((listing, index) => (
        <React.Fragment>
          <Stack key={index} direction="column" sx={{ mt: 2, bgcolor: 'background.paper' }}>
            <AccountListingInfo listing={listing} setListingUpdate={setListingUpdate} setOpen={setOpen} />
            <Divider sx={{ mt: 2 }} />
          </Stack>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default AccountListings;

