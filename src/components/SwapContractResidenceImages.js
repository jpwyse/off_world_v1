import React, { useEffect, useState } from "react";
import { useSnackbar } from 'notistack';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ErrorIcon from '@mui/icons-material/Error';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Image from 'mui-image';
import axios from "axios";
import api from '../../utils/axios/api';
import ImageGallery from "react-image-gallery";
import '../design/css/image-gallery.scss';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import "@fontsource/vt323";

const SwapContractResidenceImages = ({residence_id, ...props}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const theme = useTheme();
  const [images, setImages] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;


  useEffect(() => {
    const fetchResidenceImages = async () => {
      try {
        const response = await api.get(`api/residences/images/${residence_id}`);
        setImages(response.data);
      } catch (error) {
        console.log('error', error.response);
        let errMsg = "Error loading residence images.";
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
    if (residence_id) {
      fetchResidenceImages();
    }
  }, []);


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  

  const renderImages = () => {
    if (images) {
      return (
        <React.Fragment>
          <Box sx={{ width: 325, border: "1px solid #DCDCDC" }}>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
              sx={swipeDots}
            >
              {images.map((img, index) => (
                <Stack key={img.url} direction="column" alignItems="center">
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Box
                      component="img"
                      sx={{
                        height: 205,
                        width: "100%",
                        m: 'auto',
                      }}
                      src={img.url}
                      alt={null}
                    />
                  ) : null}
                </Stack>
              ))}
            </SwipeableViews>
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              sx={swipeDots}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                  sx={{ font: '18px VT323', fontWeight: 'bold', color: '#696969' }}
                >
                  Next
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0} sx={{ font: '18px VT323', fontWeight: 'bold', color: '#696969' }}>
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </Box>
        </React.Fragment>
      );
    } else {
      return (
        <Box component="span" sx={{ font: '28px VT323', mt: 1 }}>
          Loading images...
        </Box>
      );
    }
  };

  return (
    renderImages()
  );
};

export default SwapContractResidenceImages;

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const swipeDots = {
  "& .MuiMobileStepper-dotActive": {
    color: "#D73B3E",
  },
};