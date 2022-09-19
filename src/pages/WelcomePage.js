import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import ListItemIcon from '@mui/material/ListItemIcon';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Zoom from '@mui/material/Zoom';
import Grow from '@mui/material/Grow';
import Fade from '@mui/material/Fade';
import Tooltip from '@mui/material/Tooltip';
import FormHelperText from '@mui/material/FormHelperText';
import "@fontsource/vt323";
import api from '../utils/axios/api';
import RedBarcodes from '../elements/RedBarcodes';
import RedSwan from '../elements/RedSwan';
import Loading from '../elements/Loading';



const WelcomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);
  const isAuth = useSelector(state => state.auth.isAuth);
  const [mounted, setMounted] = useState(true);
  const [loading, setLoading] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);


  useEffect(() => {
    const verifyPasscode = async () => {
      let response = await api.get(`api/users/verify_passcode/${passcode}`)
      .then((response) => {
        let result = response.data;
        if (result) {
          setLoading(true);
          setTimeout(() => {
            sessionStorage.setItem('passcode', passcode);
            navigate("../app/exchange", { replace: true });
          }, 3000);
        } else {
          setPasscode('');
          setPasscodeError(true);
        }
      });
    };
    let timer = setTimeout(() => {
      if (passcode) {
        verifyPasscode();
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [passcode]);


  const handleInput = () => {
    setMounted(!mounted);
  };


  const renderPage = () => {
    if (!loading) {
      return (
        <React.Fragment>
          <Fade in={mounted} timeout={{ enter: 2000 }} style={{ transitionDelay: mounted ? '3000ms' : '0ms' }}>
            <Tooltip title="Login" placement="left" enterDelay={800} leaveDelay={200}>
              <Button onClick={() => navigate("../login", { replace: true })} sx={{ ml: "auto", mt: 1, mr: 2, '&:hover': { transform: 'scale(1.1)', background: 'none' } }}>
                <RedSwan />
              </Button>
            </Tooltip>
          </Fade>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: "100%",  mt: 15 }}>
            <Fade in={mounted} timeout={{ enter: 2000 }} style={{ transitionDelay: mounted ? '800ms' : '0ms' }}>
              <Stack direction="column" alignItems="center" justifyContent="space-evenly">
                <RedBarcodes />
                <Typography sx={{ font: '146px VT323', color: '#CC0000', textShadow: '5px 5px 0px rgba(0,0,0,0.2)', mt: -1 }}>
                  OFF-WORLD
                </Typography>
              </Stack>
            </Fade>
            <Fade in={mounted} timeout={{ enter: 2000 }} style={{ transitionDelay: mounted ? '2500ms' : '0ms' }}>
              <Stack direction="row" justifyContent="flex-end">
                <Typography sx={{ font: '25px VT323', color: '#CC0000', textShadow: '2px 3px 5px rgba(0,0,0,0.5)', mt: -2  }}>
                  BETA.V1
                </Typography>
              </Stack>
            </Fade>
            <Fade in={mounted} timeout={{ enter: 2000 }} style={{ transitionDelay: mounted ? '2000ms' : '0ms' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mt: 2}}>
                <Stack direction="row" justifyContent="center" alignItems="baseline" spacing={2} >
                  <Typography variant='button' sx={{ font: '18px VT323', fontWeight: 'bold', color: "#000000", textShadow: '2px 3px 3px rgba(0,0,0,0.5)' }}>
                    Enter Passcode:  
                  </Typography>
                  <Input
                    required
                    variant="filled" 
                    type="password"
                    autoFocus
                    disableUnderline
                    id="passcode"
                    name="passcode"
                    value={passcode}
                    onChange={(event) => setPasscode(event.target.value)}
                    sx={{ height: 16 }} 
                    inputProps={{ 
                      sx: {font: '18px VT323', color: '#CC0000'} 
                    }}  
                  />
                </Stack>
                <FormHelperText  sx={{ color: '#CC0000', font: '16px VT323', fontWeight: 'bold', mt: 3 }}>
                  { passcodeError ? "Incorrect passcode." : null }
                </FormHelperText>
              </Box>
            </Fade>
          </Box>
        </React.Fragment>
      );
    } else {
      return (
        <Box sx={{ display: 'flex', mt: -15 }}>
          <Loading />
        </Box>
      );
    }
  };


  return (
    renderPage()
  );
};

export default WelcomePage;

