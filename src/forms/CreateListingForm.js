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
import CreateResidenceForm from '../forms/CreateResidenceForm';




const CreateListingForm = () => {
  const user = useSelector(state => state.auth.user);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [userResidence, setUserResidence] = useState(null);
  const [durationValue, setDurationValue] = useState([null, null]);
  const [residenceError, setResidenceError] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [openResidenceForm, setOpenResidenceForm] = useState(true);
  const [processingResidenceForm, setProcessingResidenceForm] = useState(false);
  const formik = useFormik({
    initialValues: {
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

  

  useEffect(() => {
    const fetchUserResidence = async () => {
      try {
        const response = await api.get(`api/residences/retrieve/${user?.id}/true`, null, {params : { active: true }});
        console.log(response.data);
        setUserResidence(response.data);
      } catch (error) {
        console.log('error', error.response);
        let errMsg = 'Error retrieving user residences at this time.';
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
  }, [props.openListingForm, processingResidenceForm, user]);



  

  const handleSubmit = (event, values) => {
    event.preventDefault();
    console.log(values);
    api.post('api/listings/create', values)
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
      formik.resetForm(formik.initialValues);
    })
    .catch((error) => {
      console.log(error.response);
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
    });
  };

  

  const handleTimeChange = (event) => {
    const {name, value} = event.target;
    formik.setFieldValue(name, value);
  };


  const handleResidenceForm = () => {
    setOpenResidenceForm(!openResidenceForm);
  };

  const handleListingFormClose = () => {
    setOpenResidenceForm(false);
    props.setOpenListingForm(false);
    formik.resetForm(formik.initialValues);
  };

  const handleResidenceFormProcessing = (value) => {
    if (value) {
      setProcessingResidenceForm(value);
    }
  };

  



  const renderPage = () => {
    if (props.processingListingForm || processingResidenceForm) {
      return (
        <Dialog open={props.openListingForm} onClose={handleListingFormClose} fullWidth maxWidth='md'>
          <Loading />
        </Dialog>
      );
    } else {
      return (
        <React.Fragment>
          <Dialog open={props.openListingForm} onClose={handleListingFormClose} fullWidth maxWidth='md'>
            <React.Fragment>
              <DialogTitle sx={{ font: '34px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)' }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ m: -2 }}>
                  <Typography sx={{ font: '34px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', pl: 1 }}>
                    Add New Listing
                  </Typography>
                  <IconButton onClick={handleListingFormClose}>
                    <CloseIcon sx={{ height: 30, width: 30, color: "#CC0000", m: 1, '&:hover': { transform: 'scale(1.1)' } }} />
                  </IconButton>
                </Stack>
              </DialogTitle>
              <DialogContent dividers>
                <Box component='form' noValidate onSubmit={formik.handleSubmit} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography sx={{ font: '28px VT323', fontStyle: 'oblique', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)' }}>
                        Listing Information
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" alignItems="baseline" justifyContent="flex-start" spacing={10}>
                        <Stack direction="column">
                          <Stack direction="row" alignItems="baseline" justifyContent="space-between" sx={{ mb: -0.5 }}>
                            <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)', mr: 'auto' }}>
                              Residence
                            </Typography>
                            <Button 
                              variant="text"
                              endIcon = {<AddIcon sx={{ color: '#CC0000'}} />}
                              onClick={() => setOpenResidenceForm(!openResidenceForm)}
                              sx={{ 
                                font: '17px VT323', 
                                fontWeight: 'bold', 
                                color: '#CC0000',
                                textShadow: '2px 2px 2px rgba(0,0,0,0.3)',
                                '&:hover': { 
                                  fontStyle: 'oblique',
                                  transform: 'scale(1.05)',
                                }
                              }}
                            >
                              Create New Residence
                            </Button>
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
                            defaultValue={userResidence ? userResidence[0]?.id : formik.values.residence}
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
                            { userResidence ? 
                              userResidence.map((residence) => (
                                <MenuItem key={residence.id} value={residence.id} sx={{ font: '20px VT323', color: '#000000' }}>
                                  {residence.address} - {residence.city}, {residence.state}
                                </MenuItem>
                              ))
                            : 
                              <MenuItem disabled value="" sx={{ font: '20px VT323', color: '#000000' }}>
                                <em>No Residences Found - Please Create New Residence</em>
                              </MenuItem>
                            }
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
                            <Tooltip title="Selecting ACTIVE will make this listing public on the exchange board for all members to view and swap. Selecting INACTIVE will make this listing private, other members will not be able swap. Default value is ACTIVE." placement="right-start">
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
                    <Grid item xs={12}>
                      <Collapse in={openResidenceForm} timeout="auto" unmountOnExit>
                        <DialogContent dividers>
                          <CreateResidenceForm setOpenResidenceForm={setOpenResidenceForm} setProcessingForm={setProcessingResidenceForm} processingForm={processingResidenceForm} />
                        </DialogContent>
                      </Collapse>
                    </Grid>
                  </Grid>
                </Box>
              </DialogContent>
              <DialogContentText sx={{ font: '18px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)', px: 2, py: 1 }}>
                To add a new Listing to the exchange board, please fill out the form above and click <b>"Submit"</b>. 
                If no Residence is available to be attached, please click the <b>"Create Residence"</b> button found in 
                the <i>residence field above</i>. Complete the dropdown form to create a new Residence for your account 
                that can then be attached to this Listing. 
              </DialogContentText>
              <DialogActions>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => props.setOpenListingForm(false)} 
                  sx={{  
                    font: '26px VT323',
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
                    height: '40px',
                    background: '#CC0000',
                    border: '3px solid #CC0000',
                    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
                    mt: 1,
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
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  disabled={ !formik.isValid || formik.isSubmitting || !userResidence || !formik.dirty}
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
                    mt: 1,
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
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
});

const validationSchema = Yup.object().shape({
  residence: Yup.string().required("Residence is required."),
  arrival_date: Yup.string().nullable().required("Arrival date is required."),
  departure_date: Yup.string().nullable().required("Departure date is required."),
});


const successMsg = (
  <Typography sx={{ font: '18px VT323' }}>
    Successfully added new Listing.
  </Typography>
);

const msg2 = (
  <Typography sx={{ font: '18px VT323' }}>
    Unable to create new listings at this time. Please try again later or contact support.
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


export default CreateListingForm;
