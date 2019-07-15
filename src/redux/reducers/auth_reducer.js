import {
	REQUEST_SIGNUP,
	REQUEST_SIGNUP_SUCCESS,
	REQUEST_SIGNUP_FAIL,
	REQUEST_VERIFY_EMAIL,
	REQUEST_VERIFY_EMAIL_SUCCESS,
	REQUEST_VERIFY_EMAIL_FAIL,
	RESEND_EMAIL_CODE,
	RESEND_EMAIL_CODE_SUCCESS,
	RESEND_EMAIL_CODE_FAIL,
	REQUEST_VERIFY_PHONE,
	REQUEST_VERIFY_PHONE_SUCCESS,
	REQUEST_VERIFY_PHONE_FAIL,
	RESEND_PHONE_CODE,
	RESEND_PHONE_CODE_SUCCESS,
	RESEND_PHONE_CODE_FAIL,
	CHANGE_PHONE,
	CHANGE_PHONE_SUCCESS,
	CHANGE_PHONE_FAIL,
	REQUEST_LOGOUT,
	REQUEST_LOGOUT_SUCCESS,
	REQUEST_LOGOUT_FAIL,
	REQUEST_LOGIN,
	REQUEST_LOGIN_SUCCESS,
	REQUEST_LOGIN_FAIL,
	REQUEST_VERIFY_MFA,
	REQUEST_VERIFY_MFA_SUCCESS,
	REQUEST_VERIFY_MFA_FAIL,
	REQUEST_GLOBAL_SIGNOUT,
	REQUEST_GLOBAL_SIGNOUT_SUCCESS,
	REQUEST_GLOBAL_SIGNOUT_FAIL,
	RESEND_MFA_CODE,
	RESEND_MFA_CODE_SUCCESS,
	RESEND_MFA_CODE_FAIL,
	REQUEST_REFRESH_SESSION,
	REQUEST_REFRESH_SESSION_SUCCESS,
	REQUEST_REFRESH_SESSION_FAIL,
	REQUEST_FORGOT_PASSWORD,
	REQUEST_FORGOT_PASSWORD_SUCCESS,
	REQUEST_FORGOT_PASSWORD_FAIL,
	CHANGE_PASSWORD_REQUEST,
	CHANGE_PASSWORD_REQUEST_SUCCESS,
	CHANGE_PASSWORD_REQUEST_FAIL,
} from '../constants/auth_constant';

const initalState = {
	loggedIn: false,
	loading: false,
	challenge: null,
	duration: null,
	idToken: null,
	username: null,
	password: null,
	auth: {},
	deviceData: {},
};

const reducer = (state = initalState, action) => {
	switch (action.type) {
		case REQUEST_SIGNUP: {
			return {
				...state,
				loading: true,
				username: action.payload.username,
				password: action.payload.password,
			};
		}
		case REQUEST_SIGNUP_SUCCESS: {
			return {
				...state,
				...action.payload,
				loading: false,
			};
		}
		case REQUEST_SIGNUP_FAIL: {
			return {
				...state,
				loading: false,
			};
		}
		case REQUEST_VERIFY_EMAIL: {
			return {
				...state,
				loading: true,
			};
		}
		case REQUEST_VERIFY_EMAIL_SUCCESS: {
			return {
				...state,
				challenge: action.payload.challenge,
				idToken: action.payload.idToken,
				loading: false,
			};
		}
		case REQUEST_VERIFY_EMAIL_FAIL: {
			return {
				...state,
				loading: false,
			};
		}
		case RESEND_EMAIL_CODE: {
			return {
				...state,
				loading: true,
			};
		}
		case RESEND_EMAIL_CODE_SUCCESS: {
			return {
				...state,
				...action.payload,
				loading: false,
			};
		}
		case RESEND_EMAIL_CODE_FAIL: {
			return {
				...state,
				loading: false,
			};
		}
		case CHANGE_PHONE: {
			return {
				...state,
				loading: true,
			};
		}
		case CHANGE_PHONE_SUCCESS: {
			return {
				...state,
				...action.payload,
				loading: false,
			};
		}
		case CHANGE_PHONE_FAIL: {
			return {
				...state,
				loading: false,
			};
		}

		case REQUEST_VERIFY_PHONE: {
			return {
				...state,
				loading: true,
			};
		}
		case REQUEST_VERIFY_PHONE_SUCCESS: {
			return {
				...state,
				challenge: action.payload.challenge,
				loading: false,
			};
		}
		case REQUEST_VERIFY_PHONE_FAIL: {
			return {
				...state,
				loading: false,
			};
		}
		case RESEND_PHONE_CODE: {
			return {
				...state,
				loading: true,
			};
		}
		case RESEND_PHONE_CODE_SUCCESS: {
			return {
				...state,
				loading: false,
				challenge: action.payload.challenge,
			};
		}
		case RESEND_PHONE_CODE_FAIL: {
			return {
				...state,
				loading: false,
			};
		}
		case REQUEST_LOGIN: {
			return {
				...state,
				loading: true,
			};
		}
		case REQUEST_LOGIN_SUCCESS: {
			return {
				...state,
				loggedIn: true,
				loading: false,
				...action.payload,
			};
		}
		case REQUEST_LOGIN_FAIL: {
			return {
				...state,
				loading: false,
			};
		}
		case REQUEST_VERIFY_MFA: {
			return {
				...state,
				loading: true,
			};
		}
		case REQUEST_VERIFY_MFA_SUCCESS: {
			return {
				...state,
				loading: false,
				loggedIn: true,
				...action.payload,
			};
		}
		case REQUEST_VERIFY_MFA_FAIL: {
			return {
				...state,
				loading: false,
			};
		}
		case RESEND_MFA_CODE: {
			return {
				...state,
				loading: true,
			};
		}
		case RESEND_MFA_CODE_SUCCESS: {
			return {
				...state,
				loading: false,
			};
		}
		case RESEND_MFA_CODE_FAIL: {
			return {
				...state,
				loading: false,
			};
		}
		case REQUEST_FORGOT_PASSWORD: {
			return {
				...state,
				loading: true,
			};
		}
		case REQUEST_FORGOT_PASSWORD_SUCCESS: {
			return {
				...state,
				...action.payload,
				loading: false,
			};
		}
		case REQUEST_FORGOT_PASSWORD_FAIL: {
			return {
				...state,
				loading: false,
			};
		}
		case CHANGE_PASSWORD_REQUEST: {
			return {
				...state,
				loading: true,
			};
		}
		case CHANGE_PASSWORD_REQUEST_SUCCESS: {
			return {
				...state,
				...action.payload,
				loading: false,
			};
		}
		case CHANGE_PASSWORD_REQUEST_FAIL: {
			return {
				...state,
				loading: false,
			};
		}
		case REQUEST_LOGOUT: {
			return {
				...state,
				loading: true,
			};
		}
		case REQUEST_LOGOUT_SUCCESS: {
			return {
				...state,
				auth: {},
				loading: false,
				loggedIn: false,
			};
		}
		case REQUEST_LOGOUT_FAIL: {
			return {
				...state,
				loading: false,
			};
		}

		case REQUEST_GLOBAL_SIGNOUT: {
			return {
				...state,
				loading: true,
			};
		}

		case REQUEST_GLOBAL_SIGNOUT_SUCCESS: {
			return {
				...state,
				auth: {},
				deviceData: {},
				loading: false,
				loggedIn: false,
			};
		}

		case REQUEST_GLOBAL_SIGNOUT_FAIL: {
			return {
				...state,
				loading: false,
			};
		}

		case REQUEST_REFRESH_SESSION: {
			return {
				...state,
				loading: true,
			};
		}

		case REQUEST_REFRESH_SESSION_SUCCESS: {
			return {
				...state,
				...action.payload,
				loggedIn: true,
				loading: false,
			};
		}

		case REQUEST_REFRESH_SESSION_FAIL: {
			return {
				...state,
				loading: false,
			};
		}
		default: {
			return state;
		}
	}
};

export default reducer;
