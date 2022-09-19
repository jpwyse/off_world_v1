import React, { Fragment, useEffect, useState, useContext, useMemo, useRef } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import useSWR from "swr";
import api from '../../utils/axios/api';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import redactkit from 'redactkit';
import SwapResidenceInfo from '../components/SwapResidenceInfo';
import SwapResidenceImages from '../components/SwapResidenceImages';


const SwapContract = ({listingAsk, listingBid, ...props}) => {
  const user = useSelector(state => state.auth.user);
  const [overviewExpand, setOverviewExpand] = useState(true);
  const [timeFrameExpand, setTimeFrameExpand] = useState(true);
  const [residenceExpand, setResidenceExpand] = useState(true);
  const [memberExpand, setMemberExpand] = useState(true);
  const [residenceOpen, setResidenceOpen] = useState(false);
  const [openResidenceOverture, setOpenResidenceOverture] = useState(null);

  var redact = require('redactkit');
  let askAddress = listingAsk?.residence?.address;


  const handleChange = (event, value) => {
   if (value === "overview") {
    setOverviewExpand(!overviewExpand);
   }

   if (value === "timeframe") {
    setTimeFrameExpand(!timeFrameExpand);
   }

   if (value === "residences") {
    setResidenceExpand(!residenceExpand);
   }

   if (value === "members") {
    setMemberExpand(!memberExpand);
   }
  };


  const handleDisplayOpen = (event, residence, overture) => {
    if (residence?.id) {
      setResidenceOpen(residence);
      setOpenResidenceOverture(overture);
    }
  };

  const handleDisplayClose = () => {
    setResidenceOpen(false);
    setOpenResidenceOverture(null);
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <Typography align='center' sx={{ font: '64px VT323', color: '#CC0000', mb: 3, textShadow: '2px 4px 3px rgba(0,0,0,0.3)' }}>
        Swap-Offer Contract Review
      </Typography>
      <Divider />
      <Accordion expanded={overviewExpand} onChange={(event) => handleChange(event, "overview")} sx={{ boxShadow: 'none' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ font: '36px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)' }}>
            I. OVERVIEW
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex",  flexDirection: "row",  justifyContent: "space-around", alignItems: "baseline", my: 1, mb: 2 }}>
            <Stack direction="column" alignItems="baseline" justifyContent="flex-start">
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Bidder:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  {user?.full_name}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Residence:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  {listingBid?.name}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Location:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  {listingBid?.city}, {listingBid?.state} {listingBid?.zip_code}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="column" alignItems="flex-start" justifyContent="center">
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Asker:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  {listingAsk?.residence?.user?.first_name} {listingAsk?.residence?.user?.last_name}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Residence:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  {listingAsk?.residence?.name} 
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Location:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  {listingAsk?.residence?.city}, {listingAsk?.residence?.state} {listingAsk?.residence?.zip_code}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={timeFrameExpand} onChange={(event) => handleChange(event, "timeframe")} sx={{ boxShadow: 'none' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ font: '36px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)' }}>
            II. SCHEDULE INFORMATION
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex",  flexDirection: "row",  justifyContent: "space-evenly", alignItems: "baseline", my: 1, mb: 2 }}>
            <Stack direction="column" alignItems="flex-start" justifyContent="center">
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Arrival Date:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  {listingAsk?.arrival_date}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Departure Date:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  {listingAsk?.departure_date}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="column" alignItems="flex-start" justifyContent="center">
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Arrival Time:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  {listingAsk?.arrival_time}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Departure Time:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  {listingAsk?.departure_time}
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Stack direction="column" alignItems="center" justifyContent="center">
            <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
              <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                Swap Duration:
              </Typography>
              <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                {listingAsk?.duration} Days
              </Typography>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={residenceExpand} onChange={(event) => handleChange(event, "residences")} sx={{ boxShadow: 'none' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ font: '36px VT323', fontWeight: 'bold', color: '#D73B3E', textShadow: '2px 3px 4px rgba(0,0,0,0.3)' }}>
            II. RESIDENCE INFORMATION
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex",  flexDirection: "row",  justifyContent: "space-around", alignItems: "baseline", m: 1, mb: 2, mt: 2 }}>
            <Stack direction="column" alignItems="flex-start" justifyContent="center">
               <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Overture:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Bid
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Name:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  {listingBid?.name}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Address:
                </Typography>
                <Stack direction="column" alignItems="flex-start" justifyContent="center">
                  <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                    {listingBid?.address}
                  </Typography>
                  <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                    {listingBid?.city}, {listingBid?.state} {listingBid?.zip_code}
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Residence Type:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  {listingBid?.building}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Arrangement:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  {listingBid?.arrangement}
                </Typography>
              </Stack>
              <Button
                variant="contained"
                size="small"
                onClick={(event) => handleDisplayOpen(event, listingBid, "bid")}
                sx={{  
                  font: '24px VT323',
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
                  border: '3px solid #CC0000',
                  background: '#CC0000',
                  boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
                  height: '36px',
                  m: "auto",
                  mt: 2,
                  '&:hover': { 
                    color: '#FFFFFF',
                    background: '#CC0000',
                    border: '3px solid #CC0000',
                    transform: 'scale(1.05)',
                    boxShadow: 'rgba(204, 0, 0, 0.19) 0px 10px 20px, rgba(204, 0, 0, 0.23) 0px 6px 6px;',
                  }
                }}
              >
                View Residence Profile
              </Button>
            </Stack>
            <Stack direction="column" alignItems="flex-start" justifyContent="center">
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Overture:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Ask
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Name:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  {listingAsk?.residence?.name}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Address:
                </Typography>
                <Stack direction="column" alignItems="flex-start" justifyContent="center">
                  <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                    {redact(askAddress)}
                  </Typography>
                  <Typography sx={{ font: '26px VT323', color: '#D73B3E', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                    {listingAsk?.residence?.city}, {listingAsk.residence?.state} {listingAsk?.residence?.zip_code}
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Residence Type:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  {listingAsk?.residence?.building}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Arrangement:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  {listingAsk?.residence?.arrangement}
                </Typography>
              </Stack>
              <Button
                variant="contained"
                size="small"
                onClick={(event) => handleDisplayOpen(event, listingAsk?.residence, "ask")}
                sx={{  
                  font: '24px VT323',
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
                  border: '3px solid #CC0000',
                  background: '#CC0000',
                  boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
                  height: '36px',
                  m: "auto",
                  mt: 2,
                  '&:hover': { 
                    color: '#FFFFFF',
                    background: '#CC0000',
                    border: '3px solid #CC0000',
                    transform: 'scale(1.05)',
                    boxShadow: 'rgba(204, 0, 0, 0.19) 0px 10px 20px, rgba(204, 0, 0, 0.23) 0px 6px 6px;',
                  }
                }}
              >
                View Residence Profile
              </Button>
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={memberExpand} onChange={(event) => handleChange(event, "members")} sx={{ boxShadow: 'none' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ font: '36px VT323', fontWeight: 'bold', color: '#D73B3E', textShadow: '2px 3px 4px rgba(0,0,0,0.3)' }}>
            II. MEMBER INFORMATION
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex",  flexDirection: "row",  justifyContent: "space-around", alignItems: "baseline", m: 1, mb: 2 }}>
            <Stack direction="column" alignItems="flex-start" justifyContent="center">
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Agent:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Bidder
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Full Name:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  {user?.full_name}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Username:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  @{user?.username}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Email:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  {user?.email}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Phone:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  {user?.phone}
                </Typography>
              </Stack>
              <Button
                disabled
                variant="contained"
                size="small"
                onClick={null}
                sx={{  
                  font: '24px VT323',
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
                  border: '3px solid #CC0000',
                  background: '#CC0000',
                  boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
                  height: '36px',
                  m: "auto",
                  mt: 2,
                  '&:hover': { 
                    color: '#FFFFFF',
                    background: '#CC0000',
                    border: '3px solid #CC0000',
                    transform: 'scale(1.05)',
                    boxShadow: 'rgba(204, 0, 0, 0.19) 0px 10px 20px, rgba(204, 0, 0, 0.23) 0px 6px 6px;',
                  }
                }}
              >
                View Member Profile
              </Button>
            </Stack>
            <Stack direction="column" alignItems="flex-start" justifyContent="center">
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Agent:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Asker
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Full Name:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  {listingAsk?.residence?.user?.first_name} {listingAsk?.residence?.user?.last_name}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Username:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  @{listingAsk?.residence?.user?.username}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Email:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  {listingAsk?.residence?.user?.email}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  Phone:
                </Typography>
                <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)', py: 0.5 }}>
                  {listingAsk?.residence?.user?.phone}
                </Typography>
              </Stack>
              <Button
                disabled
                variant="contained"
                size="small"
                onClick={null}
                sx={{  
                  font: '24px VT323',
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
                  border: '3px solid #CC0000',
                  background: '#CC0000',
                  boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
                  height: '36px',
                  m: "auto",
                  mt: 2,
                  '&:hover': { 
                    color: '#FFFFFF',
                    background: '#CC0000',
                    border: '3px solid #CC0000',
                    transform: 'scale(1.05)',
                    boxShadow: 'rgba(204, 0, 0, 0.19) 0px 10px 20px, rgba(204, 0, 0, 0.23) 0px 6px 6px;',
                  }
                }}
              >
                View Member Profile
              </Button>
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Dialog open={residenceOpen} onClose={handleDisplayClose} fullWidth maxWidth='lg'>
        <DialogTitle>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography sx={{ font: '34px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)' }}>
              Residence Profile
            </Typography>
            <IconButton onClick={handleDisplayClose}>
              <CloseIcon sx={{ color: "#CC0000", height: 30, width: 30, m: -1, '&:hover': { transform: 'scale(1.1)' } }} />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', m: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <SwapResidenceImages residence_id={residenceOpen?.id} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SwapResidenceInfo overture={openResidenceOverture} residence={residenceOpen} />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SwapContract;



const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

