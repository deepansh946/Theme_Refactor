import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { Button } from 'primereact/button';

import Devices from './Devices';

import { REQUEST_GLOBAL_SIGNOUT_SUCCESS } from '../../redux/constants/auth_constant';
import { request_global_signout$ } from '../../redux/effects/auth_effects';

class Sessions extends PureComponent {
	state = {};

	onGlobalSignOut = async () => {
		const auth = JSON.parse(localStorage.getItem('auth'));

		const idToken = auth.IdToken;

		const currentDateTime = moment(new Date())
			.subtract({ hours: 5, minutes: 30 })
			.format('YYYY-MM-DD HH:mm:ss.sss');

		const res = await this.props.request_global_signout$({
			headers: {
				Authorization: `Bearer ${idToken}`,
			},
			action: 'globalSignOut',
			payload: {
				projectedAttributes: ['sessionId'],
				currentDateTime,
			},
		});

		if (res.type === REQUEST_GLOBAL_SIGNOUT_SUCCESS) {
			localStorage.clear();
			this.props.history.push('/login');
		}
	};

	render() {
		return (
			<>
				<div className="wrapper p-grid">
					<Button
						className="p-button"
						label="Global Sign Out"
						onClick={this.onGlobalSignOut}
						style={{ marginBottom: '35px' }}
					/>

					<Devices />
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		...state.AUTH,
	};
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ request_global_signout$ }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withRouter(Sessions));
