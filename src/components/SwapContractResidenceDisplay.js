import React, { Fragment, useEffect, useState, useContext, useMemo, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
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





const SwapContractResidenceDisplay = ({residence, ...props}) => {
  const [expanded, setExpanded] = useState(false);
  



  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  
  const amenitiesInfo1 = (
    residence?.amenities?.slice(0, 4).map(amenity => (
      <React.Fragment>
        <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
          <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
            •
          </Typography>
          <Typography sx={{ font: '24px VT323', color: '#CC0000', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
            {amenity}
          </Typography>
        </Stack>
      </React.Fragment>
    ))
  );

  const amenitiesInfo2 = (
    residence?.amenities?.slice(4, 8).map(amenity => (
      <React.Fragment>
        <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
          <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
            •
          </Typography>
          <Typography sx={{ font: '24px VT323', color: '#CC0000', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
            {amenity}
          </Typography>
        </Stack>
      </React.Fragment>
    ))
  );

  const amenitiesInfo3 = (
    residence?.amenities?.slice(8, 12).map(amenity => (
      <React.Fragment>
        <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
          <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
            •
          </Typography>
          <Typography sx={{ font: '24px VT323', color: '#CC0000', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
            {amenity}
          </Typography>
        </Stack>
      </React.Fragment>
    ))
  );

  const amenitiesInfo4 = (
    residence?.amenities?.slice(12, 16).map(amenity => (
      <React.Fragment>
        <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
          <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
            •
          </Typography>
          <Typography sx={{ font: '24px VT323', color: '#CC0000', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
            {amenity}
          </Typography>
        </Stack>
      </React.Fragment>
    ))
  );

  const amenitiesInfo5 = (
    residence?.amenities?.slice(16, 20).map(amenity => (
      <React.Fragment>
        <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
          <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
            •
          </Typography>
          <Typography sx={{ font: '24px VT323', color: '#CC0000', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
            {amenity}
          </Typography>
        </Stack>
      </React.Fragment>
    ))
  );

  const amenitiesInfo6 = (
    residence?.amenities?.slice(20, 24).map(amenity => (
      <React.Fragment>
        <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
          <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
            •
          </Typography>
          <Typography sx={{ font: '24px VT323', color: '#CC0000', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
            {amenity}
          </Typography>
        </Stack>
      </React.Fragment>
    ))
  );



  const cardTitle = (
    <Stack direction="column" alignItems="center" justifyContent="space-evenly" sx={{ mt: -2, mb: -2.25 }}>
      <Typography sx={{ font: '40px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', mb: 1 }}>
        Name
      </Typography>
      <Typography sx={{ font: '36px VT323', color: '#696969', textShadow: '2px 3px 3px rgba(0,0,0,0.3)' }}>
        {residence?.name}
      </Typography>
    </Stack>
  );



  return (
    <Card sx={{ width: "100%", border: "none", boxShadow: "none" }}>
      <CardHeader
        title={cardTitle}
      />
      <CardContent>
        <Divider />
        <Stack direction="column" alignItems="center" justifyContent="space-evenly" spacing={1} sx={{ mt: 1, mb: 2 }}>
          <Typography align='center' sx={{ font: '40px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)' }}>
            Address
          </Typography>
          <Typography align='center' sx={{ font: '36px VT323', color: '#696969', textShadow: '2px 3px 3px rgba(0,0,0,0.3)' }}>
            {residence?.address}
          </Typography>
          <Typography align='center' sx={{ font: '36px VT323', color: '#696969', textShadow: '2px 3px 3px rgba(0,0,0,0.3)' }}>
            {residence?.city}, {residence?.state} {residence?.zip_code}
          </Typography>
        </Stack>
        <Divider />
        <Typography align="center" sx={{ font: '40px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', mt: 1 }}>
          Residence
        </Typography>
         <Stack direction="row" alignItems="baseline" justifyContent="space-around" divider={<Divider orientation="vertical" flexItem />} spacing={1} sx={{ mt: 2.5, mb: 2 }}>
          <Stack direction="column" alignItems="center" justifyContent="center" spacing={1}>
            <Typography sx={{ font: '26px VT323', color: '#696969', textShadow: '2px 2px 3px rgba(0,0,0,0.3)' }}>
              Neighborhood:
            </Typography>
            <Typography sx={{ font: '28px VT323', color: '#CC0000', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
              {residence?.neighborhood}
            </Typography>
          </Stack>
          <Stack direction="column" alignItems="center" justifyContent="center" spacing={1}>
            <Typography sx={{ font: '26px VT323', color: '#696969', textShadow: '2px 2px 3px rgba(0,0,0,0.3)' }}>
              Residence Type:
            </Typography>
            <Typography sx={{ font: '28px VT323', color: '#CC0000', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
              {residence?.building}
            </Typography>
          </Stack>
          <Stack direction="column" alignItems="center" justifyContent="center" spacing={1}>
            <Typography sx={{ font: '26px VT323', color: '#696969', textShadow: '2px 2px 3px rgba(0,0,0,0.3)'  }}>
              Arrangement:
            </Typography>
            <Typography sx={{ font: '28px VT323', color: '#CC0000', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
              {residence?.arrangement}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Typography align="center" sx={{ font: '40px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', mt: 1, mb: 2 }}>
          Specifications
        </Typography>
        <Stack direction="row" alignItems="baseline" justifyContent="space-evenly" divider={<Divider orientation="vertical" flexItem />} spacing={2} sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Typography sx={{ font: '26px VT323', color: '#696969', textShadow: '2px 2px 3px rgba(0,0,0,0.3)'  }}>
              Bedrooms:
            </Typography>
            <Typography sx={{ font: '28px VT323', color: '#CC0000', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
              {residence?.beds}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Typography sx={{ font: '26px VT323', color: '#696969', textShadow: '2px 2px 3px rgba(0,0,0,0.3)'  }}>
              Bathrooms:
            </Typography>
            <Typography sx={{ font: '28px VT323', color: '#CC0000', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
              {residence?.baths}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Typography sx={{ font: '26px VT323',  color: '#696969', textShadow: '2px 2px 3px rgba(0,0,0,0.3)'  }}>
              Total Rooms: 
            </Typography>
            <Typography sx={{ font: '28px VT323', color: '#CC0000', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
              {residence?.rooms}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="baseline" justifyContent="center" spacing={1}>
            <Typography sx={{ font: '26px VT323', color: '#696969', textShadow: '2px 2px 3px rgba(0,0,0,0.3)'  }}>
              Area:
            </Typography>
            <Typography sx={{ font: '28px VT323', color: '#CC0000', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
              {residence?.sq_ft} ft<sup>2</sup>
            </Typography>
          </Stack>
        </Stack>
        <Divider />
      </CardContent>
      <CardActions disableSpacing>
        { !expanded ?
          <Button
            variant="contained"
            size="small"
            endIcon={<KeyboardArrowUpIcon sx={{ color: "#FFFFF", height: 25, width: 25 }} />}
            onClick={handleExpandClick}
            sx={{  
              font: '26px VT323',
              fontWeight: 'bold',
              color: '#FFFFFF',
              textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
              height: '36px',
              background: '#CC0000',
              border: '3px solid #CC0000',
              boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
              m: 'auto',
              mt: -1,
              mb: 1,
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
            Expand
          </Button>
        :
          <Button
            variant="contained"
            size="small"
            endIcon={<KeyboardArrowDownIcon sx={{ color: "#FFFFF", height: 25, width: 25 }} />}
            onClick={handleExpandClick}
            sx={{  
              font: '26px VT323',
              fontWeight: 'bold',
              color: '#FFFFFF',
              textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
              height: '36px',
              background: '#CC0000',
              border: '3px solid #CC0000',
              boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
              m: 'auto',
              mt: -1,
              mb: 1,
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
            Collapse
          </Button>
        }
      </CardActions>
      { expanded ? <Divider /> : null }
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography align="center" sx={{ font: '40px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', mt: -1, mb: 2 }}>
            Policies
          </Typography>
          <Stack direction="row" alignItems="baseline" justifyContent="space-evenly" divider={<Divider orientation="vertical" flexItem />} spacing={2} sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
              <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 2px 3px rgba(0,0,0,0.3)'  }}>
                Pets:
              </Typography>
              <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                {residence?.pets}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
              <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 2px 3px rgba(0,0,0,0.3)'  }}>
                Smoking:
              </Typography>
              <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                {residence?.smoking}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
              <Typography sx={{ font: '24px VT323',  color: '#696969', textShadow: '2px 2px 3px rgba(0,0,0,0.3)'  }}>
                Parties: 
              </Typography>
              <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                {residence?.party}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="baseline" justifyContent="space-evenly" divider={<Divider orientation="vertical" flexItem />} spacing={2} sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
              <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 2px 3px rgba(0,0,0,0.3)'  }}>
                Cleaning:
              </Typography>
              <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                {residence?.cleaning}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
              <Typography sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 2px 3px rgba(0,0,0,0.3)'  }}>
                Linens & Towels:
              </Typography>
              <Typography sx={{ font: '26px VT323', color: '#CC0000', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
                {residence?.linens}
              </Typography>
            </Stack>
          </Stack>
          <Divider />
          <Typography align="center" sx={{ font: '40px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', mb: 2, mt: 1 }}>
            Amenities
          </Typography>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-evenly" divider={<Divider orientation="vertical" flexItem />}  sx={{ my: residence?.amenities?.length > 4 ? 2 : 2 }}>
            {amenitiesInfo1}
          </Stack>
          { residence?.amenities && residence?.amenities?.length > 4 ?
            <Stack direction="row" alignItems="flex-start" justifyContent="space-evenly" divider={<Divider orientation="vertical" flexItem />}  sx={{ my: residence?.amenities?.length > 4 ? 2 : 1 }}>
              {amenitiesInfo2}
            </Stack>
          :
            null
          }
          { residence?.amenities && residence?.amenities?.length > 8 ?
            <Stack direction="row" alignItems="flex-start" justifyContent="space-evenly" divider={<Divider orientation="vertical" flexItem />}  sx={{ my: residence?.amenities?.length > 4 ? 2 : 1 }}>
              {amenitiesInfo3}
            </Stack>
          :
            null
          }
          { residence?.amenities && residence?.amenities?.length > 12 ?
            <Stack direction="row" alignItems="flex-start" justifyContent="space-evenly" divider={<Divider orientation="vertical" flexItem />}  sx={{ my: residence?.amenities?.length > 4 ? 2 : 1 }}>
              {amenitiesInfo4}
            </Stack>
          :
            null
          }
          { residence?.amenities && residence?.amenities?.length > 16 ?
            <Stack direction="row" alignItems="flex-start" justifyContent="space-evenly" divider={<Divider orientation="vertical" flexItem />}  sx={{ my: residence?.amenities?.length > 4 ? 2 : 1 }}>
              {amenitiesInfo5}
            </Stack>
          :
            null
          }
          { residence?.amenities && residence?.amenities?.length > 20 ?
            <Stack direction="row" alignItems="flex-start" justifyContent="space-evenly" divider={<Divider orientation="vertical" flexItem />}  sx={{ my: residence?.amenities?.length > 4 ? 2 : 1 }}>
              {amenitiesInfo6}
            </Stack>
          :
            null
          }
          <Divider />
          <Typography align="center" sx={{ font: '40px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', mt: 1, mb: 2 }}>
            Description
          </Typography>
          <Typography paragraph sx={{ font: '24px VT323', color: '#696969', textShadow: '2px 3px 6px rgba(0,0,0,0.3)', mt: 1.5 }}>
            {residence?.description}
          </Typography>
          <Divider />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default SwapContractResidenceDisplay;
