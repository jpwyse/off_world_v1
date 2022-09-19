import React, { Fragment, useEffect, useState, useContext, useMemo, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { logout } from '../redux/actions/auth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import "@fontsource/vt323";
import RedSwan from '../elements/RedSwan';



const NavBar = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [logoutAlert, setLogoutAlert] = useState(false);
  const [navActive, setNavActive] = useState(false);
  const [urlPath, setUrlPath] = useState(null);


  useEffect(() => {
    const getUrlPath = async () => {
      const path = location?.pathname;
      setUrlPath(path); 
    };
    if (user && location) {
      getUrlPath();
    }
  }, [user, location]);

  

  const handleClick = (event) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const logoutUser = () => {
    dispatch(logout());
    setLogoutAlert(false);
    navigate("../welcome", { replace: true });
    sessionStorage.removeItem('passcode');
    setTimeout(() => {
      enqueueSnackbar(logoutSuccess, {
        variant: 'success',
        preventDuplicate: true,
        autoHideDuration: 4000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      });
    }, 500);
  };

  

  const renderNavBar = () => {
    if (location?.pathname === "/register" || location?.pathname === "/login" || location?.pathname === "/welcome") {
      return (
        <div></div>
      );
    } else {
      return (
        <AppBar position="static" sx={{ background: '#FAF0E6'}}>
          <Toolbar sx={{ flexWrap: 'wrap', background: '#FAF0E6', mb: 2 }}>
            <Box component="button" onMouseOver={() => setNavActive(true)} onMouseLeave={() => setNavActive(false)} sx={{ border: 'none', boxShadow: 'none', background: 'transparent' }}>
              <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1}>
                <Button sx={{ "&:hover": {boxShadow: 'none', background: 'none'} }} >
                  <RedSwan />
                </Button>
                <Button onClick={() => navigate("../exchange")} sx={{ font: '30px VT323', fontWeight: 'bold', color: "#CC0000", textShadow: '2px 3px 4px rgba(0,0,0,0.3)', opacity: navActive ? 1 : 0, "&:hover": {color: "#CC0000", transform: 'scale(1.05)', textShadow: '2px 3px 4px rgba(0,0,0,0.5)', boxShadow: 'none', background: 'none'} }}>
                  Exchange
                </Button>
                <Button onClick={() => navigate("../welcome")} sx={{ font: '30px VT323', fontWeight: 'bold', color: "#CC0000", textShadow: '2px 3px 4px rgba(0,0,0,0.3)', opacity: navActive ? 1 : 0, "&:hover": {color: "#CC0000", transform: 'scale(1.05)', textShadow: '2px 3px 4px rgba(0,0,0,0.5)', boxShadow: 'none', background: 'none'} }}>
                  Welcome
                </Button>
              </Stack>
            </Box>
            <Button
              aria-owns={anchorEl ? "user-menu" : undefined}
              aria-haspopup="true"
              variant="text"
              size="small"
              onClick={handleClick}
              onMouseOver={handleClick}
              sx={{  
                font: '26px VT323',
                fontWeight: 'bold',
                color: '#CC0000',
                textShadow: '1px 2px 2px rgba(0,0,0,0.3)',
                mt: 1, 
                mb: 2,
                ml: 'auto',
                transform: open ? 'scale(1.1)' : null,
              }}
            >
              {user ? `@${user.username}` : '@anon'}
            </Button>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              MenuListProps={{ onMouseLeave: handleClose }}
              PaperProps={{
                elevation: 0,
                sx: {
                  width: 120,
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1,
                  '& .MuiAvatar-root': {
                    width: 28,
                    height: 28,
                    ml: -1,
                    mr: 1.5,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 30,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'left', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
            { user ?
              <React.Fragment>
                <MenuItem onClick={() => navigate("../account")} sx={{ font: '20px VT323', fontWeight: 'bold', color: '#000000', '&:hover': { color: '#CC0000', transform: 'scale(1.05)' } }}>
                  <Avatar sx={{ color: '#000000' }} /> ACCOUNT
                </MenuItem>
                <MenuItem onClick={() => setLogoutAlert(true)} sx={{ font: '20px VT323', fontWeight: 'bold', color: '#000000', '&:hover': { color: '#CC0000', transform: 'scale(1.05)' } }}>
                  <ListItemIcon sx={{ ml: -0.5 }}>
                    <Logout fontSize="medium" sx={{ color: '#000000' }} />
                  </ListItemIcon>
                  LOGOUT
                </MenuItem>
              </React.Fragment>
            :
              <React.Fragment>
                <MenuItem onClick={() => navigate("../login")} sx={{ font: '20px VT323', fontWeight: 'bold', color: '#000000', '&:hover': { color: '#CC0000', transform: 'scale(1.05)' } }}>
                  <ListItemIcon sx={{ ml: -0.5 }}>
                    <VpnKeyIcon fontSize="medium" sx={{ color: '#000000' }} />
                  </ListItemIcon>
                  LOGIN
                </MenuItem>
                <MenuItem onClick={() => navigate("../register")} sx={{ font: '20px VT323', fontWeight: 'bold', color: '#000000', '&:hover': { color: '#CC0000', transform: 'scale(1.05)' } }}>
                  <ListItemIcon sx={{ ml: -0.5 }}>
                    <PersonAddIcon fontSize="medium" sx={{ color: '#000000' }} />
                  </ListItemIcon>
                  REGISTER
                </MenuItem>
              </React.Fragment>
            }
            </Menu>
          </Toolbar>
          <Dialog open={logoutAlert} onClose={() => setLogoutAlert(false)}>
            <DialogTitle>{logoutMsg}</DialogTitle>
            <DialogActions>
              <Button 
                variant="contained" 
                onClick={logoutUser} 
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
                Yes
              </Button>
              <Button 
                variant="contained" 
                onClick={() => setLogoutAlert(false)} 
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
                Nevermind
              </Button>
            </DialogActions>
          </Dialog>
        </AppBar>
      );
    }
  };

  return (
    renderNavBar()  
  );
};

export default NavBar;


const logoutMsg = (
  <Typography sx={{ font: '24px VT323', color: '#CC0000', fontWeight: 'bold'}}>
    Are you sure you want to logout?
  </Typography>
);

const logoutSuccess = (
  <Typography sx={{ font: '18px VT323', color: '#FFFFFF', fontWeight: 'bold'}}>
    You have been successfully logged out. 
  </Typography>
);


