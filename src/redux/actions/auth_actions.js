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
	RESEND_MFA_CODE,
	RESEND_MFA_CODE_SUCCESS,
	RESEND_MFA_CODE_FAIL,
	REQUEST_GLOBAL_SIGNOUT,
	REQUEST_GLOBAL_SIGNOUT_SUCCESS,
	REQUEST_GLOBAL_SIGNOUT_FAIL,
	REQUEST_REFRESH_SESSION,
	REQUEST_REFRESH_SESSION_SUCCESS,
	REQUEST_REFRESH_SESSION_FAIL,
} from '../constants/auth_constant.js';

// SIGN UP
export const request_signup = (payload) => {
	return {
		type: REQUEST_SIGNUP,
		payload,
	};
};

export const request_signup_success = (payload) => {
	return {
		type: REQUEST_SIGNUP_SUCCESS,
		payload,
	};
};

export const request_signup_fail = (payload) => {
	return {
		type: REQUEST_SIGNUP_FAIL,
		payload,
	};
};

// EMAIL VERIFICATION

export const request_email_verification = () => {
	return {
		type: REQUEST_VERIFY_EMAIL,
	};
};

export const request_email_verification_success = (payload) => {
	return {
		type: REQUEST_VERIFY_EMAIL_SUCCESS,
		payload,
	};
};

export const request_email_verification_fail = (payload) => {
	return {
		type: REQUEST_VERIFY_EMAIL_FAIL,
		payload,
	};
};

// RESEND EMAIL CODE
export const resend_email_code = () => {
	return {
		type: RESEND_EMAIL_CODE,
	};
};

export const resend_email_code_success = () => {
	return {
		type: RESEND_EMAIL_CODE_SUCCESS,
	};
};

export const resend_email_code_fail = (payload) => {
	return {
		type: RESEND_EMAIL_CODE_FAIL,
		payload,
	};
};

// PHONE VERIFICATION
export const request_phone_verification = () => {
	return {
		type: REQUEST_VERIFY_PHONE,
	};
};

export const request_phone_verification_success = () => {
	return {
		type: REQUEST_VERIFY_PHONE_SUCCESS,
	};
};

export const request_phone_verification_fail = () => {
	return {
		type: REQUEST_VERIFY_PHONE_FAIL,
	};
};

//RESEND PHONE CODE
export const resend_phone_code = () => {
	return {
		type: RESEND_PHONE_CODE,
	};
};

export const resend_phone_code_success = (payload) => {
	return {
		type: RESEND_PHONE_CODE_SUCCESS,
	};
};

export const resend_phone_code_fail = (payload) => {
	return {
		type: RESEND_PHONE_CODE_FAIL,
		payload,
	};
};

// CHANGE PHONE
export const change_phone = () => {
	return {
		type: CHANGE_PHONE,
	};
};

export const change_phone_success = (payload) => {
	return {
		type: CHANGE_PHONE_SUCCESS,
		payload,
	};
};

export const change_phone_fail = (payload) => {
	return {
		type: CHANGE_PHONE_FAIL,
		payload,
	};
};

// LOGIN
export const request_login = (payload) => {
	return {
		type: REQUEST_LOGIN,
		payload,
	};
};

export const request_login_success = (payload) => {
	return {
		type: REQUEST_LOGIN_SUCCESS,
		payload,
	};
};

export const request_login_fail = (payload) => {
	return {
		type: REQUEST_LOGIN_FAIL,
		payload,
	};
};

// VERIFY MFA
export const request_mfa_verification = (payload) => {
	return {
		type: REQUEST_VERIFY_MFA,
		payload,
	};
};

export const request_mfa_verification_success = (payload) => {
	return {
		type: REQUEST_VERIFY_MFA_SUCCESS,
		payload,
	};
};

export const request_mfa_verification_fail = (payload) => {
	return {
		type: REQUEST_VERIFY_MFA_FAIL,
		payload,
	};
};

// LOGOUT
export const request_logout = (payload) => {
	return {
		type: REQUEST_LOGOUT,
		payload,
	};
};

export const request_logout_success = (payload) => {
	return {
		type: REQUEST_LOGOUT_SUCCESS,
		payload,
	};
};

export const request_logout_fail = (payload) => {
	return {
		type: REQUEST_LOGOUT_FAIL,
		payload,
	};
};

export const request_global_signout = (payload) => {
	return {
		type: REQUEST_GLOBAL_SIGNOUT,
		payload,
	};
};

export const request_global_signout_success = (payload) => {
	return {
		type: REQUEST_GLOBAL_SIGNOUT_SUCCESS,
		payload,
	};
};

export const request_global_signout_fail = (payload) => {
	return {
		type: REQUEST_GLOBAL_SIGNOUT_FAIL,
		payload,
	};
};

export const request_refresh_session = (payload) => {
	return {
		type: REQUEST_REFRESH_SESSION,
		payload,
	};
};

export const request_refresh_session_success = (payload) => {
	return {
		type: REQUEST_REFRESH_SESSION_SUCCESS,
		payload,
	};
};

export const request_refresh_session_fail = (payload) => {
	return {
		type: REQUEST_REFRESH_SESSION_FAIL,
		payload,
	};
};
