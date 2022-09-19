import React, { Fragment, useEffect, useState, useContext, useMemo, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import api from '../utils/axios/api';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import FlipCameraAndroidOutlinedIcon from '@mui/icons-material/FlipCameraAndroidOutlined';
import MultipleStopOutlinedIcon from '@mui/icons-material/MultipleStopOutlined';
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import redactkit from 'redactkit';
import ListingInfo from '../components/ListingInfo';
import ListingImages from '../components/ListingImages';




const Listing = ({listing, residence, ...props}) => {
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  const [listingOpen, setListingOpen] = useState(null);

  var redact = require('redactkit');
  let address = residence?.address



  const handleListingOpen = (listing) => {
    if (listing === listingOpen) {
      setListingOpen(null);
    } else {
      setListingOpen(listing);
    }
  };

  const handleSwapClick = (listing) => {
    if (listing.residence?.user?.id == user?.id) {
      //pass
    } else {
      props.handleSwapContract(listing);
    }
  };




  const listingRow = (
    <React.Fragment>
      <Stack direction="column" spacing={1}>
        <Typography sx={{ font: '27px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
          {residence?.name}
        </Typography>
        <Typography sx={{ font: '26px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
          {residence?.city}, {residence?.state} {residence?.zip_code}
        </Typography>
        <Typography sx={{ font: '26px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
          {residence?.neighborhood}
        </Typography>
        <Typography sx={{ font: '26px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
          {listing?.arrival_date} - {listing?.departure_date}
        </Typography>
      </Stack>
    </React.Fragment>
  );

  const residenceRow = (
    <React.Fragment>
      <Stack direction="column" spacing={1}>
        <Stack direction="row" alignItems="baseline" spacing={1.25}>
          <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
            Area:
          </Typography>
          <Typography sx={{ font: '26px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
            {residence?.sq_ft} ft<sup>2</sup>
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1.25}>
          <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
            Residence Type:
          </Typography>
          <Typography sx={{ font: '26px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
            {residence?.building}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1.25}>
          <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
            Bedrooms:
          </Typography>
          <Typography sx={{ font: '26px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
            {residence?.beds}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1.25}>
          <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
            Bathrooms:
          </Typography>
          <Typography sx={{ font: '26px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
            {residence?.baths}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1.25}>
          <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
            Total Rooms:
          </Typography>
          <Typography sx={{ font: '26px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
            {residence?.rooms}
          </Typography>
        </Stack>
      </Stack>
    </React.Fragment>
  );

  const detailsRow = (
    <React.Fragment>
      <Stack direction="column" spacing={1}>
        <Stack direction="row" alignItems="baseline" spacing={1.25}>
          <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
            Arrangement:
          </Typography>
          <Typography sx={{ font: '26px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
            {residence?.arrangement}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1.25}>
          <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
            Pet Policy:
          </Typography>
          <Typography sx={{ font: '26px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
            {residence?.pets}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1.25}>
          <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
            Smoking Policy: 
          </Typography>
          <Typography sx={{ font: '26px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
            {residence?.smoking}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1.25}>
          <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
            Party Policy: 
          </Typography>
          <Typography sx={{ font: '26px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
            {residence?.party} 
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1.25}>
          <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
            Cleaning Policy: 
          </Typography>
          <Typography sx={{ font: '26px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
            {residence?.cleaning}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1.25}>
          <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
            Linens & Towels: 
          </Typography>
          <Typography sx={{ font: '26px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
            {residence?.linens} 
          </Typography>
        </Stack>
      </Stack>
    </React.Fragment>
  );


  const amenitiesRow = (
    residence?.amenities.slice(0, 5).map(amenity => (
      <React.Fragment>
        <Stack direction="row" alignItems="baseline" spacing={1}>
          <Typography sx={{ font: '26px VT323', color: '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.2)',  mt: 1 }}>
            •
          </Typography>
          <Typography sx={{ font: '26px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.2)',  mt: 1 }}>
            {amenity}
          </Typography>
        </Stack>
      </React.Fragment>
    ))
  );

  const scheduleRow = (
    <React.Fragment>
      <Stack direction="column" spacing={1.25}>
        <Stack direction="column" spacing={0.25}>
          <Stack direction="row" alignItems="baseline" spacing={1.25}>
            <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
              Arrival Date: 
            </Typography>
            <Typography sx={{ font: '26px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
              {listing?.arrival_date} 
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="baseline" spacing={1}>
            <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
              Departure Date:
            </Typography>
            <Typography sx={{ font: '26px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
              {listing?.departure_date}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="column" spacing={0.25}>
          <Stack direction="row" alignItems="baseline" spacing={1.25}>
            <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
              Arrival Time:
            </Typography>
            <Typography sx={{ font: '26px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
              {listing?.arrival_time} 
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="baseline" spacing={1.25}>
            <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
              Departure Time:
            </Typography>
            <Typography sx={{ font: '26px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
              {listing?.departure_time}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="baseline" spacing={1.25}>
          <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
            Duration:
          </Typography>
          <Typography sx={{ font: '26px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.2)' }}>
            {listing?.duration} Days
          </Typography>
        </Stack>
      </Stack>
    </React.Fragment>
  );






  const swapButton = (
    <Button
      variant="contained"
      size="small"
      endIcon={<SyncAltOutlinedIcon sx={{ color: "#FFFFFF", height: 25, width: 25 }} />}
      onClick={() => handleSwapClick(listing)}
      disabled={!user}
      sx={{  
        font: '26px VT323',
        fontWeight: 'bold',
        color: '#FFFFFF',
        textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
        height: '40px',
        border: '3px solid #CC0000',
        background: '#CC0000',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;', 
        '&:hover': { 
          fontWeight: 'bold',
          color: '#FFFFFF', 
          background: '#CC0000',
          border: '3px solid #CC0000',
          transform: 'scale(1.05)',
          boxShadow: 'rgba(204, 0, 0, 0.19) 0px 10px 20px, rgba(204, 0, 0, 0.23) 0px 6px 6px;',
        }
      }}
    >
      Swap
    </Button>
  );

  

  const hideButton = (
    <Button
      variant="contained"
      size="small"
      endIcon={<KeyboardArrowUpIcon sx={{ color: "#FFFFFF", height: 28, width: 28 }} />}
      onClick={() => handleListingOpen(listing?.id)}
      sx={{  
        font: '26px VT323',
        fontWeight: 'bold',
        color: '#FFFFFF',
        textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
        height: '40px',
        border: '3px solid #CC0000',
        background: '#CC0000',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;', 
        '&:hover': { 
          fontWeight: 'bold',
          color: '#FFFFFF', 
          background: '#CC0000',
          border: '3px solid #CC0000',
          transform: 'scale(1.05)',
          boxShadow: 'rgba(204, 0, 0, 0.19) 0px 10px 20px, rgba(204, 0, 0, 0.23) 0px 6px 6px;',
        }
      }}
    >
      Hide
    </Button>
  );

  
  

  return (
    <React.Fragment>
      <TableRow key={listing?.id} sx={{ bgcolor: '#F5F5F5' }}>
        <TableCell>
          <IconButton edge="start" size="small" onClick={() => handleListingOpen(listing?.id)}>
            {listingOpen === listing?.id ? <KeyboardArrowUpIcon sx={{ color: '#CC0000', height: 25, width: 25, '&:hover': {transform: 'scale(1.1)'} }} /> : <KeyboardArrowDownIcon sx={{ color: '#696969', height: 25, width: 25, '&:hover': {color: '#CC0000', transform: 'scale(1.2)'} }} />}
          </IconButton>
        </TableCell>
        <TableCell align="left" colSpan={1} sx={{ font: '26px VT323', fontWeight: 'bold', color: '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.1)' }}>@{residence?.user?.username}</TableCell>
        <TableCell align="left" colSpan={1}>{listingRow}</TableCell>
        <TableCell align="left" colSpan={1}>{residenceRow}</TableCell>
        <TableCell align="left" colSpan={1}>{detailsRow}</TableCell>
        <TableCell align="left" colSpan={1}>{amenitiesRow}</TableCell>
        <TableCell align="left" colSpan={1}>{scheduleRow}</TableCell>
        <TableCell align="left" colSpan={1} sx={{ font: '26px VT323', fontWeight: 'bold', color: listing?.active ? '#3CB371' : '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.1)' }}>{listing?.active ? "Active" : "Inactive"}</TableCell>
        <TableCell>
          <IconButton disabled={!listing?.active || !user} edge="end" size="small" onClick={() => handleSwapClick(listing)}>
            <SyncAltOutlinedIcon sx={{ color: listing?.active ? '#3CB371' : '#696969', height: 35, width: 35, '&:hover': {transform: 'scale(1.2)'} }} />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow sx={{ bgcolor: '#DBD7D2' }}>
        <React.Fragment>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
            <Collapse in={listingOpen === listing?.id} timeout="auto" unmountOnExit>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 3, mx: 3 }}>
                {hideButton}
                <Typography sx={{ font: '54px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 4px 3px rgba(0,0,0,0.3)' }}>
                  Residence Overview
                </Typography>  
                {swapButton}
              </Stack>
              <Divider />
              <Table size="small">
                <TableRow sx={{ bgcolor: '#DBD7D2' }}>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', boxShadow: 1, m: 2 }}>
                    <Grid container spacing={5}>
                      <Grid item xs={12} sm={6}>
                        <ListingInfo listing={listing} residence={residence} handleSwapClick={handleSwapClick} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ListingImages residence={residence?.id} />
                      </Grid>
                    </Grid>
                  </Box>  
                </TableRow>
              </Table>
            </Collapse>
          </TableCell>
        </React.Fragment>
      </TableRow>
    </React.Fragment>
  );
};

export default Listing;

