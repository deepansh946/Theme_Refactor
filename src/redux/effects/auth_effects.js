import {
	REQUEST_SIGNUP,
	REQUEST_SIGNUP_FAIL,
	REQUEST_SIGNUP_SUCCESS,
	REQUEST_VERIFY_EMAIL,
	REQUEST_VERIFY_EMAIL_FAIL,
	REQUEST_VERIFY_EMAIL_SUCCESS,
	RESEND_EMAIL_CODE,
	RESEND_EMAIL_CODE_FAIL,
	RESEND_EMAIL_CODE_SUCCESS,
	REQUEST_VERIFY_PHONE,
	REQUEST_VERIFY_PHONE_FAIL,
	REQUEST_VERIFY_PHONE_SUCCESS,
	RESEND_PHONE_CODE,
	RESEND_PHONE_CODE_FAIL,
	RESEND_PHONE_CODE_SUCCESS,
	CHANGE_PHONE,
	CHANGE_PHONE_FAIL,
	CHANGE_PHONE_SUCCESS,
	REQUEST_VERIFY_MFA,
	REQUEST_VERIFY_MFA_FAIL,
	REQUEST_VERIFY_MFA_SUCCESS,
	RESEND_MFA_CODE,
	RESEND_MFA_CODE_FAIL,
	RESEND_MFA_CODE_SUCCESS,
	REQUEST_LOGOUT,
	REQUEST_LOGOUT_SUCCESS,
	REQUEST_LOGOUT_FAIL,
	REQUEST_LOGIN,
	REQUEST_LOGIN_SUCCESS,
	REQUEST_LOGIN_FAIL,
	REQUEST_FORGOT_PASSWORD,
	REQUEST_FORGOT_PASSWORD_FAIL,
	REQUEST_FORGOT_PASSWORD_SUCCESS,
	REQUEST_GLOBAL_SIGNOUT_FAIL,
	REQUEST_GLOBAL_SIGNOUT,
	REQUEST_GLOBAL_SIGNOUT_SUCCESS,
	CHANGE_PASSWORD_REQUEST,
	CHANGE_PASSWORD_REQUEST_SUCCESS,
	CHANGE_PASSWORD_REQUEST_FAIL,
	REQUEST_REFRESH_SESSION,
	REQUEST_REFRESH_SESSION_SUCCESS,
	REQUEST_REFRESH_SESSION_FAIL,
} from '../constants/auth_constant';
import axios from './axios/auth';
import {
	ADD_GLOBAL_MESSAGE,
	ADD_GLOBAL_LOADER,
	REMOVE_GLOBAL_LOADER,
} from '../constants/ui_constant';

// function to set items in localstorage
function setLocalStorage(data, clear = false) {
	if (clear) localStorage.clear();

	for (let key in data) {
		console.log(`${key} ===> ${data[key]}`);
		localStorage.setItem(
			key,
			typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key],
		);
	}
}

export const request_signup$ = ({ action, payload }) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: REQUEST_SIGNUP,
				payload: {
					username: payload.username,
					password: payload.password,
				},
			});
			// send request to server
			const { status, data } = await axios({
				method: 'POST',
				url: '/signup',
				data: {
					action,
					payload,
				},
			});

			// dispatch success if status is 200
			if (status === 200) {
				let idToken = data.challengeCode === 154 ? data.tokens.idToken : null;

				// save challengeCode and id token if available
				setLocalStorage({
					challenge: data.challengeCode,
					idToken,
					username: payload.username,
					password: payload.password,
				});
				console.log(data);
				return dispatch({
					type: REQUEST_SIGNUP_SUCCESS,
					payload: {
						challenge: data.challengeCode,
						duration: data.duration || null,
						contact: data.contact || null,
						idToken,
					},
				});
			}
		} catch (error) {
			return dispatch({ type: REQUEST_SIGNUP_FAIL });
		}
	};
};

export const request_email_verification$ = ({ action, payload }) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: REQUEST_VERIFY_EMAIL,
			});

			// send request to server
			const { status, data } = await axios({
				method: 'POST',
				url: '/signup',
				data: {
					action,
					payload,
				},
			});

			//dispatch success if status is 200
			if (status === 200) {
				// save challengeCode and id token if available
				setLocalStorage(
					{
						challenge: data.challengeCode,
						idToken: data.tokens.idToken,
					},
					true,
				);

				return dispatch({
					type: REQUEST_VERIFY_EMAIL_SUCCESS,
					payload: {
						challenge: data.challengeCode,
						idToken: data.tokens.idToken,
					},
				});
			}
		} catch (error) {
			return dispatch({
				type: REQUEST_VERIFY_EMAIL_FAIL,
			});
		}
	};
};

export const resend_email_code$ = ({ action, payload }) => {
	return async (dispatch) => {
		try {
			dispatch({ type: RESEND_EMAIL_CODE });

			// send request to server
			const { status, data } = await axios({
				method: 'POST',
				url: '/signup',
				data: {
					action,
					payload,
				},
			});

			//dispatch success if status is 200
			if (status === 200) {
				// save challengeCode and id token if available
				setLocalStorage({ challenge: data.challengeCode });

				return dispatch({
					type: RESEND_EMAIL_CODE_SUCCESS,
					payload: {
						challenge: data.challengeCode,
					},
				});
			}
		} catch (error) {
			return dispatch({ type: RESEND_EMAIL_CODE_FAIL });
		}
	};
};

export const request_phone_verification$ = ({ action, payload }) => {
	return async (dispatch) => {
		try {
			dispatch({ type: REQUEST_VERIFY_PHONE });

			// update payload
			const { idToken } = payload;
			delete payload.idToken;

			const { status, data } = await axios({
				method: 'POST',
				url: '/phoneverify',
				headers: {
					Authorization: idToken,
				},
				data: {
					action,
					payload: {
						...payload,
					},
				},
			});

			if (status === 200) {
				// save challengeCode and id token if available
				setLocalStorage({ challenge: data.challengeCode }, true);

				return dispatch({
					type: REQUEST_VERIFY_PHONE_SUCCESS,
					payload: {
						challenge: data.challengeCode,
					},
				});
			}
		} catch (error) {
			return dispatch({ type: REQUEST_VERIFY_PHONE_FAIL });
		}
	};
};

export const resend_phone_code$ = ({ action, payload }) => {
	return async (dispatch) => {
		try {
			dispatch({ type: RESEND_PHONE_CODE });
			const { status, data } = await axios({
				method: 'POST',
				url: '/phoneverify',
				headers: {
					Authorization: payload.idToken,
				},
				data: {
					action,
				},
			});

			//dispatch success if status is 200
			if (status === 200) {
				const challenge = data.challengeCode === 155 ? 154 : data.challengeCode;
				// save challengeCode and id token if available
				setLocalStorage({
					challenge,
				});

				return dispatch({
					type: RESEND_PHONE_CODE_SUCCESS,
					payload: {
						challenge,
					},
				});
			}
		} catch (error) {
			return dispatch({ type: RESEND_PHONE_CODE_FAIL });
		}
	};
};

export const change_phone_number$ = ({ action, payload }) => {
	return async (dispatch) => {
		try {
			dispatch({ type: CHANGE_PHONE });
			console.log(payload);
			// update payload
			const { idToken } = payload;
			delete payload.idToken;

			const { status, data } = await axios({
				method: 'POST',
				url: '/phoneverify',
				headers: {
					Authorization: idToken,
				},
				data: {
					action,
					payload: {
						...payload,
					},
				},
			});

			if (status === 200) {
				setLocalStorage({ challenge: data.challengeCode });
				return dispatch({
					type: CHANGE_PHONE_SUCCESS,
					payload: {
						challenge: data.challengeCode,
					},
				});
			}
		} catch (error) {
			return dispatch({ type: CHANGE_PHONE_FAIL });
		}
	};
};

export const request_login$ = ({ action, payload }) => {
	return async (dispatch) => {
		try {
			dispatch({ type: REQUEST_LOGIN });

			const { rememberMe } = payload;
			delete payload.rememberMe;

			// send request to server
			const { status, data } = await axios({
				method: 'POST',
				url: '/login',
				data: {
					action,
					payload,
				},
			});

			// if status is 200 dispatch success
			if (status === 200) {
				const { challengeCode, sessionData, tokens } = data;

				let response = {
					username: payload.userName,
				};

				// check for verification email challenge
				if ([151, 153].includes(challengeCode)) {
					response.challenge = challengeCode;
					response.password = payload.password;
				} else if (challengeCode === 155) {
					let idToken = data.tokens.IdToken;
					response.challenge = 154;
					response.idToken = idToken;
				} else {
					response.challenge = challengeCode;
					response.auth = {
						sessionId: sessionData.sessionId,
						sessionEndTime: sessionData.sessionEndTime,
						rememberMe,
						...tokens,
					};
				}

				// save auth data in localstorage
				setLocalStorage(response);

				return dispatch({
					type: REQUEST_LOGIN_SUCCESS,
					payload: {
						...response,
						duration: data.duration || null,
						contact: data.contact || null,
						loggedIn: ![151, 153, 154, 155].includes(challengeCode),
					},
				});
			}
		} catch (error) {
			const { data } = error.response;
			// 59 => user not confirmed exception
			if (data.errorCode === 59) {
				const payloadData = {
					challenge: 151,
					username: payload.userName,
					password: payload.password,
				};

				setLocalStorage(payloadData);

				return dispatch({
					type: REQUEST_LOGIN_SUCCESS,
					payload: payloadData,
				});
			}
			return dispatch({ type: REQUEST_LOGIN_FAIL });
		}
	};
};

export const request_mfa_verification$ = ({ action, payload }) => {
	return async (dispatch) => {
		try {
			dispatch({ type: REQUEST_VERIFY_MFA });

			// update payload
			const { idToken, auth } = payload;
			delete payload.idToken;
			delete payload.auth;

			const { status, data } = await axios({
				method: 'POST',
				url: '/phonemfa',
				headers: {
					Authorization: idToken,
				},
				data: {
					action,
					payload,
				},
			});

			if (status === 200) {
				const payloadData = {
					auth,
				};
				if (payload.rememberflag) {
					const username = localStorage.getItem('username');
					const deviceData =
						JSON.parse(localStorage.getItem('deviceData')) || {};

					payloadData['deviceData'] = {
						...deviceData,
						[username]: { ...data.sessionData },
					};
				}
				setLocalStorage({ ...payloadData });
				return dispatch({
					type: REQUEST_VERIFY_MFA_SUCCESS,
					payload: payloadData,
				});
			}
		} catch (error) {
			return dispatch({ type: REQUEST_VERIFY_MFA_FAIL });
		}
	};
};

export const resend_mfa_code$ = ({ action, payload }) => {
	return async (dispatch) => {
		console.log(payload);
		try {
			dispatch({ type: RESEND_MFA_CODE });
			// update payload
			const { idToken } = payload;
			delete payload.idToken;

			const { status, data } = await axios({
				method: 'POST',
				url: '/phonemfa',
				headers: {
					Authorization: idToken,
				},
				data: {
					action,
					payload,
				},
			});

			if (status === 200) {
				return dispatch({ type: RESEND_MFA_CODE_SUCCESS, payload: data });
			}
		} catch (error) {
			const { data } = error.response;

			// 120 => RequiredFieldMissingException
			if (data.errorCode === 120) {
				dispatch({
					type: ADD_GLOBAL_MESSAGE,
					payload: {
						flash: true,
						message: 'Something went wrong.',
						messageType: 'error',
					},
				});
			}
			return dispatch({ type: RESEND_MFA_CODE_FAIL });
		}
	};
};

export const request_forgot_password$ = ({ action, payload }) => {
	return async (dispatch) => {
		try {
			dispatch({ type: REQUEST_FORGOT_PASSWORD });

			const { status, data } = await axios({
				method: 'POST',
				url: '/login',
				data: {
					action,
					payload,
				},
			});

			if (status === 200) {
				setLocalStorage({
					challenge: data.challengeCode,
					username: payload.userName,
				});
				return dispatch({
					type: REQUEST_FORGOT_PASSWORD_SUCCESS,
					payload: {
						username: payload.userName,
						challenge: data.challengeCode,
					},
				});
			}
		} catch (error) {
			const { data } = error.response;

			if (data.errorCode === 50) {
				dispatch({
					type: ADD_GLOBAL_MESSAGE,
					payload: {
						flash: true,
						message: "We couldn't find an account with that email.",
						messageType: 'error',
					},
				});
			}
			return dispatch({ type: REQUEST_FORGOT_PASSWORD_FAIL });
		}
	};
};

export const request_change_password$ = ({ action, payload }) => {
	return async (dispatch) => {
		try {
			dispatch({ type: CHANGE_PASSWORD_REQUEST });

			const { status, data } = await axios({
				method: 'POST',
				url: '/login',
				data: {
					action,
					payload,
				},
			});

			if (status === 200) {
				setLocalStorage({ challenge: data.challengeCode }, true);
				return dispatch({
					type: CHANGE_PASSWORD_REQUEST_SUCCESS,
					payload: {
						challenge: data.challengeCode,
					},
				});
			}
		} catch (error) {
			return dispatch({ type: CHANGE_PASSWORD_REQUEST_FAIL });
		}
	};
};

export const request_logout$ = ({ headers, action, payload }) => {
	return async (dispatch) => {
		try {
			// dispatch global loader
			dispatch({ type: ADD_GLOBAL_LOADER });
			dispatch({
				type: REQUEST_LOGOUT,
			});

			// send request to server
			const { status, data } = await axios({
				method: 'POST',
				url: '/signout',
				data: { action, payload },
				headers: headers,
			});

			console.log(data);

			// if status is 200 dispatch success
			if (status === 200) {
				// remove global loader
				dispatch({ type: REMOVE_GLOBAL_LOADER });
				return dispatch({
					type: REQUEST_LOGOUT_SUCCESS,
					payload: data.body.message,
				});
			}
		} catch (error) {
			const { status, data } = error.response;
			// remove global loader
			dispatch({ type: REMOVE_GLOBAL_LOADER });
			if (status === 401) {
				return dispatch({
					type: REQUEST_LOGOUT_SUCCESS,
					payload: data.message,
				});
			}

			return dispatch({
				type: REQUEST_LOGOUT_FAIL,
				payload: data.message,
			});
		}
	};
};

export const request_global_signout$ = ({ headers, action, payload }) => {
	return async (dispatch) => {
		try {
			// add global loader
			dispatch({ type: ADD_GLOBAL_LOADER });
			dispatch({
				type: REQUEST_GLOBAL_SIGNOUT,
			});

			const { status } = await axios({
				method: 'POST',
				url: '/globalsignout',
				data: {
					action,
					payload,
				},
				headers,
			});

			if (status === 200) {
				// remove global loader
				dispatch({ type: REMOVE_GLOBAL_LOADER });
				return dispatch({
					type: REQUEST_GLOBAL_SIGNOUT_SUCCESS,
					payload: {},
				});
			}
		} catch (error) {
			const { status, data } = error.response;
			// remove global loader
			dispatch({ type: REMOVE_GLOBAL_LOADER });
			if (status === 401) {
				return dispatch({
					type: REQUEST_GLOBAL_SIGNOUT_SUCCESS,
					payload: data.message,
				});
			}

			return dispatch({
				type: REQUEST_GLOBAL_SIGNOUT_FAIL,
				payload: data.message,
			});
		}
	};
};

export const request_refresh_session$ = ({ action, payload }) => {
	return async (dispatch) => {
		try {
			// dispatch({
			// 	type: REQUEST_REFRESH_SESSION,
			// });

			let tmpPayload = {
				refreshToken: payload.refreshToken,
				sessionId: payload.sessionId,
			};

			if (payload.sessionId) {
				tmpPayload = {
					...tmpPayload,
					sessionId: payload.sessionId,
				};
			} else if (payload.deviceId && payload.deviceSecret) {
				tmpPayload = {
					...tmpPayload,
					deviceId: payload.deviceId,
					deviceSecret: payload.deviceSecret,
				};
			}

			const { status, data } = await axios({
				method: 'POST',
				url: '/login',
				data: {
					action,
					payload: {
						...tmpPayload,
					},
				},
			});

			if (status === 200) {
				const { challengeCode = undefined, sessionData, tokens } = data;
				let response = {};

				if (challengeCode) response.challenge = challengeCode;
				response.auth = {
					sessionId: sessionData.sessionId,
					sessionEndTime: sessionData.sessionEndTime,
					rememberMe: payload.rememberMe,
					...tokens,
				};

				if (sessionData.deviceId) {
					response.deviceData = {
						deviceId: sessionData.deviceId,
						deviceSecret: sessionData.deviceSecret,
					};
				}

				setLocalStorage(response);

				return dispatch({
					type: REQUEST_REFRESH_SESSION_SUCCESS,
					payload: response,
				});
			}
		} catch (error) {
			const { data } = error.response;
			console.log(data);

			return dispatch({
				type: REQUEST_REFRESH_SESSION_FAIL,
				payload: data,
			});
		}
	};
};
