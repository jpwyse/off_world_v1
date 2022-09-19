import React, { Fragment, useEffect, useState, useContext, useMemo, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reduxForm } from 'redux-form';
import { useSnackbar } from 'notistack';
import { Formik, Form, Field, ErrorMessage, useFormik, useFormikContext  } from 'formik';
import { parse, isDate } from "date-fns";
import * as yup from 'yup';
import "@fontsource/vt323";
import api from '../utils/axios/api';
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
import NumberFormat from 'react-number-format';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import * as Yup from 'yup';
import "@fontsource/vt323";




const EditProfileForm = ({user, ...props}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [formError, setFormError] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      phone: '',
      dob: '',
      gender: '',
    },
    validationSchema: validationSchema,
    validateOnChange: true,
  });


  const handleSubmit = (event, values) => {
    event.preventDefault();
    console.log(values);
    api.post(`api/auth/edit_profile/${user?.id}`, values)
    .then((response) => {
      console.log(response);
      formik.resetForm(formik.initialValues);
      enqueueSnackbar(successMsg, {
        variant: 'success',
        preventDuplicate: true,
        autoHideDuration: 4000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      });
    })
    .catch((error) => {
      console.log(error.response);
      enqueueSnackbar(errMsg, {
        variant: 'error',
        preventDuplicate: true,
        autoHideDuration: 4000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      }); 
    });
  };




  const checkDuplicates = async (value, name) => {
    const { response } = await api.get(`api/auth/validate_registration/${value}`)
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


  
  
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container spacing={2}>
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
              onFocus={formik.handleFocus}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ border: "1px solid #DBD7D2", width: 400 }}
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
            <FormHelperText error={true} sx={{ font: '14px VT323', fontWeight: 'bold' }}>
              {formik.errors.firstname}
            </FormHelperText>
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
              onFocus={formik.handleFocus}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ border: "1px solid #DBD7D2", width: 400 }}
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
            <FormHelperText error={true} sx={{ font: '14px VT323', fontWeight: 'bold' }}>
              {formik.errors.lastname}
            </FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
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
              onFocus={formik.handleFocus}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              sx={{ border: "1px solid #DBD7D2", width: 400 }}
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
            <FormHelperText error={true} sx={{ font: '14px VT323', fontWeight: 'bold' }}>
              {formik.errors.username}
            </FormHelperText>
          </Grid>
           <Grid item xs={12} sm={6}>
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
              onFocus={formik.handleFocus}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              sx={{ border: "1px solid #DBD7D2", width: 400 }}
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
            <FormHelperText error={true} sx={{ font: '14px VT323', fontWeight: 'bold' }}>
              {formik.errors.email}
            </FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
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
              onFocus={formik.handleFocus}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ border: "1px solid #DBD7D2", width: 400 }}
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
            <FormHelperText error={true} sx={{ font: '14px VT323', fontWeight: 'bold' }}>
              {formik.errors.phone}
            </FormHelperText>
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
              onFocus={formik.handleFocus}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ border: "1px solid #DBD7D2", width: 400 }}
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
            <FormHelperText error={true} sx={{ font: '14px VT323', fontWeight: 'bold' }}>
              {formik.errors.dob}
            </FormHelperText>
          </Grid>
          <Grid item xs={12}>
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
              onFocus={formik.handleFocus}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ border: "1px solid #DBD7D2", width: 400 }}
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
            <FormHelperText error={true} sx={{ font: '14px VT323', fontWeight: 'bold' }}>
              {formik.errors.gender}
            </FormHelperText>
          </Grid>
           <Button
            type="submit"
            variant="contained"
            size="small"
            disabled={ !formik.isValid || formik.isSubmitting || formError }
            onClick={(event) => handleSubmit(event, formik.values)}
            sx={{  
              font: '26px VT323',
              fontWeight: 'bold',
              color: '#FFFFFF',
              textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
              height: '40px',
              background: '#CC0000',
              border: '3px solid #CC0000',
              boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
              mt: 2.5,
              ml: 50,
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
            Save
          </Button>
        </Grid>
      </Box>
    </React.Fragment>
  );
};


export default reduxForm({
  form: 'EditProfileForm' // a unique identifier for this form
})(EditProfileForm)



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


const successMsg = (
  <Typography sx={{ font: '18px VT323' }}>
    Profile has been successfully updated.
  </Typography>
);

const errMsg = (
  <Typography sx={{ font: '18px VT323' }}>
    Unable to register at this time. Please try again later or contact support.
  </Typography>
);
