import React, { Fragment, useEffect, useState, useContext, useMemo, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import api from '../utils/axios/api';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import TextField from '@mui/material/TextField';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import "@fontsource/vt323";
import EditProfileForm from '../forms/EditProfileForm';


const AccountUserProfile = ({user, ...props}) => {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [editProfileFormOpen, setEditProfileFormOpen] = useState(false);

  const handleEditProfileFormOpen = () => {
    if (user) {
      setEditProfileFormOpen(true);
    } else {
      navigate("../welcome", { replace: true });
    }
  };

  const handleEditProfileFormClose = () => {
    setEditProfileFormOpen(false);
  };



  return (
    <React.Fragment>
      <Card sx={{ width: "100%", height: "100%", border: "none", boxShadow: "none" }}>
        <Stack direction="row-reverse" alignItems="flex-start" justifyContent="space-between" sx={{ mb: -2 }}>
          <Button
            variant="contained"
            size="small"
            endIcon={<EditIcon sx={{ color: "#FFFFFF", height: 25, width: 25 }} />}
            onClick={handleEditProfileFormOpen}
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
            Edit Profile
          </Button>
        </Stack>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <CardContent sx={{ width: '40%', mr: 2 }}>
            <Stack direction='column' alignItems='center' spacing={1}>
              <Avatar sx={{ bgcolor: '#696969', height: 250, width: 250 }} />
              <Typography sx={{ font: '44px VT323', fontStyle: 'oblique', color: '#000000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', pr: 2 }}>
                @{user?.username}
              </Typography>
              <IconButton disabled sx={{ m: -1 }}>
                <AddAPhotoIcon sx={{ color: "#CC0000", height: 35, width: 35 }} />
              </IconButton>
            </Stack>
            <Divider sx={{ mt: 2 }} />
          </CardContent>
          <CardContent sx={{ width: '50%' }}>
            <Stack direction='column' alignItems="flex-start" justifyContent="space-evenly" spacing={2}>
              <Typography sx={{ font: '32px VT323', fontStyle: 'oblique', color: '#000000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)' }}>
                Member Information:
              </Typography>
              <Stack direction='row' alignItems="baseline" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#696969', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Full Name:
                </Typography>
                <Typography sx={{ font: '28px VT323', color: '#CC0000', textShadow: '2px 3px 3px rgba(0,0,0,0.3)' }}>
                  {user?.full_name}
                </Typography>
              </Stack>
              <Stack direction='row' alignItems="baseline" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#696969', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Username:
                </Typography>
                <Typography sx={{ font: '28px VT323', color: '#CC0000', textShadow: '2px 3px 3px rgba(0,0,0,0.3)' }}>
                  @{user?.username}
                </Typography>
              </Stack>
              <Stack direction='row' alignItems="baseline" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#696969', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Date Joined:
                </Typography>
                <Typography sx={{ font: '28px VT323', color: '#CC0000', textShadow: '2px 3px 3px rgba(0,0,0,0.3)' }}>
                  {user?.date_joined}
                </Typography>
              </Stack>
            </Stack>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Stack direction='column' alignItems="flex-start" justifyContent="space-evenly" spacing={2}>
              <Typography sx={{ font: '32px VT323', fontStyle: 'oblique', color: '#000000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)' }}>
                Contact Information:
              </Typography>
              <Stack direction='row' alignItems="baseline" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#696969', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Email:
                </Typography>
                <Typography sx={{ font: '28px VT323', color: '#CC0000', textShadow: '2px 3px 3px rgba(0,0,0,0.3)' }}>
                  {user?.email}
                </Typography>
              </Stack>
              <Stack direction='row' alignItems="baseline" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#696969', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Phone:
                </Typography>
                <Typography sx={{ font: '28px VT323', color: '#CC0000', textShadow: '2px 3px 3px rgba(0,0,0,0.3)' }}>
                  {user?.phone}
                </Typography>
              </Stack>
            </Stack>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Stack direction='column' alignItems="flex-start" justifyContent="space-evenly" spacing={2}>
              <Typography sx={{ font: '32px VT323', fontStyle: 'oblique', color: '#000000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)' }}>
                Personal Information:
              </Typography>
              <Stack direction='row' alignItems="baseline" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#696969', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Date of Birth:
                </Typography>
                <Typography sx={{ font: '28px VT323', color: '#CC0000', textShadow: '2px 3px 3px rgba(0,0,0,0.3)' }}>
                  {user?.dob}
                </Typography>
              </Stack>
              <Stack direction='row' alignItems="baseline" spacing={1}>
                <Typography sx={{ font: '26px VT323', color: '#696969', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                  Gender:
                </Typography>
                <Typography sx={{ font: '28px VT323', color: '#CC0000', textShadow: '2px 3px 3px rgba(0,0,0,0.3)' }}>
                  {user?.gender}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Box>
      </Card>
      <Dialog open={editProfileFormOpen} onClose={handleEditProfileFormClose} fullWidth maxWidth='md'>
        <DialogTitle sx={{ font: '34px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ m: -2 }}>
            <Typography sx={{ font: '34px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)' }}>
              Edit Profile
            </Typography>
            <IconButton onClick={handleEditProfileFormClose}>
              <CloseIcon sx={{ color: "#CC0000", height: 30, width: 30, m: 1, '&:hover': { transform: 'scale(1.1)' } }} />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          <EditProfileForm user={user} handleEditProfileFormClose={handleEditProfileFormClose} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default AccountUserProfile;