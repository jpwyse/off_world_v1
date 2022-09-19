import React, { Fragment, useEffect, useState, useContext, useMemo, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import useSWR from "swr";
import api from '../../utils/axios/api';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import redactkit from 'redactkit';

import ListingImages from '../components/ListingImages';
import SwapContractResidenceInfo from '../components/SwapContractResidenceInfo';
import SwapContractMemberInfo from '../components/SwapContractMemberInfo';
import SwapContractTimeInfo from '../components/SwapContractTimeInfo';




const SwapContractsInfo = ({contract, index, ...props}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [voidContractOpen, setVoidContractOpen] = useState(false);


  const handleVoidContract = () => {
    if (contract) {
      api.get(`api/swaps/void_contract/${contract?.id}`)
      .then((response) => {
        console.log(response.data);
        let successMsg = "The swap contract has successfully been voided.";
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
    }
  };



  return (
    <React.Fragment>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: -1.5 , mb: 0.5 }}>
        <Typography sx={{ font: '30px VT323', color: '#CC0000', fontWeight: 'bold', fontStyle: 'oblique', textShadow: '2px 3px 6px rgba(0,0,0,0.3)' }}>
          Swap Contract #{index}
        </Typography>
        {contract?.status === "Starting" ?
          <Stack direction="row" alignItems="baseline" spacing={1}>
            <Button
              id="void"
              name="void"
              variant="contained"
              size="small"
              onClick={() => setVoidContractOpen(true)} 
              sx={{  
                font: '28px VT323',
                fontWeight: 'bold',
                color: '#FFFFFF',
                textShadow: '2px 3px 4px rgba(0,0,0,0.3)',
                height: '36px',
                border: '3px solid #CC0000',
                background: '#CC0000',
                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;', 
                mr: 1,
                my: 1,
                pb: 1,
                '&:hover': { 
                  color: '#FFFFFF',
                  background: '#CC0000',
                  border: '3px solid #CC0000',
                  transform: 'scale(1.05)',
                  boxShadow: 'rgba(204, 0, 0, 0.19) 0px 10px 20px, rgba(204, 0, 0, 0.23) 0px 6px 6px;',
                }
              }}
            >
              Void
            </Button>
          </Stack>
        :
          null
        }
      </Stack>
      <Divider />
      <SwapContractResidenceInfo swap={contract?.swap} />
      <Divider />
      <SwapContractTimeInfo contract={contract} />
      <Divider />
      <SwapContractMemberInfo bidder={contract?.swap?.bidder} asker={contract?.swap?.asker} />
      <Dialog open={voidContractOpen} onClose={() => setVoidContractOpen(false)}>
        <DialogTitle>{voidWarningMsg}</DialogTitle>
        <DialogActions>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="small"
              onClick={handleVoidContract} 
              sx={{  
                font: '28px VT323',
                fontWeight: 'bold',
                color: '#CC0000',
                textShadow: '3px 4px 7px rgba(0,0,0,0.3)',
                border: '3px solid #CC0000',
                height: '40px',
                background: 'none',
                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;',
                '&:hover': { 
                  color: '#F5F5F5',
                  background: '#D73B3E',
                  border: '3px solid #D73B3E',
                  transform: 'scale(1.1)',
                  boxShadow: 'rgba(204, 0, 0, 0.19) 0px 10px 20px, rgba(204, 0, 0, 0.23) 0px 6px 6px;',
                }
              }}
            >
              Void
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => setVoidContractOpen(false)} 
              sx={{  
                font: '28px VT323',
                fontWeight: 'bold',
                color: '#00A86B',
                textShadow: '3px 4px 7px rgba(0,0,0,0.3)',
                border: '3px solid #00A86B',
                height: '40px',
                background: 'none',
                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;', 
                '&:hover': { 
                  color: '#F5F5F5',
                  background: '#00A86B',
                  border: '3px solid #00A86B',
                  transform: 'scale(1.1)',
                  boxShadow: 'rgba(0, 168, 107, 0.19) 0px 10px 20px, rgba(0, 168, 107, 0.23) 0px 6px 6px;',
                }
              }}
            >
              Nevermind
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default SwapContractsInfo;


const voidWarningMsg = (
  <Typography sx={{ font: '22px VT323', fontWeight: 'bold', color: '#000000', textShadow: '3px 4px 7px rgba(0,0,0,0.3)' }}>
    Are you sure you want to <u><i>void</i></u> and <u><i>cancel</i></u> this swap contract? This <u><i>action cannot be reversed</i></u> once done.
  </Typography>
);
