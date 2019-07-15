import {
	USER_PASSWORD_UPDATE,
	USER_PASSWORD_UPDATE_SUCCESS,
	USER_PASSWORD_UPDATE_FAIL,
	GET_USER_INFO,
	GET_USER_INFO_SUCCESS,
	GET_USER_INFO_FAIL,
	GET_USER_DEVICE,
	GET_USER_DEVICE_SUCCESS,
	GET_USER_DEVICE_FAIL,
	FORGOT_USER_DEVICE,
	FORGOT_USER_DEVICE_SUCCESS,
	FORGOT_USER_DEVICE_FAIL,
	FORGOT_USER_ALL_DEVICE,
	FORGOT_USER_ALL_DEVICE_SUCCESS,
	FORGOT_USER_ALL_DEVICE_FAIl,
} from '../constants/user_constant';
import {
	ADD_GLOBAL_MESSAGE,
	ADD_ERROR_MESSAGE,
} from '../constants/ui_constant';
import { forgotUserDevice } from '../../Utils/common';
import axios from './axios/user';

export const get_user_ui$ = ({ action, payload }) => {
	return async (dispatch) => {
		try {
			dispatch({ type: GET_USER_INFO });
			// update payload
			const { idToken } = payload;
			delete payload.idToken;

			const { status, data } = await axios({
				url: '/settings',
				method: 'POST',
				data: {
					action,
					payload,
				},
				headers: {
					Authorization: `Bearer ${idToken}`,
				},
			});

			if (status === 200) {
				return dispatch({
					type: GET_USER_INFO_SUCCESS,
					payload: { ...data.body },
				});
			}
		} catch (error) {
			return dispatch({ type: GET_USER_INFO_FAIL });
		}
	};
};

export const get_user_devices$ = ({ action, payload }) => {
	return async (dispatch) => {
		try {
			dispatch({ type: GET_USER_DEVICE });
			// update payload
			const { idToken } = payload;
			delete payload.idToken;

			const { status, data } = await axios({
				method: 'POST',
				url: '/settings',
				data: {
					action,
					payload,
				},
				headers: {
					Authorization: `Bearer ${idToken}`,
				},
			});

			if (status === 200) {
				return dispatch({
					type: GET_USER_DEVICE_SUCCESS,
					payload: { devices: data.body },
				});
			}
		} catch (error) {
			return dispatch({ type: GET_USER_DEVICE_FAIL });
		}
	};
};

export const forgot_user_device$ = ({ action, payload }) => {
	return async (dispatch) => {
		try {
			dispatch({ type: FORGOT_USER_DEVICE });

			// update payload
			const { idToken } = payload;
			delete payload.idToken;

			const { status } = await axios({
				method: 'POST',
				url: '/settings',
				data: {
					action,
					payload,
				},
				headers: {
					Authorization: `Bearer ${idToken}`,
				},
			});

			if (status === 200) {
				// update localstorage
				forgotUserDevice(payload.deviceId);

				return dispatch({
					type: FORGOT_USER_DEVICE_SUCCESS,
					payload: {
						device: payload.deviceId,
					},
				});
			}
		} catch (error) {
			return dispatch({ type: FORGOT_USER_DEVICE_FAIL });
		}
	};
};

export const forgot_user_all_device$ = ({ action, payload }) => {
	return async (dispatch) => {
		try {
			dispatch({ type: FORGOT_USER_ALL_DEVICE });

			// update payload
			const { idToken } = payload;
			delete payload.idToken;

			const { status } = await axios({
				method: 'POST',
				url: '/settings',
				data: {
					action,
					payload,
				},
				headers: {
					Authorization: `Bearer ${idToken}`,
				},
			});

			if (status === 200) {
				// update localStorage
				forgotUserDevice(undefined, true);

				return dispatch({
					type: FORGOT_USER_ALL_DEVICE_SUCCESS,
					payload: {
						devices: [],
					},
				});
			}
		} catch (error) {
			return dispatch({ type: FORGOT_USER_ALL_DEVICE_FAIl });
		}
	};
};

export const update_user_password$ = ({ action, payload }) => {
	return async (dispatch) => {
		try {
			dispatch({ type: USER_PASSWORD_UPDATE });

			// update payload
			const { idToken } = payload;
			delete payload.idToken;

			// send update password request
			const { status } = await axios({
				method: 'POST',
				url: '/changepassword',
				data: {
					action,
					payload,
				},
				headers: {
					Authorization: idToken,
				},
			});

			// dispatch success if status is 200
			if (status === 200) {
				return dispatch({ type: USER_PASSWORD_UPDATE_SUCCESS });
			}
		} catch (error) {
			const { data } = error.response;

			if (data.errorCode === 53) {
				dispatch({
					type: ADD_ERROR_MESSAGE,
					payload: {
						code: data.errorCode,
						msg: 'Please enter correct password',
					},
				});
			}

			return dispatch({ type: USER_PASSWORD_UPDATE_FAIL });
		}
	};
};
