import {
	ADD_GLOBAL_MESSAGE,
	REMOVE_GLOBAL_MESSAGE,
	ADD_ERROR_MESSAGE,
	REMOVE_ERROR_MESSAGE,
	ADD_GLOBAL_LOADER,
	REMOVE_GLOBAL_LOADER,
	UPDATE_UI,
	UPDATE_UI_FAIL,
	UPDATE_UI_SUCCESS,
} from '../constants/ui_constant';

// PROFILE MODE
export const update_ui = () => {
	return {
		type: UPDATE_UI,
	};
};

export const update_ui_success = () => {
	return {
		type: UPDATE_UI_SUCCESS,
	};
};

export const update_ui_fail = () => {
	return {
		type: UPDATE_UI_FAIL,
	};
};

// GLOBAL MESSAGE
export const add_global_message = (payload) => {
	return {
		type: ADD_GLOBAL_MESSAGE,
		payload,
	};
};

export const remove_global_message = () => {
	return {
		type: REMOVE_GLOBAL_MESSAGE,
	};
};

// ERROR MESSAGE
export const add_error_message = (payload) => {
	return {
		type: ADD_ERROR_MESSAGE,
		payload,
	};
};

export const remove_error_message = () => {
	return {
		type: REMOVE_ERROR_MESSAGE,
	};
};

// GLOBAL LOADER
export const add_global_loader = () => {
	return {
		type: ADD_GLOBAL_LOADER,
	};
};

export const remove_global_loader = () => {
	return {
		type: REMOVE_GLOBAL_LOADER,
	};
};
