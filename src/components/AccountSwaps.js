import React, { Fragment, useEffect, useState, useContext, useMemo, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import useSWR from "swr";
import api from '../../utils/axios/api';
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

import ListingImages from '../users/ListingImages';
import ListingInfo from '../users/ListingInfo';
import SwapsInfo from '../users/SwapsInfo';
import SwapBidsInfo from '../users/SwapBidsInfo';
import SwapOffersInfo from '../users/SwapOffersInfo';
import SwapContractsInfo from '../users/SwapContractsInfo';
import CreateResidenceForm from '../../components/residences/CreateResidenceForm';
import EditResidenceForm from '../../components/residences/EditResidenceForm';






const Swaps = (props) => {
  const user = useSelector(state => state.auth.user);
  const [expanded, setExpanded] = useState(false);
  const [userListings, setUserListings] = useState(null);
  const [userSwapAsks, setUserSwapAsks] = useState([]);
  const [userSwapBids, setUserSwapBids] = useState([]);
  const [userSwapContracts, setUserSwapContracts] = useState([]);
  const [listingUpdate, setListingUpdate] = useState(false);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    const fetchUserSwapBids = async () => {
      try {
        const response = await api.get(`api/swaps/retrieve/${user?.id}/bid`);
        console.log(response.data);
        setUserSwapBids(response.data);
      } catch (error) {
        console.log('error', error.response);
      }
    };
    const fetchUserSwapAsks = async () => {
      try {
        const response = await api.get(`api/swaps/retrieve/${user?.id}/ask`);
        console.log(response.data);
        setUserSwapAsks(response.data);
      } catch (error) {
        console.log('error', error.response);
      }
    };
    const fetchUserSwapContracts = async () => {
      try {
        const response = await api.get(`api/swaps/retrieve_contracts/${user?.id}`);
        console.log(response.data);
        setUserSwapContracts(response.data);
      } catch (error) {
        console.log('error', error.response);
      }
    };
    if (user?.id) {
      fetchUserSwapBids();
      fetchUserSwapAsks();
      fetchUserSwapContracts();
    }
  }, [user]);


  const handleAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: "100%", bgcolor: 'background.paper' }}>
      <Typography sx={{ font: '40px VT323', color: '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', m: 1, mb: 1 }}>
        SWAPS
      </Typography>
      <Accordion expanded={expanded === "contracts"} onChange={handleAccordion("contracts")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: expanded === "contracts" ? '#CC0000' : '#696969' }} />}>
          <Typography sx={{ font: '28px VT323', color: expanded === "contracts" ? '#CC0000' : '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', width: '33%', flexShrink: 0 }}>
            CONTRACTS ({userSwapContracts?.length})
          </Typography>
        </AccordionSummary>
        {userSwapContracts?.map((contract, index) => (
          <AccordionDetails sx={{ height: '100%', borderBottom: 'none' }} >
            <SwapContractsInfo contract={contract} index={index} />
          </AccordionDetails>
        ))}
      </Accordion>
      <Accordion expanded={expanded === "offers"} onChange={handleAccordion("offers")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: expanded === "offers" ? '#CC0000' : '#696969' }} />}>
          <Typography sx={{ font: '28px VT323', color: expanded === "offers" ? '#CC0000' : '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', width: '33%', flexShrink: 0 }}>
            OFFERS ({userSwapAsks?.length})
          </Typography>
        </AccordionSummary>
        {userSwapAsks?.map((swap, index) => (
          <AccordionDetails sx={{ height: '100%', borderBottom: 'none' }} >
            <SwapOffersInfo swap={swap} index={index} setExpanded={setExpanded} />
          </AccordionDetails>
        ))}
      </Accordion>
      <Accordion expanded={expanded === "bids"} onChange={handleAccordion("bids")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: expanded === "bids" ? '#CC0000' : '#696969' }} />}>
          <Typography sx={{ font: '28px VT323', color: expanded === "bids" ? '#CC0000' : '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', width: '33%', flexShrink: 0 }}>
            BIDS ({userSwapBids?.length})
          </Typography>
        </AccordionSummary>
        {userSwapBids?.map((swap, index) => (
          <AccordionDetails sx={{ height: '100%', borderBottom: 'none' }} >
            <SwapBidsInfo swap={swap} index={index} setExpanded={setExpanded} />
          </AccordionDetails>
        ))}
      </Accordion>
    </Box>
  );
};

export default Swaps;


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
