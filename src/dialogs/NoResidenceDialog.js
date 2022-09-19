import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import FlipCameraAndroidOutlinedIcon from '@mui/icons-material/FlipCameraAndroidOutlined';
import MultipleStopOutlinedIcon from '@mui/icons-material/MultipleStopOutlined';
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import redactkit from 'redactkit';

const SwapDialog = ({listingAsk, listingBid, ..props}) => {
  return (
    <React.Fragment>
      <Dialog open={swapContractOpen} onClose={props.handleSwapContractClose} fullWidth maxWidth='xl'>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography sx={{ font: '34px VT323', fontWeight: 'bold', color: '#CC0000', textShadow: '2px 3px 4px rgba(0,0,0,0.3)', m: 1 }}>
            Swap Terms Review
          </Typography>
          <IconButton onClick={handleSwapContractClose}>
            <CloseIcon sx={{ height: 30, width: 30, color: "#CC0000", m: 1, '&:hover': { transform: 'scale(1.1)' } }} />
          </IconButton>
        </Stack>
        <DialogContent dividers>
          {swapContractLoading ? 
            <Loading /> 
          : 
            <SwapContract listingAsk={listingAsk} listingBid={listingBid} />
          }
        </DialogContent>
        <DialogContentText sx={{ font: '22px VT323', color: '#696969', px: 2, py: 1 }}>
          Please review all the information within this swap offer contract and then click the "Submit"  
          button to submit your swap offer.  
        </DialogContentText>
        <DialogActions>
          <Button
            variant="contained"
            size="small"
            onClick={props.handleSwapSubmit} 
            sx={{  
              font: '30px VT323',
              fontWeight: 'bold',
              color: '#FFFFFF',
              textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
              border: '3px solid #CC0000',
              background: '#CC0000',
              boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;', 
              height: '36px',
              mr: 1,
              my: 1,
              '&:hover': { 
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
          <Button
            variant="contained"
            size="small"
            onClick={props.handleSwapContractClose}
            sx={{  
              font: '30px VT323',
              fontWeight: 'bold',
              color: '#FFFFFF',
              textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
              border: '3px solid #CC0000',
              background: '#CC0000',
              boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;', 
              height: '36px',
              mr: 1,
              my: 1,
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
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default SwapDialog;