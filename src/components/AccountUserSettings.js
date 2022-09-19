import React, { Fragment, useEffect, useState, useContext, useMemo, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import api from '../utils/axios/api';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import ListItemIcon from '@mui/material/ListItemIcon';
import TextField from '@mui/material/TextField';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import EditIcon from '@mui/icons-material/Edit';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import CloseIcon from '@mui/icons-material/Close';
import "@fontsource/vt323";
import ChangePasswordForm from '../forms/ChangePasswordForm';


const AccountUserSettings = ({user, ...props}) => {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [passwordFormOpen, setPasswordFormOpen] = useState(false);
  const [deactivateOpen, setDeactivateOpen] = useState(false);

  const handlePasswordFormOpen = () => {
    if (user) {
      setPasswordFormOpen(true);
    } else {
      navigate("../welcome", { replace: true });
    }
  };

  const handlePasswordFormClose = () => {
    setPasswordFormOpen(false);
  };


  const handleDeactivateOpen = () => {
    if (user) {
      setDeactivateOpen(true);
    } else {
      navigate("../welcome", { replace: true });
    }
  };

  const handleDeactivateClose = () => {
    setDeactivateOpen(false);
  };


  return (
    <React.Fragment>
      <Stack direction="column" alignItems="flex-start" justifyContent="center" spacing={2} sx={{ mb: 0 }}>
        <Typography sx={{ font: '32px VT323', fontStyle: 'oblique', color: '#000000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)' }}>
          Manage Account:
        </Typography>
        <Button
          variant="contained"
          size="small"
          endIcon={<EditIcon sx={{ color: "#FFFFFF", height: 25, width: 25 }} />}
          onClick={handlePasswordFormOpen}
          sx={{  
            font: '24px VT323',
            fontWeight: 'bold',
            color: '#FFFFFF',
            textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
            border: '3px solid #CC0000',
            height: '36px',
            background: '#CC0000',
            boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
            m: 1, 
            '&:hover': { 
              color: '#FFFFFF',
              background: '#CC0000',
              border: '3px solid #CC0000',
              transform: 'scale(1.05)',
              boxShadow: 'rgba(204, 0, 0, 0.19) 0px 10px 20px, rgba(204, 0, 0, 0.23) 0px 6px 6px;',
            }
          }}
        >
          Change Password
        </Button>
         <Button
          disabled
          variant="contained"
          size="small"
          endIcon={<PersonRemoveIcon sx={{ color: "#FFFFFF", height: 25, width: 25 }} />}
          onClick={null}
          sx={{  
            font: '24px VT323',
            fontWeight: 'bold',
            color: '#FFFFFF',
            textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
            border: '3px solid #CC0000',
            height: '36px',
            background: '#CC0000',
            boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
            m: 1, 
            '&:hover': { 
              color: '#FFFFFF',
              background: '#CC0000',
              border: '3px solid #CC0000',
              transform: 'scale(1.05)',
              boxShadow: 'rgba(204, 0, 0, 0.19) 0px 10px 20px, rgba(204, 0, 0, 0.23) 0px 6px 6px;',
            }
          }}
        >
          Deactivate Account
        </Button>
      </Stack>
      <Divider sx={{ mt: 2 }} />
      <Dialog open={passwordFormOpen} onClose={handlePasswordFormClose} fullWidth maxWidth='md'>
        <DialogTitle sx={{ font: '34px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ m: -2 }}>
            <Typography sx={{ font: '34px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)' }}>
              Change Password
            </Typography>
            <IconButton onClick={handlePasswordFormClose}>
              <CloseIcon sx={{ color: "#CC0000", height: 30, width: 30, m: 1, '&:hover': { transform: 'scale(1.1)' } }} />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          <ChangePasswordForm user={user} handlePasswordFormClose={handlePasswordFormClose} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default AccountUserSettings;