import React, { Fragment, useEffect, useState, useContext, useMemo, useRef } from "react";
import api from '../utils/axios/api';
import { useFormik, useFormikContext  } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
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
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import FormHelperText from '@mui/material/FormHelperText';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageGallery from "react-image-gallery";
import Image from 'mui-image';
import ErrorIcon from '@mui/icons-material/Error';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import Select from '@mui/material/Select';
import NumberFormat from 'react-number-format';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import * as yup from 'yup';
import "@fontsource/vt323";
import { Country, State, City }  from 'country-state-city';
import Loading from '../elements/Loading';




const EditResidenceForm = ({residence, ...props}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [formDisabled, setFormDisabled] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [residenceImages, setResidenceImages] = useState([]);
  const [newImages, setNewImages] = useState(0);
  const [citySelectOpen, setCitySelectOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [charCount, setCharCount] = useState(0);
  const formik = useFormik({
    initialValues: {
      address: " ",
      zip_code: " ",
      state: " ",
      city: " ",
      name: " ",
      area: " ",
      building: " ",
      arrangement: " ",
      rooms: "",
      beds: "",
      baths: "",
      sq_ft: "",
      pets: " ",
      smoking: "",
      party: "",
      cleaning: "",
      linens: "",
      amenities: [],
      description: " ",
      images: "",
    },
    validationSchema: validationSchema,
  });


  useEffect(() => {
    if (!formik.isSubmitting && formik.isValid && formik.dirty) {
      setFormDisabled(false);
    } else if (!formik.isSubmitting && formik.isValid && (!formik.dirty && newImages > 0)) {
      setFormDisabled(false);
    } else {
      setFormDisabled(true);
    }
  });


  useEffect(() => {
    const fetchResidenceImages = async () => {
      try {
        const response = await api.get(`api/residences/images/${residence.id}`);
        setResidenceImages(response.data);
        setImagesLoaded(true);
      } catch (error) {
        console.log('error', error);
        let errMsg = "Unable to load residence photos at this time. Please try again later or contact support.";
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
    if (residence?.id) {
      fetchResidenceImages();
    }
  }, [imagesLoaded]);



  const handleSubmit = (event, values) => {
    event.preventDefault();
    console.log(values);

    const formData = new FormData();    
    formData.append("state", values.state);
    formData.append("city", values.city);
    formData.append("zip_code", values.zip_code);
    formData.append("address", values.address);
    formData.append("name", values.name);
    formData.append("neighborhood", values.area);
    formData.append("building", values.building);
    formData.append("arrangement", values.arrangement);
    formData.append("rooms", values.rooms);
    formData.append("beds", values.beds);
    formData.append("baths", values.baths);
    formData.append("sq_ft", values.sq_ft);
    formData.append("pets", values.pets);
    formData.append("smoking", values.smoking);
    formData.append("party", values.party);
    formData.append("cleaning", values.cleaning);
    formData.append("linens", values.linens);
    formData.append("amenities", values.amenities);
    formData.append("description", values.description);
    residenceImages.forEach((img, index) => {
      if (img?.name) {
        formData.append('images', img);
      }
    });

    api.post(`api/residences/update/${residence?.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response);
      enqueueSnackbar(msg1, {
        variant: 'success',
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      });
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response);
      let errMsg = msg2;
      enqueueSnackbar(errMsg, {
        variant: 'error',
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      });
    });
  };

 
  const handleClose = () => {
    props.setOpen(false);
  };


  const handleDescription = (event) => {
    const {name, value} = event.target;
    formik.setFieldValue(name, value);
    setCharCount(value.length);
  };
  

  const handleImageUpload = (event) => {
    if (!event.target.files) {
      return;
    } 
    if (event.target.files[0]) {
      setResidenceImages([...residenceImages, event.target.files[0]]);
      setNewImages(newImages + 1);
    } else {
      return;
    }
  };



  const handleImageDelete = (event, image) => {
    if (image?.name) {
      let imageArray = residenceImages.filter((img) => img?.name !== image.name);
      setResidenceImages(imageArray);
      setNewImages(newImages - 1);
    }
    if (image?.id) {
      console.log(image);
      setImagesLoaded(false);
      api.post(`api/residences/delete_images/${image?.id}`)
      .then((response) => {
        console.log(response);
        setImagesLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        let errMsg = "Error attempting to delete image. Please try again later.";
        enqueueSnackbar(errMsg, {
          variant: 'error',
          preventDuplicate: true,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
        });
        setTimeout(() => {
          setImagesLoaded(true);
        }, 4000);
      });
    }
  };


  const handleStateCity = (event, value) => {
    if (value) {
      formik.setFieldValue("state", value.isoCode);
      setCities(City.getCitiesOfState('US', value.isoCode));
    } else {
      formik.setFieldValue("state", "");
      formik.setFieldValue("city", "");
      setCities([]);
    }
  };


  const renderImages = () => {
    if (imagesLoaded) {
      return (
        <React.Fragment>
          <Box sx={{ width: "100%", pr: 2, overflowY: 'scroll' }}>
            <ImageList cols={3} gap={8} rowHeight={200}>
              {residenceImages?.map((img, index) => (
                <Stack direction="column" alignItems="center" sx={{ my: 1 }}>
                {img.url ? 
                  <ImageListItem key={index}>
                    <Image src={img.url} showLoading errorIcon />
                  </ImageListItem>
                :
                  <ImageListItem key={index}>
                    <Image src={`${URL.createObjectURL(img)}`} showLoading errorIcon />
                  </ImageListItem>
                }
                  <Button
                    variant="contained"
                    size="small"
                    onClick={(event) => handleImageDelete(event, img)} 
                    endIcon={<CloseIcon />}
                    sx={{  
                      font: '24px VT323',
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
                    sx={{  
                      font: '24px VT323',
                      color: '#CC0000',
                      border: '3px solid #CC0000',
                      height: '40px',
                      background: '#FFFFFF',
                      boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
                      mt: 1,
                      '&:hover': { 
                        color: '#CC0000', 
                        backgroundColor: '#FFFFFF',
                        border: '3px solid #CC0000',
                        transform: 'scale(1.05)',
                        boxShadow: 'rgba(204, 0, 0, 0.19) 0px 10px 20px, rgba(204, 0, 0, 0.23) 0px 6px 6px;',
                      }
                    }}
                  >
                    Delete
                  </Button>
                </Stack>
              ))}
            </ImageList>
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
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={{ font: '28px VT323', fontStyle: 'oblique', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', mb: 1 }}>
            Residence Location
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)' }}>
            State
          </Typography>
          <Autocomplete
            id="state"
            name="state"
            autoHighlight
            disablePortal
            options={states}
            getOptionLabel={(option) => option.name ? option.name : ""}
            value={formik.values.state}
            onInputChange={formik.handleFocus}
            onChange={(event, value) => {
              handleStateCity(event, value);
            }}
            onBlur={formik.handleBlur}
            ListboxProps={{ 
              sx: { font: '20px VT323', color: '#000000', "& :hover": {color: '#CC0000'} },
            }}
            sx={{ width: 350 }}
            renderInput={(params) => 
              <TextField 
                {...params} 
                name="state"
                label="Select"
                placeholder={residence?.state}
                fullWidth 
                size="small" 
                variant="filled" 
                margin="dense"
                InputProps={{...params.InputProps, disableUnderline: true}}
                InputLabelProps={{ 
                  sx: {color: '#000000', font: '20px VT323'},
                  margin: 'dense',
                  shrink: true,
                }}
                sx={textfield}
              />
            }
          />
          <FormHelperText error={true} sx={{ font: '14px VT323', fontWeight: 'bold' }}>
            {formik.errors.state}
          </FormHelperText>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ font: '20px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)' }}>
            City
          </Typography>
          <Autocomplete
            id="city"
            name="city"
            autoHighlight
            disablePortal
            freeSolo
            options={cities}
            getOptionLabel={(option) => option.name ? option.name : ""}
            value={formik.values.city}
            onInputChange={formik.handleFocus}
            onChange={(event, value) => {
              if (value) {
                formik.setFieldValue("city", value.name);
              } else {
                formik.setFieldValue("city", "");
              }
            }}
            onBlur={formik.handleBlur}
            ListboxProps={{ 
              sx: { font: '20px VT323', color: '#000000', "& :hover": {color: '#CC0000'} },
            }}
            sx={{ width: 350 }}
            renderInput={(params) => 
              <TextField 
                {...params} 
                name="city"
                label="Select"
                placeholder={residence?.city}
                fullWidth 
                size="small" 
                variant="filled" 
                margin="dense" 
                InputProps={{...params.InputProps, disableUnderline: true}}
                InputLabelProps={{ 
                  sx: {color: '#000000', font: '20px VT323'},
                  margin: 'dense',
                  shrink: true,
                }}
                sx={textfield}
              />
            }
          />
          <FormHelperText error={true} sx={{ font: '14px VT323', fontWeight: 'bold' }}>
            {formik.errors.city}
          </FormHelperText>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)' }}>
            Zip Code
          </Typography>
          <TextField
            id="zip_code"
            name="zip_code"
            label="Zip Code"
            placeholder={residence?.zip_code}
            fullWidth
            size="small"
            variant="filled"
            margin="dense"
            value={formik.values.zip_code !== " " ? formik.values.zip_code : residence?.zip_code}
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
          />
          <FormHelperText error={true} sx={{ font: '14px VT323', fontWeight: 'bold' }}>
            {formik.errors.zip_code}
          </FormHelperText>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)' }}>
            Address
          </Typography>
          <TextField
            id="address"
            name="address"
            label="Address"
            placeholder={residence?.address}
            fullWidth
            size="small"
            variant="filled"
            margin="dense"
            value={formik.values.address !== " " ? formik.values.address : residence?.address}
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
          />
          <FormHelperText error={true} sx={{ font: '14px VT323', fontWeight: 'bold' }}>
            {formik.errors.address}
          </FormHelperText>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)' }}>
            Neighborhood
          </Typography>
          <TextField
            id="area"
            name="area"
            label="Neighborhood"
            placeholder={residence?.neighborhood}
            fullWidth
            size="small"
            variant="filled"
            margin="dense"
            value={formik.values.area !== " " ? formik.values.area : residence?.neighborhood}
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
          />
          <FormHelperText error={true} sx={{ font: '14px VT323', fontWeight: 'bold' }}>
            {formik.errors.neighborhood}
          </FormHelperText>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ font: '20px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)' }}>
            Residence Type
          </Typography>
          <TextField
            id="building"
            name="building"
            label="Select"
            fullWidth
            select
            size="small"
            variant="filled"
            margin="dense"
            defaultValue={'Apartment'}
            value={formik.values.building !== " " ? formik.values.building : residence?.building}
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
            <MenuItem value={'Apartment'} sx={{ font: '20px VT323', color: '#000000' }}>Apartment</MenuItem>
            <MenuItem value={'House'} sx={{ font: '20px VT323', color: '#000000' }}>House</MenuItem>
            <MenuItem value={'Condo'} sx={{ font: '20px VT323', color: '#000000' }}>Condo</MenuItem>
            <MenuItem value={'Co-op'} sx={{ font: '20px VT323', color: '#000000' }}>Co-op</MenuItem>
            <MenuItem value={'Multi-family'} sx={{ font: '20px VT323', color: '#000000' }}>Multi-family</MenuItem>
            <MenuItem value={'Townhouse'} sx={{ font: '20px VT323', color: '#000000' }}>Townhouse</MenuItem>
            <MenuItem value={'Other'} sx={{ font: '20px VT323', color: '#000000' }}>Other</MenuItem>
          </TextField>
          <FormHelperText error={true} sx={{ font: '14px VT323', fontWeight: 'bold' }}>
            {formik.errors.building}
          </FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ mt: 0 }} />
          <Typography sx={{ font: '28px VT323', fontStyle: 'oblique', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', mt: 2, mb: 1 }}>
            Residence Information
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)' }}>
            Residence Name
          </Typography>
          <TextField
            id="name"
            name="name"
            fullWidth
            size="small"
            variant="filled"
            margin="dense"
            label="Name or Nickname"
            value={formik.values.name}
            onFocus={formik.handleFocus}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              disableUnderline: true,
              sx: {color: '#000000', font: '20px VT323', "&.Mui-focused": { color: "#000000" }},
            }}
            InputLabelProps={{ 
              sx: {color: '#000000', font: '20px VT323', "&.Mui-focused": { color: "#696969" }},
              margin: 'dense',
              shrink: true,
            }}
            sx={{ width: 350 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)' }}>
            Guest Arrangement
          </Typography>
          <TextField
            id="arrangement"
            name="arrangement"
            label="Select"
            fullWidth
            select
            size="small"
            variant="filled"
            margin="dense"
            defaultValue={'Entire Residence'}
            value={formik.values.arrangement !== " " ? formik.values.arrangement : residence?.arrangement }
            onFocus={formik.handleFocus}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              disableUnderline: true,
              sx: {color: '#000000', font: '20px VT323'},
            }}
            InputLabelProps={{ 
              sx: {color: '#000000', font: '20px VT323'},
              margin: 'dense',
              shrink: true,
            }}
            sx={{ width: 350 }}
          >
            <MenuItem value={'Entire Residence'} sx={{ font: '20px VT323', color: '#000000' }}>Entire Residence</MenuItem>
            <MenuItem value={'Private Bedroom'} sx={{ font: '20px VT323', color: '#000000' }}>Private Bedroom</MenuItem>
            <MenuItem value={'Shared Space'} sx={{ font: '20px VT323', color: '#000000' }}>Shared Space</MenuItem>
            <MenuItem value={'Other'} sx={{ font: '20px VT323', color: '#000000' }}>Other</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)' }}>
            Rooms
          </Typography>
          <TextField
            id="rooms"
            name="rooms"
            label="Total"
            type="number"
            fullWidth
            size="small"
            variant="filled"
            margin="dense"
            value={formik.values.rooms}
            onFocus={formik.handleFocus}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              inputProps: {min: 0, max: 50},
              disableUnderline: true,
              sx: {color: '#000000', font: '20px VT323', "&.Mui-focused": { color: "#000000" }},
            }}
            InputLabelProps={{ 
              sx: {color: '#000000', font: '20px VT323', "&.Mui-focused": { color: "#696969" }},
              margin: 'dense',
              shrink: true,
            }}
            sx={{ width: 350 }}
          />
          <FormHelperText error={true} sx={{ font: '14px VT323', fontWeight: 'bold' }}>
            {formik.errors.rooms}
          </FormHelperText>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)' }}>
            Beds
          </Typography>
          <TextField
            id="beds"
            name="beds"
            label="Total"
            type="number"
            fullWidth
            size="small"
            variant="filled"
            margin="dense"
            value={formik.values.beds}
            onFocus={formik.handleFocus}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              inputProps: {min: 0, max: 50},
              disableUnderline: true,
              sx: {color: '#000000', font: '20px VT323', "&.Mui-focused": { color: "#000000" }},
            }}
            InputLabelProps={{ 
              sx: {color: '#000000', font: '20px VT323', "&.Mui-focused": { color: "#696969" }},
              margin: 'dense',
              shrink: true,
            }}
            sx={{ width: 350 }}
          />
          <FormHelperText error={true} sx={{ font: '14px VT323', fontWeight: 'bold' }}>
            {formik.errors.beds}
          </FormHelperText>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)' }}>
            Baths
          </Typography>
          <TextField
            id="baths"
            name="baths"
            label="Total"
            type="number"
            fullWidth
            size="small"
            variant="filled"
            margin="dense"
            value={formik.values.baths}
            onFocus={formik.handleFocus}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              inputProps: {min: 0, max: 50},
              disableUnderline: true,
              sx: {color: '#000000', font: '20px VT323', "&.Mui-focused": { color: "#000000" }},
            }}
            InputLabelProps={{ 
              sx: {color: '#000000', font: '20px VT323', "&.Mui-focused": { color: "#696969" }},
              margin: 'dense',
              shrink: true,
            }}
            sx={{ width: 350 }}
          />
          <FormHelperText error={true} sx={{ font: '14px VT323', fontWeight: 'bold' }}>
            {formik.errors.baths}
          </FormHelperText>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)' }}>
            Area
          </Typography>
          <TextField
            id="sq_ft"
            name="sq_ft"
            label={sqft}
            fullWidth
            size="small"
            variant="filled"
            margin="dense"
            value={formik.values.sq_ft}
            onFocus={formik.handleFocus}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              inputComponent: NumberFormatCustom,
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
          <FormHelperText error={true} sx={{ font: '14px VT323', fontWeight: 'bold' }}>
            {formik.errors.sq_ft}
          </FormHelperText>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)' }}>
            Pet Policy
          </Typography>
          <TextField
            id="pets"
            name="pets"
            label="Select"
            fullWidth
            select
            size="small"
            variant="filled"
            margin="dense"
            value={formik.values.pets !== " " ? formik.values.pets : residence?.pets}
            onFocus={formik.handleFocus}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              disableUnderline: true,
              sx: {color: '#000000', font: '20px VT323', "&.Mui-focused": { color: "#696969" }},
            }}
            InputLabelProps={{ 
              sx: {color: '#000000', font: '20px VT323', "&.Mui-focused": { color: "#696969" }},
              margin: 'dense',
              shrink: true,
            }}
            sx={{ width: 350 }}
          >
            <MenuItem value={'All Pets'} sx={{ font: '20px VT323', color: '#000000' }}>All Pets</MenuItem>
            <MenuItem value={'Cats & Dogs'} sx={{ font: '20px VT323', color: '#000000' }}>Cats & Dogs</MenuItem>
            <MenuItem value={'Only Dogs'} sx={{ font: '20px VT323', color: '#000000' }}>Only Dogs</MenuItem>
            <MenuItem value={'Only Cats'} sx={{ font: '20px VT323', color: '#000000' }}>Only Cats</MenuItem>
            <MenuItem value={'No Pets'} sx={{ font: '20px VT323', color: '#000000' }}>No Pets</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)' }}>
            Smoking Policy
          </Typography>
          <TextField
            id="smoking"
            name="smoking"
            label="Select"
            fullWidth
            select
            size="small"
            variant="filled"
            margin="dense"
            value={formik.values.smoking}
            onFocus={formik.handleFocus}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              disableUnderline: true,
              sx: {color: '#000000', font: '20px VT323', "&.Mui-focused": { color: "#000000" }},
            }}
            InputLabelProps={{ 
              sx: {color: '#000000', font: '20px VT323', "&.Mui-focused": { color: "#696969" }},
              margin: 'dense',
              shrink: true,
            }}
            sx={{ width: 350 }}
          >
            <MenuItem value={'No Smoking'} sx={{ font: '20px VT323', color: '#000000' }}>No Smoking</MenuItem>
            <MenuItem value={'Smoking Permitted'} sx={{ font: '20px VT323', color: '#000000' }}>Smoking Permitted</MenuItem>
            <MenuItem value={'Outdoors Only'} sx={{ font: '20px VT323', color: '#000000' }}>Outdoors Only</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)' }}>
            Party Policy
          </Typography>
          <TextField
            id="party"
            name="party"
            label="Select"
            fullWidth
            select
            size="small"
            variant="filled"
            margin="dense"
            value={formik.values.party}
            onFocus={formik.handleFocus}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              disableUnderline: true,
              sx: {color: '#000000', font: '20px VT323', "&.Mui-focused": { color: "#000000" }},
            }}
            InputLabelProps={{ 
              sx: {color: '#000000', font: '20px VT323', "&.Mui-focused": { color: "#696969" }},
              margin: 'dense',
              shrink: true,
            }}
            sx={{ width: 350 }}
          >
            <MenuItem value={'No Parties'} sx={{ font: '20px VT323', color: '#000000' }}>No Parties</MenuItem>
            <MenuItem value={'Parties Permitted'} sx={{ font: '20px VT323', color: '#000000' }}>Parties Permitted</MenuItem>
            <MenuItem value={'Small Gatherings'} sx={{ font: '20px VT323', color: '#000000' }}>Small Gatherings</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)' }}>
            Cleaning Policy
          </Typography>
          <TextField
            id="cleaning"
            name="cleaning"
            label="Select"
            fullWidth
            select
            size="small"
            variant="filled"
            margin="dense"
            value={formik.values.cleaning}
            onFocus={formik.handleFocus}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              disableUnderline: true,
              sx: {color: '#000000', font: '20px VT323', "&.Mui-focused": { color: "#000000" }},
            }}
            InputLabelProps={{ 
              sx: {color: '#000000', font: '20px VT323', "&.Mui-focused": { color: "#696969" }},
              margin: 'dense',
              shrink: true,
            }}
            sx={{ width: 350 }}
          >
            <MenuItem value={'Host Responsibility'} sx={{ font: '20px VT323', color: '#000000' }}>Host Responsibility</MenuItem>
            <MenuItem value={'Guest Responsibility'} sx={{ font: '20px VT323', color: '#000000' }}>Guest Responsibility</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)' }}>
            Towels & Linens
          </Typography>
          <TextField
            id="linens"
            name="linens"
            label="Select"
            fullWidth
            select
            size="small"
            variant="filled"
            margin="dense"
            value={formik.values.linens}
            onFocus={formik.handleFocus}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              disableUnderline: true,
              sx: {color: '#000000', font: '20px VT323', "&.Mui-focused": { color: "#000000" }},
            }}
            InputLabelProps={{ 
              sx: {color: '#000000', font: '20px VT323', "&.Mui-focused": { color: "#696969" }},
              margin: 'dense',
              shrink: true,
            }}
            sx={{ width: 350 }}
          >
            <MenuItem value={'Provided'} sx={{ font: '20px VT323', color: '#000000' }}>Provided</MenuItem>
            <MenuItem value={'Not Provided'} sx={{ font: '20px VT323', color: '#000000' }}>Not Provided</MenuItem>
            <MenuItem value={'Only Linens'} sx={{ font: '20px VT323', color: '#000000' }}>Only Linens</MenuItem>
            <MenuItem value={'Only Towels'} sx={{ font: '20px VT323', color: '#000000' }}>Only Towels</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)' }}>
            Amenities
          </Typography>
          <Autocomplete
            id="amenities"
            name="amenities"
            multiple
            clearOnEscape
            freeSolo
            options={amenities}
            value={formik.values.amenities}
            onInputChange={formik.handleFocus}
            onChange={(event, value) => {
              formik.setFieldValue("amenities", value);
            }}
            onBlur={formik.handleBlur}
            ListboxProps={{ 
              sx: { font: '20px VT323', color: '#000000', "& :hover": {color: '#CC0000'} },
            }}
            sx={{ width: 350 }}
            renderInput={(params) => 
              <TextField 
                {...params} 
                id="amenities"
                name="amenities"
                label="Select or Add"
                fullWidth 
                size="small" 
                variant="filled" 
                margin="dense" 
                InputProps={{...params.InputProps, disableUnderline: true}}
                InputLabelProps={{ 
                  sx: {color: '#000000', font: '20px VT323', "&.Mui-focused": { color: "#696969" }},
                  margin: 'dense',
                  shrink: true,
                }}
                sx={textfield}
              />
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Stack direction="row" spacing={1}>
              <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)', mr: 40 }}>
                Description of Residence
              </Typography>
              <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '2px 2px 2px rgba(0,0,0,0.3)' }}>
                {charCount}/1000
              </Typography>
            </Stack>
            <TextField
              id="description"
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={4}
              maxRows={4}
              size="small"
              variant="filled"
              margin="dense"
              value={formik.values.description !== " " ? formik.values.description : residence?.description}
              onFocus={formik.handleFocus}
              onChange={(event) => handleDescription(event)}
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
              sx={{ width: 600 }}
            />
            <FormHelperText error={true} sx={{ font: '14px VT323', fontWeight: 'bold' }}>
              {formik.errors.description}
            </FormHelperText>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ mt: 2 }} />
          <Typography sx={{ font: '28px VT323', fontStyle: 'oblique', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', mt: 2, mb: 1 }}>
            Residence Images
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="column" alignItems="flex-start" spacing={2} sx={{ height: 50 }}>
            <Button 
              variant="contained" 
              component="label"
              size="small"
              endIcon={<AddAPhotoIcon sx={{ color: "#FFFFFF" }} />}
              sx={{  
                font: '26px VT323',
                fontWeight: 'bold',
                color: '#FFFFFF',
                textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
                height: '40px',
                background: '#CC0000',
                border: '3px solid #CC0000',
                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
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
              Upload
              <input hidden accept="image/*" multiple type="file" onChange={(event) => handleImageUpload(event)} />
            </Button>
          </Stack>
          {renderImages()}
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ mt: 2 }} />
          <Stack direction="column" alignItems="center" spacing={2} sx={{ height: 85, mb: 2 }}>
            <Button
              type="submit"
              id="residence-form"
              variant="contained"
              size="small"
              disabled={formDisabled}
              onClick={(event) => handleSubmit(event, formik.values)}
              sx={{  
                font: '30px VT323',
                fontWeight: 'bold',
                color: '#FFFFFF',
                textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
                height: '80px',
                background: '#CC0000',
                border: '3px solid #CC0000',
                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
                mt: 4,
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
              Update Residence
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};



const validationSchema = yup.object().shape({
  rooms: yup.number().min(0, 'Room count must be greater than 0.').max(50, 'Room count must be less than 50.'),
  beds: yup.number().min(0, 'Bed count must be greater than 0.').max(50, 'Bed count must be less than 50.'),
  baths: yup.number().min(0, 'Bath count must be greater than 0.').max(50, 'Bath count must be less than 50.'),
  description: yup.string().max(1000, 'Description cannont be longer than 1000 characters.'),
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
      thousandSeparator
      isNumericString
    />
  );
});

const root = {
  border: "2px solid grey",
  minHeight: 200,
  maxHeight: 200,
  color: "green",
  fontSize: 18,
  "& :hover": {
    color: "brown"
  },
  "& li": {
    border: "2px solid green",
    borderRadius: 4
  }
};

const textfield = {
  "& .MuiInputBase-input.MuiAutocomplete-input": {
    color: "#000000",
    font: '18px VT323',
  },
};

const msg1 = (
  <Typography sx={{ font: '18px VT323' }}>
    Successfully updated Residence.
  </Typography>
);

const msg2 = (
  <Typography sx={{ font: '18px VT323' }}>
    Unable to update residence at this time. Please try again later or contact support.
  </Typography>
);

const sqft = (
  <Typography sx={{color: '#000000', font: '20px VT323'}}>
    Sq. Ft.<sup>2</sup>
  </Typography>
);

const states = State.getStatesOfCountry('US');
const amenities = ["Air Conditioning", "Heating", "Doorman", "Pool", "Outdoor Space", "Wifi", "Washer", "Dryer", "Fitness Center", "Parking", "Patio or Balcony", "Pets Allowed", "Water Views", "Full Kitchen", "TV"];



export default EditResidenceForm;
