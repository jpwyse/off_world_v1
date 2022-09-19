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

const initialState = {
  isLoading: false,
  isAuth: false,
  token: localStorage.getItem('token'),
  user: null,
};


export default function (state = initialState, action) {
  switch (action.type) {
    
    case AUTH_SUCCESS:
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.data.token_key);
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        token: action.payload.data.token_key,
        user: action.payload.data.user,
      };
    case AUTH_FAIL:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuth: false,
        token: null,
        user: null,
      };
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}