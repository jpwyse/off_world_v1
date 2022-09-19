import React, { Fragment, useEffect, useState, useContext, useMemo, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reduxForm } from 'redux-form';
import { useSnackbar } from 'notistack';
import { register } from '../redux/actions/auth';
import { Formik, Form, Field, ErrorMessage, useFormik, useFormikContext  } from 'formik';
import { parse, isDate } from "date-fns";
import * as yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
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
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MuiPhoneNumber from 'material-ui-phone-number';
import * as NumberFormat from 'react-number-format';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import "@fontsource/vt323";
import api from '../utils/axios/api';
import RedSwan from '../elements/RedSwan';
import RedBarcode from '../elements/RedBarcode';
import Loading from '../elements/Loading';




const RegisterPage = () => {
  const { state } = useLocation();
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
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      phone: '',
      dob: '',
      gender: '',
      password: '',
      passcode: '',
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: values => {
      console.log(values);
      setLoading(true);
      dispatch(register(values));
      setTimeout(() => {
        setProcessing(true);
      }, 3000);
    },
  });


  let passcode = sessionStorage.getItem('passcode');
  console.log("passcode", passcode);

 

  useEffect(() => {
    if (processing) {
      if (isAuth) {
        navigate("../exchange", { replace: true });
      } else {
        setLoading(false);
        setFormError(true);
        enqueueSnackbar(errMsg, {
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
      if (!passcode) {
        navigate("../welcome", { replace: true });
      }
    }
  }, [auth, isAuth, processing])




const checkDuplicates = async (value, name) => {
  const { response } = await api.get(`api/users/validate_registration/${value}`)
  .then((response) => {
    const data = response.data;
    if (!data) {
      formik.setFieldError(name, `This ${name} is already registered.`);
    } 
    return data;
  });
};
  

  const handleChange = (event) => {
    const {name,value} = event.target;
    formik.setFieldValue(name,value);
    formik.setFieldTouched(name);

    if (value) {
      if (name === 'username' || name === 'email') {
        checkDuplicates(value, name);
      }
    }
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
              <Button onClick={() => navigate("../exchange")} sx={{ font: '30px VT323', fontWeight: 'bold', color: "#CC0000", textShadow: '2px 3px 4px rgba(0,0,0,0.3)', opacity: navActive ? 1 : 0, "&:hover": {color: "#CC0000", transform: 'scale(1.05)', textShadow: '2px 3px 4px rgba(0,0,0,0.5)', boxShadow: 'none', background: 'none'} }}>
                Exchange
              </Button>
              <Button onClick={() => navigate("../login")} sx={{ font: '30px VT323', fontWeight: 'bold', color: "#CC0000", textShadow: '2px 3px 4px rgba(0,0,0,0.3)', opacity: navActive ? 1 : 0, "&:hover": {color: "#CC0000", transform: 'scale(1.05)', textShadow: '2px 3px 4px rgba(0,0,0,0.5)', boxShadow: 'none', background: 'none'} }}>
                Login
              </Button>
              <Button onClick={() => navigate("../welcome")} sx={{ font: '30px VT323', fontWeight: 'bold', color: "#CC0000", textShadow: '2px 3px 4px rgba(0,0,0,0.3)', opacity: navActive ? 1 : 0, "&:hover": {color: "#CC0000", transform: 'scale(1.05)', textShadow: '2px 3px 4px rgba(0,0,0,0.5)', boxShadow: 'none', background: 'none'} }}>
                Welcome
              </Button>
            </Stack>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", width: "20%", mt: 5 }}>
            <Stack direction="column" alignItems="center" justifyContent="center">
              <RedBarcode />
              <Typography sx={{ font: '52px VT323', color: '#CC0000', mb: 2 }}>
                REGISTRATION
              </Typography>
            </Stack>
            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ font: '20px VT323', color: '#CC0000' }}>
                    FIRST NAME
                  </Typography>
                  <TextField
                    id="firstname"
                    name="firstname"
                    label="First Name"
                    required
                    fullWidth
                    size="small"
                    variant="filled"
                    margin="dense"
                    value={formik.values.firstname}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                    helperText={formik.touched.firstname && formik.errors.firstname}
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
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ font: '20px VT323', color: '#CC0000' }}>
                    LAST NAME
                  </Typography>
                  <TextField
                    id="lastname"
                    name="lastname"
                    label="Last Name"
                    required
                    fullWidth
                    size="small"
                    variant="filled"
                    margin="dense"
                    value={formik.values.lastname}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                    helperText={formik.touched.lastname && formik.errors.lastname}
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
                    USERNAME
                  </Typography>
                  <TextField
                    id="username"
                    name="username"
                    label="Username"
                    required
                    fullWidth
                    size="small"
                    variant="filled"
                    margin="dense"
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
                    EMAIL
                  </Typography>
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    required
                    fullWidth
                    size="small"
                    variant="filled"
                    margin="dense"
                    value={formik.values.email}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
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
                    PHONE NUMBER
                  </Typography>
                  <TextField
                    id="phone"
                    name="phone"
                    label="Phone Number"
                    fullWidth
                    size="small"
                    variant="filled"
                    margin="dense"
                    value={formError ? '' : null}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    sx={{ border: "1px solid #DBD7D2" }}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
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
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ font: '20px VT323', color: '#CC0000' }}>
                    DATE OF BIRTH
                  </Typography>
                  <TextField
                    id='dob'
                    name="dob"
                    label="DOB"
                    required
                    fullWidth
                    size="small"
                    variant="filled"
                    margin="dense"
                    type="date"
                    value={formik.values.dob}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ border: "1px solid #DBD7D2" }}
                    InputProps={{
                      disableUnderline: true,
                      sx: {color: formik.values.dob !== '' ? "#000000" : "#696969", font: '18px VT323', "&.Mui-focused": { color: "#000000" }},
                    }}
                    InputLabelProps={{ 
                      sx: {color: '#696969', font: '18px VT323', "&.Mui-focused": { color: "#696969" }},
                      shrink: true, 
                      required: true, 
                      margin: 'dense' 
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ font: '20px VT323', color: '#CC0000' }}>
                    GENDER
                  </Typography>
                  <TextField
                    id="gender"
                    name="gender"
                    label="Gender"
                    required
                    fullWidth
                    select
                    displayEmpty
                    defaultValue={'NA'}
                    size="small"
                    variant="filled"
                    margin="dense"
                    value={formik.values.gender}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                  >
                    <MenuItem value={'Male'} sx={{ font: '20px VT323', color: '#000000' }}>Male</MenuItem>
                    <MenuItem value={'Female'} sx={{ font: '20px VT323', color: '#000000' }}>Female</MenuItem>
                    <MenuItem value={'Other'} sx={{ font: '20px VT323', color: '#000000' }}>Other</MenuItem>
                    <MenuItem value={'NA'} sx={{ font: '20px VT323', color: '#000000' }}>Doesn't Matter</MenuItem>
                   </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ font: '20px VT323', color: '#CC0000' }}>
                    PASSWORD
                  </Typography>
                  <TextField
                    id="password"
                    name="password"
                    label="Password"
                    required
                    fullWidth
                    size="small"
                    variant="filled"
                    margin="dense"
                    type="password"
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
                <Grid item xs={12}>
                  <Typography sx={{ font: '20px VT323', color: '#CC0000' }}>
                    PASSCODE
                  </Typography>
                  <TextField
                    id="passcode"
                    name="passcode"
                    label="Passcode"
                    required
                    fullWidth
                    size="small"
                    variant="filled"
                    margin="dense"
                    placeholder={passcode}
                    value={passcode ? passcode : formik.values.passcode}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={formik.touched.passcode && Boolean(formik.errors.passcode)}
                    helperText={formik.touched.passcode && formik.errors.passcode}
                    sx={{ border: "1px solid #DBD7D2" }}
                    InputProps={{
                      disableUnderline: true,
                      readOnly: true,
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
                  Submit
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
  };

  return (
    renderPage()  
  );
};


export default reduxForm({
  form: 'RegisterPage' // a unique identifier for this form
})(RegisterPage)



const theme = createTheme();

const validationSchema = yup.object().shape({
  firstname: yup
    .string('Enter your first name.')
    .matches(/^[aA-zZ\s]+$/, "First name cannot contain spaces or special characters.")
    .required('First name is required.'),
  lastname: yup
    .string('Enter your last name.')
    .matches(/^[aA-zZ\s]+$/, "Last name cannot contain spaces or special characters.")
    .required('Last name is required.'),
  username: yup
    .string('Enter a username.')
    .min(2, 'Username must be at least 2 characters.')
    .matches(/^[aA-zZ\s]+$/, "Username cannot contain spaces or special characters.")
    .required('Username is required.'),
  email: yup
    .string('Enter your email.')
    .email('Enter a valid email.')
    .required('Email is required.'),
  phone: yup
    .string()
    .min(9, 'Phone number must be at least 9 characters.'),
  password: yup
    .string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters.')
    .matches(
      /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1}).*$/,
      "Password must contain at least 1 special character."
    )
    .matches(
      /^.*(?=.*\d).*$/,
      "Password must contain at least 1 digit."
    )
    .matches(
      /^.*((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 1 uppercase character."
    ),
  passcode: yup
    .string()
    .required('Passcode is required.'),
});


const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isNumericString
      format="+1 (###) ###-####"
    />
  );
});


const errMsg = (
  <Typography sx={{ font: '18px VT323' }}>
    Unable to register at this time. Please try again later or contact support.
  </Typography>
);
