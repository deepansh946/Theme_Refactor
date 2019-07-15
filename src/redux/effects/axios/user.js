import axios from 'axios';

import store from '../../index';
import {
	ADD_GLOBAL_MESSAGE,
	REMOVE_ERROR_MESSAGE,
	ADD_ERROR_MESSAGE,
	REMOVE_GLOBAL_MESSAGE,
	ADD_GLOBAL_LOADER,
	REMOVE_GLOBAL_LOADER,
} from '../../constants/ui_constant';

import errorCode from '../../../Utils/ec';
import { REQUEST_LOGOUT_SUCCESS } from '../../constants/auth_constant';

const { dispatch } = store;

const authAxiosInstance = axios.create({
	baseURL: 'https://devapi.customer.creditculturedemo.com/custom/',
});

// Add a request interceptor
authAxiosInstance.interceptors.request.use(
	function(config) {
		// dispatch global loader
		dispatch({ type: ADD_GLOBAL_LOADER });
		// dispatch remove error message
		dispatch({ type: REMOVE_ERROR_MESSAGE });
		// Do something before request is sent
		return config;
	},
	function(error) {
		// Do something with request error
		return Promise.reject(error);
	},
);

// Add a response interceptor
authAxiosInstance.interceptors.response.use(
	function(response) {
		const { data } = response;

		// remove global loader
		dispatch({ type: REMOVE_GLOBAL_LOADER });

		return response;
	},
	function(error) {
		const { response } = error;
		// remove global loader
		dispatch({ type: REMOVE_GLOBAL_LOADER });

		switch (response.data.errorCode) {
			case 51:
			case 104:
			case 165: {
				dispatch({
					type: ADD_ERROR_MESSAGE,
					payload: {
						code: response.data.errorCode,
						msg: errorCode[response.data.errorCode],
					},
				});
				break;
			}
			case 52: {
				dispatch({
					type: ADD_GLOBAL_MESSAGE,
					payload: {
						flash: true,
						message: errorCode[response.data.errorCode],
						messageType: 'error',
					},
				});
				break;
			}
			case 137: {
				localStorage.clear();
				dispatch({
					type: REQUEST_LOGOUT_SUCCESS,
				});
				window.location.reload();
				break;
			}
		}

		return Promise.reject(error);
	},
);

export default authAxiosInstance;
