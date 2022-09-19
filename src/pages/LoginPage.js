import React, { Fragment, useEffect, useState, useContext, useMemo, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reduxForm } from 'redux-form';
import { useSnackbar } from 'notistack';
import { useFormik, useFormikContext  } from 'formik';
import { parse, isDate } from "date-fns";
import * as yup from 'yup';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MuiPhoneNumber from 'material-ui-phone-number';
import NumberFormat from 'react-number-format';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import "@fontsource/vt323";
import api from '../utils/axios/api';
import { login } from '../redux/actions/auth';
import RedSwan from '../elements/RedSwan';
import RedBarcode from '../elements/RedBarcode';
import Loading from '../elements/Loading';



const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);
  const isAuth = useSelector(state => state.auth.isAuth);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [formError, setFormError] = useState(false);
  const [navActive, setNavActive] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: values => {
      setLoading(true);
      dispatch(login(values));
      setTimeout(() => {
       setProcessing(true);
      }, 2000);
    },
  });

  useEffect(() => {
    if (processing) {
      if (isAuth) {
        navigate("../exchange", { replace: true });
      } else {
        setLoading(false);
        setFormError(true);
        enqueueSnackbar(msg1, {
          variant: 'error',
          preventDuplicate: true,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
        });
        setTimeout(() => {
          setFormError(false);
          closeSnackbar();
          formik.resetForm(formik.initialValues);
        }, 3000);
      }
      setProcessing(false);
      setLoading(false);
    } else {
      if (isAuth) {
        navigate("../exchange", { replace: true });
      }
    }
}, [auth, isAuth, processing])



  const handleChange = (event) => {
    const {name,value} = event.target;
    formik.setFieldValue(name,value);
    formik.setFieldTouched(name);
  };

  const handleFocus = (event) => {
    const {name,value} = event.target;
    formik.setFieldValue(name,value);
    formik.setFieldTouched(name);
  };

  const handleBlur = (event) => {
    const {name,value} = event.target;
    formik.setFieldValue(name,value);
  };


  const renderPage = () => {
    if (!loading) {
      return (
        <React.Fragment>
          <Box component="button" onMouseOver={() => setNavActive(true)} onMouseLeave={() => setNavActive(false)} sx={{ mr: "auto", border: 'none', boxShadow: 'none', background: 'transparent' }}>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1}>
              <Button sx={{ "&:hover": {boxShadow: 'none', background: 'none'} }} >
                <RedSwan />
              </Button>
              <Button onClick={() => navigate("../app/exchange")} sx={{ font: '30px VT323', fontWeight: 'bold', color: "#CC0000", textShadow: '2px 3px 4px rgba(0,0,0,0.3)', opacity: navActive ? 1 : 0, "&:hover": {color: "#CC0000", transform: 'scale(1.05)', textShadow: '2px 3px 4px rgba(0,0,0,0.5)', boxShadow: 'none', background: 'none'} }}>
                Exchange
              </Button>
              <Button onClick={() => navigate("../register")} sx={{ font: '30px VT323', fontWeight: 'bold', color: "#CC0000", textShadow: '2px 3px 4px rgba(0,0,0,0.3)', opacity: navActive ? 1 : 0, "&:hover": {color: "#CC0000", transform: 'scale(1.05)', textShadow: '2px 3px 4px rgba(0,0,0,0.5)', boxShadow: 'none', background: 'none'} }}>
                Register
              </Button>
              <Button onClick={() => navigate("../welcome")} sx={{ font: '30px VT323', fontWeight: 'bold', color: "#CC0000", textShadow: '2px 3px 4px rgba(0,0,0,0.3)', opacity: navActive ? 1 : 0, "&:hover": {color: "#CC0000", transform: 'scale(1.05)', textShadow: '2px 3px 4px rgba(0,0,0,0.5)', boxShadow: 'none', background: 'none'} }}>
                Welcome
              </Button>
            </Stack>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", width: "20%", mt: 8 }}>
            <Stack direction="column" alignItems="center" justifyContent="center">
              <RedBarcode />
              <Typography sx={{ font: '52px VT323', color: '#CC0000', mb: 1 }}>
                LOGIN
              </Typography>
            </Stack>
            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 2, width: 340 }}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography sx={{ font: '20px VT323', color: '#CC0000' }}>
                    USERNAME
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    variant="filled"
                    margin="dense"
                    id="username"
                    name="username"
                    label="Username"
                    value={formik.values.username}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                    sx={{ border: "1px solid #DBD7D2" }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {color: '#000000', font: '18px VT323'},
                    }}
                    InputLabelProps={{ 
                      sx: {color: '#696969', font: '18px VT323', "&.Mui-focused": { color: "#696969" }},
                      margin: 'dense',
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ font: '20px VT323', color: '#CC0000' }}>
                    PASSWORD
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    variant="filled"
                    margin="dense"
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                    value={formik.values.password}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    sx={{ border: "1px solid #DBD7D2" }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {color: '#000000', font: '18px VT323'},
                    }}
                    InputLabelProps={{ 
                      sx: {color: '#696969', font: '18px VT323', "&.Mui-focused": { color: "#696969" }},
                      margin: 'dense',
                      shrink: true,
                    }}
                  />
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  disabled={ !formik.isValid || formik.isSubmitting || formError }
                  sx={{  
                    font: '26px VT323',
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
                    height: '36px',
                    background: '#CC0000',
                    border: '3px solid #CC0000',
                    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
                    m: "auto",
                    mt: 2,
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
                  Login
                </Button>
              </Grid>
            </Box>
          </Box>
        </React.Fragment>
      );
    } else {
      return (
        <Loading />
      );
    }
  }

  return (
    renderPage()
  );
};

export default reduxForm({
  form: 'LoginPage' // a unique identifier for this form
})(LoginPage)


const theme = createTheme();

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, 'Username must be at least 2 characters.')
    .required('Username is required.'),
  password: yup
    .string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters.')
});


const msg1 = (
  <Typography sx={{ font: '18px VT323' }}>
    Invalid username or password.
  </Typography>
);