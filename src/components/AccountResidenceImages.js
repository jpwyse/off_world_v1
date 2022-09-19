import React, { useEffect, useState } from "react";
import { useSnackbar } from 'notistack';
import api from '../utils/axios/api';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';



const AccountResidenceImages = ({residence, ...props}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const theme = useTheme();
  const [images, setImages] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;


  useEffect(() => {
    const fetchResidenceImages = async () => {
      try {
        const response = await api.get(`api/residences/images/${residence}`);
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
    if (residence) {
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

  return (
    <React.Fragment>
      <Box sx={{ borderBottom: "1px solid #DCDCDC" }}>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          sx={swipeDots}
        >
          {images.map((img, index) => (
            <div key={img.url}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: "100%",
                    width: "100%",
                    m: 'auto',
                  }}
                  src={img.url}
                  alt={null}
                />
              ) : null}
            </div>
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
}

export default AccountResidenceImages;


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const swipeDots = {
  "& .MuiMobileStepper-dotActive": {
    color: "#D73B3E",
  },
};
