import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { UI_REDUCER, AUTH_REDUCER, USER_REDUCER } from './reducers';

const composeEnhancers =
	process.env.NODE_ENV === 'development'
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: null || compose;

const store = createStore(
	combineReducers({
		UI: UI_REDUCER,
		AUTH: AUTH_REDUCER,
		USER: USER_REDUCER,
	}),
	composeEnhancers(applyMiddleware(thunk)),
);

export default store;
