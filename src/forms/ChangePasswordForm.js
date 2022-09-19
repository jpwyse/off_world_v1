import React, { Fragment, useEffect, useState, useContext, useMemo, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reduxForm } from 'redux-form';
import { useSnackbar } from 'notistack';
import { Formik, Form, Field, ErrorMessage, useFormik, useFormikContext  } from 'formik';
import { parse, isDate } from "date-fns";
import * as yup from 'yup';
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
import FormControl, { useFormControl } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import * as Yup from 'yup';
import "@fontsource/vt323";
import RedSwan from '../elements/RedSwan';
import Loading from '../elements/Loading';



const ChangePasswordForm = ({user, ...props}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [formError, setFormError] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    validateOnChange: true,
  });

  useEffect(() => {
    if (formik.values !== formik.initialValues) {
      setTimeout(() => {
        if (formik.values.currentPassword === formik.values.newPassword) {
          setNewPasswordError(true);
          setFormError(true);
        } else {
          setNewPasswordError(false);
          setFormError(false);
        }
        if (formik.values.newPassword !== formik.values.confirmPassword) {
          setConfirmPasswordError(true);
          setFormError(true);
        } else {
          setConfirmPasswordError(false);
          setFormError(false);
        }
      }, 500);
    }
  }, [formik.values]);


  const handleSubmit = (event, values) => {
    event.preventDefault();
    console.log(values);
    api.post(`api/auth/change_password/${user?.id}`, values)
    .then((response) => {
      console.log(response);
      //props.handlePasswordFormClose();
      //formik.resetForm(formik.initialValues);
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



  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{ font: '20px VT323', color: '#CC0000' }}>
              CURRENT PASSWORD
            </Typography>
            <TextField
              id="currentPassword"
              name="currentPassword"
              label="Current Password"
              required
              fullWidth
              size="small"
              variant="filled"
              margin="dense"
              type="password"
              value={formik.values.currentPassword}
              onFocus={formik.handleFocus}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ border: "1px solid #DBD7D2", width: 425 }}
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
              {formik.errors.currentPassword}
            </FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ font: '20px VT323', color: '#CC0000' }}>
              NEW PASSWORD
            </Typography>
            <TextField
              id="newPassword"
              name="newPassword"
              label="New Password"
              required
              fullWidth
              size="small"
              variant="filled"
              margin="dense"
              type="password"
              value={formik.values.newPassword}
              onFocus={formik.handleFocus}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ border: "1px solid #DBD7D2", width: 425 }}
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
              {formik.errors.newPassword}
            </FormHelperText>
            {newPasswordError ?
              <FormHelperText error={true} sx={{ font: '14px VT323', fontWeight: 'bold' }}>
                New Password must be different from Current Password.
              </FormHelperText>
            :
              null
            }
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ font: '20px VT323', color: '#CC0000' }}>
              CONFIRM PASSWORD
            </Typography>
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              required
              fullWidth
              size="small"
              variant="filled"
              margin="dense"
              type="password"
              value={formik.values.confirmPassword}
              onFocus={formik.handleFocus}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ border: "1px solid #DBD7D2", width: 425 }}
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
              {formik.errors.confirmPassword}
            </FormHelperText>
            {confirmPasswordError ?
              <FormHelperText error={true} sx={{ font: '14px VT323', fontWeight: 'bold' }}>
                Passwords must match.
              </FormHelperText>
            :
              null
            }
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
              height: '36px',
              background: '#CC0000',
              border: '3px solid #CC0000',
              boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
              mt: 2,
              ml: 2,
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
  form: 'ChangePasswordForm' // a unique identifier for this form
})(ChangePasswordForm)



const validationSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required('Current Password is required.'),
  newPassword: yup
    .string()
    .required('New Password is required.')
    .min(8, 'New Password must be at least 8 characters.')
    .matches(
      /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1}).*$/,
      "New Password must contain at least 1 special character."
    )
    .matches(
      /^.*(?=.*\d).*$/,
      "New Password must contain at least 1 digit."
    )
    .matches(
      /^.*((?=.*[A-Z]){1}).*$/,
      "New Password must contain at least 1 uppercase character."
    ),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required.'),
});

const successMsg = (
  <Typography sx={{ font: '18px VT323' }}>
    Password has been successfully updated.
  </Typography>
);

const errMsg = (
  <Typography sx={{ font: '18px VT323' }}>
    Unable to change password at this time. Please try again later or contact support.
  </Typography>
);
