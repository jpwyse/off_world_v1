import api from '../../utils/axios/api';
import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  ACTIVATE_SUCCESS,
  ACTIVATE_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOADING,
} from '../actions/types';



// SIGNUP USER
export const register = ({ firstname, lastname, username, email, phone, dob, gender, password, passcode }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ firstname, lastname, username, email, phone, dob, gender, password, passcode });

  api
    .post('/api/users/register', body, config)
    .then((response) => {
      console.log(response);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error.response);
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response,
      });
    });
};


// LOGIN USER
export const login = ({ username, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ username, password });

  api
    .post('/api/users/login', body, config)
    .then((response) => {
      console.log(response);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error.response);
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response,
      });
    });
};



export const authenticate = () => (dispatch, getState) => {
  // Account Activated
  dispatch({ type: LOADING });

  api
    .get('/api/users/auth', tokenConfig(getState))
    .then((response) => {
      //console.log(response);
      dispatch({
        type: AUTH_SUCCESS,
        payload: response,
      });
    })
    .catch((error) => {
      //console.log(error.response);
      dispatch({
        type: AUTH_FAIL,
        payload: error.response,
      });
    });
};



// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  api
    .get('/api/users/logout', tokenConfig(getState))
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error.response);
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: error.response,
      });
    });
};





// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;
  
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  } 
  return config;
};
