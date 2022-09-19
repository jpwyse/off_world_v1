import React, { Fragment, useEffect, useState, useContext, useMemo, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import api from '../utils/axios/api';
import { Formik, Form, Field, ErrorMessage, useFormik, useFormikContext  } from 'formik';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Badge from '@mui/material/Badge';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FormHelperText from '@mui/material/FormHelperText';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from "moment";
import NumberFormat from 'react-number-format';
import * as Yup from 'yup';
import "@fontsource/vt323";
import { Country, State, City }  from 'country-state-city';
import Loading from '../elements/Loading';



const UpdateListingForm = ({listing, ...props}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [durationValue, setDurationValue] = useState([null, null]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      listing: listing?.id,
      residence: "",
      active: "",
      arrival_date: null, 
      departure_date: null,
      arrival_time: null,
      departure_time: null,
    },
    validationSchema: validationSchema,
    validateOnChange: true,
  });

  


  const handleSubmit = (event, values) => {
    event.preventDefault();
    console.log(values);
    api.post(`api/listings/update/${listing?.id}`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response);
      enqueueSnackbar(successMsg, {
        variant: 'success',
        preventDuplicate: true,
        autoHideDuration: 4000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      });
      handleListingFormClose();
    })
    .catch((error) => {
      console.log(error.response);
      //let errMsg = error.response?.data?.detail;
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


  const handleTimeChange = (event) => {
    const {name, value} = event.target;
    formik.setFieldValue(name, value);
  };



  const handleListingFormClose = () => {
    props.setUpdateListingFormOpen(false);
    formik.resetForm(formik.initialValues);
  };




  const renderPage = () => {
    if (props.processingListingForm || !listing) {
      return (
        <Dialog open={props.updateListingFormOpen} onClose={handleListingFormClose} fullWidth maxWidth='md'>
          <Loading />
        </Dialog>
      );
    } else {
      return (
        <React.Fragment>
          <Dialog open={props.updateListingFormOpen} onClose={handleListingFormClose} fullWidth maxWidth='md'>
            <React.Fragment>
              <DialogTitle sx={{ font: '34px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)' }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ m: -2 }}>
                  <Typography sx={{ font: '34px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', ml: 1 }}>
                    Update Listing
                  </Typography>
                  <IconButton onClick={handleListingFormClose}>
                    <CloseIcon sx={{ height: 30, width: 30, color: "#CC0000", m: 1, '&:hover': { transform: 'scale(1.1)' } }} />
                  </IconButton>
                </Stack>
              </DialogTitle>
              <DialogContent dividers>
                <Box component='form' noValidate onSubmit={formik.handleSubmit} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                  <Grid container spacing={3} sx={{ mb: 1 }}>
                    <Grid item xs={12}>
                      <Typography sx={{ font: '28px VT323', fontStyle: 'oblique', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)' }}>
                        Listing Information
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" alignItems="baseline" justifyContent="flex-start" spacing={10}>
                        <Stack direction="column">
                          <Stack direction="row" alignItems="baseline" justifyContent="space-between" sx={{ mb: 0.2 }}>
                            <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)', mr: 'auto' }}>
                              Residence
                            </Typography>
                          </Stack>
                          <TextField
                            id="residence"
                            name="residence"
                            label="Select"
                            fullWidth
                            select
                            size="small"
                            variant="filled"
                            margin="dense"
                            defaultValue={listing?.residence ? listing?.residence?.id : formik.values.residence}
                            value={formik.values.residence}
                            onFocus={formik.handleFocus}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            InputProps={{
                              disableUnderline: true,
                              sx: {color: '#000000', font: '20px VT323'},
                            }}
                            InputLabelProps={{ 
                              sx: {color: '#000000', font: '20px VT323', "&.Mui-focused": { color: "#696969" }},
                              margin: 'dense',
                              shrink: true,
                            }}
                            sx={{ width: 350 }}
                          >
                            <MenuItem key={listing?.residence?.id} value={listing?.residence?.id} sx={{ font: '20px VT323', color: '#000000' }}>
                              {listing?.residence?.address} - {listing?.residence?.city}, {listing?.residence?.state}
                            </MenuItem>
                          </TextField>
                          { formik.errors.residence && formik.touched.residence ? 
                            <FormHelperText error={true} sx={{ font: '14px VT323', fontWeight: 'bold' }}>
                              {formik.errors.residence}
                            </FormHelperText>
                          :
                            null
                          }
                        </Stack>
                        <Stack direction="column" alignItems="flex-start">
                          <Stack direction="column">
                            <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)', mb: -3.5 }}>
                              Status
                            </Typography>
                            <Tooltip title="Selecting ACTIVE will make this listing public on the exchange board for all members to view and swap. Selecting INACTIVE will make this listing private, other members will not be able to view or swap. Default value is ACTIVE." placement="right-start">
                              <InfoOutlinedIcon size='small' sx={{ color: '#696969', width: 25, height: 25, ml: 'auto', mb: 0.5, '&:hover': { color: '#CC0000', transform: 'scale(1.05)' } }} />
                            </Tooltip>
                            <TextField
                              id="active"
                              name="active"
                              label="Select"
                              fullWidth
                              select
                              size="small"
                              variant="filled"
                              margin="dense"
                              defaultValue={true}
                              value={formik.values.active}
                              onFocus={formik.handleFocus}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              InputProps={{
                                disableUnderline: true,
                                sx: {color: '#000000', font: '20px VT323'},
                              }}
                              InputLabelProps={{ 
                                sx: {color: '#000000', font: '20px VT323', "&.Mui-focused": { color: "#696969" }},
                                margin: 'dense',
                                shrink: true,
                              }}
                              sx={{ width: 350 }}
                            >
                              <MenuItem value={true} sx={{ font: '20px VT323', color: '#000000' }}>Active</MenuItem>
                              <MenuItem value={false} sx={{ font: '20px VT323', color: '#000000' }}>Inactive</MenuItem>
                            </TextField>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography  sx={{ font: '22px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)' }}>
                        Arrival & Departure Dates
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateRangePicker
                          startText={arrivalDateLabel}
                          endText={departureDateLabel}
                          value={[formik.values.arrival_date, formik.values.departure_date]}
                          disablePast={true}
                          onChange={(newValue) => {
                            setDurationValue(newValue);
                            let arrival_date = moment(newValue[0]).format("MM/DD/YYYY");
                            let departure_date = moment(newValue[1]).format("MM/DD/YYYY");
                            formik.setFieldValue("arrival_date", arrival_date, true);
                            formik.setFieldValue("departure_date", departure_date, true);
                          }}
                          onOpen={() => setPickerOpen(true)}
                          onClose={() => setPickerOpen(false)}
                          renderInput={(startProps, endProps) => (
                            <React.Fragment>
                              <Stack direction="row" alignItems="baseline" justifyContent="flex-start" spacing={10}>
                                <Stack direction="column">
                                  <TextField
                                    id="arrival_date"
                                    name="arrival_date"
                                    size="small" 
                                    variant="filled" 
                                    margin="dense"
                                    value={formik.values.arrival_date}
                                    onFocus={formik.handleFocus}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    InputProps={{
                                      disableUnderline: true,
                                      sx: {color: '#000000', font: '20px VT323'},
                                    }}
                                    InputLabelProps={{
                                      margin: 'dense',
                                      shrink: true,
                                    }}
                                    sx={{ width: 350 }}
                                    {...startProps}
                                  />
                                  { formik.errors.arrival_date && formik.touched.arrival_date ? 
                                    <FormHelperText error={true} sx={{ font: '14px VT323', fontWeight: 'bold' }}>
                                      {formik.errors.arrival_date}
                                    </FormHelperText>
                                  :
                                    null
                                  }
                                </Stack>
                                <Stack direction="column">
                                  <TextField
                                    id="departure_date"
                                    name="departure_date"
                                    size="small"
                                    variant="filled" 
                                    margin="dense"
                                    value={formik.values.departure_date}
                                    onFocus={formik.handleFocus}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    InputProps={{
                                      disableUnderline: true,
                                      sx: {color: '#000000', font: '20px VT323'},
                                    }}
                                    InputLabelProps={{
                                      margin: 'dense',
                                      shrink: true,
                                    }}
                                    sx={{ width: 350 }}
                                    {...endProps} 
                                  />
                                  { formik.errors.departure_date && formik.touched.departure_date ? 
                                    <FormHelperText error={true} sx={{ font: '14px VT323', fontWeight: 'bold' }}>
                                      {formik.errors.departure_date}
                                    </FormHelperText>
                                  :
                                    null
                                  }
                                </Stack>
                              </Stack>
                            </React.Fragment>
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)' }}>
                        Arrival & Departure Times
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack direction="row" alignItems="baseline" justifyContent="flex-start" spacing={10}>
                          <TextField
                            id="arrival_time"
                            name="arrival_time"
                            label="Arrival Time"
                            type="time"
                            fullWidth
                            size="small"
                            variant="filled"
                            margin="dense"
                            defaultValue="14:00"
                            value={formik.values.arrival_time}
                            onFocus={formik.handleFocus}
                            onChange={(event) => handleTimeChange(event)}
                            onBlur={formik.handleBlur}
                            InputProps={{
                              step: 300,
                              disableUnderline: true,
                              sx: {color: '#000000', font: '20px VT323'},
                            }}
                            InputLabelProps={{ 
                              sx: {color: '#000000', font: '20px VT323', "&.Mui-focused": { color: "#696969" }},
                              margin: 'dense',
                              shrink: true,
                            }}
                            sx={{ width: 350 }}
                          />
                          <TextField
                            id="departure_time"
                            name="departure_time"
                            label="Departure Time"
                            type="time"
                            fullWidth
                            size="small"
                            variant="filled"
                            margin="dense"
                            defaultValue="16:00"
                            value={formik.values.departure_time}
                            onFocus={formik.handleFocus}
                            onChange={(event) => handleTimeChange(event)}
                            onBlur={formik.handleBlur}
                            InputProps={{
                              step: 300,
                              disableUnderline: true,
                              sx: {color: '#000000', font: '20px VT323'},
                            }}
                            InputLabelProps={{ 
                              sx: {color: '#000000', font: '20px VT323',"&.Mui-focused": { color: "#696969" }},
                              margin: 'dense',
                              shrink: true,
                            }}
                            sx={{ width: 350 }}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </Box>
              </DialogContent>
              <DialogContentText sx={{ font: '18px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)', px: 2, py: 1 }}>
                To update your Listing please fill out the form above and click <b>"Update"</b>. 
              </DialogContentText>
              <DialogActions>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => props.setUpdateListingForm(false)} 
                  sx={{  
                    font: '26px VT323',
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
                    border: '3px solid #CC0000',
                    height: '40px',
                    background: '#CC0000',
                    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
                    mt: 1, 
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
                <Button
                  variant="contained"
                  size="small"
                  disabled={ !formik.isValid || formik.isSubmitting || !formik.dirty}
                  onClick={(event) => handleSubmit(event, formik.values)}
                  sx={{  
                    font: '26px VT323',
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
                    border: '3px solid #CC0000',
                    height: '40px',
                    background: '#CC0000',
                    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
                    mt: 1, 
                    '&:hover': { 
                      color: '#FFFFFF',
                      background: '#CC0000',
                      border: '3px solid #CC0000',
                      transform: 'scale(1.05)',
                      boxShadow: 'rgba(204, 0, 0, 0.19) 0px 10px 20px, rgba(204, 0, 0, 0.23) 0px 6px 6px;',
                    }
                  }}
                >
                  Update
                </Button>
              </DialogActions>
            </React.Fragment>
          </Dialog>
        </React.Fragment>
      );
    }
  };

  return (
    renderPage()
  );
};




const validationSchema = Yup.object().shape({
  residence: Yup.string().required("Residence is required."),
});


const successMsg = (
  <Typography sx={{ font: '18px VT323' }}>
    Successfully updated Listing.
  </Typography>
);

const errMsg = (
  <Typography sx={{ font: '18px VT323' }}>
    Unable to update listing at this time. Please try again later or contact support.
  </Typography>
);


const arrivalDateLabel = (
  <Typography sx={{ font: '20px VT323', color: '#000000' }}>
    Arrival Date
  </Typography>
);

const departureDateLabel = (
  <Typography sx={{ font: '20px VT323', color: '#000000' }}>
    Departure Date
  </Typography>
);


export default UpdateListingForm;
