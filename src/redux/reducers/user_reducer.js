import {
	USER_PASSWORD_UPDATE,
	USER_PASSWORD_UPDATE_SUCCESS,
	USER_PASSWORD_UPDATE_FAIL,
	GET_USER_DEVICE,
	GET_USER_DEVICE_SUCCESS,
	GET_USER_DEVICE_FAIL,
	FORGOT_USER_DEVICE,
	FORGOT_USER_DEVICE_FAIL,
	FORGOT_USER_DEVICE_SUCCESS,
	FORGOT_USER_ALL_DEVICE,
	FORGOT_USER_ALL_DEVICE_SUCCESS,
	FORGOT_USER_ALL_DEVICE_FAIl,
} from '../constants/user_constant';

const initialState = {
	devices: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_PASSWORD_UPDATE:
		case GET_USER_DEVICE:
		case FORGOT_USER_DEVICE:
		case FORGOT_USER_ALL_DEVICE: {
			return {
				...state,
			};
		}
		case USER_PASSWORD_UPDATE_SUCCESS:
		case GET_USER_DEVICE_SUCCESS:
		case FORGOT_USER_ALL_DEVICE_SUCCESS: {
			return {
				...state,
				...action.payload,
			};
		}
		case FORGOT_USER_DEVICE_SUCCESS: {
			const devices = state.devices.filter(
				(device) => device !== action.payload.device,
			);

			return {
				...state,
				devices,
			};
		}
		case USER_PASSWORD_UPDATE_FAIL:
		case GET_USER_DEVICE_FAIL:
		case FORGOT_USER_DEVICE_FAIL:
		case FORGOT_USER_ALL_DEVICE_FAIl: {
			return {
				...state,
			};
		}
		default: {
			return state;
		}
	}
};

export default reducer;
