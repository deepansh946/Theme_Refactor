import {
	UPDATE_UI,
	UPDATE_UI_SUCCESS,
	UPDATE_UI_FAIL,
} from '../constants/ui_constant';
import axios from './axios/user';

export const update_ui$ = ({ action, payload }) => {
	return async (dispatch) => {
		try {
			dispatch({ type: UPDATE_UI });

			// upload payload
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
				return dispatch({ type: UPDATE_UI_SUCCESS });
			}
		} catch (error) {
			return dispatch({ type: UPDATE_UI_FAIL });
		}
	};
};
