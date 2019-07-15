import axios from 'axios';
import moment from 'moment';
import errorCode from '../../../Utils/ec';
import store from '../../index';
import {
  ADD_GLOBAL_MESSAGE,
  REMOVE_ERROR_MESSAGE,
  ADD_ERROR_MESSAGE,
  REMOVE_GLOBAL_MESSAGE
} from '../../constants/ui_constant';

const { dispatch } = store;

const authAxiosInstance = axios.create({
  baseURL: '' // Insert base URL here
});

// Add a request interceptor
authAxiosInstance.interceptors.request.use(
  function(config) {
    const { data } = config;

    // don't remove global message
    if (
      !['sendPhoneCode', 'resendMfaCode', 'refreshSession'].includes(
        data['action']
      )
    ) {
      dispatch({ type: REMOVE_GLOBAL_MESSAGE });
    }

    // dispatch remove error message
    dispatch({ type: REMOVE_ERROR_MESSAGE });
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
authAxiosInstance.interceptors.response.use(
  function(response) {
    // Do something with response data
    const { data } = response;

    switch (data.challengeCode) {
      case 153: {
        dispatch({
          type: ADD_GLOBAL_MESSAGE,
          payload: {
            flash: true,
            message: `Verification code already sent  ${moment(data.duration)
              .add(5, 'hours')
              .add(30, 'minutes')
              .startOf('hour')
              .fromNow()}`,
            messageType: 'success'
          }
        });
        break;
      }
    }

    return response;
  },
  function(error) {
    const { response } = error;
    if (response.status === 500) {
      dispatch({
        type: ADD_GLOBAL_MESSAGE,
        payload: {
          flash: true,
          message: 'Something went wrong.',
          messageType: 'error'
        }
      });
    } else if (response.status === 401) {
      // clear all the items from localstorage
      const deviceData = localStorage.getItem('deviceData') || undefined;
      localStorage.clear();
      if (deviceData) localStorage['deviceData'] = deviceData;
      dispatch({
        type: ADD_GLOBAL_MESSAGE,
        payload: {
          flash: true,
          message: 'Something went wrong.',
          messageType: 'error',
          sessionExpired: true
        }
      });
    } else {
      switch (response.data.errorCode) {
        case 47:
        case 48:
        case 104:
        case 115:
        case 116:
        case 117:
        case 118:
        case 132:
        case 165: {
          dispatch({
            type: ADD_ERROR_MESSAGE,
            payload: {
              code: response.data.errorCode,
              msg: errorCode[response.data.errorCode]
            }
          });
          break;
        }

        case 52:
        case 53:
        case 102:
        case 105:
        case 107:
        case 108:
        case 109:
        case 112:
        case 113:
        case 114:
        case 131:
        case 132:
        case 133:
        case 136:
        case 134:
        case 135:
        case 166:
        case 167:
        case 168: {
          // clear localStorage
          if (response.data.errorCode === 131) {
            localStorage.clear();
          }

          dispatch({
            type: ADD_GLOBAL_MESSAGE,
            payload: {
              flash: true,
              message: errorCode[response.data.errorCode],
              messageType: 'error',
              sessionExpired: response.data.errorCode === 131
            }
          });
          break;
        }
      }
    }
    // Do something with response error
    return Promise.reject(error);
  }
);

export default authAxiosInstance;
