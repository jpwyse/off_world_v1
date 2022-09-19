import React, { Fragment, useEffect, useState, useContext, useMemo, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import api from '../utils/axios/api';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Badge from '@mui/material/Badge';
import "@fontsource/vt323";
import AccountSwaps from '../components/AccountSwaps';
import AccountListings from '../components/AccountListings';
import AccountUser from '../components/AccountUser';



const AccountPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '80%', pb: 10 }}>
      <Grid container sx={{ width: '100%' }} >
        <Grid item xs="auto" sx={{ bgcolor: 'background.paper', boxShadow: 1 }}>
          <Stack direction="row"  alignItems="flex-start">
            <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleChange} sx={{ borderRight: 1, borderColor: 'divider', alignItems: 'flex-start', height: 850 }}>
              <Tab label="Account" {...a11yProps(0)} sx={{ font: '34px VT323', color: '#000000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', "&:hover": {color: "#CC0000", fontWeight: "bold", transform: 'scale(1.02)'}, "&.Mui-selected": {color: "#CC0000", fontWeight: "bold"} }} />
              <Tab label="Swaps" {...a11yProps(1)}  sx={{ font: '34px VT323', color: '#000000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', "&:hover": {color: "#CC0000", fontWeight: "bold", transform: 'scale(1.02)'}, "&.Mui-selected": {color: "#CC0000", fontWeight: "bold"} }} />
              <Tab label="Listings" {...a11yProps(2)} sx={{ font: '34px VT323', color: '#000000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', "&:hover": {color: "#CC0000", fontWeight: "bold", transform: 'scale(1.02)'}, "&.Mui-selected": {color: "#CC0000", fontWeight: "bold"} }} />
            </Tabs>
          </Stack>
        </Grid>
        <Grid item sm={2} md={8} lg={10} sx={{ bgcolor: 'background.paper', boxShadow: 1 }}>
          <TabPanel value={value} index={0} >
            <AccountUser />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AccountSwaps />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AccountListings />
          </TabPanel>
        </Grid>
      </Grid>
    </Box>
  );
};


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ flexGrow: 1, overflow: 'auto', whiteSpace: 'normal', height: 850 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default AccountPage;
