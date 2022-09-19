import React, { Fragment, useEffect, useState, useContext, useMemo, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import api from '../utils/axios/api';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import redactkit from 'redactkit';



const ResidenceDisplay = ({residence, ...props}) => {
  const [expanded, setExpanded] = useState(false);
  var redact = require('redactkit');
  
  let address = residence?.address;
  
  const amenitiesInfo1 = (
    residence?.amenities?.slice(0, 4).map(amenity => (
      <React.Fragment>
        <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '0px 2px 2px rgba(0,0,0,0.3)' }}>
          • {amenity}
        </Typography>
      </React.Fragment>
    ))
  );

  const amenitiesInfo2 = (
   residence?.amenities?.slice(4, 8).map(amenity => (
      <React.Fragment>
        <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '0px 2px 2px rgba(0,0,0,0.3)' }}>
          • {amenity}
        </Typography>
      </React.Fragment>
    ))
  );

  const amenitiesInfo3 = (
   residence?.amenities?.slice(8, 12).map(amenity => (
      <React.Fragment>
        <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '0px 2px 2px rgba(0,0,0,0.3)' }}>
          • {amenity}
        </Typography>
      </React.Fragment>
    ))
  );

  const amenitiesInfo4 = (
   residence?.amenities?.slice(12, 16).map(amenity => (
      <React.Fragment>
        <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '0px 2px 2px rgba(0,0,0,0.3)' }}>
          • {amenity}
        </Typography>
      </React.Fragment>
    ))
  );


  const cardTitle = (
    <Stack direction="column" alignItems="center" justifyContent="space-evenly" spacing={1} sx={{ mb: -1 }}>
      <Typography sx={{ font: '42px VT323', fontWeight: 'bold', color: '#D73B3E', textShadow: '2px 3px 4px rgba(0,0,0,0.3)' }}>
        Residence Name
      </Typography>
      <Typography sx={{ font: '34px VT323', color: '#696969', textShadow: '2px 3px 2px rgba(0,0,0,0.3)' }}>
        {residence?.name}
      </Typography>
    </Stack>
  );


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        title={cardTitle}
      />
      <CardContent>
        <Divider />
        <Stack direction="column" alignItems="center" justifyContent="space-evenly" spacing={1} sx={{ mt: 1, mb: 2 }}>
          <Typography sx={{ font: '38px VT323', fontWeight: 'bold', color: '#D73B3E', textShadow: '2px 3px 4px rgba(0,0,0,0.3)' }}>
            Address
          </Typography>
          <Typography sx={{ font: '32px VT323', fontWeight: 'bold', color: '#696969', textShadow: '2px 3px 2px rgba(0,0,0,0.3)' }}>
            {address ? redact(address) : "Concealed Until Confirmation"}
          </Typography>
          <Typography align='center' sx={{ font: '32px VT323', color: '#696969', textShadow: '2px 3px 2px rgba(0,0,0,0.3)' }}>
            {residence?.city}, {residence?.state} {residence?.zip_code}
          </Typography>
        </Stack>
        <Divider />
        <Typography align="center" sx={{ font: '36px VT323', fontWeight: 'bold', color: '#D73B3E', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', mt: 1, mb: 1.5 }}>
          Highlights
        </Typography>
         <Stack direction="row" alignItems="baseline" justifyContent="space-evenly" divider={<Divider orientation="vertical" flexItem />} spacing={1} sx={{ mt: 2.5, mb: 2 }}>
          <Stack direction="column" alignItems="center" justifyContent="center" spacing={1}>
            <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '0px 2px 2px rgba(0,0,0,0.3)' }}>
              Neighborhood:
            </Typography>
            <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '0px 2px 2px rgba(0,0,0,0.3)' }}>
              {residence?.neighborhood}
            </Typography>
          </Stack>
          <Stack direction="column" alignItems="center" justifyContent="center" spacing={1}>
            <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '0px 2px 2px rgba(0,0,0,0.3)' }}>
              Property Type:
            </Typography>
            <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '0px 2px 2px rgba(0,0,0,0.3)' }}>
              {residence?.building}
            </Typography>
          </Stack>
          <Stack direction="column" alignItems="center" justifyContent="center" spacing={1}>
            <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '0px 2px 2px rgba(0,0,0,0.3)' }}>
              Arrangement:
            </Typography>
            <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '0px 2px 2px rgba(0,0,0,0.3)'  }}>
              {residence?.arrangement}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Typography align="center" sx={{ font: '36px VT323', fontWeight: 'bold', color: '#D73B3E', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', mt: 1, mb: 1.5 }}>
          Details
        </Typography>
        <Stack direction="row" alignItems="baseline" justifyContent="space-evenly" divider={<Divider orientation="vertical" flexItem />} spacing={2} sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Typography sx={{ font: '22px VT323',  color: '#696969', textShadow: '0px 2px 2px rgba(0,0,0,0.3)' }}>
              Rooms: 
            </Typography>
            <Typography sx={{ font: '22px VT323',  color: '#696969', textShadow: '0px 2px 2px rgba(0,0,0,0.3)' }}>
              {residence?.rooms}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '0px 2px 2px rgba(0,0,0,0.3)' }}>
              Bedrooms:
            </Typography>
            <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '0px 2px 2px rgba(0,0,0,0.3)' }}>
              {residence?.beds}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '0px 2px 2px rgba(0,0,0,0.3)' }}>
              Bathrooms:
            </Typography>
            <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '0px 2px 2px rgba(0,0,0,0.3)' }}>
              {residence?.baths}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="baseline" justifyContent="space-evenly" divider={<Divider orientation="vertical" flexItem />} spacing={2} sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '0px 2px 2px rgba(0,0,0,0.3)' }}>
              Pet Policy:
            </Typography>
            <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '0px 2px 2px rgba(0,0,0,0.3)' }}>
              {residence?.pets}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '0px 2px 2px rgba(0,0,0,0.3)' }}>
              Sq. Ft.:
            </Typography>
            <Typography sx={{ font: '22px VT323', color: '#696969', textShadow: '0px 2px 2px rgba(0,0,0,0.3)' }}>
              {residence?.sq_ft}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
      </CardContent>
      <CardActions disableSpacing>
        { expanded ?
          <Button
            variant="contained"
            size="small"
            endIcon={ expanded ? <KeyboardArrowDownIcon sx={{ color: '#FAF0E6' }} /> : <KeyboardArrowUpIcon sx={{ color: '#FAF0E6' }} /> }
            onClick={handleExpandClick}
            sx={{  
              font: '22px VT323',
              fontWeight: 'bold',
              color: '#FAF0E6',
              textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
              border: '3px solid #D73B3E',
              height: '36px',
              background: '#D73B3E',
              boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;', 
              m: 'auto',
              mb: 2,
              '&:hover': { 
                color: '#FAF0E6',
                background: '#D73B3E',
                border: '3px solid #FAF0E6',
                transform: 'scale(1.05)',
                boxShadow: 'rgba(105, 105, 105, 0.19) 0px 10px 20px, rgba(105, 105, 105, 0.23) 0px 6px 6px;',
              }
            }}
          >
            Collapse
          </Button>
        :
          <Button
            variant="contained"
            size="small"
            endIcon={ expanded ? <KeyboardArrowDownIcon sx={{ color: '#FAF0E6' }} /> : <KeyboardArrowUpIcon sx={{ color: '#FAF0E6' }} /> }
            onClick={handleExpandClick}
           sx={{  
              font: '22px VT323',
              fontWeight: 'bold',
              color: '#FAF0E6',
              textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
              border: '3px solid #D73B3E',
              height: '36px',
              background: '#D73B3E',
              boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;', 
              m: 'auto',
              mb: 1,
              '&:hover': { 
                color: '#FAF0E6',
                background: '#D73B3E',
                border: '3px solid #FAF0E6',
                transform: 'scale(1.05)',
                boxShadow: 'rgba(105, 105, 105, 0.19) 0px 10px 20px, rgba(105, 105, 105, 0.23) 0px 6px 6px;',
              }
            }}
          >
            Expand
          </Button>
        }
      </CardActions>
      { expanded ? <Divider /> : null }
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography align="center" sx={{ font: '36px VT323', fontWeight: 'bold', color: '#D73B3E', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', mb: 1.5 }}>
            Amenities
          </Typography>
          <Stack direction='row' justifyContent="space-evenly" alignItems="flex-start" divider={<Divider orientation="vertical" flexItem />}  sx={{ my: residence?.amenities?.length > 4 ? 2 : 2 }}>
            {amenitiesInfo1}
          </Stack>
          { residence?.amenities && residence?.amenities?.length > 4 ?
            <Stack direction='row' justifyContent="space-evenly" alignItems="flex-start" divider={<Divider orientation="vertical" flexItem />}  sx={{ my: residence?.amenities?.length > 4 ? 2 : 1 }}>
              {amenitiesInfo2}
            </Stack>
          :
            null
          }
          { residence?.amenities && residence?.amenities?.length > 8 ?
            <Stack direction='row' justifyContent="space-evenly" alignItems="flex-start" divider={<Divider orientation="vertical" flexItem />}  sx={{ my: residence?.amenities?.length > 4 ? 2 : 1 }}>
              {amenitiesInfo3}
            </Stack>
          :
            null
          }
          { residence?.amenities && residence?.amenities?.length > 12 ?
            <Stack direction='row' justifyContent="space-evenly" alignItems="flex-start" divider={<Divider orientation="vertical" flexItem />}  sx={{ my: residence?.amenities?.length > 4 ? 2 : 1 }}>
              {amenitiesInfo4}
            </Stack>
          :
            null
          }
          <Divider />
          <Typography align="center" sx={{ font: '36px VT323', fontWeight: 'bold', color: '#D73B3E', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', my: 1.5 }}>
            Description
          </Typography>
          <Typography paragraph sx={{ font: '20px VT323', color: '#696969', textShadow: '0px 2px 2px rgba(0,0,0,0.3)', mt: 1.5 }}>
            {residence?.description}
          </Typography>
          <Divider />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ResidenceDisplay;
