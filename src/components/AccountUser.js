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
import AccountUserProfile from '../components/AccountUserProfile';
import AccountUserSettings from '../components/AccountUserSettings';
import AccountResidenceInfo from '../components/AccountResidenceInfo';
import AccountResidenceImages from '../components/AccountResidenceImages';
import CreateResidenceForm from '../forms/CreateResidenceForm';
import EditResidenceForm from '../forms/EditResidenceForm';



const AccountUser = (props) => {
  const user = useSelector(state => state.auth.user);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [expanded, setExpanded] = useState("profile");
  const [userResidences, setUserResidences] = useState(null);
  const [residenceUpdate, setResidenceUpdate] = useState(false);
  const [addResidenceFormOpen, setAddResidenceFormOpen] = useState(false);
  const [editResidenceFormOpen, setEditResidenceFormOpen] = useState(false);


  useEffect(() => {
    const fetchUserResidence = async () => {
      try {
        const response = await api.get(`api/residences/retrieve/${user?.id}/false`);
        console.log(response.data);
        setUserResidences(response.data);
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
      fetchUserResidence();
    }
  }, [user]);


  const handleAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleResidenceFormOpen = (event, residence) => {
    if (residence) {
      setResidenceUpdate(residence);
      setEditResidenceFormOpen(true);
    } else {
      setAddResidenceFormOpen(true);
    }
  };

  const handleResidenceFormClose = () => {
    setAddResidenceFormOpen(false);
    setEditResidenceFormOpen(false);
  };

  

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: "100%", bgcolor: 'background.paper' }}>
        <Stack direction="row" alignItems="flex-end" justifyContent="space-between">
          <Typography sx={{ font: '40px VT323', color: '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', m: 1, mb: 1 }}>
            ACCOUNT
          </Typography>
        </Stack>
        <Accordion expanded={expanded === "profile"} onChange={handleAccordion("profile")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: expanded === "profile" ? '#CC0000' : '#696969' }} />}>
            <Typography sx={{ font: '28px VT323', color: expanded === "profile" ? '#CC0000' : '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', width: '33%', flexShrink: 0 }}>
              PROFILE
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ height: '100%', borderBottom: 'none' }} >
            <AccountUserProfile user={user} />
            <Divider />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === "residence"} onChange={handleAccordion("residence")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: expanded === "residence" ? '#CC0000' : '#696969' }} />}>
            <Typography sx={{ font: '28px VT323', color: expanded === "residence" ? '#CC0000' : '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', width: '33%', flexShrink: 0 }}>
              RESIDENCES
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ height: '100%', borderBottom: 'none' }} >
            <Stack direction="row-reverse" alignItems="flex-start" justifyContent="space-between" sx={{ mt: -1 }}>
              <Button
                variant="contained"
                size="small"
                endIcon={<AddOutlinedIcon sx={{ color: "#FFFFFF", height: 30, width: 30 }} />}
                onClick={(event) => handleResidenceFormOpen(event, null)}
                sx={{  
                  font: '26px VT323',
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
                  height: '36px',
                  background: '#CC0000',
                  border: '3px solid #CC0000',
                  boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
                  m: 1,
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
                Add Residence
              </Button>
            </Stack>
            {userResidences?.map((residence, index) => (
              <React.Fragment>
                <Divider sx={{ mt: 1, mb: 2 }} />
                <Stack key={index} direction="row" alignItems="flex-start" justifyContent="space-between" spacing={5}>
                  <Stack sx={{ width: "75%" }}>
                    <ResidenceAccountInfo residence={residence} />
                  </Stack>
                  <Stack direction="column" alignItems="center" spacing={2} sx={{ pt: 2, width: "60%" }}>
                    <ResidenceAccountImages residence={residence?.id} />
                    <Button
                      variant="contained"
                      size="small"
                      endIcon={<EditIcon sx={{ color: "#FFFFFF", height: 25, width: 25 }} />}
                      onClick={(event) => handleResidenceFormOpen(event, residence)}
                      sx={{  
                        font: '26px VT323',
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                        textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
                        height: '36px',
                        background: '#CC0000',
                        border: '3px solid #CC0000',
                        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
                        m: 1,
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
                      Edit Residence
                    </Button>
                  </Stack>
                </Stack>
                <Divider />
              </React.Fragment>
            ))}
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === "settings"} onChange={handleAccordion("settings")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: expanded === "settings" ? '#CC0000' : '#696969' }} />}>
            <Typography sx={{ font: '28px VT323', color: expanded === "settings" ? '#CC0000' : '#696969', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', width: '33%', flexShrink: 0 }}>
              SETTINGS
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ height: '100%', borderBottom: 'none' }} >
            <UserSettingsInfo user={user} />
          </AccordionDetails>
        </Accordion>
      </Box>
      <Dialog open={addResidenceFormOpen} onClose={handleResidenceFormClose} fullWidth maxWidth='md'>
        <DialogTitle sx={{ font: '34px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ m: -2 }}>
            <Typography sx={{ font: '34px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)' }}>
              Add Residence
            </Typography>
            <IconButton onClick={handleResidenceFormClose}>
              <CloseIcon sx={{ color: "#CC0000", height: 30, width: 30, m: 1, '&:hover': { transform: 'scale(1.1)' } }} />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          <CreateResidenceForm />
        </DialogContent>
      </Dialog>
      <Dialog open={editResidenceFormOpen} onClose={handleResidenceFormClose} fullWidth maxWidth='md'>
        <DialogTitle sx={{ font: '34px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ m: -2 }}>
            <Typography sx={{ font: '34px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)' }}>
              Edit Residence
            </Typography>
            <IconButton onClick={handleResidenceFormClose}>
              <CloseIcon sx={{ color: "#CC0000", height: 30, width: 30, m: 1, '&:hover': { transform: 'scale(1.1)' } }} />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          <EditResidenceForm residence={residenceUpdate} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default AccountUser;







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
