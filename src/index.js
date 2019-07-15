import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';

//redux modules
import { Provider } from 'react-redux';
import { REQUEST_LOGIN_SUCCESS } from './redux/constants/auth_constant';
import store from './redux';

import * as serviceWorker from './serviceWorker';

// primereact modules
import 'babel-polyfill';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';

import 'font-awesome/css/font-awesome.min.css';

// Persist redux state from localstorage
const { dispatch } = store;

let payload = {};
if (localStorage.length) {
	// check localStorage for challenge and auth
	for (let key in localStorage) {
		if (
			[
				'challenge',
				'auth',
				'deviceData',
				'username',
				'password',
				'idToken',
			].includes(key)
		) {
			// Parse data
			if (key === 'challenge') {
				payload[key] = parseInt(localStorage[key], 10);
			} else {
				payload[key] = ['auth', 'deviceData'].includes(key)
					? JSON.parse(localStorage[key])
					: localStorage[key];
			}
		}
	}

	// update loggedin flag
	payload['loggedIn'] = Object.keys(localStorage).includes('auth')
		? true
		: false;

	// update redux store
	dispatch({
		type: REQUEST_LOGIN_SUCCESS,
		payload,
	});
}

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
