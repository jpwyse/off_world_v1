import React, { Fragment, useEffect, useState, useContext, useMemo, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import api from '../utils/axios/api';
import Clock from 'react-live-clock';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
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
import Button from '@mui/material/Button';
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Loading from '../components/misc/Loading';
import CreateListingForm from '../forms/CreateListingForm';
import Listing from '../components/Listing';
import SwapContract from '../components/SwapContract';




const ExchangePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const{ state } = useLocation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const user = useSelector(state => state.auth.user);

  const [openListingDetails, setOpenListingDetails] = useState(false);
  const [openListingForm, setOpenListingForm] = useState(false);
  const [openSwapForm, setOpenSwapForm] = useState(false);
  const [processingListingForm, setProcessingListingForm] = useState(false);
  const [listingData, setListingData] = useState(null);
  const [swapContractOpen, setSwapContractOpen] = useState(false);
  const [swapContractLoading, setSwapContractLoading] = useState(false);


  const [listingAsk, setListingAsk] = useState(null);
  const [listingBid, setListingBid] = useState(null);

  const [noResidenceAlert, setNoResidenceAlert] = useState(false);
  const [multipleResidenceAlert, setMultipleResidenceAlert] = useState(false);

  const [authAlertOpen, setAuthAlertOpen] = useState(false);

  


  useEffect(() => {
    const fetchAllListings = async () => {
      try {
        const response = await api.get('api/listings/all');
        console.log(response.data);
        setListingData(response.data);
      } catch (error) {
        console.log('error', error.response);
      }
    };
    fetchAllListings();
  }, [openListingForm, processingListingForm, user]);


  const handleSwapSubmit = () => {
    const swap_offer = { 
      'residence_bid': listingBid?.id, 
      'residence_ask': listingAsk?.residence?.id, 
      'bidder': user?.id, 
      'asker': listingAsk?.residence?.user?.id,
      'listing': listingAsk?.id,
    };

    api.post("api/swaps/create", swap_offer)
    .then((response) => {
      console.log(response.data);
      setSwapContractOpen(false);
      enqueueSnackbar(okMsg, {
        variant: 'success',
        preventDuplicate: true,
        autoHideDuration: 6000,
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
        autoHideDuration: 6000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      });
    });
  };


  const okMsg = (
    <Typography sx={{ font: '18px VT323' }}>
      Successfully submitted swap offer.
    </Typography>
  );

  



  const handleSwapContract = (listing) => {
    setSwapContractLoading(true);
    setSwapContractOpen(true);
    setListingAsk(listing);
    api.get(`api/residences/retrieve/${user?.id}/false`)
    .then((response) => {
      console.log(response.data);
      let userResidence = response?.data;
      if (Array.isArray(userResidence)) {
        if (userResidence.length === 1) {
          setListingBid(userResidence[0]);
        } else if (userResidence.length === 0) {
          setNoResidenceAlert(true);
        } else {
          setMultipleResidenceAlert(true);
        }
      }
      setSwapContractLoading(false);
    })
    .catch((error) => {
      console.log(error.response);
      enqueueSnackbar(errMsg, {
        variant: 'error',
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      });
    });
  };



  const errMsg = (
    <Typography sx={{ font: '18px VT323' }}>
      Unable to create new swap contract at this time. Please try again later or contact support.
    </Typography>
  );

  
  const handleListingFormOpen = () => {
    if (user) {
      setOpenListingForm(true);
    } else {
      setAuthAlertOpen(true);
    }

    if (noResidenceAlert) {
      setNoResidenceAlert(false);
    }
  };


  const handleSwapContractClose = () => {
    setSwapContractOpen(false);
  };


  const noResidenceMsg = (
    <Typography sx={{ font: '22px VT323', fontWeight: 'bold', color: '#696969'}}>
      In order to swap residences with other members you must first add your own residence.
    </Typography>
  );

  const authMsg = (
    <Typography sx={{ font: '22px VT323', fontWeight: 'bold', color: '#CC0000'}}>
      You must be a registered member in order to add a new listing to the board.
    </Typography>
  );

  const noResidenceDialog = (
    <Dialog open={noResidenceAlert} onClose={() => setNoResidenceAlert(false)}>
      <DialogTitle>{noResidenceMsg}</DialogTitle>
      <DialogActions>
        <Button 
          variant="contained" 
          onClick={handleListingFormOpen} 
          sx={{ 
            font: '18px VT323', 
            fontWeight: 'bold', 
            color: '#FFFFFF', 
            background: '#D73B3E', 
            textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
            '&:hover': { 
              background: '#D73B3E',
              transform: 'scale(1.05)',
              boxShadow: 'rgba(215, 59, 62, 0.19) 0px 10px 20px, rgba(215, 59, 62, 0.23) 0px 6px 6px;',
            }
          }}
        >
          Add Residence
        </Button>
        <Button 
          variant="contained" 
          onClick={() => setNoResidenceAlert(false)}
          sx={{ 
            font: '18px VT323', 
            fontWeight: 'bold', 
            color: '#FFFFFF', 
            background: '#D73B3E', 
            textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
            '&:hover': { 
              background: '#D73B3E',
              transform: 'scale(1.05)',
              boxShadow: 'rgba(215, 59, 62, 0.19) 0px 10px 20px, rgba(215, 59, 62, 0.23) 0px 6px 6px;',
            }
          }}
        >
          Nevermind
        </Button>
      </DialogActions>
    </Dialog>
  );


  const authDialog = (
    <Dialog open={authAlertOpen} onClose={() => setAuthAlertOpen(false)}>
      <DialogTitle>{authMsg}</DialogTitle>
      <DialogActions>
        <Button 
          variant="contained" 
          onClick={() => navigate("/register", { replace: true })} 
          sx={{ 
            font: '20px VT323', 
            fontWeight: 'bold', 
            color: '#CC0000', 
            background: 'none', 
            border: '3px solid #CC0000',
            '&:hover': { 
              color: '#FFFFFF',
              background: '#CC0000',
              border: '3px solid #CC0000',
              transform: 'scale(1.05)',
              boxShadow: 'rgba(204, 0, 0, 0.19) 0px 10px 20px, rgba(204, 0, 0, 0.23) 0px 6px 6px;',
            }
          }}
        >
          Register
        </Button>
        <Button 
          variant="contained" 
          onClick={() => setAuthAlertOpen(false)}
          sx={{ 
            font: '20px VT323', 
            fontWeight: 'bold', 
            color: '#CC0000', 
            background: 'none', 
            border: '3px solid #CC0000',
            '&:hover': { 
              color: '#FFFFFF',
              background: '#CC0000',
              border: '3px solid #CC0000',
              transform: 'scale(1.05)',
              boxShadow: 'rgba(204, 0, 0, 0.19) 0px 10px 20px, rgba(204, 0, 0, 0.23) 0px 6px 6px;',
            }
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );





  const renderPage = () => {
    if (!listingData) {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Paper sx={{ width: '80%', filter: 'brightness(90%)', mb: 2 }}>
            <TableContainer component={Paper} style={{ width: '100%' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#F5F5F5' }}>
                    <TableCell align="center" colSpan={8}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ my: 2 }}>
                        <Typography sx={{ font: '28px VT323', fontWeight: 'bold', color: '#D73B3E', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', mb: 1.5 }}>
                          <Clock format={'hh:mm:ss A'} ticking={true} blinking={true} timezone={null} />
                        </Typography>
                        <Typography sx={{ font: '78px VT323', fontWeight: 'bold', color: '#D73B3E', mb: 0, textShadow: '3px 6px 5px rgba(0,0,0,0.3)' }}>
                          Off-World Exchange Board
                        </Typography>
                        <Button
                          variant="contained"
                          size="small"
                          endIcon={<AddOutlinedIcon sx={{ height: 25, width: 25, color: "#FFFFFF" }} />}
                          onClick={handleListingFormOpen}
                          sx={{  
                            font: '26px VT323',
                            fontWeight: 'bold',
                            color: '#FFFFFF',
                            textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
                            height: '45px',
                            width: '225px',
                            background: '#D73B3E',
                            boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
                            border: '3px solid #D73B3E',
                            mb: 1,
                            ml: -2,
                            '&:hover': { 
                              fontWeight: 'bold',
                              color: '#FFFFFF', 
                              background: '#D73B3E',
                              border: '3px solid #D73B3E',
                              transform: 'scale(1.05)',
                              boxShadow: 'rgba(215, 59, 62, 0.19) 0px 10px 20px, rgba(215, 59, 62, 0.23) 0px 6px 6px;',
                            }
                          }}
                        >
                          Add New Listing
                        </Button>
                        <CreateListingForm openListingForm={openListingForm} setOpenListingForm={setOpenListingForm} processingListingForm={processingListingForm} />
                      </Stack>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <IconButton edge="start" size="small" sx={{ color: '#D73B3E' }}>
                        <InfoOutlinedIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="left" colSpan={1} sx={{ font: '32px VT323', fontWeight: 'bold', color: '#D73B3E', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>MEMBER</TableCell>
                    <TableCell align="left" colSpan={1} sx={{ font: '32px VT323', fontWeight: 'bold', color: '#D73B3E', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>LISTING</TableCell>
                    <TableCell align="left" colSpan={1} sx={{ font: '32px VT323', fontWeight: 'bold', color: '#D73B3E', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>RESIDENCE</TableCell>
                    <TableCell align="left" colSpan={1} sx={{ font: '32px VT323', fontWeight: 'bold', color: '#D73B3E', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>DETAILS</TableCell>
                    <TableCell align="left" colSpan={1} sx={{ font: '32px VT323', fontWeight: 'bold', color: '#D73B3E', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>AMENITIES</TableCell>
                    <TableCell align="left" colSpan={1} sx={{ font: '32px VT323', fontWeight: 'bold', color: '#D73B3E', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>SCHEDULE</TableCell>
                    <TableCell align="left" colSpan={1} sx={{ font: '32px VT323', fontWeight: 'bold', color: '#D73B3E', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>STATUS</TableCell>
                    <TableCell align="left" colSpan={1} sx={{ font: '32px VT323', fontWeight: 'bold', color: '#D73B3E', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>SWAP</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
            <Loading />
          </Paper>
        </Box>
      );
    } else {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', background: 'none' }}>
          <Paper sx={{ width: '90%', filter: 'brightness(98%)', mb: 2 }}>
            <TableContainer component={Paper} style={{ width: '100%', background: 'none' }}>
              <Table sx={{ background: 'none' }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'none' }}>
                    <TableCell align="center" colSpan={9}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ my: 2 }}>
                        <Typography sx={{ font: '28px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '3px 3px 0px rgba(0,0,0,0.2)', mb: 1.5 }}>
                          <Clock format={'hh:mm:ss A'} ticking={true} blinking={true} timezone={null} />
                        </Typography>
                        <Typography sx={{ font: '78px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '5px 5px 0px rgba(0,0,0,0.2)' }}>
                          Off-World Exchange Board 
                        </Typography>
                        <Button
                          variant="contained"
                          size="small"
                          endIcon={<AddOutlinedIcon sx={{ height: 25, width: 25, color: "#FFFFFF" }} />}
                          onClick={handleListingFormOpen}
                          sx={{  
                            font: '26px VT323',
                            fontWeight: 'bold',
                            color: '#FFFFFF',
                            textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
                            background: '#CC0000',
                            border: '3px solid #CC0000',
                            boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
                            height: '45px',
                            width: '180px',
                            mb: 1,
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
                          Add Listing
                        </Button>
                        <CreateListingForm openListingForm={openListingForm} setOpenListingForm={setOpenListingForm} processingListingForm={processingListingForm} />
                      </Stack>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ bgcolor: '#F5F5F5' }}>
                    <TableCell>
                      <IconButton edge="start" size="small" sx={{ color: '#696969' }}>
                        <InfoOutlinedIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="left" colSpan={1} sx={{ font: '32px VT323', fontWeight: 'bold', color: '#696969', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>MEMBER</TableCell>
                    <TableCell align="left" colSpan={1} sx={{ font: '32px VT323', fontWeight: 'bold', color: '#696969', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>LISTING</TableCell>
                    <TableCell align="left" colSpan={1} sx={{ font: '32px VT323', fontWeight: 'bold', color: '#696969', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>RESIDENCE</TableCell>
                    <TableCell align="left" colSpan={1} sx={{ font: '32px VT323', fontWeight: 'bold', color: '#696969', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>POLICIES & DETAILS</TableCell>
                    <TableCell align="left" colSpan={1} sx={{ font: '32px VT323', fontWeight: 'bold', color: '#696969', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>AMENITIES</TableCell>
                    <TableCell align="left" colSpan={1} sx={{ font: '32px VT323', fontWeight: 'bold', color: '#696969', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>SCHEDULE</TableCell>
                    <TableCell align="left" colSpan={1} sx={{ font: '32px VT323', fontWeight: 'bold', color: '#696969', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>STATUS</TableCell>
                    <TableCell align="left" colSpan={1} sx={{ font: '32px VT323', fontWeight: 'bold', color: '#696969', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>SWAP</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listingData?.map((listing, index) => (
                    <Listing key={index} listing={listing} residence={listing?.residence} handleSwapContract={handleSwapContract} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Dialog open={swapContractOpen} onClose={handleSwapContractClose} fullWidth maxWidth='xl'>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography sx={{ font: '34px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', m: 1 }}>
                  Swap Terms Review
                </Typography>
                <IconButton onClick={handleSwapContractClose}>
                  <CloseIcon sx={{ height: 30, width: 30, color: "#CC0000", m: 1, '&:hover': { transform: 'scale(1.1)' } }} />
                </IconButton>
              </Stack>
              <DialogContent dividers>
                {swapContractLoading ? 
                  <Loading /> 
                : 
                  <SwapContract listingAsk={listingAsk} listingBid={listingBid} />
                }
              </DialogContent>
              <DialogContentText sx={{ font: '22px VT323', color: '#696969', px: 2, py: 1 }}>
                Please review all the information within this swap offer contract and then click the "Submit"  
                button to submit your swap offer.  
              </DialogContentText>
              <DialogActions>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleSwapSubmit} 
                  sx={{  
                    font: '30px VT323',
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
                    border: '3px solid #CC0000',
                    background: '#CC0000',
                    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;', 
                    height: '36px',
                    mr: 1,
                    my: 1,
                    '&:hover': { 
                      color: '#FFFFFF',
                      background: '#CC0000',
                      border: '3px solid #CC0000',
                      transform: 'scale(1.05)',
                      boxShadow: 'rgba(204, 0, 0, 0.19) 0px 10px 20px, rgba(204, 0, 0, 0.23) 0px 6px 6px;',
                    }
                  }}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleSwapContractClose}
                  sx={{  
                    font: '30px VT323',
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
                    border: '3px solid #CC0000',
                    background: '#CC0000',
                    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;', 
                    height: '36px',
                    mr: 1,
                    my: 1,
                    '&:hover': { 
                      color: '#FFFFFF',
                      background: '#CC0000',
                      border: '3px solid #CC0000',
                      transform: 'scale(1.05)',
                      boxShadow: 'rgba(204, 0, 0, 0.19) 0px 10px 20px, rgba(204, 0, 0, 0.23) 0px 6px 6px;',
                    }
                  }}
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            {noResidenceDialog}
            {authDialog}
          </Paper>
        </Box>
      );
    }
  };

  
  
  return (
   renderPage()  
  );
};

export default ExchangePage;
