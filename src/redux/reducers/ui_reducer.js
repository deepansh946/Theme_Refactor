import {
	UPDATE_UI,
	UPDATE_UI_SUCCESS,
	UPDATE_UI_FAIL,
	ADD_GLOBAL_MESSAGE,
	REMOVE_GLOBAL_MESSAGE,
	ADD_ERROR_MESSAGE,
	REMOVE_ERROR_MESSAGE,
	ADD_GLOBAL_LOADER,
	REMOVE_GLOBAL_LOADER,
} from '../constants/ui_constant';

// Initial State
const initialState = {
	global_loader: false,
	flash: false,
	formFlash: false,
	message: '',
	messageType: '',
	sessionExpired: false,
	error: {
		code: null,
		msg: null,
	},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_UI: {
			return {
				...state,
				global_loader: true,
			};
		}
		case UPDATE_UI_SUCCESS: {
			return {
				...state,
				global_loader: false,
			};
		}
		case UPDATE_UI_FAIL: {
			return {
				...state,
				global_loader: false,
			};
		}
		case ADD_GLOBAL_MESSAGE: {
			return {
				...state,
				...action.payload,
			};
		}
		case REMOVE_GLOBAL_MESSAGE: {
			return {
				...state,
				flash: false,
				formFlash: false,
			};
		}
		case ADD_ERROR_MESSAGE: {
			return {
				...state,
				error: {
					...state.error,
					...action.payload,
				},
			};
		}
		case REMOVE_ERROR_MESSAGE: {
			return {
				...state,
				error: {
					...state.error,
					code: null,
					msg: null,
				},
			};
		}
		case ADD_GLOBAL_LOADER: {
			return {
				...state,
				global_loader: true,
			};
		}
		case REMOVE_GLOBAL_LOADER: {
			return {
				...state,
				global_loader: false,
			};
		}
		default: {
			return state;
		}
	}
};

export default reducer;
